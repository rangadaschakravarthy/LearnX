# Object Comparison in JavaScript

## 1. Reference Equality (`===`)

Objects are compared by **memory reference**, NOT by property content:

```js
console.log({} === {}); // false (Two different objects in memory!)
console.log({ a: 1 } === { a: 1 }); // false

const obj1 = { name: "Alex" };
const obj2 = obj1;
console.log(obj1 === obj2); // true (Both variables reference the EXACT same object!)
```

---

## 2. `Object.is()`

`Object.is()` determines whether two values are the same value. For objects, it behaves identically to strict equality `===`:

```js
console.log(Object.is({}, {})); // false
console.log(Object.is(obj1, obj2)); // true

// Unique primitive comparisons with Object.is():
console.log(Object.is(NaN, NaN)); // true  (whereas NaN === NaN is false)
console.log(Object.is(0, -0));     // false (whereas 0 === -0 is true)
```
