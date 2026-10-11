# Day 16 Debugging Exercises

### Bug Scenario 1
```javascript
// Broken Code
const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
    console.log("Clicked");
});
```
**Problem**: Script throws `TypeError: Cannot read properties of null` when loaded in `<head>`.
