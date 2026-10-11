# Day 06 Exercises Solutions

## Exercise 1 (🟢 Easy): Basic Conditionals & Ternary
```javascript
"use strict";

function isEvenOrOdd(num) {
  return num % 2 === 0 ? "Even" : "Odd";
}

function checkNumberSign(num) {
  if (num > 0) return "Positive";
  if (num < 0) return "Negative";
  return "Zero";
}

console.log("10 is:", isEvenOrOdd(10));
console.log("-5 sign:", checkNumberSign(-5));
```

---

## Exercise 2 (🟡 Medium): Tax Slab Calculator
```javascript
"use strict";

function calculateTaxRate(income) {
  if (income <= 0) return 0;
  if (income <= 10000) return 0;
  if (income <= 50000) return 10;
  if (income <= 100000) return 20;
  return 30;
}

console.log("Tax on $8,000:", calculateTaxRate(8000), "%");
console.log("Tax on $35,000:", calculateTaxRate(35000), "%");
console.log("Tax on $120,000:", calculateTaxRate(120000), "%");
```

---

## Exercise 3 (🔴 Challenge): E-Commerce Checkout Guard Clauses
```javascript
"use strict";

function processCheckout(cart, user) {
  if (!user || !user.isLoggedIn) return "Checkout Failed: User not logged in";
  if (!cart || cart.items.length === 0) return "Checkout Failed: Cart is empty";
  if (!user.hasValidPayment) return "Checkout Failed: No valid payment method";

  return `Checkout Success! Processing ${cart.items.length} items for ${user.name}.`;
}

const sampleUser = { name: "Alice", isLoggedIn: true, hasValidPayment: true };
const sampleCart = { items: ["Laptop", "Mouse"] };

console.log(processCheckout(sampleCart, sampleUser));
```
