# Phase 1 Assessment: Debugging Challenges (10 Problems)

1. **The ASI Return Bug**:
```javascript
function getAccount() {
  return
  { id: 101, name: "Alice" };
}
```
*Problem*: Returns `undefined`.  
*Task*: Fix the line break syntax.

2. **The Const Reassignment Error**:
```javascript
const user = { name: "Bob" };
user = { name: "Robert" };
```
*Problem*: Throws `TypeError: Assignment to constant variable`.  
*Task*: Mutate property instead of reassigning pointer.

3. **The TDZ Reference Error**:
```javascript
console.log(score);
let score = 95;
```
*Problem*: Throws `ReferenceError`.  
*Task*: Re-order declaration before log.

4. **The Loose Equality Coercion Trap**:
```javascript
let userInput = 0;
if (userInput == false) {
  console.log("No input provided!");
}
```
*Problem*: `0 == false` is `true`, incorrectly logging when 0 is valid!  
*Task*: Use strict equality `===`.

5. **The Missing Radix Bug**:
```javascript
const width = parseInt("010");
```
*Problem*: Parsed as octal in legacy environments.  
*Task*: Specify radix `10`.

6. **The Floating Point Comparison Trap**:
```javascript
if (0.1 + 0.2 === 0.3) {
  console.log("Prices match");
}
```
*Problem*: Never triggers because `0.1 + 0.2` is `0.30000000000000004`.  
*Task*: Use `Number.EPSILON`.

7. **The NaN Comparison Bug**:
```javascript
let result = "abc" * 2;
if (result === NaN) {
  console.log("Invalid calculation");
}
```
*Problem*: `NaN === NaN` is `false`.  
*Task*: Use `Number.isNaN()`.

8. **The String Concatenation Bug**:
```javascript
let price = "50";
let tax = 5;
let total = price + tax; // "505"
```
*Problem*: Concatenates to `"505"`.  
*Task*: Explicitly convert `Number(price) + tax`.

9. **The Object Null Check Crash**:
```javascript
const user = null;
console.log(user.name);
```
*Problem*: Throws `TypeError: Cannot read properties of null`.  
*Task*: Use optional chaining `user?.name`.

10. **The Logical OR Default Bug**:
```javascript
let count = 0;
let finalCount = count || 10; // 10
```
*Problem*: `0` is falsy, overriding valid count 0 with fallback 10!  
*Task*: Use nullish coalescing `count ?? 10`.
