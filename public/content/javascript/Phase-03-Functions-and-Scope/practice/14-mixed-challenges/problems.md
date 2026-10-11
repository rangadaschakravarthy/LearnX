# 14. Mixed Challenges Practice

> Practice problems covering 14. Mixed Challenges Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Functional Pipeline Builder
**Description:** Build a class/factory `createPipeline()` supporting `.pipe(fn)`, `.execute(initialValue)`, `.reset()` with scope isolation.

**Expected Behavior / Test:**
```js
p.pipe(double).pipe(add1).execute(5) // 11
```

---

## Problem 2: Memoized Async Data Queue
**Description:** Combine closures, HOFs, and callbacks to build an async task queue executing at most N concurrent tasks.

**Expected Behavior / Test:**
```js
queue.add(task1)
```

---

## Problem 3: Reactive Event Store with Subscriptions
**Description:** Implement a reactive state container `createStateStore(initialState)` with `.subscribe(listener)` returning unsubscribe function.

**Expected Behavior / Test:**
```js
const unsub = store.subscribe(...)
```

---

## Problem 4: Recursive Schema Validator
**Description:** Write `validateSchema(data, schema)` matching nested types/validators against complex JSON payload.

**Expected Behavior / Test:**
```js
validateSchema(user, userSchema)
```

---

## Problem 5: Custom Currying Engine (`curry(fn)`)
**Description:** Write a auto-currying wrapper `curry(fn)` allowing partial parameter application until arity `fn.length` is reached.

**Expected Behavior / Test:**
```js
curriedAdd(1)(2)(3) === curriedAdd(1, 2)(3)
```

---

## Problem 6: Middleware Pipeline Execution (Express Style)
**Description:** Implement `createMiddlewareRunner()` executing array of middleware callbacks `(req, res, next) => ...`.

**Expected Behavior / Test:**
```js
runner.use(m1); runner.run(req, res)
```

---

## Problem 7: Safe Deep Nested Immutable Updater
**Description:** Write `setDeepValue(obj, pathString, newValue)` returning a new object copy with nested property updated without mutating original.

**Expected Behavior / Test:**
```js
setDeepValue(state, "a.b.c", 100)
```

---

## Problem 8: Memoized Recursive Dynamic Programming
**Description:** Solve the 0/1 Knapsack or Coin Change problem using memoized recursion and lexical closure state.

**Expected Behavior / Test:**
```js
coinChange([1, 2, 5], 11) // 3
```

---

## Problem 9: Method Interceptor / AOP Decorator
**Description:** Write `interceptMethods(obj, beforeCb, afterCb)` wrapping object methods with before and after telemetry hooks.

**Expected Behavior / Test:**
```js
interceptMethods(service, logBefore, logAfter)
```

---

## Problem 10: Dependency Injection Container
**Description:** Build a lightweight DI container `createContainer()` allowing factory registration and auto-resolving dependencies.

**Expected Behavior / Test:**
```js
container.register("db", dbFactory); container.get("app")
```

---

## Problem 11: Undo/Redo State Manager
**Description:** Implement a state history stack using closures supporting `.set(val)`, `.undo()`, `.redo()`, `.canUndo()`.

**Expected Behavior / Test:**
```js
manager.set(1); manager.undo() // previous state
```

---

## Problem 12: Recursive Tree Difference Finder
**Description:** Write `diffTrees(treeA, treeB)` identifying added, modified, and deleted properties recursively.

**Expected Behavior / Test:**
```js
diffTrees(a, b)
```

---

## Problem 13: Async Retrying Circuit Breaker
**Description:** Build `createCircuitBreaker(fn, failureThreshold, resetTimeout)` managing CLOSED, OPEN, and HALF-OPEN states.

**Expected Behavior / Test:**
```js
breaker.execute()
```

---

## Problem 14: Dynamic Expression Evaluator
**Description:** Combine currying, recursion, and higher-order functions to parse and evaluate mathematical strings cleanly.

**Expected Behavior / Test:**
```js
evaluate("3 + 5 * 2")
```

---

## Problem 15: Master Scope and Closure Audit Challenge
**Description:** Analyze a complex 50-line legacy JavaScript snippet with multiple closures, parameter shadowing, hoisting, and async callbacks.

**Expected Behavior / Test:**
```js
masterAudit()
```

---

