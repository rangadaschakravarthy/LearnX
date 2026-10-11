# Arrays vs Objects in JavaScript

| Feature | Array (`[]`) | Object (`{}`) |
|---|---|---|
| **Primary Purpose** | Ordered list / collection of elements | Key-value mapping / structured entity |
| **Element Access** | Zero-based numeric index (`arr[0]`) | String key (`obj.name` or `obj["name"]`) |
| **Ordering** | Guarantees numerical insertion order | Keys ordered by integer-like keys first, then string keys |
| **Data Format** | Sequence of elements: `[10, 20, 30]` | Property mapping: `{ name: "Alex", age: 22 }` |
| **Type Check** | `Array.isArray(arr) === true` | `typeof obj === "object"` |
