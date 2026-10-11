# Scope: Global, Function & Block Boundaries

## 1. What is it?
**Scope** is the accessibility boundary that determines where variables, functions, and objects can be accessed or referenced within source code.

JavaScript features three primary scope levels:
1. **Global Scope**: Accessible everywhere in the application.
2. **Function Scope**: Accessible only within the declaring function.
3. **Block Scope**: Accessible only within a pair of curly braces `{}` created by `let` or `const`.

---

## 2. Why does it exist?
Scope prevents naming collisions, enables encapsulation, provides security by hiding internal implementation details, and manages memory cleanup when scopes exit.

---

## 3. Function Scope vs Block Scope

```javascript
// 1. Function Scope (var)
function functionScopeDemo() {
  if (true) {
    var functionScopedVar = "I leak out of the if block!";
  }
  console.log(functionScopedVar); // ✅ Accessible here because var is function-scoped!
}
functionScopeDemo();

// 2. Block Scope (let & const)
function blockScopeDemo() {
  if (true) {
    let blockScopedLet = "I stay inside the if block!";
    const blockScopedConst = "I also stay inside!";
  }
  // console.log(blockScopedLet); // ❌ ReferenceError: blockScopedLet is not defined
}
blockScopeDemo();
```

---

## 4. Visualizing Scope Boundaries

```text
Global Scope
└── Function Scope (fnScopeDemo)
    └── Block Scope (if (true) { ... })
        ├── let / const (trapped inside block)
        └── var (bubbles up to containing function scope)
```

---

## 5. Scope Leakage Bug with `var` inside Loops

```javascript
// ❌ Dangerous var loop leakage:
for (var i = 0; i < 3; i++) {
  // Loop logic
}
console.log("Leaked i outside loop:", i); // Output: 3 (i leaked into global/outer scope!)

// ✅ Clean let block scoping:
for (let j = 0; j < 3; j++) {
  // Loop logic
}
// console.log(j); // ❌ ReferenceError: j is not defined
```

---

## 6. Step-by-Step Explanation
1. `var i` is function-scoped (or globally scoped if declared outside a function). When the `for` loop terminates, `i` remains in memory in the outer scope with a value of `3`.
2. `let j` is block-scoped to each iteration of the loop block `{}`. When the loop ends, `j` is garbage collected and inaccessible outside the loop.

---

## 7. Common Mistakes

```text
⚠️ JavaScript Gotcha: Assuming if statements create scope for var
```

### Incorrect Assumption:
Thinking variables declared with `var` inside an `if` block are hidden.

### Reality:
`if`, `for`, `while`, and `{}` blocks do NOT constrain `var`! Only functions constrain `var`.

---

## 8. Edge Cases
- Declaring a variable without `var`, `let`, or `const` in non-strict mode automatically attaches it to the Global object (`window` in browser / `global` in Node), causing global scope pollution!

---

## 9. Interview Perspective

### 🎯 Interview Focus
- **Q: What is the difference between Function Scope and Block Scope?**
  - *Answer*: Function scope restricts variable access to the containing `function() {}` body (applies to `var`). Block scope restricts variable access to any enclosing pair of curly braces `{}` such as `if`, `for`, or standalone blocks (applies to `let` and `const`).

---

## 10. Practice Questions
1. Is a variable declared with `let` inside an `if` block accessible outside the `if` block?
2. Is a variable declared with `var` inside an `if` block accessible outside the `if` block?
3. What happens if you declare a variable inside a function using `const` and try to access it outside?

---

## 11. Key Takeaways
- `var` is function-scoped; `let` and `const` are block-scoped (`{}`).
- Block scope prevents variables inside `if` statements and loops from leaking out into outer code.
- Avoid accidental global variable creation by using strict mode and explicit variable keywords.
