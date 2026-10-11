# Script Loading Attributes & Strict Mode

## 1. What is it?
- **Script Loading Attributes (`defer` / `async`)**: HTML attributes used on `<script>` tags that control how external JavaScript files are downloaded and executed relative to HTML document parsing.
- **Strict Mode (`"use strict"`)**: An opt-in execution mode introduced in ES5 that enforces cleaner code, prevents silent errors by throwing runtime exceptions, and disables dangerous or deprecated syntax.

---

## 2. Script Tag Placement & Loading Modes

```html
<!-- 1. Default Script (Blocking) -->
<script src="app.js"></script>

<!-- 2. Async Script (Non-blocking download, Immediate execution) -->
<script src="app.js" async></script>

<!-- 3. Defer Script (Non-blocking download, Executed after DOM parsing) -->
<script src="app.js" defer></script>
```

### Loading Behavior Comparison

| Attribute | HTML Parsing Interrupted? | Script Download Time | Script Execution Timing | Execution Order Preserved? |
| :--- | :--- | :--- | :--- | :--- |
| **Default `<script>`** | **Yes** (Pauses HTML parsing) | Synchronous | Immediately upon download | Yes |
| **`<script async>`** | **Only during execution** | Asynchronous | Immediately upon download completion | **No** (Executes as soon as downloaded) |
| **`<script defer>`** | **No** (Zero pause) | Asynchronous | After HTML parsing completes, before `DOMContentLoaded` | **Yes** (Executes in document order) |

```text
🔥 Must Know Best Practice: Use <script defer src="app.js"></script> in the HTML <head>.
```

---

## 3. Strict Mode (`"use strict"`)

Strict mode turns silent fails into thrown errors, repairs engine optimization blockers, and forbids legacy features.

### Enabling Strict Mode
```javascript
// Global Strict Mode (top of script file)
"use strict";

function myFunction() {
  // Function-scoped Strict Mode
  "use strict";
}
```

---

## 4. What Strict Mode Prevents

```javascript
"use strict";

// 1. Prevents accidental global variables
// x = 10; // ❌ ReferenceError: x is not defined

// 2. Prevents deleting undeletable properties or variables
// let y = 20;
// delete y; // ❌ SyntaxError: Delete of an unqualified identifier in strict mode

// 3. Prevents duplicate function parameter names
// function sum(a, a, c) {} // ❌ SyntaxError: Duplicate parameter name not allowed in this context

// 4. Prevents octal numeric literals
// let num = 010; // ❌ SyntaxError: Octal literals are not allowed in strict mode
```

---

## 5. Modern ES Modules & Strict Mode
ES6 Modules (`import` / `export`) are automatically in **Strict Mode by default**. You do not need to explicitly declare `"use strict";` inside ES modules.

---

## 6. Code Example

```javascript
"use strict";

function calculateArea(width, height) {
  // Width and height are properly declared parameters
  return width * height;
}

console.log(calculateArea(10, 5)); // 50
```

---

## 7. Common Mistakes

```text
⚠️ JavaScript Gotcha: Placing "use strict" AFTER statements
```

### Problem Code:
```javascript
console.log("Starting app");
"use strict"; // Ignored! Must be at the VERY top of file/function!
x = 100; // Silently creates global variable x!
```

---

## 8. Edge Cases
- When combining non-strict scripts with strict scripts into a single bundled file, global `"use strict"` at the top of the bundle forces strict mode onto ALL concatenated legacy code, potentially breaking legacy libraries!

---

## 9. Interview Perspective

### 🎯 Interview Focus Questions
- **Q: What is the difference between `defer` and `async` script attributes?**
  - *Answer*: `async` downloads the script in parallel with HTML parsing and executes it as soon as download completes (interrupting HTML parsing). Order is not guaranteed. `defer` downloads in parallel but waits until HTML parsing is fully finished before executing in document order.
- **Q: Why was Strict Mode introduced in ES5?**
  - *Answer*: To catch silent bugs (like accidental globals), enable JS engine optimizations by guaranteeing scope rules, and forbid legacy features (like `with` or octal literals).

---

## 10. Practice Questions
1. Where should `<script defer>` tags ideally be placed in HTML?
2. What happens when you reassign an undeclared variable in strict mode vs non-strict mode?
3. Are ES6 modules strict by default?

---

## 11. Key Takeaways
- Use `<script defer>` for external scripts to avoid blocking HTML document rendering.
- `"use strict"` turns silent errors (like assigning undeclared variables) into throwing `ReferenceError`s.
- Always place `"use strict"` at the very top of a script or function body.
- ES6 modules implicitly run in strict mode.
