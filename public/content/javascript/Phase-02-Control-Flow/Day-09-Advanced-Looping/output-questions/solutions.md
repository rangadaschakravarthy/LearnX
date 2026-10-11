# Day 09 Output Prediction Solutions

## Q1
- **Predicted Output**: `0 1 2 extra`
- **Explanation**: `for...in` iterates over all enumerable property keys, including array indices (as strings) and non-numeric custom properties like `.extra`.

## Q2
- **Predicted Output**: `JJSS`
- **Explanation**: `for...of` loops over each character of string `'JS'`. In step 1, `'J'.repeat(2)` produces `'JJ'`. In step 2, `'S'.repeat(2)` produces `'SS'`.

## Q3
- **Predicted Output**: `4`
- **Explanation**:
  - `i=0`: `j=0` (count=1), `j=1` (count=2), `j=2` (count=3).
  - `i=1`: `j=0` (count=4), `j=1` triggers `break outer`. The entire outer loop terminates immediately.

## Q4
- **Predicted Output**: `name:Alex`
- **Explanation**: `Object.entries(user)` yields `[['name', 'Alex']]`. The default value `'N/A'` is not used because `value` is defined (`'Alex'`).
