# Switch Syntax & Strict Case Matching Semantics

## 1. What is it?
The **`switch` statement** evaluates an expression against a series of `case` clauses, executing the code statements associated with the first matching case.

---

## 2. Syntax & Structure

```javascript
switch (expression) {
  case value1:
    // Code block executed if expression === value1
    break;
  case value2:
    // Code block executed if expression === value2
    break;
  default:
    // Fallback block executed if no case matches
    break;
}
```

---

## 3. Strict Equality Case Matching Semantics (`===`)

```text
🔥 Critical Rule: Switch case matching evaluates using STRICT EQUALITY (===)!
Types are NOT coerced!
```

```javascript
const dayCode = "2"; // String "2"

switch (dayCode) {
  case 2: // ❌ Number 2: String "2" === Number 2 evaluates to FALSE!
    console.log("Tuesday");
    break;
  case "2": // ✅ String "2": String "2" === String "2" evaluates to TRUE!
    console.log("Tuesday String Match");
    break;
  default:
    console.log("Unknown Day");
}
```

---

## 4. Basic Example

```javascript
const userRole = "editor";

switch (userRole) {
  case "admin":
    console.log("Access Level: Full Administrative Access");
    break;
  case "editor":
    console.log("Access Level: Edit and Publish Articles");
    break;
  case "viewer":
    console.log("Access Level: Read Only");
    break;
  default:
    console.log("Access Level: Guest");
}
```

---

## 5. Step-by-Step Execution Trace
1. `switch (userRole)` evaluates `userRole` $\rightarrow$ `"editor"`.
2. Engine checks `case "admin"`: `"editor" === "admin"` $\rightarrow$ `false`.
3. Engine checks `case "editor"`: `"editor" === "editor"` $\rightarrow$ `true`.
4. Executes block: prints `"Access Level: Edit and Publish Articles"`.
5. Encounters `break;`: exits `switch` statement immediately.

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Expecting switch to perform type coercion
```

```javascript
const input = "1";

switch (input) {
  case 1: // ❌ Never matches string "1"!
    console.log("Matched Number 1");
    break;
}
```

---

## 7. Edge Cases
- Block-scoping variables inside case statements: Decaring `let` or `const` inside two separate case statements without wrapping case bodies in `{}` throws a `SyntaxError` due to scope sharing inside the single `switch` block:
```javascript
// ❌ SyntaxError: Identifier 'msg' has already been declared
// switch (x) {
//   case 1: let msg = "A"; break;
//   case 2: let msg = "B"; break;
// }

// ✅ FIX: Wrap case body in curly braces {}
switch (x) {
  case 1: {
    let msg = "A";
    console.log(msg);
    break;
  }
  case 2: {
    let msg = "B";
    console.log(msg);
    break;
  }
}
```

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: What operator does JavaScript use to match a switch expression against case values?**
  - *Answer*: Strict equality (`===`). Type coercion is not performed.

---

## 9. Practice Questions
1. Predict output of `switch("10") { case 10: console.log("A"); default: console.log("B"); }`.
2. Why is wrapping a `case` block in `{}` necessary when declaring `let` or `const`?
3. What happens if a `switch` expression matches no `case` clauses and no `default` clause exists?

---

## 10. Key Takeaways
- `switch` compares expressions against `case` values using strict equality (`===`).
- Always match data types exactly (string vs number).
- Wrap case blocks in `{}` when declaring `let` or `const` variables.
