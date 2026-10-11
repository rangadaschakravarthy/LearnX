# Scope & Scope Chain Map

## 1. Scope Hierarchy Overview

```text
+-------------------------------------------------------------+
| Global Scope                                                |
|  - globalVar = "Earth"                                      |
|                                                             |
|  +-------------------------------------------------------+  |
|  | Function Scope: outer()                               |  |
|  |  - outerVar = "Country"                               |  |
|  |                                                       |  |
|  |  +-------------------------------------------------+  |  |
|  |  | Nested Function Scope: inner()                  |  |  |
|  |  |  - innerVar = "City"                            |  |  |
|  |  |                                                 |  |  |
|  |  |  +-------------------------------------------+  |  |  |
|  |  |  | Block Scope: if (true)                    |  |  |  |
|  |  |  |  - blockVar = "Street"                   |  |  |  |
|  |  |  |                                           |  |  |  |
|  |  |  |  Access: blockVar, innerVar, outerVar,    |  |  |  |
|  |  |  |          globalVar                        |  |  |  |
|  |  |  +-------------------------------------------+  |  |  |
|  |  +-------------------------------------------------+  |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

---

## 2. Variable Lookup Flow (Inside-Out Chain)

When JavaScript encounters a variable reference e.g. `console.log(x)`:

```text
   Step 1: Check Current (Local / Block) Scope
                |
          [Found?] ---> YES ---> Return value & finish
                |
                NO
                v
   Step 2: Walk UP Scope Chain to Parent Scope
                |
          [Found?] ---> YES ---> Return value & finish
                |
                NO
                v
   Step 3: Repeat walking UP until Global Scope
                |
          [Found?] ---> YES ---> Return value & finish
                |
                NO
                v
   Throw ReferenceError: x is not defined
```

---

## 3. Lexical Scope vs Call-Site (Dynamic) Scope

> **Lexical Scope** means scope resolution is determined statically at **authoring time** (where code is written in the source file), NOT where a function is invoked.

```javascript
const user = "Global User";

function logUser() {
  console.log(user); // Resolves statically to global `user`
}

function run() {
  const user = "Local User";
  logUser(); // Invoked here, but STILL prints "Global User"!
}

run(); // Output: "Global User"
```
