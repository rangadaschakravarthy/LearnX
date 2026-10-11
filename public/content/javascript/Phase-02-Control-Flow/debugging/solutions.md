# Master Debugging Solutions — Control Flow & Program Logic

Detailed root causes and fixes for all 40 bugs.

---

### Solutions 1-10 (Conditionals & Assignment)
1. **Bug 1**: `isAdmin = true` is assignment. Fix: `if (isAdmin === true)` or `if (isAdmin)`.
2. **Bug 2**: Operator precedence (`&&` higher than `||`). Fix: `if ((age >= 18 && hasId === true) || age >= 21)`.
3. **Bug 3**: String comparison coerces string, but `+` concatenates. Fix: `const inputAge = Number("18");`.
4. **Bug 4**: Out of order ranges cause lower thresholds to shadow higher ones. Fix: Order from highest (`>=90`) to lowest (`>=60`).
5. **Bug 5**: IEEE-754 precision error (`0.1 + 0.2 === 0.30000000000000004`). Fix: `Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON`.
6. **Bug 6**: Automatic Semicolon Insertion (ASI) inserts `;` after `return`. Fix: Place opening `{` on same line as `return`.
7. **Bug 7**: Semicolon after `if` terminates statement body. Fix: Remove `;` after `if (score >= 50)`.
8. **Bug 8**: Missing `{}` causes second statement to execute unconditionally. Fix: Wrap both `console.log` lines in `{}`.
9. **Bug 9**: Empty array `[]` is truthy object. Fix: `if (items.length > 0)`.
10. **Bug 10**: `NaN === NaN` is `false`. Fix: `if (Number.isNaN(val))`.

---

### Solutions 11-20 (Switch Statements)
11. **Bug 11**: Missing `break` causes fallthrough. Fix: Add `break;` at end of each case block.
12. **Bug 12**: Switch uses strict equality (`===`). `"1"` !== `1`. Fix: Case `"1"` or convert input to Number.
13. **Bug 13**: Lexical scope is shared across entire switch statement. Fix: Wrap case block in `{}` scope.
14. **Bug 14**: Duplicate case clauses make second block unreachable. Fix: Remove duplicate or update case value.
15. **Bug 15**: `switch(num)` matches `num === (num > 10)` which compares `15 === true` (false). Fix: Use `switch (true)`.
16. **Bug 16**: Missing `default` returns `undefined`. Fix: Add `default: return "Unknown Role";`.
17. **Bug 17**: Intentional vs accidental fallthrough. Fix: Add explicit comment or add `break;`.
18. **Bug 18**: Objects are compared by reference identity, not structural equality. Fix: Switch on scalar property `obj.id`.
19. **Bug 19**: `return` inside switch inside function returns from function. Fix: Use `break` if exiting switch/loop, or return deliberately.
20. **Bug 20**: Grouped cases with no logic fall through to default. Fix: Add specific handlers or breaks.

---

### Solutions 21-30 (Loops & Iteration)
21. **Bug 21**: Missing counter update causes infinite loop. Fix: Add `count++` inside loop body.
22. **Bug 22**: `i <= arr.length` accesses out of bounds index. Fix: Use `i < arr.length`.
23. **Bug 23**: Mutating array during forward loop shifts indices. Fix: Decrement loop `i--` or use `filter()`.
24. **Bug 24**: Modifying counter inside body creates unpredictable iteration steps. Fix: Use increment step in `for` header.
25. **Bug 25**: `do...while` executes body once before evaluating condition. Fix: Use standard `while` loop if 0 iterations needed.
26. **Bug 26**: Floating point addition precision error in loop step. Fix: Use integer iteration counter e.g. `i = 0; i <= 10; i++`, compute `val = i / 10`.
27. **Bug 27**: `var` has function scope, sharing single `i` across callbacks. Fix: Use block-scoped `let i = 0`.
28. **Bug 28**: Semicolon after `while(i < 5);` creates empty infinite loop. Fix: Remove `;`.
29. **Bug 29**: `i++` in decrementing loop goes to positive infinity. Fix: Change `i++` to `i--`.
30. **Bug 30**: Declaring accumulator inside loop resets it every cycle. Fix: Declare `let sum = 0` outside loop.

---

### Solutions 31-40 (Advanced Looping)
31. **Bug 31**: Objects lack `[Symbol.iterator]`. Fix: Use `for (const val of Object.values(user))`.
32. **Bug 32**: `for...in` array keys are strings. Fix: Use `for (let i = 0; i < arr.length; i++)` or `Number(idx)`.
33. **Bug 33**: `for...in` includes prototype keys. Fix: Guard with `Object.prototype.hasOwnProperty.call(data, k)`.
34. **Bug 34**: Label break targeted inner loop. Fix: `break outer;`.
35. **Bug 35**: Deleting keys during property enumeration yields implementation-dependent behavior. Fix: Avoid mutating keys during iteration.
36. **Bug 36**: Default parameters in destructuring only activate for `undefined`, not `null`. Fix: Check `v ?? "default"`.
37. **Bug 37**: Modifying decrement counter inside loop body causes infinite loop. Fix: Remove counter mutation.
38. **Bug 38**: `forEach` callback is a function, not a loop; `break` is invalid. Fix: Use `for...of` loop.
39. **Bug 39**: `Set` has no numeric index operator or `.length`. Fix: Use `for...of` or `set.forEach()`.
40. **Bug 40**: Sparse arrays contain empty slots. Fix: Use `for...of` to iterate values cleanly or check `i in sparse`.
