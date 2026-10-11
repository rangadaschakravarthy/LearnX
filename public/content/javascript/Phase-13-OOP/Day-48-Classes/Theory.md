# Day 48 — ES6+ Classes & Modern Syntax — Detailed Theory

Welcome to **Day 48** of the JavaScript Mastery curriculum. Introduced in ES6 (ES2015) and enhanced in ES2022, **Classes** provide a clean, declarative syntax for object-oriented programming. Beneath the clean syntax, JavaScript classes remain **syntactic sugar over prototypal inheritance**.

This guide provides an exhaustive theoretical foundation covering Class anatomy, `extends` & `super()` mechanics, Static members (`static`), Private fields (`#private`), and ES2022 Static Initialization Blocks.

---

## 1. Classes are Syntactic Sugar over Prototypes

A JavaScript `class` is not a new object model—it compiles directly to prototype delegation:

```javascript
// Modern ES6 Class Syntax
class UserClass {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    return `Hello ${this.name}`;
  }
}

// Under the Hood ES5 Equivalent (Function + Prototype):
function UserFunction(name) {
  this.name = name;
}
UserFunction.prototype.sayHello = function() {
  return `Hello ${this.name}`;
};

console.log(typeof UserClass); // "function"! (Classes are special callable functions)
```

---

## 2. Complete Class Anatomy & Features

```javascript
class SmartDevice {
  // 1. Public Instance Field (ES2022)
  status = "idle";

  // 2. Private Instance Field (ES2022)
  #secretKey = "KEY_998877";

  // 3. Static Field (Class-level property)
  static version = "v2.1.0";

  // 4. Static Private Field
  static #deviceCount = 0;

  // 5. Static Initialization Block (ES2022)
  static {
    // Runs ONCE when class is defined
    console.log("SmartDevice class initialized.");
  }

  // 6. Constructor Function
  constructor(name) {
    this.name = name;
    SmartDevice.#deviceCount++;
  }

  // 7. Prototype Instance Method (Non-enumerable by default!)
  operate() {
    return `${this.name} is operating with key ${this.#secretKey}`;
  }

  // 8. Accessor Getter & Setter
  get info() {
    return `${this.name} (${this.status})`;
  }
  set info(newStatus) {
    this.status = newStatus;
  }

  // 9. Static Utility Method
  static getCount() {
    return SmartDevice.#deviceCount;
  }
}
```

---

## 3. Subclassing with `extends` & `super`

The `extends` keyword establishes a prototype link between both the instance prototypes AND the class constructor functions:

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(side) {
    // CRITICAL RULE: Must call super() BEFORE accessing 'this' in subclass constructor!
    super(side, side); // Invokes parent Rectangle constructor
    this.side = side;
  }

  // Method Overriding with super call
  getArea() {
    console.log("Calculating Square Area...");
    return super.getArea(); // Invokes parent Rectangle.prototype.getArea()
  }
}

const sq = new Square(5);
console.log(sq.getArea()); // 25
```

### The `super()` Calling Rule
> [!IMPORTANT]
> In a derived subclass constructor (`class Child extends Parent`), you **MUST call `super()` BEFORE using `this`**. Accessing `this` before calling `super()` throws a `ReferenceError: Must call super constructor in derived class before accessing 'this'`.

---

## 4. Class Hoisting & Strict Mode Enforcement

Unlike standard Function Declarations (which are fully hoisted), **Class Declarations are Hoisted in the Temporal Dead Zone (TDZ)**:

```javascript
// const p = new Person(); // ReferenceError: Cannot access 'Person' before initialization

class Person {
  constructor(name) { this.name = name; }
}
```

### Strict Mode Mechanics
All code inside a `class` body executes automatically in **Strict Mode (`"use strict"`)**. Standalone method invocations default to `this === undefined` rather than `window`!

```javascript
class Demo {
  test() {
    return this;
  }
}

const d = new Demo();
const detached = d.test;
console.log(detached()); // undefined! (Strict mode enforced)
```

---

## 5. Class Methods Are Non-Enumerable

Methods defined inside a `class` body are automatically added to the prototype with `enumerable: false`:

```javascript
class Example {
  foo() {}
}

console.log(Object.keys(Example.prototype)); // [] (Non-enumerable!)

const desc = Object.getOwnPropertyDescriptor(Example.prototype, "foo");
console.log(desc.enumerable); // false
```

---

## 6. Minor Points, Quirks & Traps

### 1. Classes CANNOT be Called Without `new`
Invoking a class without the `new` keyword throws an immediate `TypeError: Class constructor Person cannot be invoked without 'new'`.

---

## 7. Senior Interview Questions & Answers

### Q1: What happens if you access `this` inside a subclass constructor before calling `super()`?
* **Answer**: Accessing `this` before `super()` in a derived subclass constructor throws a `ReferenceError`. In JavaScript subclassing, the parent class constructor is responsible for instantiating the underlying object instance; until `super()` completes execution, `this` is uninitialized in the subclass execution context frame.

### Q2: How do methods defined on an ES6 `class` differ from methods attached to an ES5 Constructor `prototype`?
* **Answer**:
  1. Class methods are automatically non-enumerable (`enumerable: false`), whereas ES5 prototype properties default to enumerable unless configured with `Object.defineProperty()`.
  2. Class constructors throw a `TypeError` if called without `new`, whereas ES5 constructor functions can be executed as standalone calls unless guarded with `new.target`.
  3. Class bodies run strictly in Strict Mode (`"use strict"`).

---

## 8. Summary & Key Takeaways

1. **Syntactic Sugar**: Classes compile to prototype delegation under the hood (`typeof Class === "function"`).
2. **`super()` Rule**: In derived classes, `super()` must be called before accessing `this`.
3. **Private Fields**: Use `#fieldName` for hard runtime private encasement.
4. **TDZ Hoisting**: Classes hoist in the Temporal Dead Zone and cannot be called before definition.
5. **No `new` Trap**: Calling a class without `new` throws a `TypeError`.
