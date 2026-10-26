# Problem Set 1 Answer Key: Rational Choice Foundations and Decision Theory

## Complete Solutions with Explanations

---

## Question 1: Model Components and Foundations

### Part A: Climate Activists Lobbying for Carbon Pricing

- **N (Actors):** Environmental advocacy groups, climate activist organizations
- **X (Outcomes):** {Carbon tax enacted, cap-and-trade system adopted, no carbon pricing policy, weak voluntary measures}
- **I (Instruments):** {Lobby legislators directly, organize public demonstrations, fund research studies, form coalitions with business groups, run media campaigns}
- **R (Rule):** Political process linking lobbying activities to policy outcomes — legislators respond to constituent pressure, media attention, and coalition strength

**Uncertainty:** Activists face uncertainty about which lobbying strategies will be most effective, how legislators will respond to different types of pressure, what counter-lobbying efforts opponents will mount, and what external events (economic crises, extreme weather) might shift political opportunities.

### Part B: Multinational Corporations and Renewable Investment

- **N (Actors):** Corporate executives, board members, shareholders
- **X (Outcomes):** {High returns from early renewable adoption, moderate returns, losses from stranded fossil assets, regulatory compliance costs}
- **I (Instruments):** {Invest heavily in renewables, gradual transition, maintain fossil focus, hedge with mixed portfolio}
- **R (Rule):** Market mechanism where investment choices interact with technological change, government policies, and competitor strategies to determine profitability

**Uncertainty:** Corporations face uncertainty about future energy prices, technological advancement rates, government policy changes, consumer demand shifts, and competitor actions.

### Part C: Small Island Nation Delegates

- **N (Actors):** National delegations, individual negotiators
- **X (Outcomes):** {Binding emissions targets with enforcement, voluntary commitments, adaptation funding secured, loss and damage compensation established}
- **I (Instruments):** {Form coalitions with other vulnerable states, offer policy concessions, threaten to withdraw from negotiations, appeal to moral arguments}
- **R (Rule):** International negotiation process where coalition-building and strategic concessions influence final agreement terms

**Uncertainty:** Delegates face uncertainty about other nations' true preferences, willingness to make concessions, domestic political constraints, and long-term commitment to any agreements reached.

---

## Question 2: Model Interpretation and Parameter Analysis

### Part A: Model Predictions

**Model A (Economic)** predicts that communities will adopt renewables when the expected savings from avoiding high energy costs outweigh the upfront investment costs. Wealthier communities with lower discount rates and higher ability to absorb upfront costs should adopt first. Adoption should increase as energy price volatility increases.

**Model B (Social Influence)** predicts the same economic logic but adds that communities are also influenced by neighboring communities' choices. This creates potential for adoption "cascades" where early adopters influence nearby communities, even if economic conditions alone wouldn't justify adoption.

### Part B: Parameter Analysis — Model A

**As p → 1:** The expected utility of keeping fossil fuels becomes EU(Keep Fossil) = U(-H), which is very negative. Meanwhile, EU(Adopt Renewables) ≈ U(S₁ - C). Since S₁ > H (savings exceed high costs), adoption becomes increasingly attractive.

**As C increases dramatically:** EU(Adopt Renewables) = p × U(S₁ - C) + (1-p) × U(S₂ - C) decreases because both U(S₁ - C) and U(S₂ - C) become smaller (possibly negative). Eventually, EU(Keep Fossil) > EU(Adopt Renewables) for most communities.

### Part C: Explaining the Wealth Puzzle

Model B can explain why some wealthy communities don't adopt while some resource-constrained communities do:

- Wealthy communities might have β ≈ 0 (low social influence weight) due to perceived independence, so they rely purely on economic calculations
- Resource-constrained communities might have high β values (strong community networks, high social learning) and high R values (many neighbors adopting), making β × R large enough to offset negative economic returns from high C costs relative to their budget constraints

### Part D: Social Influence Analysis

As β increases, the threshold for adoption decreases because the social benefit β × R becomes larger. The condition for adoption becomes: p × U(S₁ - C) + (1-p) × U(S₂ - C) + β × R > p × U(-H) + (1-p) × U(0)

If β becomes very large, the term β × R dominates, predicting that communities will adopt renewables almost entirely based on what neighbors do, regardless of economic conditions. This would create strong spatial clustering of adoption decisions.

### Part E: Present Bias Modification

If communities systematically underestimate p due to present bias, we replace p with p' = γ × p where γ < 1. The modified Model A becomes:

EU(Adopt Renewables) = γp × U(S₁ - C) + (1-γp) × U(S₂ - C)
EU(Keep Fossil) = γp × U(-H) + (1-γp) × U(0)

This reduces the perceived benefit of adoption because communities underweight future energy cost increases. The bias makes adoption less likely than economically optimal, requiring either lower costs C or higher social influence β × R to compensate.

---

## Questions 3–6: Building Your Own Decision-Theoretical Model

### Question 3 (Part A): Expected Utility Model Construction

**Step 1: Define Your Basic Components**

- **Actors (N):** N = {Water policy graduates from water-stressed regions, Water policy graduates from water-abundant regions}
- **Outcomes (X):** X = {Impact achieved, No impact achieved}
- **Instruments (I):** I = {Choose International Organization, Choose Domestic Government, Choose Private Sector}

**Step 2: State Your Key Assumptions**

- **Core Uncertainty:** Whether the position will successfully achieve meaningful water security impact
- **Preference Assumption:** Water-stressed graduates assign higher utility to achieving impact: U_ws(Impact) - U_ws(No impact) > U_wa(Impact) - U_wa(No impact)
- **Belief Assumption:** Water-stressed graduates assign higher probability to international organizations achieving impact: p_ws(Impact | International) > p_wa(Impact | International)

**Step 3: Write Your Expected Utility Equations**

***Important Note: You need to create plausible numbers that support your hypothesis. These are illustrative values, not empirically estimated parameters. Your numbers should: (1) create the predicted behavioral pattern, (2) be psychologically reasonable (avoid extremes like 0.99 or 0.01), and (3) show how both beliefs AND preferences contribute to different choices.***

**Choosing the Probabilities (Beliefs):**

For water-stressed graduates:

- EU_ws(International Org) = 0.8 × U_ws(Impact achieved) + 0.2 × U_ws(No impact)
  - *Why 0.8? They believe international orgs are highly effective because they've witnessed water crises and know these organizations have resources and track records in similar regions*
- EU_ws(Domestic Gov) = 0.4 × U_ws(Impact achieved) + 0.6 × U_ws(No impact)
  - *Why 0.4? Moderate effectiveness; local governments in water-stressed regions often lack resources*
- EU_ws(Private Sector) = 0.1 × U_ws(Impact achieved) + 0.9 × U_ws(No impact)
  - *Why 0.1? Very low; private companies focus on profit, not water security*

For water-abundant graduates:

- EU_wa(International Org) = 0.3 × U_wa(Impact achieved) + 0.7 × U_wa(No impact)
  - *Why 0.3? They're skeptical; haven't seen urgent need, may view these orgs as bureaucratic*
- EU_wa(Domestic Gov) = 0.5 × U_wa(Impact achieved) + 0.5 × U_wa(No impact)
  - *Why 0.5? Higher confidence in their well-functioning local institutions*
- EU_wa(Private Sector) = 0.1 × U_wa(Impact achieved) + 0.9 × U_wa(No impact)
  - *Why 0.1? Same as water-stressed; profit focus is universally recognized*

**Choosing the Utilities (Preferences):**

Water-stressed graduates:

- U_ws(Impact) = 100, U_ws(No impact) = 30
- *Why this 70-point gap? They've lived through water scarcity, so achieving impact feels essential (100) while failure feels terrible (30)*

Water-abundant graduates:

- U_wa(Impact) = 60, U_wa(No impact) = 40
- *Why this 20-point gap? Impact is nice but not personal (60), and failure isn't devastating since water security isn't urgent for them (40)*

**Step 4: State Your Hypothesis Mathematically**

Hypothesis: EU_ws(International) > EU_ws(Domestic) AND EU_ws(International) > EU_ws(Private) AND EU_wa(International) < MAX[EU_wa(Domestic), EU_wa(Private)]

Verification with our chosen numbers:

- Water-stressed: EU_ws(Int'l) = 0.8(100) + 0.2(30) = 86 > EU_ws(Dom) = 58 > EU_ws(Private) = 37
- Water-abundant: EU_wa(Dom) = 50 > EU_wa(Int'l) = 46 > EU_wa(Private) = 42

Hypothesis confirmed: The numbers we chose generate the predicted pattern where water-stressed graduates choose international organizations at higher rates.

*Note: Different numbers could work equally well. The key is maintaining the relationships: water-stressed graduates must have both higher belief in international org effectiveness AND larger utility gap between impact and no impact.*

### Question 4 (Part B): Data Challenge and Model Revision

**Variable Identification:**

- **Independent variable:** Region type (water-stressed vs abundant) AND field research experience
- **Dependent variable:** Career choice (international organization or not)
- **Intervening variable:** Field research experience on community water projects

**Model Revision:**

Field research affects BOTH beliefs and preferences for water-stressed graduates:

**Belief Update (Probability Change):**

- Water-stressed WITH field research: p(impact | international) increases from 0.8 to 0.95
- *Why 0.95? They've now seen direct evidence of successful interventions, moving from general belief to near-certainty*

**Preference Intensification (Utility Change):**

- U(Impact achieved) remains 100
- U(No impact) drops from 30 to 10
- *Why drop to 10? Seeing affected families makes failure feel much worse — it's no longer abstract*
- Utility gap increases from 70 to 90 points

**Why Field Research Only Affects Water-Stressed Graduates:**

Water-stressed graduates recognize their own communities in what they observe during field research. The water-scarce villages they study remind them of home, creating personal validation that international interventions can work in places like theirs, and emotional commitment to families facing familiar struggles. Water-abundant graduates lack this personal connection — the communities don't remind them of home — so field research has minimal effect.

**Updated Calculation:**

Water-stressed + field research: EU(Int'l) = 0.95(100) + 0.05(10) = 95.5

This dominates all other options, explaining the 81% selection rate.

### Question 5 (Part C): Hyperbolic Discounting Integration

**Adding Salary to the Model:**

For this question, we need both components:

- Impact satisfaction (uncertain and delayed): U(Impact) = 100, U(No impact) = 30
- Salary (certain and immediate): U(Moderate salary) = 40, U(High salary) = 70

Total utility is additive: U(total) = U(impact outcome) + U(salary level)

**At Graduation (t=0):**

Even with present bias (β > 0), the long-term cumulative value of impact work dominates:

- EU₀(International) ≈ Long-term value of (80 + 40) = 120 per period
- EU₀(Private) ≈ Long-term value of (30 + 70) = 100 per period
- Choose International ✓

**After 4 Years (t=4), Facing Switch Opportunity:**

**The Key Mechanism:**

- Immediate salary jump ($60k → $90k): 30 utils, NOT discounted
- Future impact satisfaction: Still heavily discounted by 1/(1+βt)

With β = 0.5:

- Immediate gain: 30 utils (full value)
- Next year's impact value: 80 × 0.95/1.5 ≈ 50 utils
- Year 10 impact value: 80 × 0.95¹⁰/6 ≈ 8 utils

The immediate 30-util gain can outweigh discounted future impact, triggering the switch.

**Why This Remains Rational Choice:** Time-inconsistent ≠ irrational. The individual maximizes utility at each point; the utility function itself changes over time due to hyperbolic discounting. This is a predictable, modelable preference structure.

### Question 6 (Part D): Model Evolution and Methodology

**Model Evolution Tracking:**

| Model Version | Key Assumptions | Prediction | What Data Revealed |
|---|---|---|---|
| **Initial Model** | Water-stressed: p(impact)=0.8, U gap=70; Water-abundant: p(impact)=0.3, U gap=20 | Water-stressed choose int'l orgs more | No difference (52% vs 49%) — missing something |
| **Revised Model** | Field research increases p→0.95 and U gap→90 for water-stressed only | Only water-stressed + field research choose int'l | Correct (81% vs 34%) — experience matters |
| **Final Model** | Present bias β>0 makes immediate rewards more salient | Initial choice ≠ retention | Career switching after 3–5 years — time inconsistency |

**Methodological Reflections:**

Most behavioral patterns can be incorporated through assumption modifications such as *heterogeneous types* (field research experience), *belief updating* (learning from observation), and *time-inconsistent preferences* (present bias) rather than abandoning the analytical framework. The value of rational choice lies in *providing systematic predictions that can be tested and refined*, not in *claiming people literally calculate expected utilities*.

---

## Question 7: Bias Mapping to Plott's Equation

| Bias/Heuristic | Primary Plott Component | Suggested Modeling Modification |
|---|---|---|
| Ease of recall | Beliefs | Replace objective probabilities with availability-weighted probabilities: p* = f(ease of recall) × p(objective) |
| Retrievability | Beliefs | Weight probabilities based on memory structure: p* = f(organizational accessibility) × p(objective) |
| Insensitivity to base rates | Beliefs | Update beliefs using representative information while underweighting prior probabilities |
| Insensitivity to sample size | Beliefs | Confidence in beliefs remains constant regardless of information quantity |
| Misconceptions of chance | Beliefs | Model systematic misunderstanding of randomness and probability |
| Regression to the mean | Beliefs | Underweight tendency for extreme values to moderate over time |
| The conjunction fallacy | Beliefs | Model probability assessments where P(A&B) > P(A) when B seems representative |
| The confirmation trap | Beliefs | Update beliefs asymmetrically — weight confirming evidence more heavily than disconfirming |
| Anchoring | Beliefs/Preferences | Initial reference point affects probability assessments or value functions |
| Conjunctive and disjunctive events bias | Beliefs | Overestimate probability of conjunctive events, underestimate disjunctive events |
| Hindsight and curse of knowledge | Beliefs | Ex-post probability assessments differ systematically from ex-ante |
| Overconfidence | Beliefs | Confidence intervals too narrow, probability assessments too extreme |
| Inattentional blindness | Feasible Set | Options that require attention to notice may be effectively unavailable |
| Change blindness | Feasible Set | Failing to update feasible set when conditions change |
| Focalism and focusing illusion | Preferences | Overweight currently salient attributes in utility function |
| Bounded awareness | Feasible Set | Systematically overlook relevant options or constraints |
| Framing effects and preference reversals | Preferences | Utility functions change based on how options are presented |
| Temporal differences (discounting) | Preferences | Non-exponential discounting: β-δ model or hyperbolic discounting |
| Multiple selves | Preferences | Time-inconsistent preferences between current and future selves |
| Regret avoidance | Preferences | Utility function includes anticipated regret costs |

---

## Question 8: Assumption Audit Using Plott's Framework

### Part 1: Heroic Assumptions

**Preferences:**

- All faculty have identical preferences (α = 0.8, β = 0.3) and all students have identical preferences (α = 0.2, β = 0.7)
- Members only care about two factors: reputation and finances
- *Reality: Business faculty care more about finances than Environmental Science faculty*

**Beliefs:**

- All members have perfect, identical information about reputation benefits (U = 5) and financial costs (U = 4)
- *Reality: Members disagree about both probability and magnitude of effects*

**Feasible Set:**

- Only two options available: full divestment or complete status quo
- *Reality: Partial divestment, ESG screening, engagement strategies all possible*

**Institutions:**

- Simple majority rule with sincere voting, no agenda manipulation or abstentions
- *Reality: Coalition formation, vote trading, abstentions occur*

### Part 2: Proper Expected Utility Model

For committee member i, divestment outcomes are uncertain:

**Possible outcomes:**

- Major reputation gain + minor donor loss (probability p₁ᵢ)
- Minor reputation gain + major donor loss (probability p₂ᵢ)
- No reputation change + moderate loss (probability p₃ᵢ)

Where p₁ᵢ + p₂ᵢ + p₃ᵢ = 1

**Expected Utilities:**

EU_i(Full Divest) = p₁ᵢ × U_i(Major rep gain, Minor loss)
                   + p₂ᵢ × U_i(Minor rep gain, Major loss)
                   + p₃ᵢ × U_i(No change, Moderate loss)

EU_i(Partial Divest) = q₁ᵢ × U_i(Moderate rep gain, Tiny loss)
                      + (1-q₁ᵢ) × U_i(Minor rep gain, Tiny loss)

EU_i(Status Quo) = U_i(Current state)

**Heterogeneity Examples:**

*Environmental Science Faculty:*
- p₁ = 0.7 (expect major reputation gain)
- U(Major rep gain) - U(Current) = 50 utils

*Business School Faculty:*
- p₁ = 0.2 (skeptical of reputation benefits)
- U(Major loss) - U(Current) = -40 utils

**Changed Predictions:**

- Original model predicted: 6-6 tie
- Realistic model predicts: Coalition forms around compromise (partial divestment/ESG), vote ~8-3-1 for compromise, with within-group disagreement and possible strategic abstention

### Part 3: Modeling Trade-offs

The original model is "better" for generating clear theoretical insights about how group identities might drive voting patterns. The modified model is "better" for predicting actual committee behavior. The choice depends on research goals: theoretical understanding vs. empirical prediction. Mathematical simplicity enables insight generation but may sacrifice predictive accuracy. Complex models capture reality better but become harder to analyze and communicate. The art is choosing the right level of abstraction for the research question.

---

## Question 9: Competing Explanations for Choice Architecture Effects

### Part A: Rational Choice Explanation

Rational choice theory could predict different outcomes because the two systems create fundamentally different **feasible sets**. System A allows access to any combination of 800+ courses (subject to scheduling). System B restricts combinations to those constructable from available tracks plus limited swaps. If a student's optimal combination cannot be assembled from any track, their best achievable outcome in System B is necessarily different from System A. This is a constraint on the feasible set, not a cognitive bias.

### Part B: Institutional Factors

The behavioral economist immediately attributed the difference to availability heuristics because this explanation fits her preferred theoretical framework, without considering simpler institutional explanations. Key institutional factors: (1) Track systems physically limit which combinations are possible; (2) System A imposes much higher search costs (processing 800+ options vs. curated sets); (3) Different transaction costs to achieve optimal outcomes; (4) Tracks provide implicit signals about which courses complement each other professionally.

### Part C: Empirical Test Design

Offer students a "hybrid" system where they can choose either track-based selection or fully custom building, but ensure all track-based combinations are also achievable through custom selection. If the behavioral explanation is correct, students should still show different choice patterns between the two options due to availability heuristics, even though the feasible sets are now identical. If the rational choice explanation is correct, students should make similar choices regardless of method, since any combination available through tracks is also available through custom selection. Remaining differences would be explained by differential search costs rather than cognitive biases.

---

## Question 10: When Do Different Modeling Assumptions Apply?

**Scenario A: Climate Policy Expert — Job Choice**
**Classical rational choice appropriate.** High stakes (career-defining), abundant resources (6 months), well-structured options, high expertise. Justifies careful System 2 analysis.

**Scenario B: Voter at Polling Station**
**Bounded rationality more appropriate.** Low individual stakes (one vote), very limited time, infrequent decision, complex issues, likely limited expertise. Favors System 1 shortcuts and heuristics.

**Scenario C: University Administrator — Degree Program**
**Classical rational choice appropriate.** High stakes (institutional reputation), structured 6-month process, well-defined evaluation criteria, high domain expertise.

**Scenario D: Student — Lunch Choice**
**Bounded rationality more appropriate.** Low stakes, limited time between classes, daily routine. Habits and satisficing dominate despite high familiarity.

**Synthesis:** Classical rational choice works best for high-stakes decisions with sufficient time, well-structured problems, and relevant expertise — where System 2 engagement is justified. Bounded rationality better predicts low-stakes, time-pressured, or unfamiliar situations. The appropriateness of modeling assumptions depends on decision context, not just individual psychology.

---

## Question 11: The Power of Model Thinking

### Part A: Predictive Power

Formal models provide analytical leverage — they identify the key causal mechanisms (preferences, beliefs, probabilities) that drive decisions, allowing predictions in new contexts by applying the same logical structure with different parameter values. Models reveal *why* patterns occur, not just *what* patterns exist, enabling counterfactual reasoning and generalization beyond the original data.

### Part B: Diagnostic Value

When the initial model failed, it didn't just say "we were wrong" — it pointed to specific components that needed revision. The failure was *informative failure* that guided theoretical development toward the importance of field research experience. Good models fail informatively: they break down in ways that teach us something valuable about the phenomena we're studying.

### Part C: Assumption Transparency

Formal modeling forces every assumption to be stated explicitly for mathematical tractability. Contradictory assumptions become immediately apparent. Informal theories often hide crucial assumptions or contain implicit contradictions that only emerge when forced into mathematical precision. Formalization acts as a "logical discipline" that exposes theoretical weaknesses.

### Part D: Policy Implications

Key recommendations from the modeling exercise: (1) Target field research — encourage all water policy students to pursue community-based field work, as this strongly predicts career satisfaction and persistence; (2) Address present bias — design career counseling that helps students anticipate time-inconsistent preferences; (3) Long-term support — maintain relationships with graduates to help them navigate career transitions. The model reveals causal mechanisms (not just correlations), enabling targeted interventions.

### Part E: Methodological Reflection

Rational choice models are analytical tools for understanding decision patterns, not literal descriptions of mental processes. Just as supply-and-demand models don't require merchants to solve calculus, expected utility models don't require conscious calculation. Models work if people behave "as if" optimizing, regardless of actual thought processes. Even if people aren't perfectly rational, rational choice provides a systematic baseline for identifying when and why behavior deviates from optimization. The power lies not in psychological realism but in analytical utility — providing a disciplined way of thinking that generates insights, predictions, and policy guidance.
