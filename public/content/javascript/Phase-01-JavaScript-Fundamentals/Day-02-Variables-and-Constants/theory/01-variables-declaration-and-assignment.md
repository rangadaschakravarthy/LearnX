# Variable Lifecycle: Declaration, Initialization & Assignment

## 1. What is it?
A **variable** is a named container in computer memory used to store data values that can be accessed, referenced, or modified throughout a program.

The lifecycle of a variable consists of four primary stages:
1. **Declaration**: Introducing an identifier name into a scope.
2. **Initialization**: Allocating memory space and binding an initial value (or default `undefined`).
3. **Assignment**: Storing a specific data value into the variable.
4. **Reassignment**: Replacing the existing stored value with a new value.

---

## 2. Why does it exist?
Without variables, programs would have no way to retain dynamic state, store user input, calculate intermediate math expressions, or reuse data across functions.

---

## 3. Syntax & Terminology

```javascript
// 1. Declaration (Introducing identifier 'score')
let score;

// 2. Initialization & Assignment (Setting value 100 for the first time)
score = 100;

// 3. Declaration + Initialization combined
let age = 25;

// 4. Reassignment (Changing value from 25 to 26)
age = 26;
```

---

## 4. Basic Example

```javascript
let userName = "Alex";
console.log("Initial Name:", userName); // "Alex"

userName = "Alexander"; // Reassignment
console.log("Updated Name:", userName); // "Alexander"
```

---

## 5. Step-by-Step Explanation
1. `let userName = "Alex";`: The JS engine declares the identifier `userName` in the current block scope, allocates memory, and initializes it with the string value `"Alex"`.
2. `userName = "Alexander";`: The engine locates the memory slot for `userName` and overwrites `"Alex"` with `"Alexander"`.

---

## 6. Declaration vs Definition

```text
Declaration: Specifying the name and scope of a variable without necessarily setting a custom value (e.g. `let x;`).
Initialization / Definition: Binding an explicit value to the variable for the first time (e.g. `x = 10;`).
```

---

## 7. Common Mistakes

```text
⚠️ JavaScript Gotcha: Reading uninitialized variables
```

### Problem Code:
```javascript
let userStatus;
console.log(userStatus); // Output: undefined (Not an error!)
```

### Contrast with Undeclared Variable:
```javascript
console.log(nonExistentVar); // ❌ ReferenceError: nonExistentVar is not defined
```

---

## 8. Edge Cases
- Declaring a variable without assigning a value (`let x;`) automatically sets its value to `undefined` during initialization.

---

## 9. Interview Perspective

### 🎯 Interview Focus
- **Q: What is the difference between `undefined` and `not defined` in JavaScript?**
  - *Answer*: `undefined` is a primitive type value assigned to a declared variable that has not yet been initialized with a custom value. `not defined` refers to a runtime `ReferenceError` thrown when code attempts to read an identifier that was never declared in any accessible scope.

---

## 10. Practice Exercises
1. What are the four stages of a variable's lifecycle?
2. What value does a declared `let` variable hold before assignment?
3. Distinguish between variable reassignment and property mutation.

---

## 11. Key Takeaways
- Declaration introduces a variable name into scope.
- Uninitialized declared `let` variables default to `undefined`.
- Accessing undeclared variables throws a `ReferenceError`.
