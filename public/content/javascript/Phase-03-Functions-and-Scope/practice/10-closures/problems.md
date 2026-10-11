# 10. Closures Practice

> Practice problems covering 10. Closures Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Stateful Counter Factory
**Description:** Write `createCounter(initialCount)` returning `{ increment, decrement, getCount, reset }`.

**Expected Behavior / Test:**
```js
c = createCounter(5); c.increment(); c.getCount() // 6
```

---

## Problem 2: Function Execution Limit (`once`)
**Description:** Write `once(fn)` returning a function that executes `fn` only on the first call, returning cached result thereafter.

**Expected Behavior / Test:**
```js
const init = once(setup); init(); init();
```

---

## Problem 3: Generic Memoization Function
**Description:** Write `memoize(fn)` that caches return values based on stringified argument inputs.

**Expected Behavior / Test:**
```js
const fastCalc = memoize(slowCalc)
```

---

## Problem 4: Private Bank Account Module Pattern
**Description:** Create `createBankAccount(initialBalance)` encapsulating private `balance` and `transactionHistory`.

**Expected Behavior / Test:**
```js
account.deposit(100); account.getBalance()
```

---

## Problem 5: Curried Addition via Closures
**Description:** Write `add(a)(b)(c)` returning the sum `a + b + c` using nested closure function returns.

**Expected Behavior / Test:**
```js
add(1)(2)(3) // 6
```

---

## Problem 6: Delayed Execution Logger
**Description:** Write `createLogger(prefix)` returning a function `(msg) => console.log(`[${prefix}] ${msg}`)`.

**Expected Behavior / Test:**
```js
const logErr = createLogger("ERROR"); logErr("Failed")
```

---

## Problem 7: Fix Loop Closure Bug (`var` vs `let`)
**Description:** Fix the classic loop closure bug where 3 `setTimeout` callbacks log `3, 3, 3` instead of `0, 1, 2`.

**Expected Behavior / Test:**
```js
loopClosureFix()
```

---

## Problem 8: Closure Memory Leak Pitfall
**Description:** Demonstrate how holding a reference to an inner closure can unintentionally retain a large array in memory.

**Expected Behavior / Test:**
```js
memoryLeakDemo()
```

---

## Problem 9: Custom Event Emitter with Private Handlers
**Description:** Implement `createEventEmitter()` keeping subscriber listener arrays private inside closure scope.

**Expected Behavior / Test:**
```js
emitter.on("evt", cb); emitter.emit("evt")
```

---

## Problem 10: Rate Limiter Function Wrapper
**Description:** Write `createRateLimiter(fn, limit, intervalMs)` allowing at most `limit` calls every `intervalMs`.

**Expected Behavior / Test:**
```js
limitedFn()
```

---

## Problem 11: Toggle State Generator
**Description:** Write `createToggle(val1, val2)` returning a function that alternates returning `val1` and `val2` on each call.

**Expected Behavior / Test:**
```js
toggle() // val1, toggle() // val2, toggle() // val1
```

---

## Problem 12: Private Key-Value Store
**Description:** Implement `createStore()` with `set(key, val)`, `get(key)`, `has(key)`, `delete(key)` and no direct object access.

**Expected Behavior / Test:**
```js
store.set("a", 1)
```

---

## Problem 13: Partial Application Helper (`partial`)
**Description:** Write `partial(fn, ...presetArgs)` returning a new function that takes remaining arguments.

**Expected Behavior / Test:**
```js
const add5 = partial(add, 5); add5(10) // 15
```

---

## Problem 14: Closure-Based Iterator Function
**Description:** Write `createIterator(array)` returning `{ next: () => ({ value, done }) }`.

**Expected Behavior / Test:**
```js
iter.next()
```

---

## Problem 15: Infinite Currying Function (`add(1)(2)...()`)
**Description:** Write an infinitely curried function `currySum(n)` that returns new curried functions until called with no arguments `()`.

**Expected Behavior / Test:**
```js
currySum(1)(2)(3)() // 6
```

---

