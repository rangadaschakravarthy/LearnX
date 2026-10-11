# Day 20 — Objects Basics & Property Descriptors — Detailed Theory

Welcome to **Day 20** of the JavaScript Mastery curriculum. **Objects** are the core data structure of JavaScript. Nearly everything in JavaScript—from functions and arrays to instances and built-in APIs—is an object or behaves like an object.

This guide provides an exhaustive theoretical foundation covering Object creation, property access mechanics (Dot vs Bracket), property operations (`delete`, `in`), property iteration ordering, and Property Descriptors (`writable`, `enumerable`, `configurable`).

---

## 1. First-Principles Definition of an Object

An **Object** in JavaScript is an unordered collection of **Key-Value pairs** (called properties).

```javascript
const user = {
  name: "Alice",
  age: 28,
  "account-type": "Premium", // Computed string key
  [Symbol("id")]: 1001       // Symbol key
};
```

### Key Object Principles:
1. **Keys**: Property keys can ONLY be **Strings** or **Symbols**. If a non-string value (like a number or boolean) is used as a property key, JavaScript automatically coerces it to a string.
2. **Values**: Property values can be any valid JavaScript type (primitives, functions, arrays, or nested objects).
3. **Reference Memory**: Objects are allocated on the **Memory Heap** and accessed via memory pointers.

---

## 2. Object Creation Patterns

```javascript
// 1. Object Literal Syntax (Preferred)
const person = { name: "Bob", age: 30 };

// 2. Object Constructor
const car = new Object();
car.make = "Tesla";

// 3. Object.create(prototype): Creates object with explicit Prototype inheritance
const animalProto = { eat() { console.log("Eating..."); } };
const dog = Object.create(animalProto);
dog.breed = "Golden Retriever";
dog.eat(); // Inherited from animalProto!

// 4. Object.assign({}, obj1, obj2): Shallow merges objects into a new target object
const merged = Object.assign({}, person, { role: "Admin" });
```

---

## 3. Property Access: Dot Notation vs. Bracket Notation

```javascript
const config = {
  host: "localhost",
  port: 8080,
  "max-connections": 500,
  123: "numeric key"
};
```

### Comparison & Selection Rules

| Access Syntax | Example | Use Cases & Constraints |
| :--- | :--- | :--- |
| **Dot Notation** | `config.host` | Simple valid JS identifiers. Fast, clean syntax. **Cannot use dynamic variables, hyphenated strings, or numbers.** |
| **Bracket Notation** | `config["max-connections"]` | **Required for dynamic expressions, variables, spaces, hyphens, or numeric keys.** Evaluates the expression inside `[...]` as a string/symbol. |

```javascript
// Dynamic Variable Property Access via Bracket Notation
const key = "port";
console.log(config[key]); // 8080 (Evaluates 'key' variable to "port")
console.log(config.key);  // undefined! (Looks for literal property named 'key')

// Accessing Hyphenated & Numeric Keys
console.log(config["max-connections"]); // 500
console.log(config[123]);                // "numeric key" (Coerced to "123")
```

---

## 4. Property Operations: Add, Update, Delete, & Verification

```javascript
const item = { id: 101, name: "Widget" };

// 1. Add / Update
item.price = 29.99; // Adds 'price'
item.name = "Super Widget"; // Updates 'name'

// 2. Deleting Properties
delete item.id; // Removes 'id' property from object (returns boolean true)
console.log(item.id); // undefined

// 3. Verifying Property Existence: 'in' operator vs hasOwnProperty()
console.log("price" in item); // true (Checks item AND its prototype chain!)
console.log(item.hasOwnProperty("price")); // true (Checks ONLY item's own properties)
console.log("toString" in item); // true! (Inherited from Object.prototype)
console.log(item.hasOwnProperty("toString")); // false! (Not an own property)
```

> [!WARNING]
> Setting `obj.prop = undefined` does NOT delete the property key! The key still exists in the object (`"prop" in obj` evaluates to `true`). Use `delete obj.prop` to completely remove a property key from memory.

---

## 5. Property Descriptors & Meta-Attributes

Every property on a JavaScript object has an internal **Property Descriptor** object containing four meta-attributes:

```javascript
const user = { name: "Alice" };

// Inspect property descriptor
const descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(descriptor);
/*
{
  value: "Alice",
  writable: true,      // Can value be overwritten?
  enumerable: true,    // Does it show up in for...in and Object.keys()?
  configurable: true   // Can property descriptor be modified or deleted?
}
*/
```

### Defining Properties with Custom Attributes: `Object.defineProperty()`

```javascript
const bankAccount = {};

Object.defineProperty(bankAccount, "accountNumber", {
  value: "ACC-998877",
  writable: false,     // Read-only!
  enumerable: false,   // Hidden from keys iteration!
  configurable: false  // Permanent! Cannot be deleted or re-configured.
});

// 1. Read-only test:
bankAccount.accountNumber = "HACKED"; 
console.log(bankAccount.accountNumber); // "ACC-998877" (Unchanged!)

// 2. Hidden key test:
console.log(Object.keys(bankAccount)); // [] (Hidden from iteration)

// 3. Delete test:
delete bankAccount.accountNumber; // Silently fails (or throws TypeError in strict mode)
```

---

## 6. Property Iteration Ordering Rules

ES6 standardized the exact order in which object keys are traversed (e.g. by `Object.keys()`, `Reflect.ownKeys()`, or `for...in` loops):

```
1. Integer Keys (Ascending numeric order: "1", "2", "10")
2. String Keys (Insertion order)
3. Symbol Keys (Insertion order)
```

```javascript
const obj = {
  "b": "string b",
  "2": "integer 2",
  "a": "string a",
  "1": "integer 1"
};

console.log(Object.keys(obj)); 
// Output: ["1", "2", "b", "a"] (Integers sorted ascending first, then strings in insertion order!)
```

---

## 7. Minor Points, Quirks & Traps

### 1. `delete` Operator Return Value
The `delete` operator returns `false` ONLY when trying to delete a non-configurable property in non-strict mode. Deleting a non-existent property returns `true`!

```javascript
const obj = {};
console.log(delete obj.nonExistent); // true!
```

### 2. Prototype Pollution in `for...in` Loops
`for...in` loops iterate over **inherited enumerable properties** from the prototype chain. Always guard with `obj.hasOwnProperty(key)` or use `Object.keys(obj)` instead!

```javascript
Object.prototype.globalHack = "Leaked";
const sample = { a: 1 };

for (const k in sample) {
  console.log(k); // Logs "a" AND "globalHack"!
}

// FIX: Use Object.keys() which returns ONLY own enumerable properties:
Object.keys(sample).forEach(k => console.log(k)); // Logs ONLY "a"
```

---

## 8. Senior Interview Questions & Answers

### Q1: What is the difference between `Object.keys()`, `Object.getOwnPropertyNames()`, and `Reflect.ownKeys()`?
* **Answer**:
  * `Object.keys(obj)`: Returns an array of an object's **own enumerable string keys**.
  * `Object.getOwnPropertyNames(obj)`: Returns an array of an object's **own string keys (both enumerable AND non-enumerable)**.
  * `Reflect.ownKeys(obj)`: Returns an array of **ALL own keys (string keys enumerable + non-enumerable AND Symbol keys)**.

### Q2: What happens when calling `Object.defineProperty()` without specifying `writable`, `enumerable`, or `configurable`?
* **Answer**: When defining a NEW property using `Object.defineProperty()`, any omitted descriptor boolean flags default to **`false`**! (Whereas properties created via standard assignment `obj.prop = val` default to `true`).

---

## 9. Summary & Key Takeaways

1. **Object Structure**: Unordered collection of String/Symbol key-value pairs stored on the memory heap.
2. **Access Rules**: Use dot notation for simple keys; use bracket notation for dynamic expressions or invalid identifiers.
3. **Property Descriptors**: Control mutability (`writable`), iteration visibility (`enumerable`), and deletion safety (`configurable`).
4. **Key Iteration Order**: Integer keys first (ascending), followed by string keys (insertion order).
5. **Safely Checking Keys**: Use `hasOwnProperty()` or `Object.hasOwn()` (ES2022) to avoid prototype pollution.
