# The `for...in` Loop & Object Property Keys

## 1. What is it?
The **`for...in` loop** iterates over all **enumerable property keys (names)** of an object, including properties inherited through its prototype chain.

---

## 2. Syntax & Basic Usage

```javascript
for (const key in object) {
  // Loop Body: 'key' receives property name string per iteration
  console.log(`Key: ${key}, Value: ${object[key]}`);
}
```

---

## 3. Object Key Iteration Example

```javascript
const student = {
  name: "Alexander",
  course: "Computer Science",
  gpa: 3.8
};

for (const prop in student) {
  console.log(`${prop}: ${student[prop]}`);
}
// Output:
// name: Alexander
// course: Computer Science
// gpa: 3.8
```

---

## 4. `hasOwnProperty()` Prototype Safeguard

Because `for...in` iterates over inherited prototype properties as well as own properties, always guard `for...in` loops with `Object.hasOwn(obj, prop)` or `obj.hasOwnProperty(prop)`:

```javascript
const parentObj = { inheritedProp: "Inherited" };
const childObj = Object.create(parentObj);
childObj.ownProp = "Own Value";

// ❌ Unsafe for...in (Iterates over inherited properties too!):
for (const key in childObj) {
  console.log(key); // Prints "ownProp" AND "inheritedProp"!
}

// ✅ Safe for...in (Filters own properties strictly):
for (const key in childObj) {
  if (Object.hasOwn(childObj, key)) {
    console.log(`Own Key: ${key}`); // Prints ONLY "ownProp"!
  }
}
```

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: Using for...in to iterate Array values
```

```javascript
const arr = [10, 20, 30];
arr.customAttribute = "Extra"; // Attached non-index property!

// ❌ BAD: for...in iterates string keys ("0", "1", "2", "customAttribute")!
for (const key in arr) {
  console.log(key); // "0", "1", "2", "customAttribute" (NOT array values!)
}

// ✅ FIX: Use for...of for Array values!
for (const val of arr) {
  console.log(val); // 10, 20, 30
}
```

---

## 6. Edge Cases
- Property order in `for...in`: Integer keys (like `"1"`, `"2"`) are iterated first in numeric ascending order, followed by string keys in insertion order.

---

## 7. Interview Perspective

### 🎯 Interview Focus
- **Q: Why is `for...in` discouraged for iterating array values?**
  - *Answer*: `for...in` iterates string property *keys* rather than values, includes non-integer array properties attached to the object, iterates inherited prototype properties, and does not guarantee numeric index order.

---

## 8. Practice Questions
1. What variable content does `for...in` bind on each iteration?
2. How do you prevent a `for...in` loop from accessing inherited prototype properties?
3. Predict output of `for (const x in { a: 1, b: 2 }) console.log(x);`.

---

## 9. Key Takeaways
- `for...in` iterates over object property **keys**.
- Access property values inside `for...in` using bracket notation `object[key]`.
- Always guard `for...in` with `Object.hasOwn(obj, key)` to filter inherited properties.
- Never use `for...in` for standard array value iteration.
