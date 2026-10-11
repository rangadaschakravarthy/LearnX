# Recursion Call Stack Map & Unwinding Visualizer

## 1. Call Stack Execution Mechanics

Recursion consists of two phases:
1. **Winding Phase (Stack Pushing)**: Building up call stack frames until the base case condition is met.
2. **Unwinding Phase (Stack Popping & Evaluation)**: Resolving returned values back up the call chain.

---

## 2. Execution Trace: `factorial(4)`

```javascript
function factorial(n) {
  if (n <= 1) return 1; // Base Case
  return n * factorial(n - 1); // Recursive Step
}

const result = factorial(4);
```

### Winding Phase (Building Stack Frames):

```text
[TOP OF STACK]
| factorial(1) -> Base Case reached! Returns 1 |
| factorial(2) -> waiting for factorial(1)     |
| factorial(3) -> waiting for factorial(2)     |
| factorial(4) -> waiting for factorial(3)     |
| Global Execution Context                     |
+----------------------------------------------+
```

### Unwinding Phase (Popping Stack & Computing):

```text
Step 1: factorial(1) returns 1
Step 2: factorial(2) receives 1 -> computes 2 * 1 = 2 -> pops stack
Step 3: factorial(3) receives 2 -> computes 3 * 2 = 6 -> pops stack
Step 4: factorial(4) receives 6 -> computes 4 * 6 = 24 -> pops stack

Final Output: 24
```
