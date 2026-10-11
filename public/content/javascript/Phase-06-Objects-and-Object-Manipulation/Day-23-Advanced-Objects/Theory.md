# Day 23 — Advanced Objects, Accessors & Prototypes — Detailed Theory

Welcome to **Day 23** of the JavaScript Mastery curriculum. Advanced object manipulation involves computed property keys, Accessor Properties (**Getters** and **Setters**), Factory vs Constructor design patterns, and the foundational mechanics of the **Prototype Chain** (`[[Prototype]]`).

This guide provides an exhaustive theoretical foundation covering ES6+ object enhancements, Accessor properties, Prototype links, and V8 optimization traps.

---

## 1. ES6+ Object Syntax Enhancements

Modern JavaScript provides concise syntax for object creation and property definition:

### 1.1 Property & Method Shorthand

```javascript
const name = "Alice";
const role = "Admin";

const user = {
  // Property Shorthand (Omits ': value' when key matches identifier name)
  name,
  role,

  // Method Shorthand (Omits ': function' keyword)
  greet() {
    return `Hello, I am ${this.name}`;
  }
};
```

---

### 1.2 Computed Property Names

Computed property names allow you to evaluate arbitrary JavaScript expressions inside square brackets `[...]` to define property keys dynamically at object creation time:

```javascript
const prefix = "user_";
const id = 42;

const dynamicObject = {
  [prefix + id]: "Alice",
  ["TIMESTAMP_" + Date.now()]: "Active",
  [Symbol.iterator]: function* () { yield 1; }
};

console.log(dynamicObject.user_42); // "Alice"
```

---

## 2. Accessor Properties: Getters (`get`) and Setters (`set`)

JavaScript object properties belong to one of two categories:
1. **Data Properties**: Store a raw data value (`value`, `writable`, `enumerable`, `configurable`).
2. **Accessor Properties**: Do NOT store a data value directly. They associate **Getter (`get`)** and **Setter (`set`)** accessor functions executed on read/write operations.

```javascript
const account = {
  firstName: "John",
  lastName: "Doe",
  _balance: 1000, // Convention: Underscore indicates pseudo-private backing variable

  // 1. Getter for Computed Virtual Property
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  // 2. Getter and Setter with Validation
  get balance() {
    return `$${this._balance.toFixed(2)}`;
  },
  set balance(amount) {
    if (typeof amount !== "number" || amount < 0) {
      throw new TypeError("Balance must be a positive number");
    }
    this._balance = amount;
  }
};

// Accessing Getter (Evaluates function transparently without parentheses!)
console.log(account.fullName); // "John Doe"
console.log(account.balance);  // "$1000.00"

// Invoking Setter
account.balance = 2500;
console.log(account.balance);  // "$2500.00"

// account.balance = -50; // TypeError: Balance must be a positive number
```

---

### 2.1 Defining Accessors via `Object.defineProperty()`

Accessor properties can also be attached dynamically using `Object.defineProperty()`:

```javascript
const circle = { radius: 5 };

Object.defineProperty(circle, "area", {
  get() {
    return Math.PI * this.radius * this.radius;
  },
  enumerable: true,
  configurable: true
});

console.log(circle.area.toFixed(2)); // "78.54"
```

---

## 3. Prototype Foundations & The Prototype Chain

Every JavaScript object has an internal hidden slot named **`[[Prototype]]`**, which points to either another object or `null`.

When accessing a property on an object:
1. JavaScript checks if the property exists on the **own object**.
2. If not found, it traverses up the **`[[Prototype]]` pointer** to the parent object.
3. It continues climbing the **Prototype Chain** until the property is found or `[[Prototype]]` points to `null` (above `Object.prototype`).

```
+------------------------------------+
| child (own: { b: 2 })              |
| [[Prototype]] ---------------------+
+------------------------------------+
                                     |
                                     v
+------------------------------------+
| parent (own: { a: 1 })             |
| [[Prototype]] ---------------------+
+------------------------------------+
                                     |
                                     v
+------------------------------------+
| Object.prototype                   |
| [[Prototype]]: null                |
+------------------------------------+
```

```javascript
const parent = { a: 1 };
const child = Object.create(parent); // Sets child.[[Prototype]] = parent
child.b = 2;

console.log(child.b); // 2 (Found on child)
console.log(child.a); // 1 (Not on child -> Found on parent via Prototype Chain!)
console.log(child.c); // undefined (Traversed up to Object.prototype -> null -> not found)
```

---

### 3.1 Inspecting & Mutating Prototypes safely

* **`Object.getPrototypeOf(obj)`**: Safe standard method to read `[[Prototype]]`.
* **`Object.setPrototypeOf(obj, proto)`**: Standard method to mutate `[[Prototype]]`.
* **`__proto__`**: Historical legacy accessor property on `Object.prototype` (deprecated in favor of `Object.getPrototypeOf`).

```javascript
const animal = { eats: true };
const rabbit = { jumps: true };

Object.setPrototypeOf(rabbit, animal); // rabbit.[[Prototype]] = animal

console.log(Object.getPrototypeOf(rabbit) === animal); // true
console.log(rabbit.eats); // true
```

> [!WARNING]
> Mutating an object's prototype using `Object.setPrototypeOf()` at runtime is **extremely slow in JS engines** (like V8) because it invalidates inline caches and compiled code optimizations for all downstream code! Always set prototypes at creation time using `Object.create()`.

---

## 4. Factory Functions vs. Constructor Functions

JavaScript provides two architectural patterns for generating multiple instances of objects:

### 4.1 Factory Functions

A **Factory Function** is any standard function that returns a new object instance without using `new`:

```javascript
function createPerson(name, role) {
  return {
    name,
    role,
    describe() {
      return `${this.name} is a ${this.role}`;
    }
  };
}

const p1 = createPerson("Alice", "Engineer");
const p2 = createPerson("Bob", "Designer");
```

* **Pros**: Simple, no `new` or `this` binding issues, private scope via closures.
* **Cons**: Every instance duplicates method functions in memory (`p1.describe !== p2.describe`).

---

### 4.2 Constructor Functions

A **Constructor Function** is designed to be invoked with the **`new`** operator:

```javascript
function Person(name, role) {
  // 1. Automatically creates new empty object: this = Object.create(Person.prototype)
  this.name = name;
  this.role = role;
  // 2. Automatically returns 'this'
}

// Attach methods to Prototype to share a single memory reference across all instances!
Person.prototype.describe = function() {
  return `${this.name} is a ${this.role}`;
};

const p1 = new Person("Alice", "Engineer");
const p2 = new Person("Bob", "Designer");

console.log(p1.describe === p2.describe); // true! (Shared memory reference on Person.prototype)
console.log(p1 instanceof Person);       // true
```

---

## 5. Minor Points, Quirks & Traps

### 1. The Getter Infinite Recursion Trap
Inside a getter or setter, NEVER reference the exact same property name directly without a separate backing variable! Doing so causes an infinite recursion stack overflow:

```javascript
const bad = {
  // BROKEN INFINITE RECURSION:
  // get name() { return this.name; } // Calling this.name calls the getter again indefinitely!
  
  // CORRECT:
  _name: "Alice",
  get name() { return this._name; }
};
```

---

## 6. Senior Interview Questions & Answers

### Q1: What happens under the hood when a function is invoked with the `new` keyword?
* **Answer**: Executing `new ConstructorFn(...args)` performs 4 automated steps:
  1. Creates a brand new empty object in memory: `{}`.
  2. Links the new object's `[[Prototype]]` pointer to `ConstructorFn.prototype`.
  3. Binds `this` inside the constructor function to the newly created object and executes the constructor body.
  4. Automatically returns the `this` object (unless the constructor function explicitly returns a custom non-primitive object).

### Q2: What is the difference between `Object.create(proto)` and `new Constructor()`?
* **Answer**: `Object.create(proto)` creates a new object and directly sets its `[[Prototype]]` to `proto` without invoking a constructor body function. `new Constructor()` creates a new object, sets its `[[Prototype]]` to `Constructor.prototype`, and executes the constructor body logic with `this` bound to the new instance.

---

## 7. Summary & Key Takeaways

1. **Accessors (`get`/`set`)**: Provide virtual properties with transparent validation and computed getters.
2. **Computed Properties**: Use `[expr]: value` syntax to construct dynamic keys at object creation.
3. **Prototype Chain**: Unfound properties traverse up `[[Prototype]]` pointers until reaching `null`.
4. **`Object.getPrototypeOf`**: Always use standard `Object.getPrototypeOf()` instead of legacy `__proto__`.
5. **Constructor Prototypes**: Attach methods to `Constructor.prototype` to share function references in memory across instances.
