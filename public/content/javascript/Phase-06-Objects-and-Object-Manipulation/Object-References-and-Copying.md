# Object References and Shallow Copying

## 1. Reference Assignment vs Independent Copies

Objects are reference types stored on the heap. Assigning an object variable to another variable copies the **memory address reference**, NOT the properties:

```js
const a = { name: "Alex" };
const b = a; // Reference assignment! Both 'a' and 'b' point to the SAME object on heap!

b.name = "John";
console.log(a.name); // "John"  <-- 'a' is modified because 'b' shares the reference!
```

---

## 2. Shallow Copying Techniques

To create an independent top-level object copy, use object spread or `Object.assign()`:

```js
const original = { name: "Alex", age: 22 };

// Technique 1: Object Spread (Recommended)
const copy1 = { ...original };

// Technique 2: Object.assign()
const copy2 = Object.assign({}, original);

copy1.name = "John";
console.log(original.name); // "Alex" (Unmodified!)
```

---

## 3. Shallow Copy Limitation with Nested Objects

Shallow copies duplicate primitive property values, but for nested objects, they copy the **reference**:

```js
const user = { name: "Alex", profile: { city: "Hyderabad" } };
const copy = { ...user };

copy.profile.city = "Bangalore";
console.log(user.profile.city); // "Bangalore" <-- Shared nested object reference!
```
