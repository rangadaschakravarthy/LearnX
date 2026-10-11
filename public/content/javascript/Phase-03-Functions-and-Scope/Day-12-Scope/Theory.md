# Day 12 — Scope & Scope Chain — Detailed Theory

Welcome to **Day 12** of the JavaScript Mastery curriculum. **Scope** is the set of rules that determines where variables and functions are accessible within your code. This guide provides a first-principles theoretical foundation covering Global Scope, Function Scope, Block Scope, Lexical Environment records, Scope Chain Resolution, Variable Shadowing, and `globalThis`.

---

## 1. Why Scope Matters in JavaScript Architecture

Without scope rules, every variable declared anywhere in a program would exist in a single global namespace. This would cause naming collisions, unmaintainable state mutations, and security vulnerabilities.

Scope provides:
1. **Encapsulation & Security**: Restricts access to sensitive data (e.g. API keys, internal state) so outer code cannot mutate it.
2. **Memory Efficiency**: Variables allocated in local scopes can be garbage collected when the execution scope finishes.
3. **Name Reuse**: Allows developers to use intuitive variable names (like `i`, `data`, `res`) in different functions without collision.

---

## 2. The Four Scope Levels in JavaScript

Modern JavaScript features four distinct scope boundary levels:

```
[ Global Scope ]
  └── [ Module Scope ] (ES6 Modules)
       └── [ Function Scope ]
            └── [ Block Scope ] (let / const)
```

```javascript
// 1. GLOBAL SCOPE
const globalVar = "I am Global";

function outerFunction() {
  // 2. FUNCTION SCOPE
  const functionVar = "I am Function Scoped";

  if (true) {
    // 3. BLOCK SCOPE
    const blockVar = "I am Block Scoped";
    var legacyVar = "I am NOT Block Scoped!"; // Leaks to Function Scope!
  }

  console.log(legacyVar); // "I am NOT Block Scoped!" (Accessible)
  // console.log(blockVar); // ReferenceError: blockVar is not defined
}
```

### 2.1 Scope Level Breakdown

| Scope Type | Introduced | Boundary Creator | Variable Types Controlled |
| :--- | :--- | :--- | :--- |
| **Global Scope** | ES1 (1997) | Top-level script environment | All top-level declarations |
| **Function Scope** | ES1 (1997) | `function() { ... }` body | `var`, `let`, `const`, `function`, `class` |
| **Block Scope** | ES6 (2015) | `{ ... }` curly brace blocks (`if`, `for`, `{}`) | `let`, `const`, `class` (NOTE: `var` IGNORES block boundaries!) |
| **Module Scope** | ES6 (2015) | ES Modules (`import`/`export`) | Top-level module declarations (not attached to global object) |

---

## 3. Lexical Scope vs. Dynamic Scope

JavaScript uses **Lexical Scoping** (also known as Static Scoping). 

> **Lexical Scope Rule**: The scope of a variable is determined entirely by its location within the source code **at compile/author time**, NOT by where or how the function is called at runtime.

```javascript
const name = "Global Scope";

function printName() {
  console.log(name); // Lexically bound to Global Scope!
}

function caller() {
  const name = "Local Scope inside caller";
  printName(); // Invokes printName()
}

caller(); // Output: "Global Scope" (NOT "Local Scope inside caller")
```

### Explanation of Execution:
Even though `printName()` was invoked inside `caller()`, `printName()` was *authored* in the global scope. Its parent lexical environment reference points to the Global Environment, so it resolves `name` as `"Global Scope"`.

---

## 4. Environment Records & The Scope Chain Resolution Algorithm

Under the hood, ECMAScript manages scope through **Lexical Environment Objects**.

An Environment Record consists of:
1. **Environment Record**: A key-value map of identifier names to variable bindings stored in that scope frame.
2. **Outer Environment Reference (`[[OuterEnv]]`)**: A pointer to the parent Lexical Environment.

```
+--------------------------------------------------------+
| Block Lexical Environment                              |
| EnvironmentRecord: { blockVar: "Block Scoped" }        |
| OuterEnv: -----------------------------------------+   |
+----------------------------------------------------|---+
                                                     |
                                                     v
+--------------------------------------------------------+
| Function Lexical Environment                           |
| EnvironmentRecord: { functionVar: "Function Scoped" }  |
| OuterEnv: -----------------------------------------+   |
+----------------------------------------------------|---+
                                                     |
                                                     v
+--------------------------------------------------------+
| Global Lexical Environment                             |
| EnvironmentRecord: { globalVar: "Global" }             |
| OuterEnv: null                                         |
+--------------------------------------------------------+
```

### The Scope Chain Lookup Algorithm
When JavaScript attempts to read an identifier `x`:
1. Check the current execution context's **EnvironmentRecord**. If found, return its value.
2. If not found, follow `[[OuterEnv]]` pointer to the parent environment record.
3. Repeat step 1 and 2 climbing up the scope chain.
4. If the pointer reaches `null` (above Global Environment) without finding `x`, throw a `ReferenceError: x is not defined`.

---

## 5. Variable Shadowing & The `globalThis` Identifier

### 5.1 Variable Shadowing
Shadowing occurs when an inner scope declares a variable with the **exact same identifier** as a variable in an outer scope. The inner declaration overrides (shadows) the outer variable within that inner scope boundary.

```javascript
const value = 100;

function shadowDemo() {
  const value = 200; // Shadows global 'value'
  if (true) {
    const value = 300; // Shadows function 'value'
    console.log(value); // 300
  }
  console.log(value); // 200
}

shadowDemo();
console.log(value); // 100 (Global value unaffected)
```

---

### 5.2 Global Object Quirks: `window`, `global`, and `globalThis`

Across different JS runtimes, the global environment object had different names:
* Web Browsers: `window` or `self`
* Node.js: `global`
* Web Workers: `self`

ES2020 unified this under a single standardized global identifier: **`globalThis`**.

#### `var` vs `let`/`const` Global Object Property Attachment
In browser global scope:
* Top-level `var` and `function` declarations create properties on `globalThis` (`window`).
* Top-level `let`, `const`, and `class` declarations create bindings in the Global Declarative Environment, **NOT attached to `globalThis`**!

```javascript
var globalVar = "var attached";
let globalLet = "let unattached";

console.log(globalThis.globalVar); // "var attached"
console.log(globalThis.globalLet); // undefined! (Bound in declarative record)
```

---

## 6. Minor Points, Quirks & Traps

### 1. Accidental Implicit Global Leakage (Non-Strict Mode)
Assigning a value to an un-declared variable inside a function creates an **implicit global property** in non-strict mode!

```javascript
function leak() {
  badVariable = 999; // Missing var/let/const!
}
leak();
console.log(window.badVariable); // 999 (Leaked to global object!)

// Strict mode prevents this:
// "use strict";
// function safe() { badVariable = 999; } // ReferenceError: badVariable is not defined
```

### 2. Block Scope in `for` Loops (`var` vs `let`)
```javascript
// BROKEN (var shares ONE single function-scoped binding):
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 100);
}
// Output: "var i: 3", "var i: 3", "var i: 3"

// FIXED (let creates a NEW lexical block binding per iteration):
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 100);
}
// Output: "let j: 0", "let j: 1", "let j: 2"
```

---

## 7. Senior Interview Questions & Answers

### Q1: Is Lexical Scope determined when a function is defined or when it is invoked?
* **Answer**: Lexical scope is determined statically at **author/compile time** based on where the function definition physically resides in the source code. Function invocation location has zero impact on lexical scope resolution.

### Q2: What is the difference between `globalThis` and the Global Environment Record?
* **Answer**: `globalThis` exposes the Object Environment Record of the global environment (where global object properties reside). However, modern ES6 top-level `let` and `const` declarations are stored in the Global Declarative Environment Record, which is part of the scope chain but does NOT expose its bindings as properties on `globalThis`.

---

## 8. Summary & Key Takeaways

1. **Four Scope Boundaries**: Global, Module, Function, and Block (`let`/`const`).
2. **Lexical Scope**: Scope chain references are fixed at source code write time, not invocation time.
3. **Scope Chain Resolution**: Identifiers resolve by walking up `[[OuterEnv]]` references until reaching `null`.
4. **`let` in Loops**: `let` creates a distinct block-scoped binding per iteration in `for` loops.
5. **Always Use Strict Mode**: `"use strict"` disables implicit global variable creation.
