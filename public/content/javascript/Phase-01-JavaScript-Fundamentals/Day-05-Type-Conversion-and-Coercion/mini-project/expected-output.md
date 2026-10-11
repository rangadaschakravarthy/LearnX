# Day 05 Mini-Project Expected Output

When evaluating `"5"` and `2`:
- `String(val1)`: `"5"`
- `Number(val1)`: `5`
- `Boolean(val1)`: `true` (Truthy)
- `val1 + val2`: `"52"` (string concatenation)
- `val1 - val2`: `3` (numeric subtraction)
- `val1 == val2`: `false`
- `val1 === val2`: `false`

When evaluating `0` and `false`:
- `val1 == val2`: `true` (Loose coercion)
- `val1 === val2`: `false` (Strict types differ: number vs boolean)
