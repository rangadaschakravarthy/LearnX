# Day 10 — Functions Basics — Detailed Theory

Welcome to **Day 10** of the JavaScript Mastery curriculum. Functions are the fundamental building blocks of JavaScript applications. This guide provides a first-principles theoretical foundation covering function declarations, function expressions, parameter handling, execution mechanics, and internal function object properties.

---

## 1. Why Functions in Phase 03? (Core Conceptual Context)

In Phase 01 and Phase 02, you learned about primitive values, operators, and control structures (`if`/`else`, `for`, `while`). Without functions, code is linear, repetitive, and untestable. 

Functions in JavaScript serve three major architectural purposes:
1. **Abstraction & Reuse**: Encapsulate complex operations behind a clean, named interface.
2. **First-Class Objects**: In JavaScript, functions are **first-class citizens**—they are objects that can be assigned to variables, passed as arguments to other functions, and returned from functions.
3. **Execution Boundary**: Calling a function creates a brand new **Execution Context** with its own local memory frame (Variable Environment).

---

## 2. Function Declarations vs. Function Expressions

JavaScript provides two primary ways to define standard functions:

```javascript
// 1. Function Declaration (Statement)
function add(a, b) {
  return a + b;
}

// 2. Function Expression
const multiply = function(a, b) {
  return a * b;
};

// 3. Named Function Expression (NFE)
const factorial = function computeFactorial(n) {
  if (n <= 1) return 1;
  return n * computeFactorial(n - 1); // Internal self-reference
};
```

### Architectural & Execution Differences

| Feature | Function Declaration | Function Expression |
| :--- | :--- | :--- |
| **Hoisting Behavior** | Fully hoisted (both identifier AND implementation body). Can be called before definition. | Variable declaration is hoisted (`var` as `undefined`, `let`/`const` in TDZ), but function body assignment is NOT hoisted. |
| **Statement vs Expression** | Standalone statement. Cannot be placed where an expression is required (e.g. argument). | Expression value. Produces a value that can be assigned, passed, or immediately invoked. |
| **Name Property (`func.name`)**| `add.name === "add"` | `multiply.name === "multiply"` (ES6 inferencing) or `computeFactorial.name === "computeFactorial"` |

```javascript
// Function Declarations work before definition due to hoisting:
greet(); // "Hello!"

function greet() {
  console.log("Hello!");
}

// Function Expressions throw ReferenceError / TypeError if called early:
// speak(); // TypeError: speak is not a function (if var) or ReferenceError (if let/const)

var speak = function() {
  console.log("Speaking...");
};
```

---

## 3. Parameters, Arguments, and Return Mechanics

### 3.1 Parameters vs. Arguments
* **Parameters**: The variable names listed in the function definition signature.
* **Arguments**: The actual runtime values passed into the function when it is invoked.

```javascript
function greetUser(name, age) { // 'name' and 'age' are PARAMETERS
  return `Hello ${name}, you are ${age} years old.`;
}

greetUser("Alice", 25); // "Alice" and 25 are ARGUMENTS
```

---

### 3.2 Parameter Defaults & Type Coercion

Before ES6, default parameters required manual checks inside the function body. Modern ES6 syntax provides **default parameter initializers**:

```javascript
// Modern ES6 Default Parameters
function createUser(username, role = "guest", isActive = true) {
  return { username, role, isActive };
}

console.log(createUser("john")); 
// { username: "john", role: "guest", isActive: true }

// Passing undefined triggers the default value:
console.log(createUser("sarah", undefined, false)); 
// { username: "sarah", role: "guest", isActive: false }

// Passing null does NOT trigger the default value!
console.log(createUser("alex", null, false)); 
// { username: "alex", role: null, isActive: false }
```

> [!IMPORTANT]
> Default parameters trigger **ONLY when the passed argument is `undefined`**. Passing `null`, `0`, `""`, or `false` does NOT trigger default initializers!

---

### 3.3 The `arguments` Object (Legacy / Standard Functions)

Inside any non-arrow function, JavaScript automatically creates a special array-like object called `arguments`:

```javascript
function sumAll() {
  console.log(arguments.length); // Total arguments passed
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sumAll(10, 20, 30, 40)); // 100
```

#### `arguments` Object Traps & Minor Points
1. **Array-like, NOT a true Array**: `arguments` has a `.length` property and indexed access (`arguments[0]`), but lacks Array prototype methods like `.map()`, `.filter()`, or `.reduce()`.
2. **Convert to Array**: Convert using `Array.from(arguments)` or spread `[...arguments]`.
3. **Non-Strict Mode Aliasing**: In non-strict mode, mutating `arguments[0]` mutates the named parameter variable! Strict mode (`"use strict"`) disables this dangerous aliasing.

---

### 3.4 Rest Parameters (`...args`) (Modern standard)

Rest parameters (`...paramName`) gather remaining arguments into a **true JavaScript Array**:

```javascript
function calculateTotal(taxRate, ...prices) {
  // 'prices' is a real Array instance!
  const subtotal = prices.reduce((sum, p) => sum + p, 0);
  return subtotal * (1 + taxRate);
}

console.log(calculateTotal(0.08, 10, 25, 50)); // 91.8
```

> [!WARNING]
> A rest parameter must be the **last parameter** in the function definition signature (`function foo(a, ...rest)`). Placing parameters after a rest parameter throws a `SyntaxError`.

---

### 3.5 Return Mechanics & Implicit `undefined`

Every function in JavaScript returns a value:
1. If an explicit `return expression;` is executed, the function immediately terminates and evaluates to `expression`.
2. If `return;` is called without an expression, the function evaluates to `undefined`.
3. If no return statement is encountered before reaching the closing `}`, the function implicitly returns `undefined`.

```javascript
function noReturn() {
  const x = 10;
}
console.log(noReturn()); // undefined

// Constructor functions invoked with `new` are an exception (returning `this` automatically unless an object is returned).
```

---

## 4. Functions as First-Class Objects & Internal Properties

Functions in JavaScript are specialized **Callable Objects**. They possess standard object capabilities (properties, methods) plus internal slots (`[[Call]]`, `[[Construct]]`, `[[Scope]]`).

### 4.1 Internal Slot Capabilities

* `[[Call]]`: Code unit execution logic. Invoked when calling `func()`.
* `[[Construct]]`: Constructor logic. Invoked when calling `new Func()`.
* `[[Scope]]`: Reference to the lexical environment where the function was created.

### 4.2 Function Object Properties

```javascript
function demo(a, b, c = 10, ...rest) {}

console.log(demo.name);   // "demo" (Function name)
console.log(demo.length); // 2! (Number of EXPECTED positional parameters BEFORE defaults)
```

> [!NOTE]
> `function.length` counts positional parameters up to the first parameter with a default value or rest parameter!

---

## 5. Minor Points, Quirks & Edge Cases

### 1. Automatic Semicolon Insertion (ASI) on Return Statements
Never place a newline between `return` and the returned expression:

```javascript
// BROKEN:
function getObject() {
  return
  {
    status: "ok"
  }; // ASI inserts semicolon after return! Function returns undefined!
}

// CORRECT:
function getObjectCorrect() {
  return {
    status: "ok"
  };
}
```

### 2. Parameter Shadowing & TDZ in Default Initializers
Default parameters execute in their own intermediate scope. A default initializer can reference earlier parameters, but referencing later parameters throws a `ReferenceError` due to Temporal Dead Zone!

```javascript
// Valid:
function f1(a, b = a * 2) { return a + b; } // f1(5) -> 15

// Invalid (TDZ):
// function f2(a = b * 2, b = 5) {} // ReferenceError: Cannot access 'b' before initialization
```

---

## 6. Senior Interview Questions & Answers

### Q1: What is the difference between `function.length` and `arguments.length`?
* **Answer**: `function.length` is a static property representing the number of formal positional parameters declared in the function definition (excluding default initializers and rest parameters). `arguments.length` is a dynamic runtime property available inside the function representing the actual count of arguments passed during invocation.

### Q2: What happens if a function expression is named, e.g., `const f = function g() {}`? Is `g` accessible in the outer scope?
* **Answer**: No. In a Named Function Expression (NFE), the identifier `g` is bound ONLY inside the local scope of the function itself (useful for recursion and stack traces). Attempting to call `g()` in the outer scope throws a `ReferenceError`.

---

## 7. Summary & Key Takeaways

1. **Declarations vs Expressions**: Function declarations are fully hoisted; function expressions are bound at runtime during variable evaluation.
2. **Rest over Arguments**: Prefer rest parameters (`...args`) over the legacy `arguments` object because rest parameters produce true Array instances.
3. **Return Behavior**: Omitted return statements evaluate to `undefined`. Beware of newline ASI traps after `return`.
4. **First-Class Objects**: Functions can have custom properties, be passed as values, and store references to their enclosing lexical scope (`[[Scope]]`).
