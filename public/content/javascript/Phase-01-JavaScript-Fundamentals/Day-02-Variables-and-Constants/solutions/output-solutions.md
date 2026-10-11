# Day 02 Output Prediction Solutions

### Question 1
```javascript
console.log(myVar);
var myVar = 10;
```
**Output:** `undefined`  
**Explanation:** `var myVar` is hoisted to the top of the script scope and initialized to `undefined`.

---

### Question 2
```javascript
try {
  console.log(myLet);
  let myLet = 20;
} catch (e) {
  console.log("Caught Error 2");
}
```
**Output:** `"Caught Error 2"`  
**Explanation:** Accessing `myLet` before its declaration line attempts to read it inside the Temporal Dead Zone (TDZ), throwing a `ReferenceError`.

---

### Question 3
```javascript
for (var i = 0; i < 3; i++) {
  // Loop
}
console.log(i);
```
**Output:** `3`  
**Explanation:** `var` is function-scoped (or globally scoped), not block-scoped. `i` leaks out of the loop block and retains its final value `3`.

---

### Question 4
```javascript
const user = { name: "Alice" };
user.name = "Bob";
console.log(user.name);
```
**Output:** `"Bob"`  
**Explanation:** `const` prevents binding reassignment (`user = ...`), but allows property mutations on objects.

---

### Question 5
```javascript
let x = 1;
{
  let x = 2;
  console.log(x);
}
console.log(x);
```
**Output:**
```text
2
1
```
**Explanation:** The inner `let x = 2` shadows the outer `x` strictly inside the inner `{}` block. Outside the block, the outer `x` remains `1`.
