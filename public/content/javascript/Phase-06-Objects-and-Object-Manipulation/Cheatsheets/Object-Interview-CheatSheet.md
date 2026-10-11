# Object Technical Interview Cheatsheet

> Quick reference guide for modern JavaScript object manipulation.

## Key API Matrix

| Method / Syntax | Purpose | Example | Return Value |
|---|---|---|---|
| `Object.keys(obj)` | Gets property names | `Object.keys({a:1})` | `["a"]` |
| `Object.values(obj)` | Gets property values | `Object.values({a:1})` | `[1]` |
| `Object.entries(obj)` | Gets [key, val] pairs | `Object.entries({a:1})` | `[["a", 1]]` |
| `Object.fromEntries(e)` | Converts entries to obj | `Object.fromEntries([["a", 1]])` | `{a: 1}` |
| `Object.hasOwn(obj, k)` | Checks own property | `Object.hasOwn(user, "name")` | `boolean` |
| `JSON.stringify(obj)` | Converts obj to JSON | `JSON.stringify({a:1})` | string |
| `JSON.parse(str)` | Converts JSON to obj | `JSON.parse('{"a":1}')` | object |

