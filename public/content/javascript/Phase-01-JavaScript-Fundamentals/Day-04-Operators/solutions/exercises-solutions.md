# Day 04 Exercises Solutions

## Exercise 1 (🟢 Easy): Basic Operators Solutions
```javascript
// TODO 1: 15 % 4  -> 3
// TODO 2: 3 ** 3  -> 27
// TODO 3: "5" === 5 -> false
// TODO 4: "5" == 5  -> true
// TODO 5: let x = 10; console.log(x++); console.log(x); -> 10, then 11
```

---

## Exercise 2 (🟡 Medium): Short-Circuit & Nullish Solutions
```javascript
"use strict";

const userSettings = {
  theme: "light",
  volume: 0,
  accountDetails: null
};

function getProcessedSettings(settings) {
  // Fix 1: Use Nullish Coalescing (??) so volume: 0 is preserved
  const volume = settings.volume ?? 50;

  // Fix 2: Use Optional Chaining (?.) to avoid TypeError on null accountDetails
  const email = settings?.accountDetails?.email ?? "no-email@domain.com";

  return { volume, email };
}

console.log("Processed Settings:", getProcessedSettings(userSettings));
// Output: { volume: 0, email: 'no-email@domain.com' }
```

---

## Exercise 3 (🔴 Challenge): Complex Precedence Solution
```javascript
"use strict";

let a = 2;
let b = 3;
let c = 4;

// Expression: a++ + ++b * c-- / 2
// Step 1: a++ returns 2 (a becomes 3)
// Step 2: ++b increments b from 3 to 4 (returns 4)
// Step 3: c-- returns 4 (c becomes 3)
// Step 4: ++b * c-- => 4 * 4 = 16
// Step 5: 16 / 2 = 8
// Step 6: 2 + 8 = 10

const result = a++ + ++b * c-- / 2;

console.log("Result:", result); // 10
console.log("Final a:", a); // 4
console.log("Final b:", b); // 4
console.log("Final c:", c); // 3
```
