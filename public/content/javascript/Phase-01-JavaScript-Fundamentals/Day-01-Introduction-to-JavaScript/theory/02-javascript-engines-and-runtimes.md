# JavaScript Engines & Runtime Environments

## 1. What is it?
A **JavaScript Engine** is a software program or execution pipeline that converts human-readable JavaScript code into machine code that a computer's CPU can execute.

A **JavaScript Runtime Environment** is the hosting environment (such as Google Chrome, Firefox, Node.js, Deno, or Bun) that provides the engine with host APIs (like the DOM, `fetch`, or filesystem access) and an event loop mechanism.

---

## 2. Why does it exist?
Computers cannot understand raw JavaScript text (`"console.log('hello')"`); CPUs only understand binary machine code (`01010101`).

JavaScript engines bridge this gap. Modern engines use **Just-In-Time (JIT) compilation** to parse, interpret, and compile JavaScript code on the fly at blazing fast speeds.

---

## 3. Major JavaScript Engines

| Engine | Developed By | Primary Usage Environment |
| :--- | :--- | :--- |
| **V8** | Google | Google Chrome, Node.js, Deno, Brave, Electron |
| **SpiderMonkey** | Mozilla | Mozilla Firefox |
| **JavaScriptCore (JSC)** | Apple | Safari, iOS apps, Bun runtime |
| **Chakra** | Microsoft (Historical) | Internet Explorer & legacy Edge (Now replaced by V8) |

---

## 4. Engine Architecture & Execution Steps

```text
JS Source Code ➔ Parser ➔ Abstract Syntax Tree (AST) ➔ Interpreter (Bytecode) ➔ JIT Compiler ➔ Native Machine Code
```

1. **Parsing**: Code is converted into Tokens and structured into an **Abstract Syntax Tree (AST)**.
2. **Interpretation**: The interpreter (e.g., V8's *Ignition*) reads the AST and generates unoptimized **bytecode** for instant startup.
3. **Profiling**: The profiler watches which functions run frequently ("hot functions").
4. **JIT Compilation**: The optimizing compiler (e.g., V8's *TurboFan*) converts hot bytecode into native **machine code**.

---

## 5. JavaScript Language vs Host Web APIs

```text
🔥 Must Know: JavaScript Language != Web APIs
```

- **JavaScript Core Language**: Data types, variables, loops, functions, objects, arrays, Promises (defined by ECMAScript).
- **Browser Web APIs**: `document` (DOM), `window`, `fetch()`, `setTimeout()`, `localStorage` (provided by the Browser Runtime).
- **Node.js APIs**: `fs` (Filesystem), `http` server, `path`, `process` (provided by the Node.js C++ Runtime).

---

## 6. Code Example

```javascript
// Pure ECMAScript core language feature (Works everywhere: Browser, Node, Deno, Bun)
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// Browser Web API (Fails in Node.js with ReferenceError!)
// document.getElementById("title").innerText = "Hello";

// Node.js API (Fails in Browser with ReferenceError!)
// const fs = require('fs');
```

---

## 7. Common Mistakes

```text
⚠️ JavaScript Gotcha: Assuming window or document exists in Node.js
```

### Problem Code:
```javascript
// Running this in Node.js
console.log(window.innerWidth);
```

### Error:
`ReferenceError: window is not defined`

---

## 8. Edge Cases
- **De-optimization**: If a JIT compiler optimizes code based on type assumptions (e.g., assuming a function parameter is always a number) and you pass a string, the engine must "de-optimize" back to bytecode, causing a minor performance penalty.

---

## 9. Interview Perspective

### 🧠 Deep Concept Interview Questions
- **Q: Is JavaScript compiled or interpreted?**
  - *Answer*: Technically both! Modern JavaScript engines use a JIT (Just-In-Time) compiler architecture. They interpret bytecode for immediate execution and compile heavily executed bytecode into machine code at runtime.

---

## 10. Practice Questions
1. Which JavaScript engine powers Google Chrome and Node.js?
2. Which JavaScript engine powers Safari and Bun?
3. What is the role of an Abstract Syntax Tree (AST)?

---

## 11. Key Takeaways
- V8 (Chrome/Node), SpiderMonkey (Firefox), and JSC (Safari/Bun) are the leading JS engines.
- JIT compilers combine interpreter fast startup with compiler optimization.
- JavaScript core syntax is defined by ECMAScript, while host runtimes supply extra APIs (Web APIs vs Node APIs).
