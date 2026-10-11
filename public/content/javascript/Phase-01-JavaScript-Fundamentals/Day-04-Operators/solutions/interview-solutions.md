# Day 04 Interview Question Solutions

### Question 1: What is the difference between prefix increment (`++x`) and postfix increment (`x++`)?
**Answer Summary:** Prefix (`++x`) increments the variable immediately and returns the *new* value. Postfix (`x++`) returns the variable's *current* value first and increments it afterwards.

---

### Question 2: How does short-circuit evaluation work in `&&` and `||`?
**Answer Summary:** `&&` short-circuits and returns the left operand if it is falsy; otherwise it returns the right operand. `||` short-circuits and returns the left operand if it is truthy; otherwise it returns the right operand.

---

### Question 3: What is the difference between `||` and `??` (Nullish Coalescing)?
**Answer Summary:** `||` falls back for all 8 falsy values (`false`, `0`, `""`, `null`, `undefined`, `NaN`, `-0`, `0n`). `??` falls back strictly for nullish values (`null` or `undefined`).

---

### Question 4: What is optional chaining (`?.`) and how does it prevent runtime errors?
**Answer Summary:** Optional chaining (`?.`) permits reading deeply nested properties. If any intermediate object in the chain is `null` or `undefined`, evaluation short-circuits and returns `undefined` cleanly instead of throwing a `TypeError`.

---

### Question 5: How do logical assignment operators (`&&=`, `||=`, `??=`) work?
**Answer Summary:** `x ||= y` assigns `y` if `x` is falsy. `x &&= y` assigns `y` if `x` is truthy. `x ??= y` assigns `y` if `x` is `null` or `undefined`.
