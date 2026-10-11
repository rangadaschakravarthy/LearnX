# 08. Lexical Environment & Scope Chain Practice

> Practice problems covering 08. Lexical Environment & Scope Chain Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Lexical Environment Record Structure
**Description:** Trace Environment Record (Environment Record + Outer Env Reference) for 3 nested function levels.

**Expected Behavior / Test:**
```js
traceEnv()
```

---

## Problem 2: Static (Lexical) Scoping vs Dynamic Scoping
**Description:** Demonstrate that JavaScript uses static lexical scoping based on where functions are defined, NOT where invoked.

**Expected Behavior / Test:**
```js
staticScopeDemo()
```

---

## Problem 3: Outer Environment Pointer Resolution
**Description:** Show how an inner function resolves identifiers by traversing `[[Environment]]` pointers up to Global Environment.

**Expected Behavior / Test:**
```js
scopeLookupTrace()
```

---

## Problem 4: Call Stack vs Lexical Scope Chain
**Description:** Write code where Call Stack execution order differs completely from the Lexical Scope lookup chain.

**Expected Behavior / Test:**
```js
callStackVsLexical()
```

---

## Problem 5: Creation Phase vs Execution Phase
**Description:** Explain the 2-step process of Execution Context lifecycle (Creation: Environment Record setup; Execution: code run).

**Expected Behavior / Test:**
```js
lifecycleTrace()
```

---

## Problem 6: Global Environment Record Details
**Description:** Differentiate Object Environment Record (global object properties) vs Declarative Environment Record (let/const).

**Expected Behavior / Test:**
```js
globalEnvDetail()
```

---

## Problem 7: Lexical Scope in Returned Functions
**Description:** Show that a returned function retains reference to its parent Lexical Environment after parent context pops off call stack.

**Expected Behavior / Test:**
```js
retainedEnv()
```

---

## Problem 8: Identifier Lookup Failure (`ReferenceError`)
**Description:** Trace the scope lookup chain when an identifier does not exist in any environment record, producing `ReferenceError`.

**Expected Behavior / Test:**
```js
lookupFail()
```

---

## Problem 9: Multiple Instances Fresh Lexical Environments
**Description:** Demonstrate that each function invocation creates a NEW unique Lexical Environment Record.

**Expected Behavior / Test:**
```js
freshEnvPerCall()
```

---

## Problem 10: Lexical Scope of Arrow Functions
**Description:** Show how arrow functions do not create their own `this`, `arguments`, `super`, or `new.target` environment bindings.

**Expected Behavior / Test:**
```js
arrowLexicalBindings()
```

---

## Problem 11: With Statement Lexical Mutation (Deprecated)
**Description:** Explain why `with(obj)` dynamically injects `obj` into scope chain causing unpredictability and strict mode error.

**Expected Behavior / Test:**
```js
withStatementExplanation()
```

---

## Problem 12: Lexical Scope in Callbacks
**Description:** Trace the scope lookup of a callback function passed to `Array.prototype.map`.

**Expected Behavior / Test:**
```js
callbackScopeTrace()
```

---

## Problem 13: Module Lexical Environment
**Description:** Explain how ES Module Environment Record links top-level imports statically before execution.

**Expected Behavior / Test:**
```js
moduleEnvTrace()
```

---

## Problem 14: Garbage Collection of Lexical Environments
**Description:** Explain when a Lexical Environment is garbage collected vs retained by reachable outer references.

**Expected Behavior / Test:**
```js
gcTrace()
```

---

## Problem 15: Complex Scope Diagramming Problem
**Description:** Given a code block, map out the exact Lexical Environment tree with key-value bindings and outer references.

**Expected Behavior / Test:**
```js
diagramMap()
```

---

