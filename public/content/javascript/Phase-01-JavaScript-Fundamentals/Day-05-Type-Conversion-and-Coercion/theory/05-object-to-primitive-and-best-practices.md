# Object-to-Primitive Conversion & Coercion Best Practices

## 1. What is it?
When an object is used in a context expecting a primitive value (such as adding an object to a number `obj + 5`, printing an object in a string template, or loose equality comparison `obj == "val"`), JavaScript engine executes **Object-to-Primitive Conversion**.

This process relies on three internal object methods:
1. `Symbol.toPrimitive(hint)`
2. `valueOf()`
3. `toString()`

---

## 2. The Object-to-Primitive Conversion Algorithm

The JS engine passes a **hint** to determine conversion preference:
- `"string"` hint: String concatenation, template literals, object key usage.
- `"number"` hint: Arithmetic operators (`-`, `*`, `/`, `%`), comparison (`>`, `<`).
- `"default"` hint: Addition operator `+`, loose equality `==`.

```text
Algorithm for "string" hint:
1. Call obj[Symbol.toPrimitive]('string') if defined.
2. Otherwise, call obj.toString(). If it returns a primitive, return it.
3. Otherwise, call obj.valueOf(). If it returns a primitive, return it.
4. Throw TypeError if no primitive is obtained.

Algorithm for "number" / "default" hint:
1. Call obj[Symbol.toPrimitive]('number') if defined.
2. Otherwise, call obj.valueOf(). If it returns a primitive, return it.
3. Otherwise, call obj.toString(). If it returns a primitive, return it.
4. Throw TypeError if no primitive is obtained.
```

---

## 3. Custom `Symbol.toPrimitive` Example

```javascript
const wallet = {
  cash: 100,
  currency: "USD",

  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.cash;
    }
    if (hint === "string") {
      return `${this.cash} ${this.currency}`;
    }
    return this.cash; // "default" hint
  }
};

console.log(+wallet);          // 100 (Hint: "number")
console.log(`${wallet}`);      // "100 USD" (Hint: "string")
console.log(wallet + 50);      // 150 (Hint: "default")
```

---

## 4. Default Object & Array Coercion Behavior

By default:
- Standard object `{}` has `.valueOf()` returning the object itself, so `.toString()` is called, returning `"[object Object]"`.
- Array `[1, 2, 3]` has `.valueOf()` returning the array itself, so `.toString()` is called, returning `"1,2,3"`.

```javascript
console.log({} + []); // "[object Object]"
console.log([1, 2] + [3, 4]); // "1,2,33,4"
```

---

## 5. Coercion Best Practices Rules for Engineers

1. **Always use strict equality (`===`)**: Never use `==` unless explicitly checking for both `null` and `undefined` via `val == null`.
2. **Convert types intentionally & explicitly**: Do not rely on implicit coercion tricks like `str + ""` or `+str`. Use `String(val)` and `Number(val)` or `parseInt(val, 10)`.
3. **Sanitize & validate user input**: Input from HTML forms or API query params are always strings. Convert explicitly before math processing.
4. **Use `Number.isNaN()`**: Never check `val === NaN`.

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Unexpected concatenation from form inputs
```

```javascript
// HTML Form inputs return strings!
let input1 = "10";
let input2 = "20";

// BAD: Implicit coercion causes string concatenation
let totalBad = input1 + input2; // "1020"

// GOOD: Explicit conversion
let totalGood = Number(input1) + Number(input2); // 30
```

---

## 7. Edge Cases
- `Symbol` primitive values CANNOT be implicitly coerced to numbers or strings! Attempting `"ID: " + Symbol("id")` throws a `TypeError`. You must explicitly call `Symbol("id").toString()`.

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: How does JavaScript convert an object to a primitive value?**
  - *Answer*: It checks for `Symbol.toPrimitive(hint)`. If absent, it checks hint order: for string hint, it tries `.toString()` then `.valueOf()`; for number hint, it tries `.valueOf()` then `.toString()`. The first method returning a primitive value is used.

---

## 9. Practice Questions
1. What does `{}` convert to when coerced to a String by default?
2. What does `[1, 2, 3]` convert to when coerced to a String by default?
3. How can you define custom primitive conversion for a JavaScript object?

---

## 10. Key Takeaways
- Object-to-primitive conversion relies on `Symbol.toPrimitive`, `valueOf()`, and `toString()`.
- Default objects coerce to `"[object Object]"`; default arrays coerce to join strings `"1,2,3"`.
- Always convert data explicitly to maintain professional code quality.
