#!/usr/bin/env node
/* ==========================================================================
   Problem-set backend for the DMP workbook.

   Zero dependencies — runs on Node 18 or newer:   node server/server.js
   It serves the whole site (the folder above this one) AND a small JSON API
   under /api/ that stores each student's or group's answers, drawings and
   submissions on the server, so students can work over time from any device.

   Storage: server/data/db.json (answers, groups, submissions, sign-in tokens)
            server/data/uploads/ (drawings and uploaded images)
   Sign-in: the same e-mail-domain check and course password as the site
            (read from ../config.js), so students use one password everywhere.
   Admin:   GET /api/admin/submissions?key=<admin key>   (JSON of everything)
            The admin key is printed at start-up and stored in data/admin-key.txt.

   Environment variables (all optional):
     PORT        port to listen on (default 8080)
     HOST        interface (default 0.0.0.0)
     DATA_DIR    where to keep db.json and uploads (default server/data)
     ADMIN_KEY   fixed admin key (otherwise generated once and saved)
     ALLOW_ORIGIN origin of the static site if it is hosted elsewhere (enables CORS)
   ========================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');                 // the site folder
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(__dirname, 'data'));
const UPLOADS = path.join(DATA_DIR, 'uploads');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const PORT = parseInt(process.env.PORT || '8080', 10);
const HOST = process.env.HOST || '0.0.0.0';
const COURSE = 'dmp';
const MAX_JSON = 6 * 1024 * 1024;        // request body limit (images arrive as data URLs)
const MAX_IMAGE = 4 * 1024 * 1024;       // decoded image size limit
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '';   // e.g. https://you.github.io when the static site lives elsewhere

fs.mkdirSync(UPLOADS, { recursive: true });

/* ---------- site config (config.js is a browser file; evaluate it in a sandbox) ---------- */
function loadConfig() {
  const src = fs.readFileSync(path.join(ROOT, 'config.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(src, sandbox, { timeout: 1000 });
  return sandbox.window.SITE_CONFIG || {};
}
let CONFIG = loadConfig();
fs.watchFile(path.join(ROOT, 'config.js'), { interval: 5000 }, () => { try { CONFIG = loadConfig(); log('config.js reloaded'); } catch (e) { log('config.js reload failed: ' + e.message); } });

/* ---------- admin key ---------- */
const ADMIN_KEY_FILE = path.join(DATA_DIR, 'admin-key.txt');
let ADMIN_KEY = process.env.ADMIN_KEY || '';
if (!ADMIN_KEY) {
  if (fs.existsSync(ADMIN_KEY_FILE)) ADMIN_KEY = fs.readFileSync(ADMIN_KEY_FILE, 'utf8').trim();
  if (!ADMIN_KEY) { ADMIN_KEY = crypto.randomBytes(18).toString('hex'); fs.writeFileSync(ADMIN_KEY_FILE, ADMIN_KEY + '\n'); }
}

/* ---------- tiny JSON database with atomic, debounced writes ---------- */
const EMPTY = { tokens: {}, groups: {}, work: {}, submissions: {}, version: 1 };
let db;
try { db = Object.assign({}, EMPTY, JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))); }
catch (e) { db = JSON.parse(JSON.stringify(EMPTY)); }
let saveTimer = null, saving = false, dirty = false;
function save() {
  dirty = true;
  if (saveTimer) return;
  saveTimer = setTimeout(flush, 300);
}
function flush() {
  saveTimer = null;
  if (saving) { save(); return; }
  saving = true; dirty = false;
  const tmp = DB_FILE + '.tmp';
  fs.writeFile(tmp, JSON.stringify(db), (err) => {
    if (!err) fs.rename(tmp, DB_FILE, (e2) => { saving = false; if (e2) log('db save failed: ' + e2.message); if (dirty) save(); });
    else { saving = false; log('db save failed: ' + err.message); }
  });
}
process.on('SIGINT', () => { try { fs.writeFileSync(DB_FILE, JSON.stringify(db)); } catch (e) {} process.exit(0); });
process.on('SIGTERM', () => { try { fs.writeFileSync(DB_FILE, JSON.stringify(db)); } catch (e) {} process.exit(0); });

/* ---------- helpers ---------- */
function log(s) { console.log(new Date().toISOString().slice(0, 19).replace('T', ' ') + '  ' + s); }
function sha256(s) { return crypto.createHash('sha256').update(s, 'utf8').digest('hex'); }
function rnd(n) { return crypto.randomBytes(n || 16).toString('hex'); }
function now() { return Date.now(); }
function emailAllowed(email) {
  const at = email.lastIndexOf('@');
  if (at < 1 || at === email.length - 1) return false;
  const domain = email.slice(at + 1);
  return (CONFIG.allowedDomains || []).some(d => { d = d.toLowerCase(); return domain === d || domain.endsWith('.' + d); });
}
function sessionMs() { return (CONFIG.sessionHours || 24 * 14) * 3600 * 1000; }
function json(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > MAX_JSON) { reject(new Error('Request too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); } catch (e) { reject(new Error('Bad JSON')); } });
    req.on('error', reject);
  });
}
function auth(req) {
  const h = req.headers['authorization'] || '';
  const tok = h.startsWith('Bearer ') ? h.slice(7).trim() : (req.headers['x-token'] || '');
  const t = tok && db.tokens[tok];
  if (!t) return null;
  if (now() - t.at > sessionMs()) { delete db.tokens[tok]; save(); return null; }
  return { token: tok, email: t.email };
}
function cleanTokens() {
  const cutoff = now() - sessionMs();
  for (const k of Object.keys(db.tokens)) if (db.tokens[k].at < cutoff) delete db.tokens[k];
}
function groupsOf(email) {
  return Object.values(db.groups).filter(g => g.members.includes(email)).map(publicGroup);
}
function publicGroup(g) { return { id: g.id, name: g.name, code: g.code, members: g.members.slice(), created: g.created }; }
function scopeKey(user, scope) {
  /* 'me' -> the student's own workspace; 'g:<id>' -> a group workspace the student belongs to */
  if (!scope || scope === 'me') return 'u:' + user.email;
  if (scope.startsWith('g:')) {
    const g = db.groups[scope.slice(2)];
    if (g && g.members.includes(user.email)) return 'g:' + g.id;
  }
  return null;
}
function workRecord(key, ps, create) {
  db.work[key] = db.work[key] || {};
  if (!db.work[key][ps] && create) db.work[key][ps] = { parts: {}, collaborators: '', version: 0, updated: now() };
  return db.work[key][ps];
}
function cleanPart(p) {
  /* only keep the fields the workbook uses; everything else is dropped */
  if (!p || typeof p !== 'object') return null;
  const out = {};
  if (typeof p.text === 'string') out.text = p.text.slice(0, 50000);
  if (p.tables && typeof p.tables === 'object') {
    out.tables = {};
    for (const k of Object.keys(p.tables).slice(0, 10)) {
      const t = p.tables[k];
      if (Array.isArray(t)) out.tables[k] = t.slice(0, 60).map(r => Array.isArray(r) ? r.slice(0, 30).map(c => String(c == null ? '' : c).slice(0, 2000)) : []);
    }
  }
  if (Array.isArray(p.images)) {
    out.images = p.images.slice(0, 12).filter(i => i && typeof i.url === 'string' && i.url.startsWith('/uploads/')).map(i => ({ url: i.url, kind: i.kind === 'drawing' ? 'drawing' : 'upload', caption: String(i.caption || '').slice(0, 300) }));
  }
  if (typeof p.deleted === 'boolean') out.deleted = p.deleted;
  return out;
}
function partFilled(p) {
  if (!p) return false;
  if (p.text && p.text.replace(/\s+/g, ' ').trim()) return true;
  if (p.images && p.images.length) return true;
  if (p.tables) for (const k of Object.keys(p.tables)) for (const r of p.tables[k]) for (const c of r) if (String(c || '').trim()) return true;
  return false;
}

/* ---------- static files ---------- */
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };
function serveFile(res, file, cacheable) {
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); return; }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Content-Length': st.size, 'Cache-Control': cacheable ? 'public, max-age=86400' : 'no-cache' });
    fs.createReadStream(file).pipe(res);
  });
}
function serveStatic(req, res, urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p.includes('\0')) { res.writeHead(400); res.end(); return; }
  if (p.startsWith('/uploads/')) {
    const f = path.join(UPLOADS, path.basename(p));
    return serveFile(res, f, true);
  }
  if (p.endsWith('/')) p += 'index.html';
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT + path.sep) && file !== ROOT) { res.writeHead(403); res.end('Forbidden'); return; }
  /* never serve the server's own data or the instructor's sources */
  const rel = path.relative(ROOT, file).split(path.sep)[0];
  if (rel === 'server' || rel === 'site-sources' || rel === 'tools') { res.writeHead(404); res.end('Not found'); return; }
  serveFile(res, file, /\.(png|jpe?g|gif|svg|webp|pdf|woff2?)$/i.test(file));
}

/* ---------- API ---------- */
async function api(req, res, url) {
  const parts = url.pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean);
  const route = parts[0] || '';
  const q = url.searchParams;

  if (route === 'ping' && req.method === 'GET') return json(res, 200, { ok: true, course: COURSE, name: (CONFIG.courses && CONFIG.courses[COURSE] || {}).name || '', groups: true });

  if (route === 'login' && req.method === 'POST') {
    const b = await readBody(req);
    const email = String(b.email || '').trim().toLowerCase();
    const password = String(b.password || '');
    const cfg = (CONFIG.courses && CONFIG.courses[COURSE]) || {};
    if (!emailAllowed(email)) return json(res, 400, { error: 'Please use your institutional university e-mail address.' });
    if (!cfg.passwordHash || sha256(password) !== cfg.passwordHash.toLowerCase()) return json(res, 401, { error: 'The course password is not correct.' });
    cleanTokens();
    const token = rnd(24);
    db.tokens[token] = { email, at: now() };
    save();
    log('login ' + email);
    return json(res, 200, { token, email, groups: groupsOf(email), submissions: db.submissions[email] ? Object.fromEntries(Object.entries(db.submissions[email]).map(([k, v]) => [k, { at: v.at, scope: v.scope, collaborators: v.collaborators }])) : {} });
  }

  /* ----- admin ----- */
  if (route === 'admin') {
    if (!ADMIN_KEY || q.get('key') !== ADMIN_KEY) return json(res, 403, { error: 'Bad admin key' });
    if (parts[1] === 'submissions' && req.method === 'GET') return json(res, 200, { submissions: db.submissions, groups: Object.values(db.groups).map(publicGroup) });
    if (parts[1] === 'work' && req.method === 'GET') return json(res, 200, { work: db.work });
    if (parts[1] === 'submission' && req.method === 'DELETE') {
      const email = String(q.get('email') || '').toLowerCase(), ps = String(q.get('ps') || '');
      if (db.submissions[email] && db.submissions[email][ps]) { delete db.submissions[email][ps]; save(); return json(res, 200, { ok: true }); }
      return json(res, 404, { error: 'No such submission' });
    }
    return json(res, 404, { error: 'Unknown admin route' });
  }

  /* everything below needs a signed-in student */
  const user = auth(req);
  if (!user) return json(res, 401, { error: 'Please sign in.' });
  db.tokens[user.token].at = now();   /* sliding expiry */

  if (route === 'logout' && req.method === 'POST') { delete db.tokens[user.token]; save(); return json(res, 200, { ok: true }); }

  if (route === 'me' && req.method === 'GET') {
    const subs = {};
    for (const [ps, s] of Object.entries(db.submissions[user.email] || {})) subs[ps] = { at: s.at, scope: s.scope, collaborators: s.collaborators };
    return json(res, 200, { email: user.email, groups: groupsOf(user.email), submissions: subs });
  }

  if (route === 'groups') {
    if (req.method === 'POST' && !parts[1]) {
      const b = await readBody(req);
      const name = String(b.name || '').trim().slice(0, 60);
      if (!name) return json(res, 400, { error: 'Give the group a name.' });
      const id = rnd(6);
      let code;
      do { code = crypto.randomBytes(3).toString('hex').toUpperCase(); } while (Object.values(db.groups).some(g => g.code === code));
      db.groups[id] = { id, name, code, members: [user.email], created: now(), creator: user.email };
      save(); log('group created ' + name + ' by ' + user.email);
      return json(res, 200, { group: publicGroup(db.groups[id]) });
    }
    if (req.method === 'POST' && parts[1] === 'join') {
      const b = await readBody(req);
      const code = String(b.code || '').trim().toUpperCase();
      const g = Object.values(db.groups).find(x => x.code === code);
      if (!g) return json(res, 404, { error: 'No group has that code. Check it with the person who created the group.' });
      if (!g.members.includes(user.email)) { if (g.members.length >= 12) return json(res, 400, { error: 'That group is full.' }); g.members.push(user.email); save(); log(user.email + ' joined ' + g.name); }
      return json(res, 200, { group: publicGroup(g) });
    }
    if (req.method === 'POST' && parts[2] === 'leave') {
      const g = db.groups[parts[1]];
      if (!g || !g.members.includes(user.email)) return json(res, 404, { error: 'Not a member of that group.' });
      g.members = g.members.filter(m => m !== user.email);
      if (!g.members.length) { delete db.groups[g.id]; delete db.work['g:' + g.id]; }
      save();
      return json(res, 200, { ok: true });
    }
    return json(res, 404, { error: 'Unknown groups route' });
  }

  if (route === 'work') {
    const scope = q.get('scope') || 'me', ps = String(q.get('ps') || '');
    const key = scopeKey(user, scope);
    if (!key) return json(res, 403, { error: 'You are not a member of that group.' });
    if (!/^ps\d+$/.test(ps)) return json(res, 400, { error: 'Bad problem-set id' });
    if (req.method === 'GET') {
      const w = workRecord(key, ps, false) || { parts: {}, collaborators: '', version: 0, updated: 0 };
      const since = parseInt(q.get('since') || '-1', 10);
      if (since >= 0) {
        const changes = {};
        for (const [id, p] of Object.entries(w.parts)) if ((p.v || 0) > since) changes[id] = p;
        return json(res, 200, { version: w.version, changes, collaborators: w.collaborators, updated: w.updated, members: key.startsWith('g:') ? db.groups[key.slice(2)].members : [user.email] });
      }
      return json(res, 200, { version: w.version, parts: w.parts, collaborators: w.collaborators, updated: w.updated, members: key.startsWith('g:') ? db.groups[key.slice(2)].members : [user.email] });
    }
    if (req.method === 'PUT') {
      const b = await readBody(req);
      const w = workRecord(key, ps, true);
      const changes = b.changes && typeof b.changes === 'object' ? b.changes : {};
      let n = 0;
      for (const id of Object.keys(changes).slice(0, 400)) {
        if (!/^[a-z0-9_-]{1,40}$/i.test(id)) continue;
        const p = cleanPart(changes[id]);
        if (!p) continue;
        w.version++;
        w.parts[id] = Object.assign(p, { v: w.version, t: now(), by: user.email });
        n++;
      }
      if (typeof b.collaborators === 'string') { w.collaborators = b.collaborators.slice(0, 500); w.version++; }
      w.updated = now();
      if (n || typeof b.collaborators === 'string') save();
      return json(res, 200, { version: w.version, saved: n });
    }
    if (req.method === 'DELETE') {
      /* clear a draft (not allowed once this student has submitted that set) */
      if (db.submissions[user.email] && db.submissions[user.email][ps]) return json(res, 400, { error: 'This set has been submitted and cannot be cleared.' });
      if (db.work[key]) { delete db.work[key][ps]; save(); }
      return json(res, 200, { ok: true });
    }
  }

  if (route === 'upload' && req.method === 'POST') {
    const b = await readBody(req);
    const m = /^data:image\/(png|jpeg|jpg|webp|gif);base64,([A-Za-z0-9+/=]+)$/.exec(String(b.data || ''));
    if (!m) return json(res, 400, { error: 'Only PNG, JPEG, WebP or GIF images can be uploaded.' });
    const buf = Buffer.from(m[2], 'base64');
    if (buf.length > MAX_IMAGE) return json(res, 400, { error: 'Image too large (max 4 MB).' });
    const ext = m[1] === 'jpg' ? 'jpeg' : m[1];
    const name = rnd(12) + '.' + ext;
    fs.writeFileSync(path.join(UPLOADS, name), buf);
    return json(res, 200, { url: '/uploads/' + name, bytes: buf.length });
  }

  if (route === 'submit' && req.method === 'POST') {
    const b = await readBody(req);
    const scope = b.scope || 'me', ps = String(b.ps || '');
    const key = scopeKey(user, scope);
    if (!key) return json(res, 403, { error: 'You are not a member of that group.' });
    if (!/^ps\d+$/.test(ps)) return json(res, 400, { error: 'Bad problem-set id' });
    db.submissions[user.email] = db.submissions[user.email] || {};
    if (db.submissions[user.email][ps]) return json(res, 400, { error: 'You have already submitted this problem set.' });
    const w = workRecord(key, ps, false);
    if (!w) return json(res, 400, { error: 'There is nothing to submit yet.' });
    const required = Array.isArray(b.partIds) ? b.partIds.filter(x => typeof x === 'string') : Object.keys(w.parts);
    const missing = required.filter(id => !partFilled(w.parts[id]));
    if (missing.length) return json(res, 400, { error: missing.length + ' part(s) are still blank.', missing });
    const answers = {};
    for (const id of required) { const p = w.parts[id]; answers[id] = { text: p.text || '', tables: p.tables || {}, images: p.images || [] }; }
    const members = key.startsWith('g:') ? db.groups[key.slice(2)].members.filter(m => m !== user.email) : [];
    const collaborators = [String(b.collaborators || w.collaborators || '').trim(), members.join(', ')].filter(Boolean).join('; ');
    const sub = { at: now(), ps, scope: key.startsWith('g:') ? 'group:' + db.groups[key.slice(2)].name : 'individual', collaborators, answers };
    db.submissions[user.email][ps] = sub;
    save(); log('submission ' + user.email + ' ' + ps + ' (' + sub.scope + ')');
    return json(res, 200, { submission: sub });
  }

  if (route === 'submission' && req.method === 'GET') {
    const ps = String(q.get('ps') || '');
    const s = db.submissions[user.email] && db.submissions[user.email][ps];
    if (!s) return json(res, 404, { error: 'Not submitted' });
    return json(res, 200, { submission: s });
  }

  return json(res, 404, { error: 'Unknown API route' });
}

/* ---------- server ---------- */
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (ALLOW_ORIGIN && req.headers.origin === ALLOW_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Vary', 'Origin');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  }
  if (url.pathname.startsWith('/api/')) {
    api(req, res, url).catch(err => { log('API error ' + err.message); if (!res.headersSent) json(res, err.message === 'Request too large' ? 413 : 500, { error: err.message }); });
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end(); return; }
  serveStatic(req, res, url.pathname);
});
server.listen(PORT, HOST, () => {
  log('DMP workbook server listening on http://' + (HOST === '0.0.0.0' ? 'localhost' : HOST) + ':' + PORT);
  log('site root: ' + ROOT);
  log('data dir : ' + DATA_DIR);
  log('admin key: ' + ADMIN_KEY + '   (instructor export: /api/admin/submissions?key=...)');
});
