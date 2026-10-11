# Day 2 Interview Questions — Variables and Constants

### Question 1 (Conceptual): What is the Temporal Dead Zone (TDZ) and why does it exist?
**Answer:** The TDZ is the period between entering a block scope and executing the actual declaration line of a `let` or `const` variable. Accessing the variable during this window throws a `ReferenceError`. It exists to prevent subtle bugs caused by accessing uninitialized variables before their intended initialization line and to enforce strict variable declarations.

### Question 2 (Conceptual): Why does mutating a property of a `const` object not throw an error?
**Answer:** `const` creates an immutable variable binding to a memory address, not an immutable value. For primitive values stored directly in stack memory, `const` prevents reassignment. For reference types (objects/arrays), `const` guarantees that the stack pointer to the heap memory address cannot change, but properties stored inside heap memory remain mutable.

### Question 3 (Tricky): Explain variable hoisting differences between `var`, `let`, `const`, and `function` declarations.
**Answer:**
- `var`: Hoisted to function/global scope top and initialized to `undefined`.
- `let`/`const`: Hoisted to block scope top but remain uninitialized in the TDZ (`ReferenceError`).
- `function` declaration: Hoisted to scope top with its complete implementation payload, allowing execution prior to declaration line.

### Question 4 (Conceptual): What is scope leakage and how do `let`/`const` solve it?
**Answer:** Scope leakage occurs when a variable intended for local block use (like a loop counter `for (var i = 0...)` or an `if` condition) leaks out into the surrounding function or global scope due to `var`'s lack of block-level scoping. `let` and `const` restrict variables to the exact block `{}` in which they are declared.

### Question 5 (Best Practice): What is the difference between `camelCase`, `PascalCase`, and `UPPER_SNAKE_CASE` in JavaScript conventions?
**Answer:**
- `camelCase`: Used for variables, function names, object properties, and parameters (e.g. `userFirstName`).
- `PascalCase`: Used for ES6 classes, constructor functions, and React components (e.g. `UserProfileCard`).
- `UPPER_SNAKE_CASE`: Used for global compile-time immutable configuration constants (e.g. `MAX_RETRY_ATTEMPTS`).
