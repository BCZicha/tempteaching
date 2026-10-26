# Problem Set 2 Answer Key: Game Theory - Anarchic to Ordered Equilibria

## Complete Solutions with Explanations

## Learning Objectives and Overview

This problem set teaches game theory as a tool for understanding institutional problems. By completing it, you will:

- Use game theory to understand why cooperation often fails without institutions

- Discover how informal norms, reputation, and social enforcement can change strategic outcomes

- Analyze why markets fail in specific circumstances and when informal solutions break down

- Connect individual strategic behavior to broader questions about when we need formal institutions

**Key Theme:** Throughout this problem set, we explore how rational individual behavior can produce collectively undesirable outcomes—and how institutions (both informal and formal) can shift equilibria toward better collective outcomes.

## Part I: Foundation - Building Game Theory Skills (90 minutes)

### Teaching Box: How to Build a Game from a Verbal Description

When converting a real situation into game theory:

- **Identify players**: Who makes decisions?

- **List strategies**: What can each player choose?

- **Calculate payoffs**: For each combination of strategies, what does each player get?

- **Build the matrix**: Organize payoffs with Player A's strategies as rows, Player B's as columns

- **Analyze equilibrium**: Find where neither player wants to change their strategy

### Question 1: Market Entry and Competition (Heavily Guided)

*Two entrepreneurs consider opening restaurants in a small town that can really only support one profitable restaurant.*

*Setup: Opening a restaurant costs $50,000. If you're the only restaurant, you earn $80,000 profit. If both open, you each lose $10,000 due to competition.*

#### Part A: Constructing the Payoff Matrix

**Step-by-step calculations:**

If A opens and B doesn't:

- A gets revenue $80,000 - cost $50,000 = **$30,000 profit**

- *Rationale: A is the only restaurant, earns full revenue*

If B opens and A doesn't:

- B gets revenue $80,000 - cost $50,000 = **$30,000 profit**

- *Rationale: B is the only restaurant, earns full revenue*

If both open:

- Each gets revenue $40,000 - cost $50,000 = **-$10,000 loss**

- *Rationale: Competition splits the market, neither covers costs*

If neither opens:

- Each gets **$0**

- *Rationale: No revenue, no costs*

**Completed matrix (in thousands):**

|  | **Entrepreneur B** |  |
| --- | --- | --- |
|  | **Open** | **Don't Open** |
| **Entrepreneur A** |  |  |
| **Open** | (-10, -10) | (30, 0) |
| **Don't Open** | (0, 30) | (0, 0) |

#### Part B: Strategic Analysis

For Entrepreneur A:

- If B opens: A gets -$10,000 from opening vs. $0 from not opening → A prefers **Don't Open**

- If B doesn't open: A gets $30,000 from opening vs. $0 from not opening → A prefers **Open**

**A's dominant strategy: None exists**

**[Explanation]:** A dominant strategy requires one choice to be better regardless of what B does. Since A's best choice depends on B's action, no dominant strategy exists.

#### Part C: Nash Equilibrium Analysis

Checking each outcome systematically:

- **(Open, Open)**: Payoffs (-10, -10)

- Can A improve by switching to Don't Open? Yes: 0 > -10 ✗

- Not an equilibrium

- **(Open, Don't Open)**: Payoffs (30, 0)

- Can A improve? No: Don't Open gives 0 < 30 ✓

- Can B improve? No: Open gives -10 < 0 ✓

- **Nash Equilibrium**

- **(Don't Open, Open)**: Payoffs (0, 30)

- Can A improve? No: Open gives -10 < 0 ✓

- Can B improve? No: Don't Open gives 0 < 30 ✓

- **Nash Equilibrium**

- **(Don't Open, Don't Open)**: Payoffs (0, 0)

- Can A improve? Yes: Open gives 30 > 0 ✗

- Not an equilibrium

**Nash equilibria: (Open, Don't Open) and (Don't Open, Open)**

#### Part D: The Coordination Problem

*Unlike the prisoner's dilemma which has one inefficient dominant strategy equilibrium, this coordination game has two efficient equilibria where exactly one entrepreneur succeeds. The challenge is coordinating on who enters without binding agreements.*

*How might the entrepreneurs solve this coordination problem informally?*

- **First-mover advantage**: Whoever commits visibly first (signs lease, starts construction)

- **Market differentiation**: One focuses on Italian, other on Chinese cuisine

- **Communication**: Discuss intentions, though not legally binding

- **Signaling**: One entrepreneur might signal low interest or lack of funding

**Key Insight:** This game illustrates a coordination problem rather than a cooperation problem. Both equilibria are efficient—the challenge is selecting which one. This differs fundamentally from prisoner's dilemma where the equilibrium is inefficient. Many real-world situations involve coordination rather than pure conflict.

### Question 2: Building Your First Game from Scratch (Moderately Guided)

*Two farmers share irrigation water from a stream. Each must decide whether to use water Aggressively or Moderately.*

*Scenario: Using water aggressively gives a farmer 10 units of crop yield but reduces the downstream neighbor's yield by 6 units. Using water moderately gives 6 units of yield with no harm to the neighbor.*

**Important:** Farmer A is upstream, Farmer B is downstream. This means A's water use affects B, but B's water use doesn't affect A.

#### Part A: Identify the Strategic Elements

- Players: **Farmer A (upstream)** and **Farmer B (downstream)**

- Strategies for each: **Aggressive** or **Moderate** water use

- Does it matter who is upstream? **Yes - the upstream farmer's water use affects the downstream farmer but not vice versa, creating an asymmetric power relationship**

#### Part B: Calculate Payoffs

**Step-by-step reasoning:**

- Both moderate: A gets **6**, B gets **6**

- *Neither affects the other with moderate use*

- A aggressive, B moderate: A gets **10**, B gets **0**

- *A takes extra water (10 units), reducing B's available water by 6. B normally gets 6 from moderate use, but with A's reduction: 6 - 6 = 0*

- A moderate, B aggressive: A gets **6**, B gets **10**

- *A unaffected by downstream B's usage, B can take extra water*

- Both aggressive: A gets **10**, B gets **4**

- *A takes extra (10), B tries for 10 but loses 6 from A: 10 - 6 = 4*

#### Part C: Construct the Payoff Matrix

|  | **Farmer B** |  |
| --- | --- | --- |
|  | **Aggressive** | **Moderate** |
| **Farmer A** |  |  |
| **Aggressive** | (10, 4) | (10, 0) |
| **Moderate** | (6, 10) | (6, 6) |

#### Part D: Find the Equilibrium

For Farmer A:

- If B chooses Aggressive: A gets 10 (aggressive) vs. 6 (moderate) → Choose **Aggressive**

- If B chooses Moderate: A gets 10 (aggressive) vs. 6 (moderate) → Choose **Aggressive**

- **Aggressive is dominant strategy for A**

For Farmer B:

- If A chooses Aggressive: B gets 4 (aggressive) vs. 0 (moderate) → Choose **Aggressive**

- If A chooses Moderate: B gets 10 (aggressive) vs. 6 (moderate) → Choose **Aggressive**

- **Aggressive is dominant strategy for B**

**Nash equilibrium: (Aggressive, Aggressive) with payoffs (10, 4)**

#### Part E: Institutional Insight

*The upstream position creates an unfair advantage—A always gets 10 while B suffers from reduced water flow. This asymmetry suggests several potentially socially desirable institutions:*

- **Rotation system**: Farmers alternate upstream/downstream positions annually to share the advantage

- **Water quotas**: Limit upstream extraction to protect downstream users

- **Compensation mechanism**: Upstream farmer pays downstream for damages, turning (10,4) into (7,7) after transfers

- **Property rights clarification**: Clearly define water rights to prevent overextraction

**Key Insight:** Geographic and structural advantages create natural inequalities. The upstream farmer's position gives them power regardless of choices. Institutions often emerge to counteract such natural asymmetries, either through rotation, regulation, or compensation. This explains why water rights are among the most heavily regulated property rights globally.

### Teaching Box: Understanding Parameters in Games

Parameters are variables that affect payoffs but aren't chosen by players. They represent institutional features like:

- **s** = social cost of norm violation

- **p** = probability of detection/enforcement

- **f** = fine or penalty size

- **δ** = discount factor (how much future payoffs matter)

By varying parameters, we can find "critical thresholds"—specific values where the entire equilibrium shifts.

### Question 3: Introducing Parameters - Social Norms (Lightly Guided)

*Return to the irrigation farmers. Now suppose the community has a norm against aggressive water use, creating social disapproval worth -s units for anyone who uses water aggressively.*

#### Part A: Payoff Matrix with Parameters

The payoffs from Question 2 are modified by subtracting s from anyone choosing Aggressive:

|  | **Farmer B** |  |
| --- | --- | --- |
|  | **Aggressive** | **Moderate** |
| **Farmer A** |  |  |
| **Aggressive** | (10-s, 4-s) | (10-s, 0) |
| **Moderate** | (6, 10-s) | (6, 6) |

#### Part B: How Social Pressure Changes the Game

For Farmer A to prefer Moderate over Aggressive when B chooses Moderate:

- Need: 6 > 10 - s

- Therefore: s > **4**

For Farmer B when A chooses Moderate:

- Need: 6 > 10 - s

- Therefore: s > **4**

#### Part C: The Critical Threshold

**The equilibrium shifts from (Aggressive, Aggressive) to (Moderate, Moderate) when s = 4**

**[Explanation]:** When s < 4, both farmers still prefer aggressive use (10-s > 6). When s > 4, both prefer moderate use (6 > 10-s). At exactly s = 4, farmers are indifferent. This is the "critical threshold"—the precise point where behavior flips.

#### Part D: Institutional Design Insight

*Communities can shift destructive equilibria to cooperative ones by making norm violations sufficiently costly. The social cost doesn't need to be overwhelming—just s **>** 4 units changes everything from mutual aggression to mutual moderation.*

*Design challenges include:*

- **Establishing consensus**: Requires agreement on what constitutes "aggressive" use with clear, observable metrics

- **Monitoring costs**: Violations must be visible, requiring monitoring systems that grow costly with community size

- **Willingness to sanction**: Community members must overcome conflict avoidance to confront violators

- **Credibility**: Empty threats of disapproval won't change behavior—costs must be real

- **Maintenance over time**: New community members may not understand or value the norms without continuous reinforcement

**Key Insight:** Social norms act as parameter modifications that can completely flip equilibria. A community doesn't need to change people's fundamental self-interest—just add enough social cost to tip the balance. The critical threshold concept shows that small changes in social pressure can trigger dramatic behavioral shifts. This explains why some communities successfully manage resources while seemingly similar ones fail.

### Teaching Box: Calculating Present Values in Repeated Games

When payoffs occur over time, we calculate present value using discount factors:

**Simple Example:** If you receive $100 next year and δ = 0.9:

- Present value = $100 × 0.9 = $90

**Multiple Periods:** If you receive $100 every year for 3 years:

- Present value = $100 + $100(0.9) + $100(0.9)² = $271

**Finite Series:** For n years:

- Present value = $100 × (1-δⁿ)/(1-δ)

- Example with δ = 0.9 for 10 years: $100 × 6.513 = $651.30

**Infinite Series:** If you receive $100 every year forever:

- Present value = $100/(1-0.9) = $1000

**Alternating Payoffs:** If you receive $100 in odd years only:

- Present value = $100/(1-δ²) = $526 (with δ = 0.9)

### Question 4: Reputation in Repeated Interaction (Calculation Practice)

*Two competing fishing companies must decide each season whether to fish a profitable area. The area can sustain one company well ($30,000 profit) but if both fish there, overfishing means each loses $10,000. They interact for 10 years with discount factor δ = 0.9.*

#### Part A: Strategy Design

Consider this alternating strategy: "Company A fishes the area in odd years, Company B in even years. If anyone deviates from this pattern, both companies fish the area forever after (mutual punishment)."

#### Part B: Calculate Cooperation Payoff

If both follow the alternating strategy for 10 years, Company A's payoff stream: 30, 0, 30, 0, 30, 0, 30, 0, 30, 0

Calculate the present value for A: = 30 + 0(0.9) + 30(0.9)² + 0(0.9)³ + 30(0.9)⁴ + 0(0.9)⁵ + 30(0.9)⁶ + 0(0.9)⁷ + 30(0.9)⁸ + 0(0.9)⁹

Calculating each term: = 30 + 0 + 24.3 + 0 + 19.68 + 0 + 15.94 + 0 + 12.91 + 0 = **102.83**

#### Part C: Calculate Deviation Payoff

If A deviates and fishes every year:

- Year 1: Gets **30** (B doesn't fish as agreed)

- Years 2-10: Gets **-10** each year (both fish - mutual punishment)

Present value = 30 + (-10) × (0.9 + 0.9² + ... + 0.9⁹)

Using finite series formula:

- 0.9 + 0.9² + ... + 0.9⁹ = 0.9 × (1-0.9⁹)/(1-0.9)

- = 0.9 × 6.13 = 5.517

Total = 30 + (-10) × 5.517 = 30 - 55.17 = **-25.17**

#### Part D: Is Cooperation Sustainable?

Cooperation gives **102.83**, Deviation gives **-25.17** Therefore, cooperation is **sustainable**

#### Part E: The Role of the Future

*Repeated interaction enables cooperation because future consequences outweigh immediate temptations. In one-shot games, grabbing the profitable area yields 30 with no future cost. But with repetition, today's defection triggers tomorrow's punishment—the present value of eternal conflict (-25) is far worse than alternating cooperation (102.83).*

**Note on Backward Induction:** In reality, this cooperation would unravel through backward induction if the endpoint is fixed and certain. Knowing year 10 is definitively the last, both companies would defect then (no future punishment to fear). Anticipating year 10 defection, year 9 becomes effectively the 'last' cooperative period, so both defect then too. This logic cascades backward, potentially destroying cooperation from the start.

**Why cooperation might still occur despite this:**

- **Uncertain endpoints**: Companies might merge, regulations might extend the relationship

- **Reputation beyond this relationship**: Defecting here damages reputation with other potential partners

- **Behavioral factors**: Real humans often cooperate even in finitely repeated games (contrary to pure theory)

This illustrates why most real agreements avoid definite endpoints—indefinite duration preserves the shadow of the future that enables cooperation.

**Key Insight:** The "shadow of the future" enables cooperation by making today's defection costly tomorrow. The discount factor δ represents patience—higher δ means future matters more, supporting cooperation. But known endpoints create backward induction problems. This explains why employment contracts often have indefinite terms and why international agreements avoid fixed expiration dates.

### Teaching Box: Analyzing Multi-Player Games

When analyzing games with n players:

- **Set up the decision:** You are one of n players; there are (n-1) others

- **Consider what others do:** If each other chooses xi, total from others = (n-1) × xi

- **Find your best response:** What maximizes your payoff given others' choices?

- **Look for symmetric equilibrium:** Where everyone uses the same strategy

### Question 5: The Commons - First Multi-Player Game (Structured Analysis)

*Four farmers share a pasture. Each can graze 1 or 2 cattle.*

**Note on Equilibrium Complexity:** The original payoff structure creates an unstable game with no pure strategy Nash equilibrium. With the given payoffs, the system never settles—farmers would constantly want to switch strategies. While this instability itself is instructive (many commons do cycle through overuse and recovery), let's modify the payoffs slightly to create a clearer teaching example.

**Modified Payoff Structure:**

- Good nutrition if total ≤ 4: 1 cow → 8 profit, 2 cows → 12 profit

- Adequate nutrition if total = 5-6: 1 cow → 5 profit, 2 cows → 7 profit

- Poor nutrition if total ≥ 7: 1 cow → 2 profit, 2 cows → 0 profit

#### Part A: Individual Decision-Making

**If 3 others graze 1 cow each (3 total):**

- With 1 cow: Total = 4, nutrition = good, your payoff = **8**

- With 2 cows: Total = 5, nutrition = adequate, your payoff = **7**

- Your best choice: **1 cow** (8 > 7)

**If 3 others graze 2 cows each (6 total):**

- With 1 cow: Total = 7, nutrition = poor, your payoff = **2**

- With 2 cows: Total = 8, nutrition = poor, your payoff = **0**

- Your best choice: **1 cow** (2 > 0)

#### Part B: Finding Equilibrium

**Check ****"****all graze 1****"**** (total = 4):**

- Each gets 8

- If one deviates to 2: total becomes 5, deviator gets 7 < 8

- **This IS a Nash equilibrium** (no one wants to deviate)

**Check ****"****2 graze 1, 2 graze 2****"**** (total = 6):**

- 1-cow farmers get 5 each

- 2-cow farmers get 7 each

- If 1-cow farmer switches to 2: total becomes 7, gets 0 < 5 ✓ Won't switch

- If 2-cow farmer switches to 1: total becomes 5, gets 5 < 7 ✓ Won't switch

- **This IS a Nash equilibrium**

**Results:**

- **Efficient equilibrium:** All graze 1 cow (total welfare = 32)

- **Inefficient equilibrium:** 2 farmers graze 1, 2 graze 2 (total welfare = 24)

#### Part C: The Commons Problem

*This modified version shows how commons often have multiple equilibria. While everyone grazing moderately (1 cow each) would be best and IS stable if achieved, there's also an inferior equilibrium where some overgraze. Which equilibrium emerges depends on history, communication, and institutions. This multiplicity of equilibria—one efficient but fragile, one inefficient but stable—characterizes many real commons problems.*

**Key Insight:** Commons problems often have multiple equilibria with different welfare implications. The efficient equilibrium (all moderate) exists but may be hard to reach without coordination. The inefficient equilibrium (mixed grazing) can persist even though everyone would be better off at the efficient point. This shows why commons management isn't just about preventing tragedy—it's about coordinating to reach and maintain the better equilibrium.

### Question 6: From State of Nature to International Anarchy (Independent Analysis)

*Two individuals in a state of nature (no government) must decide whether to Arm themselves or remain Peaceful. Arming costs 20 units. If both remain peaceful, payoff = 0. If one arms while other doesn't, armed gets +30, peaceful gets -50. If both arm, both get -20.*

#### Part A: Construct the Game

|  | **Person B** |  |
| --- | --- | --- |
|  | **Arm** | **Peaceful** |
| **Person A** |  |  |
| **Arm** | (-20, -20) | (30, -50) |
| **Peaceful** | (-50, 30) | (0, 0) |

**Nash equilibrium: (Arm, Arm)**

- Neither wants to switch to Peaceful (would get -50 instead of -20)

**Efficient outcome: (Peaceful, Peaceful)**

- Total welfare: 0 > -40 from mutual arming

#### Part B: Scaling to Nations

The same strategic structure applies to nations:

|  | **Nation B** |  |
| --- | --- | --- |
|  | **Build Military** | **Demilitarized** |
| **Nation A** |  |  |
| **Build** | (-100, -100) | (150, -250) |
| **Demilitarized** | (-250, 150) | (0, 0) |

The logic remains identical—each actor fears exploitation if they don't arm/build military.

#### Part C: Methodological Question

*Note: This analysis simplifies by treating nations as unitary actors, which works when:*

- **Strong internal consensus exists** on security issues (e.g., US after Pearl Harbor)

- **Foreign policy is controlled by cohesive elite** with aligned interests (authoritarian regimes)

- **Institutional structures ensure consistency** despite leadership changes (NATO commitments)

- **Analysis timeframe exceeds electoral cycles**, smoothing domestic variation

*The assumption breaks down during:*

- Civil conflicts with competing power centers

- Economic vs. security interest divergence

- Democratic transitions with contested foreign policy

- Short-term crises where individual leader psychology matters

#### Part D: Why International Anarchy Persists

*Unlike individuals who can create governments with monopoly on legitimate violence, nations exist in true anarchy with no enforceable authority above sovereignty. The UN lacks independent enforcement power. The most powerful nations that built military capacity benefit from current arrangements and won't accept constraints. Geographic fixity means nations must live with neighbors forever, making the security dilemma inescapable. Treaties remain **"**scraps of paper**"** without enforcement mechanisms.*

**Key Insight:** The security dilemma at both individual and international levels shows why Hobbes's "state of nature" leads to arms races. The tragic irony: mutual security (peace) is best for all, but fear of exploitation drives universal armament. This explains both why humans create governments (to escape individual anarchy) and why international relations remain anarchic (no world government exists). The same game theory explains village formation and NATO.

## Part II: Market Failures and Informal Solutions (90 minutes)

### Question 7: Externalities and Neighbor Relations (Guided Calculation, Independent Analysis)

*A factory produces goods with marginal cost MC(q) = 10 + 2q. Market price is $20. Each unit creates $3 of total pollution damage distributed across 5 families.*

#### Part A: Private vs. Social Calculation

| **Units** | **Private Cost** | **Private Profit** | **Social Cost** | **Social Benefit** | **Net Social Value** |
| --- | --- | --- | --- | --- | --- |
| 1 | $12 | $8 | $15 | $20 | $5 |
| 2 | $14 | $6 | $17 | $20 | $3 |
| 3 | $16 | $4 | $19 | $20 | $1 |
| 4 | $18 | $2 | $21 | $20 | -$1 |
| 5 | $20 | $0 | $23 | $20 | -$3 |

*Note: Social cost = Private cost + $3 (total pollution damage to all families)*

**Private production level: 4 or 5 units** (produce while profit ≥ 0) **Socially optimal level: 3 units** (produce while net social value > 0)

#### Part B: Coasean Bargaining

- Factory loses **$2** profit (unit 4's profit)

- Families gain **$3** from reduced pollution (avoiding unit 4's externality)

- Is bargaining possible? **Yes** (gains exceed losses)

#### Part C: Why Bargaining Might Fail

- **Transaction costs**: Getting 5 families to coordinate, agree on payment shares, and monitor compliance might cost more than the $3 benefit

- **Free rider problem**: Each family benefits regardless of payment, creating incentive to wait for others to pay

- **Information asymmetry**: Factory might exaggerate costs, families might understate willingness to pay

#### Part D: Informal Solutions

*Social norms and community pressure can substitute for formal regulation when communities are small enough for reputation to matter. Public shaming of polluters, boycotts of factory products, and social exclusion of owners can internalize externalities. These mechanisms become insufficient as communities grow (anonymity), when factories sell to distant markets (boycotts ineffective), or when pollution is invisible (hard to attribute). The key is whether social costs can be made large enough to change behavior—requiring both detection and willingness to impose sanctions.*

**Key Insight:** Externalities represent a gap between private and social costs. While Coase theorem suggests private bargaining could solve this, real-world transaction costs often prevent efficient bargaining. Informal institutions (norms, reputation) can sometimes fill this gap, but their effectiveness depends on community size, information flow, and social cohesion. This explains why pollution problems are manageable in villages but require regulation in cities.

### Question 8: Information and Trust in Exchange (Light Guidance, More Independence)

*A mechanic knows whether a repair actually costs $200 (simple, 60% probability) or $800 (major, 40% probability). Customers can't tell.*

#### Part A: Market Unraveling

Average price customers willing to pay = 0.6 × $200 + 0.4 × $800 = **$440**

At this price:

- Simple repairs: Mechanic profit = $440 - $200 = **$240**, Accept? **Yes**

- Major repairs: Mechanic profit = $440 - $800 = **-$360**, Accept? **No**

If only simple repairs are done, price falls to **$200**

#### Part B: Market Breakdown Analysis

*This market unravels through adverse selection, as Akerlof demonstrated with used cars. At the average price of $440, mechanics lose money on major repairs so reject them. Knowing this, rational customers only pay $200 (the cost of simple repairs). This destroys the market for major repairs—even customers desperately needing $800 repairs can't get them, though both parties would gladly transact at the true $800 cost. Information asymmetry causes complete market failure.*

#### Part C: Reputation Calculation

In a small town, cheating gives $240 extra profit once but loses a customer worth $50/year forever (discount rate 10%):

- Value of honest relationship = $50/0.10 = **$500**

- Value of cheating once = **$240**

- Optimal strategy: **Be honest** ($500 > $240)

#### Part D: When Reputation Works Well

- **Small, stable communities**: Information spreads quickly through overlapping social networks; cheating one customer means losing dozens

- **Frequent repeat interactions**: Monthly maintenance makes customer stream valuable—worth $2000 over 20 years at 10% discount rate

- **Professional networks with high information flow**: Specialized markets (racing, classic cars) share information obsessively; one bad review reaches entire customer base

#### Part E: Digital Reputation Systems

*Online reviews (Yelp, Google) expand reputation mechanisms beyond local communities, making reputation portable and permanent. However, new problems arise: fake reviews (businesses boosting themselves or sabotaging competitors), selection bias (only extremely satisfied/dissatisfied customers review), context collapse (nuanced situations reduced to star ratings), and platform manipulation. The key challenge is maintaining trust in the reputation system itself—a meta-reputation problem.*

**Key Insight:** Information asymmetry can completely destroy markets, as shown by the "lemons" problem. Reputation mechanisms can restore trust by making future relationship value exceed one-time cheating gains. While complete market unraveling is the theoretical prediction, reality often shows partial separation through warranties, certifications, or observable quality signals. However, these mechanisms are costly and imperfect, explaining why information asymmetry remains a major source of market inefficiency even with modern technology. Digital platforms scale reputation beyond Dunbar's number but introduce new vulnerabilities. The fundamental tension: reputation requires repeated interaction and information flow, but these conditions naturally limit market size.

## Part III: Collective Action and Informal Institutions (120 minutes)

### Question 9: Public Goods and Social Pressure (Partially Guided)

*Eight neighbors consider contributing $50 each for streetlights. Each values lighting at $25 per contributor.*

#### Part A: Complete the Free Rider Analysis

| **Others contributing** | **My benefit if contribute** | **My net if contribute** | **My benefit if don't** | **My net if don't** | **Best choice** |
| --- | --- | --- | --- | --- | --- |
| 0 | $25 | -$25 | $0 | $0 | Don't |
| 2 | $75 | $25 | $50 | $50 | Don't |
| 4 | $125 | $75 | $100 | $100 | Don't |
| 6 | $175 | $125 | $150 | $150 | Don't |
| 7 | $200 | $150 | $175 | $175 | Don't |

**Dominant strategy: Don't contribute**

- At every level, free riding gives $25 more than contributing

#### Part B: Adding Social Payoffs

Social payoffs:

- Contributing when most do: +$10 (approval)

- Not contributing when most do: -$20 (disapproval)

**With 6 others contributing:**

- Material payoff from contributing: $175 (benefit) - $50 (cost) = $125

- Material payoff from not contributing: $150 (benefit) - $0 (cost) = $150

- Adding social payoffs:

- Net from contributing: $125 + $10 (approval) = **$135**

- Net from not contributing: $150 - $20 (disapproval) = **$130**

- Better choice: **Contribute** (social pressure flips the incentive!)

#### Part C: How Norms Create Cooperation

*Social payoffs transform the strategic structure. Pure material incentives create a dominant strategy to free-ride—you're always $25 better off not contributing. But social rewards/punishments create conditional cooperation: when most contribute, approval for contributing (+$10) combined with shame for free-riding (-$20) provides a $30 swing that overcomes the $25 material temptation. This generates two equilibria: everyone contributes (sustained by social enforcement) or no one does (no pressure when few contribute). The key is making social costs credible and visible.*

**Key Insight:** Public goods suffer from free-rider problems because individual contribution costs exceed individual benefits. Social norms solve this by adding non-material payoffs that tip the balance. The effectiveness depends on community cohesion (do people care about neighbors' opinions?), visibility (can contributions be observed?), and norm strength (is disapproval costly?). This explains why public radio succeeds through pledge drives (public recognition) while anonymous contributions fail.

### Question 10: Parametric Analysis - Enforcement (Independent Work)

*Two firms choose Comply (cost $100) or Cheat (cost $0 unless caught). Fine if caught = $500. Detection probability = p.*

#### Part A: Build the Parametric Game

|  | **Firm B** |  |
| --- | --- | --- |
|  | **Comply** | **Cheat** |
| **Firm A** |  |  |
| **Comply** | (-100, -100) | (-100, 0) |
| **Cheat** | (0, -100) | (-500p, -500p) |

*Note: The payoff (-500p, -500p) when both cheat represents the expected cost: probability p of being caught times fine of $500*

#### Part B: Find Equilibria for Different p Values

- When p = 0: Equilibrium = **(Cheat, Cheat)** (no risk, cheating free)

- When p = 0.1: Equilibrium = **(Cheat, Cheat)** (expected cost 50 < 100)

- When p = 0.3: Equilibrium = **(Comply, Comply)** (expected cost 150 > 100)

#### Part C: Critical Threshold

At equilibrium shift: Expected cost of cheating = Cost of compliance

- 500p = 100

- p* = **0.2** (20% detection probability)

#### Part D: Institutional Design Insights

*This reveals efficient enforcement design: perfect detection isn't necessary. With fines 5× compliance cost, just 20% detection probability ensures compliance. The relationship p × f = compliance cost shows perfect substitutability—halving detection requires doubling fines. This explains enforcement strategies: parking uses frequent, small fines (high p, low f); tax agencies use rare, devastating audits (low p, high f). The key principle: expected penalty must exceed violation benefit. Resource-constrained regulators optimize the p-f combination to minimize monitoring costs while maintaining deterrence.*

**Key Insight:** Enforcement doesn't require catching every violation—it requires making expected penalties exceed benefits. The critical threshold concept shows precise tipping points where behavior shifts. This analysis assumes risk-neutral firms caring only about expected values. Risk-averse firms would comply at lower detection probabilities—a firm fearing bankruptcy from the $500 fine might comply even at p=0.1. This explains why regulators often set fines high enough to threaten firm survival, leveraging risk aversion to improve compliance without intensive monitoring. Institutional designers face a tradeoff: intensive monitoring (high p) is expensive but allows smaller penalties; rare enforcement (low p) is cheap but requires severe penalties that may seem unfair.

### Question 11: Common Pool Resources (Mostly Independent)

*Twelve fishers share a lake. Each chooses low or high intensity fishing.*

**Note on the Original Table Problem:** The original table had a conceptual flaw: it showed low-intensity fishers getting different catches based on how many others fished high-intensity. This doesn't make sense—if you choose low intensity, your catch shouldn't directly depend on exactly how many others choose high. Here's the corrected version:

**Corrected Table:**

| **High-intensity fishers** | **Catch per high** | **Catch per low** | **Total catch** |
| --- | --- | --- | --- |
| 0 | - | 15 | 180 |
| 1 | 16 | 14 | 170 |
| 2 | 15 | 13 | 173 |
| 3 | 14 | 12 | 150 |
| 4 | 13 | 11 | 140 |
| 5 | 12 | 10 | 130 |
| 6 | 11 | 9 | 120 |
| 7 | 10 | 8 | 110 |
| 8 | 9 | 7 | 100 |
| 9 | 8 | 6 | 90 |
| 10 | 7 | 5 | 80 |
| 11 | 6 | 4 | 70 |
| 12 | 5 | - | 60 |

#### Part A: Individual Rationality

If 8 others fish high intensity:

- Your payoff from high (becoming 9th): **8** fish

- Your payoff from low (staying at 8 high total): **7** fish

- Your choice: **High intensity** (8 > 7)

To verify dominant strategy, check another case - if 3 others fish high:

- Your payoff from high (becoming 4th): **13** fish

- Your payoff from low (staying at 3 high total): **12** fish

- Your choice: **High intensity** (13 > 12)

High intensity always yields 1 more fish than low intensity—it's dominant.

**Equilibrium outcome: All 12 fish high intensity (each gets 5 fish, total = 60)** **Efficient outcome: All 12 fish low intensity (each gets 15 fish, total = 180)**

The tragedy is stark: individual rationality leads to each getting 5 instead of 15.

#### Part B: Ostrom's Community Management

*Elinor Ostrom identified how communities successfully manage commons through:*

With the corrected numbers:

- **Shared norms**: Must create social disapproval > 1 fish (the advantage of high-intensity). Even small social costs could flip behavior since the individual gain is minimal.

- **Monitoring**: Critical because the gain from cheating (1 extra fish) is small—easy to deter if detection is certain.

- **Graduated sanctions**: First violation = warning (reputation damage worth 2 fish), second = temporary exclusion (lose 5 fish/day), third = permanent ban (lose all future fishing).

- **Conflict resolution**: Especially important given the small margins—disputes over whether someone was using "high" vs "low" intensity could destroy cooperation over mere 1-fish differences.

#### Part C: Limits of Informal Management

*The narrow advantage (only 1 fish) makes this both easier and harder to manage:*

- **Easier**: Small social pressure can overcome small temptation

- **Harder**: Small violations are hard to detect and seem trivial ("it's just one extra fish")

*As group size increases, detection becomes impossible for such marginal differences. With 150+ fishers, no one can track whether each boat is using slightly higher intensity. In game theory terms: detection probability p→0, discount factor δ→0, and social cost s→0 as anonymity increases. The Nash equilibrium inevitably shifts to universal high-intensity fishing, with total catch collapsing from potential 180 to actual 60. This explains why village-managed forests succeed while open-ocean fisheries collapse without government quotas.*

**Key Insight:** The tragedy of the commons often involves surprisingly small individual advantages that aggregate to massive collective losses. Here, each fisher gains only 1 extra fish by choosing high intensity, but this "trivial" advantage drives total catch down by 67%. Ostrom's work shows that commons tragedies aren't inevitable—communities can self-organize sustainable management. But this requires specific conditions: small groups, repeated interaction, low exit costs, and clear boundaries. As any parameter weakens, informal management fails. This explains the institutional diversity we observe: village wells managed by custom, regional fisheries by co-ops, and international waters by treaties—each scale demands different institutional forms.

### Question 12: Free Speech and Campus Governance (Fully Independent)

*A university balances free expression with inclusive environment. Students choose Speak Freely or Self-Censor. Administration chooses Strict Codes or Permissive Policy.*

*Note: This simplifies by treating **"**students**"** as a single actor, though in reality student preferences are highly heterogeneous. The payoff numbers represent utility points combining factors like intellectual freedom, campus harmony, administrative ease, and student wellbeing.*

#### Part A: Construct and Analyze

|  | **Administration** |  |
| --- | --- | --- |
|  | **Strict** | **Permissive** |
| **Students** |  |  |
| **Speak** | (2, 2) | (8, 6) |
| **Censor** | (1, 3) | (4, 4) |

**Finding Nash equilibria:**

- (Speak, Strict): Students prefer Speak (2>1)✓, Admin prefers Permissive (6>2)✗

- (Speak, Permissive): Students prefer Speak (8>4)✓, Admin prefers Permissive (6>2)✓

- (Censor, Strict): Students prefer Speak (2>1)✗

- (Censor, Permissive): Students prefer Speak (8>4)✗

**Single Nash equilibrium: (Speak Freely, Permissive Policy)**

#### Part B: Institutional Design

*The university could create tiered environments: classrooms emphasize respectful discourse (modifying payoffs toward (7,7) through moderation norms) while debate forums welcome controversy. Student-led mediation replaces administrative enforcement, reducing adversarial dynamics. Time-place-manner regulations allow controversial content in appropriate venues with notice. Graduated responses (dialogue → mediation → sanctions) replace binary punishment. This modifies payoffs to reduce discomfort in Speak+Permissive while avoiding the chilling effects of Strict codes.*

#### Part C: The Case for "Anarchy"

*Unregulated speech norms work better when communities share sufficient values for self-regulation. Formal codes create enforcement costs and adversarial relationships. When we relax the unitary actor assumption, different groups maintain distinct successful norms—engineering students, poetry clubs, and debate teams each develop appropriate standards without mandates. Formal codes risk selective enforcement, can't capture context, and drive controversial speech underground. The **"**inefficiency**"** of anarchy—occasional discomfort and conflict—may be preferable to the rigidity and relationship damage of formal control. Sometimes messy freedom beats orderly control.*

**Key Insight:** Not all coordination problems require formal institutions. When groups share sufficient common values and repeated interaction, informal norms can achieve better outcomes than rules. The key is matching institutional formality to the problem: high-stakes irreversible decisions need formal process, while everyday social interactions often work better through evolving norms. This explains why universities have formal procedures for grades but informal norms for classroom discussion.

## Part IV: Synthesis - When Are Formal Institutions Essential? (60 minutes)

### Question 13: Scaling Problems (Independent Synthesis)

#### Part A: Complete the Scaling Table

| **Group Size** | **Monitoring Costs** | **Reputation Value** | **Social Pressure** | **Cooperation Likelihood** |
| --- | --- | --- | --- | --- |
| 2-5 | Low | High | High | High |
| 10-20 | Medium | Medium | Medium | Medium |
| 100+ | High | Low | Low | Low |
| 1000+ | Very High | Very Low | Negligible | Very Low |

#### Part B: Institutional Transition

*As groups grow, informal institutions fail through multiple reinforcing channels. Monitoring costs increase exponentially—watching 5 neighbors is easy, watching 500 impossible, so detection probability p→0. Reputation value decreases as repeat interaction probability falls, making discount factor δ→0. Social pressure requires caring about others' opinions, but anonymity eliminates shame, so social cost s→0. In game theory terms, all parameters sustaining cooperation deteriorate with scale. The Nash equilibrium shifts from cooperation to defection around 50-150 people (Dunbar's number), explaining why villages maintain commons while cities require police, courts, and regulations.*

**Key Insight:** Scale drives institutional formality. Small groups can rely on informal mechanisms (reputation, social pressure, repeat interaction) because the parameters naturally support cooperation. As groups grow, these parameters decay, requiring formal substitutes: contracts replace handshakes, courts replace community judgment, police replace social sanctions. The transition point—around Dunbar's number—represents where informal mechanisms' costs exceed their benefits.

### Question 14: Mathematical Commons Analysis (Optional Advanced)

*Consider n fishers where each chooses high or low intensity. When k fishers choose high:*

- *Each high-intensity fisher's profit: (15-k)*

- *Each low-intensity fisher's profit: (12-k)*

#### Part A: Prove High is Dominant

If k others fish high intensity:

- Your profit from high: 15-(k+1) = **14-k**

- Your profit from low: **12-k**

- Difference: (14-k) - (12-k) = **2**

**High intensity always yields exactly 2 more profit, regardless of others' choices. High intensity strictly dominates.**

#### Part B: Calculate Welfare Loss

| **Group Size (n)** | **Equilibrium** | **Each Gets** | **Total** | **Efficient** | **Each Gets** | **Total** | **Deadweight Loss** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 4 | All high | 11 | 44 | All low | 12 | 48 | 4 profit units |
| 8 | All high | 7 | 56 | All low | 12 | 96 | 40 profit units |
| 12 | All high | 3 | 36 | All low | 12 | 144 | 108 profit units |
| 20 | All high | -5 | -100 | All low | 12 | 240 | 340 profit units |

*Note: When n=20, profit = -5 means fishers lose money as costs exceed revenue due to resource depletion*

#### Part C: Institutional Implications

*The quadratic scaling of welfare loss (proportional to n²) reveals why different scales demand different institutions. With 4 fishers, the loss of 4 units is manageable through informal negotiation. With 20 fishers, the loss of 340 represents complete collapse—fishers actually lose money. Small groups can rely on social pressure since losses are minor. Large groups require external enforcement. This explains institutional diversity: village-managed woodlots, fishery cooperatives with quotas, and international treaties each match their scale.*

**Key Insight:** Welfare losses from coordination failures scale faster than linearly with group size. This creates sharp transitions where informal management suddenly becomes inadequate. The mathematical structure (n² scaling) explains why human institutions show discontinuous jumps in formality rather than smooth transitions—there are critical thresholds where informal mechanisms catastrophically fail.

## Question 15: Reflection - Understanding Social Equilibria

### Option A: Equilibrium Shifts and Institutional Change

*Throughout this problem set, you've seen how the same people in the same situation can end up in completely different stable patterns (equilibria) depending on the institutional context.*

The irrigation farmers game (Questions 2-3) perfectly illustrates how institutional changes fundamentally alter equilibria. Initially, with no institutions, both farmers use water aggressively, yielding (10,4)—the upstream farmer prospers while downstream suffers. This equilibrium is stable; neither farmer has incentive to change unilaterally.

Introducing social norms with parameter s transforms everything. When social disapproval reaches the critical threshold of s=4, the equilibrium shifts to both farmers using water moderately (6,6). The same rational farmers now make opposite choices—not because their rationality changed, but because the institutional context altered their payoff structure.

This reveals why societies invest heavily in institutions despite substantial costs. The irrigation example shows potential welfare improvement from 14 to 12 total, but more importantly, a shift from inequitable (10,4) to equitable (6,6) distribution. Scaled to real watersheds affecting thousands of farmers, preventing aquifer degradation justifies millions in institutional costs.

The costs are real: monitoring requires infrastructure, enforcement needs personnel, norm creation demands community investment. Yet remaining trapped in destructive equilibria proves far costlier. The commons problems demonstrate this starkly—resources that could support many in comfort degrade until everyone suffers.

Institutions are equilibrium-selection devices. They don't eliminate self-interest but change the game structure, allowing rational actors to coordinate on better outcomes. The repeated game analysis shows how the same profit-maximizing companies that would destroy resources in single interactions preserve them when institutional structures create future consequences for present choices.

This understanding illuminates both the power and difficulty of institutional reform. Small parameter changes can shift entire societies between radically different equilibria—enforcement probability increasing from 19% to 21% completely changes behavior. Yet those benefiting from current equilibria resist change, and coordination is needed to establish new parameters. This explains why institutional change often requires external pressure, crisis, or careful coalition-building to overcome entrenched interests.

### Option B: When "Anarchy" Might Be Preferable

Despite the cooperation problems analyzed, there are domains where societies deliberately choose less institutional control. Using our game-theoretic tools, we can understand when and why informal solutions might be superior.

The free speech game (Question 12) showed that formal strict codes, while reducing some conflicts, create worse outcomes than permissive policies. The equilibrium under strict codes (2,2) is Pareto-dominated by the permissive equilibrium (8,6). This suggests that the "messiness" of unregulated speech might be preferable to the order of censorship.

Formal institutions carry hidden costs beyond mere administration. They can crowd out intrinsic motivation—people who would cooperate from community spirit might defect when cooperation becomes compulsory. They reduce flexibility—formal rules can't adapt quickly to changing circumstances. They create adversarial relationships—what were neighbor disputes become legal battles.

Consider innovation environments. The market entry game showed coordination problems, but these very problems drive innovation as entrepreneurs differentiate to avoid direct competition. Too much coordination might reduce diversity and experimentation. Silicon Valley's "anarchic" culture of job-hopping and informal knowledge sharing, despite creating some inefficiencies, generates more innovation than highly regulated environments.

The mathematical analysis in Question 14 showed welfare losses scaling with n². But formal institutions also scale poorly—bureaucracy grows, enforcement becomes inconsistent, and rules become byzantine. Sometimes the inefficiency of anarchy is preferable to the inefficiency of bloated formal institutions.

The key insight: match institutional formality to the problem structure. High-stakes, irreversible decisions need formal process. But many human interactions—friendship, creativity, daily courtesy—work better through evolving norms than rigid rules. The art lies in knowing when to formalize and when to leave space for organic order.

### Option C: Climate Action and Institutional Realism

The arms race model (Question 6) perfectly parallels climate action dilemmas. Replace "Arm/Peaceful" with "Pollute/Green" and the structure remains: each nation fears economic disadvantage from unilateral action, creating a Nash equilibrium of universal pollution despite mutual benefit from coordination.

Game theory suggests the main obstacles are institutional, not technical. We have the technology for renewable energy; we lack mechanisms to overcome the free-rider problem. Each nation's dominant strategy is to let others bear mitigation costs while enjoying the global benefits—precisely the public goods problem from Question 9.

The critical threshold concept offers hope. Question 10 showed that 20% enforcement probability could ensure compliance. For climate, this might mean carbon border adjustments creating 20% probability of trade penalties for non-participants. The EU's carbon border mechanism attempts exactly this institutional innovation.

Informal institutions could prove crucial. The social pressure analysis showed how norms can flip equilibria when disapproval costs exceed defection benefits. The youth climate movement attempts to create such social costs, making climate inaction reputationally expensive for politicians and corporations. Greta Thunberg's "flight shaming" campaign explicitly weaponizes social pressure.

But scale remains problematic. Question 13's scaling analysis showed cooperation likelihood decreasing with group size. With 195 nations, monitoring is difficult, reputation effects are weak (nations interact infrequently on climate), and social pressure is minimal (sovereignty limits shaming). This suggests regional clubs (EU, ASEAN) might succeed where global agreements fail.

The repeated game analysis offers the most realistic path: start with small coalitions of willing nations, demonstrate benefits, and gradually expand membership. The Montreal Protocol's success with ozone followed exactly this trajectory—beginning with major producers, creating competitive advantages for members, and eventually achieving universal participation.

### Option D: Digital Age Equilibria

The internet has created entirely new strategic environments where traditional institutional analysis must be reconsidered. Our game theory tools reveal both opportunities and challenges in these digital spaces.

Consider online marketplaces (eBay, Amazon Marketplace). These solve the information asymmetry problem from Question 8 through digital reputation systems. Unlike small-town mechanics whose reputation was geographically limited, online sellers build global reputations. The parameters change dramatically: repeat interaction probability increases (same seller, many buyers), monitoring becomes automatic (every transaction rated), and social pressure gets quantified (star ratings).

But new equilibria emerge with their own problems. Fake review markets develop—a new asymmetric information game where buyers can't distinguish genuine from purchased reviews. Platform monopolies arise because reputation isn't portable—sellers get locked into platforms where they've built ratings. The market entry coordination problem intensifies as network effects create winner-take-all dynamics.

Social media creates unprecedented commons problems. Attention is the shared resource, and like the fishers in Question 11, each user's aggressive content (clickbait, outrage) depletes the common pool of meaningful discourse. The equilibrium: everyone shouts, nobody listens. The welfare loss scales beyond n²—with billions of users, the degradation is near-total.

Digital institutions evolve rapidly to address these problems. Algorithmic moderation replaces human monitoring, reducing costs but losing context. Cryptocurrencies attempt to create trust without institutions through cryptographic proof. Prediction markets try to overcome information asymmetries through betting mechanisms.

The key insight from our analysis: digital spaces aren't lawless frontiers but environments where institutional evolution happens at unprecedented speed. Each platform becomes a miniature government, setting rules that determine equilibria. The same strategic tensions exist—cooperation vs. defection, coordination vs. competition—but play out in milliseconds across global networks. Understanding these through game theory helps predict which digital institutions will succeed and which equilibria will emerge.

## Final Synthesis and Key Insights

This problem set demonstrates three fundamental principles:

### 1. Rational Individual Choice Often Produces Collective Irrationality

From irrigation farmers to fishing companies, we've seen how individually optimal decisions lead to collectively suboptimal outcomes. This isn't a failure of rationality—it's the predictable result of strategic interaction without coordination mechanisms.

### 2. Institutions Change Games, Not People

Social norms, reputation systems, and enforcement mechanisms don't make people altruistic. They change payoff structures so that selfish individuals choose cooperative behaviors. The same rational actors produce completely different outcomes under different institutional arrangements.

### 3. Scale Determines Institutional Form

Informal mechanisms (reputation, social pressure) work in small groups but fail as numbers grow. The transition from informal to formal institutions isn't arbitrary—it occurs at predictable thresholds where the parameters supporting informal cooperation decay below critical values.

**The Broader Lesson:** Game theory reveals why human societies are neither purely cooperative nor purely competitive, but instead create elaborate institutions to channel self-interest toward collective benefit. Understanding these mechanisms helps us design better institutions—not perfect ones that eliminate all problems, but pragmatic ones that achieve acceptable outcomes given human nature and strategic reality.

The evolution from anarchy to order isn't about controlling human nature but about structuring incentives so that rational self-interest aligns with collective welfare. Sometimes this requires formal institutions; sometimes informal norms suffice; sometimes "anarchy" is actually optimal. The art of governance lies in knowing which solution fits which problem—and game theory provides the analytical tools to make that determination.