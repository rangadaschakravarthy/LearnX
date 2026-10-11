# Deep Dive: `var` vs `let` vs `const`

## 1. What is it?
JavaScript provides three keywords for variable declarations: `var` (introduced in ES1), `let` (introduced in ES6), and `const` (introduced in ES6).

---

## 2. Comprehensive Comparison Matrix

| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope Boundary** | Function Scope / Global | Block Scope (`{}`) | Block Scope (`{}`) |
| **Hoisting Behavior** | Hoisted & initialized to `undefined` | Hoisted into Temporal Dead Zone (TDZ) | Hoisted into Temporal Dead Zone (TDZ) |
| **Redeclaration in Scope** | ✅ Allowed | ❌ `SyntaxError` | ❌ `SyntaxError` |
| **Reassignment** | ✅ Allowed | ✅ Allowed | ❌ `TypeError` |
| **Initialization Required?** | ❌ Optional | ❌ Optional | ✅ **Mandatory** |

---

## 3. Syntax & Examples

```javascript
// 1. var Keyword (Legacy)
var count = 1;
var count = 2; // ✅ Redeclaration allowed (Dangerous!)

// 2. let Keyword (Modern Reassignable)
let score = 50;
score = 60; // ✅ Reassignment allowed
// let score = 70; // ❌ SyntaxError: Identifier 'score' has already been declared

// 3. const Keyword (Modern Constant Binding)
const MAX_LIMIT = 100;
// MAX_LIMIT = 200; // ❌ TypeError: Assignment to constant variable
// const MIN_LIMIT; // ❌ SyntaxError: Missing initializer in const declaration
```

---

## 4. `const` Object & Array Mutation Gotcha

```text
🔥 Must Know: const prevents variable BINDING reassignment, NOT property mutation!
```

```javascript
const userProfile = {
  name: "Alice",
  age: 28
};

// ✅ ALLOWED: Mutating properties of the underlying object in Heap Memory
userProfile.age = 29;
userProfile.role = "Senior Engineer";

console.log(userProfile); // { name: 'Alice', age: 29, role: 'Senior Engineer' }

// ❌ FORBIDDEN: Reassigning the memory binding pointer
// userProfile = { name: "Bob" }; // TypeError: Assignment to constant variable
```

---

## 5. Step-by-Step Explanation
1. `const userProfile` binds the identifier `userProfile` to a specific heap memory address containing `{ name: "Alice", age: 28 }`.
2. Modifying `userProfile.age` updates the data inside heap memory without changing the memory pointer bound to `userProfile`.
3. Attempting `userProfile = {}` tries to overwrite the variable binding pointer, which `const` strictly forbids.

---

## 6. Real-World Selection Guidelines
1. **Default to `const`**: Use `const` for all variable declarations by default to minimize accidental reassignments.
2. **Use `let` when reassignment is expected**: Use `let` for loop counters, accumulators, toggles, or reassignable state.
3. **Never use `var`**: Avoid `var` in modern codebases to prevent scope leakage bugs and accidental redeclarations.

---

## 7. Common Mistakes

```text
⚠️ JavaScript Gotcha: Assuming const makes objects immutable
```

To make an object's properties truly immutable, use `Object.freeze()`:
```javascript
const config = Object.freeze({
  apiEndpoint: "https://api.example.com",
  timeout: 5000
});

// Under strict mode, this throws a TypeError!
config.timeout = 10000;
```

---

## 8. Edge Cases
- In non-strict mode, modifying a property on an `Object.freeze()` object fails silently. In strict mode, it throws a `TypeError`.

---

## 9. Interview Perspective

### 🎯 Interview Focus
- **Q: Can you reassign a property on a `const` object? Why?**
  - *Answer*: Yes. `const` creates an immutable binding for the variable identifier name, not an immutable value. For objects and arrays, `const` guarantees that the pointer address cannot change, but the object contents stored in heap memory can still be mutated.

---

## 10. Practice Questions
1. Why does `const x;` fail at parse time?
2. What error is thrown when reassigning a `const` variable?
3. How can you freeze an object so its properties cannot be mutated?

---

## 11. Key Takeaways
- `var` is function-scoped; `let` and `const` are block-scoped (`{}`).
- `const` requires initial assignment and prohibits variable binding reassignment.
- Object and array properties declared with `const` can still be mutated unless protected by `Object.freeze()`.
- Default to `const`; use `let` when reassignment is explicitly required; avoid `var`.
