# Day 13 — Hoisting & Temporal Dead Zone (TDZ) — Detailed Theory

Welcome to **Day 13** of the JavaScript Mastery curriculum. **Hoisting** is one of the most misunderstood behaviors in JavaScript. It is often described casually as "variables being moved to the top of the file." In reality, hoisting is an emergent property of how the JavaScript engine parses code during the **Creation Phase** of an **Execution Context**.

This guide provides an exhaustive theoretical explanation of hoisting mechanics, variable initialization states, the **Temporal Dead Zone (TDZ)**, and declaration precedence rules.

---

## 1. The Two-Phase Execution Engine Model

Before any JavaScript code is executed, the JS engine passes through two distinct operational phases for every execution context:

```
[ Phase 1: Creation / Parsing Phase ]
  ├── Scans source code for declarations
  ├── Allocates memory in Environment Record
  └── Binds identifiers:
        ├── function declarations -> Full function object stored in memory
        ├── var declarations       -> Allocated & initialized to `undefined`
        └── let / const           -> Allocated in UNINITIALIZED state (TDZ)
  
[ Phase 2: Code Execution Phase ]
  └── Executes code line-by-line (assignments, function calls, arithmetic)
```

---

## 2. Hoisting Mechanics Across Declaration Types

Hoisting affects different declaration keywords in completely different ways:

```javascript
console.log(declaredFunc()); // Works! Output: "Hello"
console.log(varVariable);    // Works! Output: undefined
// console.log(letVariable); // ReferenceError: Cannot access 'letVariable' before initialization

function declaredFunc() { return "Hello"; }
var varVariable = "I am var";
let letVariable = "I am let";
```

### 2.1 Complete Declaration Behavior Comparison

| Declaration Type | Hoisted in Memory? | Initialized in Creation Phase? | Accessible Before Declaration Line? | Error Thrown if Accessed Early |
| :--- | :--- | :--- | :--- | :--- |
| **Function Declaration** | Yes | Yes (Instantiated to function object) | Yes | None (Executes cleanly) |
| **`var` Variable** | Yes | Yes (Initialized to `undefined`) | Yes (Returns `undefined`) | None |
| **`let` Variable** | Yes | **No** (Stays Uninitialized) | **No** | `ReferenceError` (TDZ) |
| **`const` Variable** | Yes | **No** (Stays Uninitialized) | **No** | `ReferenceError` (TDZ) |
| **Class Declaration** | Yes | **No** (Stays Uninitialized) | **No** | `ReferenceError` (TDZ) |
| **Function Expression (`var`)** | Yes (`var` part) | Yes (`undefined`) | **No** (if called as function) | `TypeError: ... is not a function` |

---

## 3. The Temporal Dead Zone (TDZ) Deep Dive

The **Temporal Dead Zone (TDZ)** is the time span between the entering of a scope boundary (where the `let`/`const` variable is bound in memory) and the physical point in code execution where the variable's declaration statement is evaluated.

```javascript
{ // 1. Scope entered. TDZ for 'token' begins!
  
  // console.log(token); // ReferenceError: Cannot access 'token' before initialization
  
  const unused = 100; // Still inside TDZ for 'token'
  
  const token = "SECURE_JWT"; // 2. TDZ for 'token' ENDS here!
  
  console.log(token); // 3. Safe access: "SECURE_JWT"
}
```

### 3.1 Why TDZ Exists in JavaScript Specifications

The TC39 committee introduced TDZ in ES6 for two critical reasons:
1. **Catch Bugs Early**: Accessing variables before initialization is almost always a logic error. Throwing a runtime `ReferenceError` is far safer than silently returning `undefined`.
2. **`const` Invariant Protection**: `const` variables can never be reassigned. If `const` hoisted as `undefined` (like `var`), accessing it early would mean `const x` was first `undefined` and then later changed to a value—violating `const` immutability semantics!

---

### 3.2 The Temporal (Time-Based) Nature of TDZ

TDZ is **temporal** (based on execution timing), NOT spatial (based on line order):

```javascript
function tdzDemo() {
  // Accessing 'msg' inside callback works because callback runs AFTER declaration line!
  const show = () => console.log(msg);

  let msg = "Hello World"; // TDZ ends here

  show(); // Called AFTER declaration -> Logs "Hello World" cleanly!
}

tdzDemo();
```

---

## 4. Declaration Precedence Rules

When a function declaration and a variable declaration share the **exact same name** in the same scope, JavaScript applies strict precedence rules during the Creation Phase:

### Rule 1: Function Declarations Overwrite `var` Declarations
During memory allocation in the Creation Phase, Function Declarations take priority over `var` variable declarations:

```javascript
console.log(typeof foo); // "function" (Function declaration wins during hoisting!)

var foo = "Hello";
function foo() {}

console.log(foo); // "Hello" (Execution phase reassigns foo to string)
```

### Rule 2: Duplicate `let`/`const` Declarations Throw SyntaxErrors
Duplicate declarations using `let` or `const` in the same scope boundary are forbidden and throw an immediate compile-time `SyntaxError`:

```javascript
var item = 10;
// let item = 20; // SyntaxError: Identifier 'item' has already been declared
```

---

## 5. Minor Points, Quirks & Edge Cases

### 1. Function Expressions & Arrow Function Hoisting
Remember: Variable names assigned to function expressions hoist according to their variable type (`var` vs `let`/`const`), but the function assignment itself occurs only when execution hits that line!

```javascript
// print(); // TypeError: print is not a function
var print = function() { console.log("Printing..."); };

// log(); // ReferenceError: Cannot access 'log' before initialization
const log = () => { console.log("Logging..."); };
```

### 2. `typeof` Operator is NO LONGER 100% Safe in TDZ!
Before ES6, `typeof unDeclaredVar` was guaranteed never to throw an error, evaluating to `"undefined"`. However, using `typeof` on a `let` or `const` variable inside its TDZ throws a `ReferenceError`!

```javascript
console.log(typeof nonExistent); // "undefined" (Safe for un-declared variables)

// console.log(typeof tdzVar);   // ReferenceError: Cannot access 'tdzVar' before initialization
let tdzVar = 10;
```

---

## 6. Senior Interview Questions & Answers

### Q1: Explain why `var x = 1; function x() {}` results in `typeof x === "number"` after execution.
* **Answer**: During the Creation Phase, the `function x` declaration hoists first, assigning `x` to a function object (`var x` declaration is ignored as `x` is already bound). However, during the Execution Phase, the assignment line `x = 1` executes, overwriting `x` with the number literal `1`. Thus, after execution, `typeof x` evaluates to `"number"`.

### Q2: Is a `let` variable hoisted? Prove your answer.
* **Answer**: Yes, `let` variables ARE hoisted. Proof:
  ```javascript
  let a = 1;
  {
    console.log(a); // ReferenceError!
    let a = 2;
  }
  ```
  If `let a = 2` were not hoisted, `console.log(a)` would resolve `a = 1` from the outer parent scope. The fact that it throws a `ReferenceError` proves that `let a = 2` WAS hoisted to the top of the block scope, creating a TDZ that shadows the outer `a`.

---

## 7. Summary & Key Takeaways

1. **Two Execution Phases**: Creation Phase (memory allocation) and Execution Phase (code evaluation).
2. **Function Declarations**: Fully hoisted with definition body attached.
3. **`var` Hoisting**: Hoisted and initialized to `undefined`.
4. **`let`/`const` Hoisting**: Hoisted but left **uninitialized**, creating the Temporal Dead Zone (TDZ).
5. **TDZ Access**: Accessing a variable in its TDZ throws a `ReferenceError`.
