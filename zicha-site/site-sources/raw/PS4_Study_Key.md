# Problem Set 4 Answer Key: The Impossible Dream of Perfect Democracy

## Arrow's Theorem, Voting Systems, and the Architecture of Collective Choice - Complete Solutions with Explanations

## Learning Objectives and Overview

This problem set explores why perfect democratic decision-making is mathematically impossible and how institutional design manages this impossibility. By completing it, you will:

- Understand Arrow's Impossibility Theorem and its profound implications

- Analyze how different voting rules create different outcomes from identical preferences

- Master spatial voting models in one and two dimensions

- Recognize how institutions create stability at the cost of bias

- Appreciate the fundamental tension between fairness and coherence in collective choice

**Key Theme:** Democracy isn't just imperfect—it's mathematically impossible to perfect. But understanding these impossibilities helps us design better, more honest institutions.

## DIAGRAMS NEEDED FOR THIS STUDY KEY

**Note to students:** You should create these diagrams while studying. The act of drawing helps cement spatial reasoning.

### Question 4 Diagrams Required:

### Question 5 Diagrams Required:

### Question 6 Diagrams Required:

### Question 10 Diagram Required:

## Part I: The Committee's Dilemma - Building Intuition (45 minutes)

### Question 1: Discovering the Paradox

#### [DO] Part A: Pairwise Comparisons

**Answers:**

- **G vs M**: G wins with 6 votes (Progressives 3 + Conservatives 3)

- **M vs I**: M wins with 6 votes (Progressives 3 + Market Liberals 3)

- **I vs G**: I wins with 6 votes (Market Liberals 3 + Conservatives 3)

**[Calculation Explanation]:**

- In G vs M: Progressives prefer G>M, Conservatives prefer I>G>M (so G>M), Market Liberals prefer M>I>G. Result: 6 for G, 3 for M.

- In M vs I: Progressives prefer G>M>I (so M>I), Market Liberals prefer M>I, Conservatives prefer I>G>M (so I>M). Result: 6 for M, 3 for I.

- In I vs G: Market Liberals prefer M>I>G (so I>G), Conservatives prefer I>G, Progressives prefer G>M>I (so G>I). Result: 6 for I, 3 for G.

#### [WRITE] Part B: The Cycle

**Model Answer:** We've discovered a voting cycle (also called Condorcet paradox): the majority prefers G to M, M to I, and I to G. This creates an intransitive social preference—society simultaneously prefers G>M>I>G, which is logically impossible. If the council claims to represent "the will of the people," this paradox reveals there may be no coherent "will" to discover—the collective preference contradicts itself. The "will of the majority" depends entirely on which pair of options we compare, not on some underlying social preference.

**Common Student Mistake:** Thinking the cycle means voters are confused or irrational. Actually, each individual has perfectly rational, transitive preferences. The irrationality emerges only at the collective level.

#### [DO] Part C: Breaking the Cycle

**Answers:**

| **Voting Procedure** | **Winner** | **Losers Upset?** |
| --- | --- | --- |
| Method 1: G vs M first (G wins), then G vs I | **I wins** | Progressives and Market Liberals upset (6 out of 9) |
| Method 2: G vs I first (I wins), then I vs M | **M wins** | Progressives and Conservatives upset (6 out of 9) |
| Method 3: M vs I first (M wins), then M vs G | **G wins** | Market Liberals and Conservatives upset (6 out of 9) |
| Method 4: Plurality (each votes first choice) | **Tie: 3-3-3** | Everyone upset—no winner! |

**[Explanation]:** The tournament structure determines the winner. Sequential elimination lets the last alternative standing win, regardless of "true" social preference. Under plurality, each policy gets exactly 3 first-place votes, creating a three-way tie.

#### [WRITE] Part D: Institutional Power

**Model Answer:** The chair's "procedural power" to set the voting order is actually the power to determine the outcome. By choosing which alternatives compete first, the chair controls which alternative survives to the final round. This reveals that in democratic systems with cycles, process IS outcome—there's no underlying "correct" answer that fair procedures reveal. Instead, procedures construct outcomes. The apparently neutral role of setting the agenda becomes a powerful substantive authority to determine which policy wins. This is why agenda-setting power in legislatures is so valuable and contested.

**Key Insight:** When preferences cycle, whoever controls procedure controls outcomes. The separation between "procedural" and "substantive" power collapses. This is why agenda-setting power in legislatures is so valuable and contested—it's not just about efficiency, it's about determining which policy wins.

## Part II: Arrow's Impossibility - From Intuition to Theory (60 minutes)

### Question 2: Anatomy of Impossibility

**Note on Problem Setup:** There appears to be an issue with the preference profiles as stated in the original problem. To properly demonstrate an Independence violation, the social preference between Action and Comedy must reverse between Profile A and Profile B while no individual's Action vs. Comedy preference changes. The profiles given may not accomplish this. If your calculations show Action winning in both profiles, this indicates the problem setup needs adjustment. The key concept remains valid: Independence violations occur when society's X vs. Y preference changes even though nobody's individual X vs. Y preference changed—typically because preferences over a third option Z shifted.

#### [DO] Part A: Group Preferences

**Profile A:**

- Action vs Comedy: Action wins 2-1 (Anna + Carlos prefer Action>Comedy)

- Comedy vs Drama: Comedy wins 2-1 (Anna + Ben prefer Comedy>Drama)

- Drama vs Action: Drama wins 2-1 (Ben + Carlos prefer Drama>Action)

- Group ranking: **Intransitive cycle: Action****>****Comedy****>****Drama****>****Action**

**Profile B:**

- Action vs Comedy: **Comedy wins 2-1** (Ben + Carlos prefer Comedy>Action)

- Comedy vs Drama: Comedy wins 2-1 (Anna + Ben prefer Comedy>Drama)

- Drama vs Action: Drama wins 2-1 (Ben + Carlos prefer Drama>Action)

- Group ranking: **Comedy****>****Drama, Drama****>****Action, Comedy****>****Action** (transitive! Comedy is Condorcet winner)

#### [DO] Part B: Finding the Violation

**Answers:**

- Profile A: Society prefers **Action** to **Comedy**

- Profile B: Society prefers **Comedy** to **Action**

- Did Anna change her Action vs Comedy preference? **No** (still Action>Comedy>Drama)

- Did Ben change? **No** (still Comedy>Drama/Action in that order)

- Did Carlos change? **No** (still Drama>Action>Comedy)

**What changed:** Ben's ranking between Drama and Action switched (Profile A: Comedy>Drama>Action; Profile B: Comedy>Action>Drama)

#### [WRITE] Part C: The Independence Violation

**Model Answer:** This violates Arrow's Independence of Irrelevant Alternatives condition. Society reversed its preference between Action and Comedy (from Action>Comedy to Comedy>Action) even though no individual changed their Action vs. Comedy preference. What changed was Ben's ranking of Drama relative to Action—he moved Action from third to second place. This is philosophically troubling because it means society's choice between two options can be manipulated by changing the presence or ranking of a third, "irrelevant" alternative. Democracy shouldn't work like this—whether society prefers Action to Comedy should depend only on people's feelings about Action versus Comedy, not their feelings about Drama.

**Key Insight:** Majority rule violates Independence—society's preference between X and Y can change even when nobody's X vs. Y preference changes. This makes democratic outcomes vulnerable to manipulation through strategic introduction of alternatives. The "will of the people" between two options can be changed by introducing or removing a third option, even when preferences about the first two haven't changed.

### Question 3: Escaping Arrow's Prison

#### [DO] Part A: Alternative Voting Rules

| **Voting Rule** | **Violates** | **Why This Might Be Acceptable** |
| --- | --- | --- |
| Dictatorship | **Non-Dictatorship (D)** | When expertise matters more than fairness (e.g., medical decisions during surgery, captain of a ship in emergency) |
| Unanimity Rule | **Universal Domain (U)** - effectively restricts feasible outcomes | When protecting individual rights is paramount (e.g., jury verdicts for conviction, constitutional amendments) |
| Lexicographic (alphabetically first decides) | **Pareto (P)** and **Non-Dictatorship (D)** | Never acceptable—purely arbitrary discrimination with no justification |
| Borda Count | **Independence (I)** | When we want to consider intensity of preferences, not just first choices (e.g., awards, rankings where overall preference matters) |

**[Explanation for Unanimity Rule]:** Unanimity doesn't formally violate Universal Domain, but it creates such severe gridlock that we effectively restrict which preference profiles lead to actual decisions. Any proposal opposed by even one person fails, making the status quo nearly impossible to change.

#### [WRITE] Part B: The Fundamental Trade-off

**Model Answer:** Arrow's Theorem reveals a fundamental trade-off between fairness (treating everyone's preferences equally, respecting Pareto efficiency, no dictatorship) and consistency (producing transitive, coherent social preferences that satisfy Independence). We can have fair procedures that produce cycles, or consistent outcomes that privilege some actors. For constitutional amendments, I'd sacrifice consistency for fairness—requiring supermajorities even if it creates gridlock protects against tyranny of the majority. For restaurant choice among friends, I'd sacrifice fairness for consistency—just let someone decide so we can eat. The stakes determine which value matters more: high-stakes decisions justify accepting inconsistency to preserve fairness, while low-stakes decisions benefit from quick resolution even if procedurally unfair.

**Key Insight:** There is no "perfect" democratic system. Every voting rule involves trade-offs that should be made consciously based on context and values. Arrow's Theorem doesn't tell us which condition to sacrifice—it tells us we must choose. The appropriate trade-off depends on stakes, reversibility, and what we value most in different contexts.

## Part III: Spatial Models and the Median Voter (75 minutes)

### Question 3.5: Understanding Spatial Restrictions

#### [DO] Part A: Why 1D Works

**Answers:**

- We're violating: **Universal Domain (U)**

- Because: **We're restricting allowable preferences to single-peaked preferences only**

**[Explanation]:** Single-peaked preferences mean each voter has one ideal point and prefers options closer to their ideal to those farther away. This excludes preferences like "I want either extreme left or extreme right, but not the center." Such preferences are not irrational, but we rule them out to get stability.

#### [WRITE] Part B: The Universal Domain Trade-off

**Model Answer:** Requiring single-peaked preferences violates Universal Domain because it excludes certain "reasonable" preference orderings. For example, a voter might prefer either strong regulation or no regulation but dislike moderate regulation (seeing it as worst of both worlds). Or someone might prefer extreme positions on both sides to centrist compromise. These preferences are logically coherent but create cycles. By requiring single-peakedness, we sacrifice the principle that democratic systems should accommodate any possible preference profile.

#### [DO] Part C: 2D Instability

**Answers:**

- Can we still get cycles? **Yes**

- What additional restriction would guarantee stability? **All ideal points must lie on a single line (collapse to one dimension)**

- Why is this restriction unrealistic? **Most political issues have multiple dimensions that cannot be reduced to a single left-right spectrum**

**[Explanation]:** Even with circular indifference curves (single-peaked in all directions), we get cycles in 2D unless ideal points happen to fall on a line. This is McKelvey's Chaos Theorem—multidimensional voting is almost always unstable without institutional constraints.

**Key Insight:** Spatial restrictions (like single-peaked preferences in 1D) sacrifice Universal Domain to achieve stability. We exclude certain logically possible preference orderings to get predictable outcomes. This trade-off is unavoidable—you cannot have both complete generality and guaranteed stability in multidimensional spaces.

**Given Information:** Seven EU member states must set a carbon tax rate (€ per ton CO2). Their ideal points:

- Netherlands: €120

- Denmark: €110

- Germany: €90

- France: €80 (Agenda Setter)

- Spain: €60

- Poland: €30

- Hungary: €20 (Veto Player - can block any change from status quo)

Status Quo: €50

#### [DRAW] Part A: One-Dimensional Model

**[Create your diagram showing the line from €0-€140 with all points marked]**

#### [DO] Part B: Pure Majority Rule

**Answers:**

- Median country: **France at €80**

- Equilibrium tax rate: **€80**

**[Explanation]:** With seven countries, the median is the 4th ranked preference. Counting from either end: Netherlands (€120), Denmark (€110), Germany (€90), **France (€80)**, Spain (€60), Poland (€30), Hungary (€20). In pure majority rule with single-peaked preferences, the median ideal point wins because it beats any other proposal in pairwise votes.

#### [DRAW] Part C: Agenda Setter with Veto Player

**[Create diagram showing these ranges]**

**Calculations:**

- **Winset of SQ (€50):** What majority prefers to €50?

- Points between €30 and €90 beat SQ=€50

- Why? The median is at €80. Any point from €30 to €90 is closer to at least 4 countries' ideal points than €50 is

- Specifically: Netherlands, Denmark, Germany, France all prefer anything up to €90 over €50

- **What Hungary accepts:** Hungary's ideal is €20, SQ is €50

- Distance from Hungary to SQ: |€50 - €20| = €30

- Hungary accepts anything within €30 of their ideal: €0 to €50

- This means Hungary will **veto any increase above €50**

- **Overlap:** Winset is €30-€90, Hungary accepts €0-€50

- **Overlap: €30 to €50**

- **France's optimal proposal:** Within €30-€50, what's closest to France's ideal (€80)?

- **€50** (the upper bound of what Hungary will accept)

**Final outcome: €50** (no change from status quo)

**[Explanation]:** France would love to propose €80, but Hungary would veto it. France can only propose within the range Hungary accepts. Since Hungary vetoes any increase, the best France can do is maintain the status quo.

#### [DO] Part D: Different Status Quo (SQ = €20)

**[DIAGRAM 3: Same line with SQ=€20, showing winset and Hungary's acceptance range]**

**Calculations:**

- **Winset of SQ (€20):**

- What majority prefers to €20? Anything from €20 to about €110

- Almost everyone prefers higher taxes than €20 except Hungary

- **What Hungary accepts:**

- Hungary's ideal is €20, so they only accept exactly **€20**

- Any movement away from €20 makes Hungary worse off

- **Can France move policy?** **No**

- Hungary vetoes any change from their ideal point

**Final outcome: €20**

**[Explanation]:** When the status quo equals a veto player's ideal point, that veto player will block any movement. Policy is completely frozen at the veto player's ideal.

#### [DO] Part E: Strategic Status Quo Placement (SQ = €35)

**[DIAGRAM 4: Same line with SQ=€35, showing winset, Hungary's acceptable range, overlap, and outcome at €35]**

**Calculations:**

- **Winset of SQ (€35):**

- With median at €80 and SQ at €35

- Majority prefers: approximately €35 to €125 (but constrained by upper ideal points)

- Realistically: €35 to about €110-115

- **What Hungary accepts:**

- Distance from Hungary (€20) to SQ (€35): |€35 - €20| = €15

- Hungary accepts €20 ± €15 = **€5 to €35**

- Hungary will veto any increase above €35

- **Overlap:**

- Winset: €35 to €110+

- Hungary accepts: €5 to €35

- **Overlap: exactly €35 only**

- **France's optimal proposal:**

- France can only propose **€35** (the SQ itself)

- Any increase gets vetoed by Hungary

**Final outcome: €35** (no change from status quo)

**[Explanation]:** Even though the winset extends upward from €35, Hungary's veto constraint binds. Hungary will only accept proposals at or below €35, which means France cannot move policy at all. The status quo remains at €35. Once again, the veto player prevents any movement toward the median, freezing policy at the status quo location.

#### [WRITE] Part F: Institutional Power and Constraints

**Model Answer:** Without institutional structure (pure majority rule), policy converges to the median (€80). With agenda setter and veto player, outcomes depend critically on status quo location. When SQ=€50, Hungary's veto prevents France from moving policy toward the median. When SQ=€20 (Hungary's ideal), complete gridlock results. When SQ=€35, moderate gridlock occurs. These institutions create predictability—we know policy won't move much from the status quo when veto players exist. However, this creates path dependence: whoever set the initial status quo essentially determines long-term policy. Veto players don't just slow change; they can freeze policy at points that no longer reflect majority preferences. The "power" of the veto is actually the power of the status quo itself.

**Key Insight:** Veto players create stability by making the status quo "sticky," but this means historical accidents can have permanent consequences. The power of a veto isn't just blocking new proposals—it's preserving whatever arrangement happened to exist when veto power was established. Path dependence matters enormously in systems with veto players.

### Question 5: Two-Dimensional Voting, Institutions, and Heresthetic Manipulation

**Setup:**

- Three equal blocs (3 members each): Environmental (75,50), Tech (30,60), Skeptic (25,25)

- Status Quo: (40,40)

- Dimension A: Renewable Energy Subsidies (€0-100B)

- Dimension B: Carbon Capture Research (€0-100B)

#### [DRAW] Part A1: Initial Setup

**[Create 100x100 grid with points marked as specified]**

#### [DO] Part A2: Verify the Triangle

**Approximate distances:**

- Environmental to Tech: √[(75-30)² + (50-60)²] = √[2025 + 100] = √2125 ≈ **46**

- Tech to Skeptic: √[(30-25)² + (60-25)²] = √[25 + 1225] = √1250 ≈ **35**

- Skeptic to Environmental: √[(25-75)² + (25-50)²] = √[2500 + 625] = √3125 ≈ **56**

**[Explanation]:** The three points form a proper triangle (not collinear), which is crucial. If they were on a line, we'd have one-dimensional voting and stability. The triangle formation guarantees cycling potential.

**Key Insight from Part A:** When ideal points form a proper triangle in two-dimensional space (rather than falling on a line), the potential for cycling exists. This geometric arrangement is what makes two-dimensional voting fundamentally different from one-dimensional voting where the median voter theorem provides stability.

### Part B: Discovering Chaos Under Majority Rule

#### [DRAW] Part B1: Finding the Winset of SQ

**[Create diagram with indifference curves and shaded regions]**

**Instructions for drawing:**

- For each bloc, draw a circle through SQ (40,40) centered at their ideal point

- Shade the area inside each circle (closer to that bloc's ideal than to SQ)

- The winset is where at least 2 shaded areas overlap

**Answer:** Is the winset empty? **No** — substantial area beats SQ

#### [DO] Part B2: Identifying Coalition Possibilities

**For point (50,50):**

- Environmental: distance to (50,50) = √[(75-50)² + (50-50)²] = 25; distance to SQ = √[(75-40)² + (50-40)²] = √1325 ≈ 36.4

- Prefers (50,50)? **Yes** (25 < 36.4)

- Tech: distance to (50,50) = √[(30-50)² + (60-50)²] = √500 ≈ 22.4; distance to SQ = √[(30-40)² + (60-40)²] = √500 ≈ 22.4

- Prefers (50,50)? **Indifferent** (equal distance)

- Skeptic: distance to (50,50) = √[(25-50)² + (25-50)²] = √1250 ≈ 35.4; distance to SQ = √[(25-40)² + (25-40)²] = √450 ≈ 21.2

- Prefers (50,50)? **No** (35.4 > 21.2)

**Which blocs prefer this to SQ?** Environmental (and Tech is indifferent) **Does it pass?** **No** (need 2 out of 3 blocs)

**For point (65,35):**

- Environmental: distance = √[(75-65)² + (50-35)²] = √325 ≈ 18 vs SQ distance ≈ 36.4

- **Prefers (65,35)**

- Tech: distance = √[(30-65)² + (60-35)²] = √1850 ≈ 43 vs SQ distance ≈ 22.4

- **Prefers SQ**

- Skeptic: distance = √[(25-65)² + (25-35)²] = √1700 ≈ 41.2 vs SQ distance ≈ 21.2

- **Prefers SQ**

**Which blocs prefer this to SQ?** Environmental only **Does it pass?** **No**

**For point (35,65):**

- Environmental: distance = √[(75-35)² + (50-65)²] = √1825 ≈ 42.7 vs SQ ≈ 36.4

- **Prefers SQ**

- Tech: distance = √[(30-35)² + (60-65)²] = √50 ≈ 7.1 vs SQ ≈ 22.4

- **Prefers (35,65)**

- Skeptic: distance = √[(25-35)² + (25-65)²] = √1700 ≈ 41.2 vs SQ ≈ 21.2

- **Prefers SQ**

**Which blocs prefer this to SQ?** Tech only **Does it pass?** **No**

**Better example for a point that passes:**

**For point (55,45):**

- Environmental: distance = √[(75-55)² + (50-45)²] = √425 ≈ 20.6 vs SQ ≈ 36.4 → **Prefers (55,45)**

- Tech: distance = √[(30-55)² + (60-45)²] = √850 ≈ 29.2 vs SQ ≈ 22.4 → **Prefers SQ**

- Skeptic: distance = √[(25-55)² + (25-45)²] = √1300 ≈ 36.1 vs SQ ≈ 21.2 → **Prefers SQ**

Still only Environmental prefers this.

**For point (45,55):**

- Environmental: distance = √[(75-45)² + (50-55)²] = √925 ≈ 30.4 vs SQ ≈ 36.4 → **Prefers (45,55)**

- Tech: distance = √[(30-45)² + (60-55)²] = √250 ≈ 15.8 vs SQ ≈ 22.4 → **Prefers (45,55)**

- Skeptic: distance = √[(25-45)² + (25-55)²] = √1300 ≈ 36.1 vs SQ ≈ 21.2 → **Prefers SQ**

**Which blocs?** Environmental + Tech **Passes?** **Yes** (2 out of 3)

#### [DO] Part B3: The Cycling Problem

**Starting from SQ (40,40):**

- **P₁ that beats SQ:** (45,55) — Environmental + Tech coalition

- **P₂ that beats P₁:** (35,50) — Environmental + Skeptic coalition

- Environmental: closer to (35,50) than (45,55)? Check: distance to (35,50) ≈ 40.3 vs to (45,55) ≈ 30.4 → prefers P₁

- Actually, let me recalculate: Try (55,40)

- Environmental: distance to (55,40) = √[(75-55)² + (50-40)²] = √500 ≈ 22.4 vs to P₁(45,55) ≈ 30.4 → **Prefers (55,40)**

- Skeptic: distance to (55,40) = √[(25-55)² + (25-40)²] = √1125 ≈ 33.5 vs to P₁ ≈ 36.1 → **Prefers (55,40)**

- Coalition: Environmental + Skeptic

- **P₃ that beats P₂:** (40,60) — Tech + Environmental coalition

- **P₄ that beats P₃:** (35,45) — Skeptic + Tech coalition

- **Does P₄ beat or lose to SQ?** Can continue cycling...

**[Explanation]:** With careful choice of proposals, an agenda setter can create a path from SQ to almost anywhere in the 2D space by forming different coalitions at each step. This is McKelvey's result.

#### [WRITE] Part B4: McKelvey's Insight

**Model Answer:** McKelvey proved that in multidimensional voting without restrictions, a sophisticated agenda setter can create a sequence of majority-preferred moves from any starting point to virtually any ending point in the policy space. Each step beats the previous one through a different coalition. This "chaos theorem" suggests pure majority rule in multidimensional spaces is completely unstable. However, real legislatures don't experience constant chaos because institutional rules constrain agenda-setting: committees control what reaches the floor, amendment rules limit alternatives, party discipline restricts coalitions, and procedural rules create order. These institutions sacrifice some democratic fairness for predictability and stability.

**Key insight from Part B3-B4:** McKelvey's Chaos Theorem shows that in multidimensional voting without restrictions, a sophisticated agenda setter can create a sequence of majority-preferred moves from any starting point to virtually any ending point in the policy space by forming different coalitions at each step. Real legislatures avoid this chaos through institutional constraints (committees, amendment rules, party discipline) that sacrifice democratic fairness for predictability.

**Key Insight from Part C:** A single veto player dramatically constrains the winset, giving the agenda setter less room to maneuver but still some strategic choice. The agenda setter must find their optimal point within what the veto player will accept—this creates a predictable bargaining range.

**Key Insight from Part D:** Two veto players force outcomes onto the contract curve between them—the set of Pareto efficient bargains between those two actors. This creates bilateral efficiency but can exclude third parties entirely from influence. The agenda setter chooses among points on others' contract curve rather than pursuing their own ideal.

**Key Insight from Part E:** Three veto players create near-paralysis by shrinking the feasible set to a tiny Pareto set where all three are simultaneously better off. This extreme status quo bias may be appropriate for constitutional rules but problematic for routine policy adaptation.

**Key Insight from Part F (Heresthetic):** Adding dimensions to political debate can break winning coalitions or create new ones. Tech Bloc's dimensional manipulation illustrates Riker's concept of heresthetic—the art of political manipulation through restructuring the choice situation itself. Strategic politicians don't just have better positions; they change the game by altering which dimensions are considered.

**Key Insight from Part G:** Institutional design requires explicit choices about trade-offs. Pure majority rule creates responsiveness but chaos; multiple veto players create stability but paralysis. The "right" design depends on context and values—what works for constitutional amendments differs from what works for routine legislation.

**Environmental Bloc has veto power; Tech is agenda setter**

#### [DRAW] Part C1: Constrained Choice

**[Create diagram showing Environmental's acceptable region]**

**Instructions:**

- Draw Environmental's indifference curve through SQ (circle centered at (75,50) passing through (40,40))

- Shade inside the circle (closer to Environmental's ideal than SQ)

#### [DO] Part C2: Tech's Optimal Proposal

**Answers:**

- Can Tech achieve their ideal point (30,60)? **No** (outside Environmental's acceptable set)

- What's closest point to Tech's ideal that Environmental will accept?

- Tech wants to minimize distance to (30,60)

- Subject to: point must be inside Environmental's acceptance circle

- This is the point on the circle closest to (30,60)

- Approximately: **(43,58)** (on the line connecting Tech's ideal to Environmental's ideal, at the edge of the acceptance circle)

- What coalition supports this? **Environmental + Tech** (2 out of 3, enough for majority)

**[Calculation for finding optimal point]:** The closest point on Environmental's acceptance circle to Tech's ideal lies on the line segment from Environmental's ideal (75,50) to Tech's ideal (30,60). Using the constraint that distance from Environmental equals distance from Environmental to SQ:

Distance from Environmental to SQ = √[(75-40)² + (50-40)²] ≈ 36.4

The optimal point is approximately **(43, 58)**

**Key Insight:** A single veto player dramatically constrains the winset, giving the agenda setter less room to maneuver but still some strategic choice.

### Part D: Two Veto Players Create a Contract Curve

**Both Environmental and Skeptic have veto power; Tech is agenda setter**

#### [DRAW] Part D1: The Feasible Set

**[Create diagram showing lens-shaped intersection]**

**Instructions:**

- Draw Environmental's acceptance circle (green)

- Draw Skeptic's acceptance circle (blue)

- Shade the lens-shaped area where circles overlap

- This lens is the only feasible set for proposals

#### [DRAW] Part D2: The Contract Curve

**Instructions:**

- Within the lens, identify where the two circles are tangent to each other

- The contract curve connects points where you can't make one veto player better off without making the other worse off

- In this case, the contract curve runs through the lens

#### [DO] Part D3: Understanding the Contract Curve

**Answers:**

- **Why are points on the contract curve special?** They represent Pareto efficient outcomes between the two veto players—you cannot move to make one veto player better off without making the other worse off

- **Can Tech achieve their ideal point?** No (it's outside the lens)

- **What point on the contract curve is best for Tech?** The point on the contract curve closest to (30,60), approximately **(35,42)**

**[Explanation]:** The contract curve represents all the Pareto efficient bargains between Environmental and Skeptic. Tech can only choose among these points, selecting whichever is closest to their own ideal.

#### [WRITE] Part D4: Bilateral Efficiency

**Model Answer:** The contract curve represents Pareto efficient trades between the two veto players—any point on it cannot be improved for one without hurting the other. This creates bilateral efficiency but ignores the third player (Tech). Tech is forced to choose from the Environmental-Skeptic contract curve, even though better outcomes for Tech exist outside this curve. This illustrates how veto players can form a bilateral "club" that excludes others. The agenda setter's power is reduced to picking the least-bad option from someone else's Pareto frontier.

### Part E: Three Veto Players Create the Pareto Set

**All three blocs have veto power**

#### [DRAW] Part E1: The Pareto Set

**[Create diagram showing triangular Pareto set]**

**Instructions:**

- Draw all three acceptance circles through SQ

- Shade only the area where ALL THREE overlap

- This small triangular region is the Pareto set

#### [DO] Part E2: Extreme Constraint

**Answers:**

- **Approximate area of the Pareto set:** Very small, perhaps 50-100 square units (compared to 10,000 total)

- **Can any bloc achieve its ideal point?** No

- **Approximate center of the Pareto set:** Around (38,42)

- **Distance from SQ to this center:** √[(38-40)² + (42-40)²] ≈ 2.8 units

**[Explanation]:** With three veto players, the feasible set shrinks dramatically. Policy can barely move from the status quo.

#### [WRITE] Part E3: Institutional Paralysis

**Model Answer:** Giving everyone veto power creates extreme status quo bias because the only feasible moves are those that literally make all parties better off—the Pareto set. This tiny set means policy is essentially frozen near the status quo. This might be desirable for constitutional rules where broad consensus should be required and frequent change is dangerous. However, it's problematic for routine policy where circumstances change and adaptation is necessary. The initial status quo becomes permanent by default, even when large majorities would prefer change. This is why constitutional systems rarely give everyone veto power—the founders knew too many veto players creates paralysis.

**Key Insight:** Veto players geometrically shrink the feasible set. One veto player creates moderate constraint; three create near-paralysis.

### Part F: The Heresthetic Reframing

#### [DRAW] Part F1: The One-Dimensional Version

**[Create line from €0-€100 with positions marked]**

- Environmental: €75

- Tech: €30

- Skeptic: €25

- SQ: €40

- Median: **Tech at €30**

Wait, let me recount: Skeptic €25, Tech €30, Environmental €75. With three voters, the median is the middle value = **Tech at €30**.

Actually, checking the original problem setup for 1D: This should have the same actors but projected onto one dimension (renewables only).

#### [DO] Part F2: Tech Bloc's Problem in 1D

**Answers:**

- **Median voter:** Tech at €30

- **With pure majority rule, equilibrium:** €30 (median wins)

- **Can Tech get majority support to move from SQ=€40 toward €30?** Yes

- **Who would support?** Tech + Skeptic (both prefer €30 to €40)

- **Best outcome Tech can achieve as agenda setter:** €30 (their ideal!)

- **Distance from Tech's ideal:** €0

**[Explanation]:** In 1D, Tech is the median voter, so they win completely. They can propose €30 and get majority support (Tech + Skeptic).

#### [READ] Part F3: The Heresthetic Move

[Text provided in problem]

#### [DO] Part F4: Comparing Tech Bloc's Position

**Note to students:** The exact optimal outcomes in 2D without veto players require complex geometric analysis that's beyond what we expect you to calculate precisely. Your diagram will show the relationships visually. The key conceptual point is understanding how adding dimensions changes Tech's strategic position.

| **Scenario** | **Tech Bloc as Agenda Setter Gets** | **Distance from Tech's Ideal** |
| --- | --- | --- |
| 1D voting (renewables only) | €30 (median wins) | €0 (perfect outcome) |
| 2D voting (both dimensions) with no veto players | Can build coalitions with either Environmental or Skeptic by proposing packages that appeal to one or the other | Depends on which coalition—use your diagram to estimate |
| 2D with Environmental veto | Limited to points on Environmental's acceptance circle | Use your diagram to find closest point on circle to (30,60) |

**Analysis approach:**

- In 1D, Tech is median and gets ideal outcome

- In 2D, Tech loses median status but gains coalition-building flexibility

- With your diagram, you can visually identify which scenario gives Tech better outcomes

- The strategic insight: dimensionality can help or hurt depending on whether it breaks winning coalitions or creates new ones

#### [WRITE] Part F5: The Power of Dimensionality

**Model Answer:** In one dimension, Tech was the median voter and achieved their ideal outcome (€30 on renewables). However, this ignored Tech's preference for high carbon capture funding. By successfully reframing the debate as two-dimensional, Tech sacrificed their median position on the renewables dimension but gained the ability to form coalitions around their preferred balance of both programs. In 2D, Tech can propose packages like (35,52) that give Environmental some renewables and Tech some carbon capture, creating coalitions that wouldn't exist if only renewables were discussed. This illustrates Riker's concept of "heresthetic"—the art of political manipulation through dimensional strategy. Political entrepreneurs link issues to break apart winning coalitions or create new ones. Voters should resist issue linkage when it bundles unrelated concerns to force false trade-offs (like pairing immigration with tax policy), but sometimes multiple dimensions genuinely are connected (like renewables and carbon capture in climate policy).

**Key Insight:** Adding dimensions can help or hurt you depending on whether it breaks your winning coalition or creates new coalition possibilities. Strategic politicians manipulate dimensionality.

### Part G: Synthesis and Reflection

### Part G: Synthesis and Reflection

#### [WRITE] Part G1: Institutional Design

**Model Answer:** Pure majority rule in 2D creates chaos but maximizes democratic responsiveness—any majority coalition can change policy. One veto player dramatically constrains outcomes but still allows the agenda setter meaningful choice within the acceptable set, balancing stability with some adaptability. Two veto players shrink the feasible set to a contract curve, essentially requiring bilateral bargaining that excludes third parties—this creates high stability but potential unfairness to non-veto players. Three veto players create near-paralysis, freezing policy at the status quo with only tiny Pareto improvements possible.

For the Climate Council, I would recommend **one veto player** (perhaps the Environmental bloc as representing existential concerns) with **qualified majority voting** (needing 7 of 9 votes to override). This balances stability and change: routine decisions can pass with supermajorities, but one bloc can prevent extreme departures from climate science. I'm prioritizing avoiding catastrophic environmental outcomes over maximizing democratic responsiveness, while still preventing complete gridlock.

**Key Insight from Part G:** Institutional design requires explicit choices about trade-offs. Pure majority rule creates responsiveness but chaos; multiple veto players create stability but paralysis. The "right" design depends on context and values—what works for constitutional amendments differs from what works for routine legislation.

#### [WRITE] Part G2: Riker's Heresthetic

**Model Answer:** William Riker argued that political success comes not just from having popular positions but from structuring the choice situation itself. Environmental Bloc's dimensional manipulation perfectly illustrates this—they transformed a losing position (stuck at unfavorable SQ in 1D despite being agenda setter) into a winning one (creating coalitions in 2D around balanced packages). Other examples include: linking civil rights to states' rights to break apart coalitions; framing abortion as "choice" versus "life" to emphasize different dimensions; combining tax cuts with military spending to unite economic and security conservatives. Successful politicians are "herestheticians" who redesign the game rather than just playing it better. The key is that Environmental was the only actor who benefited—Tech was winning in 1D as median voter.

### Question 6: Strategy and Institutional Constraints

**Setup:** Legislature with median M, committee proposes policy on [0,1] scale, status quo at SQ.

#### [DO] Part A: Closed Rule Equilibrium

**[CREATE DIAGRAM showing relationship between committee ideal point and outcome]**

**Closed rule:** Legislature votes yes/no on committee proposal; no amendments allowed.

**Analysis:**

- If Committee ideal point C < SQ: Committee proposes point exactly at SQ (cannot improve)

- If C is between SQ and M: Committee proposes C (median accepts anything between SQ and M)

- If C > M: Committee proposes point where M is indifferent between it and SQ

- This is at SQ + 2(M - SQ) = 2M - SQ

**Equilibrium line:**

- For C ∈ [0, SQ]: outcome = SQ

- For C ∈ [SQ, M]: outcome = C

- For C ∈ [M, 1]: outcome = 2M - SQ

This creates a "kinked" line: flat at SQ, then diagonal at 45°, then flat again.

#### [DO] Part B: Open Rule Equilibrium

**[CREATE SEPARATE DIAGRAM]**

**Open rule:** Amendments allowed; floor median can modify proposal.

**Analysis:**

- **Any committee proposal gets amended to M**

- Outcome is always M regardless of committee ideal point

**Equilibrium line:**

- Horizontal line at M for all C ∈ [0,1]

#### [DO] Part C: Zero-Based Budgeting (ZB = 0)

**[ADD DASHED LINES to previous diagrams]**

**Closed rule with ZB = 0:**

- If C < M: Committee proposes C, median prefers C to 0, passes → outcome = C

- If C > M: Committee proposes 2M (making median indifferent to 0), could pass → outcome = 2M

- For C ∈ [0, M]: outcome = C

- For C ∈ [M, 1]: outcome = 2M

**Open rule with ZB = 0:**

- Still converges to M (median can amend)

- Outcome = M for all C

#### [WRITE] Part D: Impact of Zero-Based Budgeting

**Model Answer:**

**Under closed rule:** Zero-based budgeting moves equilibrium outcomes **away** from the legislature's median on average. When ZB=0 instead of SQ, committees with C > M can propose higher spending (2M instead of 2M - SQ), knowing the median must accept or get zero. This gives committees more power. The further SQ was from 0, the more power committees lose by moving to ZB=0.

**Under open rule:** Zero-based budgeting has **no effect**—outcomes remain at M regardless. The median voter dominates completely under open rule, so the default reversion point is irrelevant.

**Key lesson:** The power of procedural rules (closed vs. open) dominates the power of reversion points. Closed rules empower committees; open rules empower the floor median. This is why committees fight to maintain closed rules for their bills.

## Part IV: Information, Manipulation, and Strategic Voting (60 minutes)

### Question 7: The Information Content of Voting Systems

**Given preferences:**

| **Faculty** | **1st** | **2nd** | **3rd** | **4th** | **5th** |
| --- | --- | --- | --- | --- | --- |
| 3 members | Theory | Methods | Policy | Applied | Critical |
| 2 members | Methods | Applied | Theory | Policy | Critical |
| 2 members | Policy | Critical | Applied | Methods | Theory |
| 1 member | Applied | Methods | Policy | Theory | Critical |
| 1 member | Critical | Policy | Theory | Applied | Methods |

#### [DO] Part A: Different Voting Rules, Different Winners

| **Voting System** | **Information Used** | **Winner** | **Information Discarded** |
| --- | --- | --- | --- |
| Plurality (first choice only) | Only 1st preferences | **Theory** (3 votes) | All preference intensity and rankings below first |
| Runoff (top 2 from plurality) | 1st preferences, then head-to-head | **Methods** (Theory 3, Methods 2, Policy 2, Applied 1, Critical 1 → runoff Theory vs. Methods → Methods wins 5-4) | Middle rankings that could reveal compromises |
| Borda Count (5 pts for 1st, 4 for 2nd...) | Full ranking information | **Theory** (3×5 + 2×3 + 2×1 + 1×2 + 1×3 = 15+6+2+2+3 = 28 pts) | Nothing—uses all information |
| Approval (vote for all acceptable) | Broad acceptability | **Depends on cutoff** (assume top 2: Theory 3, Methods 5, Policy 3, Applied 3, Critical 3 → **Methods**) | Preference intensity among approved options |

**Borda Count calculation:**

Let me carefully track each option through all five groups:

**Theory points:**

- Group 1 (3 faculty): Theory 1st = 3 × 5 = 15

- Group 2 (2 faculty): Theory 3rd = 2 × 3 = 6

- Group 3 (2 faculty): Theory 5th = 2 × 1 = 2

- Group 4 (1 faculty): Theory 4th = 1 × 2 = 2

- Group 5 (1 faculty): Theory 3rd = 1 × 3 = 3

- **Total: 28 points**

**Methods points:**

- Group 1 (3 faculty): Methods 2nd = 3 × 4 = 12

- Group 2 (2 faculty): Methods 1st = 2 × 5 = 10

- Group 3 (2 faculty): Methods 4th = 2 × 2 = 4

- Group 4 (1 faculty): Methods 2nd = 1 × 4 = 4

- Group 5 (1 faculty): Methods 5th = 1 × 1 = 1

- **Total: 31 points**

**Policy points:**

- Group 1 (3 faculty): Policy 3rd = 3 × 3 = 9

- Group 2 (2 faculty): Policy 4th = 2 × 2 = 4

- Group 3 (2 faculty): Policy 1st = 2 × 5 = 10

- Group 4 (1 faculty): Policy 3rd = 1 × 3 = 3

- Group 5 (1 faculty): Policy 2nd = 1 × 4 = 4

- **Total: 30 points**

**Applied points:**

- Group 1 (3 faculty): Applied 4th = 3 × 2 = 6

- Group 2 (2 faculty): Applied 2nd = 2 × 4 = 8

- Group 3 (2 faculty): Applied 3rd = 2 × 3 = 6

- Group 4 (1 faculty): Applied 1st = 1 × 5 = 5

- Group 5 (1 faculty): Applied 4th = 1 × 2 = 2

- **Total: 27 points**

**Critical points:**

- Group 1 (3 faculty): Critical 5th = 3 × 1 = 3

- Group 2 (2 faculty): Critical 5th = 2 × 1 = 2

- Group 3 (2 faculty): Critical 2nd = 2 × 4 = 8

- Group 4 (1 faculty): Critical 5th = 1 × 1 = 1

- Group 5 (1 faculty): Critical 1st = 1 × 5 = 5

- **Total: 19 points**

**Winner under Borda: Methods with 31 points**

#### [WRITE] Part B: No "True" Social Preference

**Model Answer:** Each voting system produces a different winner from identical preferences because voting systems don't "reveal" a pre-existing social preference—they construct one through different aggregation rules. Plurality ignores all information except first choices, making Theory win despite being many people's last choice. Borda Count considers full rankings, making Methods win as a broadly acceptable compromise. There is no "true" will of the majority to discover; instead, voting systems create outcomes by selectively using or discarding information about preferences. This is deeply troubling for democratic theory, which assumes democracy reveals popular will rather than manufacturing it through procedural choices.

**Key Insight:** Voting systems don't "find" the winner—they make the winner through their information aggregation rules. Each system uses or discards different information about preferences, constructing different outcomes from identical underlying preferences. There is no "true" social preference waiting to be discovered; voting systems create social preferences through their rules.

### Question 8: Strategic Misrepresentation

**Original Borda scores (from Q7):** Methods wins with 30 points, Theory has 28 points

#### [DO] Part A: Strategic Voting

**If 3 Theory supporters vote strategically (Theory ****>**** Policy ****>**** Applied ****>**** Critical ****>**** Methods):**

**New Methods score:**

- 0 faculty rank it 1st (down from 2): 0

- 3 faculty rank it 2nd (the Theory supporters originally): now 0 (they moved Methods to 5th)

- 2 faculty rank it 4th: 2 × 2 = 4

- 1 faculty ranks it 2nd: 1 × 4 = 4

- 1 faculty ranks it 0: 0

- Original: 30 points

- **New: Lost 12 points (from Theory supporters ranking it 2nd) = 18 points**

**New Theory score:** Still 28 points (Theory supporters didn't change Theory's ranking)

**New winner: Theory with 28 points**

**Scores:**

- Theory: **28**

- Methods: **18**

- Policy: Now gets extra points from Theory supporters ranking it 2nd

- Others: Adjust accordingly

**[Explanation]:** By strategically ranking Methods (their main competitor) last instead of honestly ranking it second, the Theory supporters successfully changed the outcome. This demonstrates that Borda Count is manipulable—honest voting is not always optimal.

#### [WRITE] Part B: The Gibbard-Satterthwaite Theorem [OPTIONAL]

**Model Answer:** The Gibbard-Satterthwaite Theorem states that any voting system that isn't dictatorial can be manipulated through strategic misrepresentation—there exist preference profiles where some voter benefits by voting dishonestly. We just demonstrated this with Borda Count: Theory supporters gained by ranking Methods last rather than honestly second. This creates a troubling dilemma: either we accept dictatorship (one person always decides), or we accept that voters might strategically misrepresent preferences, undermining the information aggregation purpose of voting. When stakes are high and voters sophisticated (legislatures), strategic manipulation is pervasive and destroys information. When voters are numerous and less informed (general elections), cycling might be more concerning since manipulation requires coordination. Neither problem can be eliminated—we can only choose which disease we prefer.

**Key Insight:** Like Arrow's Theorem for social preferences, Gibbard-Satterthwaite shows perfect voting mechanisms are impossible. Every non-dictatorial system is manipulable.

### Question 8.5: The Impossible Search for Legislative Intent

**Setup:** 412-235 vote for Digital Markets Regulation with ambiguous "fair data access" language

**Coalition breakdown:**

- 150 MEPs want strict mandates (A)

- 130 MEPs want moderate oversight (B)

- 132 MEPs want voluntary guidelines (C)

- 235 MEPs voted NO (prefer no regulation)

**Preference orderings (as specified in updated Q7.5):**

- Group A: A > ambiguous bill > no regulation > B > C

- Group B: B > ambiguous bill > no regulation > C > A

- Group C: C > ambiguous bill > no regulation > A > B

- No-reg group: no regulation > any form of regulation

#### [DO] Part A: Finding "The" Intent

**Answers:**

- **Which interpretation has most supporters among majority?** A with 150 votes

- **Do any have majority support in Parliament (****>****324)?** No (150, 130, 132 all below 324)

- **Pairwise votes within majority coalition:**

- A vs B: A wins 150-130 (Group C prefers no reg to both, but between A and B prefers... according to their ordering C > ambiguous > no reg > A > B, so they prefer B > A). Actually: Groups A+C prefer A>B (150+132=282), Group B prefers B (130). **A wins 282-130**

- B vs C: Group A prefers B>C (ranks B>C), Group B obviously prefers B, Group C prefers C. **B wins 280-132** (Groups A+B vs C)

- C vs A: Group C prefers C, Group B prefers C>A, Group A prefers A. **C wins 262-150** (Groups B+C vs A)

Wait, let me reconsider based on the stated preference orders:

- Group A: A > ambiguous > no reg > **B ****>**** C**

- Group B: B > ambiguous > no reg > **C ****>**** A**

- Group C: C > ambiguous > no reg > **A ****>**** B**

**Pairwise among A, B, C:**

- A vs B: Group A prefers A, Group B prefers B, Group C prefers A>B → A wins 282-130

- B vs C: Group A prefers B>C, Group B prefers B, Group C prefers C → B wins 280-132

- C vs A: Group A prefers A, Group B prefers C>A, Group C prefers C → C wins 262-150

**Result: Cycle! A****>****B****>****C****>****A**

- **Is there a clear majority preference?** **No—there's a cycle**

- **Then why didn't any interpretation pass?** Because each loses to another in pairwise votes, AND each would lose to "no regulation" when combined with the 235 NO voters

#### [WRITE] Part B: The Incoherence Problem

**Model Answer:** Even though interpretation A has plurality support within the coalition, it couldn't pass because it loses to C in pairwise votes (when C's supporters and B's supporters both prefer C to A). There is no coherent "legislative intent" because the majority coalition formed for contradictory reasons—each group voted YES hoping for their incompatible interpretation. Asking for "the intent of the legislature" is like asking "the favorite color of the committee"—there is no collective agent with intentions, only individuals with conflicting goals who temporarily aligned to pass ambiguous language. The collective "preferred" interpretation cycles: A>B>C>A. Arrow's Theorem tells us this intransitivity is inevitable when aggregating diverse preferences, so there may literally be no discoverable legislative intent.

**Key Insight:** Legislative intent is often a legal fiction. Coalitions frequently form around ambiguity precisely because clarity would prevent passage.

#### [DO] Part C: Strategic Ambiguity

**Understanding the setup:** Remember, the 412 YES votes came from three groups who each wanted DIFFERENT things:

- 150 MEPs want strict mandates (A)

- 130 MEPs want moderate oversight (B)

- 132 MEPs want voluntary guidelines (C)

They all voted YES for the ambiguous bill because each hoped it would be interpreted their way later. The 235 NO voters prefer no regulation to any form of regulation.

**Key insight:** Now we logically determine what happens if the bill had specified ONE interpretation clearly from the start.

**The preference orderings (from updated Q7.5):**

- Group A: A > ambiguous > no reg > B > C (they prefer B to C, but prefer no regulation to either B or C)

- Group B: B > ambiguous > no reg > C > A (they prefer C to A, but prefer no regulation to either C or A)

- Group C: C > ambiguous > no reg > A > B (they prefer A to B, but prefer no regulation to either A or B)

**This means:** Each group views the other two interpretations as WORSE than having no regulation at all. This is crucial for understanding why explicit language fails.

| **Specified Interpretation** | **Who Votes YES** | **Who Votes NO** | **Total YES** | **Total NO** | **Result** |
| --- | --- | --- | --- | --- | --- |
| Interpretation A (strict) | Group A only (150) | Groups B (130) + C (132) + No-reg (235) = 497 | 150 | 497 | **Fails** |
| Interpretation B (moderate) | Group B only (130) | Groups A (150) + C (132) + No-reg (235) = 517 | 130 | 517 | **Fails** |
| Interpretation C (voluntary) | Group C only (132) | Groups A (150) + B (130) + No-reg (235) = 515 | 132 | 515 | **Fails** |
| Ambiguous language | Groups A + B + C (412) | No-reg (235) | 412 | 235 | **Passes** |

**Why each explicit version fails:**

- **Interpretation A:** Groups B and C would rather have NO regulation than strict mandates (they see A as worse than status quo)

- **Interpretation B:** Groups A and C would rather have NO regulation than moderate oversight

- **Interpretation C:** Groups A and B would rather have NO regulation than voluntary guidelines

**The paradox:** Every specific interpretation is opposed by a majority (497, 517, or 515 out of 647 total), but the ambiguous version passes 412-235. Only vagueness enables passage.

#### [WRITE] Part D: The Ambiguity Necessity

**Model Answer:** Ambiguous language was the ONLY way to pass ANY regulation because each group viewed the others' preferred interpretations as worse than no regulation at all. Clear language would have caused two groups to defect, ensuring failure. This teaches us that legislative clarity and legislative success are often incompatible—many laws pass precisely because they're vague enough for opposing sides to claim victory. Ambiguity isn't a failure of drafting; it's often a necessary condition for coalition formation in polarized environments.

#### [DO] Part E: The Judge's Dilemma

- **Legislative History:** Look at what sponsors said

- Result: **Contradictory statements from different sponsors**

- Problem: **No single intent exists**

- **Majority Intent:** Find what most YES voters wanted

- Result: **A has plurality (150) but creates cycle**

- Problem: **Still no consensus, and cycles mean no coherent majority preference**

- **Median Position:** Choose the middle interpretation

- Result: **B (moderate oversight)**

- Problem: **B never had majority support and was everyone's compromise-at-best**

- **Plain Meaning:** Interpret words without considering intent

- Result: **Whatever judge thinks ****"****fair data access****"**** means**

- Problem: **Purely subjective; no constraint on judicial discretion**

- **Policy Judgment:** Choose what judge thinks best serves law's purpose

- Result: **Judge's preferred interpretation**

- Problem: **Undemocratic; judge substitutes their judgment for legislators'**

#### [WRITE] Part F: Implications for Judicial Interpretation

**Model Answer:** Given that "legislative intent" may not meaningfully exist when there are cycles or strategic ambiguity, judges face an impossible task: they must pretend to "find" intent that never existed. I believe judges should adopt a "transparent fiction" approach: publicly acknowledge that ambiguous statutes require judicial policy-making while maintaining institutional legitimacy through clear reasoning and deference to democratic values. Specifically: (1) judges should admit when legislative history reveals strategic ambiguity rather than unclear drafting; (2) use clear default rules (like lenity in criminal law or deference to agencies in regulation) that create predictability; (3) transparently explain their interpretive choice as a policy judgment constrained by statutory text and purpose; (4) when cycles exist, choose the Condorcet winner if one exists, or the interpretation closest to the median if not. The "noble lie" that judges merely discover intent has become unsustainable and breeds cynicism. However, judges shouldn't refuse to interpret—governance requires some decision. Transparency about interpretive constraints better serves legitimacy than maintaining pleasant fictions.

**Key Insight:** Judicial interpretation often isn't finding intent but making policy choices among options the legislature couldn't resolve. Honesty about this would improve democratic accountability.

## Part V: Integration - Building and Breaking Democratic Institutions (90 minutes)

### Question 9: The Continental Federation Assembly [OPTIONAL - ADVANCED]

**Note to Students:** This question is optional and involves significant conceptual complexity. The problem setup contains an inherent tension that makes it challenging to work through cleanly. We include it here with full explanation of the complications so you can understand both the intended learning and why multidimensional voting problems become difficult to model precisely.

**The Conceptual Complication:**

The problem describes Balancers as having "medium all" preferences but also ranks them as "E > S > C". This creates tension between two interpretations:

- **Spatial interpretation:** "Medium all" suggests their ideal point is at moderate levels on all three dimensions—perhaps (S=50, E=50, C=50) if we imagine a 0-100 scale. They want balance.

- **Ordinal interpretation:** "E > S > C" suggests when forced to prioritize, they value Economic Development most, Security second, Climate third.

**These aren't necessarily contradictory, but they require careful handling:**

- A Balancer might have an ideal point at (S=50, E=50, C=50) in policy space

- But when comparing two packages that differ on only one dimension, they use their E > S > C ranking

- When comparing packages that differ on multiple dimensions, they calculate Euclidean distance from their ideal point

**Why this matters:** Constructing cycles in 3D space with 5 groups requires either:

- Precise ideal points for all groups (e.g., Hawks at (S=90, E=60, C=20))

- OR simplified ordinal rankings

The problem tries to do both, creating ambiguity.

**How to approach this problem if you choose to do it:**

Think of groups as having two characteristics:

- **Location in 3D policy space** (their ideal point)

- **Priority weights** when trading off dimensions

For Balancers: ideal point is centrist, but they weight E > S > C when evaluating trade-offs from that center.

#### [DO] Part A: Predict Instability

**Setup:** 25 nations, five groups of 5 each:

- Hawks: High S, Low E, Low C preference (S > E > C ranking)

- Developers: Low S, High E, Low C preference (E > C > S ranking)

- Greens: Low S, Low E, High C preference (C > S > E ranking)

- Balancers: Medium S, Medium E, Medium C preference (E > S > C ranking when prioritizing)

- Populists: High S, High E, Low C preference (S > E > C ranking)

**Instructions:** With five groups and three dimensions (Security, Economic Development, Climate Action), cycles are almost certain to exist. To demonstrate a cycle, you need to carefully construct three specific policy packages and show:

- Package A beats Package B (identify which groups form the majority coalition)

- Package B beats Package C (identify the coalition)

- Package C beats Package A (identify the coalition)

**Example approach:**

- Package A: High S, High E, Low C (appeals to Hawks and Populists who both prioritize S and E)

- Package B: Low S, High E, High C (appeals to Developers and Greens who both want low S and value E or C)

- Package C: Medium S, Medium E, High C (appeals to Greens and Balancers)

**You need to verify each pairwise comparison by checking which 3 out of 5 groups (= 13-15 nations out of 25) prefer each package.** The specific packages that create a cycle will depend on how you define "High," "Medium," and "Low" on each dimension and how you calculate which groups prefer which packages.

**Model answer structure:**

- **Package [your choice] beats Package [your choice]** with support from [list groups] (13-15 votes out of 25)

- Explanation: Group X prefers Package A to Package B because [closer to their ideal / higher on their priority dimension]

- **Package [your choice] beats Package [your choice]** with support from [list groups]

- Explanation: Group Y prefers Package B to Package C because [reason]

- **Package [your choice] beats Package [your choice]** with support from [list groups]

- Explanation: Group Z prefers Package C to Package A because [reason]

- This demonstrates a cycle in social preferences

**Key learning point:** With multiple groups and multiple dimensions, intransitive social preferences (cycles) are nearly inevitable without institutional constraints. The exact cycle you construct matters less than understanding that such cycles exist and depend on the strategic framing of alternatives.

#### [DESIGN] Part B: Your Institution

**Model answers will vary. Example:**

**Voting rule:** Qualified majority (60% = 15 of 25 nations) **Who sets agenda:** Rotating chairmanship among groups **Who has veto:** Security Council of 3 nations (one from each region) can veto major changes **Other constraints:** Annual budget must be approved; line-item amendments allowed but limited to 10% changes

#### [DRAW] Part C: Model Your Institution

**[Students create spatial model showing their institutional design]**

**Note:** Given the complexity of 3D space with 5 groups, you may simplify by projecting onto two dimensions or showing stylized relationships rather than precise spatial positions.

#### [WRITE] Part D: Justify Your Design

**Model Answer:** My institution prioritizes stability and minority protection over pure majoritarianism. The qualified majority (60%) requirement ensures broad consensus for major decisions while preventing paralysis. The rotating agenda-setting prevents any group from permanently controlling outcomes. The Security Council veto protects against extreme swings but is limited to major changes, allowing routine adaptation. I'm sacrificing pure democratic responsiveness (simple majorities could act faster) for institutional stability and minority protection. Hawks and Greens will lose under this system when their preferences are extreme—the system biases toward moderate compromises that Developers and Balancers prefer. This is acceptable because climate and security decisions require broad buy-in for implementation, and extreme swings in either direction could be catastrophic.

**Key Insight:** Institutional design is unavoidably about choosing winners and losers, not finding neutral procedures. Every structural choice—voting rules, agenda control, veto points—advantages some actors and disadvantages others. The question isn't finding the "right" system but being honest about which values we're prioritizing and who benefits under our chosen institutions. In multidimensional spaces with diverse actors, some form of institutional constraint is necessary to prevent chaos, but those constraints inevitably favor certain outcomes over others.

### Question 10: The Downsian Insight

**Setup:** Two parties, voters distributed normally with mean 50 on [0,100]

#### [DRAW] Part A: Convergence

**[CREATE DIAGRAM showing normal distribution with both parties at position 50]**

**Explanation:** Both parties position themselves at the median (50) to maximize votes. If Party A is at 50 and Party B moves to 51, Party B loses all voters from 0-50.5 (who now prefer A) to gain voters from 50-51 (who now prefer B). Since there are more voters on the left side of 51, Party B loses votes by moving right. Similar logic applies to moving left. Both parties converge to the median voter's position.

#### [DO] Part B: Breaking Convergence

| **Modification** | **New Party Positions** | **Why** |
| --- | --- | --- |
| Voters distributed bimodally (peaks at 30 and 70) | **Party A: 30, Party B: 70** | Each party locates at a peak to capture its modal group; center is empty |
| Parties need member approval (members more extreme) | **Divergence: A left of 50, B right of 50** | Internal constraint prevents median convergence; parties balance member preferences with vote-getting |
| Third party enters at position 50 | **A and B diverge left and right** | Avoid being "outflanked"—competing for same center voters while third party is there leads to vote-splitting; differentiate to capture wings |
| Voters uncertain about party positions | **Less convergence, more differentiation** | Parties can't precisely locate median; differentiation helps voters identify parties and increases turnout from base |

#### [WRITE] Part C: Real Politics

**Model Answer:** Parties don't converge to the center in real democracies because Downs's model assumptions are violated. Not all voters actually vote—turnout depends on mobilization, so parties must energize their base, not just attract median voters. Voters have imperfect information about party positions, so differentiation helps with identification. Primary elections force parties to satisfy extreme activists before general elections. Multiple dimensions of competition (economic, social, foreign policy) mean there's no single "center" to converge toward. Most fundamentally, parties are coalitions with internal politics—party members and activists prevent leaders from purely vote-maximizing. The model's brilliant insight (median convergence) relies on unrealistic assumptions, teaching us that abstraction reveals mechanisms but can't predict specific outcomes without incorporating real-world complexity.

**Key Insight:** The median voter theorem shows the logic of convergence under specific assumptions (1D policy space, single-peaked preferences, full turnout, perfect information, no primaries). Understanding why reality diverges from this prediction teaches us which assumptions matter most. Real-world deviations from convergence reveal which model assumptions are systematically violated—particularly multidimensionality, differential turnout, and party organization constraints.

## Part VI: Synthesis - The Tragic Beauty of Democracy (30 minutes)

### Question 11: Letter to a Disillusioned Voter

**Model Answer (400 words):**

I understand your frustration after learning about Arrow's Theorem and McKelvey's Chaos—they're genuinely disturbing results that shatter naive faith in democracy. You're right that there's no simple "will of the people" waiting to be discovered, and yes, agenda setters have enormous power. But these impossibility results don't make democracy worthless; they make it more impressive that it works at all.

Here's what social choice theory actually teaches: Perfect democracy is mathematically impossible, but imperfect democracy is still our best option. Arrow showed we can't simultaneously achieve all desirable properties, so institutional design is about choosing which trade-offs we can live with. Different contexts demand different trade-offs—constitutional amendments rightly require supermajorities even though this creates gridlock, while routine legislation needs simpler procedures.

Real democracies manage these problems through institutions that are explicitly anti-democratic in some ways. Agenda-setting power is concentrated in committees not because we're naive about their manipulation potential, but because structured procedures prevent the chaos that pure majority rule would create. Veto points (Senate, presidential veto, judicial review) slow change and create status quo bias—but this stability might be more important than pure majority rule. The US Constitution's "checks and balances" are really checks on pure democracy, and that's arguably a feature, not a bug.

The question isn't whether democracy is perfect (it isn't) but whether it's better than alternatives. Autocracies avoid cycling and

agenda manipulation by simply giving power to one person, but at what cost? Democracy's messy, manipulable processes at least diffuse power and allow peaceful transitions. The "impossible" aspects you learned about explain why politics is contentious and outcomes often seem arbitrary—but they also explain why dictatorships claiming perfect social harmony are lying.

So should you vote? Yes, but with appropriate humility. Your vote joins millions in an imperfect aggregation mechanism that constructs outcomes rather than revealing truth. The process matters as much as the results—democratic participation isn't just about winning but about legitimating collective decisions through inclusive processes. Understanding democracy's impossibilities makes you a better citizen, not a disillusioned one, because you'll demand honest institutional design rather than false promises of perfect representation.

Democracy is tragically beautiful precisely because it's impossible yet essential.

### Question 12: Reflection - Your Takeaway

#### [WRITE] Part A: One Key Insight

**Model Answer:** The single most important thing I learned is that institutional design is never neutral—every voting rule, every procedural constraint, every structural choice advantages some actors and disadvantages others. The question isn't finding the "right" system but being honest about which values we're prioritizing and who wins or loses under our chosen institutions.

#### [WRITE] Part B: One Remaining Question

**Model Answer:** I'm still puzzling over when democratic outcomes are "legitimate" given that they're procedurally constructed rather than discovered. If changing the voting rule changes the winner, and all rules are defensible, what makes one outcome more legitimate than another? Is legitimacy purely about procedural consistency, or does substantive justice matter even if it contradicts procedural outcomes?

## Appendix: Quick Reference

### Arrow's Conditions

- **Rationality:** All individuals have complete, transitive preferences

- **U (Universal Domain):** The voting system must work for ANY possible combination of individual preferences

- **P (Pareto):** If everyone prefers X to Y, society should prefer X to Y

- **D (Non-Dictatorship):** No single person determines society's choice

- **I (Independence):** Society's preference between X and Y depends only on individuals' preferences between X and Y

- **T (Transitivity):** If society prefers X to Y and Y to Z, it must prefer X to Z

**Arrow's Impossibility Theorem:** No voting system can simultaneously satisfy all six conditions. We must sacrifice at least one.

### Spatial Voting Concepts

- **Ideal point:** Most preferred position in policy space

- **Indifference curve:** Points yielding equal utility (circles in Euclidean preference, other shapes possible)

- **Winset:** All points that beat status quo in majority vote

- **Core:** Point(s) with empty winset (stable equilibrium)

- **Median voter:** Decides outcome in 1D with single-peaked preferences

- **Contract curve:** Set of Pareto efficient points between two actors

- **Pareto set:** Points that beat status quo and are approved by all veto players

### Institutional Roles

- **Agenda setter:** Controls what gets voted on (can exploit cycles, constrained by veto players)

- **Veto player:** Can block changes from status quo (creates stability and status quo bias)

- **Gate keeper:** Decides whether proposals reach floor (similar to agenda setter but binary choice)

### Key Theorems

- **Arrow's Impossibility Theorem:** No perfect voting system exists

- **Black's Median Voter Theorem:** In 1D with single-peaked preferences, median ideal point wins

- **McKelvey's Chaos Theorem:** In multidimensional voting without restrictions, agenda setters can reach almost any point through cycling

- **Gibbard-Satterthwaite Theorem:** No non-dictatorial voting system is strategy-proof

### Common Student Errors to Avoid

- **Thinking cycles mean voters are irrational:** Individuals can have perfectly rational preferences; irrationality emerges at collective level

- **Believing there's a ****"****true****"**** social preference to discover:** Voting systems construct outcomes through aggregation rules, not reveal pre-existing preferences

- **Assuming fairness and stability are compatible:** Arrow shows we must trade off fairness for consistency or vice versa

- **Thinking veto players always create gridlock:** They create stability; whether that's "gridlock" depends on whether you want change

- **Believing institutional design is neutral:** Every rule advantages some actors; the question is being honest about trade-offs

- **Assuming democracy should produce ****"****optimal****"**** outcomes:** Democracy's value may lie in process legitimacy, not outcome optimality

### Connections to Other Course Concepts

**From PS1 (Rational Choice):**

- Voting systems aggregate individual preferences (which we modeled with expected utility)

- Strategic voting requires calculating expected outcomes under different ballot choices

- Information problems appear in voting (voters don't know others' preferences)

**From PS3 (Constitutional Games):**

- Voting institutions are coordination devices like constitutions

- Agenda-setting power is similar to procedural power in constitutional design

- Veto players in voting parallel veto players in delegation structures

**Looking ahead:**

- Legislative organization uses these spatial models to understand committee power

- Electoral systems apply these insights to party competition

- International institutions face Arrow's problems when aggregating state preferences

## Final Synthesis: What This Problem Set Teaches

### The Central Paradox

Democracy promises to aggregate individual preferences into collective choices, but social choice theory proves this is mathematically impossible to do perfectly. Arrow's Theorem, McKelvey's Chaos, and Gibbard-Satterthwaite collectively show that:

- No voting system satisfies all reasonable fairness criteria

- Multidimensional voting without constraints produces chaos

- All non-dictatorial systems are strategically manipulable

Yet democracies function reasonably well. How?

### The Resolution: Institutions as Imperfect Solutions

Real democracies manage impossibility through institutional constraints that are explicitly anti-democratic in some ways:

- **Agenda control** prevents chaos but empowers gatekeepers

- **Veto points** create stability but introduce status quo bias

- **Procedural rules** provide predictability but enable manipulation

- **Dimensionality reduction** (forcing complex issues onto few dimensions) enables median voter logic but oversimplifies

These institutions don't "solve" Arrow's problem—they choose which impossibility to accept. Constitutional systems accept intransitivity to avoid dictatorship. Legislative procedures accept agenda-setter power to avoid cycling. Electoral systems accept independence violations to use full preference information.

### The Normative Implications

This problem set should change how you think about democratic legitimacy:

**What democracy is NOT:**

- A mechanism for discovering pre-existing "popular will"

- A way to achieve "optimal" policy outcomes

- A system that treats everyone's preferences equally in all respects

- A process that produces "correct" answers

**What democracy IS:**

- A mechanism for peacefully resolving conflicts through structured processes

- A way to diffuse power and enable accountability

- A system that makes trade-offs between fairness and coherence explicit

- A process whose legitimacy comes from inclusion and contestation, not outcome optimality

### The Analytical Skill You've Developed

By working through this problem set, you've learned to:

- **Recognize cycles** in preference aggregation

- **Model spatial competition** in one and two dimensions

- **Analyze institutional constraints** on voting outcomes

- **Understand strategic manipulation** of procedures and preferences

- **Evaluate trade-offs** between competing democratic values

Most importantly, you've developed **institutional imagination**—the ability to see how different rules produce different outcomes and to design institutions consciously rather than naively.

### The Humility Required

Social choice theory should make us humble about democracy:

- Politicians who manipulate procedures aren't necessarily corrupt—they're playing the only game available

- Judges who "find" legislative intent are often making it up—because coherent intent may not exist

- Electoral outcomes that seem "wrong" may reflect procedural choices, not voter error

- Reforms that promise "more democratic" systems are really choosing different trade-offs

This humility doesn't lead to cynicism—it leads to honesty. Better to design institutions with clear-eyed understanding of their biases than to pretend neutrality is possible.

### The Hope That Remains

Despite impossibility theorems, democracy remains valuable:

- **Peaceful transitions:** Even imperfect aggregation beats violent conflict

- **Error correction:** Bad leaders can be removed, bad policies reversed

- **Dignity:** Participation matters regardless of outcome optimality

- **Learning:** Democratic deliberation can change preferences, not just aggregate them

The impossibility of perfection doesn't make improvement impossible. Understanding these theorems helps us design better (not perfect) institutions.

## Study Tips for Mastery

### Conceptual Understanding

- **Practice identifying cycles** in any three-option, three-person scenario

- **Draw spatial models** for every political scenario you encounter

- **Ask of every rule:** "Who wins and who loses under this system?"

- **Connect to current events:** Identify agenda-setting power in real legislatures

### Problem-Solving Skills

- **Always start with individual preferences** clearly stated

- **Work through pairwise comparisons** systematically

- **Draw diagrams** before calculating—spatial intuition beats algebra

- **Check your work** by verifying that all actors are responding rationally to the rules

### Essay Writing

- **Acknowledge trade-offs** explicitly—never claim a system is perfect

- **Use formal models** to support verbal arguments

- **Consider strategic responses** to any institutional design you propose

- **Connect to theory** (Arrow, McKelvey, etc.) when explaining phenomena

### Common Exam Mistakes

- Forgetting that veto players constrain outcomes based on distance from SQ, not just their ideal point

- Failing to check all pairwise comparisons when looking for cycles

- Assuming the median voter theorem applies in multidimensional spaces

- Not considering strategic voting when analyzing election outcomes

- Claiming legislative intent exists when preferences cycle

## Additional Practice Problems

If you want more practice, try these extensions:

**Cycle Detection:** Create your own three-person, three-option preference profile that produces a cycle. Then add a fourth person who breaks the cycle. What did you learn about how additional voters can stabilize outcomes?

**Spatial Manipulation:** Take Question 5's setup but make Skeptic bloc the agenda setter instead of Tech. What different outcome would they achieve? Why?

**Veto Player Analysis:** In Question 4, calculate the exact "indifference point" where Hungary is indifferent between a proposal and SQ=€50. At what tax rate does this occur?

**Strategic Voting:** In Question 7, could the Policy supporters improve their outcome through strategic voting under Borda Count? Show your work.

**Institutional Design:** Design a voting system for your university's student government that balances representing diverse student groups while avoiding paralysis. Justify your choices using concepts from this problem set.

## Connection to Democratic Theory

This problem set engages with fundamental questions in political philosophy:

**Rousseau's ****"****General Will****"****:** Social choice theory suggests there may be no coherent general will to discover—only individual wills to aggregate imperfectly.

**Majoritarianism vs. Consensus:** Arrow shows we must choose between majority rule (which produces cycles) and consensus requirements (which create gridlock).

**Procedural vs. Substantive Democracy:** These models focus on procedures; they can't tell us if outcomes are "just," only whether they follow from stated preferences and rules.

**Pluralism:** McKelvey's chaos suggests that without institutional constraints, pluralistic societies with multidimensional conflicts cannot achieve stable outcomes.

**Elite Theory:** Agenda-setting power confirms that elites structure choices, but social choice theory shows this may be necessary rather than corruptive.

Understanding these impossibility results should inform, not determine, your normative political philosophy. They set boundaries on what's achievable, not what's desirable.

## Looking Forward: Applications in Future Study

The tools from this problem set will be essential for:

**Legislative Politics:** Understanding how committees, parties, and procedures structure congressional outcomes

**Comparative Politics:** Analyzing how different electoral systems and constitutional structures produce different policy outcomes

**International Relations:** Modeling negotiations between states with conflicting preferences

**Public Policy:** Evaluating how policy-making procedures affect which interests prevail

**Democratic Theory:** Engaging seriously with impossibility results when theorizing about ideal institutions

**Empirical Research:** Designing studies that account for institutional effects on outcomes

*"**Democracy is the worst form of Government except for all those other forms that have been tried from time to time.**"* - Winston Churchill

This quote, which appears at the end of the original problem set, perfectly captures social choice theory's lesson: democracy is mathematically imperfect but practically essential. Our task isn't to achieve impossible perfection but to design and maintain institutions that manage impossibility as well as possible.

The impossibility theorems don't make democracy worthless—they make it more impressive that democracy works at all, and they make conscious institutional design more urgent. Understanding these theorems is the first step toward honest, effective democratic governance.