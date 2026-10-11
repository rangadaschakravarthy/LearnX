# Day 7 Interview Questions — Switch Statements

### Question 1 (Conceptual): How does case matching evaluate in a JavaScript `switch` statement?
**Answer:** Case matching evaluates using strict equality comparison (`===`). The engine checks whether the switch expression matches the case value in both value payload and data type without performing implicit type coercion.

### Question 2 (Conceptual): What is the purpose of the `break` statement in a `switch` block?
**Answer:** `break` terminates execution of the `switch` block and transfers control to the statement following the block. Omitting `break` causes execution to fall through into subsequent cases regardless of whether those cases match.

### Question 3 (Conceptual): When is fall-through desirable in a `switch` statement?
**Answer:** Intentional fall-through is useful when multiple case values share identical execution logic. Grouping cases (e.g. `case "A": case "B": case "C": handler(); break;`) eliminates code duplication.

### Question 4 (Advanced): Explain how `switch (true)` works for range evaluation.
**Answer:** Setting `true` as the switch expression causes the engine to compare `true` against the boolean evaluation of expressions inside each `case` block (`true === (score >= 90)`), enabling dynamic range checks.
