# Advanced Pattern: `switch (true)` Range Expressions

## 1. What is it?
By default, `switch` matches a variable against discrete static values (`case "value":`).

However, by passing a boolean literal `switch (true)`, you can evaluate **dynamic comparison expressions** (like ranges or compound conditions) inside `case` clauses.

---

## 2. Syntax & Mechanics

```javascript
switch (true) {
  case (booleanExpression1):
    // Executes if booleanExpression1 evaluates to true
    break;
  case (booleanExpression2):
    // Executes if booleanExpression2 evaluates to true
  default:
    // Executed if no boolean expressions evaluate to true
}
```

---

## 3. Range Evaluation Example

```javascript
const score = 85;

// Evaluating score ranges using switch (true)
switch (true) {
  case (score >= 90):
    console.log("Grade: A");
    break;
  case (score >= 80):
    console.log("Grade: B"); // Matches 85 >= 80 -> true! Output: "Grade: B"
    break;
  case (score >= 70):
    console.log("Grade: C");
    break;
  default:
    console.log("Grade: F");
}
```

---

## 4. How `switch (true)` Works Under the Hood

1. The switch expression is evaluated $\rightarrow$ `true`.
2. Engine evaluates `case (score >= 90)` $\rightarrow$ `(85 >= 90)` $\rightarrow$ `false`.
3. Engine checks strict equality: `true === false` $\rightarrow$ `false`.
4. Engine evaluates `case (score >= 80)` $\rightarrow$ `(85 >= 80)` $\rightarrow$ `true`.
5. Engine checks strict equality: `true === true` $\rightarrow$ `true`.
6. Enters matching block and executes `"Grade: B"`.

---

## 5. Multiple Condition Range Switching

```javascript
const age = 22;
const hasStudentCard = true;

switch (true) {
  case (age < 12):
    console.log("Ticket: Free Child Pass");
    break;
  case (age >= 65):
    console.log("Ticket: Senior Discount Pass");
    break;
  case (age >= 12 && age <= 25 && hasStudentCard):
    console.log("Ticket: Student Discount Pass"); // Matches!
    break;
  default:
    console.log("Ticket: Standard Adult Pass");
}
```

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Misunderstanding switch (false)
```

Passing `switch (false)` will match the first `case` that evaluates to `false`, which is usually confusing and error-prone! Stick strictly to `switch (true)` for range matching.

---

## 7. Edge Cases
- Order of conditions in `switch (true)` matters just as it does in `else if` chains. Higher thresholds or more specific conditions must appear above general ones.

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: How can you evaluate numeric ranges (e.g. `score >= 90`) using a `switch` statement in JavaScript?**
  - *Answer*: Use the `switch (true)` pattern. Setting `true` as the switch expression causes the engine to compare `true` against the boolean results of comparison expressions inside each `case` clause.

---

## 9. Practice Questions
1. How does `switch (true)` evaluate matching `case` clauses?
2. Predict the output of `switch (true) { case (10 > 20): console.log("A"); default: console.log("B"); }`.
3. Why does condition order matter in `switch (true)` range checks?

---

## 10. Key Takeaways
- Use `switch (true)` to evaluate dynamic numeric ranges and compound boolean expressions.
- The engine compares `true === (caseExpression)`.
- Condition ordering rules apply: place restrictive range checks above general ones.
