# Comparison Operators: Loose Equality (`==`) vs Strict Equality (`===`)

## 1. What is it?
Comparison operators compare two operands and evaluate to a boolean (`true` or `false`).

JavaScript features two forms of equality comparison:
1. **Strict Equality (`===`) / Inequality (`!==`)**: Compares both **Type AND Value** without type conversion.
2. **Loose Equality (`==`) / Inequality (`!=`)**: Coerces operands to a common type before comparing values.

---

## 2. Operator Comparison Matrix

| Operator | Description | Example | Evaluates To |
| :--- | :--- | :--- | :--- |
| `>` | Greater than | `10 > 5` | `true` |
| `<` | Less than | `3 < 2` | `false` |
| `>=` | Greater than or equal | `5 >= 5` | `true` |
| `<=` | Less than or equal | `4 <= 5` | `true` |
| `===` | Strict Equality | `5 === "5"` | `false` (Different Types!) |
| `!==` | Strict Inequality | `5 !== "5"` | `true` |
| `==` | Loose Equality | `5 == "5"` | `true` (Coerces string to number) |
| `!=` | Loose Inequality | `5 != "5"` | `false` |

---

## 3. Strict Equality (`===`) vs Loose Equality (`==`)

```text
🔥 Must Know Rule: Always use strict equality (===) by default!
```

```javascript
// 1. Strict Equality (No Type Coercion)
console.log(5 === 5);    // true (Number vs Number)
console.log(5 === "5");  // false (Number vs String)
console.log(1 === true); // false (Number vs Boolean)

// 2. Loose Equality (Performs Implicit Coercion)
console.log(5 == "5");   // true ("5" converted to Number 5)
console.log(1 == true);  // true (true converted to Number 1)
console.log(0 == false); // true (false converted to Number 0)
console.log("" == false);// true ("" converted to Number 0)
```

---

## 4. `null` and `undefined` Loose Equality Exception

Under the ECMAScript specification for `==`, `null` and `undefined` are loosely equal **only to each other**:

```javascript
console.log(null == undefined);  // true! (Spec exception)
console.log(null === undefined); // false! (Different types)

console.log(null == 0);          // false!
console.log(null == false);      // false!
console.log(undefined == false); // false!
```

---

## 5. Object Reference Comparison

Comparing objects or arrays with `==` or `===` tests **Memory Reference Pointers**, NOT internal structure contents:

```javascript
const arr1 = [1, 2];
const arr2 = [1, 2];

console.log(arr1 == arr2);  // false! (Distinct heap addresses)
console.log(arr1 === arr2); // false!

const arr3 = arr1;
console.log(arr1 === arr3); // true! (Identical pointer address)
```

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Misunderstanding loose equality coercion traps
```

```javascript
console.log(0 == "");        // true
console.log(0 == "0");       // true
console.log("" == "0");      // false! (String vs String equality check!)
console.log(false == "0");   // true
```

---

## 7. Edge Cases
- Comparing strings uses lexicographical (dictionary) Unicode character order:
```javascript
console.log("2" > "12"); // true! (Character '2' comes after character '1' in Unicode)
console.log(2 > 12);     // false (Numeric comparison)
```

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: What is the difference between `==` and `===` in JavaScript?**
  - *Answer*: `===` (Strict Equality) checks both value and data type without performing coercion. `==` (Loose Equality) performs implicit type coercion according to Abstract Equality Comparison rules before comparing values.

---

## 9. Practice Questions
1. Predict output of `0 === false`.
2. Predict output of `null == undefined`.
3. Predict output of `"10" > "2"`.

---

## 10. Key Takeaways
- Always prefer strict equality `===` and strict inequality `!==`.
- Loose equality `==` triggers implicit type coercion leading to counter-intuitive traps.
- `null == undefined` is `true`, but neither is loosely equal to `0` or `false`.
- Object comparison checks memory address pointers.
