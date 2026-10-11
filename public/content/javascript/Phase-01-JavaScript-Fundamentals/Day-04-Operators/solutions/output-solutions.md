# Day 04 Output Prediction Solutions

### Question 1
```javascript
let x = 5;
console.log(x++ + ++x);
```
**Output:** `12`  
**Explanation:** `x++` returns `5` (and increments `x` to `6`). Next, `++x` increments `x` from `6` to `7` and returns `7`. `5 + 7 = 12`.

---

### Question 2
```javascript
console.log("Hello" && 0 && "World");
```
**Output:** `0`  
**Explanation:** `&&` short-circuits on the first falsy operand. `"Hello"` is truthy, but `0` is falsy, so it returns `0` immediately.

---

### Question 3
```javascript
console.log(0 || "Fallback");
```
**Output:** `"Fallback"`  
**Explanation:** `0` is falsy. `||` falls back to evaluate and return the right operand `"Fallback"`.

---

### Question 4
```javascript
console.log(0 ?? "Fallback");
```
**Output:** `0`  
**Explanation:** `??` falls back ONLY for `null` or `undefined`. Since `0` is defined, it returns `0`.

---

### Question 5
```javascript
const user = { settings: null };
console.log(user.settings?.theme ?? "dark");
```
**Output:** `"dark"`  
**Explanation:** `user.settings?.theme` evaluates to `undefined` via optional chaining. `undefined ?? "dark"` falls back to `"dark"`.
