# Top 18 Object Manipulation Common Mistakes

## 1. Confusing Dot Notation with Bracket Notation for Dynamic Keys
❌ **Wrong:**
```js
const key = "score";
const student = { name: "Alex", score: 95 };
console.log(student.key); // undefined! Looks for literal property named "key"!
```
✅ **Correct:**
```js
const key = "score";
const student = { name: "Alex", score: 95 };
console.log(student[key]); // 95 (Evaluates variable key)
```

---

## 2. Using `undefined` Check for Property Existence
❌ **Wrong:**
```js
const data = { status: undefined };
if (data.status === undefined) {
  console.log("Property missing!"); // TRAP! Property "status" EXISTS, but its value is undefined!
}
```
✅ **Correct:**
```js
const data = { status: undefined };
console.log(Object.hasOwn(data, "status")); // true
```

---

## 3. Confusing `||` with `??` for Fallback Values
- Logical OR `||` falls back for ALL falsy values (`0`, `""`, `false`, `null`, `undefined`).
- Nullish coalescing `??` falls back ONLY for `null` and `undefined`.
