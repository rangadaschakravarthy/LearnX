# Day 01 Exercises Solutions

## Exercise 1 (🟢 Easy): Console Basics
```javascript
// TODO 1
console.log("Developer Name: Alice | Language: JavaScript");

// TODO 2
console.warn("Database connection response delayed");

// TODO 3
console.error("404 Page Not Found");

// TODO 4
const products = [
  { id: 1, name: "Mechanical Keyboard", price: 120 },
  { id: 2, name: "Wireless Mouse", price: 45 },
  { id: 3, name: "4K Monitor", price: 350 }
];
console.table(products);
```

---

## Exercise 2 (🟡 Medium): Strict Mode Debugging
```javascript
"use strict";

// Problem 1 Fix: Explicitly declare score variable using let/const
let score = 100;

// Problem 2 Fix: Use distinct parameter names
function calculateTotal(basePrice, taxPrice) {
  return basePrice + taxPrice;
}

// Problem 3 Fix: Remove invalid delete call
let developerName = "Alex";
// delete developerName; // Removed invalid delete on variable identifier under strict mode

console.log("Score:", score);
console.log("Total:", calculateTotal(100, 15));
console.log("Developer:", developerName);
```

---

## Exercise 3 (🔴 Challenge): ASI Semicolon Fix
```javascript
"use strict";

// The newline after return caused ASI to insert a semicolon right after return, returning undefined.
// Fix: Place opening curly brace `{` on the same line as return:
function createStudentProfileFixed() {
  return {
    name: "Sophia",
    course: "Computer Science",
    year: 2026
  };
}

console.log("Fixed Profile:", createStudentProfileFixed());
```
