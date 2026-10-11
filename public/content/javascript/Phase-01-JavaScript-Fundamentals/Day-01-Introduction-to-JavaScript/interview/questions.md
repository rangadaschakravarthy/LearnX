# Day 1 Interview Questions — Introduction to JavaScript

### Question 1 (Basic): What is the difference between ECMAScript and JavaScript?
**Answer:** ECMAScript is the standard specification maintained by TC39 that defines language grammar, data types, and core semantics. JavaScript is an implementation of ECMAScript along with host runtime environment APIs (like DOM, Fetch API in browsers or `fs` in Node.js).

### Question 2 (Conceptual): Explain how modern JavaScript engines use JIT compilation.
**Answer:** Modern JS engines (like V8) do not rely purely on interpretation or ahead-of-time compilation. Instead, an interpreter (like Ignition) immediately parses AST to bytecode for instant startup. The engine's profiler monitors "hot code" (frequently executed functions) and sends them to an optimizing JIT compiler (like TurboFan), which translates bytecode into optimized native machine code.

### Question 3 (Conceptual): What is the difference between script `async` and script `defer` attributes?
**Answer:**
- `async`: Asynchronously downloads script files while HTML parses. As soon as download completes, HTML parsing pauses to execute the script immediately. Script execution order is not guaranteed.
- `defer`: Asynchronously downloads script files while HTML parses. Script execution is deferred until HTML document parsing is completely finished, maintaining document order before `DOMContentLoaded` fires.

### Question 4 (Tricky): What happens when `"use strict"` is placed inside a function body rather than at the top of a file?
**Answer:** Strict mode rules apply locally **only** to that specific function and any nested inner functions. Outside the function, code continues to execute in sloppy/non-strict mode.

### Question 5 (Debugging): What causes Automatic Semicolon Insertion (ASI) to fail or produce unexpected bugs?
**Answer:** ASI triggers when a line break is encountered and appending a semicolon creates valid grammar. However, if a `return`, `throw`, `break`, or `continue` statement is followed immediately by a newline before an object or expression, ASI inserts a semicolon right after the keyword (e.g. `return;`), causing the function to prematurely return `undefined`.
