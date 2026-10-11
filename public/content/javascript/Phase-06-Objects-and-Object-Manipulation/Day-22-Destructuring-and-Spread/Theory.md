# Day 22 — Object Destructuring & Spread Mechanics — Detailed Theory

Welcome to **Day 22** of the JavaScript Mastery curriculum. Introduced in ES6 (ES2015) and extended in ES2018, **Object Destructuring** and **Object Spread/Rest operators** revolutionized how JavaScript developers extract data from objects, unpack function arguments, and create immutable object shallow copies.

This guide provides an exhaustive theoretical foundation covering destructuring syntax, variable renaming, default values, deep nested extraction, function option bag patterns, and spread operator merging semantics.

---

## 1. Object Destructuring First Principles

Object Destructuring allows you to unpack properties from objects into distinct local variables using a pattern matching syntax that mirrors object literal syntax.

```javascript
const user = { id: 101, username: "johndoe", email: "john@example.com" };

// Standard Extraction (Pre-ES6)
// const username = user.username;
// const email = user.email;

// Modern ES6 Object Destructuring
const { username, email } = user;
console.log(username); // "johndoe"
console.log(email);    // "john@example.com"
```

---

## 2. Variable Renaming & Alias Assignment

When destructuring, you can assign an extracted property value to a local variable name that differs from the object key:

```javascript
const response = {
  status_code: 200,
  data_payload: { items: [1, 2, 3] }
};

// Renaming 'status_code' to 'status', and 'data_payload' to 'payload'
// Syntax: { originalKey: newLocalVariableName }
const { status_code: status, data_payload: payload } = response;

console.log(status);  // 200
console.log(payload); // { items: [1, 2, 3] }
// console.log(status_code); // ReferenceError: status_code is not defined!
```

---

## 3. Default Values & Fallbacks

Default values are evaluated ONLY if the extracted property is `undefined` (or missing) in the source object.

```javascript
const settings = {
  theme: "dark",
  timeout: 0,
  cache: null
};

// Destructuring with default values
const {
  theme = "light",
  timeout = 5000,
  retries = 3,
  cache = "enabled"
} = settings;

console.log(theme);   // "dark" (Extracted from object)
console.log(timeout); // 0 (Preserved! 0 is not undefined!)
console.log(retries); // 3 (Used default value because 'retries' was missing)
console.log(cache);   // null (Preserved! null is not undefined!)
```

> [!IMPORTANT]
> Default values trigger **ONLY when the property value is `undefined`**. Passing `null`, `0`, `false`, or `""` will NOT trigger default values!

---

## 4. Deep Nested Destructuring & Guard Patterns

You can destructure properties from deeply nested object structures:

```javascript
const employee = {
  id: 42,
  profile: {
    name: { first: "Sarah", last: "Connor" },
    contact: { email: "sarah@sky.net" }
  }
};

// Extracting deeply nested 'first' and 'email'
const {
  profile: {
    name: { first },
    contact: { email }
  }
} = employee;

console.log(first); // "Sarah"
console.log(email); // "sarah@sky.net"
```

### Safety Guard Against `TypeError`
If an intermediate object path is `undefined` or `null`, nested destructuring throws a fatal `TypeError`!

```javascript
const incompleteUser = { id: 10 };

// BROKEN: Cannot destructure property 'first' of undefined (incompleteUser.profile is undefined)!
// const { profile: { name: { first } } } = incompleteUser; 

// FIX: Provide default empty objects at intermediate levels:
const {
  profile: { name: { first = "Anonymous" } = {} } = {}
} = incompleteUser;

console.log(first); // "Anonymous" (Safely guarded!)
```

---

## 5. Function Parameter Destructuring ("Option Bag" Pattern)

Destructuring function parameters creates clean, self-documenting APIs and eliminates positional argument ordering bugs:

```javascript
// Function receiving an "Option Bag" object parameter
function connectDatabase({
  host = "localhost",
  port = 5432,
  username = "postgres",
  password = "password",
  ssl = false
} = {}) { // '= {}' fallback allows calling connectDatabase() with no arguments!
  console.log(`Connecting to ${host}:${port} as ${username} (SSL: ${ssl})`);
}

// Callers can supply arguments in any order or omit optional ones:
connectDatabase({ port: 5433, ssl: true });
// Output: "Connecting to localhost:5433 as postgres (SSL: true)"

// Calling with zero arguments safely uses default empty object:
connectDatabase();
// Output: "Connecting to localhost:5432 as postgres (SSL: false)"
```

---

## 6. Object Rest (`...rest`) and Spread (`...spread`) Operators (ES2018)

### 6.1 Object Rest Operator (`...rest`)
The rest operator inside a destructuring assignment collects all remaining un-extracted own enumerable properties into a new object:

```javascript
const product = { id: 101, title: "Phone", price: 699, stock: 50, category: "Electronics" };

// Extract 'id' and 'title', collect remaining properties into 'details'
const { id, title, ...details } = product;

console.log(id);      // 101
console.log(title);   // "Phone"
console.log(details); // { price: 699, stock: 50, category: "Electronics" }
```

---

### 6.2 Object Spread Operator (`...spread`)

The spread operator copies all own enumerable properties from one or more source objects into a new object expression.

#### Rules of Object Spread:
1. **Shallow Copy**: Nested object references are copied by reference address pointer.
2. **Precedence / Overwriting**: Later spread objects overwrite earlier properties with matching key names.

```javascript
const defaultConfig = { theme: "light", showSidebar: true, timeout: 1000 };
const userConfig = { theme: "dark", timeout: 3000 };

// Merging objects (userConfig overrides defaultConfig properties)
const finalConfig = {
  ...defaultConfig,
  ...userConfig,
  updatedAt: "2026-09-13" // Additional property
};

console.log(finalConfig);
// { theme: "dark", showSidebar: true, timeout: 3000, updatedAt: "2026-09-13" }
```

---

## 7. Minor Points, Quirks & Traps

### 1. Destructuring into Already Declared Variables Syntax Trap
When destructuring into variables that were already declared with `let` or `var`, you MUST enclose the entire assignment statement in parentheses `(...)`!

```javascript
let a, b;

// BROKEN: SyntaxError: Unexpected token '=' (Curly braces interpreted as a block statement!)
// { a, b } = { a: 1, b: 2 }; 

// CORRECT: Wrap assignment in parentheses
({ a, b } = { a: 1, b: 2 });
console.log(a, b); // 1 2
```

### 2. Destructuring `null` or `undefined` Throws Immediately
Attempting to destructure `null` or `undefined` throws an immediate `TypeError: Cannot destructure property 'x' of 'null'`:

```javascript
// const { x } = null; // TypeError!
const { x = 10 } = null || {}; // Safe fallback guard pattern!
```

---

## 8. Senior Interview Questions & Answers

### Q1: What is the difference between Array destructuring and Object destructuring position matching vs key matching?
* **Answer**: Array destructuring matches values **by index position** (`const [first, second] = arr`), where variable names can be anything. Object destructuring matches values **by key identifier name** (`const { name, age } = obj`), regardless of the order of properties inside the object.

### Q2: Explain what happens when spreading an object containing getters using `{ ...obj }`.
* **Answer**: Spreading an object evaluates all getters on the source object at spread time and copies their current static return values as standard data properties on the target object. It does NOT transfer the getter function definition.

---

## 9. Summary & Key Takeaways

1. **Key Matching**: Object destructuring binds by property key name, not position.
2. **Renaming & Defaults**: Use `{ key: alias = defaultValue }` to rename variables and supply fallback initializers.
3. **Undefined Fallback**: Default values trigger ONLY when the source value is `undefined`.
4. **Function Option Bags**: Always provide a default empty object fallback (`= {}`) for function destructuring parameters.
5. **Spread Merging**: `{ ...a, ...b }` shallow-copies properties, with later properties overwriting earlier ones.
