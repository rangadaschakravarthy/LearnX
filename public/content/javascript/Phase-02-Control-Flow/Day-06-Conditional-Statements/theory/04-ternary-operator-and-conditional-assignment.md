# Ternary Operator & Conditional Variable Assignment

## 1. What is it?
The **Ternary Operator (`condition ? valueIfTrue : valueIfFalse`)** is a compact inline expression operator that evaluates a condition and returns one of two values.

Unlike an `if / else` statement (which is a **statement** that performs an action), the ternary operator is an **expression** that resolves to a value.

---

## 2. Syntax & Direct Comparison

```javascript
// Traditional if / else statement
let accessLevel;
if (userRole === "admin") {
  accessLevel = "Full Access";
} else {
  accessLevel = "Restricted Access";
}

// Compact ternary expression equivalent
const accessLevelTernary = userRole === "admin" ? "Full Access" : "Restricted Access";
```

---

## 3. Inline Ternary in String Interpolation & Function Returns

Because ternary is an expression, it can be embedded directly inside template literals, function return lines, and object definitions:

```javascript
const points = 150;

// Inline Template Literal
console.log(`User status: ${points >= 100 ? "VIP Gold" : "Standard Member"}`);

// Concise Function Return
function isEven(num) {
  return num % 2 === 0 ? "Even" : "Odd";
}
```

---

## 4. Chained / Nested Ternary (When NOT to use it!)

```text
⚠️ Anti-Pattern Warning: Avoid deep nested ternary expressions!
```

```javascript
// ❌ POOR READABILITY (Nested Ternary Anti-Pattern):
const status = score > 90 ? "A" : score > 80 ? "B" : score > 70 ? "C" : "F";

// ✅ PREFERRED (Clean else if chain or switch):
let grade;
if (score > 90) grade = "A";
else if (score > 80) grade = "B";
else if (score > 70) grade = "C";
else grade = "F";
```

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: Using ternary for side-effects instead of values
```

```javascript
// ❌ BAD PRACTICE (Using ternary as a statement substitute):
age >= 18 ? console.log("Adult") : console.log("Minor");

// ✅ GOOD PRACTICE: Use standard if/else for side-effects:
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

---

## 6. Edge Cases
- Ternary expressions can be passed directly as function parameters:
```javascript
function sendNotification(message, isUrgent) {
  console.log(`[${isUrgent ? "CRITICAL" : "INFO"}] ${message}`);
}
sendNotification("Server down", true);
```

---

## 7. Interview Perspective

### 🎯 Interview Focus
- **Q: What is the main difference between an `if/else` block and a ternary operator?**
  - *Answer*: `if/else` is a control statement that executes code blocks for side-effects. The ternary operator is an expression that evaluates and returns a single value, allowing it to be assigned directly to variables or embedded in string templates.

---

## 8. Practice Questions
1. Write a ternary expression that sets `canVote` to `true` if `age >= 18`, else `false`.
2. Why is using ternary for side-effect function calls discouraged?
3. Convert `let msg; if (isMember) msg = "Welcome"; else msg = "Sign up";` to ternary.

---

## 9. Key Takeaways
- Use `condition ? trueVal : falseVal` for concise conditional value assignments.
- Ternary is an **expression** that returns a value.
- Use standard `if/else` for side-effects (logging, API calls, DOM updates).
- Avoid chaining nested ternaries to maintain readable code.
