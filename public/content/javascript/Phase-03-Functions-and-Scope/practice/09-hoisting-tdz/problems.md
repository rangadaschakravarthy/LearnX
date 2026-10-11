# 09. Hoisting & Temporal Dead Zone Practice

> Practice problems covering 09. Hoisting & Temporal Dead Zone Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Function Declaration Hoisting
**Description:** Demonstrate calling a function declaration before its line of definition in source code.

**Expected Behavior / Test:**
```js
greet(); function greet(){ return "Hi"; }
```

---

## Problem 2: `var` Hoisting Initialization (`undefined`)
**Description:** Show that `var` declarations are hoisted and initialized to `undefined` during context creation phase.

**Expected Behavior / Test:**
```js
console.log(a); var a = 10;
```

---

## Problem 3: `let` and `const` Temporal Dead Zone (TDZ)
**Description:** Demonstrate accessing `let` or `const` before declaration line throwing `ReferenceError: Cannot access "x" before initialization`.

**Expected Behavior / Test:**
```js
console.log(x); let x = 5;
```

---

## Problem 4: Function Declaration vs `var` Hoisting Precedence
**Description:** Show that Function Declarations hoist BEFORE `var` declarations when identifiers collide.

**Expected Behavior / Test:**
```js
var name; function name(){}; typeof name
```

---

## Problem 5: Function Declaration Overwritten by `var` Assignment
**Description:** Show what happens when `var x = 10` executes over a hoisted `function x(){}` declaration.

**Expected Behavior / Test:**
```js
function x(){}; var x = 10; typeof x
```

---

## Problem 6: TDZ in Default Parameter Expressions
**Description:** Demonstrate TDZ error when a default parameter references a later parameter: `function f(a = b, b = 2)`.

**Expected Behavior / Test:**
```js
f()
```

---

## Problem 7: TDZ in Class Declarations
**Description:** Show that ES6 `class` declarations are hoisted but remain in TDZ until evaluation line.

**Expected Behavior / Test:**
```js
new MyClass(); class MyClass{}
```

---

## Problem 8: `typeof` Operator in TDZ
**Description:** Show that `typeof uninitializedLet` throws `ReferenceError`, unlike `typeof undeclaredVar` which returns `"undefined"`.

**Expected Behavior / Test:**
```js
typeofInTDZ()
```

---

## Problem 9: Hoisting Inside Block Statements
**Description:** Demonstrate function declaration block hoisting behavior in ES6 strict mode.

**Expected Behavior / Test:**
```js
blockHoisting()
```

---

## Problem 10: Function Expression Hoisting Trap
**Description:** Show why calling `myFunc()` when defined as `var myFunc = function(){}` throws `TypeError: myFunc is not a function`.

**Expected Behavior / Test:**
```js
varHoistedFuncExpr()
```

---

## Problem 11: Arrow Function Hoisting Behavior
**Description:** Show that arrow functions assigned to `const/let` follow TDZ rules and cannot be called prior to declaration.

**Expected Behavior / Test:**
```js
const fn = () => {};
```

---

## Problem 12: Self-Referential TDZ Trap
**Description:** Explain why `let x = x;` throws `ReferenceError` during evaluation of the right-hand expression.

**Expected Behavior / Test:**
```js
let x = x;
```

---

## Problem 13: Multiple `var` Declarations Hoisting
**Description:** Show how duplicate `var` declarations in the same scope are merged during creation phase.

**Expected Behavior / Test:**
```js
var a = 1; var a = 2;
```

---

## Problem 14: Hoisting Execution Timeline Reconstruction
**Description:** Rewrite a 20-line messy script into its exact post-hoisting JavaScript runtime execution order.

**Expected Behavior / Test:**
```js
reconstructOrder()
```

---

## Problem 15: Best Practice Zero-Hoisting Refactoring
**Description:** Refactor code relying on hoisting into clean top-to-bottom declare-before-use structure.

**Expected Behavior / Test:**
```js
cleanRefactor()
```

---

