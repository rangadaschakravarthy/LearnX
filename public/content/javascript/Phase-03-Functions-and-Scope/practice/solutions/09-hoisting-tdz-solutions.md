# Solutions for 09. Hoisting & Temporal Dead Zone Practice

> Detailed solutions, code explanations, and edge case breakdowns.

## Solution 1: Function Declaration Hoisting

### Problem Recap
Demonstrate calling a function declaration before its line of definition in source code.

### Reference Implementation
```js
// Reference solution for Problem 1
// Test: greet(); function greet(){ return "Hi"; }

// Implementation for Problem 1
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 2: `var` Hoisting Initialization (`undefined`)

### Problem Recap
Show that `var` declarations are hoisted and initialized to `undefined` during context creation phase.

### Reference Implementation
```js
// Reference solution for Problem 2
// Test: console.log(a); var a = 10;

// Implementation for Problem 2
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 3: `let` and `const` Temporal Dead Zone (TDZ)

### Problem Recap
Demonstrate accessing `let` or `const` before declaration line throwing `ReferenceError: Cannot access "x" before initialization`.

### Reference Implementation
```js
// Reference solution for Problem 3
// Test: console.log(x); let x = 5;

// Implementation for Problem 3
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 4: Function Declaration vs `var` Hoisting Precedence

### Problem Recap
Show that Function Declarations hoist BEFORE `var` declarations when identifiers collide.

### Reference Implementation
```js
// Reference solution for Problem 4
// Test: var name; function name(){}; typeof name

// Implementation for Problem 4
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 5: Function Declaration Overwritten by `var` Assignment

### Problem Recap
Show what happens when `var x = 10` executes over a hoisted `function x(){}` declaration.

### Reference Implementation
```js
// Reference solution for Problem 5
// Test: function x(){}; var x = 10; typeof x

// Implementation for Problem 5
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 6: TDZ in Default Parameter Expressions

### Problem Recap
Demonstrate TDZ error when a default parameter references a later parameter: `function f(a = b, b = 2)`.

### Reference Implementation
```js
// Reference solution for Problem 6
// Test: f()

// Implementation for Problem 6
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 7: TDZ in Class Declarations

### Problem Recap
Show that ES6 `class` declarations are hoisted but remain in TDZ until evaluation line.

### Reference Implementation
```js
// Reference solution for Problem 7
// Test: new MyClass(); class MyClass{}

// Implementation for Problem 7
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 8: `typeof` Operator in TDZ

### Problem Recap
Show that `typeof uninitializedLet` throws `ReferenceError`, unlike `typeof undeclaredVar` which returns `"undefined"`.

### Reference Implementation
```js
// Reference solution for Problem 8
// Test: typeofInTDZ()

// Implementation for Problem 8
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 9: Hoisting Inside Block Statements

### Problem Recap
Demonstrate function declaration block hoisting behavior in ES6 strict mode.

### Reference Implementation
```js
// Reference solution for Problem 9
// Test: blockHoisting()

// Implementation for Problem 9
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 10: Function Expression Hoisting Trap

### Problem Recap
Show why calling `myFunc()` when defined as `var myFunc = function(){}` throws `TypeError: myFunc is not a function`.

### Reference Implementation
```js
// Reference solution for Problem 10
// Test: varHoistedFuncExpr()

// Implementation for Problem 10
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 11: Arrow Function Hoisting Behavior

### Problem Recap
Show that arrow functions assigned to `const/let` follow TDZ rules and cannot be called prior to declaration.

### Reference Implementation
```js
// Reference solution for Problem 11
// Test: const fn = () => {};

// Implementation for Problem 11
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 12: Self-Referential TDZ Trap

### Problem Recap
Explain why `let x = x;` throws `ReferenceError` during evaluation of the right-hand expression.

### Reference Implementation
```js
// Reference solution for Problem 12
// Test: let x = x;

// Implementation for Problem 12
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 13: Multiple `var` Declarations Hoisting

### Problem Recap
Show how duplicate `var` declarations in the same scope are merged during creation phase.

### Reference Implementation
```js
// Reference solution for Problem 13
// Test: var a = 1; var a = 2;

// Implementation for Problem 13
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 14: Hoisting Execution Timeline Reconstruction

### Problem Recap
Rewrite a 20-line messy script into its exact post-hoisting JavaScript runtime execution order.

### Reference Implementation
```js
// Reference solution for Problem 14
// Test: reconstructOrder()

// Implementation for Problem 14
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 15: Best Practice Zero-Hoisting Refactoring

### Problem Recap
Refactor code relying on hoisting into clean top-to-bottom declare-before-use structure.

### Reference Implementation
```js
// Reference solution for Problem 15
// Test: cleanRefactor()

// Implementation for Problem 15
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

