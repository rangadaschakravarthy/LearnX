# Phase 1 Assessment — Master Answer Key & Solutions

Exhaustive master key containing complete answers, code implementations, step-by-step traces, and explanations for all 100 assessment items.

---

## 1. Theory Questions Solutions (1 - 30)

1. **Creator & History**: Brendan Eich created JavaScript in May 1995 in 10 days while working at Netscape Communications.
2. **ECMAScript vs JavaScript**: ECMAScript (ECMA-262) is the standard specification. JavaScript is the implementation of that standard along with host Web/System APIs.
3. **TC39 Role**: Technical Committee 39 maintains and evolves the ECMAScript specification annually through a 5-stage proposal process.
4. **JIT Compilation**: Modern engines interpret AST to bytecode for immediate startup while profiling hot code to compile into optimized native machine code.
5. **Major Engines**: V8 (Chrome/Node/Deno), SpiderMonkey (Firefox), JavaScriptCore (Safari/Bun).
6. **Core JS vs Web APIs**: Core JS (variables, data types, functions) is defined by ECMAScript. Web APIs (`document`, `window`, `fetch`) are host browser utilities.
7. **Async vs Defer**: `<script async>` downloads in parallel and executes immediately upon download, interrupting HTML parsing. `<script defer>` downloads in parallel and executes only after HTML parsing completes in document order.
8. **Strict Mode**: `"use strict"` turns silent errors into thrown exceptions, disables dangerous syntax, and optimizes engine execution.
9. **ASI Mechanics**: Automatic Semicolon Insertion appends missing semicolons at line breaks, but inserts unintended semicolons after `return` or `break` if followed by a newline.
10. **Statements vs Expressions**: Expressions evaluate to a value (`5 + 5`). Statements perform an action (`let x = 10;`).
11. **Variable Lifecycle**: Declaration $\rightarrow$ Initialization $\rightarrow$ Assignment $\rightarrow$ Reassignment.
12. **`var` vs `let` vs `const`**: `var` is function-scoped and hoisted to `undefined`. `let` and `const` are block-scoped and hoisted into the TDZ. `const` prohibits binding reassignment.
13. **Temporal Dead Zone (TDZ)**: The period between entering a block scope and reaching the `let`/`const` declaration line during which variable access throws `ReferenceError`.
14. **`const` Mutation**: `const` enforces immutable stack variable binding pointers; properties inside heap memory remain mutable.
15. **Identifier Rules**: Must start with a letter, `$`, or `_`. Cannot start with a digit or use reserved keywords. Case-sensitive.
16. **Naming Conventions**: `camelCase` (variables/functions), `PascalCase` (classes/React components), `UPPER_SNAKE_CASE` (global constants).
17. **Scope Levels**: Global Scope (everywhere), Function Scope (inside `function() {}`), Block Scope (inside `{}`).
18. **7 Primitives**: String, Number, BigInt, Boolean, Undefined, Null, Symbol.
19. **Null vs Undefined**: `undefined` is uninitialized system default; `null` is intentional developer assignment of no object value.
20. **Floating Point Precision**: 64-bit IEEE 754 float math cannot represent `0.1` and `0.2` infinitely exact in binary base-2, yielding `0.30000000000000004`.
21. **Safe Integers & BigInt**: Safe integers limit to $2^{53}-1$ (`9007199254740991`). `BigInt` represents arbitrary precision integers beyond this boundary.
22. **`NaN` Comparisons**: `NaN` is an unrepresentable math result. IEEE 754 dictates `NaN` is never equal to any value, including itself.
23. **`typeof null` Quirk**: Legacy 1995 C-level tag allocation bug where `null` (`0x00`) matched the object type tag `000`.
24. **Stack vs Heap**: Primitives are stored directly on the execution stack frame by value. Reference Objects are stored in Heap Memory with pointer addresses on the stack.
25. **Prefix vs Postfix**: `++x` increments before value evaluation; `x++` returns current value before incrementing.
26. **Loose vs Strict Equality**: `===` checks value AND data type without coercion. `==` performs implicit type coercion prior to value check.
27. **Short-Circuit Evaluation**: `&&` returns first falsy or last value; `||` returns first truthy or last value. Operands return actual values, not booleans.
28. **`??` vs `||`**: `||` falls back for all 8 falsy values. `??` falls back ONLY for `null` or `undefined`.
29. **Optional Chaining (`?.`)**: Safely navigates deeply nested properties, returning `undefined` if any intermediate property is `null` or `undefined`.
30. **8 Falsy Values**: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.

---

## 2. Output Prediction Solutions (1 - 30)

1. `"object"`
2. `"number"`
3. `"object"`
4. `"function"`
5. `"53"`
6. `2`
7. `10`
8. `2`
9. `10`
10. `5`
11. `NaN`
12. `"33"`
13. `"123"`
14. `true`
15. `true`
16. `true`
17. `false`
18. `false`
19. `false`
20. `true`
21. `"Dog"`
22. `""`
23. `"Default"`
24. `50`
25. `0`
26. `""`
27. `12`
28. `25`
29. `true`
30. `true`

---

## 3. Coding Challenge Solutions (1 - 20)

```javascript
// 1. Safe Float Comparator
function areFloatsEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

// 2. Universal Type Inspector
function getExactType(val) {
  if (Number.isNaN(val)) return "nan";
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}

// 3. Exact Falsy Counter
function countFalsyValues(arr) {
  return arr.filter(item => !item).length;
}

// 4. Deep Object Property Extractor
function extractCity(user) {
  return user?.address?.city ?? "Unknown City";
}

// 5. Radix Integer Sum
function sumStringIntegers(str1, str2) {
  return parseInt(str1, 10) + parseInt(str2, 10);
}

// 6. Increment Evaluator Showcase
let count = 5;
console.log("Postfix x++:", count++); // 5
console.log("Prefix ++x:", ++count);   // 7

// 7. Strict Mode Variable Safeguard
function safeVariableAssign(varName, value) {
  let safeContainer = {};
  safeContainer[varName] = value;
  return safeContainer;
}

// 8. Constant Object Mutator
function updateUserProfile(profile, newRole) {
  profile.role = newRole;
  return profile;
}

// 9. Object Freeze Checker
function isObjectFrozen(obj) {
  return Object.isFrozen(obj);
}

// 10. Boolean Converter Matrix
function toBooleanArray(arr) {
  return arr.map(item => Boolean(item));
}

// 11. Short-Circuit Default Manager
function getTimeout(config) {
  return config?.timeout ?? 3000;
}

// 12. Safe Division Guard
function safeDivide(a, b) {
  return b === 0 ? "Cannot divide by zero" : a / b;
}

// 13. BigInt Range Calculator
function addBigIntegers(a, b) {
  return BigInt(a) + BigInt(b);
}

// 14. Coercion Trace Generator
function explainLooseEquality(a, b) {
  return a == b ? `${a} and ${b} are loosely equal under coercion` : `${a} and ${b} are not equal`;
}

// 15. Array Subtype Verification
function filterArraysOnly(list) {
  return list.filter(item => Array.isArray(item));
}

// 16. Ternary Classifier
function classifyAge(age) {
  return age < 13 ? "Child" : age <= 19 ? "Teenager" : "Adult";
}

// 17. NaN Validator
function containsNaN(arr) {
  return arr.some(item => Number.isNaN(item));
}

// 18. Prefix Prefix Sum
function calculatePrefixSequence(val) {
  return ++val + ++val + ++val;
}

// 19. Template Interpolator
function formatUserCard(name, age, role) {
  return `User: ${name} | Age: ${age} | Role: ${role}`;
}

// 20. Strict Equality Filter
function strictCompare(a, b) {
  return a === b;
}
```

---

## 4. Debugging Challenge Solutions (1 - 10)

1. **ASI Return Fix**: Move `{` to the same line as `return`: `return { id: 101, name: "Alice" };`.
2. **Const Reassignment Fix**: Mutate property instead of reassigning pointer: `user.name = "Robert";`.
3. **TDZ Fix**: Place `let score = 95;` above `console.log(score);`.
4. **Loose Equality Fix**: Use strict equality `userInput === false`.
5. **Missing Radix Fix**: Add radix 10: `parseInt("010", 10)`.
6. **Float Comparison Fix**: Use `Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON`.
7. **NaN Fix**: Use `Number.isNaN(result)`.
8. **String Concatenation Fix**: Convert explicitly: `Number(price) + tax`.
9. **Null Check Fix**: Use optional chaining: `user?.name`.
10. **Logical OR Default Fix**: Use nullish coalescing: `count ?? 10`.

---

## 5. Interview Questions Solutions (1 - 10)

1. **V8 JIT Architecture**: V8 parses source code to an AST. The Ignition interpreter generates bytecode for fast startup. The TurboFan optimizing compiler monitors hot functions and translates bytecode into optimized native machine code.
2. **Function vs Block Scope**: Function scope (`var`) restricts variables to the containing function body. Block scope (`let`/`const`) restricts variables to curly braces `{}`.
3. **TDZ Mechanics**: The TDZ is the period between entering block scope and executing the variable declaration line. Accessing `let`/`const` inside the TDZ throws a `ReferenceError` because the identifier is uninitialized.
4. **Pass-by-Value vs Reference**: Primitives are allocated directly on the stack by value. Reference objects allocate payload in Heap memory and store pointer addresses on the stack. Copying objects copies pointer addresses.
5. **`typeof` Quirks**: `typeof null === "object"` is a legacy 1995 C-tag allocation bug (`000` tag). `typeof NaN === "number"` follows IEEE 754 floating-point specs where `NaN` is an internal numeric error state.
6. **Floating Point Precision**: IEEE 754 double floats store numbers in binary base-2. Decimals like `0.1` and `0.2` have repeating binary representations, causing minor precision rounding inaccuracies (`0.30000000000000004`).
7. **Short-Circuit Evaluation**: `&&` and `||` evaluate left-to-right and return the exact operand value that halted evaluation rather than coercing results to booleans.
8. **Nullish Coalescing (`??`) vs Logical OR (`||`)**: `||` falls back for all 8 falsy values (`0`, `""`, `false`, etc.). `??` falls back strictly for `null` or `undefined`, preventing valid defaults like `0` from being overwritten.
9. **Abstract Equality Trace `[] == ![]`**: `![]` evaluates to `false`. `[] == false` converts `false` to `0` and `[]` to `""`. `""` converts to `0`, resulting in `0 == 0` (`true`).
10. **Object-to-Primitive Algorithm**: JS checks `Symbol.toPrimitive(hint)`. Otherwise, for string hints it invokes `.toString()` then `.valueOf()`; for number/default hints it invokes `.valueOf()` then `.toString()`. First primitive result returned is used.
