# Object Utility Iteration & Nested Data Looping

## 1. What is it?
Rather than using `for...in` directly on objects, modern JavaScript provides three static helper methods on `Object`:
1. `Object.keys(obj)`: Returns an array of an object's own enumerable key names.
2. `Object.values(obj)`: Returns an array of an object's own property values.
3. `Object.entries(obj)`: Returns an array of `[key, value]` tuple pairs.

---

## 2. Iterating Objects with `Object` Static Utilities

```javascript
const user = {
  id: 101,
  username: "alex99",
  role: "admin"
};

// 1. Iterating Keys
for (const key of Object.keys(user)) {
  console.log(`Key: ${key}`);
}

// 2. Iterating Values
for (const val of Object.values(user)) {
  console.log(`Value: ${val}`);
}

// 3. Iterating Key-Value Pairs using Destructuring
for (const [key, val] of Object.entries(user)) {
  console.log(`${key} ➔ ${val}`);
}
```

---

## 3. Iterating Collections of Nested Objects

A common real-world task is iterating over an array containing nested objects:

```javascript
const employees = [
  { id: 1, name: "Alice", department: "Engineering", salary: 85000 },
  { id: 2, name: "Bob", department: "Design", salary: 72000 },
  { id: 3, name: "Charlie", department: "Engineering", salary: 90000 }
];

let totalEngineeringSalary = 0;

for (const emp of employees) {
  if (emp.department === "Engineering") {
    totalEngineeringSalary += emp.salary;
  }
}

console.log("Total Engineering Payroll:", totalEngineeringSalary); // 175000
```

---

## 4. Step-by-Step Execution Breakdown
1. `for (const emp of employees)` loops through array elements. On each iteration, `emp` receives an employee object `{ id: ..., name: ... }`.
2. `if (emp.department === "Engineering")` checks property values on the current nested object.
3. Accumulator `totalEngineeringSalary` sums salary amounts for matching objects.

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: Destructuring undefined properties in nested object loops
```

```javascript
const users = [
  { name: "Alice", details: { age: 30 } },
  { name: "Bob" } // Missing details object!
];

// ❌ BUG: Throws TypeError: Cannot read properties of undefined (reading 'age')
// for (const u of users) { console.log(u.details.age); }

// ✅ FIX: Use optional chaining inside loop:
for (const u of users) {
  console.log(u.details?.age ?? "Age Unknown");
}
```

---

## 6. Edge Cases
- `Object.entries()` transforms an object into a 2D tuple array `[["id", 101], ["username", "alex99"]]`, making it compatible with `for...of` loops!

---

## 7. Interview Perspective

### 🎯 Interview Focus
- **Q: How can you safely iterate over an object's keys and values using a `for...of` loop?**
  - *Answer*: Use `for (const [key, value] of Object.entries(obj))`, which converts the object into an array of `[key, value]` pairs compatible with `for...of` and array destructuring.

---

## 8. Practice Questions
1. What does `Object.entries({ a: 1, b: 2 })` return?
2. How do you sum numeric property values inside an array of user objects using a loop?
3. What is the advantage of `Object.keys(obj)` over `for...in`?

---

## 9. Key Takeaways
- `Object.keys()`, `Object.values()`, and `Object.entries()` convert objects into iterable arrays.
- Use `Object.entries(obj)` with `[key, value]` destructuring for clean object iteration.
- Combine `for...of` with optional chaining (`?.`) when looping arrays of nested objects.
