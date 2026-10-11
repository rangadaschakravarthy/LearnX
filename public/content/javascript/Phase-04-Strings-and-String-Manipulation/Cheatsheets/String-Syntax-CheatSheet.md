# String Syntax & Literals Cheatsheet

> Quick reference guide for modern JavaScript string manipulation.

## Key API Matrix

| Method | Purpose | Syntax | Return Value | Mutates Original? |
|---|---|---|---|---|
| `slice(start, end)` | Extracts section | `str.slice(0, 5)` | New string | No |
| `split(sep)` | Splits into array | `str.split(" ")` | Array of strings | No |
| `replace(a, b)` | Replaces first match | `str.replace("a", "b")` | New string | No |
| `trim()` | Removes whitespace | `str.trim()` | New string | No |

*Note: Strings in JavaScript are immutable; NO string method mutates the original string!*
