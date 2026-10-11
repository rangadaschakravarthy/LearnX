# Day 01 Interview Question Solutions

### Question 1: What is the difference between ECMAScript and JavaScript?
**Answer Summary:** ECMAScript is the standard specification document (ECMA-262) maintained by TC39 defining formal language rules. JavaScript is an implementation of ECMAScript that includes host environment Web APIs or Node.js system APIs.

---

### Question 2: Explain how modern JavaScript engines use JIT compilation.
**Answer Summary:** Modern engines (like V8) use a hybrid architecture: an interpreter (Ignition) translates AST to bytecode for immediate startup. The profiler tracks frequently executed functions ("hot code") and compiles them into optimized machine code using a JIT compiler (TurboFan).

---

### Question 3: What is the difference between script `async` and script `defer` attributes?
**Answer Summary:** `async` scripts download in parallel and execute immediately upon download, interrupting HTML parsing and breaking execution order. `defer` scripts download in parallel but execute only after HTML parsing completes, maintaining document order before `DOMContentLoaded`.

---

### Question 4: What happens when `"use strict"` is placed inside a function body rather than at the top of a file?
**Answer Summary:** Strict mode applies exclusively to that function and any functions nested inside it. Global code outside the function remains in non-strict mode.

---

### Question 5: What causes Automatic Semicolon Insertion (ASI) to fail or produce unexpected bugs?
**Answer Summary:** ASI inserts semicolons at line breaks where statement grammar permits. When keywords like `return`, `throw`, or `break` are followed immediately by a newline, ASI inserts a semicolon right after the keyword, resulting in unintended `undefined` returns or syntax bugs.
