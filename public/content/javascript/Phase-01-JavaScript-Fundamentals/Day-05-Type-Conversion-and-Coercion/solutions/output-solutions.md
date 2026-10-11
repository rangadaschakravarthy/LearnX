# Day 05 Output Prediction Solutions

### Question 1
```javascript
console.log("5" + 2);
console.log("5" - 2);
```
**Output:**
```text
"52"
3
```
**Explanation:** `+` prioritizes string concatenation when a string operand is present. `-` forces numeric subtraction, coercing `"5"` to `5`.

---

### Question 2
```javascript
console.log(true + false);
```
**Output:** `1`  
**Explanation:** In math operations, `true` coerces to `1` and `false` coerces to `0`. `1 + 0 = 1`.

---

### Question 3
```javascript
console.log(1 + 2 + "3");
console.log("1" + 2 + 3);
```
**Output:**
```text
"33"
"123"
```
**Explanation:** Left-to-right evaluation. `1 + 2` evaluates to numeric `3`, then `3 + "3"` concatenates to `"33"`. `"1" + 2` concatenates to `"12"`, then `"12" + 3` concatenates to `"123"`.

---

### Question 4
```javascript
console.log(Boolean([]));
console.log(Boolean("0"));
```
**Output:**
```text
true
true
```
**Explanation:** `[]` is an object instance (truthy). `"0"` is a non-empty string (truthy).

---

### Question 5
```javascript
console.log([] == ![]);
```
**Output:** `true`  
**Explanation:** `![]` becomes `false`. `[]` coerces to primitive `""`. `false` and `""` both coerce to number `0`, resulting in `0 == 0` (`true`).
