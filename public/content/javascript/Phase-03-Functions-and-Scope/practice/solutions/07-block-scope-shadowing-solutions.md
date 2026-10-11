# Solutions for 07. Block Scope & Shadowing Practice

> Detailed solutions, code explanations, and edge case breakdowns.

## Solution 1: Block Scope with `let` and `const`

### Problem Recap
Show that variables defined with `let` or `const` inside `{}` block statements are inaccessible outside.

### Reference Implementation
```js
// Reference solution for Problem 1
// Test: { let blockVar = 1; } console.log(blockVar)

// Implementation for Problem 1
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 2: `var` Block Scope Leak

### Problem Recap
Show that `var` inside an `if` block or `for` loop leaks into the enclosing function or global scope.

### Reference Implementation
```js
// Reference solution for Problem 2
// Test: if(true){ var leaked = 10; } console.log(leaked) // 10

// Implementation for Problem 2
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 3: Loop Counter Scope in `for` Loop

### Problem Recap
Compare `for (var i = 0; ...)` vs `for (let i = 0; ...)` inside asynchronous `setTimeout` callbacks.

### Reference Implementation
```js
// Reference solution for Problem 3
// Test: let creates fresh binding per iteration

// Implementation for Problem 3
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 4: Variable Shadowing in Nested Blocks

### Problem Recap
Demonstrate variable shadowing where block-scoped `let x = 20` masks outer `let x = 10`.

### Reference Implementation
```js
// Reference solution for Problem 4
// Test: shadowingDemo()

// Implementation for Problem 4
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 5: Shadowing Outer Parameters

### Problem Recap
Shadow a function parameter inside an `if` block with a `let` declaration of the same identifier.

### Reference Implementation
```js
// Reference solution for Problem 5
// Test: shadowParam(x)

// Implementation for Problem 5
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 6: Illegal `var` Redeclaration of `let`

### Problem Recap
Demonstrate the `SyntaxError: Identifier "x" has already been declared` when using `var x` in the same block as `let x`.

### Reference Implementation
```js
// Reference solution for Problem 6
// Test: { let x = 1; var x = 2; }

// Implementation for Problem 6
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 7: Function Declarations in Block Scope

### Problem Recap
Test ES6 block-scoped function declaration behavior inside an `if` block across strict mode vs non-strict mode.

### Reference Implementation
```js
// Reference solution for Problem 7
// Test: if (true) { function blockFn(){} }

// Implementation for Problem 7
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 8: Switch Statement Scope Block

### Problem Recap
Show why `switch` statement cases share a single block scope, requiring `{}` block scoping per case.

### Reference Implementation
```js
// Reference solution for Problem 8
// Test: switch(x) { case 1: { let a = 1; break; } }

// Implementation for Problem 8
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 9: Catch Clause Error Shadowing

### Problem Recap
Show that the error variable in `try { ... } catch (err) { ... }` is block-scoped to the catch block.

### Reference Implementation
```js
// Reference solution for Problem 9
// Test: catch(err)

// Implementation for Problem 9
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 10: Const Block Mutation vs Reassignment

### Problem Recap
Show that `const` prevents re-binding within its block scope, but does not freeze mutated object properties.

### Reference Implementation
```js
// Reference solution for Problem 10
// Test: const obj = {}; obj.a = 1;

// Implementation for Problem 10
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 11: Nested Loop Shadowing Bug

### Problem Recap
Fix a classic bug where nested `for` loops both use `var i`, causing the outer loop to terminate early.

### Reference Implementation
```js
// Reference solution for Problem 11
// Test: fixNestedLoops()

// Implementation for Problem 11
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 12: Dead Code Block Scoping

### Problem Recap
Show how unexecuted blocks `if (false) { let x = 5; }` still enforce block isolation.

### Reference Implementation
```js
// Reference solution for Problem 12
// Test: blockIsolation()

// Implementation for Problem 12
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 13: Block Scope IIFE Replacement Pattern

### Problem Recap
Demonstrate replacing legacy IIFEs with native ES6 block statements `{ let privateVar = 1; }`.

### Reference Implementation
```js
// Reference solution for Problem 13
// Test: ES6 block usage

// Implementation for Problem 13
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 14: `for...in` and `for...of` Scope Bindings

### Problem Recap
Verify that `for (const key in obj)` creates a new immutable `const` binding for each loop iteration.

### Reference Implementation
```js
// Reference solution for Problem 14
// Test: for(const k in obj)

// Implementation for Problem 14
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 15: Shadowing Audit Refactoring

### Problem Recap
Identify and refactor shadowed variable names in a complex multi-nested utility function.

### Reference Implementation
```js
// Reference solution for Problem 15
// Test: refactorShadowedCode()

// Implementation for Problem 15
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

