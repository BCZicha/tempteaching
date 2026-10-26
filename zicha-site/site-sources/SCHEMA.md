# Problem-set data schema

Produce ONE file: `/home/claude/dmp-src/problem_sets.json` — a JSON array of four problem-set objects (ps1..ps4), in order.

All `*_md` fields contain GitHub-flavoured Markdown (tables allowed, `$`-free plain text math like `EU = p × U(x)`; keep unicode subscripts/superscripts as in source). Keep the instructor's wording verbatim — do not paraphrase, shorten, or "improve" questions or answers. Only split them into parts.

```json
{
  "id": "ps1",
  "number": 1,
  "title": "Rational Choice Foundations and Decision Theory",
  "short": "Rational Choice",
  "due": "Friday Week 2, 23:59 (grace period until Sunday 23:59)",
  "time_budget": "6–8 hours",
  "week": "Week 2",
  "objectives": ["Use rational choice modeling ...", "..."],
  "intro_md": "Any introductory/instructions text that precedes Question 1 (important note, [READ]/[DO]/[WRITE] legend, submission guidelines). Markdown.",
  "questions": [
    {
      "id": "q1",
      "title": "Question 1: Model Components and Foundations",
      "subtitle": "(Based on Shepsle, Chapter 1)",
      "read_md": "All [READ] / scenario / set-up text for the question that is shared by its parts. Markdown. May be empty string.",
      "parts": [
        {
          "id": "q1a",
          "label": "Part A",
          "kind": "DO/WRITE",
          "prompt_md": "The exact task text the student must respond to. Markdown. Include any fill-in table as a markdown table.",
          "answer_md": "The corresponding model answer from the answer/study key, verbatim. Markdown. If the key gives one combined answer for several parts, put the full relevant portion under each part it covers, or put it on the first part and write 'See model answer to Part A above.' on the others.",
          "note_md": "Optional. Any note the key gives that is about how to grade / what counts (e.g. 'any plausible numbers work'). Omit if none."
        }
      ]
    }
  ]
}
```

Rules
- `kind` is one of `READ`, `DO`, `WRITE`, `DO/WRITE`. Every part that requires a student response must be `DO`, `WRITE` or `DO/WRITE`. Do not create parts for pure [READ] material; put that in `read_md` of the question.
- Every question must have at least one part. If a question is a single undivided task, make one part with `label: "Response"`.
- A sub-question with labelled Parts (Part A/B/C or a/b/c or Step 1/2/3) becomes one part per label. Keep labels as in the source ("Part A", "Step 1", "a)", "Part 1: Identify heroic assumptions").
- Questions 3–6 in PS1 are grouped under a shared [READ] — make four question objects (q3..q6) and repeat the shared set-up in `read_md` of q3 only, with a one-line reminder in q4–q6 ("Continues the water-security career model from Question 3.").
- ids: lowercase, no spaces: `q1`, `q1a`, `q2b`, `q3s1` for step 1 etc. Ids must be unique within a problem set.
- If a problem set has a bibliography/references, append it to the problem set's `intro_md` under a heading "References".
- Preserve all tables as Markdown tables.
- Also save the raw source markdown of each document as it came from the project, unchanged, to `/home/claude/dmp-src/raw/<name>.md` (e.g. `PS1_Rational_Choice_Clean.md`, `PS1_Answer_Key.md`, `DMP_Syllabus_Clean.md`, `Exam_Prep_Announcement.md`, `Midterm_Answer_Key.md`).
- Validate the JSON parses (`python3 -I -c "import json;json.load(open('/home/claude/dmp-src/problem_sets.json'))"`) and print, for each problem set, the number of questions and parts, and the list of part ids whose `answer_md` is empty.
