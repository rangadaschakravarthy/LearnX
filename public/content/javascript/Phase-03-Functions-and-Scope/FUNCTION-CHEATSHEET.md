# JavaScript Functions & Scope Cheatsheet

Quick reference for syntax, behaviors, and one-line examples.

---

## 1. Function Declarations & Expressions
```javascript
// Function Declaration (Hoisted completely)
function add(a, b) { return a + b; }

// Function Expression (Variable hoisted, function uninitialized/TDZ)
const addExp = function(a, b) { return a + b; };

// Named Function Expression (Useful for debugging stack traces)
const calcFactorial = function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); };

// Arrow Function (Explicit Return)
const multiply = (a, b) => { return a * b; };

// Arrow Function (Implicit Return)
const square = x => x * x;

// Arrow Function (Returning Object Literal - requires parentheses)
const makeUser = (name, age) => ({ name, age });

// Immediately Invoked Function Expression (IIFE)
(function() { console.log("IIFE executed!"); })();
```

---

## 2. Parameters & Arguments
```javascript
// Default Parameters
function greet(name = "Guest", role = "User") { return `Hello, ${name} (${role})`; }

// Rest Parameters (Must be the last parameter, collects extra args into real Array)
function sumAll(...numbers) { return numbers.reduce((acc, num) => acc + num, 0); }

// Arguments Object (Array-like object inside regular functions, absent in Arrow functions)
function showArgs() { console.log(arguments[0], arguments.length); }
```

---

## 3. Scope & Environments
```javascript
// Global Scope
const globalVar = "Global";

// Function Scope
function testScope() {
  var funcVar = "Function Scope"; // Not accessible outside function
}

// Block Scope
if (true) {
  let blockLet = "Block";   // Accessible only inside this {} block
  const blockConst = "Block";
  var leakedVar = "Leaked"; // var IGNORES block scope!
}
```

---

## 4. Closures
```javascript
// Closure: Inner function retains access to outer lexical scope even after outer returns
function createCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter = createCounter(10);
counter.increment(); // 11
```

---

## 5. Higher-Order Functions & Callbacks
```javascript
// Higher-Order Function (Accepts function as argument)
function runTask(value, callback) {
  return callback(value);
}
runTask(5, x => x * 2); // 10

// Higher-Order Function (Returns a function)
function createMultiplier(factor) {
  return number => number * factor;
}
const double = createMultiplier(2);
double(10); // 20
```

---

## 6. Recursion
```javascript
// Recursive Function (Requires Base Case + Recursive Step)
function countdown(n) {
  if (n <= 0) return; // Base Case
  console.log(n);
  countdown(n - 1);   // Recursive Step
}
```
