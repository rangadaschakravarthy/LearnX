# Common DOM Mistakes & Diagnostic Guide

Avoid these 15 frequent pitfalls when writing Vanilla JavaScript for browsers.

---

### 1. Script Execution Before DOM Element Creation
- **Mistake**: Placing `<script src="app.js"></script>` in `<head>` without `defer`.
- **Symptom**: `TypeError: Cannot read properties of null (reading 'addEventListener')`.
- **Fix**: Add `defer` attribute or place script right before closing `</body>`.

### 2. Using `innerHTML` for Unauthenticated User Text (XSS Risk)
- **Mistake**: Setting `element.innerHTML = userInput`.
- **Symptom**: Vulnerability to Cross-Site Scripting (XSS) code injection attacks.
- **Fix**: Use `element.textContent = userInput` for plain text.

### 3. Confusion Between `event.target` and `event.currentTarget`
- **Mistake**: Assuming `e.target` is always the element holding `addEventListener`.
- **Symptom**: Reading properties from nested `<span>` or `<svg>` inside a button instead of the button itself.
- **Fix**: Use `e.currentTarget` for the container holding the listener, or use `e.target.closest("button")`.

### 4. Forgetting `e.preventDefault()` on Form Submission
- **Mistake**: Attaching a form submit listener without invoking `e.preventDefault()`.
- **Symptom**: Page reloads instantly and clears JavaScript state.
- **Fix**: Call `e.preventDefault()` at the start of the submit handler function.

### 5. Storing Objects Directly in `localStorage` Without JSON Serialization
- **Mistake**: Executing `localStorage.setItem("user", userObj)`.
- **Symptom**: Storage value becomes `"[object Object]"`.
- **Fix**: Serialize objects with `JSON.stringify(userObj)` and parse with `JSON.parse(storedString)`.

### 6. Memory Leaks from Uncleaned Timers
- **Mistake**: Starting `setInterval` without saving its ID or clearing it on component unmount/removal.
- **Symptom**: Timers continue firing repeatedly in background consuming memory and CPU.
- **Fix**: Store timer ID in variable and call `clearInterval(timerId)` when finished.

### 7. Attaching Duplicate Event Listeners Inside Loops or Render Functions
- **Mistake**: Calling `addEventListener` repeatedly inside a state render loop.
- **Symptom**: Event callback fires multiple times per single click event.
- **Fix**: Use Event Delegation on a static parent container, or remove existing listeners before adding.
