# Day 03 Output Prediction Solutions

### Question 1
```javascript
console.log(typeof null);
```
**Output:** `"object"`  
**Explanation:** Historical 1995 JS engine bug where `null` shared the `000` bitwise type tag with objects.

---

### Question 2
```javascript
console.log(typeof NaN);
```
**Output:** `"number"`  
**Explanation:** Under the IEEE 754 floating-point specification, `NaN` is technically categorized as a special numeric value type.

---

### Question 3
```javascript
let str = "hello";
str[0] = "H";
console.log(str);
```
**Output:** `"hello"`  
**Explanation:** Strings are immutable primitive data types. Index assignments fail silently without altering the primitive string payload.

---

### Question 4
```javascript
console.log([] == []);
```
**Output:** `false`  
**Explanation:** Comparing two arrays with `==` compares their heap memory pointer addresses. Each `[]` creates a distinct array instance in heap memory.

---

### Question 5
```javascript
console.log(typeof ([] + {}));
```
**Output:** `"string"`  
**Explanation:** `[] + {}` coerces the array `[]` to `""` and `{}` to `"[object Object]"`, producing the concatenated string `"[object Object]"`. `typeof "[object Object]"` returns `"string"`.
