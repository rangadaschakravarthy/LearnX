# Day 42 — Higher-Order Functions & Abstraction — Detailed Theory

Welcome to **Day 42** of the JavaScript Mastery curriculum. In JavaScript, functions are **First-Class Citizens**. They can be assigned to variables, passed as arguments to other functions, and returned from functions. A **Higher-Order Function (HOF)** is any function that operates on other functions by taking them as parameters, returning them, or both.

This guide provides an exhaustive theoretical foundation covering Higher-Order Functions, Function Composition (`pipe` and `compose`), Custom Decorators (`once`, `memoize`), and implementing built-in Array iteration methods from scratch.

---

## 1. First-Principles Definition of a Higher-Order Function

> **Formal Definition**: A function $f$ is a **Higher-Order Function** if and only if:
> 1. It accepts one or more functions as arguments (e.g. `arr.map(fn)`), OR
> 2. It returns a function as its output value (e.g. `const curried = multiply(2)`).

```javascript
// 1. HOF Accepting a Function Argument
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i); // Invokes function parameter
  }
}

repeat(3, console.log); // Logs 0, 1, 2

// 2. HOF Returning a New Function
function createMultiplier(factor) {
  return function(number) { // Returns inner function holding 'factor' in closure
    return number * factor;
  };
}

const double = createMultiplier(2);
console.log(double(5)); // 10
```

---

## 2. Function Composition: `compose()` vs. `pipe()`

**Function Composition** is an mathematical operation that takes two or more functions and combines them into a single new function: $h(x) = (f \circ g)(x) = f(g(x))$.

* **`compose(...fns)`**: Executes functions **Right-to-Left** (matching standard mathematical notation $f(g(x))$).
* **`pipe(...fns)`**: Executes functions **Left-to-Right** (matching standard UNIX pipeline `data | step1 | step2`).

```javascript
const add5 = x => x + 5;
const multiplyBy3 = x => x * 3;
const square = x => x * x;

// 1. Pipe: Left-to-Right Execution Flow (x -> add5 -> multiplyBy3 -> square)
const pipe = (...fns) => initialVal => 
  fns.reduce((acc, fn) => fn(acc), initialVal);

const processPipe = pipe(add5, multiplyBy3, square);
console.log(processPipe(2)); 
// Step 1: 2 + 5 = 7
// Step 2: 7 * 3 = 21
// Step 3: 21 * 21 = 441

// 2. Compose: Right-to-Left Execution Flow (square <- multiplyBy3 <- add5 <- x)
const compose = (...fns) => initialVal => 
  fns.reduceRight((acc, fn) => fn(acc), initialVal);

const processCompose = compose(square, multiplyBy3, add5);
console.log(processCompose(2)); // 441
```

---

## 3. Function Decorators (HOF Wrappers)

A **Function Decorator** is an HOF that takes a target function, wraps it with cross-cutting behavior (logging, caching, rate limiting), and returns the enhanced function.

### 3.1 The `once()` Decorator
Guarantees a function can be invoked ONLY ONCE, ignoring subsequent calls:

```javascript
function once(fn) {
  let executed = false;
  let result;

  return function(...args) {
    if (!executed) {
      executed = true;
      result = fn.apply(this, args);
    }
    return result; // Returns cached result on subsequent calls
  };
}

const initializeDB = once(() => {
  console.log("Database Connection Initialized!");
  return { status: "connected" };
});

initializeDB(); // Logs "Database Connection Initialized!"
initializeDB(); // Ignored! Returns cached status.
```

---

### 3.2 The `memoize()` Decorator
Caches function return values based on input arguments:

```javascript
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key); // Return cached result
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowSquare = memoize(n => {
  console.log("Computing square...");
  return n * n;
});

console.log(slowSquare(4)); // Computing square... 16
console.log(slowSquare(4)); // 16 (Returned from Cache instantly!)
```

---

## 4. Implementing Core Array HOFs From Scratch

Implementing Array HOFs demonstrates deep mastery of callbacks, iteration, and array state:

```javascript
// Custom myMap
Array.prototype.myMap = function(callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // Skip sparse holes
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};

// Custom myFilter
Array.prototype.myFilter = function(callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// Custom myReduce
Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;

  if (arguments.length < 2) {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    acc = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      acc = callback(acc, this[i], i, this);
    }
  }
  return acc;
};
```

---

## 5. Minor Points, Quirks & Traps

### 1. Loss of `length` and `name` Properties on Wrapped Functions
When wrapping a function inside an HOF decorator, the wrapper function defaults to `length: 0` and `name: ""` (or the wrapper name). To preserve original function metadata, copy properties or use `Object.defineProperty()`.

---

## 6. Senior Interview Questions & Answers

### Q1: What is the difference between `pipe()` and `compose()` in functional programming?
* **Answer**: Both `pipe` and `compose` take an array of functions and return a single composite function where the output of each function becomes the input of the next. The only difference is execution direction: `pipe` evaluates functions **Left-to-Right** (matching standard data flow reading order: `f -> g -> h`), while `compose` evaluates functions **Right-to-Left** (matching mathematical function composition $(f \circ g \circ h)(x)$).

### Q2: Write a custom `once(fn)` Higher-Order Function that ensures a target function executes at most once.
* **Answer**:
  ```javascript
  function once(fn) {
    let called = false;
    let result;
    return function(...args) {
      if (!called) {
        called = true;
        result = fn.apply(this, args);
      }
      return result;
    };
  }
  ```

---

## 7. Summary & Key Takeaways

1. **First-Class Functions**: HOFs accept functions as arguments or return functions as values.
2. **Composition**: Combine small single-purpose functions using `pipe` (left-to-right) or `compose` (right-to-left).
3. **Decorators**: Enhance existing functions with caching (`memoize`), execution limits (`once`), or rate limiting (`debounce`/`throttle`).
4. **Prototypes**: Re-creating methods like `myMap` and `myReduce` deepens understanding of Array iteration and callbacks.
