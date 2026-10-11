# Day 01 Output Prediction Solutions

### Question 1
```javascript
console.log(typeof console.log);
```
**Output:** `"function"`  
**Explanation:** `console.log` is a built-in method (function) attached to the `console` global object.

---

### Question 2
```javascript
function testStrict() {
  "use strict";
  try {
    eval("a = 10;");
    console.log(a);
  } catch (e) {
    console.log("Error Caught");
  }
}
testStrict();
```
**Output:** `"Error Caught"`  
**Explanation:** Under `"use strict"`, assigning a value to an undeclared variable (`a = 10`) throws a `ReferenceError`, which is trapped by the `try...catch` block.

---

### Question 3
```javascript
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
```
**Output:**
```text
1
3
2
```
**Explanation:** `console.log(1)` and `console.log(3)` execute synchronously on the main thread stack. `setTimeout` schedules the callback `() => console.log(2)` into the Macrotask Queue (Host Web API), which runs after synchronous execution completes.

---

### Question 4
```javascript
function getVal() {
  return
  100;
}
console.log(getVal());
```
**Output:** `undefined`  
**Explanation:** Automatic Semicolon Insertion (ASI) appends a semicolon directly after `return` because of the line break. The engine executes `return;` and ignores `100;`.

---

### Question 5
```javascript
console.log(typeof ("use strict"));
```
**Output:** `"string"`  
**Explanation:** `"use strict"` is a raw string literal expression. Passing a string to `typeof` evaluates to `"string"`.
