# Closure Architecture & Memory Map

## 1. What is a Closure?

A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding **lexical environment**.

```text
  +-------------------------------------------------------+
  |              CLOSURE MEMORY CONTAINER                 |
  |                                                       |
  |   1. Inner Function Reference                         |
  |      function inner() { count++; return count; }      |
  |                                                       |
  |   2. Retained Outer Lexical Environment               |
  |      { count: 0 }  <-- Preserved in Heap Memory!      |
  +-------------------------------------------------------+
```

---

## 2. Execution Step-by-Step Visualization

```javascript
function createCounter() {
  let count = 0; // Heap allocated scope environment
  return function increment() {
    count++;
    return count;
  };
}

const myCounter = createCounter();
```

### Memory Lifecycle:
```text
1. Call createCounter()
   - Execution Context created on Call Stack.
   - Lexical Environment created: { count: 0 }.
   - Function `increment` created with [[Environment]] slot pointing to { count: 0 }.
   - createCounter() finishes & pops off Call Stack.

2. Normally, local variables are Garbage Collected after function return.
   BUT `increment` is assigned to `myCounter` in Global Scope!

3. Call myCounter() -> invokes `increment()`
   - New Execution Context created.
   - Scope Chain: Local Scope -> Retained Closure Environment { count: 0 } -> Global Scope.
   - Mutates `count` to 1.
   - Output: 1.
```

---

## 3. Multiple Closure Instances (Independent Environments)

```javascript
const counterA = createCounter(); // Heap Closure Env A: { count: 0 }
const counterB = createCounter(); // Heap Closure Env B: { count: 0 }

counterA(); // Returns 1 (Env A: { count: 1 })
counterA(); // Returns 2 (Env A: { count: 2 })
counterB(); // Returns 1 (Env B: { count: 1 } - Independent!)
```
