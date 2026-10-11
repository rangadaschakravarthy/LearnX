# Phase 8: Selection & Timing Debugging Exercises

### Bug 1: Script Loading Order Null Element Exception
```html
<head>
    <script src="app.js"></script>
</head>
<body>
    <button id="btn">Click</button>
</body>
```
```javascript
// app.js
document.getElementById("btn").addEventListener("click", () => console.log("OK"));
```
**Problem**: Uncaught TypeError: Cannot read properties of null (reading 'addEventListener').
**Fix**: Add `defer` to `<script>` tag.
