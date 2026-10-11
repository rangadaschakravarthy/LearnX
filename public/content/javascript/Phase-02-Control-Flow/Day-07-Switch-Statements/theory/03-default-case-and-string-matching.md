# The `default` Case & String Literal Matching

## 1. What is it?
- **`default` Clause**: The fallback branch in a `switch` statement that executes when none of the defined `case` values strictly match (`===`) the evaluated switch expression.
- **String Matching**: Using `switch` to route application control flow based on string literal command or action keys.

---

## 2. Default Case Placement & Behavior

```javascript
const userCommand = "DELETE_ALL";

switch (userCommand) {
  case "VIEW":
    console.log("Action: Render View");
    break;
  case "EDIT":
    console.log("Action: Open Editor");
    break;
  default: // Executes when userCommand is not "VIEW" or "EDIT"
    console.log(`Action: Unknown command '${userCommand}'. Routing to Help.`);
    break;
}
```

---

## 3. Position Flexibility of `default`

While `default` is conventionally placed at the **end** of a `switch` block, it can technically be placed anywhere. However, if placed at the top or middle without a `break`, it will fall through to subsequent cases!

```javascript
const option = 99;

// ⚠️ Unconventional default placement (Must include break if not at end!)
switch (option) {
  default:
    console.log("Default Fallback Option");
    break; // Essential if placed first!
  case 1:
    console.log("Option 1");
    break;
}
```

---

## 4. String Command & Action Routing Pattern

```javascript
function handleApiAction(actionType, payload) {
  switch (actionType) {
    case "FETCH_USER_SUCCESS":
      return { status: 200, user: payload };

    case "FETCH_USER_ERROR":
      return { status: 500, error: payload };

    case "USER_LOGOUT":
      return { status: 200, sessionCleared: true };

    default:
      return { status: 400, error: `Unsupported action type: ${actionType}` };
  }
}
```

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: Case sensitivity in string matching
```

```javascript
const input = "admin"; // Lowercase

switch (input) {
  case "ADMIN": // ❌ "admin" === "ADMIN" evaluates to FALSE!
    console.log("Admin Rights");
    break;
  default:
    console.log("Access Denied"); // Executes default!
}
```

---

## 6. Edge Cases
- Normalizing string inputs before switching:
```javascript
const rawInput = "  Admin  ";
const normalized = rawInput.trim().toUpperCase();

switch (normalized) {
  case "ADMIN":
    console.log("Clean match!"); // Matches successfully!
    break;
}
```

---

## 7. Interview Perspective

### 🎯 Interview Focus
- **Q: Is the `default` case mandatory in a JavaScript `switch` statement?**
  - *Answer*: No, `default` is optional. However, including a `default` case is a defensive programming best practice to gracefully handle unexpected input values or API payload failures.

---

## 8. Practice Questions
1. What happens if no `case` matches and `default` is omitted?
2. Why is normalizing strings (`.trim().toLowerCase()`) recommended before passing to a `switch` statement?
3. Where should `default` conventionally be placed in a `switch` block?

---

## 9. Key Takeaways
- `default` acts as the fallback execution branch when no `case` values match.
- String matching in `switch` is strictly case-sensitive ("Admin" != "admin").
- Always include `default` as a defensive programming best practice.
- Normalize string inputs before passing them into a switch statement.
