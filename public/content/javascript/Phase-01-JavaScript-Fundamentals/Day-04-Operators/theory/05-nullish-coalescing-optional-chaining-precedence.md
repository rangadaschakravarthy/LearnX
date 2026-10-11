# Nullish Coalescing, Optional Chaining & Operator Precedence

## 1. What is it?
- **Nullish Coalescing Operator (`??`)**: A logical operator introduced in ES2020 that returns its right-hand operand ONLY when its left-hand operand evaluates strictly to `null` or `undefined`.
- **Optional Chaining Operator (`?.`)**: A safe navigation operator introduced in ES2020 that permits reading property values deeply nested within object structures without causing a `TypeError` if a reference is `null` or `undefined`.
- **Operator Precedence**: Rules determining the sequence in which operators are evaluated within an expression.

---

## 2. Nullish Coalescing (`??`) vs Logical OR (`||`)

```javascript
// 1. Logical OR (||) treats ALL 8 falsy values as triggers
console.log(0 || 50);          // 50 (0 is falsy!)
console.log("" || "Default");  // "Default" ("" is falsy!)

// 2. Nullish Coalescing (??) triggers ONLY on null or undefined
console.log(0 ?? 50);          // 0 (0 is NOT null or undefined!)
console.log("" ?? "Default");  // "" ("" is NOT null or undefined!)
console.log(null ?? 50);       // 50
console.log(undefined ?? 50);  // 50
```

---

## 3. Optional Chaining (`?.`) Deep Dive

### Problem Solved
Accessing nested object properties when intermediate objects might be `null` or `undefined` normally throws a catastrophic `TypeError`:

```javascript
const user = { profile: null };

// ❌ Throws TypeError: Cannot read properties of null (reading 'address')
// console.log(user.profile.address.city);

// ✅ Traditional Verbose Solution:
console.log(user.profile && user.profile.address && user.profile.address.city); // undefined

// 🚀 Modern ES2020 Optional Chaining Solution:
console.log(user?.profile?.address?.city); // undefined (Returns undefined cleanly!)
```

---

## 4. Optional Chaining with Functions & Arrays

```javascript
const company = {
  getCEO: function() { return "Alice"; },
  employees: ["Bob", "Charlie"]
};

// 1. Optional Function Invocation
console.log(company.getCEO?.()); // "Alice"
console.log(company.getCFO?.()); // undefined (Does NOT throw TypeError!)

// 2. Optional Array Indexing
console.log(company.employees?.[0]); // "Bob"
console.log(company.contractors?.[0]); // undefined
```

---

## 5. Master Operator Precedence & Associativity Table

Higher precedence operators execute before lower precedence operators:

| Precedence Rank | Operator Type | Operators | Associativity |
| :--- | :--- | :--- | :--- |
| **20 (Highest)** | Grouping | `( ... )` | N/A |
| **19** | Member Access / Optional Chaining | `obj.prop`, `obj?.[prop]`, `fn?.()` | Left-to-Right |
| **16** | Unary Operators / Logical NOT | `!`, `+`, `-`, `typeof`, `delete`, `++`, `--` | Right-to-Left |
| **14** | Exponentiation | `**` | **Right-to-Left** |
| **13** | Multiplication / Division / Modulus | `*`, `/`, `%` | Left-to-Right |
| **12** | Addition / Subtraction | `+`, `-` | Left-to-Right |
| **10** | Comparison Operators | `<`, `<=`, `>`, `>=` | Left-to-Right |
| **9** | Equality Operators | `===`, `!==`, `==`, `!=` | Left-to-Right |
| **5** | Logical AND | `&&` | Left-to-Right |
| **4** | Logical OR / Nullish | `||`, `??` | Left-to-Right |
| **3** | Ternary Operator | `cond ? a : b` | Right-to-Left |
| **2 (Lowest)** | Assignment Operators | `=`, `+=`, `-=`, `*=`, `??=` | Right-to-Left |

---

## 6. Parentheses Precedence Rule

```text
🔥 Best Practice Rule: Never rely on memorizing complex precedence numbers!
Use parentheses ( ... ) explicitly to make evaluation intent crystal clear!
```

```javascript
// Hard to read:
let result = 5 + 3 * 2 > 10 && 4 + 1 === 5;

// Clean & Explicit:
let cleanResult = ((5 + (3 * 2)) > 10) && ((4 + 1) === 5);
```

---

## 7. Common Mistakes

```text
⚠️ JavaScript Gotcha: Syntax Error pairing ?? with && or || without parentheses
```

```javascript
// ❌ SyntaxError: Cannot use '??' unparenthesized within '||' or '&&' expressions
// const value = null || "a" ?? "b";

// ✅ Solution: Add parentheses explicitly
const value = (null || "a") ?? "b";
```

---

## 8. Interview Perspective

### 🧠 Deep Concept Interview Questions
- **Q: What is the difference between `||` and `??`?**
  - *Answer*: `||` falls back for all 8 falsy values (`false`, `0`, `""`, `null`, `undefined`, `NaN`, `-0`, `0n`). `??` falls back ONLY for nullish values (`null` or `undefined`).
- **Q: What happens if optional chaining `?.` encounters `undefined` or `null` mid-chain?**
  - *Answer*: It short-circuits immediately and evaluates the entire optional chain expression to `undefined` without attempting further dereferencing.

---

## 9. Practice Questions
1. Predict output of `0 ?? 100`.
2. Predict output of `0 || 100`.
3. Predict output of `const obj = {}; console.log(obj?.user?.name);`.

---

## 10. Key Takeaways
- `??` checks strictly for `null` or `undefined` (ideal for numeric/boolean defaults).
- `?.` short-circuits nested access cleanly, avoiding `TypeError: Cannot read properties of null`.
- Use parentheses `()` to enforce evaluation order explicitly.
