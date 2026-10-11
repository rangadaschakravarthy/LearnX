# Day 47 — The Four Pillars of OOP & Composition — Detailed Theory

Welcome to **Day 47** of the JavaScript Mastery curriculum. Beyond syntax, Object-Oriented Programming is an architectural paradigm organized around four core principles: **Encapsulation**, **Abstraction**, **Inheritance**, and **Polymorphism**.

This guide provides an exhaustive theoretical foundation covering the 4 Pillars in JavaScript, the **Composition vs. Inheritance** debate, Mixin patterns, and overcoming the Fragile Base Class problem.

---

## 1. The Four Pillars of Object-Oriented Programming

```
                            [ The 4 Pillars of OOP ]
                                       │
    ┌──────────────────┬───────────────┴───────────────┬──────────────────┐
    ▼                  ▼                               ▼                  ▼
Encapsulation      Abstraction                     Inheritance        Polymorphism
Hides Internal    Exposes Clean Interfaces        Reuses Parent      Overrides Parent
Private State     Hides Complex Implementation    Subclasses         Methods Dynamically
```

---

### Pillar 1: Encapsulation

**Encapsulation** is the bundling of data (properties) and methods that operate on that data into a single unit (class or object), restricting direct outside access to internal state.

```javascript
class BankAccount {
  #balance = 0; // Private field (Encapsulated internal state)

  constructor(initialDeposit) {
    this.#balance = initialDeposit;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid deposit");
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance; // Controlled getter access
  }
}
```

---

### Pillar 2: Abstraction

**Abstraction** means hiding internal implementation details and exposing only the essential interface to the consumer.

```javascript
class VideoProcessor {
  processVideo(file) {
    // High-level public interface
    this.#decode(file);
    this.#compress();
    this.#encode();
    return "processed_video.mp4";
  }

  // Complex low-level implementation details hidden from consumer:
  #decode(file) { /* Low-level byte operations */ }
  #compress() { /* H.264 compression codec */ }
  #encode() { /* MP4 container formatting */ }
}
```

---

### Pillar 3: Inheritance

**Inheritance** allows a child class (subclass) to inherit properties and methods from a parent class (superclass), promoting code reuse.

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  getDetails() {
    return `${this.name} (${this.email})`;
  }
}

class AdminUser extends User {
  constructor(name, email, permissions) {
    super(name, email); // Call superclass constructor
    this.permissions = permissions;
  }
}
```

---

### Pillar 4: Polymorphism

**Polymorphism** ("many forms") is the ability of different classes to respond to the **same method call** in their own customized ways (Method Overriding and Dynamic Dispatch).

```javascript
class Shape {
  calculateArea() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) { super(); this.radius = radius; }
  calculateArea() { return Math.PI * this.radius ** 2; } // Overridden
}

class Square extends Shape {
  constructor(side) { super(); this.side = side; }
  calculateArea() { return this.side ** 2; } // Overridden
}

// Polymorphic Processing Loop:
const shapes = [new Circle(5), new Square(4)];
shapes.forEach(shape => {
  console.log(shape.calculateArea()); // Dynamically dispatches correct method!
});
```

---

## 2. Composition vs. Inheritance ("Favor Composition Over Inheritance")

While Class Inheritance is intuitive, deep class inheritance trees suffer from severe architectural issues:

```
THE GORILLA / BANANA PROBLEM (Joe Armstrong):
"You wanted a banana, but what you got was a gorilla holding the banana and the entire jungle!"
```

### The Fragile Base Class Problem
In deep inheritance hierarchies (`Animal` -> `Mammal` -> `Canine` -> `Dog`), modifying a single method in the top `Animal` base class can inadvertently break behavior in dozens of descendant subclasses!

---

### Functional Composition & Mixins (The Solution)

Instead of designing entities around **what they ARE** (Class Taxonomy), design entities around **what they CAN DO** (Composition of Abilities).

```javascript
// 1. Define Standalone Feature Mixins (Abilities)
const canEat = {
  eat() { console.log(`${this.name} is eating.`); }
};

const canFly = {
  fly() { console.log(`${this.name} is flying through the sky!`); }
};

const canSwim = {
  swim() { console.log(`${this.name} is swimming in the water.`); }
};

// 2. Compose Objects by Mixing Abilities!
function createDuck(name) {
  const duck = { name };
  return Object.assign(duck, canEat, canFly, canSwim); // Duck can eat, fly, AND swim
}

function createPenguin(name) {
  const penguin = { name };
  return Object.assign(penguin, canEat, canSwim); // Penguin can eat and swim (NO FLYing!)
}

const donald = createDuck("Donald");
donald.fly();  // "Donald is flying..."
donald.swim(); // "Donald is swimming..."

const pingu = createPenguin("Pingu");
pingu.swim();  // "Pingu is swimming..."
// pingu.fly(); // undefined (Cleanly avoids invalid flying behavior!)
```

---

## 3. Comparison Table: Inheritance vs. Composition

| Dimension | Class Inheritance | Functional Composition |
| :--- | :--- | :--- |
| **Mental Model** | **"Is-a" Relationship** (`Dog is an Animal`) | **"Has-a" / "Can-do" Relationship** (`Duck has Swimming ability`) |
| **Coupling** | High Coupling (Child tightly bound to Parent implementation) | **Low Coupling** (Decoupled independent mixin behaviors) |
| **Flexibility** | Rigid at compile/author time | Highly Flexible at runtime |
| **Refactoring Risk**| High (Fragile base class changes break child classes) | Low (Mixins modified or added independently) |

---

## 4. Minor Points, Quirks & Traps

### 1. Prototype Pollution via Mixins
When using `Object.assign(target.prototype, mixin)`, ensure mixin objects do not contain shared mutable arrays or objects, as all instance objects will reference the exact same memory array!

---

## 5. Senior Interview Questions & Answers

### Q1: What is the "Gorilla/Banana Problem" in Object-Oriented Class Inheritance?
* **Answer**: The Gorilla/Banana problem is a famous critique of deep class inheritance hierarchies formulated by Joe Armstrong (creator of Erlang). It refers to the issue where a subclass needs a small piece of functionality from a base class, but because of rigid inheritance chains, instantiating or inheriting that functionality forces the subclass to pull in the entire parent class infrastructure and all its ancestral dependencies ("you wanted a banana, but you got a gorilla holding the banana and the entire jungle"). It is solved by favoring Object Composition over Class Inheritance.

### Q2: Explain Polymorphism in JavaScript and give a practical example.
* **Answer**: Polymorphism ("many forms") is the ability of different object types to respond to the exact same method call signature in their own specialized ways. In JavaScript, polymorphism is achieved by defining a common method name on a parent prototype or class interface, and having subclasses override that method with specialized implementations. A consumer can iterate over a collection of diverse objects calling `shape.calculateArea()` without needing to know the specific concrete class type of each item.

---

## 6. Summary & Key Takeaways

1. **4 Pillars**: Encapsulation (`#private`), Abstraction (clean API), Inheritance (`extends`), Polymorphism (method overriding).
2. **Favor Composition**: Prefer composing objects out of small ability mixins over deep class inheritance hierarchies.
3. **Avoid Fragile Base Classes**: Deep inheritance trees make code brittle; composition keeps modules loosely coupled.
4. **Mixins**: Use `Object.assign()` to combine functional behavior objects onto prototypes or instances.
