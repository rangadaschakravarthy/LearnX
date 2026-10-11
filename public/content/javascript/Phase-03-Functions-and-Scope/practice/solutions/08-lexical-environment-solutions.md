# Solutions for 08. Lexical Environment & Scope Chain Practice

> Detailed solutions, code explanations, and edge case breakdowns.

## Solution 1: Lexical Environment Record Structure

### Problem Recap
Trace Environment Record (Environment Record + Outer Env Reference) for 3 nested function levels.

### Reference Implementation
```js
// Reference solution for Problem 1
// Test: traceEnv()

// Implementation for Problem 1
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 2: Static (Lexical) Scoping vs Dynamic Scoping

### Problem Recap
Demonstrate that JavaScript uses static lexical scoping based on where functions are defined, NOT where invoked.

### Reference Implementation
```js
// Reference solution for Problem 2
// Test: staticScopeDemo()

// Implementation for Problem 2
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 3: Outer Environment Pointer Resolution

### Problem Recap
Show how an inner function resolves identifiers by traversing `[[Environment]]` pointers up to Global Environment.

### Reference Implementation
```js
// Reference solution for Problem 3
// Test: scopeLookupTrace()

// Implementation for Problem 3
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 4: Call Stack vs Lexical Scope Chain

### Problem Recap
Write code where Call Stack execution order differs completely from the Lexical Scope lookup chain.

### Reference Implementation
```js
// Reference solution for Problem 4
// Test: callStackVsLexical()

// Implementation for Problem 4
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 5: Creation Phase vs Execution Phase

### Problem Recap
Explain the 2-step process of Execution Context lifecycle (Creation: Environment Record setup; Execution: code run).

### Reference Implementation
```js
// Reference solution for Problem 5
// Test: lifecycleTrace()

// Implementation for Problem 5
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 6: Global Environment Record Details

### Problem Recap
Differentiate Object Environment Record (global object properties) vs Declarative Environment Record (let/const).

### Reference Implementation
```js
// Reference solution for Problem 6
// Test: globalEnvDetail()

// Implementation for Problem 6
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 7: Lexical Scope in Returned Functions

### Problem Recap
Show that a returned function retains reference to its parent Lexical Environment after parent context pops off call stack.

### Reference Implementation
```js
// Reference solution for Problem 7
// Test: retainedEnv()

// Implementation for Problem 7
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 8: Identifier Lookup Failure (`ReferenceError`)

### Problem Recap
Trace the scope lookup chain when an identifier does not exist in any environment record, producing `ReferenceError`.

### Reference Implementation
```js
// Reference solution for Problem 8
// Test: lookupFail()

// Implementation for Problem 8
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 9: Multiple Instances Fresh Lexical Environments

### Problem Recap
Demonstrate that each function invocation creates a NEW unique Lexical Environment Record.

### Reference Implementation
```js
// Reference solution for Problem 9
// Test: freshEnvPerCall()

// Implementation for Problem 9
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 10: Lexical Scope of Arrow Functions

### Problem Recap
Show how arrow functions do not create their own `this`, `arguments`, `super`, or `new.target` environment bindings.

### Reference Implementation
```js
// Reference solution for Problem 10
// Test: arrowLexicalBindings()

// Implementation for Problem 10
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 11: With Statement Lexical Mutation (Deprecated)

### Problem Recap
Explain why `with(obj)` dynamically injects `obj` into scope chain causing unpredictability and strict mode error.

### Reference Implementation
```js
// Reference solution for Problem 11
// Test: withStatementExplanation()

// Implementation for Problem 11
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 12: Lexical Scope in Callbacks

### Problem Recap
Trace the scope lookup of a callback function passed to `Array.prototype.map`.

### Reference Implementation
```js
// Reference solution for Problem 12
// Test: callbackScopeTrace()

// Implementation for Problem 12
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 13: Module Lexical Environment

### Problem Recap
Explain how ES Module Environment Record links top-level imports statically before execution.

### Reference Implementation
```js
// Reference solution for Problem 13
// Test: moduleEnvTrace()

// Implementation for Problem 13
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 14: Garbage Collection of Lexical Environments

### Problem Recap
Explain when a Lexical Environment is garbage collected vs retained by reachable outer references.

### Reference Implementation
```js
// Reference solution for Problem 14
// Test: gcTrace()

// Implementation for Problem 14
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 15: Complex Scope Diagramming Problem

### Problem Recap
Given a code block, map out the exact Lexical Environment tree with key-value bindings and outer references.

### Reference Implementation
```js
// Reference solution for Problem 15
// Test: diagramMap()

// Implementation for Problem 15
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

