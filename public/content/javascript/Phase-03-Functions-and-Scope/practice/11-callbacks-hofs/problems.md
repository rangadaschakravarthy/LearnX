# 11. Callbacks & Higher-Order Functions Practice

> Practice problems covering 11. Callbacks & Higher-Order Functions Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Custom `myMap` Array Implementation
**Description:** Implement `myMap(arr, callback)` attached to `Array.prototype` without using built-in `map`.

**Expected Behavior / Test:**
```js
[1, 2].myMap(x => x * 2) // [2, 4]
```

---

## Problem 2: Custom `myFilter` Array Implementation
**Description:** Implement `myFilter(arr, predicate)` returning array of elements satisfying `predicate`.

**Expected Behavior / Test:**
```js
[1, 2, 3].myFilter(x => x > 1) // [2, 3]
```

---

## Problem 3: Custom `myReduce` Array Implementation
**Description:** Implement `myReduce(arr, reducer, initialValue)` supporting optional initial accumulator parameter.

**Expected Behavior / Test:**
```js
[1, 2, 3].myReduce((a, b) => a + b, 0) // 6
```

---

## Problem 4: Custom `myFind` and `myFindIndex`
**Description:** Implement `myFind(arr, predicate)` and `myFindIndex(arr, predicate)`.

**Expected Behavior / Test:**
```js
[10, 20].myFind(x => x > 15) // 20
```

---

## Problem 5: Custom `myEvery` and `mySome`
**Description:** Implement `myEvery(arr, predicate)` and `mySome(arr, predicate)` with early loop termination.

**Expected Behavior / Test:**
```js
[2, 4].myEvery(x => x % 2 === 0) // true
```

---

## Problem 6: Custom `myFlatMap`
**Description:** Implement `myFlatMap(arr, fn)` mapping elements and flattening the result by 1 level.

**Expected Behavior / Test:**
```js
[1, 2].myFlatMap(x => [x, x*2]) // [1, 2, 2, 4]
```

---

## Problem 7: Asynchronous Callback Simulation
**Description:** Write `asyncFetch(url, onSuccess, onError)` using `setTimeout` to simulate async network operations.

**Expected Behavior / Test:**
```js
asyncFetch("/data", console.log, console.error)
```

---

## Problem 8: Callback Error-First Pattern (Node-style)
**Description:** Write a helper `processData(data, callback)` obeying Node convention `callback(err, result)`.

**Expected Behavior / Test:**
```js
processData(d, (err, res) => ...)
```

---

## Problem 9: Debounce Function Implementation
**Description:** Implement `debounce(fn, delayMs)` returning a debounced function delaying execution until `delayMs` after last call.

**Expected Behavior / Test:**
```js
const debouncedSave = debounce(save, 300)
```

---

## Problem 10: Throttle Function Implementation
**Description:** Implement `throttle(fn, limitMs)` ensuring `fn` runs at most once per `limitMs` window.

**Expected Behavior / Test:**
```js
const throttledScroll = throttle(onScroll, 100)
```

---

## Problem 11: Custom Array Sorting HOF
**Description:** Write `sortByProperty(propName, direction = "asc")` returning a comparator callback for `Array.prototype.sort`.

**Expected Behavior / Test:**
```js
users.sort(sortByProperty("age", "desc"))
```

---

## Problem 12: Group By Array Reducer HOF
**Description:** Write `groupBy(arr, keySelector)` grouping array objects by string returned from `keySelector`.

**Expected Behavior / Test:**
```js
groupBy(items, item => item.category)
```

---

## Problem 13: Retry Async Function Callback Wrapper
**Description:** Write `retry(fn, maxRetries, delay)` attempting callback function execution up to `maxRetries` times.

**Expected Behavior / Test:**
```js
retry(fetchData, 3, 500)
```

---

## Problem 14: Callback Waterfall Orchestrator
**Description:** Write `waterfall([fn1, fn2, fn3], finalCallback)` executing async callbacks sequentially passing output to next.

**Expected Behavior / Test:**
```js
waterfall([step1, step2], done)
```

---

## Problem 15: Function Decorator Logging HOF
**Description:** Write `withLogging(fn)` returning wrapped function that logs function arguments, execution time, and return value.

**Expected Behavior / Test:**
```js
const loggedAdd = withLogging(add)
```

---

