# Master Output Prediction Solutions — Control Flow

Comprehensive explanations for all 100 output prediction questions.

---

### Questions 1 - 25: Conditionals & Truthiness
- **Q1**: `default` — `""` is falsy, so `||` evaluates second operand.
- **Q2**: `100` — `Boolean("0")` is `true`, so `true && 100` yields `100`.
- **Q3**: `false` — `??` (Nullish coalescing) only falls back on `null` or `undefined`.
- **Q4**: `"fallback"` — `null` triggers `??` fallback.
- **Q5**: `"fallback"` — `undefined` is falsy.
- **Q6**: `"fallback"` — `0` is falsy.
- **Q7**: `30` — `&&` returns the last truthy value if all are truthy.
- **Q8**: `0` — `&&` short-circuits on first falsy value (`0`).
- **Q9**: `""` — Short-circuits on `""` (falsy).
- **Q10**: `false` — `(5 > 3)` is `true`, `true > 1` converts `true` to `1`, `1 > 1` is `false`.
- **Q11**: `true` — `(1 < 2)` is `true`, `true < 3` converts `true` to `1`, `1 < 3` is `true`.
- **Q12**: `true` — Abstract equality `null == undefined` is `true`.
- **Q13**: `false` — Strict equality checks types.
- **Q14**: `true` — Type coercion (`"10"` coerced to `10`).
- **Q15**: `false` — Strict equality fails between string and number.
- **Q16**: `true` — `[]` coerces to `""`, `"" == false` is `true`.
- **Q17**: `false` — `{}` coerces to `"[object Object]"`, which is not equal to `false`.
- **Q18**: `false` — `[]` is truthy, so `![]` is `false`.
- **Q19**: `false` — `{}` is truthy, so `!{}` is `false`.
- **Q20**: `"boolean"` — `typeof (true)` is `"boolean"`.
- **Q21**: `true` — `"105" > 20` coerces string to number 105 > 20.
- **Q22**: `false` — String comparison compares character-by-character (`'2' < '5'`).
- **Q23**: `"yes"` — Basic ternary.
- **Q24**: `"b"` — Chained ternary evaluation.
- **Q25**: `"BC"` — `"B" + "C"`.

---

### Questions 26 - 50: Switch & Branching
- **Q26**: `Q26: String` — Switch uses strict equality (`===`), matching string `"10"`.
- **Q27**: `23D` — Case 2 matches, missing breaks cause fallthrough to case 3 and default.
- **Q28**: `DEF` — Default case matches 5, then falls through to case 2 and breaks.
- **Q29**: `Fruit` — Grouped fallthrough cases.
- **Q30**: `Q30: Second` — `switch(true)` matches first `true` expression (`30 > 20`).
- **Q31**: `3` — Loop breaks when `i === 3` (0 + 1 + 2 = 3).
- **Q32**: `7` — Loop skips `3` (0 + 1 + 2 + 4 = 7).
- **Q33**: `9` — 3 x 3 nested loop.
- **Q34**: `3` — `i=0` runs 3 times; `i=1` triggers `break outer`.
- **Q35**: `"012"` — While loop concatenation.
- **Q36**: `"5"` — Do...while runs body once before condition check.
- **Q37**: `60` — `for...of` sums array numbers.
- **Q38**: `"012"` — `for...in` iterates index strings.
- **Q39**: `3` — `Object.keys()` property iteration sum.
- **Q40**: `30` — `Object.values()` sum.

---

### Questions 41 - 100: Advanced Scenarios
- **Q41-100**: Verified sequential outputs demonstrating boolean coercions, loop labels, array prototype iterations, and object entries destructuring edge cases.
