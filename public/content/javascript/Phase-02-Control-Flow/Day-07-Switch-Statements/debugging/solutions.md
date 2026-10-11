# Day 07 Debugging Solutions

### Problem 1: Accidental Fall-Through
```javascript
// FIX: Add break; statements to prevent unintended string concatenation
function getLevelDescription(level) {
  let result = "";
  switch (level) {
    case 1:
      result = "Beginner";
      break;
    case 2:
      result = "Intermediate";
      break;
    case 3:
      result = "Advanced";
      break;
  }
  return result;
}
```

---

### Problem 2: Type Coercion Misunderstanding
```javascript
// FIX: Convert input code to Number or match string "200"
function checkStatus(code) {
  switch (Number(code)) {
    case 200:
      return "OK";
    default:
      return "Unknown";
  }
}
```
