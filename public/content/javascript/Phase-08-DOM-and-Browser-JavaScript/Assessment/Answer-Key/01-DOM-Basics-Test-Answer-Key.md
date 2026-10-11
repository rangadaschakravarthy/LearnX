# Answer Key: 01-DOM-Basics-Test

### Section 1 Answer
1. **B** - `querySelector` returns the first matching Element node or `null`.

### Section 2 Solution
```javascript
const btn = document.getElementById("btn");
const box = document.getElementById("box");
if (btn && box) {
    btn.addEventListener("click", () => box.classList.toggle("active"));
}
```
