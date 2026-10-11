# Day 02 Exercises Solutions

## Exercise 1 (🟢 Easy): Declarations & Reassignment
```javascript
// TODO 1
let userAge = 20;
userAge = 21;

// TODO 2
const BIRTH_YEAR = 2005;

// TODO 3
const car = { brand: "Toyota", model: "Corolla" };
car.model = "Camry"; // Mutating property allowed
console.log(car); // { brand: 'Toyota', model: 'Camry' }
```

---

## Exercise 2 (🟡 Medium): Scope Leakage Solution
```javascript
"use strict";

function calculateOrderDiscounts(prices) {
  let grandTotal = 0; // Replace var with let

  for (let i = 0; i < prices.length; i++) { // Replace var with let for loop block scope
    const itemPrice = prices[i]; // Replace var with const
    if (itemPrice > 50) {
      const totalDiscount = itemPrice * 0.1; // Replace var with const for block scope
      grandTotal += (itemPrice - totalDiscount);
    } else {
      grandTotal += itemPrice;
    }
  }

  return grandTotal;
}

console.log("Grand Total:", calculateOrderDiscounts([30, 60, 100]));
```

---

## Exercise 3 (🔴 Challenge): TDZ & Hoisting Solution
```javascript
"use strict";

function processUserDataFixed() {
  // 1. Declare let variables before accessing them to leave the TDZ
  let userName = "Elizabeth";
  console.log("Processing user:", userName);

  // 2. Declare functions
  function checkStatus() {
    return "Active";
  }

  // 3. Invoke function after declaration
  let finalStatus = checkStatus();
  console.log("User Status:", finalStatus);
}

processUserDataFixed();
```
