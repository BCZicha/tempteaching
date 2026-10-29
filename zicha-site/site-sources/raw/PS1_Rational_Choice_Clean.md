# Problem Set 1: Rational Choice Foundations and Decision Theory

## Learning Objectives

By completing this problem set, you will:

- Use rational choice modeling as a systematic framework for understanding decision-making
- Build, interpret, and revise expected utility models
- Map cognitive biases onto formal model components using Plott's framework
- Critically evaluate modeling assumptions and understand the iterative nature of social science theory-building

**Important Note:** This problem set is designed as a learning tool rather than high-stakes assessment. It operates on a pass/fail basis to encourage experimentation and learning from mistakes.

**Instructions:** Throughout this problem set, you'll see:

- **[READ]** = Provided information/example to study
- **[DO]** = Calculate or fill in this answer yourself
- **[WRITE]** = Write an explanation (length specified per question)

## Submission Guidelines

- **What to submit:** All calculations ([DO]) and written responses ([WRITE])
- **Collaboration:** Work with others or any other resource to understand concepts and learn to answer the questions, but write individual responses
- **Time:** Est. Budget 6–8 hours
- **Due:** Friday Week 2, 23:59 (grace period until Sunday 23:59)

---

## Question 1: Model Components and Foundations

*(Based on Shepsle, Chapter 1)*

[READ] Rational choice models generally start with a well-defined set of actors (N = {1, 2, ..., n}), a number of outcomes over which actors hold preferences (X = {x, y, z, ...}), a set of behaviors or instruments with which to achieve preferred outcomes (I = {A, B, C, ...}), and some rule which links actors' instrumental choices to outcomes (R).

For example, each of n voters may vote for A, vote for B, or abstain. A candidate wins if he or she gets more votes than any other. Thus, N = {1, 2, ..., n}, X = {A wins, B wins, tie}, and I = {vote A, vote B, abstain}. The rule, R, is plurality rule, implying that a vote for A (or B) increases the likelihood A (B, respectively) wins.

[DO/WRITE] Give a simple characterization of each of these model foundations for the following actors in climate policy contexts:

**a) Climate activists lobbying for carbon pricing**
**b) Multinational corporations deciding on renewable energy investments**
**c) Small island nation delegates in international climate negotiations**

In what forms do these actors confront uncertainty in making their behavioral choices?

---

## Question 2: Doing Rational Choice Decision-Theoretical Analysis

*Model Interpretation and Parameter Analysis*

[READ] Two researchers propose different models for why communities adopt renewable energy technologies:

**Model A (Pure Economic Model):**

Let p = probability that energy costs will rise significantly, C = upfront cost of renewable technology, S₁ = savings if energy costs rise, S₂ = savings if energy costs stay stable

EU(Adopt Renewables) = p × U(S₁ - C) + (1-p) × U(S₂ - C)
EU(Keep Fossil) = p × U(-H) + (1-p) × U(0)

Where H = high energy costs under price increases.

Community adopts renewables when EU(Adopt Renewables) > EU(Keep Fossil)

**Model B (Social Influence Model):**

Same variables, plus: R = number of neighboring communities that have adopted renewables, β = weight on social conformity/learning

EU(Adopt Renewables) = p × U(S₁ - C) + (1-p) × U(S₂ - C) + β × R
EU(Keep Fossil) = p × U(-H) + (1-p) × U(0)

[WRITE] **Part A:** Explain in plain language what each model predicts about which communities will adopt renewable energy and under what conditions. (3–4 sentences per model)

[DO] **Part B:** In Model A, what happens to the likelihood of adoption as p (probability of energy cost increases) approaches 1? What happens as C (upfront costs) increases dramatically? Show the mathematical intuition behind these relationships.

[WRITE] **Part C:** Model A predicts that wealthy communities should always be more likely to adopt renewables (they can better afford upfront costs C). However, empirical data shows that some wealthy communities resist adoption while some resource-constrained communities adopt enthusiastically. How might Model B explain this puzzle? (4–5 sentences)

[DO] **Part D:** In Model B, analyze what happens to the adoption threshold as β (weight on social influence) increases. If β became very large, what would this predict about adoption patterns across neighboring communities?

[DO/WRITE] **Part E:** Both models assume communities accurately know p (probability of energy cost increases). How would the models change if we assumed communities systematically underestimate this probability due to present bias? Show how this assumption modification would be incorporated into the expected utility calculations.

---

## Questions 3–6: Building Your Own Decision-Theoretical Model

*Global Water Security Career Decisions*

[READ] Now that you've practiced interpreting rational choice models and analyzing how parameter changes affect predictions, it's time to build your own model from scratch. Use the same expected utility notation and analytical approach from Question 2.

You're studying career choices among graduates from water policy programs. Your intuition is that graduates from water-stressed regions (like parts of Sub-Saharan Africa, Central Asia) are more likely to choose positions with international water security organizations than graduates from water-abundant regions (like Nordic countries, Canada), because they place higher value on addressing water scarcity issues that directly affect their home communities.

### Question 3 (Part A): Build Your Expected Utility Model

Formalize this hypothesis using expected utility theory, following the approach from Question 2. Your model should include:

[DO] **Step 1: Define Your Basic Components**

- Actors (N): _____________________
- Outcomes (X): {___________, ___________}
- Instruments (I): {___________, ___________, ___________}

[WRITE] **Step 2: State Your Key Assumptions**

- Core Uncertainty: _____________________
- Preference Assumption: How do water-stressed vs. water-abundant graduates differ in their utilities?
- Belief Assumption: How do water-stressed vs. water-abundant graduates differ in their probability assessments?

[DO] **Step 3: Write Your Expected Utility Equations**

For water-stressed graduates:

- EU(International Org) = p₁ × U(___) + (1-p₁) × U(___)
- EU(Domestic Gov) = p₂ × U(___) + (1-p₂) × U(___)
- EU(Private Sector) = p₃ × U(___) + (1-p₃) × U(___)

For water-abundant graduates: [Use same structure but different values for p and/or U]

[DO] **Step 4: State Your Hypothesis Mathematically**

For your hypothesis to be correct, which expected utility must be larger for each group?

### Question 4 (Part B): Data Challenge and Model Revision

[READ] Your survey of 800 graduates shows no significant difference in international organization job selection between water-stressed and water-abundant region graduates (52% vs. 49%).

However, drilling deeper reveals: graduates from water-stressed regions who completed field research on community water projects show 81% choosing international organizations, compared to 34% for all other groups combined.

[DO] **Identify the variables:**

- Independent variable: ___________________
- Dependent variable: ___________________
- Intervening variable: ___________________

[DO/WRITE] **Revise your model:** How does the field research experience change either the probability assessments in your model, or the utility functions, or both? Show the mathematical modification to your equations and explain the logic behind the change.

### Question 5 (Part C): Cognitive Bias Integration

[READ] New longitudinal data reveals: Many graduates who initially chose international organizations for "long-term impact" switch to higher-paying private consulting after 4 years, despite surveys showing they still claim to value impact over income.

This suggests **present bias (hyperbolic discounting)** — people discount future rewards more heavily than standard exponential discounting predicts, making immediate rewards more attractive over time.

[DO/WRITE] **Revise your expected utility model** to incorporate hyperbolic discounting. Your modification should:

- Show how present bias affects the time discounting of different utility components
- Explain why this leads to job-switching behavior despite unchanged stated preferences
- Demonstrate that this represents an **assumption modification** rather than abandoning rational choice theory

*Note: For this question only, include salary in your model to contrast immediate monetary gains with delayed impact satisfaction. Hyperbolic discounting can be modeled as: EU = β × δ × U(future rewards) + U(immediate rewards), where β < 1 captures present bias and δ is the standard discount factor.*

### Question 6 (Part D): Model Evolution and Methodology

[DO] Compare your initial model (Part A) with your final model (Part C). Complete the tracking table:

| Model Version | Key Assumptions | Prediction | What Data Revealed |
|---|---|---|---|
| Initial Model | | | |
| Revised Model | | | |
| Final Model | | | |

[WRITE] **Reflect on the modeling process** (5–6 sentences):

- How did empirical evidence change your theoretical understanding?
- What does this exercise demonstrate about the relationship between "behavioral anomalies" and rational choice theory?
- How does this illustrate the iterative nature of model building in social science?

---

## Question 7: Bias Mapping to Plott's Equation

[READ] Political scientists use Charles Plott's fundamental equation: **Political Outcomes = f(Preferences × Beliefs × Feasible Set × Institutions)** to understand decision-making. This framework also applies to individual political choices.

[DO] Map each of the following cognitive biases and heuristics from Bazerman & Moore to Plott's equation components. For each bias, identify which component it primarily affects and suggest how you could modify a rational choice model to accommodate it.

Complete the table:

| Bias/Heuristic | Primary Plott Component | Suggested Modeling Modification |
|---|---|---|
| Ease of recall | Beliefs | Replace objective probabilities with availability-weighted probabilities: p* = f(ease of recall) × p(objective) |
| Retrievability | | |
| Insensitivity to base rates | | |
| Insensitivity to sample size | | |
| Misconceptions of chance | | |
| Regression to the mean | | |
| The conjunction fallacy | | |
| The confirmation trap | | |
| Anchoring | | |
| Conjunctive and disjunctive events bias | | |
| Hindsight and curse of knowledge | | |
| Overconfidence | | |
| Inattentional blindness | | |
| Change blindness | | |
| Focalism and focusing illusion | | |
| Bounded awareness | | |
| Framing effects and preference reversals | | |
| Temporal differences (discounting) | | |
| Multiple selves | | |
| Regret avoidance | | |

---

## Question 8: Assumption Audit Using Plott's Framework

**Scenario: University Climate Action Committee Decision**

[READ] Your university's Climate Action Committee must decide whether to recommend divesting the endowment from fossil fuel companies. The committee has 12 members: 4 faculty, 4 students, 2 administrators, and 2 alumni representatives. They will vote by simple majority after three weeks of deliberations and public hearings.

**A Political Scientist's Model:**

For committee member i:

- EU(Vote Divestment) = α_i × U(Reputation Benefit) - β_i × U(Financial Cost)
- EU(Vote Status Quo) = 0

Where:

- Faculty/Admin: α_i = 0.8, β_i = 0.3
- Students/Alumni: α_i = 0.2, β_i = 0.7
- All members share same beliefs: U(Reputation Benefit) = 5, U(Financial Cost) = 4

Prediction: Faculty/Admin vote YES (0.8×5 - 0.3×4 = 2.8 > 0), Students/Alumni vote NO (0.2×5 - 0.7×4 = -1.8 < 0). Result: 6-6 tie, status quo maintained.

**Conceptual Problems with This Model:**

- The α and β "weights" aren't standard expected utility notation
- "Beliefs about U()" mixes up beliefs (about facts) with utilities (preferences)
- No uncertainty or probabilities — not really an expected utility model

[WRITE] **Part 1: Identify "heroic assumptions"**

For each component of Plott's framework, identify one overly simplistic assumption:

- **Preferences:** What heroic assumption does this model make about how committee members value outcomes?
- **Beliefs:** What heroic assumption does this model make about information and belief formation?
- **Feasible Set:** What heroic assumption does this model make about available options?
- **Institutions:** What heroic assumption does this model make about the decision-making process?

[DO] **Part 2: Modify the mathematical model**

Build a proper expected utility model with genuine uncertainty. Address at least one heroic assumption from EACH of the four Plott components. Show how addressing multiple heroic assumptions simultaneously changes both the mathematical complexity and the predicted outcomes.

[WRITE] **Part 3: Reflect on the modeling trade-off** (4–5 sentences)

Compare your modified model to the original. Which is "better" and why? What does this exercise teach you about the tension between mathematical simplicity and realistic assumptions?

---

## Question 9: Competing Explanations for Choice Architecture Effects

[READ] A behavioral economist observes two university course registration systems:

*"System A gives students an alphabetical list of all 800+ courses to choose from. System B has students first select a 'track' (pre-bundled course sets), then customize by swapping 1–2 courses from curated alternatives. When we compare student choices, System B leads to very different course combinations than System A, even among students with similar academic interests and career goals. This demonstrates availability heuristic bias — students in System B anchor on the courses that appear in their chosen track because these options are more mentally 'available.' Students aren't actually optimizing based on stable preferences — they're systematically biased toward whatever subset of courses the track system makes salient."*

[WRITE] **Part A:** The behavioral economist's conclusion that this violates rational choice theory is incorrect. Explain why rational choice theory could actually predict different outcomes between these two systems, even with identical preferences and no cognitive biases. (3–4 sentences)

[WRITE] **Part B:** The behavioral economist's error is itself an example of confirmation bias — she immediately attributed the differences to a psychological mechanism she's familiar with rather than considering institutional explanations. What institutional factors might better explain the different outcomes? (3–4 sentences)

[WRITE] **Part C:** Propose an empirical test that would help distinguish between the behavioral explanation (availability heuristic bias) and the rational choice explanation. What evidence would support each theory? (4–5 sentences)

---

## Question 10: When Do Different Modeling Assumptions Apply?

*Thinking about System 1 (fast, intuitive) vs. System 2 (slow, deliberative) decision-making*

[WRITE] Analyze each scenario and predict whether classical rational choice assumptions or bounded rationality assumptions would better predict behavior. For each, explain your reasoning using these factors: Stakes, Resources, Repetition, Structure, and Expertise.

**Scenario A:** A climate policy expert choosing between job offers from three different international organizations after 6 months of deliberation.

**Scenario B:** A voter deciding which candidate to support while walking to the polling station.

**Scenario C:** A university administrator deciding whether to approve a new degree program (6-month review process).

**Scenario D:** A student choosing what to eat for lunch in the campus cafeteria.

[WRITE] **Synthesis:** What does this exercise suggest about when rational choice modeling assumptions are most/least appropriate? (4–5 sentences)

---

## Question 11: The Power of Model Thinking

*Reflecting on the analytical toolkit you've developed*

[WRITE] **Part A: Predictive Power** (3–4 sentences)
In Questions 3–6, your model allowed you to make predictions about career choices in new contexts even though it was built from limited initial data. What does this suggest about the value of formal modeling compared to just describing patterns in existing data?

[WRITE] **Part B: Diagnostic Value** (3–4 sentences)
When your initial model failed to predict the data patterns in Question 4, the failure pointed you toward the importance of field research experience. How does this illustrate the diagnostic power of formal models, even when they're "wrong"?

[WRITE] **Part C: Assumption Transparency** (3–4 sentences)
In Questions 7–8, you identified "heroic assumptions" and saw how they affected predictions. How does formal modeling help make assumptions explicit in ways that informal theorizing might not?

[WRITE] **Part D: Policy Implications** (3–4 sentences)
If you were advising a university on career services for water policy graduates, what insights from your modeling exercise (Questions 3–6) would be most valuable? How does model thinking help generate actionable recommendations?

[WRITE] **Part E: Methodological Reflection** (4–5 sentences)
Critics sometimes dismiss rational choice theory as "unrealistic" because people don't actually calculate expected utilities. Based on this problem set, how would you respond to this critique? What is the value of rational choice modeling as an analytical tool, regardless of whether people consciously think this way?
