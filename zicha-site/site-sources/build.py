#!/usr/bin/env python3
"""Build the generated course pages from the clean sources in this folder.

    cd site-sources && python3 -I build.py

Needs the `markdown` package (pip install markdown).

DMP  : syllabus.md        -> ../dmp/syllabus.html, ../dmp/readings.html
       problem_sets.json  -> ../dmp/data/problem_sets.js
       exam_prep.md       -> ../dmp/exam-prep.html
IGD  : igd_syllabus.md    -> ../igd/syllabus.html, ../igd/schedule.html, ../igd/readings.html
"""
import json, re, base64, html, os, sys
import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = HERE
SITE = os.path.dirname(HERE)
OUT = os.path.join(SITE, 'dmp')
IGD_OUT = os.path.join(SITE, 'igd')

BOOKING = 'https://bookings.cloud.microsoft/book/DrZsOfficeHours@leidenuniv1.onmicrosoft.com/?ismsaljsauthenabled'

TAG = r'\[(?:DO|WRITE|DO/WRITE|DRAW|READ|THINK AND WRITE|DO/DRAW|WRITE/DO|DESIGN|Do|Write)\]'
def clean_prompt(text, label):
    """Remove a leading [TAG] and a repeated part label from the prompt (the page shows both already)."""
    s = (text or '').lstrip()
    lab = re.escape(label.strip())
    for _ in range(3):
        before = s
        s = re.sub(r'^(?:\*\*)?\s*' + TAG + r'\s*(?:\*\*)?\s*', '', s)                       # leading tag
        s = re.sub(r'^(?:\*\*)?\s*' + lab + r'\s*(?:\*\*)?\s*[:.]?\s*(?:\*\*)?\s*', '', s)   # leading label
        if s == before: break
    first, _, rest = s.partition('\n')
    if first.count('**') % 2 == 1:
        first = first.replace('**', '', 1)
    s = (first + ('\n' + rest if _ else '')).lstrip()
    return s

def md(text):
    if not text: return ''
    return markdown.markdown(text, extensions=['tables', 'sane_lists'])

def md_inline(text):
    """Markdown for a single line/cell: no surrounding <p>."""
    h = md(text)
    if h.startswith('<p>') and h.endswith('</p>') and h.count('<p>') == 1:
        h = h[3:-4]
    return h

def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def page(course, title, tab, body, extra_head=''):
    cname = {'dmp': 'Decision-Making Processes', 'igd': 'Institutions of Governance &amp; Development'}[course]
    NAV = course.upper() + '_NAV'
    FOOT = course.upper() + '_FOOTER'
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)} — {cname}</title>
<link rel="stylesheet" href="../assets/style.css">
<script src="../config.js"></script>
<script src="../assets/site.js"></script>
<script src="nav.js"></script>
{extra_head}
</head>
<body>
<script>{NAV}('{tab}')</script>
<main class="page">
{body}
</main>
<script>{FOOT}()</script>
</body>
</html>
'''

FIGS = {}
FOLDER_BOX = '<div data-folder-box></div>'
DRIVE = json.load(open(f'{SRC}/drive_links.json', encoding='utf-8'))
def drive_url(fid): return f'https://drive.google.com/file/d/{fid}/view'
def folder_url(fid): return f'https://drive.google.com/drive/folders/{fid}'
def drive_links_for(course, cite):
    c = re.sub(r'[*_"“”]', '', cite).lower()
    for e in DRIVE.get(course, []):
        if re.sub(r'[*_"“”]', '', e['match']).lower() in c:
            return e['links']
    return []
def links_html(local_files, drive_links, code=''):
    out = []
    for f in local_files:
        out.append(f'<a class="dl" href="readings/files/{f}" target="_blank" rel="noopener">Download ↓</a>')
    for l in drive_links:
        out.append(f'<a class="dl" href="{drive_url(l["id"])}" target="_blank" rel="noopener">{html.escape(l["label"])} ↗</a>')
    if out: return '<span class="dls">' + ' '.join(out) + '</span>'
    if code.startswith('T'): return '<span class="dl none">Textbook</span>'
    if code == 'I': return '<span class="dl none" title="Available on the internet (Google Scholar etc.)">Online</span>'
    return '<span class="dl none"></span>'

# ====================================================================== DMP
def build_problem_sets():
    data = json.load(open(f'{SRC}/problem_sets.json', encoding='utf-8'))
    # figures appended to model answers (part id -> [{src, caption}]); produced by make_ps4_figures.py, editable by hand
    global FIGS
    FIGS = json.load(open(f'{SRC}/ps_figures.json', encoding='utf-8')) if os.path.exists(f'{SRC}/ps_figures.json') else {}
    out = []
    for ps in data:
        o = {k: ps.get(k) for k in ('id', 'number', 'title', 'short', 'due', 'time_budget', 'week', 'objectives')}
        o['intro_html'] = md(ps.get('intro_md', ''))
        o['questions'] = []
        for q in ps['questions']:
            qq = {'id': q['id'], 'title': q['title'], 'subtitle': q.get('subtitle', ''), 'read_html': md(q.get('read_md', '')), 'parts': []}
            for p in q['parts']:
                ans = md(p.get('answer_md', ''))
                for fig in FIGS.get(p['id'], []):
                    ans += f'<figure><img src="{html.escape(fig["src"])}" alt="{html.escape(fig.get("caption", ""))}" loading="lazy"><figcaption>{html.escape(fig.get("caption", ""))}</figcaption></figure>'
                kind = p.get('kind', 'DO')
                if re.search(r'\[(DRAW|DO/DRAW|DESIGN)\]', (p.get('prompt_md') or '')[:400]) or re.match(r'^\s*(\*\*)?\s*\[DRAW\]', p.get('prompt_md') or ''):
                    kind = 'DRAW' if 'WRITE' not in kind else 'DRAW/WRITE'
                qq['parts'].append({
                    'id': p['id'], 'label': p['label'], 'kind': kind,
                    'prompt_html': md(clean_prompt(p.get('prompt_md', ''), p['label'])),
                    'answer_b64': base64.b64encode(ans.encode('utf-8')).decode('ascii'),
                    'note_html': md(p.get('note_md', '')) if p.get('note_md') else ''
                })
            o['questions'].append(qq)
        out.append(o)
    os.makedirs(f'{OUT}/data', exist_ok=True)
    with open(f'{OUT}/data/problem_sets.js', 'w', encoding='utf-8') as f:
        f.write('/* Generated by site-sources/build.py — do not edit by hand. Model answers are base64-encoded so they are not casually readable. */\n')
        f.write('window.PROBLEM_SETS = ' + json.dumps(out, ensure_ascii=False, indent=1) + ';\n')
    n = sum(len(q['parts']) for ps in out for q in ps['questions'])
    print('DMP problem sets:', len(out), 'parts:', n)

def build_dmp_syllabus():
    text = open(f'{SRC}/syllabus.md', encoding='utf-8').read()
    text = text.replace('**** ***** ', '** *').replace('***** ****', '* **').replace('** ****', '** ')
    text = re.sub(r'\*\*\*\*(.*?)\*\*\*\*', r'**\1**', text)
    text = re.sub(r'^.*?## Decision-Making Processes\s*\n', '', text, count=1, flags=re.S)
    text = re.sub(r'^(\*\*[A-Za-z /-]+:\*\*.*?)$', r'\1  ', text, flags=re.M)
    toc = []
    def h2(m):
        t = m.group(1).strip(); s = slug(t); toc.append((t, s))
        return f'<h2 id="{s}">{html.escape(t)}</h2>'
    body = md(text)
    body = re.sub(r'<h2>(.*?)</h2>', h2, body)
    body = body.replace(f'<a href="{BOOKING}">', f'<a href="{BOOKING}" target="_blank" rel="noopener">')
    toc_html = '<div class="toc">' + ''.join(f'<a href="#{s}">{html.escape(t.title() if t.isupper() else t)}</a>' for t, s in toc) + '</div>'
    page_body = f'''<div class="kicker">Decision-Making Processes · Syllabus 2026–2027 · Block 2</div>
<h1>Syllabus</h1>
<p class="lede">The full course syllabus. Readings marked with a lock on the <a href="readings.html">Readings</a> tab can be downloaded after signing in; assessed work other than the problem-set workbook is submitted through <a data-link="link-brightspace" href="#">Brightspace</a>.</p>
{toc_html}
<article class="prose syllabus">
{body}
</article>'''
    open(f'{OUT}/syllabus.html', 'w', encoding='utf-8').write(page('dmp', 'Syllabus', 'syllabus', page_body))
    print('DMP syllabus built; sections:', len(toc))

CODE_RE = re.compile(r'\s*\*\*([A-Z²\*]+)\*\*\s*$')
CODES = {
    'TS': 'Textbook — Shepsle, <i>Analyzing Politics</i>',
    'TM²': 'Textbook — Munger &amp; Munger, <i>Choosing in Groups</i>',
    'R': 'Reserve desk / reading folder',
    'L': 'Library electronic archive',
    'I': 'Available on the internet (Google Scholar etc.)',
}
DMP_WEEK_STARTS = ['2026-10-26', '2026-11-02', '2026-11-09', '2026-11-16', '2026-11-23', '2026-11-30', '2026-12-07', '2026-12-14']

def split_dates(title):
    m = re.match(r'^(.*?)\s*\(([^()]*(?:Oct|Nov|Dec)[^()]*)\)\s*$', title)
    return (m.group(1).strip(), m.group(2).strip()) if m else (title, '')

def build_dmp_readings():
    text = open(f'{SRC}/syllabus.md', encoding='utf-8').read()
    weeks = []
    week = None; session = None; kind = None
    expected = []
    for raw in text.splitlines():
        line = raw.rstrip()
        m = re.match(r'^### (Week \d+): (.*)', line)
        if m:
            t, d = split_dates(m.group(2).strip())
            week = {'num': m.group(1), 'title': t, 'dates': d, 'sessions': [], 'due': []}
            weeks.append(week); session = None; kind = None; continue
        if line.startswith('## ') and week:
            if not line.startswith('## WEEKLY'): week = None
            continue
        if not week: continue
        m = re.match(r'^#### (Session \d+): (.*)', line)
        if m:
            t, d = split_dates(m.group(2).strip())
            session = {'num': m.group(1), 'title': t, 'dates': d, 'required': [], 'recommended': []}
            week['sessions'].append(session); kind = None; continue
        if session is None and line.strip().startswith('*Continuation'):
            continue
        if re.match(r'^\*\*Required Reading', line): kind = 'required'; continue
        if re.match(r'^\*\*(Recommended|Strongly recommend)', line): kind = 'recommended'; continue
        m = re.match(r'^\*\*(Assessment|Assignment):\*\*\s*(.*)', line)
        if m: week['due'].append(m.group(2).strip()); kind = None; continue
        if line.startswith('- ') and kind and session is not None:
            item = line[2:].strip()
            cm = CODE_RE.search(item)
            code = cm.group(1).replace('*', '') if cm else ''
            cite = CODE_RE.sub('', item).strip()
            if cite.lower().startswith('strongly recommend'):
                session['recommended'].append({'code': code, 'cite': cite, 'file': ''}); continue
            fname = ''
            if code in ('R', 'I', 'L'):
                fname = slug(f"{week['num']}-{cite[:60]}") + '.pdf'
                expected.append((week['num'], session['num'], cite, fname))
            drive = drive_links_for('dmp', cite)
            if fname and not os.path.exists(f'{OUT}/readings/files/{fname}'): fname = ''
            session[kind].append({'code': code, 'cite': cite, 'file': fname, 'drive': drive})

    def item_html(it):
        cite_html = md_inline(it['cite'])
        code = it['code'] or '—'
        title = CODES.get(code, '')
        dl = links_html([it['file']] if it['file'] else [], it.get('drive', []), code)
        return f'<div class="reading"><span class="code" title="{html.escape(title)}">{html.escape(code)}</span><span>{cite_html}</span>{dl}</div>'

    body = ['<div class="kicker">Decision-Making Processes · Enrolled students</div>',
            '<h1>Readings</h1>',
            '<p class="lede">Required and recommended readings by week and session. Each item links straight to its file in the shared Google Drive reading folder where one has been placed; items marked <b>I</b> without a link are freely available online (Google Scholar, the journal, YouTube), and textbook chapters (<b>TS</b>, <b>TM²</b>) are read from your own copy.</p>',
            FOLDER_BOX,
            '<div class="notice"><p><b>Copyright.</b> Files provided here are for personal study by students enrolled in this course only. Do not share them further.</p></div>',
            '<details class="collapsible"><summary>Reading codes</summary><div><ul>' +
            ''.join(f'<li><b>{html.escape(k)}</b> — {v}</li>' for k, v in CODES.items()) +
            '<li><b>*</b> — you are responsible for the reading but it will not be discussed in class</li></ul></div></details>']
    for i, w in enumerate(weeks):
        start = DMP_WEEK_STARTS[i] if i < len(DMP_WEEK_STARTS) else ''
        wf = DRIVE.get('dmp_week_folders', {}).get(str(i+1))
        wfl = f'<a class="dl wk-folder" href="{folder_url(wf)}" target="_blank" rel="noopener">Week folder ↗</a>' if wf else ''
        body.append(f'<div class="week" data-week="{i+1}" data-start="{start}"><div class="week-head"><span class="num">{html.escape(w["num"])}</span><h3>{html.escape(w["title"])}</h3><span class="dates">{html.escape(w["dates"])}</span>{wfl}</div><div class="week-body">')
        for s in w['sessions']:
            when = f' <span class="small muted">({html.escape(s["dates"])})</span>' if s['dates'] else ''
            body.append(f'<h4>{html.escape(s["num"])} · {html.escape(s["title"])}{when}</h4>')
            if s['required']:
                body.append('<div class="small sc">Required</div>' + ''.join(item_html(i) for i in s['required']))
            if s['recommended']:
                body.append('<div class="small sc" style="margin-top:.6rem">Recommended</div>' + ''.join(item_html(i) for i in s['recommended']))
            if not s['required'] and not s['recommended']:
                body.append('<p class="small muted">Continuation of the week’s themes — no new readings.</p>')
        for d in w['due']:
            body.append(f'<p class="small" style="margin:.8rem 0 0"><span class="pill due">Due</span> {md_inline(d)}</p>')
        body.append('</div></div>')
    protected = '\n'.join(body)
    page_body = f'''<div id="gate"></div>
<div id="protected" style="display:none">
{protected}
</div>
<script>Site.requireSignIn(function(){{}});</script>'''
    open(f'{OUT}/readings.html', 'w', encoding='utf-8').write(page('dmp', 'Readings', 'readings', page_body))
    os.makedirs(f'{OUT}/readings/files', exist_ok=True)
    with open(f'{OUT}/readings/files/FILENAMES.txt', 'w', encoding='utf-8') as f:
        f.write('Place reading files in this folder using EXACTLY these file names so the Readings page links work.\n\n')
        for wk, sess, cite, fn in expected:
            f.write(f'{fn}\n    {wk}, {sess}: {cite}\n\n')
    print('DMP readings built; weeks:', len(weeks), 'downloadable items:', len(expected))

def build_exam_prep():
    p = f'{SRC}/exam_prep.md'
    if not os.path.exists(p):
        print('no exam_prep.md; skipping'); return
    text = open(p, encoding='utf-8').read()
    text = re.sub(r'^# .*\n', '', text, count=1)
    body = f'''<div class="kicker">Decision-Making Processes · Week 6</div>
<h1>Exam Preparation</h1>
<article class="prose">
{md(text)}
</article>
<p style="margin-top:2rem"><a class="btn secondary" href="problem-sets.html">Review your problem sets against the model answers →</a></p>'''
    open(f'{OUT}/exam-prep.html', 'w', encoding='utf-8').write(page('dmp', 'Exam Prep', 'exam', body))
    print('DMP exam prep built')

# ====================================================================== IGD
NOTE_RE = re.compile(r'^\*{0,3}\[\[.*?\]\]\*{0,3}\s*$', re.S | re.M)

def igd_student_text():
    """The master syllabus with the instructor-only boxes removed."""
    text = open(f'{SRC}/igd_syllabus.md', encoding='utf-8').read()
    # the instructor box: from the [[ NOTE TO INSTRUCTORS ]] paragraph up to (not including) # INTRODUCTION
    text = re.sub(r'\*\[\[ NOTE TO INSTRUCTORS.*?(?=# INTRODUCTION)', '', text, flags=re.S)
    text = NOTE_RE.sub('', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text

def build_igd_syllabus():
    text = igd_student_text()
    head, body_md = text.split('# INTRODUCTION', 1)
    body_md = '# INTRODUCTION' + body_md
    # header facts
    facts = []
    for line in head.splitlines():
        m = re.match(r'^\*\*(.+?):\*\*\s*(.*)$', line.strip())
        if m: facts.append((m.group(1), m.group(2)))
    def fact_html(k, v):
        if k == 'Office hours':
            v = f'By appointment through the <a href="{BOOKING}" target="_blank" rel="noopener">office-hours booking page</a>'
        elif k == 'Contact e-mail':
            v = f'<a href="mailto:{v}">{v}</a>'
        elif k == 'Online space':
            v = '<a data-link="link-brightspace" href="#">Brightspace course page</a>'
        else:
            v = md_inline(v)
        return f'<tr><th>{html.escape(k)}</th><td>{v}</td></tr>'
    facts_html = '<table class="facts">' + ''.join(fact_html(k, v) for k, v in facts) + '</table>'
    # demote headings one level and tidy italic headings
    body_md = re.sub(r'^## \*(.*?)\*\s*$', r'### \1', body_md, flags=re.M)
    body_md = re.sub(r'^### ', '#### ', body_md, flags=re.M)
    body_md = re.sub(r'^## ', '### ', body_md, flags=re.M)
    body_md = re.sub(r'^# ', '## ', body_md, flags=re.M)
    toc = []
    def h2(m):
        t = m.group(1).strip(); s = slug(t); toc.append((t, s))
        return f'<h2 id="{s}">{html.escape(t)}</h2>'
    body = md(body_md)
    body = re.sub(r'<h2>(.*?)</h2>', h2, body)
    toc_html = '<div class="toc">' + ''.join(f'<a href="#{s}">{html.escape(t.title() if t.isupper() else t)}</a>' for t, s in toc) + '</div>'
    page_body = f'''<div class="kicker">Institutions of Governance and Development · Syllabus 2026–2027 · Block 2</div>
<h1>Syllabus</h1>
<p class="lede">The full course syllabus. The week-by-week plan is laid out on the <a href="schedule.html">Schedule</a> tab, and the readings can be downloaded from the <a href="readings.html">Readings</a> tab after signing in.</p>
<div class="prose">{facts_html}</div>
{toc_html}
<article class="prose syllabus">
{body}
</article>'''
    open(f'{IGD_OUT}/syllabus.html', 'w', encoding='utf-8').write(page('igd', 'Syllabus', 'syllabus', page_body))
    print('IGD syllabus built; sections:', len(toc))

IGD_WEEK_STARTS = ['2026-10-26', '2026-11-02', '2026-11-09', '2026-11-16', '2026-11-23', '2026-11-30', '2026-12-07', '2026-12-14']
NORTH_FILES = {  # chapter -> file in igd/readings/files
    1: 'north-ch1-3.pdf', 2: 'north-ch1-3.pdf', 3: 'north-ch1-3.pdf',
    4: 'north-ch4-5.pdf', 5: 'north-ch4-5.pdf',
    6: 'north-ch6-8.pdf', 7: 'north-ch6-8.pdf', 8: 'north-ch6-8.pdf',
    9: 'north-ch9-10.pdf', 10: 'north-ch9-10.pdf',
    11: 'north-ch11-12.pdf', 12: 'north-ch11-12.pdf',
    13: 'north-full-book.pdf', 14: 'north-full-book.pdf',
}

def parse_igd_weeks():
    text = igd_student_text()
    text = text.split('# WEEKLY OVERVIEW', 1)[1].split('# APPENDICES', 1)[0]
    weeks = []
    week = None
    for raw in text.splitlines():
        line = raw.strip()
        m = re.match(r'^## \*WEEK (\d+) — (.*?)\*\s*(?:\((.*?)\))?\s*$', line)
        if m:
            week = {'num': int(m.group(1)), 'title': m.group(2).strip(), 'dates': (m.group(3) or '').strip(), 'rows': []}
            if week['title'].startswith('READING WEEK'):
                week['title'] = 'Reading week — no classes'; week['dates'] = 'Mon 14 – Fri 18 Dec'
            weeks.append(week); continue
        if week and line.startswith('|') and not re.match(r'^\|\s*-', line):
            cells = [c.strip() for c in line.strip('|').split('|')]
            if len(cells) >= 2:
                week['rows'].append((cells[0], cells[1]))
    return weeks

def parse_items(cell):
    items = []
    for part in cell.split('<br>'):
        t = part.strip()
        if not t: continue
        opt = bool(re.match(r'^\*(?!\*).*\*$', t, re.S)) and t.count('*') == 2
        if opt: t = t[1:-1].strip()
        if t.startswith('*Optional:*'):
            opt = True; t = t.replace('*Optional:*', '', 1).strip()
        tag = ''
        m = re.match(r'^\[([A-Z&\s]+)\]\s*', t)
        if m: tag = m.group(1).strip(); t = t[m.end():]
        files = []
        nm = re.search(r'North, Chapters? (\d+)(?:–(\d+))?', t)
        if nm:
            a = int(nm.group(1)); b = int(nm.group(2) or a)
            for ch in range(a, b + 1):
                f = NORTH_FILES.get(ch)
                if f and f not in files: files.append(f)
        items.append({'text': t, 'opt': opt, 'tag': tag, 'files': files})
    return items

def pill_for(assess_cell):
    t = re.sub(r'\*\*', '', assess_cell)
    pills = []
    for m in re.finditer(r'(QUIZ \d+[^(]*?)\s*\(', t): pills.append(('quiz', m.group(1).strip().title().replace('North, Chapters', 'North ch.')))
    for m in re.finditer(r'POP REFLECTION (\d+)', t): pills.append(('letter', f'Pop reflection {m.group(1)}'))
    if 'MIDTERM' in t: pills.append(('exam', 'Midterm essay · 60 min'))
    if 'PROMPT DISTRIBUTED' in t: pills.append(('exam', 'Essay prompt out'))
    if 'ESSAY DUE' in t: pills.append(('exam', 'Essay due'))
    if 'INDIVIDUAL DISCUSSIONS' in t: pills.append(('exam', 'Final discussions'))
    return pills

def pills_html(pills):
    return ' '.join(f'<span class="pill {k}">{html.escape(v)}</span>' for k, v in pills)

def build_igd_schedule_and_readings():
    weeks = parse_igd_weeks()
    sched = []; reads = []; weeks_json = []; expected = []
    for w in weeks:
        i = w['num']; start = IGD_WEEK_STARTS[i - 1]
        sessions = []; assess_cells = []; activities = ''
        for k, v in w['rows']:
            kk = re.sub(r'\*\*', '', k).strip()
            if kk.startswith('Session'):
                parts = [p.strip() for p in kk.split(' — ')]
                sessions.append({'num': parts[0], 'when': parts[1] if len(parts) > 1 else '', 'title': ' — '.join(parts[2:]) if len(parts) > 2 else '', 'items': parse_items(v), 'raw': v})
            elif kk == 'Activities': activities = v
            elif kk == 'Assessment': assess_cells.append(v)
            else:  # reading week rows
                tt = re.sub(r'\*\*', '', v); tt = tt[0] + tt[1:].lower() if re.sub(r'[^A-Za-z]', '', tt).isupper() else tt
                sessions.append({'num': kk, 'when': kk, 'title': tt, 'items': [], 'raw': ''})
        week_pills = []
        for c in assess_cells: week_pills += pill_for(c)
        if i == 8: week_pills = [('exam', 'Essay due Sun 13 Dec'), ('exam', 'Final discussions')]
        weeks_json.append({'t': w['title'], 'p': pills_html(week_pills)})
        # which pills belong to which session (quiz -> session 1, letters/midterm -> session 2)
        def sess_pills(s):
            if i == 8: return []
            out = []
            for k, v in week_pills:
                if s['num'] == 'Session 1' and k == 'quiz': out.append((k, v))
                if s['num'] == 'Session 2' and k != 'quiz': out.append((k, v))
            return out
        # ---- schedule page
        head = f'<div class="week" data-week="{i}" data-start="{start}"><div class="week-head"><span class="num">Week {i}</span><h3>{html.escape(w["title"])}</h3><span class="dates">{html.escape(w["dates"])}</span></div><div class="week-body">'
        sched.append(head)
        for s in sessions:
            lis = ''
            for it in s['items']:
                tag = f'<span class="tag">[{html.escape(it["tag"])}]</span>' if it['tag'] else ''
                lis += f'<li class="{"opt" if it["opt"] else ""}">{tag}{md_inline(it["text"])}</li>'
            sp = sess_pills(s)
            title = (' — ' + html.escape(s['title'])) if s['title'] and s['num'].startswith('Session') else ''
            if not s['num'].startswith('Session'):
                sched.append(f'<div class="sess"><div class="when">{html.escape(s["when"])}</div><div class="what"><h4>{html.escape(s["title"])}</h4></div></div>')
                continue
            sched.append(f'<div class="sess"><div class="when">{html.escape(s["when"])}</div><div class="what"><h4>{html.escape(s["num"])}{title}{(" " + pills_html(sp)) if sp else ""}</h4>'
                         + (f'<ul class="rd">{lis}</ul>' if lis else '')
                         + (f'<p class="act">{md_inline(activities)}</p>' if activities and s['num'] == 'Session 1' else '')
                         + '</div></div>')
        notes = [re.sub(r'^\*\*[^*]+\*\*\s*(?:\([^)]*\)\.?\s*)?', '', c).strip() for c in assess_cells]
        notes = [n for n in notes if n and 'POP REFLECTION' not in n and 'PROMPT DISTRIBUTED' not in n]
        for n in notes:
            sched.append(f'<p class="small muted" style="margin:.6rem 0 0">{md_inline(n)}</p>')
        sched.append('</div></div>')
        # ---- readings page
        if i < 8:
            reads.append(head)
            for s in sessions:
                if not s['num'].startswith('Session'): continue
                when = f' <span class="small muted">({html.escape(s["when"])})</span>'
                reads.append(f'<h4>{html.escape(s["num"])} · {html.escape(s["title"] or ("North" if s["num"]=="Session 1" else "Application"))}{when}</h4>')
                req = [it for it in s['items'] if not it['opt']]; rec = [it for it in s['items'] if it['opt']]
                def rhtml(it):
                    code = it['tag'] or '—'
                    local = list(it['files'])
                    if not local and not (it['text'].lower() in ('syllabus',) or it['text'].startswith('Final session')):
                        fname = slug(f"week-{i}-{re.sub(r'[*_\"“”]', '', it['text'])[:60]}") + '.pdf'
                        expected.append((i, s['num'], it['text'], fname))
                        if os.path.exists(f'{IGD_OUT}/readings/files/{fname}'): local.append(fname)
                    drive = [] if it['text'].lower() == 'syllabus' else drive_links_for('igd', it['text'])
                    dl = links_html(local, drive, code)
                    return f'<div class="reading"><span class="code">{html.escape(code)}</span><span>{md_inline(it["text"])}</span>{dl}</div>'
                if req: reads.append('<div class="small sc">Required</div>' + ''.join(rhtml(it) for it in req))
                if rec: reads.append('<div class="small sc" style="margin-top:.6rem">Recommended</div>' + ''.join(rhtml(it) for it in rec))
                if not req and not rec: reads.append('<p class="small muted">No readings for this session.</p>')
            reads.append('</div></div>')

    sched_body = f'''<div class="kicker">Institutions of Governance and Development · Block 2 · 2026–2027</div>
<h1>Weekly schedule</h1>
<p class="lede">Mondays are North; Thursdays apply him. Weeks 2–6 open with a quiz on Monday; weeks 1–3 and 5–7 open with a pop reflection (“letter”) on Thursday. Items in grey italics are recommended, not required. Readings may change with a week’s notice or more.</p>
<p class="small"><span class="tag" style="color:var(--gold);font-family:var(--sans)">[T]</span> core text · <span class="tag" style="color:var(--gold);font-family:var(--sans)">[I]</span> illustrative · <span class="tag" style="color:var(--gold);font-family:var(--sans)">[R]</span> reference · files are on the <a href="readings.html">Readings</a> tab (sign-in required).</p>
{''.join(sched)}'''
    open(f'{IGD_OUT}/schedule.html', 'w', encoding='utf-8').write(page('igd', 'Schedule', 'schedule', sched_body))

    reads_body = f'''<div id="gate"></div>
<div id="protected" style="display:none">
<div class="kicker">Institutions of Governance and Development · Enrolled students</div>
<h1>Readings</h1>
<p class="lede">The North chapter extracts can be downloaded here directly. Each applied reading links straight to its file in the shared Google Drive reading folder where one has been placed; the rest are available through the Leiden University catalogue or online. Buy or borrow North anyway — the extracts are for marking up.</p>
{FOLDER_BOX}
<div class="notice"><p><b>Copyright.</b> Files provided here are for personal study by students enrolled in this course only. Do not share them further.</p></div>
{''.join(reads)}
</div>
<script>Site.requireSignIn(function(){{}});</script>'''
    open(f'{IGD_OUT}/readings.html', 'w', encoding='utf-8').write(page('igd', 'Readings', 'readings', reads_body))
    os.makedirs(f'{IGD_OUT}/readings/files', exist_ok=True)
    with open(f'{IGD_OUT}/readings/files/FILENAMES.txt', 'w', encoding='utf-8') as f:
        f.write('The North chapter extracts are already here (north-ch1-3.pdf … north-full-book.pdf).\n'
                'To make the applied readings downloadable from the Readings page, place each file in this folder\n'
                'using EXACTLY the file name listed below.\n\n')
        for wk, sess, cite, fn in expected:
            f.write(f'{fn}\n    Week {wk}, {sess}: {cite}\n\n')
    json.dump(weeks_json, open(f'{SRC}/igd_weeks.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('IGD schedule + readings built; weeks:', len(weeks), 'applied-reading files expected:', len(expected))
    return weeks_json

if __name__ == '__main__':
    build_problem_sets()
    build_dmp_syllabus()
    build_dmp_readings()
    build_exam_prep()
    build_igd_syllabus()
    build_igd_schedule_and_readings()
