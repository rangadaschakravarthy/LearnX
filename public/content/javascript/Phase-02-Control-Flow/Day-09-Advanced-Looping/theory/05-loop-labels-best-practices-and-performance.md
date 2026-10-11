# 05 — Loop Labels, Best Practices, and Performance

## 1. What is this?
JavaScript provides labeled statements (`labelName: statement`) allowing `break` and `continue` to target specific outer nested loops. In addition, choosing the right loop construct (`for`, `for...of`, `for...in`, `forEach`, `while`) has performance and readability implications.

## 2. Why does it exist?
When working with deeply nested iteration (e.g., matrix searching, nested tree navigation), breaking out of only the innermost loop often requires additional boolean flags or guard variables. Labeled loops allow direct termination or continuation of outer loop iterations. Furthermore, understanding the performance trade-offs prevents writing slow, memory-inefficient iteration code.

## 3. Basic Syntax & Grammar Rules
```javascript
// Labeled Loop Syntax
outerLoop: for (let i = 0; i < outerLen; i++) {
  innerLoop: for (let j = 0; j < innerLen; j++) {
    if (condition) {
      break outerLoop; // Breaks directly out of outerLoop
      // or continue outerLoop; // Skips to next iteration of outerLoop
    }
  }
}
```

## 4. Simple Starter Example
```javascript
// Searching for a target in a 2D matrix
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
const target = 5;
let foundRow = -1;
let foundCol = -1;

searchMatrix: for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[r].length; c++) {
    if (matrix[r][c] === target) {
      foundRow = r;
      foundCol = c;
      break searchMatrix; // Terminate both inner and outer loops immediately
    }
  }
}

console.log(`Found target ${target} at matrix[${foundRow}][${foundCol}]`);
// Output: Found target 5 at matrix[1][1]
```

## 5. Code Execution Trace & Mental Model

| Step | Outer `r` | Inner `c` | Value `matrix[r][c]` | Action |
|------|-----------|-----------|----------------------|--------|
| 1 | 0 | 0 | 1 | No match |
| 2 | 0 | 1 | 2 | No match |
| 3 | 0 | 2 | 3 | No match |
| 4 | 1 | 0 | 4 | No match |
| 5 | 1 | 1 | 5 | Match! Sets `foundRow=1`, `foundCol=1`. `break searchMatrix` triggers, immediately jumping out of `r` loop entirely. |

## 6. More Examples & Common Patterns

### Skipping Outer Iteration with Labeled `continue`
```javascript
const userGroups = [
  ['alice', 'bob'],
  ['admin', 'bannedUser', 'charlie'],
  ['david', 'eve']
];

processingGroups: for (let i = 0; i < userGroups.length; i++) {
  const group = userGroups[i];
  for (let j = 0; j < group.length; j++) {
    if (group[j] === 'bannedUser') {
      console.log(`Group ${i} contains a banned user! Skipping entire group.`);
      continue processingGroups; // Immediately skip remaining users and move to next group
    }
    console.log(`Processing valid user: ${group[j]}`);
  }
}
```

### Loop Performance Matrix
1. **Traditional `for` loop**: Fastest performance, zero allocation, easily optimized by V8 runtime compiler.
2. **`while` / `do-while`**: Equal to `for` loop in raw execution performance.
3. **`for...of`**: Very clean, readable, works with any iterable. Slightly slower than classic `for` loop due to iterator object creation.
4. **`for...in`**: Slowest loop construct in JS! Searches prototype chain. Avoid for arrays or hot loops.

## 7. Common Pitfalls & Anti-Patterns

### Anti-Pattern 1: Overusing Labeled Statements
```javascript
// BAD: Spaghetti logic using labels like goto statements
step1: {
  if (x > 10) break step1;
  step2: {
    if (y < 5) break step2;
  }
}

// GOOD: Refactor nested logic into functions with early returns
function validateInput(x, y) {
  if (x > 10) return false;
  if (y < 5) return false;
  return true;
}
```

### Anti-Pattern 2: Modifying Array Length During Iteration
```javascript
const numbers = [1, 2, 3, 4, 5];
// BAD: Mutating length during `for` loop leads to skipped items or out-of-bounds access
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    numbers.splice(i, 1); // Mutates original array index offset!
  }
}
```

## 8. Edge Cases & Modern JavaScript Gotchas
- **Label Names vs Identifiers**: Label names live in a separate namespace from variables. However, using variable names as labels (e.g., `i: for (...)`) causes high developer confusion.
- **Labels outside loops**: Labels can technically wrap any statement block (`myBlock: { ... break myBlock; }`), but this pattern is strongly discouraged in modern code.
- **V8 JIT Inlining**: Complex labeled jump structures can hinder JS engine optimization (JIT inlining). Refactoring to helper functions with `return` statement is almost always cleaner and faster.

## 9. Interview & Problem-Solving Perspective
- **Interview Question**: "How do you escape an outer loop from inside a nested loop without using flags?"
  - *Answer*: Use a labeled loop (`outer: for (...) { break outer; }`), or extract the nested loops into a helper function and call `return`.
- **Code Review Standard**: Prefer helper functions with `return` over complex loop labels in production code.

## 10. Practice Exercises & Self-Check
1. Write a nested loop that searches a 3D grid for a specific number and breaks out of all 3 loops when found.
2. Refactor a 2D matrix search using a helper function and `return` to compare readability against a labeled loop.

## 11. Summary & Key Takeaways
- Labeled statements (`label: statement`) allow targeted `break` and `continue` actions across multi-level nested loops.
- Overusing labels leads to unreadable code ("goto" style programming). Extracting logic into functions with `return` is preferred.
- For maximum performance in critical code, use standard `for` loops. Avoid `for...in` on arrays.
