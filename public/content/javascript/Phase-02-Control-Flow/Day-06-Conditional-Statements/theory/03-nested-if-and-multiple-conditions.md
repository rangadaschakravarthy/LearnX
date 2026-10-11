# Nested Conditions & Multiple Compound Logical Operators

## 1. What is it?
- **Nested `if` Statements**: Placing an `if` block inside another `if` block to evaluate sub-conditions after an outer condition passes.
- **Compound Logical Conditions**: Combining multiple boolean sub-expressions into a single condition using `&&` (AND), `||` (OR), and `!` (NOT).

---

## 2. Nested `if` Syntax & Usage

```javascript
const age = 22;
const hasDriverLicense = true;

if (age >= 18) {
  // Outer condition passed
  if (hasDriverLicense) {
    console.log("Eligible to rent a car!");
  } else {
    console.log("Must obtain a driver license first.");
  }
} else {
  console.log("Underage: Cannot rent a car.");
}
```

---

## 3. Simplifying Nested `if` with Compound Logical Operators

Deeply nested `if` statements create the "Pyramid of Doom" antipattern, making code hard to read and debug. You can often simplify nested logic using `&&` or `||`:

```javascript
// ❌ Deeply Nested (Hard to read)
if (user.isLoggedIn) {
  if (user.isEmailVerified) {
    if (user.hasActiveSubscription) {
      console.log("Access Granted to Premium Dashboard");
    }
  }
}

// ✅ Clean Compound Expression
if (user.isLoggedIn && user.isEmailVerified && user.hasActiveSubscription) {
  console.log("Access Granted to Premium Dashboard");
}
```

---

## 4. Complex Compound Expressions with Parentheses

When mixing `&&` and `||`, always use **parentheses `( ... )`** to explicitly control evaluation precedence:

```javascript
const isOwner = true;
const isAdmin = false;
const hasWritePermission = true;

// User can edit if they are owner OR if they are admin WITH write permissions
if (isOwner || (isAdmin && hasWritePermission)) {
  console.log("Permission Granted: Can Edit Document");
}
```

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: Forgetting precedence when mixing && and ||
```

```javascript
// ❌ BUG: && has higher precedence than ||!
// Evaluated as: isStudent || (age < 26 && isEmployed)
if (isStudent || age < 26 && isEmployed) { ... }

// ✅ FIX: Use parentheses to enforce intended logical grouping:
if ((isStudent || age < 26) && isEmployed) { ... }
```

---

## 6. Edge Cases
- Logical short-circuiting applies inside compound conditions:
```javascript
let user = null;

// Safe: Short-circuiting prevents checking user.role when user is null!
if (user !== null && user.role === "admin") {
  console.log("Admin Logged In");
}
```

---

## 7. Interview Perspective

### 🎯 Interview Focus
- **Q: How can you refactor 3 levels of nested `if` statements into cleaner code?**
  - *Answer*: Combine independent prerequisite checks into a single compound expression using `&&`, or use Guard Clauses with early returns to handle failure states upfront.

---

## 8. Practice Questions
1. Predict output of `if (true || false && false) console.log("A");`.
2. How do parentheses alter condition evaluation in `(A || B) && C` vs `A || B && C`?
3. What is the Pyramid of Doom antipattern in conditionals?

---

## 9. Key Takeaways
- Use nested `if` statements when an inner condition depends directly on outer state setup.
- Flatten deep nesting using compound logical operators (`&&`, `||`).
- Always use parentheses `()` when mixing `&&` and `||` in the same condition.
- Leverage short-circuiting to write safe guard checks (`user && user.name`).
