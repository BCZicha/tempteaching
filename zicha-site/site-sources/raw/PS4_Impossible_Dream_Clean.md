# Problem Set 4: The Impossible Dream of Perfect Democracy

## Arrow's Theorem, Voting Systems, and the Architecture of Collective Choice

### Instructions for Students

**Time Expectation:** This problem set is designed to take 6 hours of focused work. Work with classmates to understand concepts, but write your own responses.

**Assessment:** Pass/fail based on demonstrated effort and understanding. This is a teaching tool, not a test.

**Materials Needed:** Graph paper or digital drawing tool (Inkscape recommended), ruler, colored pens/pencils for spatial models.

**Learning Objectives:** By completing this problem set, you will:

- Understand why perfect democratic decision-making is mathematically impossible (Arrow's Theorem)

- Analyze how different voting rules shape outcomes by selectively using or discarding information

- Master spatial voting models in one and two dimensions

- Recognize how institutional structures create order but introduce bias

- Appreciate the fundamental tension between fairness and coherence in collective choice

## Part I: The Committee's Dilemma - Building Intuition (45 minutes)

### Scenario Setup: The European Climate Council

You're observing the European Climate Council, a 9-member body deciding on three climate policy packages:

- **Package G (Green New Deal):** Aggressive emissions cuts, massive public investment

- **Package M (Market Solutions):** Carbon pricing, private sector incentives

- **Package I (Incremental Steps):** Gradual transition, minimal disruption

The council has three factions of 3 members each:

- **Progressives:** G > M > I

- **Market Liberals:** M > I > G

- **Conservatives:** I > G > M

### Question 1: Discovering the Paradox

**[DO] Part A: Pairwise Comparisons** Complete the following majority vote outcomes:

- G vs M: _____ wins with _____ votes

- M vs I: _____ wins with _____ votes

- I vs G: _____ wins with _____ votes

**[WRITE] Part B: The Cycle** (2-3 sentences) Explain what paradox you've discovered. If the council claims to represent "the will of the people," what problem does this create?

**[DO] Part C: Breaking the Cycle** The council must choose ONE policy. Complete this table showing outcomes under different procedures:

| **Voting Procedure** | **Winner** | **Losers Upset?** |
| --- | --- | --- |
| Method 1: Vote on G vs M first, then winner vs I |  |  |
| Method 2: Round 1: G vs I, Round 2: R1 winner vs M |  |  |
| Method 3: Round 1: G vs M, Round 2: R1 winner vs I |  |  |
| Method 4: All vote for top choice, plurality wins |  |  |

**[WRITE] Part D: Institutional Power** (3-4 sentences) The council chair controls the voting procedure. Explain how this "mere procedural power" is actually the power to determine the outcome. What does this reveal about the relationship between process and outcome in democracy?

## Part II: Arrow's Impossibility - From Intuition to Theory (60 minutes)

### Teaching Box: Arrow's Conditions

Arrow proved that no voting system can simultaneously satisfy these reasonable conditions:

- **Rationality:** All individuals have complete, transitive preferences

- **U (Universal Domain):** The voting system must work for ANY possible combination of individual preferences

- **P (Pareto):** If everyone prefers X to Y, society should prefer X to Y

- **D (Non-Dictatorship):** No single person determines society's choice

- **I (Independence):** Society's preference between X and Y depends only on individuals' preferences between X and Y

- **T (Transitivity):** If society prefers X to Y and Y to Z, it must prefer X to Z

When we try to satisfy all conditions, we get impossibility. Often we sacrifice U (restrict what preferences are allowed) or accept intransitivity (cycles).

### Question 2: Anatomy of Impossibility

**[READ] Setup:** Three friends choosing a movie: Anna, Ben, Carlos

**Preference Profile A:**

- Anna: Action > Comedy > Drama

- Ben: Comedy > Drama > Action

- Carlos: Drama > Action > Comedy

**Preference Profile B:**

- Anna: Action > Comedy > Drama

- Ben: Comedy > Action > Drama

- Carlos: Drama > Action > Comedy

**[DO] Part A: Group Preferences** Using majority rule, determine society's preferences:

Profile A:

- Action vs Comedy: _____

- Comedy vs Drama: _____

- Drama vs Action: _____

- Group ranking: _____

Profile B:

- Action vs Comedy: _____

- Comedy vs Drama: _____

- Drama vs Action: _____

- Group ranking: _____

**[DO] Part B: Finding the Violation** Compare how society ranks Action vs Comedy in both profiles:

- Profile A: Society prefers _____ to _____

- Profile B: Society prefers _____ to _____

Now compare individual preferences over Action vs Comedy:

- Did Anna change her Action vs Comedy preference? _____

- Did Ben change? _____

- Did Carlos change? _____

**[WRITE] Part C: The Independence Violation** (3-4 sentences) Explain how this violates Arrow's Independence condition. Society reversed its preference between Action and Comedy even though no individual changed their preference between these two options. What changed was preferences about Drama. Why is this philosophically troubling for democracy?

### Question 3: Escaping Arrow's Prison

**[DO] Part A: Alternative Voting Rules** For each rule, identify which Arrow condition it violates:

| **Voting Rule** | **Description** | **Violates** | **Why This Might Be Acceptable** |
| --- | --- | --- | --- |
| Dictatorship | Anna decides everything |  |  |
| Unanimity Rule | X beats Y only if everyone prefers X to Y |  |  |
| Lexicographic | Alphabetically first person decides |  |  |
| Borda Count | Points for rankings, sum them up |  |  |

**[WRITE] Part B: The Fundamental Trade-off** (4-5 sentences) Arrow's Theorem reveals a trade-off between fairness and consistency. Explain this trade-off. Which would you sacrifice in different contexts (e.g., constitutional amendments vs. restaurant choice), and why?

## Part III: Spatial Models and the Median Voter (75 minutes)

### Teaching Box: Spatial Voting Basics

- Voters have ideal points in policy space

- Utility decreases with distance from ideal point

- In 1D with single-peaked preferences, the median voter's ideal point wins

- In 2D, chaos typically results (McKelvey's Theorem)

- Institutions (agenda setters, veto players) can create stability

### Question 3.5: Understanding Spatial Restrictions

**[DO] Part A: Why 1D Works** In one dimension with single-peaked preferences, we get stability. But which Arrow condition are we violating?

- We're violating: _____

- Because: _____

**[WRITE] Part B: The Universal Domain Trade-off** (2-3 sentences) Explain why requiring single-peaked preferences violates Universal Domain. What kinds of "reasonable" preferences does this restriction exclude?

**[DO] Part C: 2D Instability** Even if we restrict preferences to be single-peaked (circular indifference curves) in 2D:

- Can we still get cycles? _____

- What additional restriction would guarantee stability? _____

- Why is this restriction unrealistic for most political issues? _____

# Question 4: The EU Carbon Tax Negotiation

Seven EU member states must set a carbon tax rate (€ per ton CO2). Their ideal points:

- Netherlands: €120

- Denmark: €110

- Germany: €90

- France: €80 (Agenda Setter)

- Spain: €60

- Poland: €30

- Hungary: €20 (Veto Player - can block any change from status quo)

Status Quo: €50

**[DRAW] Part A: One-Dimensional Model** Draw a line from €0 to €140. Mark all ideal points, the status quo (SQ), and the median.

**[DO] Part B: Pure Majority Rule** If any country can propose and majority rule decides:

- Median country: _____

- Equilibrium tax rate: €_____

**[DRAW] Part C: Agenda Setter with Veto Player** France controls what gets voted on. Hungary can veto any change from SQ = €50.

- Draw the winset of SQ (what beats SQ in majority vote): from €_____ to €_____

- Draw what Hungary will accept (closer to €20 than SQ): from €_____ to €_____

- Do these ranges overlap? _____

What can France successfully propose? _____ Final outcome: €_____

**[DO] Part D: Different Status Quo** If SQ = €20 instead:

- Winset of SQ (what majority prefers to €20): €_____ to €_____

- What Hungary accepts (no worse than €20 for Hungary): €_____ exactly

- Can France move policy from €20? _____

- Final outcome: €_____

**[DO] Part E: Strategic Status Quo Placement** If SQ = €35 instead:

- Winset of SQ: €_____ to €_____

- What Hungary accepts (points no further from €20 than €35 is): €_____ to €_____

- Overlap: €_____ to €_____

- France's optimal proposal within this range: €_____

- Final outcome: €_____

**[WRITE] Part F: Institutional Power and Constraints** (4-5 sentences) Compare outcomes with and without institutional structure (agenda setter + veto). How do these institutions create predictability but also potential gridlock? What does the location of the status quo reveal about the power of veto players?

# Question 5: Two-Dimensional Voting, Institutions, and Heresthetic Manipulation

## The European Climate Council Budget Allocation

The European Climate Council must decide how to allocate climate funding. Three equal-sized voting blocs have different visions for how to spend these funds.

### Part A: The Two-Dimensional Policy Space

The council must decide spending levels on two programs:

- **Dimension A:** Renewable Energy Subsidies (€0-100 billion)

- **Dimension B:** Carbon Capture Research (€0-100 billion)

Three equal blocs (3 members each) with ideal points:

- **Environmental Bloc:** (A=75, B=50) - Heavy renewable focus, moderate carbon capture

- **Tech Bloc:** (A=30, B=60) - Low renewables, high carbon capture focus

- **Skeptic Bloc:** (A=25, B=25) - Minimal spending on both programs

**Status Quo:** (A=40, B=40) - Last year's allocation

All blocs have circular indifference curves (Euclidean preferences).

**[DRAW] Part A1: Initial Setup** On graph paper with 100x100 grid:

- Mark the three ideal points with different symbols (E, T, S)

- Mark the status quo with SQ

- Draw a circle with radius 10 around each ideal point

- Note that the ideal points form a proper triangle (not a line)

**[DO] Part A2: Verify the Triangle** Calculate the approximate distances between ideal points:

- Environmental to Tech: _____

- Tech to Skeptic: _____

- Skeptic to Environmental: _____

### Part B: Discovering Chaos Under Majority Rule

**[DRAW] Part B1: Finding the Winset of SQ**

- Draw each bloc's indifference curve through SQ (A=40, B=40)

- Shade the area each bloc prefers to SQ

- Identify the winset (areas where at least 2 blocs prefer to SQ)

- Is the winset empty? _____

**[DO] Part B2: Identifying Coalition Possibilities** For point (A=50, B=50):

- Which blocs prefer this to SQ? _____

- Does it pass by majority rule? _____

For point (A=65, B=35):

- Which blocs prefer this to SQ? _____

- Does it pass by majority rule? _____

For point (A=35, B=65):

- Which blocs prefer this to SQ? _____

- Does it pass by majority rule? _____

**[DO] Part B3: The Cycling Problem** Starting from SQ at (40,40):

- Find P₁ that beats SQ: _____ (which coalition supports it? _____)

- Find P₂ that beats P₁: _____ (which coalition? _____)

- Find P₃ that beats P₂: _____ (which coalition? _____)

- Find P₄ that beats P₃: _____ (which coalition? _____)

- Does P₄ beat or lose to SQ? _____

**[WRITE] Part B4: McKelvey's Insight** (3-4 sentences) Explain how an agenda setter could exploit these cycles to reach almost anywhere in the policy space. Why doesn't this chaos actually destroy real legislatures?

### Part C: One Veto Player Creates a Winset

Now suppose **Environmental Bloc has veto power** - they can block any change from the status quo. **Tech Bloc is the agenda setter**.

**[DRAW] Part C1: Constrained Choice**

- Draw Environmental's indifference curve through SQ (40,40)

- Shade the area Environmental will accept (closer to their ideal than SQ)

- This is the only area Tech can successfully propose from

**[DO] Part C2: Tech's Optimal Proposal** Within Environmental's acceptable set:

- Can Tech achieve their ideal point (30,60)? _____

- What's the closest point to Tech's ideal that Environmental will accept? _____

- What coalition will support this proposal? _____

### Part D: Two Veto Players Create a Contract Curve

Now both **Environmental Bloc and Skeptic Bloc have veto power**. Tech Bloc remains agenda setter.

**[DRAW] Part D1: The Feasible Set**

- Draw Environmental's indifference curve through SQ (40,40) in green

- Draw Skeptic's indifference curve through SQ (40,40) in blue

- Shade the lens-shaped area both veto players will accept

- This intersection is the only area Tech can successfully propose from

**[DRAW] Part D2: The Contract Curve**

- Within the lens, find points where Environmental and Skeptic's indifference curves are tangent

- Connect these tangency points - this is the **contract curve** between Environmental and Skeptic

- Mark the portion of the contract curve within the feasible lens

**[DO] Part D3: Understanding the Contract Curve**

- Why are points on the contract curve special? _____

- Can Tech achieve their ideal point? _____

- What point on the contract curve is best for Tech? (approximately) _____

**[WRITE] Part D4: Bilateral Efficiency** (2-3 sentences) Explain why the contract curve represents Pareto efficient trades between the two veto players. What happens to the third player (Tech) in this arrangement?

### Part E: Three Veto Players Create the Pareto Set

Now **all three blocs have veto power**.

**[DRAW] Part E1: The Pareto Set**

- Draw all three indifference curves through SQ (40,40)

- Shade the area ALL three blocs prefer to SQ

- This triangular region is the **Pareto set** relative to SQ

**[DO] Part E2: Extreme Constraint**

- Approximate area of the Pareto set: _____ square units

- Can any bloc achieve its ideal point? _____

- What's the approximate center of the Pareto set? _____

- Distance from SQ to this center: _____

**[WRITE] Part E3: Institutional Paralysis** (3-4 sentences) Explain why giving everyone veto power creates extreme status quo bias. When might this be desirable? When is it problematic?

### Part F: The Heresthetic Reframing

**[READ] The Strategic Rewind:** Let's go back in time. Initially, the Climate Council debate was much simpler - it was only about "How much to spend on renewable energy?"

**[DRAW] Part F1: The One-Dimensional Version** On a line from €0 to €100 billion for renewables:

- Environmental Bloc ideal: €75 billion

- Tech Bloc ideal: €30 billion

- Skeptic Bloc ideal: €25 billion

- Status Quo: €40 billion

- Mark all positions

- Identify the median voter: _____

- With pure majority rule, equilibrium outcome: €_____

**[DO] Part F2: Tech Bloc's Problem in 1D** Tech Bloc is the agenda setter. Starting from SQ = €40 billion:

- Can Tech get majority support to move toward €30 billion? _____

- Who would support? _____

- Best outcome Tech can achieve as agenda setter: €_____

- Distance from Tech's ideal: €_____

**[READ] Part F3: The Heresthetic Move** Tech Bloc's leader makes a strategic intervention:

*"**Colleagues, we're having the wrong debate. It's not just about renewable energy - we're completely ignoring carbon capture technology! We need investment in breakthrough innovations, not just traditional renewables. Let me propose we consider these as two separate budget lines...**"*

This successfully reframes the one-dimensional debate into the two-dimensional space from Parts A-E.

**[DO] Part F4: Comparing Tech Bloc's Position**

| **Scenario** | **Tech Bloc as Agenda Setter Gets** | **Distance from Tech's Ideal** |
| --- | --- | --- |
| 1D voting (renewables only) | Stuck at €40 billion | €10 billion |
| 2D voting (both dimensions) | Can propose points like (35,50) | Calculate: _____ |
|  | Can build coalitions with Environmental OR Skeptic | Varies by coalition |

In 2D, Tech can now propose (35,50):

- Does Environmental prefer this to SQ (40,40)? Check distances: _____

- Does Skeptic prefer this to SQ? Check distances: _____

- Which coalition can Tech build? _____

**[WRITE] Part F5: The Power of Dimensionality** (5-6 sentences) Explain how Tech Bloc improved their position by adding a dimension to the debate. What does this tell us about the power to frame issues? Why might political entrepreneurs try to link previously separate issues? When might voters want to resist such issue linkage?

### Part G: Synthesis and Reflection

**[WRITE] Part G1: Institutional Design** (4-5 sentences) Compare the outcomes under:

- Pure majority rule (chaos but democratic)

- One veto player (constrained but biased)

- Two veto players (contract curve)

- Three veto players (near paralysis)

Which institutional arrangement would you recommend for the Climate Council and why? What values are you prioritizing?

**[WRITE] Part G2: Riker's Heresthetic** (3-4 sentences) William Riker argued that politics isn't just about having the best preferences or the most votes - it's about structuring the situation so you can win. How does Tech Bloc's dimensional manipulation illustrate this principle? What other examples of heresthetic manipulation can you think of in real politics?

### Question 6: Strategy and the Often Counter Intuitivity of Institutional Constraints

A legislature is going to vote on a policy that is well represented by a single-issue dimension, on a scale of zero to one. The initial policy proposal will be supplied by a committee (whose ideal point for this exercise can be any point along the x-axis) to a legislature with median ideal point M. The status quo is currently at point SQ. 

**[DO] Part A **Draw a line showing the equilibrium outcomes for any committee ideal point, when the committee's proposal is considered under a closed rule. 

**[DO] Part B**: On a separate set of axes, perform the same exercise when the committees proposal is considered under an open rule. 

**[Do] Part C**: Then, do the same exercise for both rules (using a dashed line on the two axes already created), assuming that the legislature operates on the principal of zero-based budgeting, so if no bill is passed in the current session, the policy reverts to ZB = 0. 

**[WRITE] Part D:** What is the impact of zero-based budgeting under a closed rule? Are equilibrium outcomes closer or further from the legislature's median, on average? What about under the open rule?

## Part IV: Information, Manipulation, and Strategic Voting (60 minutes)

### Question 7: The Information Content of Voting Systems

A department must choose a new curriculum focus from five options. Nine faculty members rank them:

**[READ] True Preferences:**

| **Faculty** | **1st** | **2nd** | **3rd** | **4th** | **5th** |
| --- | --- | --- | --- | --- | --- |
| 3 members | Theory | Methods | Policy | Applied | Critical |
| 2 members | Methods | Applied | Theory | Policy | Critical |
| 2 members | Policy | Critical | Applied | Methods | Theory |
| 1 member | Applied | Methods | Policy | Theory | Critical |
| 1 member | Critical | Policy | Theory | Applied | Methods |

**[DO] Part A: Different Voting Rules, Different Winners**

| **Voting System** | **Information Used** | **Winner** | **Information Discarded** |
| --- | --- | --- | --- |
| Plurality (first choice only) |  |  |  |
| Runoff (top 2 from plurality) |  |  |  |
| Borda Count (5 pts for 1st, 4 for 2nd...) |  |  |  |
| Approval (vote for all acceptable) |  |  |  |

*For approval voting, assume each voter approves their top 2 choices*

**[WRITE] Part B: No ****"****True****"**** Social Preference** (4-5 sentences) Each voting system produces a different winner from the same preferences. What does this tell us about the concept of "the will of the majority"? How do voting systems create outcomes rather than reveal them?

### Question 8: Strategic Misrepresentation

Return to Question 6. The 3 Theory supporters realize Methods will win under Borda Count.

**[DO] Part A: Strategic Voting** If the 3 Theory supporters vote strategically by ranking Methods last (Theory > Policy > Applied > Critical > Methods), what happens?

New Borda scores:

- Theory: _____

- Methods: _____

- Policy: _____

- Applied: _____

- Critical: _____

New winner: _____

**[WRITE] Part B: The Gibbard-Satterthwaite Theorem** (4-5 sentences) [OPTIONAL - BUT THINK ABOUT IT]

This illustrates another impossibility theorem: any voting system that is strategy-proof (where voting honestly is always each voter's best strategy) must be dictatorial.

Strategy-proof means no voter can ever benefit by misrepresenting their true preferences - but we just showed this isn't true for Borda Count! This is troubling because it means voters face a dilemma: vote honestly and potentially "waste" their vote, or vote strategically and undermine the information the voting system needs to aggregate preferences properly.

When might we worry more about strategic manipulation versus cycling? Consider different contexts: When stakes are high and voters sophisticated (like legislatures), which problem is worse? When voters are numerous and less informed (like general elections), which is more concerning?

### Question 8.5: The Impossible Search for Legislative Intent

The EU Parliament just passed the "Digital Markets Regulation" by a vote of 412-235. A judge must now interpret an ambiguous provision about "fair data access requirements."

## The Coalition

**[READ] The 412-vote majority included three distinct groups:**

- **150 MEPs (Group A):** Want strict data sharing mandates enforced by heavy penalties

- **130 MEPs (Group B):** Want moderate oversight with exemptions for small businesses

- **132 MEPs (Group C):** Want voluntary guidelines with industry self-regulation

Each group voted YES only because they preferred the ambiguous bill to the status quo of no regulation.

The 235 NO votes came from MEPs who preferred no regulation to any form of data access rules.

## Understanding Each Group's Preferences

**[READ] Critical context about polarized preferences:**

In contentious policy areas, groups often view compromises that go the "wrong direction" as worse than no action at all. This happens because:

- **Group A** (strict mandate supporters) believe weak regulations would:

- Give companies legal cover to continue data hoarding

- Create precedent that blocks future stronger regulation

- Legitimize inadequate standards with an official EU stamp

- *They'd rather fight for strong rules later than accept weak rules now*

- **Group B** (moderate oversight supporters) believe:

- Strict mandates (A) would devastate small businesses and innovation

- Voluntary guidelines (C) would let bad actors exploit responsible companies

- *Both extremes would distort the market worse than status quo*

- **Group C** (voluntary guideline supporters) believe:

- Any mandatory regulation would stifle innovation

- Government interference in data markets would reduce efficiency

- *Better to have no rules than binding rules that markets can't adapt around*

**Therefore, each group's preference ordering is:**

- Group A: A > ambiguous bill > no regulation > B > C

- Group B: B > ambiguous bill > no regulation > C > A

- Group C: C > ambiguous bill > no regulation > A > B

- No-regulation group: no regulation > any form of regulation

This explains why they could agree on ambiguous language (each hoping for their interpretation) but not on any explicit version.

## Part A: Finding "The" Intent

**[DO] Analyze the majority coalition:**

- Which interpretation has the most supporters among the majority? _____

- Do any of these have majority support in Parliament (>324 votes)? _____

**[DO] In pairwise votes within the majority coalition:**

- A vs B: _____ wins with _____ votes

- B vs C: _____ wins with _____ votes

- C vs A: _____ wins with _____ votes

- Is there a clear majority preference within the coalition? _____

- If yes, which interpretation? _____

- Then why didn't that interpretation pass when proposed explicitly? _____

## Part B: The Incoherence Problem

**[WRITE]** (3-4 sentences) Even though interpretation A has the most support within the coalition, it couldn't pass on its own. Explain why asking for "the intent of the legislature" is problematic when the majority coalition formed for different, incompatible reasons. What does this tell us about the concept of collective intent?

## Part C: Strategic Ambiguity

**[DO] Logically determine what would happen with explicit language:**

Given the preference orderings above, complete:

| **Specified Interpretation** | **Who Votes YES** | **Who Votes NO** | **Total YES** | **Total NO** | **Result** |
| --- | --- | --- | --- | --- | --- |
| Interpretation A (strict) | Group A only | Groups B, C, and no-regulation |  |  |  |
| Interpretation B (moderate) |  |  |  |  |  |
| Interpretation C (voluntary) |  |  |  |  |  |
| Ambiguous language | Groups A, B, C | No-regulation group | 412 | 235 | Passes |

## Part D: The Ambiguity Necessity

**[WRITE]** (2-3 sentences) Explain why ambiguous language was the ONLY way to pass ANY regulation. What does this tell us about the relationship between legislative success and clarity?

## Part E: The Judge's Dilemma

**[DO] A company challenges the regulation. The judge must interpret ****"****fair data access.****"**** Consider these approaches:**

**1. Legislative History:** The judge reviews parliamentary debates and sponsor statements

- **What would the judge find in the legislative record?**

- Group A sponsors said: "This ensures strict mandatory data sharing"

- Group B sponsors said: "This provides balanced, flexible oversight"

- Group C sponsors said: "This respects voluntary industry cooperation"

- **Why doesn't this reveal ****"****the****"**** legislative intent?** (2-3 sentences)

**2. Majority Intent:** The judge tries to determine what most YES voters wanted

- **Which interpretation has the most supporters among the 412?** _____

- **What happens when you do pairwise comparisons (from Part A)?** _____

- **Why can't the judge identify a single majority preference?** (2-3 sentences)

**3. Median Position:** The judge chooses interpretation B as the "middle ground"

- **How many of the 647 total MEPs actually wanted interpretation B?** _____

- **What percentage is this?** _____

- **Is choosing the interpretation that a small minority wanted democratically legitimate? Why or why not?** (2-3 sentences)

**4. Plain Meaning:** The judge interprets "fair data access" based on ordinary language

- **What does ****"****fair****"**** mean?** (Try to define it precisely)

- **Would different judges define ****"****fair****"**** the same way?** _____

- **What's the problem with this approach?** (2-3 sentences)

**5. Policy Judgment:** The judge chooses what seems like the best policy for data markets

- **Whose policy preferences would determine the outcome?** _____

- **Is this democratically legitimate? Why or why not?** (2-3 sentences)

## Part F: Implications for Judicial Interpretation

**[WRITE]** (5-6 sentences) Given that "legislative intent" may not meaningfully exist when there are cycles or strategic ambiguity, how should judges approach statutory interpretation? Should they:

- Admit they're making policy choices and be transparent about their reasoning?

- Maintain the "noble lie" that they're finding what the legislature intended?

- Refuse to interpret ambiguous statutes and force legislatures to be clearer?

- Something else?

Consider both the legitimacy of judicial power and the practical needs of governance in your answer.


## Part V: Integration - Building and Breaking Democratic Institutions (90 minutes)

### Question 9: The Continental Federation Assembly

Twenty-five nations must design a decision-making system for a new Continental Federation, allocating a budget across three priorities:

- Security (S)

- Economic Development (E)

- Climate Action (C)

Nations fall into five groups of 5 nations each:

| **Group** | **Most Preferred** | **Preferences** |
| --- | --- | --- |
| Hawks | High S, Low E, Low C | S > E > C |
| Developers | Low S, High E, Low C | E > C > S |
| Greens | Low S, Low E, High C | C > S > E |
| Balancers | Medium all | E > S > C |
| Populists | High S, High E, Low C | S > E > C |

**[DO] Part A: Predict Instability** Under simple majority rule, identify a cycle:

- _____ beats _____ with support from _____

- _____ beats _____ with support from _____

- _____ beats _____ with support from _____

**[DESIGN] Part B: Your Institution** Design an institution to produce stable, predictable outcomes. Choose:

- Voting rule: _____

- Who sets agenda: _____

- Who has veto (if any): _____

- Other constraints: _____

**[DRAW] Part C: Model Your Institution** Create a spatial model showing how your institution works. Include ideal points, status quo, and institutional constraints.

**[WRITE] Part D: Justify Your Design** (5-6 sentences) Explain what values your institution prioritizes (stability? fairness? minority protection? efficiency?). What are you sacrificing? Who wins and loses under your system?

### Question 10: The Downsian Insight

Two political parties compete for votes along a left-right spectrum. Voters are distributed normally with mean at 50 (on 0-100 scale).

**[DRAW] Part A: Convergence** Show where both parties position themselves to maximize votes. Explain why.

**[DO] Part B: Breaking Convergence** For each modification, explain if/how party positions change:

| **Modification** | **New Party Positions** | **Why** |
| --- | --- | --- |
| Voters distributed bimodally (peaks at 30 and 70) |  |  |
| Parties need member approval (members more extreme) |  |  |
| Third party enters at position 50 |  |  |
| Voters uncertain about party positions |  |  |

**[WRITE] Part C: Real Politics** (4-5 sentences) Why don't all parties converge to the center in real democracies? What assumptions in Downs's model does reality violate or complicate? Consider: Do all voters actually vote? Do they have perfect information? Are there really only two parties? Is there really only one dimension?

## Part VI: Synthesis - The Tragic Beauty of Democracy (30 minutes)

### Question 11: Letter to a Disillusioned Voter

**[WRITE]** (400 words)

A friend messages you: "I just learned about Arrow's Theorem and McKelvey's Chaos in my political science class. So democracy is basically impossible? There's no 'will of the people,' just whatever the agenda setter wants? Why even vote?"

Write a response that:

- Acknowledges the genuine insights of social choice theory

- Explains why these "impossibilities" don't make democracy worthless

- Discusses how real democracies manage these problems

- Offers a mature perspective on democratic participation

Consider addressing:

- The value of democratic institutions even if they're imperfect

- How constraints that seem anti-democratic (like veto players) might serve democratic values

- The difference between mathematical impossibility and practical governance

- Why "perfect" democracy might not even be desirable

### Question 12: Reflection - Your Takeaway

**[WRITE] Part A: One Key Insight** (2-3 sentences) What's the single most important thing you learned from this problem set?

**[WRITE] Part B: One Remaining Question** (2-3 sentences) What question about democracy and collective choice are you still puzzling over?

## Appendix: Quick Reference

### Arrow's Conditions

- **Rationality:** All individuals have complete, transitive preferences

- **U (Universal Domain):** The voting system must work for ANY possible combination of individual preferences

- **P (Pareto):** If everyone prefers X to Y, society should prefer X to Y

- **D (Non-Dictatorship):** No single person determines society's choice

- **I (Independence):** Society's preference between X and Y depends only on individuals' preferences between X and Y

- **T (Transitivity):** If society prefers X to Y and Y to Z, it must prefer X to Z

### Spatial Voting Concepts

- **Ideal point:** Most preferred position

- **Indifference curve:** Points yielding equal utility

- **Winset:** All points that beat status quo

- **Core:** Point(s) with empty winset

- **Median voter:** Decides outcome in 1D with single-peaked preferences

### Institutional Roles

- **Agenda setter:** Controls what gets voted on

- **Veto player:** Can block changes from status quo

- **Gate keeper:** Decides whether proposals reach floor

### Key Theorems

- **Arrow:** No perfect voting system exists

- **Black:** Median voter theorem for 1D

- **McKelvey:** Chaos in multidimensional voting

- **Gibbard-Satterthwaite:** No strategy-proof voting except dictatorship

*"**Democracy is the worst form of Government except for all those other forms that have been tried from time to time.**"* - Winston Churchill

This quote captures the essence of social choice theory: democracy is mathematically imperfect but practically essential.