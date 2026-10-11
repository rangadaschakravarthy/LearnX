# Array Transformation (map/filter) Cheatsheet

> Quick reference guide for modern JavaScript array manipulation and DSA preparation.

## Key API Matrix

| Method | Purpose | Syntax | Return Value | Mutates Original? |
|---|---|---|---|---|
| `push(...items)` | Adds to end | `arr.push(1, 2)` | New length | **YES** |
| `pop()` | Removes from end | `arr.pop()` | Removed item | **YES** |
| `slice(start, end)` | Extracts section | `arr.slice(0, 3)` | New array | **NO** |
| `splice(s, d, ...i)` | Insert/Delete | `arr.splice(1, 1)` | Deleted items | **YES** |
| `map(fn)` | Transforms elements | `arr.map(x => x*2)` | New array | **NO** |
| `filter(fn)` | Selects elements | `arr.filter(x => x>0)` | New array | **NO** |
| `reduce(fn, init)` | Accumulates | `arr.reduce((a,b)=>a+b,0)` | Accumulator | **NO** |

