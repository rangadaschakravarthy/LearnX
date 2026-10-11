# Phase 8 Browser Setup & Execution Guide

## Overview
Phase 8 covers Vanilla JavaScript executing inside web browsers. This guide explains how to set up, load, and debug browser JavaScript scripts cleanly.

---

## 1. Connecting JavaScript to HTML

### Option A: Standard Bottom-of-Body Loading (Recommended for Beginners)
Placing the `<script>` tag right before the closing `</body>` tag guarantees that the entire DOM tree is parsed and available before your JavaScript runs:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Web Page</title>
</head>
<body>
    <h1 id="heading">Hello World</h1>

    <!-- Script loaded after DOM elements -->
    <script src="script.js"></script>
</body>
</html>
```

---

### Option B: Head Loading with `defer` (Industry Standard)
The `defer` attribute tells the browser to download the script file in parallel while HTML is parsing, but defer execution until the HTML parsing is complete:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Web Page</title>
    <script src="script.js" defer></script>
</head>
<body>
    <h1 id="heading">Hello World</h1>
</body>
</html>
```

---

### Option C: The `DOMContentLoaded` Event Guard
If a script is loaded in the `<head>` without `defer`, wrap your code inside a `DOMContentLoaded` listener to prevent `TypeError: Cannot read properties of null`:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    const heading = document.getElementById("heading");
    console.log(heading.textContent);
});
```

---

## 2. Running & Testing HTML/JS Files
1. **Direct File Double-Click**: Double-click any `.html` file to open it directly in your web browser (`file://` protocol).
2. **VS Code Live Server (Optional)**: Install the "Live Server" extension in VS Code and click "Go Live" at the bottom right to run a local web server (`http://127.0.0.1:5500`).

---

## 3. Using Browser DevTools
- Press **F12** or **Right-Click -> Inspect** in Google Chrome / Firefox / Edge.
- **Console Panel**: Execute interactive JavaScript statements, view `console.log` output, and inspect JavaScript errors.
- **Elements Panel**: View and live-edit the rendered DOM tree, view applied CSS styles, and inspect event listeners.
- **Sources Panel**: Set breakpoints, pause execution, and step through code line-by-line using the `debugger` statement.
