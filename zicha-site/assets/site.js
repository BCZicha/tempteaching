/* Shared behaviour: sign-in gate, session, masthead helpers. Works from file:// */
(function () {
  'use strict';
  var C = window.SITE_CONFIG || {};
  var SESSION_KEY = 'bcz_session';

  /* ---------- tiny SHA-256 (public-domain style implementation) ---------- */
  function sha256(ascii) {
    function rightRotate(v, a) { return (v >>> a) | (v << (32 - a)); }
    var mathPow = Math.pow, maxWord = mathPow(2, 32), lengthProperty = 'length', i, j;
    var result = '', words = [], asciiBitLength = ascii[lengthProperty] * 8;
    var hash = sha256.h = sha256.h || [], k = sha256.k = sha256.k || [], primeCounter = k[lengthProperty];
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
        hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return;
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength);
    for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16), oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2];
        var a = hash[0], e = hash[4];
        var temp1 = hash[7]
          + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
          + ((e & hash[5]) ^ ((~e) & hash[6]))
          + k[i]
          + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0);
        var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
          + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }
    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        var b = (hash[i] >> (j * 8)) & 255;
        result += ((b < 16) ? 0 : '') + b.toString(16);
      }
    }
    return result;
  }
  function utf8(s) { return unescape(encodeURIComponent(s)); }

  /* ---------- which course is this page about? (set by nav.js) ---------- */
  function courseKey() { return window.SITE_COURSE || 'dmp'; }
  function courseCfg(k) { return (C.courses && C.courses[k || courseKey()]) || {}; }
  function sessionKeyFor(k) { return 'bcz_session_' + (k || courseKey()); }

  /* ---------- session ---------- */
  function readSession(k) {
    try {
      var raw = localStorage.getItem(sessionKeyFor(k));
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !s.email || !s.expires || Date.now() > s.expires) { localStorage.removeItem(sessionKeyFor(k)); return null; }
      return s;
    } catch (e) { return null; }
  }
  function writeSession(email, folder) {
    var hours = C.sessionHours || 24;
    var s = { email: email, course: courseKey(), since: Date.now(), expires: Date.now() + hours * 3600 * 1000, folder: folder || '' };
    try { localStorage.setItem(sessionKeyFor(), JSON.stringify(s)); } catch (e) {}
    return s;
  }
  function signOut() { try { localStorage.removeItem(sessionKeyFor()); } catch (e) {} location.reload(); }

  function emailAllowed(email) {
    email = (email || '').trim().toLowerCase();
    var at = email.lastIndexOf('@');
    if (at < 1 || at === email.length - 1) return false;
    var domain = email.slice(at + 1);
    var allowed = C.allowedDomains || [];
    for (var i = 0; i < allowed.length; i++) {
      var d = allowed[i].toLowerCase();
      if (domain === d || domain.slice(-(d.length + 1)) === '.' + d) return true;
    }
    return false;
  }

  /* ---------- encrypted reading-folder link (AES-GCM, key from the course password) ---------- */
  function b64bytes(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function decryptFolder(password, done) {
    var enc = courseCfg().readingFolder;
    if (!enc || !enc.ct || !(window.crypto && crypto.subtle)) { done(''); return; }
    try {
      var te = new TextEncoder();
      crypto.subtle.importKey('raw', te.encode(password), 'PBKDF2', false, ['deriveKey'])
        .then(function (km) {
          return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64bytes(enc.salt), iterations: 200000, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
        })
        .then(function (key) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64bytes(enc.iv) }, key, b64bytes(enc.ct)); })
        .then(function (pt) { done(new TextDecoder().decode(pt)); }, function () { done(''); });
    } catch (e) { done(''); }
  }

  function trySignIn(email, password, done) {
    email = (email || '').trim().toLowerCase();
    if (!emailAllowed(email)) {
      done({ ok: false, error: 'Please use your institutional university e-mail address (for example your @umail.leidenuniv.nl address).' });
      return;
    }
    var cfg = courseCfg();
    var hash = sha256(utf8(password || ''));
    if (!cfg.passwordHash || hash !== cfg.passwordHash.toLowerCase()) {
      done({ ok: false, error: 'The course password is not correct. It was given out in class; ask the instructor if you have lost it.' });
      return;
    }
    decryptFolder(password, function (folder) { done({ ok: true, session: writeSession(email, folder) }); });
  }

  /* ---------- gate: hides protected content behind a sign-in panel ---------- */
  function renderGate(container, onSuccess) {
    var cname = courseCfg().name || 'this course';
    container.innerHTML =
      '<div class="signin">' +
      '  <div class="kicker">Students only · ' + escapeHtml(cname) + '</div>' +
      '  <h2>Sign in</h2>' +
      '  <p class="small">Use your institutional university e-mail and the course password given in class. Course materials are for enrolled students and may not be redistributed.</p>' +
      '  <form id="signin-form" autocomplete="on">' +
      '    <div class="field"><label for="si-email">University e-mail</label>' +
      '      <input id="si-email" type="email" required placeholder="s1234567@umail.leidenuniv.nl" autocomplete="username"></div>' +
      '    <div class="field"><label for="si-pass">Course password</label>' +
      '      <input id="si-pass" type="password" required autocomplete="current-password">' +
      '      <div class="hint">Your e-mail is used only to label your own work in this browser.</div></div>' +
      '    <p class="form-error" id="si-error" aria-live="polite"></p>' +
      '    <button class="btn" type="submit">Enter</button>' +
      '  </form>' +
      '</div>';
    var form = container.querySelector('#signin-form');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var btn = form.querySelector('button'); btn.disabled = true;
      trySignIn(form.querySelector('#si-email').value, form.querySelector('#si-pass').value, function (r) {
        btn.disabled = false;
        var err = form.querySelector('#si-error');
        if (!r.ok) { err.textContent = r.error; return; }
        err.textContent = '';
        onSuccess(r.session);
      });
    });
  }

  /* Call on a protected page: requireSignIn(function(session){ ...render... }) */
  function requireSignIn(render) {
    var gate = document.getElementById('gate');
    var content = document.getElementById('protected');
    var s = readSession();
    function show(session) {
      if (gate) gate.style.display = 'none';
      if (content) content.style.display = '';
      updateWhoami(session);
      renderFolderBoxes(session);
      render(session);
    }
    if (s) { show(s); return; }
    if (content) content.style.display = 'none';
    if (gate) { gate.style.display = ''; renderGate(gate, show); }
  }

  /* Fills any <div data-folder-box> with the course's reading folder link (after sign-in) */
  function renderFolderBoxes(session) {
    document.querySelectorAll('[data-folder-box]').forEach(function (el) {
      var link = session && session.folder;
      if (link) {
        el.innerHTML =
          '<div class="folder-box"><div><div class="kicker">Reading folder</div>' +
          '<p>The complete set of course readings is in a shared Google Drive folder for enrolled students. The link is unlocked by your sign-in; please do not pass it on.</p></div>' +
          '<div class="folder-actions"><a class="btn" href="' + escapeHtml(link) + '" target="_blank" rel="noopener">Open the reading folder ↗</a>' +
          '<button class="btn secondary sm" type="button" data-copy="' + escapeHtml(link) + '">Copy link</button></div></div>';
        var b = el.querySelector('[data-copy]');
        b.addEventListener('click', function () {
          var t = b.getAttribute('data-copy');
          try { navigator.clipboard.writeText(t).then(function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy link'; }, 1500); }); } catch (e) { window.prompt('Copy this link:', t); }
        });
      } else if (courseCfg().readingFolder && courseCfg().readingFolder.ct) {
        el.innerHTML = '<div class="notice"><p><b>Reading folder.</b> The shared folder link could not be unlocked in this browser (it needs a secure https:// or file:// page and a current browser). Sign out and in again, or ask the instructor for the link.</p></div>';
      } else {
        el.innerHTML = '';
      }
    });
  }

  function updateWhoami(session) {
    var el = document.getElementById('whoami');
    if (!el) return;
    if (session) {
      el.innerHTML = 'Signed in as ' + escapeHtml(session.email) + '<a href="#" id="signout">Sign out</a>';
      var so = el.querySelector('#signout');
      if (so) so.addEventListener('click', function (e) { e.preventDefault(); signOut(); });
    } else {
      el.innerHTML = '';
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  /* Fill links and text from config on any page */
  function applyConfigLinks() {
    var bs = C.brightspace || {};
    var map = {
      'link-substack': C.substackUrl,
      'link-college': C.collegeProjectUrl,
      'link-brightspace': C.brightspaceUrl,
      'link-office-hours': C.officeHoursUrl
    };
    Object.keys(map).forEach(function (id) {
      document.querySelectorAll('[data-link="' + id + '"]').forEach(function (a) {
        if (map[id]) { a.href = map[id]; a.target = '_blank'; a.rel = 'noopener'; }
      });
    });
    /* <a data-bs="dmp.baseline"> → the specific Brightspace link if set, else the general one */
    document.querySelectorAll('[data-bs]').forEach(function (a) {
      var path = a.getAttribute('data-bs').split('.');
      var url = (bs[path[0]] && bs[path[0]][path[1]]) || (bs[path[0]] && bs[path[0]].course) || C.brightspaceUrl;
      if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
      else { a.textContent = 'Brightspace (link to follow)'; a.classList.add('muted'); a.removeAttribute('href'); }
    });
    document.querySelectorAll('[data-text="instructor"]').forEach(function (el) { el.textContent = C.instructor || ''; });
    document.querySelectorAll('[data-text="institution"]').forEach(function (el) { el.textContent = C.institution || ''; });
    document.querySelectorAll('[data-text="email"]').forEach(function (el) { el.textContent = C.instructorEmail || ''; if (el.tagName === 'A') el.href = 'mailto:' + C.instructorEmail; });
    document.querySelectorAll('[data-text="office"]').forEach(function (el) { el.textContent = C.office || ''; });
    document.querySelectorAll('[data-text="year"]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    updateWhoami(readSession());
  }

  /* "This week" card: fills <div data-this-week="2026-10-26"> given the block's first Monday.
     Each week's pills are read from the page's .week[data-week] blocks when present. */
  function renderThisWeek() {
    document.querySelectorAll('[data-this-week]').forEach(function (el) {
      var start = new Date(el.getAttribute('data-this-week') + 'T00:00:00');
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var wk = Math.floor((today - start) / (7 * 864e5)) + 1;
      var html;
      if (wk < 1) html = '<div class="tw-big">Block 2 starts ' + start.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) + '</div><p class="small">' + escapeHtml(el.getAttribute('data-first') || '') + '</p>';
      else if (wk > 8) html = '<div class="tw-big">Block 2 is over</div><p class="small">Thank you for a good block.</p>';
      else {
        var weeks = null, w = null, title = '', pills = '';
        try { weeks = JSON.parse(el.getAttribute('data-weeks') || 'null'); } catch (e) { weeks = null; }
        if (weeks && weeks[wk - 1]) { title = weeks[wk - 1].t || ''; pills = weeks[wk - 1].p || ''; }
        else {
          w = document.querySelector('.week[data-week="' + wk + '"]');
          title = w ? w.getAttribute('data-title') || '' : '';
          pills = w ? w.getAttribute('data-pills') || '' : '';
        }
        html = '<div class="tw-big">Week ' + wk + (title ? ' · ' + escapeHtml(title) : '') + '</div>' +
          (pills ? '<div class="tw-pills">' + pills + '</div>' : '') +
          (el.getAttribute('data-schedule') ? '<p class="small"><a href="' + el.getAttribute('data-schedule') + '">See this week’s sessions and readings →</a></p>' : '');
      }
      el.innerHTML = html;
    });
    /* highlight the current week on schedule/readings pages */
    document.querySelectorAll('.week[data-week][data-start]').forEach(function (w) {
      var st = new Date(w.getAttribute('data-start') + 'T00:00:00'), today = new Date(); today.setHours(0, 0, 0, 0);
      var d = (today - st) / 864e5; if (d >= 0 && d < 7) w.classList.add('this-week');
    });
  }

  document.addEventListener('DOMContentLoaded', function () { applyConfigLinks(); renderThisWeek(); });

  window.Site = {
    sha256: function (s) { return sha256(utf8(s)); },
    session: readSession,
    signOut: signOut,
    requireSignIn: requireSignIn,
    emailAllowed: emailAllowed,
    escapeHtml: escapeHtml,
    course: courseKey,
    courseConfig: courseCfg,
    config: C
  };
})();
