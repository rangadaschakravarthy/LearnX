# Nested Loops, Pattern Printing & Off-by-One Errors

## 1. What is it?
- **Nested Loop**: A loop statement placed inside the body of another loop.
- **Pattern Printing**: Using nested outer/inner loop iterations to construct 2D geometric shapes (triangles, grids, pyramids) in output terminals.
- **Off-by-One Error**: A boundary bug where a loop iterates one time too many or one time too few due to incorrect comparison operators (`<` vs `<=`).

---

## 2. Nested Loop Mechanics & Execution Order

```javascript
for (let row = 1; row <= 3; row++) {
  // Outer Loop (Rows)
  console.log(`--- Row ${row} ---`);
  
  for (let col = 1; col <= 2; col++) {
    // Inner Loop (Columns)
    console.log(`  Col ${col}`);
  }
}
```

```text
Total Iterations = Outer Iterations (3) * Inner Iterations (2) = 6 Total Inner Executions!
```

---

## 3. Pattern Printing Logic Breakdown

### Pattern 1: Right-Angled Star Triangle
```text
*
**
***
****
```

```javascript
const rows = 4;

for (let i = 1; i <= rows; i++) {
  let line = "";
  for (let j = 1; j <= i; j++) {
    line += "*";
  }
  console.log(line);
}
```

### Explanation:
- Outer loop `i` controls the **row number** (1 to 4).
- Inner loop `j` controls the number of stars per row (runs `i` times per row).

---

## 4. Off-by-One Error Analysis (`<` vs `<=`)

```text
🔥 Off-by-One Trap:
Iterating over a 5-element 0-indexed array [10, 20, 30, 40, 50]:
Valid indices: 0, 1, 2, 3, 4 (Total length: 5)
```

```javascript
const arr = [10, 20, 30, 40, 50];

// ❌ OFF-BY-ONE BUG: i <= arr.length attempts to read index 5 (undefined)!
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]); // Prints 10, 20, 30, 40, 50, UNDEFINED!
}

// ✅ CORRECT: i < arr.length
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // Prints 10, 20, 30, 40, 50
}
```

---

## 5. Step-by-Step Pyramid Logic

```text
    *       Row 1: 3 Spaces, 1 Star
   ***      Row 2: 2 Spaces, 3 Stars
  *****     Row 3: 1 Space,  5 Stars
 *******    Row 4: 0 Spaces, 7 Stars
```

```javascript
const n = 4;
for (let i = 1; i <= n; i++) {
  let str = " ".repeat(n - i) + "*".repeat(2 * i - 1);
  console.log(str);
}
```

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Reusing the same counter variable name in nested loops
```

```javascript
// ❌ BUG: Using 'i' for both outer and inner loops!
for (let i = 0; i < 3; i++) {
  for (let i = 0; i < 3; i++) { // Overwrites outer i!
    console.log(i);
  }
}
```

---

## 7. Edge Cases
- When nesting loops, time complexity increases exponentially ($O(N \times M)$ or $O(N^2)$ for 2D grids). Keep loop nests shallow!

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: How many times does the inner loop body execute in a nested `for` loop where outer runs $N$ times and inner runs $M$ times?**
  - *Answer*: $N \times M$ total executions. If both run $N$ times, total executions equal $N^2$.

---

## 9. Practice Questions
1. How do you print a $3 \times 3$ grid of numbers using nested loops?
2. Why does `i <= arr.length` cause an off-by-one error when iterating arrays?
3. What is the relationship between the outer loop counter and the number of inner loop iterations in a triangular star pattern?

---

## 10. Key Takeaways
- Outer loop manages rows/levels; inner loop manages columns/elements per level.
- Total inner executions = Outer count $\times$ Inner count ($O(N^2)$ for square grids).
- Use `i < length` for 0-indexed arrays to eliminate off-by-one errors.
- Never reuse the same iterator variable name (`i`) in nested loops.
