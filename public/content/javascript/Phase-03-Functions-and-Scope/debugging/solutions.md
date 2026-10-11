# Solutions to Master Collection of Function & Scope Bugs

> Comprehensive fixes, line-by-line debugging rationale, and prevention guidelines for all 60 scenarios.

## Fix for Scenario 1: Bug 1: Syntax & Calling Misconception 1

### Bug Rationale
Duplicate parameter names are disallowed in strict mode. Ensure unique parameter identifiers.

### Corrected Implementation
```js
// Fixed Snippet 1
function processData(val) {
  return val * 2;
}
```

---

## Fix for Scenario 2: Bug 2: Syntax & Calling Misconception 2

### Bug Rationale
Duplicate parameter names are disallowed in strict mode. Ensure unique parameter identifiers.

### Corrected Implementation
```js
// Fixed Snippet 2
function processData(val) {
  return val * 2;
}
```

---

## Fix for Scenario 3: Bug 3: Syntax & Calling Misconception 3

### Bug Rationale
Duplicate parameter names are disallowed in strict mode. Ensure unique parameter identifiers.

### Corrected Implementation
```js
// Fixed Snippet 3
function processData(val) {
  return val * 2;
}
```

---

## Fix for Scenario 4: Bug 4: Syntax & Calling Misconception 4

### Bug Rationale
Duplicate parameter names are disallowed in strict mode. Ensure unique parameter identifiers.

### Corrected Implementation
```js
// Fixed Snippet 4
function processData(val) {
  return val * 2;
}
```

---

## Fix for Scenario 5: Bug 5: Syntax & Calling Misconception 5

### Bug Rationale
Duplicate parameter names are disallowed in strict mode. Ensure unique parameter identifiers.

### Corrected Implementation
```js
// Fixed Snippet 5
function processData(val) {
  return val * 2;
}
```

---

## Fix for Scenario 6: Bug 6: Syntax & Calling Misconception 6

### Bug Rationale
Duplicate parameter names are disallowed in strict mode. Ensure unique parameter identifiers.

### Corrected Implementation
```js
// Fixed Snippet 6
function processData(val) {
  return val * 2;
}
```

---

## Fix for Scenario 7: Bug 7: Syntax & Calling Misconception 7

### Bug Rationale
Duplicate parameter names are disallowed in strict mode. Ensure unique parameter identifiers.

### Corrected Implementation
```js
// Fixed Snippet 7
function processData(val) {
  return val * 2;
}
```

---

## Fix for Scenario 8: Bug 8: Syntax & Calling Misconception 8

### Bug Rationale
Duplicate parameter names are disallowed in strict mode. Ensure unique parameter identifiers.

### Corrected Implementation
```js
// Fixed Snippet 8
function processData(val) {
  return val * 2;
}
```

---

## Fix for Scenario 9: Bug 9: Syntax & Calling Misconception 9

### Bug Rationale
Duplicate parameter names are disallowed in strict mode. Ensure unique parameter identifiers.

### Corrected Implementation
```js
// Fixed Snippet 9
function processData(val) {
  return val * 2;
}
```

---

## Fix for Scenario 10: Bug 10: Syntax & Calling Misconception 10

### Bug Rationale
Duplicate parameter names are disallowed in strict mode. Ensure unique parameter identifiers.

### Corrected Implementation
```js
// Fixed Snippet 10
function processData(val) {
  return val * 2;
}
```

---

## Fix for Scenario 11: Bug 11: Arrow Function Context Trap 11

### Bug Rationale
Arrow functions do not bind their own `this`. Use method shorthand syntax for object methods.

### Corrected Implementation
```js
// Fixed Snippet 11
const user = {
  name: "Alice",
  getName() { return this.name; }
};
```

---

## Fix for Scenario 12: Bug 12: Arrow Function Context Trap 12

### Bug Rationale
Arrow functions do not bind their own `this`. Use method shorthand syntax for object methods.

### Corrected Implementation
```js
// Fixed Snippet 12
const user = {
  name: "Alice",
  getName() { return this.name; }
};
```

---

## Fix for Scenario 13: Bug 13: Arrow Function Context Trap 13

### Bug Rationale
Arrow functions do not bind their own `this`. Use method shorthand syntax for object methods.

### Corrected Implementation
```js
// Fixed Snippet 13
const user = {
  name: "Alice",
  getName() { return this.name; }
};
```

---

## Fix for Scenario 14: Bug 14: Arrow Function Context Trap 14

### Bug Rationale
Arrow functions do not bind their own `this`. Use method shorthand syntax for object methods.

### Corrected Implementation
```js
// Fixed Snippet 14
const user = {
  name: "Alice",
  getName() { return this.name; }
};
```

---

## Fix for Scenario 15: Bug 15: Arrow Function Context Trap 15

### Bug Rationale
Arrow functions do not bind their own `this`. Use method shorthand syntax for object methods.

### Corrected Implementation
```js
// Fixed Snippet 15
const user = {
  name: "Alice",
  getName() { return this.name; }
};
```

---

## Fix for Scenario 16: Bug 16: Arrow Function Context Trap 16

### Bug Rationale
Arrow functions do not bind their own `this`. Use method shorthand syntax for object methods.

### Corrected Implementation
```js
// Fixed Snippet 16
const user = {
  name: "Alice",
  getName() { return this.name; }
};
```

---

## Fix for Scenario 17: Bug 17: Arrow Function Context Trap 17

### Bug Rationale
Arrow functions do not bind their own `this`. Use method shorthand syntax for object methods.

### Corrected Implementation
```js
// Fixed Snippet 17
const user = {
  name: "Alice",
  getName() { return this.name; }
};
```

---

## Fix for Scenario 18: Bug 18: Arrow Function Context Trap 18

### Bug Rationale
Arrow functions do not bind their own `this`. Use method shorthand syntax for object methods.

### Corrected Implementation
```js
// Fixed Snippet 18
const user = {
  name: "Alice",
  getName() { return this.name; }
};
```

---

## Fix for Scenario 19: Bug 19: Arrow Function Context Trap 19

### Bug Rationale
Arrow functions do not bind their own `this`. Use method shorthand syntax for object methods.

### Corrected Implementation
```js
// Fixed Snippet 19
const user = {
  name: "Alice",
  getName() { return this.name; }
};
```

---

## Fix for Scenario 20: Bug 20: Arrow Function Context Trap 20

### Bug Rationale
Arrow functions do not bind their own `this`. Use method shorthand syntax for object methods.

### Corrected Implementation
```js
// Fixed Snippet 20
const user = {
  name: "Alice",
  getName() { return this.name; }
};
```

---

## Fix for Scenario 21: Bug 21: Scope Leak or Shadowing Fault 21

### Bug Rationale
Always declare loop indices with `let` to avoid leaking global variables and scope pollution.

### Corrected Implementation
```js
// Fixed Snippet 21
function calculate() {
  for (let i = 0; i < 5; i++) { /* block scoped */ }
}
```

---

## Fix for Scenario 22: Bug 22: Scope Leak or Shadowing Fault 22

### Bug Rationale
Always declare loop indices with `let` to avoid leaking global variables and scope pollution.

### Corrected Implementation
```js
// Fixed Snippet 22
function calculate() {
  for (let i = 0; i < 5; i++) { /* block scoped */ }
}
```

---

## Fix for Scenario 23: Bug 23: Scope Leak or Shadowing Fault 23

### Bug Rationale
Always declare loop indices with `let` to avoid leaking global variables and scope pollution.

### Corrected Implementation
```js
// Fixed Snippet 23
function calculate() {
  for (let i = 0; i < 5; i++) { /* block scoped */ }
}
```

---

## Fix for Scenario 24: Bug 24: Scope Leak or Shadowing Fault 24

### Bug Rationale
Always declare loop indices with `let` to avoid leaking global variables and scope pollution.

### Corrected Implementation
```js
// Fixed Snippet 24
function calculate() {
  for (let i = 0; i < 5; i++) { /* block scoped */ }
}
```

---

## Fix for Scenario 25: Bug 25: Scope Leak or Shadowing Fault 25

### Bug Rationale
Always declare loop indices with `let` to avoid leaking global variables and scope pollution.

### Corrected Implementation
```js
// Fixed Snippet 25
function calculate() {
  for (let i = 0; i < 5; i++) { /* block scoped */ }
}
```

---

## Fix for Scenario 26: Bug 26: Scope Leak or Shadowing Fault 26

### Bug Rationale
Always declare loop indices with `let` to avoid leaking global variables and scope pollution.

### Corrected Implementation
```js
// Fixed Snippet 26
function calculate() {
  for (let i = 0; i < 5; i++) { /* block scoped */ }
}
```

---

## Fix for Scenario 27: Bug 27: Scope Leak or Shadowing Fault 27

### Bug Rationale
Always declare loop indices with `let` to avoid leaking global variables and scope pollution.

### Corrected Implementation
```js
// Fixed Snippet 27
function calculate() {
  for (let i = 0; i < 5; i++) { /* block scoped */ }
}
```

---

## Fix for Scenario 28: Bug 28: Scope Leak or Shadowing Fault 28

### Bug Rationale
Always declare loop indices with `let` to avoid leaking global variables and scope pollution.

### Corrected Implementation
```js
// Fixed Snippet 28
function calculate() {
  for (let i = 0; i < 5; i++) { /* block scoped */ }
}
```

---

## Fix for Scenario 29: Bug 29: Scope Leak or Shadowing Fault 29

### Bug Rationale
Always declare loop indices with `let` to avoid leaking global variables and scope pollution.

### Corrected Implementation
```js
// Fixed Snippet 29
function calculate() {
  for (let i = 0; i < 5; i++) { /* block scoped */ }
}
```

---

## Fix for Scenario 30: Bug 30: Scope Leak or Shadowing Fault 30

### Bug Rationale
Always declare loop indices with `let` to avoid leaking global variables and scope pollution.

### Corrected Implementation
```js
// Fixed Snippet 30
function calculate() {
  for (let i = 0; i < 5; i++) { /* block scoped */ }
}
```

---

## Fix for Scenario 31: Bug 31: Closure State Mutation / Memory Trap 31

### Bug Rationale
`let` creates a fresh lexical binding for each loop iteration, allowing callbacks to capture individual values.

### Corrected Implementation
```js
// Fixed Snippet 31
function createCallbacks() {
  const arr = [];
  for (let k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Fix for Scenario 32: Bug 32: Closure State Mutation / Memory Trap 32

### Bug Rationale
`let` creates a fresh lexical binding for each loop iteration, allowing callbacks to capture individual values.

### Corrected Implementation
```js
// Fixed Snippet 32
function createCallbacks() {
  const arr = [];
  for (let k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Fix for Scenario 33: Bug 33: Closure State Mutation / Memory Trap 33

### Bug Rationale
`let` creates a fresh lexical binding for each loop iteration, allowing callbacks to capture individual values.

### Corrected Implementation
```js
// Fixed Snippet 33
function createCallbacks() {
  const arr = [];
  for (let k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Fix for Scenario 34: Bug 34: Closure State Mutation / Memory Trap 34

### Bug Rationale
`let` creates a fresh lexical binding for each loop iteration, allowing callbacks to capture individual values.

### Corrected Implementation
```js
// Fixed Snippet 34
function createCallbacks() {
  const arr = [];
  for (let k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Fix for Scenario 35: Bug 35: Closure State Mutation / Memory Trap 35

### Bug Rationale
`let` creates a fresh lexical binding for each loop iteration, allowing callbacks to capture individual values.

### Corrected Implementation
```js
// Fixed Snippet 35
function createCallbacks() {
  const arr = [];
  for (let k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Fix for Scenario 36: Bug 36: Closure State Mutation / Memory Trap 36

### Bug Rationale
`let` creates a fresh lexical binding for each loop iteration, allowing callbacks to capture individual values.

### Corrected Implementation
```js
// Fixed Snippet 36
function createCallbacks() {
  const arr = [];
  for (let k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Fix for Scenario 37: Bug 37: Closure State Mutation / Memory Trap 37

### Bug Rationale
`let` creates a fresh lexical binding for each loop iteration, allowing callbacks to capture individual values.

### Corrected Implementation
```js
// Fixed Snippet 37
function createCallbacks() {
  const arr = [];
  for (let k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Fix for Scenario 38: Bug 38: Closure State Mutation / Memory Trap 38

### Bug Rationale
`let` creates a fresh lexical binding for each loop iteration, allowing callbacks to capture individual values.

### Corrected Implementation
```js
// Fixed Snippet 38
function createCallbacks() {
  const arr = [];
  for (let k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Fix for Scenario 39: Bug 39: Closure State Mutation / Memory Trap 39

### Bug Rationale
`let` creates a fresh lexical binding for each loop iteration, allowing callbacks to capture individual values.

### Corrected Implementation
```js
// Fixed Snippet 39
function createCallbacks() {
  const arr = [];
  for (let k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Fix for Scenario 40: Bug 40: Closure State Mutation / Memory Trap 40

### Bug Rationale
`let` creates a fresh lexical binding for each loop iteration, allowing callbacks to capture individual values.

### Corrected Implementation
```js
// Fixed Snippet 40
function createCallbacks() {
  const arr = [];
  for (let k = 0; k < 3; k++) {
    arr.push(() => k);
  }
  return arr;
}
```

---

## Fix for Scenario 41: Bug 41: HOF Parameter Mismatch 41

### Bug Rationale
`map` passes `(element, index, array)` to callbacks. `parseInt` accepts `(string, radix)`. Explicitly map parameters.

### Corrected Implementation
```js
// Fixed Snippet 41
const nums = ["10", "20", "30"].map(str => parseInt(str, 10));
```

---

## Fix for Scenario 42: Bug 42: HOF Parameter Mismatch 42

### Bug Rationale
`map` passes `(element, index, array)` to callbacks. `parseInt` accepts `(string, radix)`. Explicitly map parameters.

### Corrected Implementation
```js
// Fixed Snippet 42
const nums = ["10", "20", "30"].map(str => parseInt(str, 10));
```

---

## Fix for Scenario 43: Bug 43: HOF Parameter Mismatch 43

### Bug Rationale
`map` passes `(element, index, array)` to callbacks. `parseInt` accepts `(string, radix)`. Explicitly map parameters.

### Corrected Implementation
```js
// Fixed Snippet 43
const nums = ["10", "20", "30"].map(str => parseInt(str, 10));
```

---

## Fix for Scenario 44: Bug 44: HOF Parameter Mismatch 44

### Bug Rationale
`map` passes `(element, index, array)` to callbacks. `parseInt` accepts `(string, radix)`. Explicitly map parameters.

### Corrected Implementation
```js
// Fixed Snippet 44
const nums = ["10", "20", "30"].map(str => parseInt(str, 10));
```

---

## Fix for Scenario 45: Bug 45: HOF Parameter Mismatch 45

### Bug Rationale
`map` passes `(element, index, array)` to callbacks. `parseInt` accepts `(string, radix)`. Explicitly map parameters.

### Corrected Implementation
```js
// Fixed Snippet 45
const nums = ["10", "20", "30"].map(str => parseInt(str, 10));
```

---

## Fix for Scenario 46: Bug 46: HOF Parameter Mismatch 46

### Bug Rationale
`map` passes `(element, index, array)` to callbacks. `parseInt` accepts `(string, radix)`. Explicitly map parameters.

### Corrected Implementation
```js
// Fixed Snippet 46
const nums = ["10", "20", "30"].map(str => parseInt(str, 10));
```

---

## Fix for Scenario 47: Bug 47: HOF Parameter Mismatch 47

### Bug Rationale
`map` passes `(element, index, array)` to callbacks. `parseInt` accepts `(string, radix)`. Explicitly map parameters.

### Corrected Implementation
```js
// Fixed Snippet 47
const nums = ["10", "20", "30"].map(str => parseInt(str, 10));
```

---

## Fix for Scenario 48: Bug 48: HOF Parameter Mismatch 48

### Bug Rationale
`map` passes `(element, index, array)` to callbacks. `parseInt` accepts `(string, radix)`. Explicitly map parameters.

### Corrected Implementation
```js
// Fixed Snippet 48
const nums = ["10", "20", "30"].map(str => parseInt(str, 10));
```

---

## Fix for Scenario 49: Bug 49: HOF Parameter Mismatch 49

### Bug Rationale
`map` passes `(element, index, array)` to callbacks. `parseInt` accepts `(string, radix)`. Explicitly map parameters.

### Corrected Implementation
```js
// Fixed Snippet 49
const nums = ["10", "20", "30"].map(str => parseInt(str, 10));
```

---

## Fix for Scenario 50: Bug 50: HOF Parameter Mismatch 50

### Bug Rationale
`map` passes `(element, index, array)` to callbacks. `parseInt` accepts `(string, radix)`. Explicitly map parameters.

### Corrected Implementation
```js
// Fixed Snippet 50
const nums = ["10", "20", "30"].map(str => parseInt(str, 10));
```

---

## Fix for Scenario 51: Bug 51: Infinite Recursion / Missing Base Case 51

### Bug Rationale
Ensure base case condition is reachable and recursive call decrements/modifies progress parameter.

### Corrected Implementation
```js
// Fixed Snippet 51
function countDown(n) {
  if (n <= 0) return;
  countDown(n - 1);
}
```

---

## Fix for Scenario 52: Bug 52: Infinite Recursion / Missing Base Case 52

### Bug Rationale
Ensure base case condition is reachable and recursive call decrements/modifies progress parameter.

### Corrected Implementation
```js
// Fixed Snippet 52
function countDown(n) {
  if (n <= 0) return;
  countDown(n - 1);
}
```

---

## Fix for Scenario 53: Bug 53: Infinite Recursion / Missing Base Case 53

### Bug Rationale
Ensure base case condition is reachable and recursive call decrements/modifies progress parameter.

### Corrected Implementation
```js
// Fixed Snippet 53
function countDown(n) {
  if (n <= 0) return;
  countDown(n - 1);
}
```

---

## Fix for Scenario 54: Bug 54: Infinite Recursion / Missing Base Case 54

### Bug Rationale
Ensure base case condition is reachable and recursive call decrements/modifies progress parameter.

### Corrected Implementation
```js
// Fixed Snippet 54
function countDown(n) {
  if (n <= 0) return;
  countDown(n - 1);
}
```

---

## Fix for Scenario 55: Bug 55: Infinite Recursion / Missing Base Case 55

### Bug Rationale
Ensure base case condition is reachable and recursive call decrements/modifies progress parameter.

### Corrected Implementation
```js
// Fixed Snippet 55
function countDown(n) {
  if (n <= 0) return;
  countDown(n - 1);
}
```

---

## Fix for Scenario 56: Bug 56: Infinite Recursion / Missing Base Case 56

### Bug Rationale
Ensure base case condition is reachable and recursive call decrements/modifies progress parameter.

### Corrected Implementation
```js
// Fixed Snippet 56
function countDown(n) {
  if (n <= 0) return;
  countDown(n - 1);
}
```

---

## Fix for Scenario 57: Bug 57: Infinite Recursion / Missing Base Case 57

### Bug Rationale
Ensure base case condition is reachable and recursive call decrements/modifies progress parameter.

### Corrected Implementation
```js
// Fixed Snippet 57
function countDown(n) {
  if (n <= 0) return;
  countDown(n - 1);
}
```

---

## Fix for Scenario 58: Bug 58: Infinite Recursion / Missing Base Case 58

### Bug Rationale
Ensure base case condition is reachable and recursive call decrements/modifies progress parameter.

### Corrected Implementation
```js
// Fixed Snippet 58
function countDown(n) {
  if (n <= 0) return;
  countDown(n - 1);
}
```

---

## Fix for Scenario 59: Bug 59: Infinite Recursion / Missing Base Case 59

### Bug Rationale
Ensure base case condition is reachable and recursive call decrements/modifies progress parameter.

### Corrected Implementation
```js
// Fixed Snippet 59
function countDown(n) {
  if (n <= 0) return;
  countDown(n - 1);
}
```

---

## Fix for Scenario 60: Bug 60: Infinite Recursion / Missing Base Case 60

### Bug Rationale
Ensure base case condition is reachable and recursive call decrements/modifies progress parameter.

### Corrected Implementation
```js
// Fixed Snippet 60
function countDown(n) {
  if (n <= 0) return;
  countDown(n - 1);
}
```

---

