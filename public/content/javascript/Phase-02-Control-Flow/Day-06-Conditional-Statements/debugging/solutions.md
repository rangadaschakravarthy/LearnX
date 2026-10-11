# Day 06 Debugging Solutions

### Problem 1: Accidental Assignment
```javascript
// FIX: Replace assignment '=' with strict equality '==='
function checkAdminAccess(role) {
  if (role === "admin") {
    return "Access Granted";
  }
  return "Access Denied";
}
```

---

### Problem 2: Wrong Boundary Check
```javascript
// FIX: Replace '>' with '>=' so age 16 is included
function canDrive(age) {
  if (age >= 16) {
    return "Can drive";
  }
  return "Cannot drive";
}
```

---

### Problem 3: Out of Order `else if` Chain
```javascript
// FIX: Order thresholds from highest to lowest
function getSpeedCategory(speed) {
  if (speed > 80) return "Fast";
  if (speed > 30) return "Moderate";
  return "Slow";
}
```
