# Problem Set 2: Game Theory - Anarchic to Ordered Equilibria: Strategic and Institutional Solutions to the Problems of Collective Life

## Learning Objectives

By completing this problem set, you will:

- Use game theory as a tool to understand why cooperation often fails without institutions

- Discover how informal norms, reputation, and social enforcement can change strategic outcomes

- Analyze why markets fail in specific circumstances and when informal solutions break down

- Connect individual strategic behavior to broader questions about when we need formal institutions

**Important Note:** This problem set teaches game theory concepts as tools for understanding institutional problems, not as mathematical exercises. Focus on what the analysis reveals about human cooperation and informal institutional design.

**Instructions:** Throughout this problem set, you'll see:

- **[READ]** = Provided information/example to study

- **[DO]** = Calculate or fill in this answer yourself

- **[WRITE]** = Write an explanation (2-3 sentences unless otherwise specified)

## Submission Guidelines

- **What to submit:** All filled-in calculations ([DO]) and written responses ([THINK AND/OR WRITE])

- **Collaboration:** Work with others or any other resource to understand concepts and learn to answer the questions, but write individual responses

- **Time:** Est. Budget 6-8 hours; complete Part I thoroughly before moving on

- **Due:** Friday Week 3, 23:59 (grace period until Sunday 23:59)

## Worked Example: Understanding Strategic Form Games

[READ] **Read this complete example before starting the problems:**

**Scenario:** Two students must decide whether to study hard or slack off for a group project. They care about their grade but also about not working harder than necessary.

**Step 1: Identify the Strategic Elements**

- Players: Student A, Student B

- Strategies: Study Hard, Slack Off

- Payoffs: Based on grade received and effort expended

**Step 2: Construct the Payoff Matrix** If both study hard → good grade, but high effort → payoff = 3 each If both slack → poor grade, low effort → payoff = 1 each
If one studies, one slacks → mixed grade, unequal effort → studier gets 0, slacker gets 4

                Student B

            Study Hard  Slack Off

Student A  Hard     (3,3)     (0,4) 

Slack    (4,0)     (1,1)

**Step 3: Find Dominant Strategies** For Student A: If B studies hard, A gets 4 from slacking vs. 3 from studying → slack better If B slacks off, A gets 1 from slacking vs. 0 from studying → slack better Slacking dominates studying for A (and by symmetry, for B too).

**Step 4: Predict the Outcome** Both will slack off, getting payoffs of (1,1), even though both studying hard would give (3,3).

**Step 5: Institutional Insight** This shows how rationally maximizing individual behavior can produce collectively rather unmaximized outcomes—the foundation for understanding why we rely on shared institutions (both informal and formal) to align individual and collective interests.

But, foreshadowing next week, we also need to think about - *a la* North 1990 from IGD - the transaction costs involved with establishing and maintaining these. Together, we understand both why much of human history wasn't a 'war of all against all' as Hobbes suggested, as informal rules will emerge quickly, but also why highly organized orderly societies have been so historically rare and fragile in human history, as well as why technology that lowers various transaction costs have both aided the development of these societies, but may also threaten them. Themes I hope emerge from the problem set to follow.

## Part I: Foundation - Building Game Theory Skills (90 minutes)

### Teaching Box: How to Build a Game from a Verbal Description

[READ] When converting a real situation into game theory:

- **Identify players**: Who makes decisions?

- **List strategies**: What can each player choose?

- **Calculate payoffs**: For each combination of strategies, what does each player get?

- **Build the matrix**: Organize payoffs with Player A's strategies as rows, Player B's as columns

- **Analyze equilibrium**: Find where neither player wants to change their strategy

### Question 1: Market Entry and Competition (Heavily Guided)

Two entrepreneurs consider opening restaurants in a small town that can really only support one profitable restaurant.

**Setup:** Opening a restaurant costs $50,000. If you're the only restaurant, you earn $80,000 profit. If both open, you each lose $10,000 due to competition.

**Part A: Constructing the Payoff Matrix** [READ] Example calculation: If A opens and B doesn't: A gets revenue $80,000 - cost $50,000 = $30,000 profit

[DO] **You calculate the rest:**

- If B opens and A doesn't: B gets $_____

- If both open: Each gets $_____

- If neither opens: Each gets $_____

[DO] **Complete this matrix (in thousands of dollars):**

                Entrepreneur B

            	      Open      Don't Open

Entrepreneur A 	Open    (  **,  **)   (30,0) 

Don't Open   (  **,  **)  (  **,  **)

**Part B: Strategic Analysis** [READ] Guide: Check what A prefers for each possible choice by B

[DO] **Fill in:** For A: If B opens, A gets ____ from opening vs. ____ from not opening → A prefers ____ If B doesn't open, A gets ____ from opening vs. ____ from not opening → A prefers ____

[DO] A's dominant strategy (if any): ____________

**Part C: Nash Equilibrium Analysis** [READ] Hint: An outcome is a Nash equilibrium if neither player wants to change their strategy

[DO] **Check each of the four outcomes and list all Nash equilibria:** _____________

[THINK AND WRITE] **Part D: The Coordination Problem** Unlike the study example, this game has multiple equilibria. What makes this different from a prisoner's dilemma? How might the entrepreneurs solve this coordination problem informally? (Write 2-3 sentences)

### Question 2: Building Your First Game from Scratch (Moderately Guided)

Two farmers share irrigation water from a stream. Each must decide whether to use water Aggressively or Moderately.

**Scenario:** Using water aggressively gives a farmer 10 units of crop yield but reduces the downstream neighbor's yield by 6 units. Using water moderately gives 6 units of yield with no harm to the neighbor.

**[DO]** **Part A: Identify the Strategic Elements**

- Players: _____________ and _____________

- Strategies for each: _____________ or _____________

- **[WRITE]** Does it matter who is upstream? Why? _____________

**Part B: Calculate Payoffs** **[READ]** Example: If both are aggressive and A is upstream: A gets 10, B gets 10 - 6 = 4

**[DO]** **You calculate the rest:**

- Both moderate: A gets ____, B gets ____

- A aggressive, B moderate: A gets ____, B gets ____

- A moderate, B aggressive: A gets ____, B gets ____

**[DO]** **Part C: Construct the Payoff Matrix**

                Farmer B

              Aggressive  Moderate

Farmer A  Aggr.   ( ***, ***)   ( ***, ***) 

     Mod.    ( ***, ***)   ( ***, ***)

**[DO]** **Part D: Find the Equilibrium** For Farmer A: _____________ For Farmer B: _____________ Nash equilibrium: _____________

**[WRITE]** **Part E: Institutional Insight** What does the asymmetry in this game suggest about potentially socially desirable institutions? (Write 2-3 sentences)

### Teaching Box: Understanding Parameters in Games

[READ] Parameters are variables that affect payoffs but aren't chosen by players. They represent institutional features like:

- **s** = social cost of norm violation

- **p** = probability of detection/enforcement

- **f** = fine or penalty size

- **δ** = discount factor (how much future payoffs matter)

By varying parameters, we can find "critical thresholds" - specific values where the entire equilibrium of the game shifts. For example, if social disapproval becomes strong enough (s gets large), it can flip behavior from defection to cooperation.

### Question 3: Introducing Parameters - Social Norms (Lightly Guided)

Return to the irrigation farmers. Now suppose the community has a norm against aggressive water use, creating social disapproval worth -s units for anyone who uses water aggressively.

[READ] **Part A: Payoff Matrix with Parameters** The payoffs from Question 2 are modified by subtracting s from anyone choosing Aggressive:

                			Farmer B

            	Aggressive      Moderate

Farmer A  Aggr.   (10-s, 4-s)    (10-s, 0) 

          Mod.    (6, 10-s)      (6, 6)

[DO] **Part B: How Social Pressure Changes the Game** For Farmer A to prefer Moderate over Aggressive when B chooses Moderate: Need: ____ > ____ - s Therefore: s > ____

[DO] For Farmer B when A chooses Moderate: Need: ____ > ____ - s Therefore: s > ____

[READ] **Understanding Critical Thresholds:** Notice that when s is small (say s = 2), aggressive water use still dominates. But once s crosses a certain value, the entire game changes - both farmers switch to moderate use. This value where behavior flips is called a "critical threshold."

[DO] **Part C: The Critical Threshold** Based on your calculations in Part B, the equilibrium shifts from (Aggressive, Aggressive) to (Moderate, Moderate) when s = ____

[THINK AND WRITE] **Part D: Institutional Design Insight** What does this tell us about how communities can use social norms to change behavior, and how we might imagine designing them? What will be a challenge in doing so? (Write 5 sentences)

### Teaching Box: Calculating Present Values in Repeated Games

[READ] When payoffs occur over time, we need to calculate their present value using discount factors.

**Simple Example:** If you receive $100 next year and the discount factor is δ = 0.9:

- Present value = $100 × 0.9 = $90

**Multiple Periods:** If you receive $100 every year for 3 years:

- Present value = $100 + $100(0.9) + $100(0.9)² = $100 + $90 + $81 = $271

**Finite Series:** If you receive $100 every year for n years:

- Present value = $100 × (1-δⁿ)/(1-δ)

- Example with δ = 0.9 for 10 years: $100 × (1-0.9¹⁰)/(1-0.9) = $100 × 6.513 = $651.30

**Infinite Series:** If you receive $100 every year forever:

- Present value = $100/(1-0.9) = $100/0.1 = $1000

**Alternating Payoffs:** If you receive $100 in odd years only (year 1, 3, 5...):

- Present value = $100(1 + δ² + δ⁴ + ...) = $100/(1-δ²)

- With δ = 0.9: = $100/(1-0.81) = $100/0.19 = $526

### Question 4: Reputation in Repeated Interaction (Calculation Practice)

Two competing fishing companies must decide each season whether to fish a profitable area. The area can sustain one company well ($30,000 profit) but if both fish there, overfishing means each loses $10,000. They interact for 10 years with discount factor δ = 0.9.

**Part A: Strategy Design** [READ] Consider this alternating strategy: "Company A fishes the area in odd years, Company B in even years. If anyone deviates from this pattern, both companies fish the area forever after (mutual punishment)."

[DO] **Part B: Calculate Cooperation Payoff** If both follow the alternating strategy for 10 years, Company A's payoff stream: 30, 0, 30, 0, 30, 0, 30, 0, 30, 0

Calculate the present value for A: = ____ + ____(0.9) + ____(0.9)² + ____(0.9)³ + ____(0.9)⁴ + ____(0.9)⁵ + ____(0.9)⁶ + ____(0.9)⁷ + ____(0.9)⁸ + ____(0.9)⁹ = ____ + ____ + ____ + ____ + ____ + ____ + ____ + ____ + ____ + ____ = 30 × ____ = ____

[DO] **Part C: Calculate Deviation Payoff** If A deviates and fishes every year:

- Year 1: Gets ____ (B doesn't fish as agreed)

- Years 2-10: Gets ____ each year (both fish - mutual punishment)

- Present value = ____ + ____×(0.9 + 0.9² + 0.9³ + ... + 0.9⁹)

- Using the finite series formula (why?): (1-δⁿ)/(1-δ) where n = ____ and δ = ____

- So: 0.9 + 0.9² + ... + 0.9⁹ = 0.9 × (1-____)/(____) = ____

- Total = ____ + (____)×(____)  = ____

[DO] **Part D: Is Cooperation Sustainable?** Compare payoffs: Cooperation gives ____, Deviation gives ____ Therefore, cooperation is ____________

[THINK AND WRITE] **Part E: The Role of the Future** Why does repeated interaction enable cooperation when one-shot interaction doesn't? Consider also: what would happen in year 10 if there were no contract enforcement ensuring the relationship ends? How might this affect behavior in earlier years? (Write 4-5 sentences)

**Note:** This analysis assumes enforceable 10-year contracts that definitively end the relationship. Without such enforcement, year 10 becomes effectively a one-shot game where both companies would fish (no future to worry about). Knowing this, year 9 also unravels, and so on—a process called "backward induction" that can destroy cooperation even in repeated games with known endpoints.

### Teaching Box: Analyzing Multi-Player Games

**[READ]** When analyzing games with n players, we need to think systematically about how individual choices aggregate:

**Step 1: Set up the decision** Suppose there are n players total. You are one of them, so there are (n-1) others.

**Step 2: Consider what others do** If each of the (n-1) others chooses strategy xi (say, contributing xi dollars), then:

- Total from others = (n-1) × xi

- If you choose yi, the grand total = (n-1)xi + yi

**Step 3: Find your best response** Given what others do, what yi maximizes your payoff?

**Step 4: Look for symmetric equilibrium** In symmetric equilibrium, everyone uses the same strategy, so xi = yi for all players.

**Example:** 4 people splitting a task. If 3 others each do 2 hours of work (6 hours total), and you do y hours, total work = 6 + y. You can then calculate your payoff based on this total.

### Question 5: The Commons - First Multi-Player Game (Structured Analysis)

Four farmers share a pasture. Each can graze 1 or 2 cattle. The pasture provides:

- Good nutrition if total cattle ≤ 5: 1 cow → 6 profit, 2 cows → 10 profit

- Adequate nutrition if total = 6-7: 1 cow → 4 profit, 2 cows → 6 profit

- Poor nutrition if total ≥ 8: 1 cow → 1 profit, 2 cows → 0 profit

**[DO]** **Part A: Individual Decision-Making** If the other 3 farmers graze 1 cow each (3 total):

- With 1 cow: Total = ____, nutrition = ____, your payoff = ____

- With 2 cows: Total = ____, nutrition = ____, your payoff = ____

- Your best choice: ____

If the other 3 farmers graze 2 cows each (6 total):

- With 1 cow: Total = ____, nutrition = ____, your payoff = ____

- With 2 cows: Total = ____, nutrition = ____, your payoff = ____

- Your best choice: ____

**[DO]** **Part B: Finding Equilibrium** Check if "all graze 2" is an equilibrium:

- Total cattle = ____, nutrition = ____

- Each gets payoff = ____

- If one farmer switches to 1 cow: new total = ____, that farmer gets ____

- Would they switch? ____

Check if "all graze 1" is an equilibrium:

- Total cattle = ____, nutrition = ____

- Each gets payoff = ____

- If one farmer switches to 2 cows: new total = ____, that farmer gets ____

- Would they switch? ____

**[DO]** Nash equilibrium: ____________

**[WRITE]** **Part C: The Commons Problem** Compare the equilibrium outcome to the efficient outcome. What does this illustrate about common pool resources? (Write 3-4 sentences)

### Question 6: From State of Nature to International Anarchy (Independent Analysis)

**[READ]** **Setup:** Two individuals in a state of nature (no government) must decide whether to Arm themselves or remain Peaceful. Arming costs 20 units. If both remain peaceful, payoff = 0. If one arms while other doesn't, armed gets +30, peaceful gets -50. If both arm, both get -20.

**[DO]** **Part A: Construct the Game** Build the payoff matrix:

               	    Person B

 

             	   Arm        Peaceful

Person A   Arm      (***,***)        (***,***) 

 		Peaceful (***,***)        (***,***)

**[DO]** Find the Nash equilibrium: ____________ **[DO]** Find the efficient outcome: ____________

**[READ]** **Part B: Scaling to Nations** The same strategic structure can help us understand international relations. Consider two nations deciding whether to Build military capacity or remain Demilitarized:

- Building military costs 100 (defense budgets, opportunity costs)

- If both demilitarize: save resources, focus on development (payoff = 0)

- If one builds while other doesn't: military nation can dominate (+150), demilitarized nation vulnerable (-250)

- If both build: arms race exhausts resources with no relative advantage (-100 each)

                    Nation B

              Build      Demilitarized

Nation A  Build  (-100,-100)  (150,-250) 

           Demil.(-250,150)   (0,0)

Notice how the structure mirrors the individual case: the costs and benefits are scaled up, but the strategic logic remains identical - each actor fears exploitation if they don't arm/build military.

**[WRITE]** **Part C: Methodological Question** Under what conditions is it valid to model nations as unitary actors like individuals? Consider internal politics, decision-making structures, and time horizons. (Write 4-5 sentences)

**[WRITE]** **Part D: Why International Anarchy Persists** Unlike individuals who can create governments, why can't nations easily escape this dilemma? (Write 3-4 sentences)

## Part II: Market Failures and Informal Solutions (90 minutes)

### Question 7: Externalities and Neighbor Relations (Guided Calculation, Independent Analysis)

A factory produces goods with marginal cost MC(q) = 10 + 2q. Market price is $20. Each unit creates $3 of pollution affecting 5 families.

[READ] **Part A: Private vs. Social Calculation** Example: For unit 1: Private cost = $12, Social cost = $12 + $3 = $15

[DO] **Complete this table:**

| **Units** | **Private Cost** | **Private Profit** | **Social Cost** | **Social Benefit** | **Net Social Value** |
| --- | --- | --- | --- | --- | --- |
| 1 | $12 | $8 | $15 | $20 | $5 |
| 2 | $14 | $____ | $____ | $20 | $____ |
| 3 | $____ | $____ | $____ | $20 | $____ |
| 4 | $____ | $____ | $____ | $20 | $____ |
| 5 | $____ | $____ | $____ | $20 | $____ |

[DO] Private production level: ____ units [DO] Socially optimal level: ____ units

[DO] **Part B: Coasean Bargaining** (see week 4 session 1 reading to go deep into the Coasean-ness of this bargaining) Could families pay the factory to reduce from private to social optimum?

- Factory loses $____ in profit

- Families gain $____ from reduced pollution

- Is bargaining possible? ____

[THINK AND WRITE] **Part C: Why Bargaining Might Fail** Identify three reasons Coasean bargaining might fail in practice: (Write 1-2 sentences for each)

[THINK AND WRITE] **Part D: Informal Solutions** How might social norms and community pressure substitute for formal regulation? When would these be insufficient? (Write 4-5 sentences)

### Question 8: Information and Trust in Exchange (Light Guidance, More Independence)

A mechanic knows whether a repair *actually* costs $200 (simple, 60% probability) or $800 (major, 40% probability). Customers can't tell.

[DO] **Part A: Market Unraveling** Average price customers willing to pay given that lottery = $____

At this price:

- Simple repairs: Mechanic profit = $____, Accept? ____

- Major repairs: Mechanic profit = $____, Accept? ____

If only simple repairs are done, price falls to $____

[THINK AND WRITE] **Part B: Market Breakdown Analysis** Explain why this market fails and what happens to customers needing major repairs. (to go deep research 'Akerlof's market for Lemons') (Write 3-4 sentences)

[READ] **Part C: Reputation Calculation** In a small town, cheating gives $240 extra profit once but loses a customer worth $50/year forever (discount rate 10%).

[DO] Value of honest relationship = $____ [DO] Value of cheating once = $____ [DO] Optimal strategy: ____

[THINK AND WRITE] **Part D: When Reputation Works Well** List three conditions where reputation mechanisms might be particularly effective and explain why: (Write 2-3 sentences each)

Reflect on how this might explain differences in trust and informal cooperation across different communities and societies.

[THINK AND WRITE] **Part E: Digital Reputation Systems** How do online reviews (Yelp, Google) change the reputation game? What new problems arise? (Write 4-5 sentences)

## Part III: Collective Action and Informal Institutions (120 minutes)

### Question 9: Public Goods and Social Pressure (Partially Guided)

Eight neighbors consider contributing $50 each for streetlights. Each values lighting at $25 per contributor.

[READ] Example: If 2 contribute, each neighbor gets $50 benefit (whether they contributed or not)

[DO] **Part A: Complete the Free Rider Analysis**

| **Others contributing** | **My benefit if contribute** | **My net if contribute** | **My benefit if don't** | **My net if don't** | **Best choice** |
| --- | --- | --- | --- | --- | --- |
| 0 | $25 | $-25 | $0 | $0 | Don't |
| 2 | $____ | $____ | $____ | $____ | ____ |
| 4 | $____ | $____ | $____ | $____ | ____ |
| 6 | $____ | $____ | $____ | $____ | ____ |
| 7 | $____ | $____ | $____ | $____ | ____ |

[DO] Dominant strategy: ____________

[READ] **Part B: Adding Social Payoffs**

- Contributing when most do: +$10 (approval)

- Not contributing when most do: -$20 (disapproval)

- Contributing when few do: -$5 (sucker)

- Not contributing when few don't: $0

[DO] **Recalculate for 6 others contributing:**

- Net from contributing: $____ + $____ = $____

- Net from not contributing: $____ - $____ = $____

- Better choice: ____

[THINK AND WRITE] **Part C: How Norms Create Cooperation** Explain how social payoffs change the equilibrium and what this reveals about informal institutions. (Write 4-5 sentences)

### Question 10: Parametric Analysis - Enforcement (Independent Work)

Two firms choose Comply (cost $100) or Cheat (cost $0 unless caught). Fine if caught = $500. Detection probability = p.

[DO] **Part A: Build the Parametric Game**

                Firm B

             Comply    Cheat

Firm A  Comply  (**,**)    (**,**) 

        Cheat   (**,**)    (**,**)

[DO] **Part B: Find Equilibria for Different p Values** When p = 0: Equilibrium = ____________ When p = 0.1: Equilibrium = ____________ When p = 0.3: Equilibrium = ____________

[DO] **Part C: Critical Threshold** At what value of p does equilibrium shift? p* = ____

[THINK AND WRITE] **Part D: Institutional Design Insights** What does this reveal about enforcement design? Consider the relationship between fine size, detection probability, and compliance. (Write 4-5 sentences)

### Question 11: Common Pool Resources (Mostly Independent)

[READ] Twelve fishers share a lake. Each chooses low or high intensity fishing. The table shows catches based on total high-intensity fishers:

| **High-intensity fishers** | **Catch per high** | **Catch per low** | **Total catch** |
| --- | --- | --- | --- |
| 0 | - | 15 | 180 |
| 3 | 14 | 14 | 168 |
| 6 | 12 | 12 | 144 |
| 9 | 10 | 6 | 108 |
| 12 | 8 | - | 96 |

[DO] **Part A: Individual Rationality** If 8 others fish high intensity (interpolate from table):

- Your payoff from high: ____

- Your payoff from low: ____

- Your choice: ____

[DO] Equilibrium outcome: ____________ [DO] Efficient outcome: ____________

[THINK AND WRITE] **Part B: Ostrom's Community Management** The community implements: shared norms, monitoring, graduated sanctions, conflict resolution. Explain how each changes the strategic calculation. (Write 2-3 sentences per mechanism)

[THINK AND WRITE] **Part C: Limits of Informal Management** When do these informal mechanisms fail? Consider group size, interaction frequency, and exit options. Try to use the language used in this problem set appropriately (e.g. critical thresholds, nash equilibria, etc) (Write 4-5 sentences)

### Question 12: Free Speech and Campus Governance (Fully Independent)

[READ] A university balances free expression with an inclusive environment. Students choose Speak Freely or Self-Censor. Administration chooses Strict Codes or Permissive Policy.
Payoffs given:

- Speak + Permissive: (8, 6)

- Speak + Strict: (2, 2)

- Censor + Permissive: (4, 4)

- Censor + Strict: (1, 3)

[DO] **Part A: Construct and Analyze**
Assume for now that we can treat students as one actor, and administration as another.

Draw the matrix: ____________ Find all Nash equilibria: ____________

[THINK AND WRITE] **Part B: Institutional Design** The university wants open dialogue AND inclusion. Design an alternative institution that might achieve both. (Write 4-5 sentences)

[THINK AND WRITE] **Part C: The Case for ****"****Anarchy****"** When might unregulated speech norms work better than formal codes? Consider enforcement costs, community dynamics, and unintended consequences when we relax the assumption in part A. (Write 5-6 sentences)

## Part IV: Synthesis - When Are Formal Institutions Essential? (60 minutes)

### Question 13: Scaling Problems (Independent Synthesis)

[DO] **Part A: Complete the Scaling Table**

| **Group Size** | **Monitoring Costs** | **Reputation Value** | **Social Pressure** | **Cooperation Likelihood** |
| --- | --- | --- | --- | --- |
| 2-5 | Low | High | High | High |
| 10-20 | ____ | ____ | ____ | ____ |
| 100+ | ____ | ____ | ____ | ____ |
| 1000+ | ____ | ____ | ____ | ____ |

[THINK AND WRITE] **Part B: Institutional Transition** Explain why informal institutions become inefficient and for many goals insufficient as groups grow. Address monitoring, reputation, social pressure, and coordination in game theoretic and natural language. (Write 5-6 sentences)

### Question 14: Mathematical Commons Analysis (Optional Advanced)

[READ] Consider n fishers where each can choose high or low intensity fishing. When k fishers choose high intensity:

- Each high-intensity fisher catches: (15-k) fish

- Each low-intensity fisher catches: (12-k) fish

This captures how overfishing affects everyone, but high-intensity fishers still catch more than low-intensity ones at any level of total fishing pressure.

[DO] **Part A: Prove High is Dominant** Show that high intensity is always preferred regardless of others' choices. (Hint: If k others fish high intensity and you choose high, you get (15-(k+1)) = (14-k). If you choose low with k others high, you get (12-k). Compare these.)

[DO] **Part B: Calculate Welfare Loss** For different group sizes, calculate the tragedy of the commons:

For n = 4:

- Equilibrium (all high): Each gets ____, Total = ____

- Efficient (all low): Each gets ____, Total = ____

- Deadweight loss = ____

For n = 8:

- Equilibrium: Each gets ____, Total = ____

- Efficient: Each gets ____, Total = ____

- Deadweight loss = ____

For n = 12:

- Equilibrium: Each gets ____, Total = ____

- Efficient: Each gets ____, Total = ____

- Deadweight loss = ____

For n = 20:

- Equilibrium: Each gets ____, Total = ____

- Efficient: Each gets ____, Total = ____

- Deadweight loss = ____

[THINK AND WRITE] **Part C: Institutional Implications** What does the relationship between group size and welfare loss suggest about institutional needs at different scales? (Write 4-5 sentences)

### Question 15: Reflection - Understanding Social Equilibria (Completely Independent)

[THINK AND WRITE] Choose **ONE** of the following (400 words):

**Option A: Equilibrium Shifts and Institutional Change** Throughout this problem set, you've seen how the same people in the same situation can end up in completely different stable patterns (equilibria) depending on the institutional context. Choose one example from the problem set and explain how changing the "rules of the game" shifted the equilibrium outcome. What does this suggest about why societies invest in building and maintaining institutions? What are the costs and benefits of these efforts?

**Option B: When ****"****Anarchy***"**** Might Be Preferable**
Despite the cooperation problems we've analyzed, there are domains where societies deliberately choose less institutional control—speech, lifestyle choices, innovation, personal relationships. Using the analytical tools from this problem set, explain when and why we might prefer "anarchic" solutions even if they seem less efficient. What hidden costs might formal institutional solutions create?

**Option C: Climate Action and Institutional Realism** Based on your analysis of the arms race and commons problems, what does game theory suggest about the prospects for global climate action? Are the main obstacles technical (finding the right policies) or institutional (overcoming coordination problems)? How should this analysis influence climate advocacy and policy design? What role might informal institutions (social movements, norms) play alongside formal agreements?

**Option D: Digital Age Equilibria** The internet has created new strategic environments—online marketplaces, social media, digital communities. Based on the patterns you've studied, what new equilibria do you observe emerging online? How do digital institutions (algorithms, rating systems, platform rules) shape behavior differently than traditional institutions? What problems might these new equilibria create for society?