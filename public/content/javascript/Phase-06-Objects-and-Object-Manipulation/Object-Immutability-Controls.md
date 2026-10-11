# Object Immutability Controls: Freeze, Seal, and PreventExtensions

JavaScript provides 3 built-in methods to restrict object modification at an introductory level:

---

## 🔄 Restriction Matrix

| Method | Can Add Properties? | Can Delete Properties? | Can Modify Existing Property Values? |
|---|---|---|---|
| `Object.preventExtensions(obj)` | **NO** | YES | YES |
| `Object.seal(obj)` | **NO** | **NO** | YES |
| `Object.freeze(obj)` | **NO** | **NO** | **NO** |

---

## 💡 Code Demonstration

```js
const config = { theme: "dark", level: 1 };
Object.freeze(config);

config.theme = "light"; // Fails silently in non-strict mode!
console.log(config.theme); // "dark"

console.log("Is frozen?:", Object.isFrozen(config)); // true
```

> ⚠️ **Note:** All 3 methods perform **shallow** immutability. Nested objects inside a frozen object are NOT automatically frozen.
