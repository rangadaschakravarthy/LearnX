# Object Problem-Solving Framework

Follow this systematic 14-step framework when solving any object-based algorithm or data manipulation problem:

---

## 📋 The 14-Question Object Matrix

1. **What does a single object represent?** Entity profile, key-value record, dictionary, or lookup map?
2. **Is the input a single object or an array of objects?** Single object lookup vs array iteration.
3. **Are keys static or dynamic?** Use dot notation (`obj.name`) vs bracket notation (`obj[dynamicKey]`).
4. **Is property checking needed?** Use `in` or `Object.hasOwn(obj, key)` instead of `obj[key] !== undefined`.
5. **Do I need all keys, values, or entries?** `Object.keys()`, `Object.values()`, or `Object.entries()`.
6. **Do I need to convert entries back to an object?** Use `Object.fromEntries(entriesArray)`.
7. **Is property selection or removal needed?** Destructuring (`const { removeKey, ...rest } = obj`).
8. **Is property overwriting required?** Spread operator (`{ ...defaultConfig, ...userConfig }`).
9. **Is deep nesting involved?** Use optional chaining (`user?.address?.city`).
10. **Is fallback handling required?** Use nullish coalescing (`value ?? defaultValue`).
11. **Do I need frequency counting or grouping?** Use object accumulator (`acc[key] = (acc[key] || 0) + 1`).
12. **Is JSON serialization required?** Use `JSON.stringify()` and `JSON.parse()`.
13. **Is in-place mutation allowed?** Mutate in-place vs return new spread copy.
14. **What are the boundary edge cases?** Empty object `{}`, missing properties, `null` values, nested undefined.

---

## 🔄 Algorithm Lifecycle
```text
Understand Structure -> Choose Access Strategy -> Plan Traversal -> Perform Transformation -> Guard Edge Cases -> Verify Complexity
```
