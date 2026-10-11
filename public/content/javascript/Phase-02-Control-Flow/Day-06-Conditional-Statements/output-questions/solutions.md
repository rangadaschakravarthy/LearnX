# Day 06 Output Prediction Solutions

### Question 1
```text
"Branch B"
```
**Explanation:** `0` is a falsy value, so the `if` condition evaluates to `false`, executing the `else` branch.

---

### Question 2
```text
"Denied"
```
**Explanation:** `age > 18` evaluates `18 > 18`, which is `false`. Because strict inequality `>` was used instead of `>=`, 18 fails the test.

---

### Question 3
```text
"Pass C"
```
**Explanation:** In an `else if` chain, evaluation stops at the FIRST matching condition. Since `85 >= 60` is `true`, `"Pass C"` prints and subsequent `else if` branches are skipped.

---

### Question 4
```text
"Greater"
```
**Explanation:** `10 > 5` evaluates to `true`, returning `"Greater"`.

---

### Question 5
```text
"Falsy"
```
**Explanation:** `null` is one of JavaScript's 8 falsy values.
