# JavaScript Technical Glossary

A dictionary of key JavaScript terminology, engine components, and core language specifications.

---

### A
- **Automatic Semicolon Insertion (ASI)**: A JavaScript engine parser feature that automatically inserts missing semicolons at line breaks according to specific grammar rules.

### B
- **BigInt**: A primitive numeric data type capable of representing integers beyond the safe integer limit (`2^53 - 1`) of the `Number` type.
- **Block Scope**: A variable visibility boundary defined by curly braces `{}` created using `let` or `const`.
- **Brendan Eich**: The creator of JavaScript, who developed the initial version in 10 days in May 1995 while working at Netscape Communications.

### C
- **Call Stack**: A LIFO (Last-In, First-Out) data structure used by the JavaScript engine to keep track of execution contexts and function invocations.
- **Coercion**: The implicit (automatic) conversion of values from one data type to another performed by the engine during operation evaluation.

### D
- **Declaration**: The syntax used to introduce a new identifier to a program (e.g., `let x;`).
- **DevTools**: Browser developer utilities (Console, Sources, Network, Inspector) built into modern web browsers for debugging and performance profiling.

### E
- **ECMAScript (ES)**: The standardized specification (ECMA-262) that defines the syntax, types, and core semantics of the JavaScript language.
- **ECMAScript Engine**: A computer program or interpreter that executes JavaScript source code (e.g., V8, SpiderMonkey, JavaScriptCore).
- **Expression**: Any valid unit of code that resolves to a single value.

### F
- **Falsy**: A value that converts to `false` when evaluated in a boolean context. (JavaScript has 8 falsy values).

### H
- **Hoisting**: The behavior in JavaScript where variable and function declarations are conceptually moved to the top of their containing scope during compilation.

### I
- **Identifier**: A developer-defined name given to variables, functions, parameters, or properties.
- **Immutability**: The characteristic of a data value that prevents it from being altered after creation (all primitive values are immutable).
- **Initialization**: The act of assigning an initial value to a declared variable for the first time.

### J
- **JavaScriptCore (JSC / Nitro)**: The open-source JavaScript engine developed by Apple for Safari and WebKit.
- **JIT Compilation (Just-In-Time)**: A hybrid compilation technique where bytecode is compiled into native machine code at runtime immediately before execution.

### L
- **Literal**: A fixed value directly specified in source code (e.g., `"hello"`, `42`, `true`, `{}`).

### N
- **NaN (Not-a-Number)**: A special primitive numeric value representing an unrepresentable or undefined computational result.
- **Nullish Coalescing Operator (`??`)**: A logical operator that returns its right-hand operand when its left-hand operand is `null` or `undefined`.

### P
- **Primitive Type**: A fundamental data type that represents a single immutable value (String, Number, BigInt, Boolean, Undefined, Null, Symbol).

### R
- **Reference Type**: A data type (Object, Array, Function) that stores a memory reference pointing to the actual location in heap memory rather than storing the raw value directly.
- **Runtime Environment**: The hosting environment (e.g., Browser window/DOM, Node.js process) that provides JavaScript engines with Web/System APIs and event loop mechanics.

### S
- **Scope**: The current context of execution defining where variables and expressions are accessible or visible.
- **SpiderMonkey**: The open-source JavaScript engine developed by Mozilla for Firefox.
- **Statement**: A unit of code that performs an action or controls program execution flow (e.g., `if`, `for`, `let x = 5;`).
- **Strict Mode (`"use strict"`)**: A restricted variant of JavaScript that eliminates silent errors by throwing explicit exceptions and disabling problematic legacy syntax.

### T
- **TC39 (Technical Committee 39)**: The committee within Ecma International responsible for maintaining and evolving the ECMAScript standard.
- **Temporal Dead Zone (TDZ)**: The time window between entering a scope and reaching the line where a `let` or `const` variable is declared, during which accessing the variable throws a `ReferenceError`.
- **Truthy**: Any value that converts to `true` when evaluated in a boolean context.

### V
- **V8**: Google's open-source, high-performance C++ JavaScript and WebAssembly engine used in Chrome, Node.js, and Deno.
