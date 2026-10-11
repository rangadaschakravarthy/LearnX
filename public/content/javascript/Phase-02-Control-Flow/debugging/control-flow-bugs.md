# Master Debugging Collection — Control Flow & Program Logic

This collection contains **40 buggy code snippets** spanning Conditionals, Switch Statements, Loops, Advanced Looping, and Edge Cases. Identify the bug and fix it. Solutions are in `solutions.md`.

---

## Part 1: Conditionals & Assignment Bugs (1-10)

### Bug 1: Assignment in `if` condition
```javascript
let isAdmin = false;
if (isAdmin = true) {
  console.log("Welcome Admin");
}
```

### Bug 2: Missing parentheses around short-circuit logic
```javascript
const age = 20;
const hasId = false;
if (age >= 18 && hasId === true || age >= 21) {
  // Logic flaw with operator precedence
}
```

### Bug 3: String comparison coercion gotcha
```javascript
const inputAge = "18";
if (inputAge > 5) {
  // Works, but inputAge + 2 gives "182" instead of 20
}
```

### Bug 4: Incorrect `else-if` order
```javascript
function getGrade(score) {
  if (score >= 60) return "D";
  else if (score >= 70) return "C";
  else if (score >= 80) return "B";
  else if (score >= 90) return "A";
  else return "F";
}
```

### Bug 5: Floating point precision condition check
```javascript
if (0.1 + 0.2 === 0.3) {
  console.log("Equal!");
}
```

### Bug 6: Danger of unparenthesized object in return line
```javascript
function getUser() {
  return
  {
    name: "Alex"
  };
}
```

### Bug 7: Accidental semicolon after `if`
```javascript
let score = 40;
if (score >= 50); {
  console.log("You passed!");
}
```

### Bug 8: Fallthrough in `if...else` with missing `{}`
```javascript
let val = 10;
if (val > 5)
  console.log("Greater than 5");
  console.log("Always executes!");
```

### Bug 9: Truthy array check flaw
```javascript
const items = [];
if (items) {
  console.log("Array has items!"); // Executes even when empty!
}
```

### Bug 10: NaN comparison flaw
```javascript
const val = NaN;
if (val === NaN) {
  console.log("Is NaN"); // Never executes!
}
```

---

## Part 2: Switch Statement Bugs (11-20)

### Bug 11: Missing `break` statement
```javascript
const day = 1;
switch (day) {
  case 1: console.log("Mon");
  case 2: console.log("Tue");
  default: console.log("Other");
}
```

### Bug 12: Strict type checking mismatch in switch
```javascript
const code = "1";
switch (code) {
  case 1: console.log("One"); break; // Fails!
  default: console.log("Not matched");
}
```

### Bug 13: Variable redeclaration in switch block
```javascript
switch (type) {
  case 'A': let msg = "Alpha"; break;
  case 'B': let msg = "Beta"; break; // SyntaxError: Identifier 'msg' has already been declared
}
```

### Bug 14: Duplicate `case` values
```javascript
switch (x) {
  case 1: console.log("First"); break;
  case 1: console.log("Second"); break; // Unreachable
}
```

### Bug 15: Expression evaluation in case clauses
```javascript
const num = 15;
switch (num) {
  case num > 10: console.log("Greater than 10"); break; // Fails! Evaluates true vs 15
}
```

### Bug 16: Missing default handling leading to undefined return
```javascript
function getRoleName(id) {
  switch (id) {
    case 1: return "Admin";
    case 2: return "User";
  }
}
```

### Bug 17: Fallthrough intention error
```javascript
switch (fruit) {
  case 'apple':
    console.log("Apple");
  case 'banana':
    console.log("Banana"); break;
}
```

### Bug 18: Switch on object reference
```javascript
const obj = { id: 1 };
switch (obj) {
  case { id: 1 }: console.log("Matched!"); break; // Reference check fails!
}
```

### Bug 19: Returning from inside switch inside loop
```javascript
function findFirstValid(items) {
  for (let i = 0; i < items.length; i++) {
    switch (items[i]) {
      case 'valid': return items[i]; // Exits function, not loop!
    }
  }
}
```

### Bug 20: Empty case statement behavior
```javascript
switch (x) {
  case 1:
  case 2:
  case 3:
  default: console.log("Default");
}
```

---

## Part 3: Loop & Iteration Bugs (21-30)

### Bug 21: Infinite `while` loop missing update step
```javascript
let count = 0;
while (count < 5) {
  console.log(count);
  // Missing count++
}
```

### Bug 22: Off-by-one array index access
```javascript
const arr = [10, 20, 30];
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]); // arr[3] is undefined!
}
```

### Bug 23: Array mutation inside `for` loop
```javascript
const nums = [1, 2, 3, 4, 5];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) nums.splice(i, 1);
}
```

### Bug 24: Modifying loop index inside body
```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
  i = i + 2; // Causes skipped iterations and confusion
}
```

### Bug 25: `do...while` initial condition bypass
```javascript
let x = 100;
do {
  console.log("Runs once even though condition is false!");
  x++;
} while (x < 10);
```

### Bug 26: Infinite loop with floating point step
```javascript
for (let i = 0; i !== 1; i += 0.1) {
  // Floating point inaccuracy means i never equals exactly 1.0!
}
```

### Bug 27: Closure var in loop scope issue
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints 3 3 3
}
```

### Bug 28: Misplaced semicolon on `while` line
```javascript
let i = 0;
while (i < 5); {
  console.log(i);
  i++;
}
```

### Bug 29: Decrementing loop going negative infinitely
```javascript
for (let i = 10; i >= 0; i++) { // i++ instead of i--
  console.log(i);
}
```

### Bug 30: Accumulator variable reset inside loop
```javascript
const nums = [1, 2, 3];
for (let i = 0; i < nums.length; i++) {
  let sum = 0; // Reset every iteration!
  sum += nums[i];
}
```

---

## Part 4: Advanced Looping & Edge Cases (31-40)

### Bug 31: `for...of` on plain object
```javascript
const user = { name: "Alex", age: 25 };
for (const val of user) { // TypeError: user is not iterable
  console.log(val);
}
```

### Bug 32: `for...in` array index type error
```javascript
const arr = [10, 20];
for (const idx in arr) {
  const next = idx + 1; // "01", "11" string concatenation!
}
```

### Bug 33: Prototype property leak in `for...in`
```javascript
Object.prototype.shared = "hack";
const data = { a: 1 };
for (const k in data) console.log(k); // Prints 'a' and 'shared'
```

### Bug 34: Labeled break breaking wrong loop
```javascript
outer: for (let i = 0; i < 3; i++) {
  inner: for (let j = 0; j < 3; j++) {
    if (j === 1) break inner; // Should break outer loop!
  }
}
```

### Bug 35: Modifying object keys during `for...in`
```javascript
const obj = { a: 1, b: 2 };
for (const k in obj) {
  delete obj.b; // Modifying keys during iteration
}
```

### Bug 36: Destructuring `undefined` entry in `Object.entries`
```javascript
const data = { a: null };
for (const [k, v = "default"] of Object.entries(data)) {
  // v is null, default string is ignored!
}
```

### Bug 37: Infinite loop with negative decrement condition
```javascript
for (let i = 5; i > 0; i--) {
  if (i === 3) i += 2; // Infinite loop trigger
}
```

### Bug 38: Array `forEach` trying to `break`
```javascript
[1, 2, 3].forEach(n => {
  if (n === 2) break; // SyntaxError: Illegal break statement
});
```

### Bug 39: Map/Set iteration type assumption
```javascript
const set = new Set([1, 2, 3]);
for (let i = 0; i < set.length; i++) { // Set has no .length, it has .size!
  console.log(set[i]); // Undefined!
}
```

### Bug 40: Sparse array missing elements in `for` vs `for...of`
```javascript
const sparse = [1, , 3];
for (let i = 0; i < sparse.length; i++) console.log(sparse[i]); // Prints 1, undefined, 3
for (const item of sparse) console.log(item); // Iterates undefined explicitly
```
