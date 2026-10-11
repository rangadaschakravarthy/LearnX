# Master Collection of Function & Scope Bugs (60 Scenarios)

> Practice real-world JavaScript debugging. For each scenario below, identify the bug, explain why it fails, and write the corrected code.

## Scenario 1: Bug 1: Syntax & Calling Misconception 1
**Category:** Function Declaration & Syntax Bugs
**Description:** Function fails due to misplaced semicolon, accidental call before initialization, or illegal parameter declaration.

```js
// Buggy Snippet 1
function processData(a, a) {
  return val * 2;
}
```

---

## Scenario 2: Bug 2: Syntax & Calling Misconception 2
**Category:** Function Declaration & Syntax Bugs
**Description:** Function fails due to misplaced semicolon, accidental call before initialization, or illegal parameter declaration.

```js
// Buggy Snippet 2
function processData(val) {
  return val * 2;
}
```

---

## Scenario 3: Bug 3: Syntax & Calling Misconception 3
**Category:** Function Declaration & Syntax Bugs
**Description:** Function fails due to misplaced semicolon, accidental call before initialization, or illegal parameter declaration.

```js
// Buggy Snippet 3
function processData(val) {
  return val * 2;
}
```

---

## Scenario 4: Bug 4: Syntax & Calling Misconception 4
**Category:** Function Declaration & Syntax Bugs
**Description:** Function fails due to misplaced semicolon, accidental call before initialization, or illegal parameter declaration.

```js
// Buggy Snippet 4
function processData(val) {
  return val * 2;
}
```

---

## Scenario 5: Bug 5: Syntax & Calling Misconception 5
**Category:** Function Declaration & Syntax Bugs
**Description:** Function fails due to misplaced semicolon, accidental call before initialization, or illegal parameter declaration.

```js
// Buggy Snippet 5
function processData(val) {
  return val * 2;
}
```

---

## Scenario 6: Bug 6: Syntax & Calling Misconception 6
**Category:** Function Declaration & Syntax Bugs
**Description:** Function fails due to misplaced semicolon, accidental call before initialization, or illegal parameter declaration.

```js
// Buggy Snippet 6
function processData(val) {
  return val * 2;
}
```

---

## Scenario 7: Bug 7: Syntax & Calling Misconception 7
**Category:** Function Declaration & Syntax Bugs
**Description:** Function fails due to misplaced semicolon, accidental call before initialization, or illegal parameter declaration.

```js
// Buggy Snippet 7
function processData(val) {
  return val * 2;
}
```

---

## Scenario 8: Bug 8: Syntax & Calling Misconception 8
**Category:** Function Declaration & Syntax Bugs
**Description:** Function fails due to misplaced semicolon, accidental call before initialization, or illegal parameter declaration.

```js
// Buggy Snippet 8
function processData(val) {
  return val * 2;
}
```

---

## Scenario 9: Bug 9: Syntax & Calling Misconception 9
**Category:** Function Declaration & Syntax Bugs
**Description:** Function fails due to misplaced semicolon, accidental call before initialization, or illegal parameter declaration.

```js
// Buggy Snippet 9
function processData(val) {
  return val * 2;
}
```

---

## Scenario 10: Bug 10: Syntax & Calling Misconception 10
**Category:** Function Declaration & Syntax Bugs
**Description:** Function fails due to misplaced semicolon, accidental call before initialization, or illegal parameter declaration.

```js
// Buggy Snippet 10
function processData(val) {
  return val * 2;
}
```

---

## Scenario 11: Bug 11: Arrow Function Context Trap 11
**Category:** Arrow Functions & `this` Context Bugs
**Description:** Object method defined as arrow function loses `this` binding or attempts to use `arguments` object.

```js
// Buggy Snippet 11
const user = {
  name: "Alice",
  getName: () => this.name
};
```

---

## Scenario 12: Bug 12: Arrow Function Context Trap 12
**Category:** Arrow Functions & `this` Context Bugs
**Description:** Object method defined as arrow function loses `this` binding or attempts to use `arguments` object.

```js
// Buggy Snippet 12
const user = {
  name: "Alice",
  getName: () => this.name
};
```

---

## Scenario 13: Bug 13: Arrow Function Context Trap 13
**Category:** Arrow Functions & `this` Context Bugs
**Description:** Object method defined as arrow function loses `this` binding or attempts to use `arguments` object.

```js
// Buggy Snippet 13
const user = {
  name: "Alice",
  getName: () => this.name
};
```

---

## Scenario 14: Bug 14: Arrow Function Context Trap 14
**Category:** Arrow Functions & `this` Context Bugs
**Description:** Object method defined as arrow function loses `this` binding or attempts to use `arguments` object.

```js
// Buggy Snippet 14
const user = {
  name: "Alice",
  getName: () => this.name
};
```

---

## Scenario 15: Bug 15: Arrow Function Context Trap 15
**Category:** Arrow Functions & `this` Context Bugs
**Description:** Object method defined as arrow function loses `this` binding or attempts to use `arguments` object.

```js
// Buggy Snippet 15
const user = {
  name: "Alice",
  getName: () => this.name
};
```

---

## Scenario 16: Bug 16: Arrow Function Context Trap 16
**Category:** Arrow Functions & `this` Context Bugs
**Description:** Object method defined as arrow function loses `this` binding or attempts to use `arguments` object.

```js
// Buggy Snippet 16
const user = {
  name: "Alice",
  getName: () => this.name
};
```

---

## Scenario 17: Bug 17: Arrow Function Context Trap 17
**Category:** Arrow Functions & `this` Context Bugs
**Description:** Object method defined as arrow function loses `this` binding or attempts to use `arguments` object.

```js
// Buggy Snippet 17
const user = {
  name: "Alice",
  getName: () => this.name
};
```

---

## Scenario 18: Bug 18: Arrow Function Context Trap 18
**Category:** Arrow Functions & `this` Context Bugs
**Description:** Object method defined as arrow function loses `this` binding or attempts to use `arguments` object.

```js
// Buggy Snippet 18
const user = {
  name: "Alice",
  getName: () => this.name
};
```

---

## Scenario 19: Bug 19: Arrow Function Context Trap 19
**Category:** Arrow Functions & `this` Context Bugs
**Description:** Object method defined as arrow function loses `this` binding or attempts to use `arguments` object.

```js
// Buggy Snippet 19
const user = {
  name: "Alice",
  getName: () => this.name
};
```

---

## Scenario 20: Bug 20: Arrow Function Context Trap 20
**Category:** Arrow Functions & `this` Context Bugs
**Description:** Object method defined as arrow function loses `this` binding or attempts to use `arguments` object.

```js
// Buggy Snippet 20
const user = {
  name: "Alice",
  getName: () => this.name
};
```

---

## Scenario 21: Bug 21: Scope Leak or Shadowing Fault 21
**Category:** Scope Leak & Variable Shadowing Bugs
**Description:** Variable declared with `var` inside block leaks or outer variable is unintentionally shadowed.

```js
// Buggy Snippet 21
function calculate() {
  for (i = 0; i < 5; i++) { /* accidental global */ }
}
```

---

## Scenario 22: Bug 22: Scope Leak or Shadowing Fault 22
**Category:** Scope Leak & Variable Shadowing Bugs
**Description:** Variable declared with `var` inside block leaks or outer variable is unintentionally shadowed.

```js
// Buggy Snippet 22
function calculate() {
  for (i = 0; i < 5; i++) { /* accidental global */ }
}
```

---

## Scenario 23: Bug 23: Scope Leak or Shadowing Fault 23
**Category:** Scope Leak & Variable Shadowing Bugs
**Description:** Variable declared with `var` inside block leaks or outer variable is unintentionally shadowed.

```js
// Buggy Snippet 23
function calculate() {
  for (i = 0; i < 5; i++) { /* accidental global */ }
}
```

---

## Scenario 24: Bug 24: Scope Leak or Shadowing Fault 24
**Category:** Scope Leak & Variable Shadowing Bugs
**Description:** Variable declared with `var` inside block leaks or outer variable is unintentionally shadowed.

```js
// Buggy Snippet 24
function calculate() {
  for (i = 0; i < 5; i++) { /* accidental global */ }
}
```

---

## Scenario 25: Bug 25: Scope Leak or Shadowing Fault 25
**Category:** Scope Leak & Variable Shadowing Bugs
**Description:** Variable declared with `var` inside block leaks or outer variable is unintentionally shadowed.

```js
// Buggy Snippet 25
function calculate() {
  for (i = 0; i < 5; i++) { /* accidental global */ }
}
```

---

## Scenario 26: Bug 26: Scope Leak or Shadowing Fault 26
**Category:** Scope Leak & Variable Shadowing Bugs
**Description:** Variable declared with `var` inside block leaks or outer variable is unintentionally shadowed.

```js
// Buggy Snippet 26
function calculate() {
  for (i = 0; i < 5; i++) { /* accidental global */ }
}
```

---

## Scenario 27: Bug 27: Scope Leak or Shadowing Fault 27
**Category:** Scope Leak & Variable Shadowing Bugs
**Description:** Variable declared with `var` inside block leaks or outer variable is unintentionally shadowed.

```js
// Buggy Snippet 27
function calculate() {
  for (i = 0; i < 5; i++) { /* accidental global */ }
}
```

---

## Scenario 28: Bug 28: Scope Leak or Shadowing Fault 28
**Category:** Scope Leak & Variable Shadowing Bugs
**Description:** Variable declared with `var` inside block leaks or outer variable is unintentionally shadowed.

```js
// Buggy Snippet 28
function calculate() {
  for (i = 0; i < 5; i++) { /* accidental global */ }
}
```

---

## Scenario 29: Bug 29: Scope Leak or Shadowing Fault 29
**Category:** Scope Leak & Variable Shadowing Bugs
**Description:** Variable declared with `var` inside block leaks or outer variable is unintentionally shadowed.

```js
// Buggy Snippet 29
function calculate() {
  for (i = 0; i < 5; i++) { /* accidental global */ }
}
```

---

## Scenario 30: Bug 30: Scope Leak or Shadowing Fault 30
**Category:** Scope Leak & Variable Shadowing Bugs
**Description:** Variable declared with `var` inside block leaks or outer variable is unintentionally shadowed.

```js
// Buggy Snippet 30
function calculate() {
  for (i = 0; i < 5; i++) { /* accidental global */ }
}
```

---

## Scenario 31: Bug 31: Closure State Mutation / Memory Trap 31
**Category:** Closure & Memory Retaining Bugs
**Description:** Callbacks inside loop capture shared `var` variable or closure retains large array payload.

```js
// Buggy Snippet 31
function createCallbacks() {
  var arr = [];
  for (var k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Scenario 32: Bug 32: Closure State Mutation / Memory Trap 32
**Category:** Closure & Memory Retaining Bugs
**Description:** Callbacks inside loop capture shared `var` variable or closure retains large array payload.

```js
// Buggy Snippet 32
function createCallbacks() {
  var arr = [];
  for (var k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Scenario 33: Bug 33: Closure State Mutation / Memory Trap 33
**Category:** Closure & Memory Retaining Bugs
**Description:** Callbacks inside loop capture shared `var` variable or closure retains large array payload.

```js
// Buggy Snippet 33
function createCallbacks() {
  var arr = [];
  for (var k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Scenario 34: Bug 34: Closure State Mutation / Memory Trap 34
**Category:** Closure & Memory Retaining Bugs
**Description:** Callbacks inside loop capture shared `var` variable or closure retains large array payload.

```js
// Buggy Snippet 34
function createCallbacks() {
  var arr = [];
  for (var k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Scenario 35: Bug 35: Closure State Mutation / Memory Trap 35
**Category:** Closure & Memory Retaining Bugs
**Description:** Callbacks inside loop capture shared `var` variable or closure retains large array payload.

```js
// Buggy Snippet 35
function createCallbacks() {
  var arr = [];
  for (var k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Scenario 36: Bug 36: Closure State Mutation / Memory Trap 36
**Category:** Closure & Memory Retaining Bugs
**Description:** Callbacks inside loop capture shared `var` variable or closure retains large array payload.

```js
// Buggy Snippet 36
function createCallbacks() {
  var arr = [];
  for (var k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Scenario 37: Bug 37: Closure State Mutation / Memory Trap 37
**Category:** Closure & Memory Retaining Bugs
**Description:** Callbacks inside loop capture shared `var` variable or closure retains large array payload.

```js
// Buggy Snippet 37
function createCallbacks() {
  var arr = [];
  for (var k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Scenario 38: Bug 38: Closure State Mutation / Memory Trap 38
**Category:** Closure & Memory Retaining Bugs
**Description:** Callbacks inside loop capture shared `var` variable or closure retains large array payload.

```js
// Buggy Snippet 38
function createCallbacks() {
  var arr = [];
  for (var k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Scenario 39: Bug 39: Closure State Mutation / Memory Trap 39
**Category:** Closure & Memory Retaining Bugs
**Description:** Callbacks inside loop capture shared `var` variable or closure retains large array payload.

```js
// Buggy Snippet 39
function createCallbacks() {
  var arr = [];
  for (var k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Scenario 40: Bug 40: Closure State Mutation / Memory Trap 40
**Category:** Closure & Memory Retaining Bugs
**Description:** Callbacks inside loop capture shared `var` variable or closure retains large array payload.

```js
// Buggy Snippet 40
function createCallbacks() {
  var arr = [];
  for (var k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Scenario 41: Bug 41: HOF Parameter Mismatch 41
**Category:** Callback & Higher-Order Function Bugs
**Description:** Passing functions directly to `Array.prototype.map` without wrapping leads to argument index mismatch.

```js
// Buggy Snippet 41
const nums = ["10", "20", "30"].map(parseInt);
```

---

## Scenario 42: Bug 42: HOF Parameter Mismatch 42
**Category:** Callback & Higher-Order Function Bugs
**Description:** Passing functions directly to `Array.prototype.map` without wrapping leads to argument index mismatch.

```js
// Buggy Snippet 42
const nums = ["10", "20", "30"].map(parseInt);
```

---

## Scenario 43: Bug 43: HOF Parameter Mismatch 43
**Category:** Callback & Higher-Order Function Bugs
**Description:** Passing functions directly to `Array.prototype.map` without wrapping leads to argument index mismatch.

```js
// Buggy Snippet 43
const nums = ["10", "20", "30"].map(parseInt);
```

---

## Scenario 44: Bug 44: HOF Parameter Mismatch 44
**Category:** Callback & Higher-Order Function Bugs
**Description:** Passing functions directly to `Array.prototype.map` without wrapping leads to argument index mismatch.

```js
// Buggy Snippet 44
const nums = ["10", "20", "30"].map(parseInt);
```

---

## Scenario 45: Bug 45: HOF Parameter Mismatch 45
**Category:** Callback & Higher-Order Function Bugs
**Description:** Passing functions directly to `Array.prototype.map` without wrapping leads to argument index mismatch.

```js
// Buggy Snippet 45
const nums = ["10", "20", "30"].map(parseInt);
```

---

## Scenario 46: Bug 46: HOF Parameter Mismatch 46
**Category:** Callback & Higher-Order Function Bugs
**Description:** Passing functions directly to `Array.prototype.map` without wrapping leads to argument index mismatch.

```js
// Buggy Snippet 46
const nums = ["10", "20", "30"].map(parseInt);
```

---

## Scenario 47: Bug 47: HOF Parameter Mismatch 47
**Category:** Callback & Higher-Order Function Bugs
**Description:** Passing functions directly to `Array.prototype.map` without wrapping leads to argument index mismatch.

```js
// Buggy Snippet 47
const nums = ["10", "20", "30"].map(parseInt);
```

---

## Scenario 48: Bug 48: HOF Parameter Mismatch 48
**Category:** Callback & Higher-Order Function Bugs
**Description:** Passing functions directly to `Array.prototype.map` without wrapping leads to argument index mismatch.

```js
// Buggy Snippet 48
const nums = ["10", "20", "30"].map(parseInt);
```

---

## Scenario 49: Bug 49: HOF Parameter Mismatch 49
**Category:** Callback & Higher-Order Function Bugs
**Description:** Passing functions directly to `Array.prototype.map` without wrapping leads to argument index mismatch.

```js
// Buggy Snippet 49
const nums = ["10", "20", "30"].map(parseInt);
```

---

## Scenario 50: Bug 50: HOF Parameter Mismatch 50
**Category:** Callback & Higher-Order Function Bugs
**Description:** Passing functions directly to `Array.prototype.map` without wrapping leads to argument index mismatch.

```js
// Buggy Snippet 50
const nums = ["10", "20", "30"].map(parseInt);
```

---

## Scenario 51: Bug 51: Infinite Recursion / Missing Base Case 51
**Category:** Recursion & Call Stack Overflow Bugs
**Description:** Recursive function lacks termination base case or fails to return recursive call result.

```js
// Buggy Snippet 51
function countDown(n) {
  if (n === 0) return;
  countDown(n); // missing decrement
}
```

---

## Scenario 52: Bug 52: Infinite Recursion / Missing Base Case 52
**Category:** Recursion & Call Stack Overflow Bugs
**Description:** Recursive function lacks termination base case or fails to return recursive call result.

```js
// Buggy Snippet 52
function countDown(n) {
  if (n === 0) return;
  countDown(n); // missing decrement
}
```

---

## Scenario 53: Bug 53: Infinite Recursion / Missing Base Case 53
**Category:** Recursion & Call Stack Overflow Bugs
**Description:** Recursive function lacks termination base case or fails to return recursive call result.

```js
// Buggy Snippet 53
function countDown(n) {
  if (n === 0) return;
  countDown(n); // missing decrement
}
```

---

## Scenario 54: Bug 54: Infinite Recursion / Missing Base Case 54
**Category:** Recursion & Call Stack Overflow Bugs
**Description:** Recursive function lacks termination base case or fails to return recursive call result.

```js
// Buggy Snippet 54
function countDown(n) {
  if (n === 0) return;
  countDown(n); // missing decrement
}
```

---

## Scenario 55: Bug 55: Infinite Recursion / Missing Base Case 55
**Category:** Recursion & Call Stack Overflow Bugs
**Description:** Recursive function lacks termination base case or fails to return recursive call result.

```js
// Buggy Snippet 55
function countDown(n) {
  if (n === 0) return;
  countDown(n); // missing decrement
}
```

---

## Scenario 56: Bug 56: Infinite Recursion / Missing Base Case 56
**Category:** Recursion & Call Stack Overflow Bugs
**Description:** Recursive function lacks termination base case or fails to return recursive call result.

```js
// Buggy Snippet 56
function countDown(n) {
  if (n === 0) return;
  countDown(n); // missing decrement
}
```

---

## Scenario 57: Bug 57: Infinite Recursion / Missing Base Case 57
**Category:** Recursion & Call Stack Overflow Bugs
**Description:** Recursive function lacks termination base case or fails to return recursive call result.

```js
// Buggy Snippet 57
function countDown(n) {
  if (n === 0) return;
  countDown(n); // missing decrement
}
```

---

## Scenario 58: Bug 58: Infinite Recursion / Missing Base Case 58
**Category:** Recursion & Call Stack Overflow Bugs
**Description:** Recursive function lacks termination base case or fails to return recursive call result.

```js
// Buggy Snippet 58
function countDown(n) {
  if (n === 0) return;
  countDown(n); // missing decrement
}
```

---

## Scenario 59: Bug 59: Infinite Recursion / Missing Base Case 59
**Category:** Recursion & Call Stack Overflow Bugs
**Description:** Recursive function lacks termination base case or fails to return recursive call result.

```js
// Buggy Snippet 59
function countDown(n) {
  if (n === 0) return;
  countDown(n); // missing decrement
}
```

---

## Scenario 60: Bug 60: Infinite Recursion / Missing Base Case 60
**Category:** Recursion & Call Stack Overflow Bugs
**Description:** Recursive function lacks termination base case or fails to return recursive call result.

```js
// Buggy Snippet 60
function countDown(n) {
  if (n === 0) return;
  countDown(n); // missing decrement
}
```

---

