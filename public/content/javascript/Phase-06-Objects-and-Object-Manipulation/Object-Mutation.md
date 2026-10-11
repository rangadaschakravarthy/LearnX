# Object Mutation in JavaScript

Objects in JavaScript are mutable reference data types. Modifying an object property changes the underlying data on the heap.

---

## 1. `const` Binding vs Property Mutation

Declaring an object variable with `const` prevents **variable reassignment**, but does NOT prevent **property mutation**:

```js
const user = { name: "Alex", age: 22 };

// VALID: Mutating properties inside the object
user.age = 23; // user is now { name: "Alex", age: 23 }
user.city = "Hyderabad"; // Property added!
delete user.city; // Property deleted!

// INVALID: Reassigning the variable identifier throws TypeError
// user = { name: "John" }; // TypeError: Assignment to constant variable.
```
