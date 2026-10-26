# Brandon C. Zicha — teaching site

A self-contained static website. No server, database or build step is needed to use it:
open `index.html` in a browser, or put the whole folder on any web host (GitHub Pages,
Netlify, the university web space…). Use an **https** host: the sign-in unlocks the reading-folder
links with the browser's built-in cryptography, which browsers only allow on https (or from a file).

```
index.html                  Home: portrait, four cards (Substack, College Project, IGD, DMP)
config.js                   ← the only file you normally edit: links, passwords, Brightspace, office hours
assets/portrait.jpg         Portrait on the home page
assets/style.css            Shared look
assets/site.js              Sign-in, sessions, "this week" cards, config-driven links
assets/nav.js               Masthead, course tabs and footer (shared by both courses)
college-project/index.html  "Coming soon!"
igd/                        Institutions of Governance and Development (Block 2, 2026–27)
   index.html               Overview: this week, meetings, instructor, key dates
   syllabus.html            Full syllabus (generated; instructor-only notes stripped)
   schedule.html            Week-by-week sessions, readings, quizzes, letters (generated)
   readings.html            🔒 North chapter extracts + applied readings + reading folder (generated)
   readings/files/          North extracts are already here; see FILENAMES.txt for the rest
   assessments.html         Components, dates, Brightspace link for the essay, policies in brief
   nav.js                   IGD tabs
dmp/                        Decision-Making Processes (Block 2, 2026–27)
   index.html               Overview: this week, meetings, instructor, key dates
   syllabus.html            Full syllabus (generated)
   readings.html            🔒 Reading list by week + reading folder (generated)
   readings/files/          ← drop reading PDFs here (see FILENAMES.txt)
   problem-sets.html        🔒 Interactive problem-set workbook
   app.js                   Workbook logic
   data/problem_sets.js     The four problem sets + model answers (generated)
   assessments.html         Deadlines and Brightspace links; the Week 1 baseline prompt
   exam-prep.html           Exam preparation announcement
   nav.js                   DMP tabs
tools/password-hash.html    Instructor tool: new password and encrypted reading-folder link
server/                     Workbook server (node server/server.js) — see server/README.md
site-sources/               Clean sources + build.py (regenerates the generated pages)
```

## Things you may want to change

1. **Course passwords.** Defaults: DMP `dmp-2026`, IGD `igd-2026`. Open `tools/password-hash.html`,
   choose the course, type a new password (and paste the course's Google Drive reading-folder link),
   and copy the block it gives you into `config.js` → `courses`.
2. **Reading folders.** The Google Drive links from the "Resources for Partner" note are already in
   `config.js`, encrypted with each course's password, and appear on the Readings tab after sign-in.
   If a folder link changes, re-run the tool above.
3. **Brightspace.** `config.js` → `brightspaceUrl` is the general Brightspace page and is used by every
   "submit via Brightspace" link. If you want a link straight to a particular assignment folder, put it in
   `config.js` → `brightspace.dmp.*` / `brightspace.igd.essay`.
4. **Office hours.** `config.js` → `officeHoursUrl` (Microsoft Bookings). Used on the home page, both
   overviews and both syllabi.
5. **Allowed e-mail domains.** `config.js` → `allowedDomains`.
6. **Reading links.** Each reading on the Readings pages links straight to its file in your Google Drive
   reading folder. The mapping is `site-sources/drive_links.json` (citation snippet → Drive file id); add an
   entry when you upload a new PDF to Drive (share it as *anyone with the link, viewer*), then rebuild.
   Items without an entry show no link (or "Online" for internet items). Alternatively drop a PDF into
   `dmp/readings/files/` or `igd/readings/files/` with the name listed in that folder's `FILENAMES.txt`
   and the build will link to the local copy. The North extracts are already included locally.
7. **College Project.** When the site exists, set `collegeProjectUrl` in `config.js`; the home-page card
   and navigation will point there instead of the "Coming soon!" page.

## The problem-set workbook (DMP) and its server

**The workbook is currently switched off for students.** To open it, set `WORKBOOK_OPEN = true` near the
top of `dmp/problem-sets.html` (and change the card badge on `dmp/index.html` from "Coming soon" back
to "🔒 Sign-in" if you like). With it off, the page shows a "Coming soon" notice and loads nothing else.

The workbook is the one part of the site that is not purely static. Run the small server in
`server/` (Node 18+, no dependencies — see `server/README.md`):

```
node server/server.js        # serves the whole site on http://localhost:8080 and the workbook API
```

With the server running:

- Students sign in with their institutional e-mail and the DMP course password (same as the rest of
  the site). Their work is stored **on the server under their e-mail**, so they can continue from
  any device.
- Each student has a personal workspace and can also create or join **groups** (a 6-character code).
  A group shares one set of answers per problem set, synchronised every few seconds. Each member
  still submits under their own name; the other members are recorded as collaborators.
- Every part can be answered with text, by filling in the **editable cells of the payoff tables**
  in the prompt, by **drawing** on the sketch pad (pen, lines, circles, text, grid / axes /
  number-line backgrounds) or by **uploading an image** from the student's computer.
- The **Submit** button unlocks when every part has an answer. Submitting records the set as
  **complete (pass)** and shows the model answers beside the student's own — on screen only; there
  is no download or print, and the model answers cannot be selected for copying.
- **Not losing work without the server.** In browser-only mode each problem set shows a banner
  counting changes since the student's last download, the browser warns when they close the tab
  with un-downloaded work, and in Chrome/Edge they can choose a file once (e.g. in their OneDrive
  folder) to which every change is then written automatically.
- **Progress file.** Before submitting, a student can download their answers so far as a small
  Markdown file (their own text, filled-in table cells and drawings — no questions, no model
  answers) and upload it later on any computer to continue where they left off. With the server
  this is an extra copy; without the server it is how students move between devices. After
  submission there is nothing to download.
- PS4's model answers include the spatial-model diagrams (`dmp/data/img/ps4/`).
- You retrieve submissions with the admin key the server prints: `/api/admin/submissions?key=…`
  (JSON, including links to drawings and uploads), and you can reopen a submission with the
  `DELETE` route described in `server/README.md`.

Without the server (page opened from a file, or hosted on a plain static host — e.g. GitHub Pages)
the workbook still works but saves in that browser only, and says so at the top of the page; students
then use the progress file to carry work between devices, and group workspaces are unavailable. Everything else on the site is static and works either way.

## Regenerating the generated pages

The syllabi, schedule, readings, exam-prep pages and `dmp/data/problem_sets.js` are produced from the
sources in `site-sources/`:

```
cd site-sources
python3 -I build.py        # needs:  pip install markdown
```

- `syllabus.md` — DMP syllabus (dates, times, room and the booking link are in the header and week headings)
- `igd_syllabus.md` — IGD master syllabus; `[[ NOTE TO INSTRUCTOR ]]` boxes are stripped automatically
  for the student-facing pages, so you can keep editing the master copy
- `problem_sets.json` — the four DMP problem sets and model answers
- `ps_figures.json` — which diagrams go with which PS4 model answer; `make_ps4_figures.py` draws the SVGs
- `exam_prep.md` — the DMP exam-prep notice

The hand-written pages (`index.html`, both `index.html` overviews, both `assessments.html`,
`college-project/index.html`) are edited directly.
