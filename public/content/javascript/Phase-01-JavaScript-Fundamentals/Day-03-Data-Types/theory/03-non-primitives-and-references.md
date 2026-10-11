# Non-Primitive Reference Types & Memory Mechanics

## 1. What is it?
In JavaScript, any value that is **not** one of the 7 primitives is a **Non-Primitive / Reference Type** (an Object).

Reference types include:
- Plain Objects (`{ name: "Alice" }`)
- Arrays (`[1, 2, 3]`)
- Functions (`function() {}`)
- Dates (`new Date()`)
- Regular Expressions (`/abc/`)

---

## 2. Memory Mechanics: Call Stack vs Memory Heap

```text
1. Primitives: Stored directly in Stack Memory (Pass-by-value).
2. Reference Types: Payload stored in Heap Memory; Stack stores pointer address (Pass-by-reference).
```

```text
Stack Memory                            Heap Memory
┌───────────────────────────┐          ┌───────────────────────────┐
│ primitiveVar: 10          │          │ 0x00A1FF: {              │
│ refVar: 0x00A1FF ─────────┼─────────►│   name: "Alice",          │
└───────────────────────────┘          │   age: 28                 │
                                       │ }                         │
                                       └───────────────────────────┘
```

---

## 3. Pass-by-Value vs Pass-by-Reference Example

```javascript
// 1. Primitive Pass-By-Value
let a = 10;
let b = a; // Copy of value 10 created
b = 20;
console.log(a); // 10 (a is completely unaffected!)

// 2. Reference Pass-By-Reference
let obj1 = { name: "Alice" };
let obj2 = obj1; // Copies POINTER ADDRESS 0x00A1FF

obj2.name = "Bob"; // Mutates heap payload!
console.log(obj1.name); // "Bob"! (obj1 and obj2 point to the SAME object in memory!)
```

---

## 4. Object Equality Comparison

```text
🔥 Must Know: Comparing objects with == or === compares POINTER ADDRESSES, not contents!
```

```javascript
const item1 = { id: 1 };
const item2 = { id: 1 };

console.log(item1 === item2); // false! (Different heap memory addresses!)

const item3 = item1;
console.log(item1 === item3); // true! (Identical heap memory address pointer!)
```

---

## 5. Step-by-Step Explanation
1. `const item1 = { id: 1 }` allocates a new memory slot `0x01` in heap memory.
2. `const item2 = { id: 1 }` allocates a separate memory slot `0x02` in heap memory.
3. `item1 === item2` evaluates `0x01 === 0x02`, which returns `false`.

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Assuming Object.assign or Spread (...) performs deep copy
```

```javascript
const original = { user: { name: "Alice" } };
const shallowCopy = { ...original };

shallowCopy.user.name = "Bob"; // Mutates original.user.name too! (Nested objects share references!)
```

---

## 7. Edge Cases
- Functions are first-class object subtypes in JavaScript. They can have properties attached to them just like standard objects:
```javascript
function myFunc() {}
myFunc.customProperty = "Hello";
console.log(myFunc.customProperty); // "Hello"
```

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: What happens when you pass an object to a function in JavaScript?**
  - *Answer*: Arguments are passed by value of the reference pointer. The function receives a copy of the pointer address pointing to the same heap object. Mutating object properties inside the function mutates the external object, but reassigning the parameter variable inside the function does not alter the external reference binding.

---

## 9. Practice Questions
1. Why does `{ name: "A" } === { name: "A" }` return `false`?
2. Where are non-primitive object payloads stored in computer memory?
3. How do you perform a true deep copy of a nested object in modern JS?

---

## 10. Key Takeaways
- Reference types (Objects, Arrays, Functions) store their payloads in Heap Memory.
- Variables store pointer addresses pointing to heap memory.
- Copying a reference variable copies the pointer, creating shared mutation side-effects.
- Comparing objects with `===` checks memory reference equality, not structural equality.
