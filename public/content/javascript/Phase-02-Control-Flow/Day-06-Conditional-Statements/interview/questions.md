# Day 6 Interview Questions — Conditional Statements

### Question 1 (Conceptual): Why does condition order matter in an `else if` chain?
**Answer:** An `else if` chain evaluates top-to-bottom and short-circuits as soon as a single condition evaluates to `true`. If a broader threshold condition is placed above a narrower threshold condition (e.g. `marks >= 60` before `marks >= 90`), the narrower condition will never be evaluated.

### Question 2 (Conceptual): What is a Guard Clause and why is it preferred over deep nesting?
**Answer:** A Guard Clause checks invalid or error conditions upfront and returns early. It eliminates deep nested indentation ("Pyramid of Doom"), improves readability, and separates error handling from the main happy-path business logic.

### Question 3 (Tricky): What is the difference between an `if/else` block and a ternary operator?
**Answer:** `if/else` is a control statement that executes block statements for side-effects. The ternary operator (`cond ? a : b`) is an expression that evaluates and returns a value, allowing it to be assigned directly to variables or embedded inside string templates.

### Question 4 (Conceptual): What is an off-by-one boundary error in conditional checks?
**Answer:** An off-by-one boundary error occurs when choosing between strict comparison (`>`) and inclusive comparison (`>=`). For example, checking `age > 18` instead of `age >= 18` incorrectly rejects 18-year-olds when the minimum age requirement is 18.
