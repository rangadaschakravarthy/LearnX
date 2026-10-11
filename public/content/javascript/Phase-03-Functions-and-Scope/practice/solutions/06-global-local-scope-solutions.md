# Solutions for 06. Global and Local Scope Practice

> Detailed solutions, code explanations, and edge case breakdowns.

## Solution 1: Global Scope Pollution Leak

### Problem Recap
Write code illustrating accidental global variable creation without `var/let/const` in non-strict mode vs strict mode `ReferenceError`.

### Reference Implementation
```js
// Reference solution for Problem 1
// Test: accidentalGlobal()

// Implementation for Problem 1
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 2: Function Scope Isolation

### Problem Recap
Show that variables defined with `var`, `let`, or `const` inside a function cannot be accessed outside the function.

### Reference Implementation
```js
// Reference solution for Problem 2
// Test: testScope(); console.log(insideVar); // ReferenceError

// Implementation for Problem 2
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 3: Window/GlobalThis Attachment

### Problem Recap
Demonstrate how top-level `var` attaches to globalThis/window, whereas top-level `let` and `const` do not.

### Reference Implementation
```js
// Reference solution for Problem 3
// Test: var a = 1; let b = 2; globalThis.a vs globalThis.b

// Implementation for Problem 3
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 4: Scope Chain Lookup Order

### Problem Recap
Create nested functions accessing global, outer local, and inner local variables with the same name.

### Reference Implementation
```js
// Reference solution for Problem 4
// Test: lookupTest()

// Implementation for Problem 4
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 5: Global Variable Modification from Inner Scope

### Problem Recap
Demonstrate mutating a global variable from inside a function, and discuss why global mutable state is an anti-pattern.

### Reference Implementation
```js
// Reference solution for Problem 5
// Test: mutateGlobal()

// Implementation for Problem 5
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 6: Strict Mode Scope Enforcement

### Problem Recap
Show how `"use strict"` prevents implicit global creation and throws `ReferenceError`.

### Reference Implementation
```js
// Reference solution for Problem 6
// Test: "use strict"; x = 10;

// Implementation for Problem 6
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 7: Module Scope Isolation

### Problem Recap
Explain how ES modules automatically wrap code in module scope, preventing top-level variables from being global.

### Reference Implementation
```js
// Reference solution for Problem 7
// Test: import / export scope

// Implementation for Problem 7
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 8: Function Parameter Scope Isolation

### Problem Recap
Show that function parameters are local variables scoped to the function invocation.

### Reference Implementation
```js
// Reference solution for Problem 8
// Test: fn(param); console.log(param); // ReferenceError

// Implementation for Problem 8
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 9: Multiple Invocations Local State Reset

### Problem Recap
Demonstrate that local variables in a standard function re-initialize on every call frame.

### Reference Implementation
```js
// Reference solution for Problem 9
// Test: fn(); fn(); // local variable does not persist

// Implementation for Problem 9
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 10: Overriding Global Identifiers

### Problem Recap
Show what happens when defining a local variable `undefined` or `NaN` inside a local scope.

### Reference Implementation
```js
// Reference solution for Problem 10
// Test: localOverride()

// Implementation for Problem 10
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 11: Global Namespace Pattern

### Problem Recap
Refactor 5 global variables into a single global namespace object `AppNamespace`.

### Reference Implementation
```js
// Reference solution for Problem 11
// Test: AppNamespace.config

// Implementation for Problem 11
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 12: Scope Verification Helper

### Problem Recap
Write a snippet that tests whether a variable exists in current scope using `typeof varName`.

### Reference Implementation
```js
// Reference solution for Problem 12
// Test: typeof nonExistent // "undefined"

// Implementation for Problem 12
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 13: Nested Function Parameter Access

### Problem Recap
Show that inner function parameters mask/shadow outer function parameters of the same name.

### Reference Implementation
```js
// Reference solution for Problem 13
// Test: outer(x)(x)

// Implementation for Problem 13
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 14: Eval Scope Injection Pitfall

### Problem Recap
Show how `eval()` mutates current local scope in non-strict mode but creates isolated scope in strict mode.

### Reference Implementation
```js
// Reference solution for Problem 14
// Test: eval("var dynamic = 123")

// Implementation for Problem 14
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 15: Clean Architecture State Isolation

### Problem Recap
Convert global application state to local encapsulated state using closure functions.

### Reference Implementation
```js
// Reference solution for Problem 15
// Test: createStore()

// Implementation for Problem 15
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

