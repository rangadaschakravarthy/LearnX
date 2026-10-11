# Day 4 Interview Questions — Operators

### Question 1 (Conceptual): What is the difference between prefix increment (`++x`) and postfix increment (`x++`)?
**Answer:** Prefix increment (`++x`) increments the variable immediately by 1 and returns the *new* updated value. Postfix increment (`x++`) returns the variable's *current* value first, and then increments the variable by 1 afterwards.

### Question 2 (Conceptual): How does short-circuit evaluation work in `&&` and `||`?
**Answer:** Binary logical operators evaluate left-to-right. `&&` short-circuits and returns the left operand immediately if it is falsy; otherwise it evaluates and returns the right operand. `||` short-circuits and returns the left operand immediately if it is truthy; otherwise it evaluates and returns the right operand.

### Question 3 (Tricky): What is the difference between `||` and `??` (Nullish Coalescing)?
**Answer:** `||` falls back if the left operand is any of JavaScript's 8 **falsy** values (`false`, `0`, `""`, `null`, `undefined`, `NaN`, `-0`, `0n`). `??` falls back ONLY if the left operand is **nullish** (`null` or `undefined`), preserving valid values like `0` or `""`.

### Question 4 (Conceptual): What is optional chaining (`?.`) and how does it prevent runtime errors?
**Answer:** Optional chaining (`?.`) permits reading deeply nested properties on objects, calling methods (`fn?.()`), or indexing arrays (`arr?.[0]`). If any intermediate reference in the chain is `null` or `undefined`, execution short-circuits and returns `undefined` cleanly instead of throwing a `TypeError`.

### Question 5 (Advanced): How do logical assignment operators (`&&=`, `||=`, `??=`) work?
**Answer:**
- `x ||= y`: Assigns `y` to `x` only if `x` is currently falsy.
- `x &&= y`: Assigns `y` to `x` only if `x` is currently truthy.
- `x ??= y`: Assigns `y` to `x` only if `x` is currently `null` or `undefined`.
