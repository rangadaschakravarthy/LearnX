# Day 07 Exercises Solutions

## Exercise 1 (🟢 Easy): Basic Switch
```javascript
"use strict";

function getDayNameSwitch(dayNum) {
  switch (dayNum) {
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    case 7: return "Sunday";
    default: return "Invalid";
  }
}

console.log("Day 3:", getDayNameSwitch(3));
console.log("Day 8:", getDayNameSwitch(8));
```

---

## Exercise 2 (🟡 Medium): Calculator Dispatcher
```javascript
"use strict";

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Cannot divide by zero" : a / b;
    default:
      return "Invalid operator";
  }
}

console.log("10 + 5:", calculate(10, 5, "+"));
console.log("10 / 0:", calculate(10, 0, "/"));
console.log("10 * 3:", calculate(10, 3, "*"));
```

---

## Exercise 3 (🔴 Challenge): Range Switch (true)
```javascript
"use strict";

function getDiscountPercentage(orderTotal, isVIP) {
  switch (true) {
    case (isVIP && orderTotal >= 500):
      return 30;
    case (isVIP || orderTotal >= 500):
      return 20;
    case (orderTotal >= 200):
      return 10;
    default:
      return 0;
  }
}

console.log("VIP $600 order discount:", getDiscountPercentage(600, true), "%");
console.log("Standard $250 order discount:", getDiscountPercentage(250, false), "%");
```
