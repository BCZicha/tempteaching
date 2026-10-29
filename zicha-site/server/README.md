# Problem-set workbook server

The site itself is static, but the **problem-set workbook** needs a small server so that students'
answers, drawings, uploads and submissions are stored centrally — per student and per group — and
can be continued from any device. This folder is that server. It has **no dependencies**: Node.js 18
or newer is all it needs.

```
cd <site folder>
node server/server.js
```

It then serves the whole site (so students open `http://<host>:8080/`) and the API under `/api/`.
When the workbook page is opened from a plain static host (or a file) instead, it falls back to
saving in the browser only and says so at the top of the page.

## What it stores

`server/data/db.json` — answers (per student workspace and per group), groups, submissions and
sign-in tokens. `server/data/uploads/` — drawings and uploaded images. **Back this folder up**; it is
the only copy of the students' work. Deleting it resets everything.

## Sign-in

The same rules as the rest of the site: an e-mail at one of the `allowedDomains` plus the DMP course
password, both read from `config.js` (the server re-reads it when it changes). Sessions last
`sessionHours`.

## Instructor access

At start-up the server prints an **admin key** (also saved in `server/data/admin-key.txt`; set the
`ADMIN_KEY` environment variable to choose your own). With it:

- `GET /api/admin/submissions?key=…` — every submission (student, time, workspace, collaborators,
  answers with text, filled-in tables and image URLs) and all groups, as JSON.
- `GET /api/admin/work?key=…` — all work in progress.
- `DELETE /api/admin/submission?key=…&email=…&ps=ps2` — reopen one student's problem set
  (their saved answers are kept; they can edit and submit again).

Open the first URL in a browser to read it, or save it with `curl`.

## Settings (environment variables)

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | 8080 | port to listen on |
| `HOST` | 0.0.0.0 | interface |
| `DATA_DIR` | server/data | where db.json and uploads live |
| `ADMIN_KEY` | generated | admin key for the export routes |

## Hosting

Anything that runs Node will do: a university VM, a small VPS, or a platform such as Render,
Railway or Fly.io (the `package.json` here has a `start` script; `Dockerfile` is provided —
build it from the site root). Put it behind **https** (the platforms above do this for you; on a
VM use Caddy or nginx as a reverse proxy) — the sign-in and the reading-folder unlock need it.
Make sure the data folder is on persistent storage (a mounted volume on container platforms).

Sizes are tiny (a class of 30 produces a few megabytes), so the free tier of any platform suffices.

## Keeping the static site elsewhere

If you prefer to keep the public site on GitHub Pages or similar and run only the workbook on the
server, add `apiBase: "https://workbook.example.org/api"` to `config.js` and the problem-set page
will talk to that server from wherever it is hosted, and start the server with
`ALLOW_ORIGIN=https://your-static-site.example` so the browser is allowed to call it.
