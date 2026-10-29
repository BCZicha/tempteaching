/* ==========================================================================
   Problem-set workbook (DMP).
   Data: data/problem_sets.js (window.PROBLEM_SETS) — questions, prompts and
   base64-obscured model answers.

   Two storage modes, chosen automatically:
   - SERVER mode when the site is served by server/server.js: answers, drawings,
     uploads and submissions are stored on the server, per student or per group,
     so students can work over time from any device and together.
   - LOCAL mode when the page is opened from a file or a plain static host:
     everything is kept in this browser's localStorage (one device, one browser).

   Each part can be answered with text, by filling in the editable cells of any
   table in the prompt, by drawing on a sketch pad, or by uploading an image.
   After submission the student's answers are shown on screen beside the model
   answers; there is no download or print.
   ========================================================================== */
(function () {
  'use strict';
  var esc = Site.escapeHtml;
  var SETS = window.PROBLEM_SETS || [];
  var CONFIG = window.SITE_CONFIG || {};
  var POLL_MS = 6000;

  var api = null;           /* ServerStore or LocalStore */
  var me = null;            /* { email, groups:[], submissions:{psid:{at,scope,collaborators}} } */
  var scope = 'me';         /* 'me' or 'g:<id>' */
  var current = null;       /* current problem-set object */
  var work = null;          /* { parts:{id:{text,tables,images}}, collaborators, version, members } */
  var submission = null;    /* the signed-in student's submission for the current set, or null */
  var saveTimers = {};
  var pollTimer = null;
  var pendingChanges = {};
  var flushTimer = null;

  /* ====================================================================== utilities */
  function decode(b64) { try { return decodeURIComponent(escape(atob(b64))); } catch (e) { return ''; } }
  function fmtDate(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }
  function wordCount(s) { s = (s || '').trim(); return s ? s.split(/\s+/).length : 0; }
  function allParts(ps) { var out = []; ps.questions.forEach(function (q) { q.parts.forEach(function (p) { out.push({ q: q, p: p }); }); }); return out; }
  function partFilled(p) {
    if (!p) return false;
    if (p.text && p.text.replace(/\s+/g, ' ').trim()) return true;
    if (p.images && p.images.length) return true;
    if (p.tables) for (var k in p.tables) for (var r = 0; r < p.tables[k].length; r++) for (var c = 0; c < p.tables[k][r].length; c++) if (String(p.tables[k][r][c] || '').trim()) return true;
    return false;
  }
  function shortTitle(t) { return (t || '').replace(/^Question\s+([\d.]+?)\s*:\s*/i, 'Q$1 · ').replace(/^Question\s+(\d+)\s*/i, 'Q$1 · '); }
  function apiBase() {
    if (CONFIG.apiBase) return CONFIG.apiBase.replace(/\/$/, '');
    /* the page lives at /dmp/problem-sets.html; the API at /api/ on the same host */
    var p = location.pathname.replace(/\/dmp\/[^/]*$/, '');
    return location.origin + p + '/api';
  }
  function kindOf(p) { return (p.kind || 'DO').toUpperCase(); }
  function kindClass(k) { return /DRAW/.test(k) ? 'draw' : (/WRITE/.test(k) ? (/DO/.test(k) ? 'do' : 'write') : 'do'); }
  function toast(msg, bad) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.className = 'show' + (bad ? ' bad' : '');
    clearTimeout(t._h); t._h = setTimeout(function () { t.className = ''; }, 2600);
  }

  /* ====================================================================== storage: server */
  function ServerStore(base) {
    this.base = base; this.token = null;
  }
  ServerStore.prototype.req = function (method, path, body) {
    var self = this;
    var opts = { method: method, headers: {} };
    if (self.token) opts.headers['Authorization'] = 'Bearer ' + self.token;
    if (body !== undefined) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
    return fetch(self.base + path, opts).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.status === 401 && self.token) { self.token = null; try { localStorage.removeItem('bcz_ps_token'); } catch (e) {} showGate(); }
        if (!r.ok) throw new Error(j.error || ('Server error ' + r.status));
        return j;
      });
    });
  };
  ServerStore.prototype.login = function (email, password) {
    var self = this;
    return self.req('POST', '/login', { email: email, password: password }).then(function (j) {
      self.token = j.token;
      try { localStorage.setItem('bcz_ps_token', JSON.stringify({ token: j.token, email: j.email })); } catch (e) {}
      return j;
    });
  };
  ServerStore.prototype.restore = function () {
    var self = this;
    try { var s = JSON.parse(localStorage.getItem('bcz_ps_token') || 'null'); if (s && s.token) { self.token = s.token; return self.req('GET', '/me'); } } catch (e) {}
    return Promise.reject(new Error('no token'));
  };
  ServerStore.prototype.me = function () { return this.req('GET', '/me'); };
  ServerStore.prototype.logout = function () { var s = this; return s.req('POST', '/logout').catch(function () {}).then(function () { s.token = null; try { localStorage.removeItem('bcz_ps_token'); } catch (e) {} }); };
  ServerStore.prototype.createGroup = function (name) { return this.req('POST', '/groups', { name: name }); };
  ServerStore.prototype.joinGroup = function (code) { return this.req('POST', '/groups/join', { code: code }); };
  ServerStore.prototype.leaveGroup = function (id) { return this.req('POST', '/groups/' + encodeURIComponent(id) + '/leave'); };
  ServerStore.prototype.load = function (sc, ps) { return this.req('GET', '/work?scope=' + encodeURIComponent(sc) + '&ps=' + ps); };
  ServerStore.prototype.changes = function (sc, ps, since) { return this.req('GET', '/work?scope=' + encodeURIComponent(sc) + '&ps=' + ps + '&since=' + since); };
  ServerStore.prototype.save = function (sc, ps, changes, collaborators) {
    var body = { changes: changes };
    if (typeof collaborators === 'string') body.collaborators = collaborators;
    return this.req('PUT', '/work?scope=' + encodeURIComponent(sc) + '&ps=' + ps, body);
  };
  ServerStore.prototype.clear = function (sc, ps) { return this.req('DELETE', '/work?scope=' + encodeURIComponent(sc) + '&ps=' + ps); };
  ServerStore.prototype.upload = function (dataUrl) { return this.req('POST', '/upload', { data: dataUrl }).then(function (j) { return j.url; }); };
  ServerStore.prototype.submit = function (sc, ps, partIds, collaborators) { return this.req('POST', '/submit', { scope: sc, ps: ps, partIds: partIds, collaborators: collaborators }); };
  ServerStore.prototype.submission = function (ps) { return this.req('GET', '/submission?ps=' + ps).then(function (j) { return j.submission; }, function () { return null; }); };
  ServerStore.prototype.imageUrl = function (u) { return /^https?:|^data:/.test(u) ? u : this.base.replace(/\/api$/, '') + u; };

  /* ====================================================================== storage: local (browser only) */
  function LocalStore() { this.email = null; }
  LocalStore.prototype.key = function (ps) { return 'bcz_ps:' + this.email + ':' + ps; };
  LocalStore.prototype.read = function (ps) { try { return JSON.parse(localStorage.getItem(this.key(ps))) || { parts: {}, collaborators: '', version: 0 }; } catch (e) { return { parts: {}, collaborators: '', version: 0 }; } };
  LocalStore.prototype.write = function (ps, w) {
    try { localStorage.setItem(this.key(ps), JSON.stringify(w)); }
    catch (e) { toast('Could not save: this browser’s storage is full. Remove a large image or ask the instructor to run the workbook server.', true); throw e; }
  };
  LocalStore.prototype.me = function () { var subs = {}, self = this; SETS.forEach(function (ps) { var w = self.read(ps.id); if (w.submitted) subs[ps.id] = { at: w.submitted.at, scope: 'individual', collaborators: w.submitted.collaborators }; }); return Promise.resolve({ email: self.email, groups: [], submissions: subs }); };
  LocalStore.prototype.load = function (sc, ps) { var w = this.read(ps); return Promise.resolve({ version: w.version || 0, parts: w.parts || {}, collaborators: w.collaborators || '', members: [this.email] }); };
  LocalStore.prototype.changes = function () { return Promise.resolve({ version: 0, changes: {} }); };
  LocalStore.prototype.save = function (sc, ps, changes, collaborators) {
    var w = this.read(ps); w.parts = w.parts || {};
    for (var id in changes) w.parts[id] = changes[id];
    if (typeof collaborators === 'string') w.collaborators = collaborators;
    w.version = (w.version || 0) + 1; this.write(ps, w);
    return Promise.resolve({ version: w.version });
  };
  LocalStore.prototype.clear = function (sc, ps) { var w = this.read(ps); if (w.submitted) return Promise.reject(new Error('Submitted sets cannot be cleared.')); localStorage.removeItem(this.key(ps)); return Promise.resolve({ ok: true }); };
  LocalStore.prototype.upload = function (dataUrl) { return Promise.resolve(dataUrl); };
  LocalStore.prototype.submit = function (sc, ps, partIds, collaborators) {
    var w = this.read(ps);
    if (w.submitted) return Promise.reject(new Error('Already submitted.'));
    var answers = {};
    for (var i = 0; i < partIds.length; i++) { var p = w.parts[partIds[i]] || {}; answers[partIds[i]] = { text: p.text || '', tables: p.tables || {}, images: p.images || [] }; }
    w.submitted = { at: Date.now(), ps: ps, scope: 'individual', collaborators: collaborators || '', answers: answers };
    this.write(ps, w);
    return Promise.resolve({ submission: w.submitted });
  };
  LocalStore.prototype.submission = function (ps) { return Promise.resolve(this.read(ps).submitted || null); };
  LocalStore.prototype.imageUrl = function (u) { return u; };

  /* ====================================================================== sign-in */
  function gateEl() { return document.getElementById('gate'); }
  function showGate(prefillEmail) {
    var gate = gateEl(), content = document.getElementById('protected');
    content.style.display = 'none'; gate.style.display = '';
    stopPolling();
    gate.innerHTML =
      '<div class="signin"><div class="kicker">Students only · ' + esc((CONFIG.courses && CONFIG.courses.dmp && CONFIG.courses.dmp.name) || 'Decision-Making Processes') + '</div>' +
      '<h2>Open your workbook</h2>' +
      '<p class="small">Sign in with your institutional university e-mail and the course password given in class. Your work is saved on the course server under your e-mail, so you can continue from any device.</p>' +
      '<form id="ps-signin" autocomplete="on">' +
      '<div class="field"><label for="si-email">University e-mail</label><input id="si-email" type="email" required placeholder="s1234567@umail.leidenuniv.nl" autocomplete="username" value="' + esc(prefillEmail || '') + '"></div>' +
      '<div class="field"><label for="si-pass">Course password</label><input id="si-pass" type="password" required autocomplete="current-password"></div>' +
      '<p class="form-error" id="si-error" aria-live="polite"></p>' +
      '<button class="btn" type="submit">Enter</button></form></div>';
    var form = gate.querySelector('#ps-signin');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var btn = form.querySelector('button'), err = form.querySelector('#si-error');
      var email = form.querySelector('#si-email').value.trim().toLowerCase(), pw = form.querySelector('#si-pass').value;
      if (!Site.emailAllowed(email)) { err.textContent = 'Please use your institutional university e-mail address (for example your @umail.leidenuniv.nl address).'; return; }
      btn.disabled = true; err.textContent = '';
      api.login(email, pw).then(function (j) {
        btn.disabled = false;
        writeSiteSession(email, pw);
        start({ email: j.email, groups: j.groups || [], submissions: j.submissions || {} });
      }, function (e) { btn.disabled = false; err.textContent = e.message; });
    });
  }
  /* keep the rest of the site signed in too (same format site.js uses) */
  function writeSiteSession(email, password) {
    try {
      var existing = JSON.parse(localStorage.getItem('bcz_session_dmp') || 'null');
      if (existing && existing.email === email && Date.now() < existing.expires) return;
      var hours = CONFIG.sessionHours || 24, s = { email: email, course: 'dmp', since: Date.now(), expires: Date.now() + hours * 3600 * 1000, folder: '' };
      var enc = CONFIG.courses && CONFIG.courses.dmp && CONFIG.courses.dmp.readingFolder;
      function done() { try { localStorage.setItem('bcz_session_dmp', JSON.stringify(s)); } catch (e) {} }
      if (!(enc && enc.ct && window.crypto && crypto.subtle)) { done(); return; }
      function b64bytes(x) { var b = atob(x), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
      var te = new TextEncoder();
      crypto.subtle.importKey('raw', te.encode(password), 'PBKDF2', false, ['deriveKey'])
        .then(function (km) { return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64bytes(enc.salt), iterations: 200000, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']); })
        .then(function (key) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64bytes(enc.iv) }, key, b64bytes(enc.ct)); })
        .then(function (pt) { s.folder = new TextDecoder().decode(pt); done(); }, done);
    } catch (e) {}
  }

  /* ====================================================================== app start */
  function start(info) {
    me = info;
    document.getElementById('gate').style.display = 'none';
    document.getElementById('protected').style.display = '';
    var who = document.getElementById('whoami');
    if (who) {
      who.innerHTML = 'Signed in as ' + esc(me.email) + '<a href="#" id="signout">Sign out</a>';
      who.querySelector('#signout').addEventListener('click', function (e) {
        e.preventDefault();
        var done = function () { try { localStorage.removeItem('bcz_session_dmp'); } catch (x) {} location.reload(); };
        if (api.logout) api.logout().then(done, done); else done();
      });
    }
    var modeNote = document.getElementById('mode-note');
    if (modeNote) {
      modeNote.innerHTML = api instanceof ServerStore
        ? '<p><b>Saved on the course server.</b> Your answers, drawings and uploads are saved automatically under your e-mail as you work, so you can continue from any device, alone or in a group. Submit when a set is complete; the model answers are then shown beside your own, on screen only.</p>'
        : '<p><b>Saved in this browser only.</b> The workbook server is not running at this address, so your work is kept in this browser’s storage: use the same computer and browser, and do not clear site data. Group workspaces are available when the site is served by the course server.</p>';
    }
    renderWorkspaceBar();
    renderDashboard();
    route();
    window.addEventListener('hashchange', route);
  }

  /* ====================================================================== workspace (me / groups) */
  function scopeLabel(sc) {
    if (sc === 'me') return 'My workbook';
    var g = (me.groups || []).filter(function (x) { return 'g:' + x.id === sc; })[0];
    return g ? 'Group: ' + g.name : 'My workbook';
  }
  var panelOpen = false;
  function renderWorkspaceBar() {
    var bar = document.getElementById('workspace');
    if (!bar) return;
    if (!(api instanceof ServerStore)) { bar.innerHTML = ''; return; }
    var groups = me.groups || [];
    if (groups.length === 0 && scope !== 'me') scope = 'me';
    var html = '<div class="ws-row"><span class="kicker" style="margin:0">Workspace</span>' +
      '<select id="ws-select"><option value="me"' + (scope === 'me' ? ' selected' : '') + '>My workbook (individual)</option>' +
      groups.map(function (g) { return '<option value="g:' + esc(g.id) + '"' + (scope === 'g:' + g.id ? ' selected' : '') + '>Group: ' + esc(g.name) + ' (' + g.members.length + ')</option>'; }).join('') +
      '</select>' +
      '<button class="btn secondary sm" type="button" id="ws-manage">Groups…</button>' +
      '<span class="small muted" id="ws-hint">' + (scope === 'me' ? 'Only you can see and edit this workspace.' : 'Everyone in the group edits the same answers; changes appear within a few seconds.') + '</span></div>' +
      '<div id="ws-panel" class="ws-panel" hidden></div>';
    bar.innerHTML = html;
    bar.querySelector('#ws-select').addEventListener('change', function () { scope = this.value; renderWorkspaceBar(); if (current) openSet(current, true); });
    bar.querySelector('#ws-manage').addEventListener('click', function () { var p = bar.querySelector('#ws-panel'); panelOpen = p.hidden; p.hidden = !p.hidden; if (!p.hidden) renderGroupPanel(p); });
    if (panelOpen) { var pp = bar.querySelector('#ws-panel'); pp.hidden = false; renderGroupPanel(pp); }
  }
  function renderGroupPanel(p) {
    var groups = me.groups || [];
    p.innerHTML = '<div class="ws-cols"><div>' +
      '<h3>Your groups</h3>' +
      (groups.length ? groups.map(function (g) {
        return '<div class="ws-group"><b>' + esc(g.name) + '</b> <span class="pill">code ' + esc(g.code) + '</span><div class="small muted">' + g.members.map(esc).join(', ') + '</div>' +
          '<div class="ws-actions"><button class="btn secondary sm" data-open="g:' + esc(g.id) + '">Open</button><button class="btn danger sm" data-leave="' + esc(g.id) + '">Leave</button></div></div>';
      }).join('') : '<p class="small muted">You are not in a group yet. Create one and share its code, or join with a code from a classmate.</p>') +
      '</div><div>' +
      '<h3>Create a group</h3><form id="ws-create" class="ws-form"><input type="text" id="ws-name" placeholder="Group name, e.g. Team Hayek" maxlength="60" required><button class="btn sm" type="submit">Create</button></form>' +
      '<h3 style="margin-top:1rem">Join a group</h3><form id="ws-join" class="ws-form"><input type="text" id="ws-code" placeholder="6-character code" maxlength="6" required style="text-transform:uppercase"><button class="btn sm" type="submit">Join</button></form>' +
      '<p class="form-error" id="ws-error"></p>' +
      '<p class="small muted">A group shares one workspace per problem set. Each member still submits for themselves; the other members are listed automatically as collaborators.</p>' +
      '</div></div>';
    var err = p.querySelector('#ws-error');
    p.querySelector('#ws-create').addEventListener('submit', function (e) {
      e.preventDefault(); var name = p.querySelector('#ws-name').value.trim(); if (!name) return;
      api.createGroup(name).then(function (j) { me.groups.push(j.group); scope = 'g:' + j.group.id; renderWorkspaceBar(); toast('Group created — code ' + j.group.code); if (current) openSet(current, true); }, function (x) { err.textContent = x.message; });
    });
    p.querySelector('#ws-join').addEventListener('submit', function (e) {
      e.preventDefault(); var code = p.querySelector('#ws-code').value.trim().toUpperCase(); if (!code) return;
      api.joinGroup(code).then(function (j) {
        if (!me.groups.some(function (g) { return g.id === j.group.id; })) me.groups.push(j.group);
        scope = 'g:' + j.group.id; renderWorkspaceBar(); toast('Joined ' + j.group.name); if (current) openSet(current, true);
      }, function (x) { err.textContent = x.message; });
    });
    p.querySelectorAll('[data-open]').forEach(function (b) { b.addEventListener('click', function () { scope = b.getAttribute('data-open'); renderWorkspaceBar(); if (current) openSet(current, true); }); });
    p.querySelectorAll('[data-leave]').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-leave');
        if (!confirm('Leave this group? You can rejoin with its code.')) return;
        api.leaveGroup(id).then(function () { me.groups = me.groups.filter(function (g) { return g.id !== id; }); if (scope === 'g:' + id) scope = 'me'; renderWorkspaceBar(); if (current) openSet(current, true); }, function (x) { err.textContent = x.message; });
      });
    });
  }

  /* ====================================================================== dashboard & side list */
  function statusOf(ps) {
    var sub = me.submissions && me.submissions[ps.id];
    var total = allParts(ps).length;
    if (sub) return { state: 'pass', done: total, total: total, at: sub.at };
    if (current && current.id === ps.id && work) {
      var done = allParts(ps).filter(function (x) { return partFilled(work.parts[x.p.id]); }).length;
      return done ? { state: 'progress', done: done, total: total } : { state: 'none', done: 0, total: total };
    }
    return { state: 'unknown', done: 0, total: total };
  }
  function pillFor(st) {
    if (st.state === 'pass') return '<span class="pill pass">Submitted · Pass</span>';
    if (st.state === 'progress') return '<span class="pill progress">In progress ' + st.done + '/' + st.total + '</span>';
    if (st.state === 'none') return '<span class="pill none">Not started</span>';
    return '<span class="pill none">Open to see progress</span>';
  }
  function renderDashboard() {
    var dash = document.getElementById('dashboard'), passed = 0;
    dash.innerHTML = SETS.map(function (ps) {
      var st = statusOf(ps); if (st.state === 'pass') passed++;
      return '<a class="tile" href="#' + ps.id + '" style="border-bottom:0;display:block"><div class="kicker">Problem Set ' + ps.number + '</div><h3>' + esc(ps.short || ps.title) + '</h3>' +
        '<div class="small">Due ' + esc(ps.due || '') + '</div>' + pillFor(st) + (st.at ? '<div class="small muted" style="margin-top:.3rem">' + fmtDate(st.at) + '</div>' : '') + '</a>';
    }).join('') + '<div class="tile" style="background:var(--paper-2)"><div class="kicker">Standing</div><h3>' + passed + ' of ' + SETS.length + ' complete</h3><div class="small">Four complete = A · three = B · two = C · one = D</div></div>';
  }
  function renderSetList() {
    document.getElementById('set-list').innerHTML = SETS.map(function (ps) {
      return '<a href="#' + ps.id + '" class="' + (current && current.id === ps.id ? 'current' : '') + '"><span class="ps-num">Problem Set ' + ps.number + '</span>' + esc(ps.short || ps.title) + '<span class="st">' + pillFor(statusOf(ps)) + '</span></a>';
    }).join('');
  }
  function renderQnav() {
    var nav = document.getElementById('qnav');
    if (!current || !work) { nav.innerHTML = ''; return; }
    var st = statusOf(current);
    var html = '<div class="kicker" style="margin-bottom:.3rem">Progress · ' + esc(scopeLabel(scope)) + '</div>' +
      '<div class="progress-bar"><span style="width:' + Math.round(100 * st.done / st.total) + '%"></span></div>' +
      '<div class="small muted" style="margin-bottom:.8rem">' + st.done + ' of ' + st.total + ' parts answered</div>';
    html += current.questions.map(function (q) {
      var total = q.parts.length, done = q.parts.filter(function (p) { return submission ? true : partFilled(work.parts[p.id]); }).length;
      var cls = done === 0 ? '' : (done === total ? 'done' : 'partial');
      return '<a href="#' + current.id + '/' + q.id + '"><span class="dot ' + cls + '"></span>' + esc(shortTitle(q.title)) + '</a>';
    }).join('');
    html += '<a href="#' + current.id + '/submit" style="margin-top:.5rem;color:var(--navy)"><span class="dot ' + (st.state === 'pass' ? 'done' : '') + '"></span><b>Submit</b></a>';
    nav.innerHTML = html;
  }

  /* ====================================================================== open a set */
  function openSet(ps, keepScroll) {
    stopPolling();
    current = ps; work = null; submission = null;
    var main = document.getElementById('ps-main');
    main.innerHTML = '<p class="muted">Loading…</p>';
    var subP = api.submission(ps.id);
    var workP = api.load(scope, ps.id);
    Promise.all([subP, workP]).then(function (r) {
      submission = r[0];
      work = { parts: r[1].parts || {}, collaborators: r[1].collaborators || '', version: r[1].version || 0, members: r[1].members || [me.email] };
      if (submission) { me.submissions[ps.id] = { at: submission.at, scope: submission.scope, collaborators: submission.collaborators }; }
      renderSet();
      if (!keepScroll) window.scrollTo(0, 0);
      if (api instanceof ServerStore && !submission) startPolling();
    }, function (e) { main.innerHTML = '<div class="notice bad"><p>Could not load this problem set: ' + esc(e.message) + '</p></div>'; });
  }

  function renderSet() {
    var ps = current, main = document.getElementById('ps-main');
    var html = '<div class="ps-head"><div class="kicker">Problem Set ' + ps.number + '</div><h1>' + esc(ps.title) + '</h1>' +
      '<div class="ps-meta">' + (ps.due ? '<span><b>Due</b> ' + esc(ps.due) + '</span>' : '') + (ps.time_budget ? '<span><b>Time</b> ' + esc(ps.time_budget) + '</span>' : '') +
      (ps.week ? '<span><b>Week</b> ' + esc(ps.week) + '</span>' : '') + '<span><b>Status</b> ' + pillFor(statusOf(ps)) + '</span>' +
      (api instanceof ServerStore ? '<span><b>Workspace</b> ' + esc(scopeLabel(scope)) + '</span>' : '') + '</div>' +
      '<div class="legend"><span><span class="pill">Read</span> provided information to study</span><span><span class="pill do">Do</span> calculate or fill in</span>' +
      '<span><span class="pill write">Write</span> explain, length as specified</span><span><span class="pill draw">Draw</span> sketch it on the pad, or upload a picture</span></div></div>';
    html += '<div id="save-state"></div>';
    if (submission) {
      html += '<div class="notice ok"><p><b>Submitted ' + fmtDate(submission.at) + ' — Pass.</b> Your answers are shown beside the model answers below, on screen only. Use the comparison to prepare for the exam.</p></div>';
    } else if (scope !== 'me') {
      html += '<div class="notice"><p><b>Group workspace.</b> Everyone in <b>' + esc(scopeLabel(scope).replace(/^Group: /, '')) + '</b> (' + (work.members || []).map(esc).join(', ') + ') edits these answers together. When you submit, the group’s answers are recorded under <i>your</i> name with the other members listed as collaborators; each member submits separately.</p></div>';
    }
    if (ps.objectives && ps.objectives.length) html += '<details class="collapsible"><summary>Learning objectives</summary><div><ul>' + ps.objectives.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul></div></details>';
    if (ps.intro_html) html += '<details class="collapsible"><summary>Instructions &amp; submission guidelines</summary><div class="prose">' + ps.intro_html + '</div></details>';

    ps.questions.forEach(function (q) {
      html += '<section class="question" id="' + ps.id + '-' + q.id + '"><h2>' + esc(q.title) + (q.subtitle ? ' <span class="qsub">' + esc(q.subtitle) + '</span>' : '') + '</h2>';
      if (q.read_html) html += '<div class="read-block"><span class="tag">Read</span>' + q.read_html + '</div>';
      q.parts.forEach(function (p) {
        var k = kindOf(p), a = (submission ? submission.answers[p.id] : work.parts[p.id]) || {};
        html += '<div class="part" id="part-' + p.id + '" data-part="' + p.id + '">' +
          '<div class="part-head"><span class="pill ' + kindClass(k) + '">' + esc(k) + '</span><span class="label">' + esc(p.label) + '</span>' +
          '<span class="status" data-status="' + p.id + '">' + (partFilled(a) ? 'saved' : '') + '</span></div>' +
          '<div class="part-body"><div class="prompt" data-prompt="' + p.id + '">' + (p.prompt_html || '') + '</div>';
        if (!submission) {
          html += '<textarea data-text="' + p.id + '" placeholder="' + (/DRAW/.test(k) ? 'Notes to go with your drawing (optional if you draw or upload)…' : 'Your answer…') + '" spellcheck="true">' + esc(a.text || '') + '</textarea>' +
            '<div class="figures" data-figures="' + p.id + '"></div>' +
            '<div class="part-tools"><span class="tools-left"><button class="btn secondary sm" type="button" data-draw="' + p.id + '">✎ Draw</button>' +
            '<label class="btn secondary sm upload-btn">⤒ Upload image<input type="file" accept="image/*" data-upload="' + p.id + '" hidden></label></span>' +
            '<span class="wc" data-wc="' + p.id + '">' + wordCount(a.text) + ' words</span></div>';
        } else {
          var modelHtml = decode(p.answer_b64);
          var stacked = /<table|<pre|<figure|<img/.test(modelHtml) || modelHtml.length > 2500 || (a.images && a.images.length) || hasTables(a);
          html += '<div class="compare' + (stacked ? ' stacked' : '') + '">' +
            '<div class="mine"><div class="hd">Your answer</div>' + renderMine(p, a) + '</div>' +
            '<div class="model"><div class="hd">Model answer</div>' + (modelHtml || '<p class="muted">No model answer is available for this part yet.</p>') +
            (p.note_html ? '<div class="small muted" style="margin-top:.6rem;border-top:1px dotted var(--rule);padding-top:.4rem">' + p.note_html + '</div>' : '') + '</div></div>';
        }
        html += '</div></div>';
      });
      html += '</section>';
    });

    html += '<section class="ps-submit" id="' + ps.id + '-submit"><h2>Submit Problem Set ' + ps.number + '</h2>';
    if (!submission) {
      html += '<p>Submitting records this set as <b>complete (pass)</b> under your name and reveals the model answers. You can keep working until every part has an answer (text, a filled-in table, a drawing or an upload); the button unlocks when nothing is missing.</p>' +
        '<div class="field"><label for="collab">Collaborators (names of everyone you worked with, or “none”)</label>' +
        '<input id="collab" type="text" value="' + esc(work.collaborators || '') + '" placeholder="e.g. A. Student, B. Student"></div>' +
        '<div class="missing" id="missing"></div>' +
        '<div class="ps-actions"><button class="btn" id="submit-btn" disabled>Submit and reveal model answers</button>' +
        '<button class="btn danger sm" id="clear-btn" title="Deletes every saved answer for this set in this workspace">Clear this set</button></div>' +
        '<div class="progress-file"><div class="kicker" style="margin:0 0 .3rem">Your progress file</div>' +
        '<p class="small" style="margin:0 0 .5rem">Download your answers so far (only your own answers — no questions, no model answers) and continue later on any computer by uploading the file here. ' +
        (api instanceof ServerStore ? 'Your work is also saved on the course server; the file is an extra copy.' : 'Because the workbook is saving in this browser only, this file is how you carry your work to another device — download it when you stop working.') + '</p>' +
        '<div class="ps-actions"><button class="btn secondary sm" type="button" id="export-progress">⤓ Download my progress</button>' +
        '<label class="btn secondary sm upload-btn">⤒ Upload a progress file<input type="file" id="import-progress" accept=".md,.txt,.json,text/markdown,text/plain,application/json" hidden></label>' +
        '<span class="small muted" id="progress-msg"></span></div></div>';
    } else {
      html += '<p>Submitted <b>' + fmtDate(submission.at) + '</b> by ' + esc(me.email) + (submission.scope && submission.scope !== 'individual' ? ' (' + esc(submission.scope) + ')' : '') +
        (submission.collaborators ? ' · collaborators: ' + esc(submission.collaborators) : '') + '.</p>' +
        '<p class="small muted">The comparison is for studying on screen; it cannot be downloaded or printed. If a submission needs to be reopened, ask the instructor.</p>';
    }
    html += '</section>';
    main.innerHTML = html;
    if (!submission) { setupTables(); renderAllFigures(); bind(); updateMissing(); fileSyncLoad(ps.id); }
    else { main.querySelectorAll('.compare .mine img').forEach(function (im) { im.addEventListener('click', function () { lightbox(im.src); }); }); }
    renderSetList(); renderQnav(); renderDashboard();
  }

  function hasTables(a) { if (!a || !a.tables) return false; for (var k in a.tables) return true; return false; }

  /* ---------- the student's answer as shown after submission ---------- */
  function renderMine(p, a) {
    var out = '';
    if (a.text) out += '<div class="mine-text">' + esc(a.text) + '</div>';
    if (a.tables) {
      var tmp = document.createElement('div'); tmp.innerHTML = p.prompt_html || '';
      var tables = tmp.querySelectorAll('table');
      Object.keys(a.tables).forEach(function (k) {
        var t = tables[parseInt(k, 10)]; if (!t) return;
        var clone = t.cloneNode(true), rows = clone.querySelectorAll('tr');
        a.tables[k].forEach(function (r, ri) { if (!rows[ri]) return; var tds = rows[ri].querySelectorAll('td'); r.forEach(function (v, ci) { if (tds[ci] != null && String(v || '') !== '') { tds[ci].textContent = v; tds[ci].className = 'filled'; } }); });
        out += '<div class="mine-table">' + clone.outerHTML + '</div>';
      });
    }
    if (a.images && a.images.length) out += '<div class="fig-grid">' + a.images.map(function (im) { return '<figure><img src="' + esc(api.imageUrl(im.url)) + '" alt="" loading="lazy"><figcaption>' + esc(im.caption || (im.kind === 'drawing' ? 'Drawing' : 'Uploaded image')) + '</figcaption></figure>'; }).join('') + '</div>';
    return out || '<span class="muted">(no answer)</span>';
  }

  /* ====================================================================== editable tables */
  function setupTables() {
    var main = document.getElementById('ps-main');
    main.querySelectorAll('[data-prompt]').forEach(function (box) {
      var id = box.getAttribute('data-prompt'), a = work.parts[id] || {};
      box.querySelectorAll('table').forEach(function (t, ti) {
        t.classList.add('editable');
        var saved = a.tables && a.tables[String(ti)];
        t.querySelectorAll('tr').forEach(function (tr, ri) {
          tr.querySelectorAll('td').forEach(function (td, ci) {
            if (!isBlankCell(td)) return;                      /* given values and row labels stay as they are */
            td.setAttribute('contenteditable', 'true'); td.setAttribute('data-cell', ti + ':' + ri + ':' + ci); td.spellcheck = false;
            td.setAttribute('data-orig', td.textContent.trim()); td.textContent = '';
            if (saved && saved[ri] && saved[ri][ci] != null && saved[ri][ci] !== '') { td.textContent = saved[ri][ci]; td.classList.add('filled'); }
          });
        });
        t.addEventListener('input', function (e) { var td = e.target.closest('td'); if (td) td.classList.toggle('filled', td.textContent.trim() !== ''); queueSave(id); });
        t.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); var cells = Array.prototype.slice.call(t.querySelectorAll('td[contenteditable]')); var i = cells.indexOf(e.target.closest('td')); if (cells[i + 1]) cells[i + 1].focus(); } });
      });
      if (box.querySelector('td[contenteditable]')) { var hint = document.createElement('div'); hint.className = 'small muted table-hint'; hint.textContent = 'The cells of this table can be edited directly: click a cell and type. Enter moves to the next cell.'; box.appendChild(hint); }
    });
  }
  function isBlankCell(td) {
    var t = td.textContent.trim();
    if (t === '') return true;
    if (/_{2,}/.test(t)) return true;                               /* ____ or ( __, __ ) or $____ */
    if (/^\(.*\?\)$/.test(t)) return true;                         /* (hint in parentheses?) */
    return false;
  }
  function collectTables(id) {
    var box = document.querySelector('[data-prompt="' + id + '"]'); if (!box) return undefined;
    var tables = box.querySelectorAll('table'); if (!tables.length) return undefined;
    var out = {}, any = false;
    tables.forEach(function (t, ti) {
      var rows = [];
      t.querySelectorAll('tr').forEach(function (tr) {
        var r = []; tr.querySelectorAll('td').forEach(function (td) { var v = td.hasAttribute('contenteditable') ? td.textContent : ''; r.push(v); if (v.trim()) any = true; });
        rows.push(r);
      });
      out[String(ti)] = rows;
    });
    return any ? out : undefined;
  }

  /* ====================================================================== figures (drawings & uploads) */
  function renderAllFigures() { document.querySelectorAll('[data-figures]').forEach(function (el) { renderFigures(el.getAttribute('data-figures')); }); }
  function renderFigures(id) {
    var el = document.querySelector('[data-figures="' + id + '"]'); if (!el) return;
    var imgs = (work.parts[id] && work.parts[id].images) || [];
    if (!imgs.length) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="fig-grid">' + imgs.map(function (im, i) {
      return '<figure><img src="' + esc(api.imageUrl(im.url)) + '" alt="" data-view="' + i + '"><figcaption><input type="text" value="' + esc(im.caption || '') + '" placeholder="' + (im.kind === 'drawing' ? 'Drawing' : 'Uploaded image') + ' — add a caption" data-caption="' + i + '">' +
        (im.kind === 'drawing' ? '<button type="button" class="btn secondary sm" data-edit="' + i + '">Edit</button>' : '') + '<button type="button" class="btn danger sm" data-remove="' + i + '">Remove</button></figcaption></figure>';
    }).join('') + '</div>';
    el.querySelectorAll('[data-view]').forEach(function (im) { im.addEventListener('click', function () { lightbox(im.src); }); });
    el.querySelectorAll('[data-caption]').forEach(function (inp) { inp.addEventListener('input', function () { var i = +inp.getAttribute('data-caption'); if (work.parts[id].images[i]) { work.parts[id].images[i].caption = inp.value; queueSave(id); } }); });
    el.querySelectorAll('[data-remove]').forEach(function (b) { b.addEventListener('click', function () { var i = +b.getAttribute('data-remove'); work.parts[id].images.splice(i, 1); renderFigures(id); queueSave(id); }); });
    el.querySelectorAll('[data-edit]').forEach(function (b) { b.addEventListener('click', function () { var i = +b.getAttribute('data-edit'); openSketch(id, i); }); });
  }
  function addImage(id, url, kind) {
    work.parts[id] = work.parts[id] || { text: '' };
    work.parts[id].images = work.parts[id].images || [];
    work.parts[id].images.push({ url: url, kind: kind, caption: '' });
    renderFigures(id); queueSave(id, true);
  }
  function handleUpload(id, file) {
    if (!file || !/^image\//.test(file.type)) { toast('Please choose an image file (PNG, JPEG…).', true); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 1400, w = img.width, h = img.height;
        if (w > max || h > max) { var s = max / Math.max(w, h); w = Math.round(w * s); h = Math.round(h * s); }
        var c = document.createElement('canvas'); c.width = w; c.height = h;
        var ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h);
        var data = c.toDataURL('image/jpeg', 0.85);
        if (!(api instanceof ServerStore) && data.length > 900000) { toast('That image is too large to keep in browser storage; try a smaller one.', true); return; }
        setStatus(id, 'uploading…');
        api.upload(data).then(function (url) { addImage(id, url, 'upload'); }, function (e) { toast('Upload failed: ' + e.message, true); setStatus(id, ''); });
      };
      img.onerror = function () { toast('That file could not be read as an image.', true); };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  /* ---------- sketch pad ---------- */
  var sketch = null;
  function openSketch(id, editIndex) {
    var existing = editIndex != null ? work.parts[id].images[editIndex] : null;
    var W = 960, H = 640;
    var ov = document.createElement('div'); ov.className = 'sk-overlay';
    ov.innerHTML = '<div class="sk-box"><div class="sk-head"><b>' + (existing ? 'Edit drawing' : 'Draw your answer') + '</b><span class="small muted">' + esc(current.questions.map(function (q) { return q.parts; }).reduce(function (a, b) { return a.concat(b); }, []).filter(function (p) { return p.id === id; }).map(function (p) { return p.label; })[0] || '') + '</span><button type="button" class="btn secondary sm" data-close>✕ Close</button></div>' +
      '<div class="sk-tools">' +
      '<span class="sk-group"><button type="button" class="sk-tool on" data-tool="pen" title="Pen">✎ Pen</button><button type="button" class="sk-tool" data-tool="line" title="Straight line">╱ Line</button><button type="button" class="sk-tool" data-tool="circle" title="Circle (drag from centre)">◯ Circle</button><button type="button" class="sk-tool" data-tool="text" title="Place text">A Text</button><button type="button" class="sk-tool" data-tool="eraser" title="Eraser">◻ Eraser</button></span>' +
      '<span class="sk-group"><button type="button" class="sk-color on" data-color="#1c1f27" style="background:#1c1f27"></button><button type="button" class="sk-color" data-color="#1f3a5f" style="background:#1f3a5f"></button><button type="button" class="sk-color" data-color="#7a2e2e" style="background:#7a2e2e"></button><button type="button" class="sk-color" data-color="#2f6b3a" style="background:#2f6b3a"></button><button type="button" class="sk-color" data-color="#a98a3f" style="background:#a98a3f"></button></span>' +
      '<span class="sk-group"><button type="button" class="sk-size" data-size="2">thin</button><button type="button" class="sk-size on" data-size="4">medium</button><button type="button" class="sk-size" data-size="9">thick</button></span>' +
      '<span class="sk-group"><label class="small">Background <select data-bg><option value="plain">plain</option><option value="grid">grid</option><option value="axes">axes 0–100</option><option value="line">number line</option></select></label></span>' +
      '<span class="sk-group"><button type="button" class="btn secondary sm" data-undo>↶ Undo</button><button type="button" class="btn secondary sm" data-clear>Clear</button></span>' +
      '</div>' +
      '<div class="sk-canvas-wrap"><canvas class="sk-bg" width="' + W + '" height="' + H + '"></canvas><canvas class="sk-ink" width="' + W + '" height="' + H + '"></canvas><canvas class="sk-tmp" width="' + W + '" height="' + H + '"></canvas><input type="text" class="sk-textin" hidden placeholder="Type, then Enter"></div>' +
      '<div class="sk-foot"><span class="small muted">Draw with the mouse, a pen or a finger. Line and circle: drag. Text: click where it should go.</span><span><button type="button" class="btn secondary sm" data-close>Cancel</button> <button type="button" class="btn" data-save>Save drawing</button></span></div></div>';
    document.body.appendChild(ov);
    var bg = ov.querySelector('.sk-bg'), ink = ov.querySelector('.sk-ink'), tmp = ov.querySelector('.sk-tmp'), textin = ov.querySelector('.sk-textin');
    var ictx = ink.getContext('2d'), tctx = tmp.getContext('2d');
    var state = { tool: 'pen', color: '#1c1f27', size: 4, bgKind: 'plain', undo: [], drawing: false, start: null, last: null };
    ictx.lineCap = 'round'; ictx.lineJoin = 'round'; tctx.lineCap = 'round'; tctx.lineJoin = 'round';
    function drawBg(kind) {
      var c = bg.getContext('2d'); c.clearRect(0, 0, W, H); c.fillStyle = '#fff'; c.fillRect(0, 0, W, H);
      c.strokeStyle = '#d8d4c8'; c.lineWidth = 1; c.font = '14px sans-serif'; c.fillStyle = '#7a7f8c';
      if (kind === 'grid') { for (var x = 0; x <= W; x += 40) { c.beginPath(); c.moveTo(x + .5, 0); c.lineTo(x + .5, H); c.stroke(); } for (var y = 0; y <= H; y += 40) { c.beginPath(); c.moveTo(0, y + .5); c.lineTo(W, y + .5); c.stroke(); } }
      if (kind === 'axes') {
        var ox = 80, oy = H - 70, sz = 500, step = sz / 10;
        for (var i = 0; i <= 10; i++) { c.strokeStyle = i % 5 === 0 ? '#bfb9aa' : '#e6e0d2'; c.beginPath(); c.moveTo(ox + i * step, oy); c.lineTo(ox + i * step, oy - sz); c.stroke(); c.beginPath(); c.moveTo(ox, oy - i * step); c.lineTo(ox + sz, oy - i * step); c.stroke(); c.fillText(String(i * 10), ox + i * step - 8, oy + 20); c.fillText(String(i * 10), ox - 32, oy - i * step + 5); }
        c.strokeStyle = '#1c1f27'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(ox, oy); c.lineTo(ox + sz, oy); c.moveTo(ox, oy); c.lineTo(ox, oy - sz); c.stroke();
      }
      if (kind === 'line') {
        var lx = 60, ly = H / 2, lw = W - 120; c.strokeStyle = '#1c1f27'; c.lineWidth = 2; c.beginPath(); c.moveTo(lx, ly); c.lineTo(lx + lw, ly); c.stroke();
        for (var j = 0; j <= 14; j++) { var tx = lx + j * lw / 14; c.beginPath(); c.moveTo(tx, ly - 8); c.lineTo(tx, ly + 8); c.stroke(); c.fillText(String(j * 10), tx - 8, ly + 28); }
      }
    }
    drawBg('plain');
    if (existing) { var im = new Image(); im.crossOrigin = 'anonymous'; im.onload = function () { ictx.drawImage(im, 0, 0, W, H); }; im.src = api.imageUrl(existing.url); }
    function pos(e) { var r = ink.getBoundingClientRect(), t = e.touches ? e.touches[0] : e; return { x: (t.clientX - r.left) * W / r.width, y: (t.clientY - r.top) * H / r.height }; }
    function pushUndo() { state.undo.push(ictx.getImageData(0, 0, W, H)); if (state.undo.length > 30) state.undo.shift(); }
    function stroke(ctx, a, b) { ctx.strokeStyle = state.tool === 'eraser' ? '#fff' : state.color; ctx.lineWidth = state.tool === 'eraser' ? state.size * 5 : state.size; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    function down(e) {
      if (e.touches && e.touches.length > 1) return;
      e.preventDefault(); var p = pos(e);
      if (state.tool === 'text') { textin.hidden = false; textin.style.left = (p.x * ink.getBoundingClientRect().width / W) + 'px'; textin.style.top = (p.y * ink.getBoundingClientRect().height / H) + 'px'; textin.dataset.x = p.x; textin.dataset.y = p.y; textin.value = ''; setTimeout(function () { textin.focus(); }, 0); return; }
      pushUndo(); state.drawing = true; state.start = p; state.last = p;
      if (state.tool === 'pen' || state.tool === 'eraser') { stroke(ictx, p, { x: p.x + .01, y: p.y + .01 }); }
    }
    function move(e) {
      if (!state.drawing) return; e.preventDefault(); var p = pos(e);
      if (state.tool === 'pen' || state.tool === 'eraser') { stroke(ictx, state.last, p); state.last = p; }
      else { tctx.clearRect(0, 0, W, H); preview(tctx, state.start, p); }
    }
    function preview(ctx, a, b) {
      ctx.strokeStyle = state.color; ctx.lineWidth = state.size; ctx.beginPath();
      if (state.tool === 'line') { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }
      if (state.tool === 'circle') { var r = Math.hypot(b.x - a.x, b.y - a.y); ctx.arc(a.x, a.y, r, 0, Math.PI * 2); }
      ctx.stroke();
    }
    function up(e) {
      if (!state.drawing) return; state.drawing = false; var p = state.last;
      if (state.tool === 'line' || state.tool === 'circle') { p = e.changedTouches ? pos({ touches: [e.changedTouches[0]] }) : pos(e); tctx.clearRect(0, 0, W, H); preview(ictx, state.start, p); }
    }
    ink.style.pointerEvents = 'none'; tmp.addEventListener('mousedown', down); tmp.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
    tmp.addEventListener('touchstart', down, { passive: false }); tmp.addEventListener('touchmove', move, { passive: false }); tmp.addEventListener('touchend', up);
    textin.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); var t = textin.value.trim(); if (t) { pushUndo(); ictx.fillStyle = state.color; ictx.font = (state.size >= 9 ? 26 : state.size >= 4 ? 20 : 15) + 'px sans-serif'; ictx.fillText(t, +textin.dataset.x, +textin.dataset.y); } textin.hidden = true; }
      if (e.key === 'Escape') textin.hidden = true;
    });
    ov.querySelectorAll('.sk-tool').forEach(function (b) { b.addEventListener('click', function () { ov.querySelectorAll('.sk-tool').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); state.tool = b.getAttribute('data-tool'); textin.hidden = true; }); });
    ov.querySelectorAll('.sk-color').forEach(function (b) { b.addEventListener('click', function () { ov.querySelectorAll('.sk-color').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); state.color = b.getAttribute('data-color'); }); });
    ov.querySelectorAll('.sk-size').forEach(function (b) { b.addEventListener('click', function () { ov.querySelectorAll('.sk-size').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); state.size = +b.getAttribute('data-size'); }); });
    ov.querySelector('[data-bg]').addEventListener('change', function () { state.bgKind = this.value; drawBg(state.bgKind); });
    ov.querySelector('[data-undo]').addEventListener('click', function () { var u = state.undo.pop(); if (u) ictx.putImageData(u, 0, 0); });
    ov.querySelector('[data-clear]').addEventListener('click', function () { pushUndo(); ictx.clearRect(0, 0, W, H); });
    function close() { window.removeEventListener('mouseup', up); document.body.removeChild(ov); sketch = null; }
    ov.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', close); });
    ov.querySelector('[data-save]').addEventListener('click', function () {
      var out = document.createElement('canvas'); out.width = W; out.height = H; var oc = out.getContext('2d');
      oc.drawImage(bg, 0, 0); oc.drawImage(ink, 0, 0);
      var data = out.toDataURL('image/png');
      var btn = this; btn.disabled = true; btn.textContent = 'Saving…';
      api.upload(data).then(function (url) {
        if (existing) { existing.url = url; renderFigures(id); queueSave(id, true); } else addImage(id, url, 'drawing');
        close();
      }, function (e) { btn.disabled = false; btn.textContent = 'Save drawing'; toast('Could not save the drawing: ' + e.message, true); });
    });
    sketch = ov;
  }
  function lightbox(src) {
    var ov = document.createElement('div'); ov.className = 'sk-overlay lightbox'; ov.innerHTML = '<img src="' + esc(src) + '" alt=""><div class="small" style="color:#fff;margin-top:.6rem">Click anywhere to close</div>';
    ov.addEventListener('click', function () { document.body.removeChild(ov); }); document.body.appendChild(ov);
  }

  /* ====================================================================== saving */
  function setStatus(id, text, cls) { var st = document.querySelector('[data-status="' + id + '"]'); if (st) { st.textContent = text; st.className = 'status' + (cls ? ' ' + cls : ''); } }
  function snapshot(id) {
    var ta = document.querySelector('[data-text="' + id + '"]');
    var p = work.parts[id] || {};
    var out = { text: ta ? ta.value : (p.text || ''), images: p.images || [] };
    var tables = collectTables(id); if (tables) out.tables = tables;
    return out;
  }
  function queueSave(id, immediate) {
    setStatus(id, 'saving…');
    clearTimeout(saveTimers[id]);
    saveTimers[id] = setTimeout(function () {
      work.parts[id] = snapshot(id);
      pendingChanges[id] = work.parts[id];
      flushSoon();
    }, immediate ? 0 : 500);
  }
  var collabTimer = null, pendingCollab = null;
  function flushSoon() { clearTimeout(flushTimer); flushTimer = setTimeout(flush, 250); }
  function flush() {
    var changes = pendingChanges, collab = pendingCollab; pendingChanges = {}; pendingCollab = null;
    var ids = Object.keys(changes);
    if (!ids.length && collab == null) return;
    api.save(scope, current.id, changes, collab == null ? undefined : collab).then(function (j) {
      if (j && j.version != null) work.version = Math.max(work.version || 0, j.version);
      ids.forEach(function (id) { setStatus(id, partFilled(work.parts[id]) ? 'saved' : '', 'saved'); });
      renderQnav(); updateMissing(); renderSetList();
      if (!(api instanceof ServerStore)) { markDirty(current.id); fileSyncWrite(); }
    }, function (e) {
      ids.forEach(function (id) { pendingChanges[id] = changes[id]; setStatus(id, 'not saved — retrying', 'bad'); });
      if (collab != null) pendingCollab = collab;
      toast('Could not save: ' + e.message, true);
      setTimeout(flushSoon, 4000);
    });
  }

  function bind() {
    var main = document.getElementById('ps-main');
    main.querySelectorAll('textarea[data-text]').forEach(function (ta) {
      ta.addEventListener('input', function () {
        var id = ta.getAttribute('data-text');
        var wc = main.querySelector('[data-wc="' + id + '"]'); if (wc) wc.textContent = wordCount(ta.value) + ' words';
        queueSave(id);
      });
      ta.addEventListener('focus', function () { ta.dataset.focused = '1'; });
      ta.addEventListener('blur', function () { delete ta.dataset.focused; });
    });
    main.querySelectorAll('[data-draw]').forEach(function (b) { b.addEventListener('click', function () { openSketch(b.getAttribute('data-draw')); }); });
    main.querySelectorAll('input[data-upload]').forEach(function (inp) { inp.addEventListener('change', function () { handleUpload(inp.getAttribute('data-upload'), inp.files[0]); inp.value = ''; }); });
    var collab = main.querySelector('#collab');
    if (collab) collab.addEventListener('input', function () { work.collaborators = collab.value; clearTimeout(collabTimer); collabTimer = setTimeout(function () { pendingCollab = collab.value; flushSoon(); }, 600); });
    var sb = main.querySelector('#submit-btn'); if (sb) sb.addEventListener('click', submit);
    var ep = main.querySelector('#export-progress'); if (ep) ep.addEventListener('click', exportProgress);
    var ip = main.querySelector('#import-progress'); if (ip) ip.addEventListener('change', function () { if (ip.files[0]) importProgress(ip.files[0]); ip.value = ''; });
    var cb = main.querySelector('#clear-btn');
    if (cb) cb.addEventListener('click', function () {
      if (!confirm('Delete every saved answer, table, drawing and upload for this problem set in ' + scopeLabel(scope) + '? This cannot be undone.')) return;
      api.clear(scope, current.id).then(function () { openSet(current); }, function (e) { toast(e.message, true); });
    });
  }

  function updateMissing() {
    var box = document.getElementById('missing'), btn = document.getElementById('submit-btn');
    if (!box || !btn || !work) return;
    var missing = allParts(current).filter(function (x) { return !partFilled(work.parts[x.p.id]); });
    if (missing.length === 0) { box.innerHTML = '<span style="color:var(--pass)">All ' + allParts(current).length + ' parts have an answer. You may submit.</span>'; btn.disabled = false; }
    else {
      box.innerHTML = '<b>' + missing.length + ' part' + (missing.length > 1 ? 's' : '') + ' still blank:</b> ' +
        missing.slice(0, 12).map(function (x) { return '<a href="#' + current.id + '/' + x.q.id + '">' + esc(shortTitle(x.q.title).replace(/ ·.*$/, '')) + ' ' + esc(x.p.label) + '</a>'; }).join(' · ') + (missing.length > 12 ? ' …' : '');
      btn.disabled = true;
    }
  }

  function submit() {
    /* make sure the latest edits are on the server first */
    allParts(current).forEach(function (x) { var s = snapshot(x.p.id); if (JSON.stringify(s) !== JSON.stringify(work.parts[x.p.id] || {})) { work.parts[x.p.id] = s; pendingChanges[x.p.id] = s; } });
    var missing = allParts(current).filter(function (x) { return !partFilled(work.parts[x.p.id]); });
    if (missing.length) { updateMissing(); return; }
    if (!confirm('Submit Problem Set ' + current.number + ' under your name (' + me.email + ')? Your answers will be recorded and the model answers revealed.')) return;
    var btn = document.getElementById('submit-btn'); btn.disabled = true; btn.textContent = 'Submitting…';
    var collab = (document.getElementById('collab') || {}).value || work.collaborators || '';
    var ids = allParts(current).map(function (x) { return x.p.id; });
    clearTimeout(flushTimer);
    api.save(scope, current.id, pendingChanges, collab).then(function () {
      pendingChanges = {};
      return api.submit(scope, current.id, ids, collab);
    }).then(function (j) {
      stopPolling();
      submission = j.submission; me.submissions[current.id] = { at: submission.at, scope: submission.scope, collaborators: submission.collaborators };
      renderSet(); window.scrollTo(0, 0); toast('Submitted — pass. Compare your answers with the model answers.');
    }, function (e) { btn.disabled = false; btn.textContent = 'Submit and reveal model answers'; toast('Could not submit: ' + e.message, true); updateMissing(); });
  }

  /* ====================================================================== progress file (download / upload) */
  var PROGRESS_TAG = 'DMP-WORKBOOK-PROGRESS';
  function toDataUrl(url) {
    if (/^data:/.test(url)) return Promise.resolve(url);
    return fetch(api.imageUrl(url)).then(function (r) { return r.blob(); }).then(function (b) {
      return new Promise(function (res, rej) { var fr = new FileReader(); fr.onload = function () { res(fr.result); }; fr.onerror = rej; fr.readAsDataURL(b); });
    });
  }
  function tableMarkdown(p, rows) {
    /* the student's filled-in cells, with the table's own headers so the file is readable; no question text */
    var tmp = document.createElement('div'); tmp.innerHTML = p.prompt_html || '';
    var out = [];
    Object.keys(rows).forEach(function (k) {
      var t = tmp.querySelectorAll('table')[parseInt(k, 10)]; if (!t) return;
      var trs = t.querySelectorAll('tr'), lines = [];
      trs.forEach(function (tr, ri) {
        var cells = [];
        tr.querySelectorAll('th,td').forEach(function (c) {
          var txt = c.textContent.trim(); var isBlank = c.tagName === 'TD' && isBlankCell(c);
          if (c.tagName === 'TD') { var tds = Array.prototype.slice.call(tr.querySelectorAll('td')), ci = tds.indexOf(c); var v = rows[k][ri] && rows[k][ri][ci]; txt = isBlank ? (v || '') : txt; }
          cells.push(txt.replace(/\|/g, '/'));
        });
        lines.push('| ' + cells.join(' | ') + ' |');
        if (ri === 0) lines.push('|' + cells.map(function () { return ' --- '; }).join('|') + '|');
      });
      out.push(lines.join('\n'));
    });
    return out.join('\n\n');
  }
  function progressFileName(ps) { return 'DMP_PS' + ps.number + '_progress_' + me.email.replace(/[^a-z0-9]+/gi, '_') + '.md'; }
  function buildProgressFile(ps) {
    allParts(ps).forEach(function (x) { if (document.querySelector('[data-text="' + x.p.id + '"]')) work.parts[x.p.id] = snapshot(x.p.id); });
    var data = { tag: PROGRESS_TAG, ps: ps.id, number: ps.number, email: me.email, exported: new Date().toISOString(), collaborators: work.collaborators || '', parts: {} };
    var jobs = [];
    allParts(ps).forEach(function (x) {
      var a = work.parts[x.p.id]; if (!partFilled(a)) return;
      var rec = { text: a.text || '', tables: a.tables || undefined, images: [] };
      (a.images || []).forEach(function (im) { jobs.push(toDataUrl(im.url).then(function (d) { rec.images.push({ kind: im.kind, caption: im.caption || '', data: d }); }, function () {})); });
      data.parts[x.p.id] = rec;
    });
    return Promise.all(jobs).then(function () {
      var lines = ['# Problem Set ' + ps.number + ' — my answers (in progress)', '', '- Student: ' + me.email, '- Saved: ' + fmtDate(Date.now()), '- Collaborators: ' + (data.collaborators || 'none stated'), '',
        'Upload this file on the Problem Sets page to continue where you left off. Keep it: it is your copy of your work. Do not edit the block at the end.', ''];
      ps.questions.forEach(function (q) {
        var any = q.parts.some(function (p) { return data.parts[p.id]; }); if (!any) return;
        lines.push('## ' + shortTitle(q.title)); lines.push('');
        q.parts.forEach(function (p) {
          var a = data.parts[p.id]; if (!a) return;
          lines.push('### ' + p.label); lines.push('');
          if (a.text) { lines.push(a.text); lines.push(''); }
          if (a.tables) { lines.push(tableMarkdown(p, a.tables)); lines.push(''); }
          if (a.images.length) { lines.push(a.images.map(function (im, i) { return '_[' + (im.kind === 'drawing' ? 'drawing' : 'uploaded image') + ' ' + (i + 1) + (im.caption ? ': ' + im.caption : '') + ' — attached]_'; }).join('  ')); lines.push(''); }
        });
      });
      lines.push(''); lines.push('<!-- ' + PROGRESS_TAG); lines.push(JSON.stringify(data)); lines.push('-->'); lines.push('');
      return lines.join('\n');
    });
  }
  function exportProgress() {
    var ps = current, btn = document.getElementById('export-progress'), msg = document.getElementById('progress-msg');
    btn.disabled = true; msg.textContent = 'Preparing…';
    buildProgressFile(ps).then(function (text) {
      var blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = progressFileName(ps);
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      btn.disabled = false; msg.textContent = 'Downloaded ' + a.download;
      markExported(ps.id);
    });
  }

  /* ---------- "have I saved this to a file?" bookkeeping (browser-only mode) ---------- */
  function dirtyKey(psid) { return 'bcz_ps_dirty:' + me.email + ':' + psid; }
  function markDirty(psid) { if (api instanceof ServerStore) return; try { var d = JSON.parse(localStorage.getItem(dirtyKey(psid)) || '{"n":0}'); d.n = (d.n || 0) + 1; d.at = Date.now(); localStorage.setItem(dirtyKey(psid), JSON.stringify(d)); } catch (e) {} renderSaveState(); }
  function markExported(psid) { try { localStorage.setItem(dirtyKey(psid), JSON.stringify({ n: 0, exported: Date.now() })); } catch (e) {} renderSaveState(); }
  function dirtyInfo(psid) { try { return JSON.parse(localStorage.getItem(dirtyKey(psid)) || '{"n":0}'); } catch (e) { return { n: 0 }; } }
  window.addEventListener('beforeunload', function (e) {
    if (api instanceof ServerStore || !current || submission) return;
    if (fileSync.handle && fileSync.ok) return;
    var d = dirtyInfo(current.id);
    if (d.n > 0) { e.preventDefault(); e.returnValue = 'You have work that is not yet saved to a progress file.'; return e.returnValue; }
  });

  /* ---------- auto-save to a file chosen once (File System Access API: Chrome, Edge) ---------- */
  var fileSync = { handle: null, ok: false, name: '', timer: null, writing: false, psid: null };
  function fsAvailable() { return !(api instanceof ServerStore) && typeof window.showSaveFilePicker === 'function' && typeof indexedDB !== 'undefined'; }
  function idb() {
    return new Promise(function (res, rej) {
      var r = indexedDB.open('bcz_workbook', 1);
      r.onupgradeneeded = function () { r.result.createObjectStore('handles'); };
      r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); };
    });
  }
  function idbGet(k) { return idb().then(function (db) { return new Promise(function (res) { var t = db.transaction('handles').objectStore('handles').get(k); t.onsuccess = function () { res(t.result || null); }; t.onerror = function () { res(null); }; }); }).catch(function () { return null; }); }
  function idbSet(k, v) { return idb().then(function (db) { return new Promise(function (res) { var t = db.transaction('handles', 'readwrite').objectStore('handles'); if (v) t.put(v, k); else t.delete(k); t.transaction.oncomplete = function () { res(); }; t.transaction.onerror = function () { res(); }; }); }).catch(function () {}); }
  function fsKey(psid) { return me.email + ':' + psid; }
  function fileSyncLoad(psid) {
    fileSync = { handle: null, ok: false, name: '', timer: null, writing: false, psid: psid };
    if (!fsAvailable()) { renderSaveState(); return; }
    idbGet(fsKey(psid)).then(function (h) {
      if (!h) { renderSaveState(); return; }
      fileSync.handle = h; fileSync.name = h.name;
      return h.queryPermission({ mode: 'readwrite' }).then(function (p) { fileSync.ok = (p === 'granted'); renderSaveState(); if (fileSync.ok) fileSyncWrite(); });
    }).catch(function () { renderSaveState(); });
  }
  function fileSyncChoose() {
    var ps = current;
    window.showSaveFilePicker({ suggestedName: progressFileName(ps), types: [{ description: 'Workbook progress file', accept: { 'text/markdown': ['.md'] } }] })
      .then(function (h) { fileSync.handle = h; fileSync.name = h.name; fileSync.ok = true; fileSync.psid = ps.id; return idbSet(fsKey(ps.id), h); })
      .then(function () { renderSaveState(); return fileSyncWrite(); })
      .then(function () { toast('Your progress is now saved automatically to ' + fileSync.name); })
      .catch(function (e) { if (e && e.name !== 'AbortError') toast('Could not set up the file: ' + e.message, true); });
  }
  function fileSyncReconnect() {
    if (!fileSync.handle) return;
    fileSync.handle.requestPermission({ mode: 'readwrite' }).then(function (p) { fileSync.ok = (p === 'granted'); renderSaveState(); if (fileSync.ok) fileSyncWrite(); }, function () {});
  }
  function fileSyncStop() { idbSet(fsKey(current.id), null); fileSync = { handle: null, ok: false, name: '', timer: null, writing: false, psid: current.id }; renderSaveState(); }
  function fileSyncWrite() {
    if (!fileSync.handle || !fileSync.ok || !current || fileSync.psid !== current.id) return Promise.resolve();
    clearTimeout(fileSync.timer);
    return new Promise(function (res) {
      fileSync.timer = setTimeout(function () {
        if (fileSync.writing) { fileSync.pending = true; res(); return; }
        fileSync.writing = true;
        buildProgressFile(current).then(function (text) { return fileSync.handle.createWritable().then(function (w) { return w.write(text).then(function () { return w.close(); }); }); })
          .then(function () { fileSync.writing = false; fileSync.lastWrite = Date.now(); markExported(current.id); if (fileSync.pending) { fileSync.pending = false; fileSyncWrite(); } res(); },
                function (e) { fileSync.writing = false; fileSync.ok = false; renderSaveState(); toast('Could not write ' + fileSync.name + ' — ' + e.message, true); res(); });
      }, 1500);
    });
  }
  function renderSaveState() {
    var el = document.getElementById('save-state'); if (!el) return;
    if (api instanceof ServerStore || submission) { el.innerHTML = ''; return; }
    var d = dirtyInfo(current.id), html = '';
    if (fileSync.handle && fileSync.ok) {
      html = '<div class="notice ok"><p><b>Auto-saving to a file:</b> <code>' + esc(fileSync.name) + '</code>' + (fileSync.lastWrite ? ' — last written ' + fmtDate(fileSync.lastWrite) : '') + '. Every change is written there automatically; upload that file to continue on another computer. ' +
        '<button class="btn secondary sm" type="button" id="fs-stop">Stop</button></p></div>';
    } else if (fileSync.handle) {
      html = '<div class="notice warn"><p><b>Reconnect your progress file</b> <code>' + esc(fileSync.name) + '</code> so changes keep being saved to it. <button class="btn sm" type="button" id="fs-reconnect">Reconnect</button> <button class="btn secondary sm" type="button" id="fs-stop">Forget this file</button></p></div>';
    } else {
      var warn = d.n > 0;
      html = '<div class="notice' + (warn ? ' warn' : '') + '"><p>' +
        (warn ? '<b>' + d.n + ' change' + (d.n === 1 ? '' : 's') + ' since your last download.</b> ' : '<b>Protect your work.</b> ') +
        'This workbook saves in this browser only. ' +
        (fsAvailable() ? '<button class="btn sm" type="button" id="fs-choose">Save automatically to a file…</button> choose a file once (a OneDrive folder is a good place) and every change is written to it — ' : '') +
        'or <button class="btn secondary sm" type="button" id="dl-now">download your progress</button> whenever you stop working' + (d.exported ? ' (last download ' + fmtDate(d.exported) + ')' : '') + '.</p></div>';
    }
    el.innerHTML = html;
    var b;
    if ((b = el.querySelector('#fs-choose'))) b.addEventListener('click', fileSyncChoose);
    if ((b = el.querySelector('#fs-reconnect'))) b.addEventListener('click', fileSyncReconnect);
    if ((b = el.querySelector('#fs-stop'))) b.addEventListener('click', fileSyncStop);
    if ((b = el.querySelector('#dl-now'))) b.addEventListener('click', function () { var x = document.getElementById('export-progress'); if (x) x.click(); });
  }
  function importProgress(file) {
    var msg = document.getElementById('progress-msg'); msg.textContent = 'Reading…';
    var fr = new FileReader();
    fr.onload = function () {
      var m = new RegExp('<!-- ' + PROGRESS_TAG + '\\n([\\s\\S]*?)\\n-->').exec(fr.result), data = null;
      try { data = m ? JSON.parse(m[1]) : JSON.parse(fr.result); } catch (e) { data = null; }
      if (!data || data.tag !== PROGRESS_TAG || !data.parts) { msg.textContent = ''; toast('That is not a workbook progress file.', true); return; }
      var target = SETS.filter(function (x) { return x.id === data.ps; })[0];
      if (!target) { msg.textContent = ''; toast('This file belongs to a problem set that is not on this site.', true); return; }
      if (me.submissions && me.submissions[target.id]) { msg.textContent = ''; toast('Problem Set ' + target.number + ' has already been submitted; the file cannot be loaded over it.', true); return; }
      var n = Object.keys(data.parts).length;
      if (!confirm('Load ' + n + ' answer' + (n === 1 ? '' : 's') + ' for Problem Set ' + target.number + ' from this file (saved ' + (data.exported ? fmtDate(data.exported) : 'earlier') + (data.email && data.email !== me.email ? ' by ' + data.email : '') + ')?\n\nThis replaces the answers currently in ' + scopeLabel(scope) + ' for that set.')) { msg.textContent = ''; return; }
      msg.textContent = 'Loading…';
      var changes = {}, jobs = [];
      Object.keys(data.parts).forEach(function (id) {
        var a = data.parts[id] || {}, rec = { text: String(a.text || ''), images: [] };
        if (a.tables) rec.tables = a.tables;
        (a.images || []).forEach(function (im) {
          if (!im || !/^data:image\//.test(im.data || '')) return;
          jobs.push(api.upload(im.data).then(function (url) { rec.images.push({ url: url, kind: im.kind === 'drawing' ? 'drawing' : 'upload', caption: im.caption || '' }); }, function () {}));
        });
        changes[id] = rec;
      });
      Promise.all(jobs).then(function () { return api.save(scope, target.id, changes, typeof data.collaborators === 'string' ? data.collaborators : undefined); }).then(function () {
        toast('Progress loaded — continue where you left off.'); markExported(target.id);
        var firstBlank = null;
        if (current && current.id === target.id) { current = null; }
        location.hash = '#' + target.id;
        openSet(target, true);
        var wait = setInterval(function () {
          if (!work || !current || current.id !== target.id) return;
          clearInterval(wait);
          var missing = allParts(target).filter(function (x) { return !partFilled(work.parts[x.p.id]); });
          var el = missing.length ? document.getElementById('part-' + missing[0].p.id) : document.getElementById(target.id + '-submit');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }, function (e) { msg.textContent = ''; toast('Could not load the file: ' + e.message, true); });
    };
    fr.readAsText(file);
  }

  /* ====================================================================== group sync */
  function startPolling() { stopPolling(); if (scope === 'me') return; pollTimer = setInterval(poll, POLL_MS); }
  function stopPolling() { if (pollTimer) clearInterval(pollTimer); pollTimer = null; }
  function poll() {
    if (!current || !work || document.hidden) return;
    var ps = current, sc = scope, since = work.version || 0;
    api.changes(sc, ps.id, since).then(function (j) {
      if (!current || current.id !== ps.id || scope !== sc) return;
      var changes = j.changes || {}, n = 0;
      Object.keys(changes).forEach(function (id) {
        var remote = changes[id];
        if (remote.by === me.email && remote.t && Date.now() - remote.t < 20000) return;   /* our own recent save */
        var ta = document.querySelector('[data-text="' + id + '"]');
        if (ta && ta.dataset.focused) return;                                             /* being edited here right now */
        if (saveTimers[id] || pendingChanges[id]) return;                                  /* local change in flight */
        work.parts[id] = { text: remote.text || '', tables: remote.tables, images: remote.images || [] };
        if (ta) ta.value = work.parts[id].text;
        var box = document.querySelector('[data-prompt="' + id + '"]');
        if (box) box.querySelectorAll('td[data-cell]').forEach(function (td) {
          var k = td.getAttribute('data-cell').split(':'), v = remote.tables && remote.tables[k[0]] && remote.tables[k[0]][+k[1]] ? remote.tables[k[0]][+k[1]][+k[2]] : '';
          if (document.activeElement === td) return;
          if (v) { td.textContent = v; td.classList.add('filled'); } else { td.textContent = ''; td.classList.remove('filled'); }
        });
        renderFigures(id);
        var wc = document.querySelector('[data-wc="' + id + '"]'); if (wc) wc.textContent = wordCount(work.parts[id].text) + ' words';
        setStatus(id, 'updated by ' + (remote.by || 'a group member').replace(/@.*/, ''), 'saved');
        n++;
      });
      if (j.version != null && j.version > (work.version || 0)) work.version = j.version;
      if (typeof j.collaborators === 'string' && !document.activeElement.matches('#collab')) { var c = document.getElementById('collab'); if (c && c.value !== j.collaborators) { c.value = j.collaborators; work.collaborators = j.collaborators; } }
      if (n) { renderQnav(); updateMissing(); }
    }, function () { /* ignore transient errors */ });
  }

  /* ====================================================================== routing */
  function route() {
    var h = (location.hash || '').replace(/^#/, ''), bits = h.split('/');
    var ps = SETS.filter(function (s) { return s.id === bits[0]; })[0] || SETS[0];
    if (!ps) { document.getElementById('ps-main').innerHTML = '<p class="muted">No problem sets have been published yet.</p>'; return; }
    if (!current || current.id !== ps.id) openSet(ps, !!bits[1]);
    if (bits[1]) {
      var tries = 0, t = setInterval(function () { var el = document.getElementById(ps.id + '-' + bits[1]); if (el || ++tries > 40) { clearInterval(t); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }, 100);
    }
  }

  /* ====================================================================== boot: detect server, then sign in */
  var base = apiBase();
  var detect = /^https?:/.test(location.protocol) ? fetch(base + '/ping', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }) : Promise.resolve(null);
  detect.then(function (ping) {
    if (ping && ping.ok) {
      api = new ServerStore(base);
      api.restore().then(function (info) { start(info); }, function () {
        var s = Site.session(); showGate(s && s.email);
      });
    } else {
      api = new LocalStore();
      Site.requireSignIn(function (s) { api.email = s.email; api.me().then(start); });
    }
  });
})();
