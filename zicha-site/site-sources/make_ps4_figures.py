#!/usr/bin/env python3
"""Draws the PS4 study-key diagrams as SVG files into ../dmp/data/img/ps4/ and writes
ps_figures.json (part id -> figures) which build.py appends to the model answers.
Run:  python3 -I make_ps4_figures.py   (then python3 -I build.py)
The drawings follow the descriptions in the study key; replace any file with your own
image of the same name (png/jpg also fine if you update ps_figures.json) to use your own.
"""
import math, os, json
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dmp', 'data', 'img', 'ps4')
os.makedirs(OUT, exist_ok=True)
INK, NAVY, OX, GOLD, GREEN, MUTED, RULE = '#1c1f27', '#1f3a5f', '#7a2e2e', '#a98a3f', '#2f6b3a', '#7a7f8c', '#cfc7b6'
FONT = 'font-family="Gill Sans, Segoe UI, Helvetica, Arial, sans-serif"'
FIG = {}

def svg(name, w, h, body, caption, part):
    s = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" {FONT} font-size="13">\n<rect width="{w}" height="{h}" fill="#ffffff"/>\n{body}\n</svg>\n'
    open(os.path.join(OUT, name + '.svg'), 'w', encoding='utf-8').write(s)
    FIG.setdefault(part, []).append({'src': 'data/img/ps4/' + name + '.svg', 'caption': caption})

def text(x, y, t, size=13, fill=INK, anchor='middle', weight='normal', style=''):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}" {style}>{t}</text>'

# ------------------------------------------------------------------ Q4: one-dimensional carbon tax
COUNTRIES = [('NL', 120), ('DK', 110), ('DE', 90), ('FR', 80), ('ES', 60), ('PL', 30), ('HU', 20)]
def line1d(name, part, caption, sq, winset=None, hu_accept=None, overlap=None, outcome=None, note=''):
    W, H = 760, 230; x0, x1 = 60, 700; base = 120
    def X(v): return x0 + (x1 - x0) * v / 140
    b = []
    # bands
    if winset: b.append(f'<rect x="{X(winset[0])}" y="{base-58}" width="{X(winset[1])-X(winset[0])}" height="22" fill="{NAVY}" fill-opacity=".18"/>' + text((X(winset[0])+X(winset[1]))/2, base-62, f'Winset of SQ: €{winset[0]}–€{winset[1]} (beats SQ in a majority vote)', 11, NAVY))
    if hu_accept: b.append(f'<rect x="{X(hu_accept[0])}" y="{base+14}" width="{max(X(hu_accept[1])-X(hu_accept[0]),3)}" height="22" fill="{OX}" fill-opacity=".18"/>' + text((X(hu_accept[0])+X(hu_accept[1]))/2, base+50, f'Hungary accepts: €{hu_accept[0]}–€{hu_accept[1]}' if hu_accept[0]!=hu_accept[1] else f'Hungary accepts only €{hu_accept[0]}', 11, OX))
    if overlap: b.append(f'<rect x="{X(overlap[0])-2}" y="{base-58}" width="{max(X(overlap[1])-X(overlap[0]),4)}" height="94" fill="none" stroke="{GOLD}" stroke-width="2" stroke-dasharray="4 3"/>' + text((X(overlap[0])+X(overlap[1]))/2, base-80, 'Overlap: ' + (f'€{overlap[0]}–€{overlap[1]}' if overlap[0]!=overlap[1] else f'only €{overlap[0]}'), 11, GOLD, weight='bold'))
    # axis
    b.append(f'<line x1="{x0}" y1="{base}" x2="{x1}" y2="{base}" stroke="{INK}" stroke-width="2"/>')
    for v in range(0, 141, 20):
        b.append(f'<line x1="{X(v)}" y1="{base-5}" x2="{X(v)}" y2="{base+5}" stroke="{INK}"/>' + text(X(v), base+22, f'€{v}', 11, MUTED))
    # ideal points
    for c, v in COUNTRIES:
        col = OX if c == 'HU' else (GOLD if c == 'FR' else NAVY)
        b.append(f'<circle cx="{X(v)}" cy="{base}" r="6" fill="{col}" stroke="#fff" stroke-width="1.5"/>' + text(X(v), base-14, c + (' (AS)' if c == 'FR' else ' (veto)' if c == 'HU' else ''), 11, col, weight='bold'))
    # median marker
    b.append(f'<line x1="{X(80)}" y1="{base-30}" x2="{X(80)}" y2="{base-6}" stroke="{GOLD}" stroke-dasharray="3 2"/>' + text(X(80), base-34, 'median', 10, GOLD))
    # SQ
    b.append(f'<polygon points="{X(sq)},{base-9} {X(sq)-7},{base+4} {X(sq)+7},{base+4}" fill="{INK}"/>' + text(X(sq), base+40 if not hu_accept else base+66, f'SQ = €{sq}', 11, INK, weight='bold'))
    if outcome is not None:
        b.append(f'<circle cx="{X(outcome)}" cy="{base}" r="11" fill="none" stroke="{GREEN}" stroke-width="2.5"/>' + text(X(outcome), base+ (84 if hu_accept else 58), f'Outcome: €{outcome}', 12, GREEN, weight='bold'))
    b.append(text(W/2, 18, note, 12, MUTED) if note else '')
    svg(name, W, H, '\n'.join(b), caption, part)

line1d('q4a_line', 'q4a', 'Diagram 1 — the carbon-tax dimension from €0 to €140: the seven ideal points, the status quo (€50), the median (France, €80), the agenda setter (FR) and the veto player (HU).', 50, note='Seven member states on one dimension; NL €120 · DK €110 · DE €90 · FR €80 · ES €60 · PL €30 · HU €20')
line1d('q4c_sq50', 'q4c', 'Diagram 2 — SQ = €50. Winset of the status quo (€30–€90) and Hungary’s acceptance set (€0–€50, everything within €30 of its ideal). The overlap is €30–€50, so France’s best feasible proposal is €50: no change.', 50, winset=(30, 90), hu_accept=(0, 50), overlap=(30, 50), outcome=50)
line1d('q4d_sq20', 'q4d', 'Diagram 3 — SQ = €20 (Hungary’s ideal point). Almost everyone prefers a higher tax, but Hungary accepts only €20 itself, so the veto freezes policy at €20.', 20, winset=(20, 110), hu_accept=(20, 20), overlap=(20, 20), outcome=20)
line1d('q4e_sq35', 'q4e', 'Diagram 4 — SQ = €35. The winset runs upward from €35; Hungary accepts €5–€35 (within €15 of its ideal). The overlap is the single point €35, so the status quo stands.', 35, winset=(35, 110), hu_accept=(5, 35), overlap=(35, 35), outcome=35)

# ------------------------------------------------------------------ Q5: two-dimensional policy space
ENV, TECH, SKEP, SQ2 = (75, 50), (30, 60), (25, 25), (40, 40)
def dist(a, b): return math.hypot(a[0]-b[0], a[1]-b[1])
def grid2d(name, part, caption, draw):
    W, H = 620, 600; ox, oy, S = 70, 540, 480
    def P(p): return (ox + S * p[0] / 100, oy - S * p[1] / 100)
    b = []
    for i in range(0, 101, 10):
        x = ox + S * i / 100; y = oy - S * i / 100
        b.append(f'<line x1="{x}" y1="{oy}" x2="{x}" y2="{oy-S}" stroke="{"#d9d4c7" if i%50 else "#bfb9aa"}" stroke-width="1"/>')
        b.append(f'<line x1="{ox}" y1="{y}" x2="{ox+S}" y2="{y}" stroke="{"#d9d4c7" if i%50 else "#bfb9aa"}" stroke-width="1"/>')
        b.append(text(x, oy+18, str(i), 11, MUTED)); b.append(text(ox-12, y+4, str(i), 11, MUTED, anchor='end'))
    b.append(f'<line x1="{ox}" y1="{oy}" x2="{ox+S}" y2="{oy}" stroke="{INK}" stroke-width="1.5"/><line x1="{ox}" y1="{oy}" x2="{ox}" y2="{oy-S}" stroke="{INK}" stroke-width="1.5"/>')
    b.append(text(ox + S/2, oy+40, 'Dimension A — Renewable energy subsidies (€bn)', 12, INK))
    b.append(f'<text transform="translate(22,{oy - S/2}) rotate(-90)" font-size="12" fill="{INK}" text-anchor="middle">Dimension B — Carbon-capture research (€bn)</text>')
    b += draw(P)
    for nm, p, col, sym in (('Environmental (75,50)', ENV, GREEN, 'circle'), ('Tech (30,60)', TECH, NAVY, 'rect'), ('Skeptic (25,25)', SKEP, OX, 'tri')):
        x, y = P(p)
        if sym == 'circle': b.append(f'<circle cx="{x}" cy="{y}" r="7" fill="{col}" stroke="#fff" stroke-width="1.5"/>')
        elif sym == 'rect': b.append(f'<rect x="{x-6}" y="{y-6}" width="12" height="12" fill="{col}" stroke="#fff" stroke-width="1.5"/>')
        else: b.append(f'<polygon points="{x},{y-8} {x-7},{y+6} {x+7},{y+6}" fill="{col}" stroke="#fff" stroke-width="1.5"/>')
        b.append(text(x + (12 if p[0] < 70 else 0), y - 10 if p[0] < 70 else y + 24, nm, 12, col, anchor='start' if p[0] < 70 else 'middle', weight='bold'))
    x, y = P(SQ2)
    b.append(f'<circle cx="{x}" cy="{y}" r="6" fill="{INK}"/><circle cx="{x}" cy="{y}" r="10" fill="none" stroke="{INK}"/>' + text(x+14, y+16, 'SQ (40,40)', 12, INK, anchor='start', weight='bold'))
    svg(name, W, H, '\n'.join(b), caption, part)

def circle_through_sq(P, centre, col, fill_op=0.0, dash=''):
    r = dist(centre, SQ2); cx, cy = P(centre); R = r * 4.8
    return f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="{col}" fill-opacity="{fill_op}" stroke="{col}" stroke-width="2" {("stroke-dasharray=%s" % chr(34) + dash + chr(34)) if dash else ""}/>'

def triangle(P):
    pts = ' '.join(f'{P(p)[0]},{P(p)[1]}' for p in (ENV, TECH, SKEP))
    return [f'<polygon points="{pts}" fill="none" stroke="{MUTED}" stroke-width="1.5" stroke-dasharray="6 4"/>']

grid2d('q5a1_setup', 'q5a1', 'Diagram 5 — the 100×100 policy space with the three blocs’ ideal points and the status quo at (40,40). The ideal points form a proper triangle (sides ≈ 46, 35 and 56), not a line.', lambda P: triangle(P) + [text(P((43,45))[0], P((43,45))[1], '≈46', 11, MUTED), text(P((22,44))[0], P((22,44))[1], '≈35', 11, MUTED), text(P((52,34))[0], P((52,34))[1], '≈56', 11, MUTED)])

def winset_draw(P):
    b = [circle_through_sq(P, ENV, GREEN, .14), circle_through_sq(P, TECH, NAVY, .14), circle_through_sq(P, SKEP, OX, .14)]
    for p, lbl, ok in (((45, 55), '(45,55) ✓ Env+Tech', True), ((50, 50), '(50,50) ✗', False), ((65, 35), '(65,35) ✗', False), ((35, 65), '(35,65) ✗', False)):
        x, y = P(p); b.append(f'<circle cx="{x}" cy="{y}" r="4" fill="{GREEN if ok else MUTED}"/>' + text(x+7, y-6, lbl, 11, GREEN if ok else MUTED, anchor='start'))
    b.append(text(P((78, 92))[0], P((78, 92))[1], 'Each circle = points a bloc prefers to SQ', 11, INK, anchor='end'))
    b.append(text(P((78, 88))[0], P((78, 88))[1], 'Winset = where at least two circles overlap', 11, INK, anchor='end'))
    return b
grid2d('q5b1_winset', 'q5b1', 'Diagram 6 — each bloc’s indifference curve through SQ is a circle centred on its ideal point; the interior is what that bloc prefers to SQ. The winset of SQ is the region covered by at least two circles — it is far from empty. (45,55) is inside the Environmental and Tech circles and so beats SQ; (50,50), (65,35) and (35,65) do not.', winset_draw)

def oneveto_draw(P):
    b = [circle_through_sq(P, ENV, GREEN, .18)]
    x, y = P((40, 58)); b.append(f'<circle cx="{x}" cy="{y}" r="6" fill="{GOLD}" stroke="#fff" stroke-width="1.5"/>' + text(x-10, y-10, 'Tech’s best proposal ≈ (40,58) on the circle', 12, GOLD, anchor='end', weight='bold'))
    tx, ty = P(TECH); ex, ey = P(ENV); b.append(f'<line x1="{tx}" y1="{ty}" x2="{ex}" y2="{ey}" stroke="{MUTED}" stroke-dasharray="4 3"/>')
    b.append(text(P((78, 92))[0], P((78, 92))[1], 'Shaded: what Environmental accepts (closer to its ideal than SQ)', 11, INK, anchor='end'))
    return b
grid2d('q5c1_oneveto', 'q5c1', 'Diagram 7 — Environmental has a veto: only points inside its circle through SQ are acceptable. Tech, as agenda setter, proposes the acceptable point closest to its own ideal — where the Tech–Environmental line meets the circle, about (40,58) (the key rounds this to (43,58)).', oneveto_draw)

def lens_draw(P):
    b = [circle_through_sq(P, ENV, GREEN, .12), circle_through_sq(P, SKEP, OX, .12)]
    # lens: approximate intersection by clipping
    b.append(f'<clipPath id="cEnv"><circle cx="{P(ENV)[0]}" cy="{P(ENV)[1]}" r="{dist(ENV,SQ2)*4.8}"/></clipPath>')
    b.append(f'<circle cx="{P(SKEP)[0]}" cy="{P(SKEP)[1]}" r="{dist(SKEP,SQ2)*4.8}" fill="{GOLD}" fill-opacity=".35" clip-path="url(#cEnv)"/>')
    ex, ey = P(ENV); sx, sy = P(SKEP)
    b.append(f'<line x1="{ex}" y1="{ey}" x2="{sx}" y2="{sy}" stroke="{INK}" stroke-width="2.5"/>' + text(P((52, 32))[0], P((52, 32))[1], 'contract curve (Env–Skeptic)', 11, INK))
    x, y = P((42.5, 33.8)); b.append(f'<circle cx="{x}" cy="{y}" r="6" fill="{GOLD}" stroke="#fff" stroke-width="1.5"/>' + text(x+10, y+18, 'Tech’s best feasible point: the lens end of the contract curve', 11, GOLD, anchor='start', weight='bold'))
    b.append(text(P((78, 92))[0], P((78, 92))[1], 'Lens = points both veto players accept', 11, INK, anchor='end'))
    return b
grid2d('q5d_lens', 'q5d1', 'Diagram 8 — two veto players (Environmental and Skeptic): the feasible set is the lens where their two circles overlap. The contract curve — the Pareto-efficient bargains between the two — is the segment joining their ideal points; inside the lens it is the only place an agenda setter can go. Because both circles pass through SQ, the lens is the thin sliver between SQ and the circles’ second crossing, and only a short stretch of the contract curve lies inside it; Tech picks its end nearest (30,60), about (42,34). (The key’s rough figure of (35,42) lies just outside the lens.)', lens_draw)
FIG['q5d2'] = [dict(FIG['q5d1'][0], caption='Diagram 8 (again) — the contract curve through the lens: the straight segment between the Environmental and Skeptic ideal points, where their indifference curves are tangent to one another.')]

def pareto_draw(P):
    b = [circle_through_sq(P, ENV, GREEN, .10), circle_through_sq(P, TECH, NAVY, .10), circle_through_sq(P, SKEP, OX, .10)]
    b.append(f'<clipPath id="cE"><circle cx="{P(ENV)[0]}" cy="{P(ENV)[1]}" r="{dist(ENV,SQ2)*4.8}"/></clipPath><clipPath id="cT"><circle cx="{P(TECH)[0]}" cy="{P(TECH)[1]}" r="{dist(TECH,SQ2)*4.8}"/></clipPath>')
    b.append(f'<g clip-path="url(#cE)"><circle cx="{P(SKEP)[0]}" cy="{P(SKEP)[1]}" r="{dist(SKEP,SQ2)*4.8}" fill="{GOLD}" fill-opacity=".55" clip-path="url(#cT)"/></g>')
    x, y = P((40, 40)); b.append(text(x-14, y-14, 'The three discs meet only at SQ', 12, INK, anchor='end', weight='bold'))
    b.append(text(P((78, 92))[0], P((78, 92))[1], 'A move must lie inside all three circles — here that is SQ alone', 11, INK, anchor='end'))
    return b
grid2d('q5e1_pareto', 'q5e1', 'Diagram 9 — three veto players: only points inside all three circles are feasible. With these coordinates SQ (40,40) lies inside the triangle of ideal points, so it is already Pareto-efficient and the three discs touch only at SQ: no proposal makes all three blocs better off, and policy cannot move at all. (The key’s estimate of a small region around (38,42) is a rough approximation; the drawing uses the exact coordinates.)', pareto_draw)

def line_f1():
    W, H = 760, 170; x0, x1 = 60, 700; base = 90
    def X(v): return x0 + (x1 - x0) * v / 100
    b = [f'<line x1="{x0}" y1="{base}" x2="{x1}" y2="{base}" stroke="{INK}" stroke-width="2"/>']
    for v in range(0, 101, 10): b.append(f'<line x1="{X(v)}" y1="{base-5}" x2="{X(v)}" y2="{base+5}" stroke="{INK}"/>' + text(X(v), base+22, f'€{v}bn', 11, MUTED))
    for nm, v, col in (('Skeptic', 25, OX), ('Tech (median)', 30, NAVY), ('Environmental', 75, GREEN)):
        b.append(f'<circle cx="{X(v)}" cy="{base}" r="6" fill="{col}" stroke="#fff" stroke-width="1.5"/>' + text(X(v), base - (30 if v == 30 else 14), f'{nm} €{v}', 11, col, weight='bold'))
    b.append(f'<polygon points="{X(40)},{base-9} {X(40)-7},{base+4} {X(40)+7},{base+4}" fill="{INK}"/>' + text(X(40), base+44, 'SQ = €40', 11, INK, weight='bold'))
    b.append(text(W/2, 18, 'Renewables only: with three voters the median is Tech at €30, so Tech + Skeptic move policy from €40 to €30', 12, MUTED))
    svg('q5f1_line', 760, 170, '\n'.join(b), 'Diagram 10 — the one-dimensional version (renewable subsidies only): Skeptic €25, Tech €30, Environmental €75, SQ €40. Tech is the median voter and can carry €30 with Skeptic’s support.', 'q5f1')
line_f1()

# ------------------------------------------------------------------ Q6: closed / open rule equilibria
def rule_diagram(name, part, caption, closed, zb):
    W, H = 560, 480; ox, oy, S = 120, 420, 360; SQ, M = 0.25, 0.45
    def X(v): return ox + S * v
    def Y(v): return oy - S * v
    b = []
    for v in (0, .25, .5, .75, 1):
        b.append(f'<line x1="{X(v)}" y1="{oy}" x2="{X(v)}" y2="{oy-S}" stroke="#e6e0d2"/><line x1="{ox}" y1="{Y(v)}" x2="{ox+S}" y2="{Y(v)}" stroke="#e6e0d2"/>')
    b.append(f'<line x1="{ox}" y1="{oy}" x2="{ox+S}" y2="{oy}" stroke="{INK}" stroke-width="1.5"/><line x1="{ox}" y1="{oy}" x2="{ox}" y2="{oy-S}" stroke="{INK}" stroke-width="1.5"/>')
    b.append(text(ox + S/2, oy + 34, 'Committee ideal point C  (0 → 1)', 12, INK)); b.append(f'<text transform="translate(18,{oy-S/2}) rotate(-90)" font-size="12" fill="{INK}" text-anchor="middle">Equilibrium outcome</text>')
    b.append(text(ox, oy+16, '0', 11, MUTED)); b.append(text(ox+S, oy+16, '1', 11, MUTED))
    # 45-degree reference
    b.append(f'<line x1="{X(0)}" y1="{Y(0)}" x2="{X(1)}" y2="{Y(1)}" stroke="{RULE}" stroke-dasharray="3 3"/>' + text(X(.2), Y(.08), '45° (outcome = C)', 10, MUTED))
    for v, lbl, col in ((SQ, 'SQ', OX), (M, 'M (floor median)', GOLD), (2*M-SQ, '2M − SQ', NAVY)):
        b.append(f'<line x1="{ox-5}" y1="{Y(v)}" x2="{ox}" y2="{Y(v)}" stroke="{col}"/>' + text(ox-8, Y(v)+4, lbl, 11, col, anchor='end'))
        b.append(f'<line x1="{X(v)}" y1="{oy}" x2="{X(v)}" y2="{oy+5}" stroke="{col}"/>' + text(X(v), oy+16, lbl.replace(' (floor median)', ''), 11, col))
    if closed:
        pts = f'{X(0)},{Y(SQ)} {X(SQ)},{Y(SQ)} {X(2*M-SQ)},{Y(2*M-SQ)} {X(1)},{Y(2*M-SQ)}'
        b.append(f'<polyline points="{pts}" fill="none" stroke="{NAVY}" stroke-width="3"/>' + text(X(.85), Y(2*M-SQ)-10, 'closed rule', 12, NAVY, weight='bold'))
        if zb:
            pts2 = f'{X(0)},{Y(0)} {X(2*M)},{Y(2*M)} {X(1)},{Y(2*M)}'
            b.append(f'<polyline points="{pts2}" fill="none" stroke="{OX}" stroke-width="2.5" stroke-dasharray="7 5"/>' + text(X(.6), Y(2*M)-12, 'closed rule, ZB = 0 (outcome = C up to 2M)', 11, OX))
            b.append(f'<line x1="{ox-5}" y1="{Y(2*M)}" x2="{ox}" y2="{Y(2*M)}" stroke="{OX}"/>' + text(ox-8, Y(2*M)+4, '2M', 11, OX, anchor='end'))
    else:
        b.append(f'<line x1="{X(0)}" y1="{Y(M)}" x2="{X(1)}" y2="{Y(M)}" stroke="{NAVY}" stroke-width="3"/>' + text(X(.5), Y(M)-10, 'open rule: outcome = M for every C', 12, NAVY, weight='bold'))
        if zb: b.append(f'<line x1="{X(0)}" y1="{Y(M)+4}" x2="{X(1)}" y2="{Y(M)+4}" stroke="{OX}" stroke-width="2.5" stroke-dasharray="7 5"/>' + text(X(.5), Y(M)+22, 'open rule with ZB = 0: unchanged, still M', 11, OX))
    svg(name, W, H, '\n'.join(b), caption, part)
rule_diagram('q6a_closed', 'q6a', 'Diagram 11 — closed rule. Outcome as a function of the committee’s ideal point C: flat at SQ for C below SQ; equal to C (the committee gets its ideal) as long as the floor median prefers it to SQ, i.e. up to 2M − SQ; flat at 2M − SQ — the point where the median is indifferent to SQ — for any committee further out. The key describes the same kinked shape.', True, False)
rule_diagram('q6b_open', 'q6b', 'Diagram 12 — open rule. Whatever the committee proposes is amended to the floor median: the equilibrium is a horizontal line at M.', False, False)
rule_diagram('q6c_closed_zb', 'q6c', 'Diagram 13 — zero-based budgeting (reversion point 0) added as a dashed line. Closed rule: the median now compares every proposal with 0, so the committee gets its ideal up to 2M and 2M beyond — more than under the old reversion point. Open rule: still M.', True, True)
rule_diagram('q6c_open_zb', 'q6c', 'Diagram 13b — open rule with ZB = 0: the reversion point is irrelevant because the floor median can always amend to M.', False, True)

# ------------------------------------------------------------------ Q10: Downs
def downs():
    W, H = 640, 300; ox, oy, S = 60, 240, 520
    def X(v): return ox + S * v / 100
    b = [f'<line x1="{ox}" y1="{oy}" x2="{ox+S}" y2="{oy}" stroke="{INK}" stroke-width="1.5"/>']
    for v in range(0, 101, 10): b.append(f'<line x1="{X(v)}" y1="{oy}" x2="{X(v)}" y2="{oy+5}" stroke="{INK}"/>' + text(X(v), oy+18, str(v), 11, MUTED))
    pts = []
    for i in range(0, 101):
        y = oy - 170 * math.exp(-((i - 50) ** 2) / (2 * 15 ** 2)); pts.append(f'{X(i)},{y}')
    b.append(f'<polygon points="{X(0)},{oy} ' + ' '.join(pts) + f' {X(100)},{oy}" fill="{NAVY}" fill-opacity=".12"/>')
    b.append(f'<polyline points="' + ' '.join(pts) + f'" fill="none" stroke="{NAVY}" stroke-width="2.5"/>')
    b.append(f'<line x1="{X(50)}" y1="{oy}" x2="{X(50)}" y2="{oy-178}" stroke="{GOLD}" stroke-dasharray="4 3"/>')
    b.append(f'<rect x="{X(50)-30}" y="{oy-205}" width="60" height="22" fill="{OX}"/>' + text(X(50), oy-190, 'Party A', 11, '#fff', weight='bold'))
    b.append(f'<rect x="{X(50)-30}" y="{oy-230}" width="60" height="22" fill="{GREEN}"/>' + text(X(50), oy-215, 'Party B', 11, '#fff', weight='bold'))
    b.append(text(X(50), oy+36, 'Median voter at 50: both parties converge here', 12, INK, weight='bold'))
    b.append(text(X(66), oy-120, 'If B moved to 51 it would lose every voter below 50.5 to A', 11, MUTED, anchor='start'))
    b.append(text(W/2, 18, 'Distribution of voters’ ideal points (normal, mean 50) on a 0–100 policy scale', 12, MUTED))
    svg('q10a_downs', W, H, '\n'.join(b), 'Diagram 14 — Downsian convergence: with a single-peaked, normally distributed electorate, both vote-maximising parties locate at the median voter’s position (50).', 'q10a')
downs()

json.dump(FIG, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ps_figures.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
print('figures written:', sum(len(v) for v in FIG.values()), 'for parts', list(FIG.keys()))
