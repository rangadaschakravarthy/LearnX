# Day 63 — Metaprogramming with Proxy & Reflect — Detailed Theory

Welcome to **Day 63** of the JavaScript Mastery curriculum. **Metaprogramming** refers to writing code that can inspect, intercept, and modify standard language operations (such as property lookup, assignment, enumeration, or function invocation).

Introduced in ES6, **`Proxy`** and **`Reflect`** provide a powerful metaprogramming toolkit used to build modern Reactive UI frameworks (like Vue 3), validation layers, negative array indexing, and API mock suites.

---

## 1. The `Proxy` Architecture

A **`Proxy`** object wraps a **target object** and intercepts fundamental low-level operations performed on that object using custom handler functions called **Traps**.

```
[ Operations on Proxy ] ──► [ Handler Traps ] ──(Reflect)──► [ Target Object ]
(proxy.name = "Alice")      (get, set, has...)               (Memory Heap)
```

```javascript
const target = { name: "Alice", age: 25 };

// Handler object defining custom interceptor traps
const handler = {
  get(target, prop, receiver) {
    console.log(`Property '${prop}' was accessed!`);
    return prop in target ? target[prop] : "DEFAULT_VALUE";
  },
  set(target, prop, value, receiver) {
    if (prop === "age" && (typeof value !== "number" || value < 0)) {
      throw new TypeError("Age must be a positive number!");
    }
    console.log(`Property '${prop}' set to ${value}`);
    target[prop] = value;
    return true; // Must return boolean true on successful set!
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Logs: "Property 'name' was accessed!" -> "Alice"
console.log(proxy.missing); // Logs: "Property 'missing' was accessed!" -> "DEFAULT_VALUE"

proxy.age = 30; // Logs: "Property 'age' set to 30"
// proxy.age = -5; // TypeError: Age must be a positive number!
```

---

## 2. The `Reflect` API: Mirror Methods

The **`Reflect`** object is a built-in static object that provides 1:1 mirror methods corresponding to every Proxy handler trap.

### Why Use `Reflect` Inside Proxy Traps?
1. **Clean Error Handling**: Standard operations like `delete obj.prop` return booleans or throw errors silently. `Reflect` methods return clean booleans (`true`/`false`).
2. **Correct Receiver (`this`) Binding**: Passing the `receiver` parameter to `Reflect.get()` and `Reflect.set()` guarantees that inherited getters/setters execute with the correct `this` binding!

```javascript
const safeHandler = {
  get(target, prop, receiver) {
    // Mirror operation using Reflect.get (Preserves prototype getter receiver!)
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    // Mirror operation using Reflect.set
    return Reflect.set(target, prop, value, receiver);
  }
};
```

---

## 3. Essential Proxy Traps Taxonomy

| Trap | Intercepted Operation | Triggering Syntax |
| :--- | :--- | :--- |
| **`get(target, prop, receiver)`** | Property Reading | `proxy.foo`, `proxy['foo']` |
| **`set(target, prop, val, receiver)`** | Property Writing | `proxy.foo = 42` |
| **`has(target, prop)`** | Property Existence Check | `'foo' in proxy` |
| **`deleteProperty(target, prop)`** | Property Deletion | `delete proxy.foo` |
| **`apply(target, thisArg, args)`** | Function Invocation | `proxyFunc(...args)` |
| **`construct(target, args, newTarget)`**| `new` Constructor Invocation | `new ProxyClass(...args)` |

---

## 4. Practical Metaprogramming Applications

### 4.1 Negative Array Indexing (Python-style `arr[-1]`)

```javascript
function createNegativeArray(arr) {
  return new Proxy(arr, {
    get(target, prop, receiver) {
      const index = Number(prop);
      if (!Number.isNaN(index) && index < 0) {
        // Convert negative index to positive: arr[len + negativeIndex]
        prop = String(target.length + index);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}

const list = createNegativeArray(["A", "B", "C", "D"]);

console.log(list[-1]); // "D" (Last item!)
console.log(list[-2]); // "C" (Second to last item!)
```

---

### 4.2 Reactive State Engine (Simplified Vue 3 Reactivity)

```javascript
function reactive(target, onChange) {
  return new Proxy(target, {
    set(target, prop, value, receiver) {
      const oldValue = target[prop];
      const success = Reflect.set(target, prop, value, receiver);
      if (success && oldValue !== value) {
        onChange(prop, value); // Trigger UI re-render subscriber notification!
      }
      return success;
    }
  });
}

const state = reactive({ count: 0 }, (key, newVal) => {
  console.log(`UI Re-render: State '${key}' changed to ${newVal}`);
});

state.count++; // Trigger UI re-render notification: "State 'count' changed to 1"
```

---

### 4.3 Revocable Proxies (`Proxy.revocable()`)

Creates a Proxy that can be permanently revoked (disabled) on demand:

```javascript
const { proxy, revoke } = Proxy.revocable({ secret: "TOP_SECRET" }, {
  get(target, prop) {
    return target[prop];
  }
});

console.log(proxy.secret); // "TOP_SECRET"

// Revoke access (e.g. when session expires):
revoke();

// Attempts to access proxy after revocation throw TypeError:
// console.log(proxy.secret); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

---

## 5. Minor Points, Quirks & Traps

### 1. Invariant Violations (Proxy Traps Must Respect Non-Configurable Properties)
If a target object property is `writable: false` and `configurable: false`, a Proxy `get` trap MUST return the exact value stored on the target object. Returning a different value throws an un-catchable `TypeError: property is non-configurable`.

---

## 6. Senior Interview Questions & Answers

### Q1: How does Vue 3 use JavaScript `Proxy` to build its Reactive State system, and why is it superior to Vue 2's `Object.defineProperty()`?
* **Answer**: Vue 2 used `Object.defineProperty()` to wrap existing object properties in getters and setters. This required recursively walking objects at initialization time and could not detect newly added properties (`state.newProp = val`) or array index mutations without special helper methods (`Vue.set`). Vue 3 wraps state objects in a JavaScript `Proxy`. The `Proxy` intercepts all dynamic `get` and `set` operations at the object level, allowing Vue 3 to automatically track dependencies and trigger UI re-renders for newly added properties, deleted properties, and array index mutations in $O(1)$ constant time.

### Q2: Why is `Reflect.get(target, prop, receiver)` used inside a Proxy `get` trap instead of `target[prop]`?
* **Answer**: Using `target[prop]` inside a Proxy `get` trap loses the `receiver` context. If `target` has an inherited getter method that references `this`, calling `target[prop]` evaluates `this` as the `target` object rather than the `proxy` instance. Passing the `receiver` argument to `Reflect.get(target, prop, receiver)` guarantees that any getter function invoked on the target evaluates `this` as the `receiver` (the active Proxy instance), preserving correct prototype property delegation.

---

## 7. Summary & Key Takeaways

1. **Proxy**: Wraps a target object to intercept low-level operations (read, write, delete, invoke).
2. **Reflect**: Static mirror object providing matching 1:1 methods for all Proxy traps.
3. **Receiver Preservation**: Use `Reflect.get(target, prop, receiver)` to ensure getters preserve correct `this` binding.
4. **Reactivity**: Proxies form the core engine for reactive state management (Vue 3, MobX).
5. **Revocable Proxies**: Use `Proxy.revocable()` for temporary, revocable security access tokens.
