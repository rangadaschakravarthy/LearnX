# Mutability, Immutability & Advanced Type Checking

## 1. What is it?
- **Immutability**: The characteristic of a data value that prevents it from being modified after creation. **All 7 Primitive types are immutable**.
- **Mutability**: The characteristic of a data payload that allows properties or elements to be altered in memory. **Objects and Arrays are mutable**.
- **Advanced Type Checking**: Advanced methods (`Array.isArray()`, `instanceof`, `Object.prototype.toString.call()`) used to determine specific subtype identities.

---

## 2. Immutability of Primitives

```text
🔥 Must Know: Strings are immutable in JavaScript!
```

```javascript
let str = "hello";
str[0] = "H"; // Attempting string mutation
console.log(str); // "hello" (String mutation silently fails!)

// To change a string, you must reassign a NEW string instance:
str = "H" + str.slice(1);
console.log(str); // "Hello"
```

---

## 3. Advanced Type Checking Techniques

Because `typeof` returns `"object"` for arrays, dates, regexes, and plain objects, professional JavaScript developers use advanced type checking tools:

| Type Check Method | Target Type | Example | Result |
| :--- | :--- | :--- | :--- |
| `typeof val` | Primitives & Functions | `typeof "text"` | `"string"` |
| `Array.isArray(val)` | Arrays | `Array.isArray([1, 2])` | `true` |
| `val instanceof Constructor` | Object Class Subtypes | `new Date() instanceof Date` | `true` |
| `Object.prototype.toString.call(val)` | **Exact Universal Tag Check** | `Object.prototype.toString.call([])` | `"[object Array]"` |

---

## 4. Universal Type Identification Function

```javascript
function getExactType(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

console.log(getExactType("hello"));     // "string"
console.log(getExactType(42));          // "number"
console.log(getExactType([1, 2]));      // "array"
console.log(getExactType({}));          // "object"
console.log(getExactType(new Date()));  // "date"
console.log(getExactType(/abc/));       // "regexp"
console.log(getExactType(null));        // "null"
```

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: instanceof across different browser frames/iframes
```

`instanceof` checks if an object's prototype chain contains a constructor's prototype. If an array is passed from an iframe window into the main window, `arr instanceof Array` returns `false` because the iframe has a different `Array` constructor memory context! Always prefer `Array.isArray()` for array checks.

---

## 6. Edge Cases
- Calling `Object.freeze()` on an object makes it top-level immutable, but does NOT freeze nested objects ("shallow freeze"):
```javascript
const user = Object.freeze({
  details: { age: 30 }
});
user.details.age = 31; // Mutates nested object!
```

---

## 7. Interview Perspective

### 🎯 Interview Focus
- **Q: What is the most accurate way to check the exact type of any value in JavaScript?**
  - *Answer*: Using `Object.prototype.toString.call(value)`, which returns internal `[[Class]]` string tags such as `"[object Array]"`, `"[object Date]"`, or `"[object Null]"`.

---

## 8. Practice Questions
1. Why does string indexing assignment `str[0] = 'X'` fail to alter the string?
2. What does `Object.prototype.toString.call(new Date())` return?
3. What is the difference between shallow freeze and deep freeze?

---

## 9. Key Takeaways
- All primitives are immutable; objects are mutable.
- String methods return new string instances rather than mutating the original string.
- Use `Array.isArray()` for array verification.
- `Object.prototype.toString.call(val)` is the ultimate accurate type detector across all JS runtimes.
