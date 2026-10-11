# 06. Global and Local Scope Practice

> Practice problems covering 06. Global and Local Scope Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Global Scope Pollution Leak
**Description:** Write code illustrating accidental global variable creation without `var/let/const` in non-strict mode vs strict mode `ReferenceError`.

**Expected Behavior / Test:**
```js
accidentalGlobal()
```

---

## Problem 2: Function Scope Isolation
**Description:** Show that variables defined with `var`, `let`, or `const` inside a function cannot be accessed outside the function.

**Expected Behavior / Test:**
```js
testScope(); console.log(insideVar); // ReferenceError
```

---

## Problem 3: Window/GlobalThis Attachment
**Description:** Demonstrate how top-level `var` attaches to globalThis/window, whereas top-level `let` and `const` do not.

**Expected Behavior / Test:**
```js
var a = 1; let b = 2; globalThis.a vs globalThis.b
```

---

## Problem 4: Scope Chain Lookup Order
**Description:** Create nested functions accessing global, outer local, and inner local variables with the same name.

**Expected Behavior / Test:**
```js
lookupTest()
```

---

## Problem 5: Global Variable Modification from Inner Scope
**Description:** Demonstrate mutating a global variable from inside a function, and discuss why global mutable state is an anti-pattern.

**Expected Behavior / Test:**
```js
mutateGlobal()
```

---

## Problem 6: Strict Mode Scope Enforcement
**Description:** Show how `"use strict"` prevents implicit global creation and throws `ReferenceError`.

**Expected Behavior / Test:**
```js
"use strict"; x = 10;
```

---

## Problem 7: Module Scope Isolation
**Description:** Explain how ES modules automatically wrap code in module scope, preventing top-level variables from being global.

**Expected Behavior / Test:**
```js
import / export scope
```

---

## Problem 8: Function Parameter Scope Isolation
**Description:** Show that function parameters are local variables scoped to the function invocation.

**Expected Behavior / Test:**
```js
fn(param); console.log(param); // ReferenceError
```

---

## Problem 9: Multiple Invocations Local State Reset
**Description:** Demonstrate that local variables in a standard function re-initialize on every call frame.

**Expected Behavior / Test:**
```js
fn(); fn(); // local variable does not persist
```

---

## Problem 10: Overriding Global Identifiers
**Description:** Show what happens when defining a local variable `undefined` or `NaN` inside a local scope.

**Expected Behavior / Test:**
```js
localOverride()
```

---

## Problem 11: Global Namespace Pattern
**Description:** Refactor 5 global variables into a single global namespace object `AppNamespace`.

**Expected Behavior / Test:**
```js
AppNamespace.config
```

---

## Problem 12: Scope Verification Helper
**Description:** Write a snippet that tests whether a variable exists in current scope using `typeof varName`.

**Expected Behavior / Test:**
```js
typeof nonExistent // "undefined"
```

---

## Problem 13: Nested Function Parameter Access
**Description:** Show that inner function parameters mask/shadow outer function parameters of the same name.

**Expected Behavior / Test:**
```js
outer(x)(x)
```

---

## Problem 14: Eval Scope Injection Pitfall
**Description:** Show how `eval()` mutates current local scope in non-strict mode but creates isolated scope in strict mode.

**Expected Behavior / Test:**
```js
eval("var dynamic = 123")
```

---

## Problem 15: Clean Architecture State Isolation
**Description:** Convert global application state to local encapsulated state using closure functions.

**Expected Behavior / Test:**
```js
createStore()
```

---

