# Day 62 — Symbols & Well-Known Symbols — Detailed Theory

Welcome to **Day 62** of the JavaScript Mastery curriculum. **`Symbol`** is a unique primitive data type introduced in ES6. Symbols are guaranteed to be unique and immutable, making them ideal for creating collision-free object property keys and hooks into core language behaviors via **Well-Known Symbols**.

This guide provides an exhaustive theoretical foundation covering `Symbol()` instantiation, Global Symbol Registry (`Symbol.for`), Property Key Visibility, and Well-Known Symbols (`Symbol.toPrimitive`, `Symbol.iterator`, `Symbol.toStringTag`).

---

## 1. The `Symbol` Primitive Type

A Symbol is created by calling the `Symbol()` factory function. Every created Symbol is **guaranteed to be unique**, even if created with the exact same description string!

```javascript
const sym1 = Symbol("id");
const sym2 = Symbol("id");

console.log(typeof sym1); // "symbol"
console.log(sym1 === sym2); // false !! (Guaranteed 100% unique memory identity)
```

> [!WARNING]
> `Symbol` is a primitive function, NOT a constructor. Calling `new Symbol()` throws a `TypeError: Symbol is not a constructor`.

---

## 2. Using Symbols for Non-Colliding Object Properties

Because Symbols are unique non-string keys, they prevent third-party libraries or internal modules from accidentally overwriting object properties (preventing property name collision):

```javascript
const idSymbol = Symbol("id");

const user = {
  name: "Alice",
  [idSymbol]: 1001 // Symbol property key
};

console.log(user[idSymbol]); // 1001

// Hidden from standard object property enumeration loops!
console.log(Object.keys(user)); // ["name"] (Symbol key hidden!)
for (const key in user) {
  console.log(key); // Logs ONLY "name"
}

// Accessing Symbol Keys:
console.log(Object.getOwnPropertySymbols(user)); // [ Symbol(id) ]
console.log(Reflect.ownKeys(user)); // ["name", Symbol(id)] (Returns BOTH String and Symbol keys)
```

---

## 3. Global Symbol Registry (`Symbol.for` and `Symbol.keyFor`)

To share Symbols across different files, modules, or iframe execution contexts, use the **Global Symbol Registry**:

* **`Symbol.for(key)`**: Searches the global registry for a Symbol registered under string `key`. If found, returns it; if not found, creates a new global Symbol and registers it under `key`.
* **`Symbol.keyFor(sym)`**: Retrieves the string key associated with a global Symbol.

```javascript
// Creates or retrieves global symbol registered under "app.user.id"
const globalSym1 = Symbol.for("app.user.id");
const globalSym2 = Symbol.for("app.user.id");

console.log(globalSym1 === globalSym2); // true! (Identical global symbol reference)

console.log(Symbol.keyFor(globalSym1)); // "app.user.id"
```

---

## 4. Deep Dive: Well-Known Symbols

**Well-Known Symbols** are built-in static properties on the `Symbol` constructor (`Symbol.iterator`, `Symbol.toPrimitive`, etc.) used by JavaScript internal algorithms to customize object behavior.

### 4.1 `Symbol.toPrimitive` (Custom Object Coercion)

`Symbol.toPrimitive` customizes how an object is coerced into a primitive when participating in operations like `+`, `-`, or string interpolation:

```javascript
const money = {
  amount: 500,
  currency: "USD",

  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.amount; // Coercion for math (+money, money - 50)
    }
    if (hint === "string") {
      return `${this.amount} ${this.currency}`; // Coercion for strings
    }
    return this.amount; // Default hint (e.g. money + 10)
  }
};

console.log(+money);             // 500 (Hint: "number")
console.log(`${money}`);         // "500 USD" (Hint: "string")
console.log(money + 100);        // 600 (Hint: "default")
```

---

### 4.2 `Symbol.toStringTag` (Customizing `Object.prototype.toString`)

`Symbol.toStringTag` overrides the default `"[object Object]"` tag returned by `Object.prototype.toString.call(obj)`:

```javascript
class CustomAPIResponse {
  get [Symbol.toStringTag]() {
    return "APIResponse";
  }
}

const res = new CustomAPIResponse();
console.log(Object.prototype.toString.call(res)); // "[object APIResponse]"
```

---

### 4.3 `Symbol.hasInstance` (Customizing `instanceof`)

`Symbol.hasInstance` allows an object to customize the behavior of the `instanceof` operator:

```javascript
const EvenNumber = {
  [Symbol.hasInstance](instance) {
    return typeof instance === "number" && instance % 2 === 0;
  }
};

console.log(4 instanceof EvenNumber); // true
console.log(5 instanceof EvenNumber); // false
```

---

## 5. Minor Points, Quirks & Traps

### 1. Symbols Are NOT Auto-Coerced to Strings
Attempting to concatenate a Symbol with a string throws a `TypeError: Cannot convert a Symbol value to a string`. Explicitly convert using `String(sym)` or `sym.toString()`!

```javascript
const sym = Symbol("test");
// console.log("Symbol is: " + sym); // TypeError!
console.log("Symbol is: " + String(sym)); // "Symbol is: Symbol(test)"
```

---

## 6. Senior Interview Questions & Answers

### Q1: What are Symbols in JavaScript and why were they introduced in ES6?
* **Answer**: Symbols are a unique, immutable primitive data type introduced in ES6. They were created primarily for two reasons:
  1. To allow developers and libraries to create non-string object property keys that are guaranteed never to collide with existing or future string keys (avoiding property name collisions).
  2. To provide internal language extension hooks through **Well-Known Symbols** (e.g., `Symbol.iterator`, `Symbol.toPrimitive`, `Symbol.hasInstance`), allowing developers to customize core engine behaviors on custom objects.

---

## 7. Summary & Key Takeaways

1. **Primitive & Unique**: `Symbol("desc")` creates a 100% unique primitive property key.
2. **Registry**: Use `Symbol.for("key")` for cross-module shared global symbols.
3. **Hidden Enumeration**: Symbol keys are hidden from `Object.keys()` and `for...in`; access via `Reflect.ownKeys()`.
4. **Well-Known Symbols**: Override core engine mechanics using `Symbol.toPrimitive`, `Symbol.iterator`, and `Symbol.toStringTag`.
