# Day 07 Output Prediction Solutions

### Question 1
```text
"B"
"C"
```
**Explanation:** `case 2` matches and prints `"B"`. Because `case 2` omits a `break` statement, execution falls through into `case 3` and prints `"C"` before hitting `break;`.

---

### Question 2
```text
"Default Matched"
```
**Explanation:** Switch case string comparison is strictly case-sensitive. `"admin" === "Admin"` is `false`, triggering `default`.

---

### Question 3
```text
"String 5"
```
**Explanation:** Switch case matching evaluates using strict equality (`===`). String `"5"` === Number `5` is `false`, whereas String `"5"` === String `"5"` is `true`.

---

### Question 4
```text
"Second"
```
**Explanation:** `switch (true)` matches `true === (5 === 5)`, executing the second case.
