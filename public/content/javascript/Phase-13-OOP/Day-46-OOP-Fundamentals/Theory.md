# Day 46 — Object-Oriented Programming & Prototypes — Detailed Theory

Welcome to **Day 46** of the JavaScript Mastery curriculum. Unlike class-based languages (such as Java or C++), JavaScript is fundamentally a **Prototype-Based Object-Oriented Language**. In JavaScript, objects inherit properties directly from other objects via **Delegation**, rather than copying blueprints from abstract class definitions.

This guide provides an exhaustive theoretical foundation covering Prototypal Inheritance, the distinction between `prototype` and `__proto__`, the Prototype Chain, and Constructor function mechanics.

---

## 1. Class-Based vs. Prototype-Based Paradigms

```
Class-Based OOP (Java / C++)                 Prototype-Based OOP (JavaScript)
┌────────────────────────────────┐           ┌────────────────────────────────┐
│   Abstract Class Blueprint     │           │   Prototype Object (Instance)  │
└───────────────┬────────────────┘           └───────────────┬────────────────┘
                │ (Instantiates/Copies)                      │ (Delegates Link)
                ▼                                            ▼
┌────────────────────────────────┐           ┌────────────────────────────────┐
│        Object Instance         │           │        Object Instance         │
└────────────────────────────────┘           └────────────────────────────────┘
```

### Key Differences

| Dimension | Class-Based Languages (Java/C++) | Prototype-Based Language (JavaScript) |
| :--- | :--- | :--- |
| **Object Creation** | Instantiated from rigid class blueprints | Objects created directly or cloned from prototypes |
| **Inheritance Model**| Class hierarchies (Copies state/methods) | **Prototypal Delegation** (Delegates property lookup) |
| **Flexibility** | Static, compiled class structures | **Dynamic** (Prototypes modified at runtime) |
| **Memory Allocation**| Methods copied per class instance | Methods shared via single `prototype` object |

---

## 2. Demystifying `prototype` vs. `__proto__`

Understanding the difference between `func.prototype` and `obj.__proto__` is essential for mastering JavaScript objects:

```
[ Function: Person ] ────────────────► prototype ───────► [ Person.prototype Object ]
                                                                   ▲
                                                                   │ [[Prototype]]
const p1 = new Person() ─────────────► __proto__ ──────────────────┘
```

1. **`Function.prototype`**: A property present ONLY on functions. It is the object that will become the `[[Prototype]]` parent of any new instance created when calling `new Function()`.
2. **`Object.__proto__` (or `[[Prototype]]`)**: An internal accessor property present on ALL objects. It points directly to that object's prototype parent in the delegation chain.

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  return `Hello, I am ${this.name}`;
};

const p1 = new Person("Alice");

// Validation of Prototypal Link:
console.log(p1.__proto__ === Person.prototype); // true
console.log(Object.getPrototypeOf(p1) === Person.prototype); // true (Standard method)
console.log(Person.prototype.constructor === Person); // true
```

---

## 3. The Prototype Chain & Property Lookup Algorithm

When attempting to access a property `obj.prop`:

```
Step 1: Check if 'prop' exists on 'obj' directly (Own Property)
        ├── Found? Return value.
        └── Not Found? Follow obj.[[Prototype]] to parent prototype object.

Step 2: Check if 'prop' exists on parent prototype object
        ├── Found? Return value.
        └── Not Found? Follow parent.[[Prototype]] to next prototype.

Step 3: Repeat until parent.[[Prototype]] is null (Object.prototype.[[Prototype]] === null)
        └── Still Not Found? Return undefined.
```

```javascript
const grandparent = { surname: "Smith" };
const parent = Object.create(grandparent);
parent.city = "New York";

const child = Object.create(parent);
child.name = "John";

console.log(child.name);    // "John" (Found on child)
console.log(child.city);    // "New York" (Found on parent prototype)
console.log(child.surname); // "Smith" (Found on grandparent prototype)
console.log(child.age);     // undefined (Reached Object.prototype -> null)
```

---

## 4. Property Shadowing

**Property Shadowing** occurs when an object defines an own property with the exact same name as a property on its prototype chain:

```javascript
const vehicle = { wheels: 4 };
const car = Object.create(vehicle);

console.log(car.wheels); // 4 (Delegated to vehicle)

// Shadowing 'wheels' on 'car' own property:
car.wheels = 3; 

console.log(car.wheels);    // 3 (Own property shadows prototype property!)
console.log(vehicle.wheels); // 4 (Parent prototype remains untouched!)
```

---

## 5. Prototypal Inheritance Mechanics (Pre-ES6)

Before ES6 `class` syntax, prototypal inheritance between constructor functions was implemented manually using `Object.create()`:

```javascript
// Parent Constructor
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function() {
  return `${this.name} is eating.`;
};

// Child Constructor
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor with 'this'
  this.breed = breed;
}

// Inherit Animal prototype methods via Object.create()
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Reset constructor reference!

Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

const d = new Dog("Rex", "German Shepherd");
console.log(d.eat());  // "Rex is eating." (Inherited from Animal)
console.log(d.bark()); // "Rex barks!" (Own prototype method)
```

---

## 6. Minor Points, Quirks & Traps

### 1. `Object.create(null)` Has NO Prototype
Creating an object via `Object.create(null)` generates a pure dictionary object with `[[Prototype]] === null`. It has no `toString()`, `valueOf()`, or `hasOwnProperty()` methods!

```javascript
const pureDict = Object.create(null);
console.log(pureDict.__proto__); // undefined
// pureDict.toString(); // TypeError: pureDict.toString is not a function!
```

### 2. The `instanceof` Operator Mechanism
The `instanceof` operator checks whether `Constructor.prototype` appears anywhere along the prototype chain of an object instance:

```javascript
console.log(d instanceof Dog);    // true
console.log(d instanceof Animal); // true (Animal.prototype is in d's prototype chain!)
console.log(d instanceof Object); // true
```

---

## 7. Senior Interview Questions & Answers

### Q1: What is the difference between `__proto__` and `prototype` in JavaScript?
* **Answer**: `prototype` is an own property present on function objects (`Function.prototype`). It serves as the prototype object that will be assigned to instances created via `new Function()`. `__proto__` (or `[[Prototype]]`) is an internal accessor property present on all objects that points to the actual parent prototype object from which that object inherits properties.

### Q2: How does property lookup work along the Prototype Chain?
* **Answer**: When accessing a property on an object, JavaScript first checks if the property exists directly on the object as an own property. If not found, it traverses the internal `[[Prototype]]` pointer to the object's parent prototype and checks for the property there. This process continues recursively up the prototype chain until the property is found or until the chain terminates at `Object.prototype.[[Prototype]] === null`, at which point it returns `undefined`.

---

## 8. Summary & Key Takeaways

1. **Delegation Paradigm**: JavaScript uses prototype delegation, where objects inherit properties from parent prototype objects.
2. **`prototype` vs `__proto__`**: `prototype` is on functions (constructor template); `__proto__` is on instances (link to parent).
3. **Prototype Chain**: Unfound properties climb `[[Prototype]]` pointers up to `Object.prototype`.
4. **Method Sharing**: Define methods on `Constructor.prototype` so all instances share a single function reference in memory.
5. **`instanceof`**: Tests if a constructor's `.prototype` exists in an instance's prototype chain.
