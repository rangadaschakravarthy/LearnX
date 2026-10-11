# `switch` vs `if / else` Decision Matrix

## 1. What is it?
Both `switch` and `if / else if / else` are conditional control structures. Choosing the right structure depends on readability, maintainability, performance, and the nature of the condition being evaluated.

---

## 2. Comprehensive Decision Matrix

| Situation / Requirements | Prefer `if / else` | Prefer `switch` | Reason / Rationale |
| :--- | :--- | :--- | :--- |
| **Exact Static Value Matching** (3+ discreet strings/numbers) | | ✅ **Prefer Switch** | Cleaner readability for exact key/command routing. |
| **Numeric Range Checking** (`x > 100`, `x <= 50`) | ✅ **Prefer If/Else** | | `if/else` is native for range thresholds; `switch(true)` adds syntactic clutter. |
| **Complex Logical Expressions** (`A && B \|\| C`) | ✅ **Prefer If/Else** | | `if/else` handles compound boolean expressions cleanly. |
| **Menu / Command Routing Systems** | | ✅ **Prefer Switch** | Perfect match for dispatching actions by command key. |
| **Intentional Multi-case Grouping** (Fall-through) | | ✅ **Prefer Switch** | Grouping case clauses (`case "A": case "B":`) avoids duplicate OR checks. |
| **Simple Dual-Branching** (True / False) | ✅ **Prefer If/Else** | | `if/else` or ternary is far more concise for 2-path decisions. |

---

## 3. Side-by-Side Code Comparison

### Scenario A: Command Action Dispatcher (Prefer `switch`)

```javascript
// ❌ Cluttered with repeat variable references:
if (action === "CREATE") {
  createRecord();
} else if (action === "UPDATE") {
  updateRecord();
} else if (action === "DELETE") {
  deleteRecord();
} else {
  defaultAction();
}

// ✅ Clean, readable, and structured:
switch (action) {
  case "CREATE": createRecord(); break;
  case "UPDATE": updateRecord(); break;
  case "DELETE": deleteRecord(); break;
  default:       defaultAction(); break;
}
```

### Scenario B: Income Tax Slab Calculation (Prefer `if / else`)

```javascript
// ✅ Natural and clean readability for range checking:
if (income > 100000) taxRate = 0.30;
else if (income > 50000) taxRate = 0.20;
else if (income > 10000) taxRate = 0.10;
else taxRate = 0.00;
```

---

## 4. Performance Myth vs Reality

```text
💡 Performance Fact:
Modern V8 / SpiderMonkey engines optimize both switch and if/else into fast jump tables or inline checks.
DO NOT choose switch over if/else for premature performance optimization. Choose based on CODE READABILITY!
```

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: Converting simple 2-path if/else statements into bulky switch blocks
```

```javascript
// ❌ OVERKILL:
switch (isLoggedIn) {
  case true: console.log("Welcome"); break;
  case false: console.log("Login required"); break;
}

// ✅ CLEAN:
console.log(isLoggedIn ? "Welcome" : "Login required");
```

---

## 6. Edge Cases
- When switching over object properties or enum-like data dictionary constants, `switch` enforces clean separation of action handlers.

---

## 7. Interview Perspective

### 🎯 Interview Focus
- **Q: When should a developer prefer a `switch` statement over an `if/else` chain?**
  - *Answer*: Prefer `switch` when matching a single expression against a discrete set of 3 or more static, mutually exclusive values (e.g. action commands, status codes, user roles) or when taking advantage of intentional case fall-through grouping.

---

## 8. Practice Questions
1. Which structure is preferred for evaluating tax bracket income ranges?
2. Which structure is preferred for routing user menu actions (`"ADD"`, `"DELETE"`, `"VIEW"`)?
3. Does `switch` execute significantly faster than `if/else` in modern JavaScript engines?

---

## 9. Key Takeaways
- Use `switch` for 3+ discrete static value matches (strings, action codes, menu commands).
- Use `if/else` for range threshold checks and complex compound expressions.
- Prioritize code readability over premature engine optimization performance myths.
