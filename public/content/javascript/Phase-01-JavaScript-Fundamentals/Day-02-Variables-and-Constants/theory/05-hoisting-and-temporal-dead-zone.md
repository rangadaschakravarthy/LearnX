# Hoisting Mechanisms & Temporal Dead Zone (TDZ)

## 1. What is it?
**Hoisting** is a JavaScript engine mechanism where variable and function declarations are conceptually moved to the top of their containing scope during the compilation phase before code is executed line-by-line.

The **Temporal Dead Zone (TDZ)** is the time window between entering a block scope and executing the actual declaration line of a `let` or `const` variable, during which accessing the variable throws a `ReferenceError`.

---

## 2. Hoisting Behavior Across Keywords

| Keyword | Is Hoisted? | Initial Value During Hoisting Phase | Access Before Line Throws Error? |
| :--- | :--- | :--- | :--- |
| **`var`** | ✅ Yes | `undefined` | ❌ No error (returns `undefined`) |
| **`let`** | ✅ Yes | *Uninitialized (In TDZ)* | ✅ Throws `ReferenceError` |
| **`const`** | ✅ Yes | *Uninitialized (In TDZ)* | ✅ Throws `ReferenceError` |
| **`function` Declaration** | ✅ Yes | Complete Function Object | ❌ No error (executes function) |

---

## 3. `var` Hoisting Mechanics

```javascript
// What you write:
console.log(varGreeting); // Output: undefined
var varGreeting = "Hello World";

// How JavaScript engine parses and executes it:
var varGreeting; // 1. Hoisted to top of scope and initialized to undefined
console.log(varGreeting); // 2. Logs undefined
varGreeting = "Hello World"; // 3. Assignment occurs at original line position
```

---

## 4. `let` & `const` Hoisting + Temporal Dead Zone (TDZ)

```javascript
{
  // === TDZ START FOR 'userScore' ===
  // console.log(userScore); // ❌ ReferenceError: Cannot access 'userScore' before initialization
  
  let userScore = 95; // === TDZ END FOR 'userScore' ===
  console.log(userScore); // ✅ Logs 95
}
```

---

## 5. Function Declaration Hoisting

Function declarations are fully hoisted with their complete implementation, allowing functions to be called *before* they appear in the file:

```javascript
// ✅ Works perfectly! Function declaration is fully hoisted.
sayHello();

function sayHello() {
  console.log("Hello from a hoisted function declaration!");
}

// ❌ Function Expression with let/var fails!
// sayGoodbye(); // TypeError: sayGoodbye is not a function (if var) or ReferenceError (if let)
var sayGoodbye = function() {
  console.log("Goodbye!");
};
```

---

## 6. Step-by-Step Explanation
1. During the Creation Phase, the engine scans the code block and registers `varGreeting`, `userScore`, and `sayHello` in scope memory.
2. `varGreeting` is initialized to `undefined`.
3. `userScore` (`let`) is placed in the TDZ marked as uninitialized.
4. `sayHello` is fully bound to its function body.
5. Execution Phase begins line-by-line.

---

## 7. Common Mistakes

```text
⚠️ JavaScript Gotcha: Shadowing Outer Variables in TDZ
```

```javascript
let count = 10;

function printCount() {
  // TDZ for inner count starts at function entry!
  console.log(count); // ❌ ReferenceError: Cannot access 'count' before initialization
  let count = 20;
}
printCount();
```

---

## 8. Edge Cases
- `typeof` on an unassigned undeclared variable returns `"undefined"`. But `typeof` on a `let` variable inside its TDZ throws a `ReferenceError`!

```javascript
console.log(typeof undeclaredVar); // "undefined" (Safe)
// console.log(typeof tdzVar);      // ❌ ReferenceError!
let tdzVar = 5;
```

---

## 9. Interview Perspective

### 🧠 Deep Concept Interview Questions
- **Q: Are `let` and `const` hoisted in JavaScript?**
  - *Answer*: Yes! `let` and `const` ARE hoisted to the top of their block scope during the compilation phase. However, unlike `var` (which is initialized to `undefined`), `let` and `const` remain uninitialized in the Temporal Dead Zone (TDZ). Accessing them before their declaration line is reached results in a `ReferenceError`.

---

## 10. Practice Questions
1. Predict the output of `console.log(a); var a = 5;`.
2. What error is thrown when accessing a `const` variable inside its TDZ?
3. Can a function expression declared with `var` be invoked before its assignment line?

---

## 11. Key Takeaways
- All variable declarations (`var`, `let`, `const`, `function`) are hoisted during compilation.
- `var` is initialized to `undefined` on hoisting.
- `let` and `const` are hoisted into the **Temporal Dead Zone (TDZ)** and throw a `ReferenceError` if accessed before initialization.
- Function declarations are fully hoisted with their bodies.
