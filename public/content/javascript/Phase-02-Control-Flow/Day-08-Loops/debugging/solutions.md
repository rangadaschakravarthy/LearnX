# Day 08 Debugging Solutions

### Problem 1: Infinite Loop Bug
```javascript
// FIX: Increment i inside the while loop body
function countToFive() {
  let i = 1;
  while (i <= 5) {
    console.log(i);
    i++;
  }
}
```

---

### Problem 2: Off-by-One Array Index Bug
```javascript
// FIX: Use i < arr.length instead of i <= arr.length
function printArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
```

---

### Problem 3: `continue` inside `while` Loop Trap
```javascript
// FIX: Increment counter i BEFORE calling continue
function skipThree() {
  let i = 0;
  while (i < 5) {
    i++;
    if (i === 3) continue;
    console.log("Val:", i);
  }
}
```
