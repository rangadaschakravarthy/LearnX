# Day 02 Interview Question Solutions

### Question 1: What is the Temporal Dead Zone (TDZ) and why does it exist?
**Answer Summary:** The TDZ is the period between entering a block scope and executing the actual `let` or `const` declaration line. Accessing the variable during this window throws a `ReferenceError`. It prevents subtle bugs caused by accessing uninitialized variables before their assignment line.

---

### Question 2: Why does mutating a property of a `const` object not throw an error?
**Answer Summary:** `const` creates an immutable binding to a memory address, not an immutable value payload. For reference types, `const` guarantees the stack pointer cannot be reassigned, while properties stored in heap memory remain mutable.

---

### Question 3: Explain variable hoisting differences between `var`, `let`, `const`, and `function` declarations.
**Answer Summary:** `var` is hoisted and initialized to `undefined`. `let` and `const` are hoisted into the uninitialized TDZ (`ReferenceError`). `function` declarations are fully hoisted with their complete function implementations.

---

### Question 4: What is scope leakage and how do `let`/`const` solve it?
**Answer Summary:** Scope leakage occurs when variables declared inside blocks (like `if` or `for` loops using `var`) leak into outer scopes. `let` and `const` enforce strict block-level scoping within curly braces `{}`.

---

### Question 5: What is the difference between `camelCase`, `PascalCase`, and `UPPER_SNAKE_CASE` in JavaScript conventions?
**Answer Summary:** `camelCase` is used for variables, functions, and properties. `PascalCase` is used for ES6 classes and React components. `UPPER_SNAKE_CASE` is reserved for global compile-time constants.
