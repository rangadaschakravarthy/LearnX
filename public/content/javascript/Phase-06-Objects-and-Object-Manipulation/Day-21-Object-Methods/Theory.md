# Day 21 — Object Methods & Immutability Controls — Detailed Theory

Welcome to **Day 21** of the JavaScript Mastery curriculum. Beyond basic property access, the static `Object` API provides reflection methods (`Object.keys`, `values`, `entries`, `fromEntries`) and granular **Immutability Controls** (`preventExtensions`, `seal`, `freeze`).

This guide provides an exhaustive theoretical foundation covering static object utility functions, dictionary transformations, property verification via `Object.hasOwn()`, and the three levels of object immutability.

---

## 1. Object Reflection & Dictionary Transformation Methods

JavaScript provides four primary static methods for inspecting and transforming objects into key-value iteration structures:

```javascript
const user = { id: 101, name: "Alice", role: "Developer" };

// 1. Object.keys(obj) -> Returns array of own enumerable string keys
console.log(Object.keys(user)); // ["id", "name", "role"]

// 2. Object.values(obj) -> Returns array of own enumerable values
console.log(Object.values(user)); // [101, "Alice", "Developer"]

// 3. Object.entries(obj) -> Returns array of [key, value] tuples
console.log(Object.entries(user));
// [["id", 101], ["name", "Alice"], ["role", "Developer"]]

// 4. Object.fromEntries(entries) (ES2019) -> Transforms key-value tuples back into an Object!
const tuples = [["a", 1], ["b", 2]];
const reconstructed = Object.fromEntries(tuples);
console.log(reconstructed); // { a: 1, b: 2 }
```

### High-Utility Transformation Pattern: Mapping Object Values
`Object.entries()` and `Object.fromEntries()` allow you to process objects using array higher-order methods (`map`, `filter`, `reduce`):

```javascript
const prices = { apple: 1.5, banana: 0.8, cherry: 3.0 };

// Double all prices in the object cleanly
const doubledPrices = Object.fromEntries(
  Object.entries(prices).map(([item, price]) => [item, price * 2])
);

console.log(doubledPrices); // { apple: 3.0, banana: 1.6, cherry: 6.0 }
```

---

## 2. Safe Property Inspection: `Object.hasOwn()` (ES2022)

Before ES2022, developers verified own properties using `obj.hasOwnProperty("key")`. However, this was unsafe:
1. `Object.create(null)` creates an object without a prototype (`hasOwnProperty` is `undefined`).
2. An object property can shadow `hasOwnProperty`: `{ hasOwnProperty: false }`.

```javascript
// The Legacy Unsafe Way:
const nullObj = Object.create(null);
// nullObj.hasOwnProperty("foo"); // TypeError: nullObj.hasOwnProperty is not a function!

// Modern Safe Standard: Object.hasOwn(obj, prop) (ES2022)
console.log(Object.hasOwn(nullObj, "foo")); // false (Safe!)

const shadowed = { hasOwnProperty: () => false, validKey: true };
console.log(Object.hasOwn(shadowed, "validKey")); // true (Safe!)
```

---

## 3. Object Immutability Controls Matrix

JavaScript provides three progressive levels of object immutability enforcement:

```
                     ┌─────────────────────────────────────────┐
                     │     Object Immutability Levels          │
                     └────────────────────┬────────────────────┘
                                          │
    ┌─────────────────────────────────────┼─────────────────────────────────────┐
    ▼                                     ▼                                     ▼
LEVEL 1: preventExtensions()          LEVEL 2: seal()                       LEVEL 3: freeze()
- Cannot add NEW properties           - Cannot add NEW properties           - Cannot add NEW properties
- CAN delete existing properties     - Cannot DELETE existing properties   - Cannot DELETE existing properties
- CAN modify existing values         - CAN modify existing values          - CANNOT modify existing values
```

### Feature Comparison Matrix

| Operation | Standard Object | `Object.preventExtensions()` | `Object.seal()` | `Object.freeze()` |
| :--- | :--- | :--- | :--- | :--- |
| **Add New Property** | Allowed | ❌ **Forbidden** | ❌ **Forbidden** | ❌ **Forbidden** |
| **Delete Property** | Allowed | Allowed | ❌ **Forbidden** | ❌ **Forbidden** |
| **Modify Existing Value**| Allowed | Allowed | Allowed | ❌ **Forbidden** |
| **Reconfigure Descriptor**| Allowed | Allowed | ❌ **Forbidden** | ❌ **Forbidden** |
| **State Checker Method**| `isExtensible()` (true) | `isExtensible()` (false) | `isSealed()` (true) | `isFrozen()` (true) |

---

## 4. Execution Examples of Immutability Levels

### Level 1: `Object.preventExtensions()`

```javascript
const obj1 = { a: 1 };
Object.preventExtensions(obj1);

obj1.b = 2; // Silently fails (or throws TypeError in strict mode)
delete obj1.a; // Works!
console.log(obj1); // {} (Property 'a' was deleted)
```

### Level 2: `Object.seal()`

```javascript
const obj2 = { a: 1 };
Object.seal(obj2);

obj2.b = 2;   // Forbidden! (Cannot add)
delete obj2.a; // Forbidden! (Cannot delete)
obj2.a = 999;  // Allowed! (Existing values can still be mutated)
console.log(obj2.a); // 999
```

### Level 3: `Object.freeze()`

```javascript
const obj3 = { a: 1 };
Object.freeze(obj3);

obj3.b = 2;   // Forbidden!
delete obj3.a; // Forbidden!
obj3.a = 999;  // Forbidden! (Existing value cannot be mutated)
console.log(obj3.a); // 1 (Original value preserved intact)
```

---

## 5. The Shallow Freeze Limitation & `deepFreeze()` Utility

> [!WARNING]
> `Object.freeze()` is **SHALLOW**. Nested objects inside a frozen object remain completely mutable!

```javascript
const config = Object.freeze({
  env: "production",
  db: {
    host: "localhost" // Nested object!
  }
});

config.env = "staging"; // Blocked!
config.db.host = "HACKED_HOST"; // MUTATED! ('db' nested object was not frozen!)
console.log(config.db.host); // "HACKED_HOST"
```

### Custom `deepFreeze()` Implementation
To make an object fully immutable at all nesting levels, write a recursive `deepFreeze()` function:

```javascript
function deepFreeze(obj) {
  // Retrieve own property names
  const propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = obj[name];
    if (value && typeof value === "object") {
      deepFreeze(value); // Recursive call for nested objects
    }
  }

  return Object.freeze(obj);
}

const secureConfig = deepFreeze({
  env: "production",
  db: { host: "localhost" }
});

secureConfig.db.host = "HACKED"; // Blocked cleanly!
console.log(secureConfig.db.host); // "localhost"
```

---

## 6. Minor Points, Quirks & Traps

### 1. `Object.assign()` Triggers Getters & Setters
When merging objects with `Object.assign(target, source)`, JavaScript invokes getter functions on `source` and setter functions on `target`. It copies computed *values*, not descriptor functions!

### 2. Freezing Arrays
`Object.freeze()` works on Arrays as well, preventing element modification, `push()`, `pop()`, or length resizes:

```javascript
const immutableList = Object.freeze([1, 2, 3]);
// immutableList.push(4); // TypeError: Cannot add property 3, object is not extensible
```

---

## 7. Senior Interview Questions & Answers

### Q1: What is the difference between `Object.seal()` and `Object.freeze()`?
* **Answer**: `Object.seal()` sets `configurable: false` on all own properties, preventing new property additions or property deletions, but still allows existing `writable: true` property values to be modified. `Object.freeze()` sets BOTH `configurable: false` AND `writable: false` on all own properties, preventing property additions, deletions, AND value mutations.

### Q2: Why is `Object.hasOwn(obj, prop)` preferred over `obj.hasOwnProperty(prop)` in modern code bases?
* **Answer**: `obj.hasOwnProperty()` fails if `obj` is created via `Object.create(null)` (which lacks `Object.prototype`) or if `hasOwnProperty` is shadowed as an own property key on `obj`. `Object.hasOwn()` is a robust static method on `Object` that works safely on all objects regardless of prototype inheritance or property shadowing.

---

## 8. Summary & Key Takeaways

1. **Reflection Utilities**: Use `Object.keys()`, `values()`, `entries()`, and `fromEntries()` for dictionary transformations.
2. **Property Checking**: Always use `Object.hasOwn(obj, prop)` (ES2022) for safe property checks.
3. **Immutability Levels**: `preventExtensions` (no additions) < `seal` (no additions/deletions) < `freeze` (read-only).
4. **Shallow Immutability**: Built-in immutability methods are shallow; use custom `deepFreeze()` for nested objects.
