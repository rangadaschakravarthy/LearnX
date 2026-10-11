# Common JavaScript Mistakes & Gotchas

An exhaustive breakdown of common pitfalls, unexpected coercion behaviors, and syntax traps beginners and intermediate developers run into.

---

## 1. Variable & Scope Mistakes

### Mistake 1: Accidental Global Variables
```javascript
// BAD: Missing variable keyword
function calculateTotal() {
  total = 100 + 50; // Creates window.total / global.total!
}
calculateTotal();

// GOOD: Use strict mode or explicit declaration
"use strict";
function calculateTotal() {
  const total = 100 + 50;
}
```

### Mistake 2: Mutating `const` Reference Bindings vs Reassignment
```javascript
// BUG UNDERSTANDING:
const user = { name: "Alice" };

// THIS IS ALLOWED (Object property mutation):
user.name = "Bob"; // ✅

// THIS THROWS AN ERROR (Binding reassignment):
user = { name: "Bob" }; // ❌ TypeError: Assignment to constant variable
```

### Mistake 3: Accessing `let`/`const` in Temporal Dead Zone (TDZ)
```javascript
// BAD:
console.log(score); // ❌ ReferenceError: Cannot access 'score' before initialization
let score = 95;

// GOOD:
let score = 95;
console.log(score); // ✅ 95
```

---

## 2. Operator & Type Coercion Mistakes

### Mistake 4: Loose Equality (`==`) Comparison Unexpected Results
```javascript
// TRAP EXAMPLES:
0 == "0"         // true
0 == []          // true
"0" == []        // false!

// LESSON: Always default to strict equality (===)
0 === "0"        // false
```

### Mistake 5: String Addition vs Numeric Addition
```javascript
let count = "5";
console.log(count + 1); // "51" (Concatenation instead of 6!)

// FIX: Convert explicitly to Number first
console.log(Number(count) + 1); // 6
```

### Mistake 6: Using `||` instead of `??` for Numeric/Boolean Defaults
```javascript
let settings = { timeout: 0 };

// BAD: 0 is falsy, so timeout becomes 5000!
let timeout = settings.timeout || 5000; // 5000

// GOOD: Nullish coalescing only overrides null or undefined
let timeout = settings.timeout ?? 5000; // 0
```

---

## 3. Data Type & Calculation Mistakes

### Mistake 7: Floating Point Precision (`0.1 + 0.2`)
```javascript
console.log(0.1 + 0.2 === 0.3); // false! (Evaluates to 0.30000000000000004)

// FIX: Use Number.EPSILON or round to specific decimal places
function numbersAreEqual(num1, num2) {
  return Math.abs(num1 - num2) < Number.EPSILON;
}
console.log(numbersAreEqual(0.1 + 0.2, 0.3)); // true
```

### Mistake 8: Checking for `NaN` with `==` or `===`
```javascript
let result = "abc" * 2; // NaN

// BAD:
if (result === NaN) { ... } // Always false! NaN is never equal to NaN.

// GOOD:
if (Number.isNaN(result)) { ... } // ✅ true
```
