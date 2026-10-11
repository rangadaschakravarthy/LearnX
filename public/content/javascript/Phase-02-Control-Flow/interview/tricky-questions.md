# Tricky Interview Questions & Edge Cases

20 high-frequency trick questions asked by top tech companies.

---

## 1. Why does `[] == ![]` evaluate to `true`?
- **Step 1**: `![]` evaluates to `false` because arrays are truthy objects.
- **Step 2**: The expression becomes `[] == false`.
- **Step 3**: Abstract equality coerces `false` to `0`, so `[] == 0`.
- **Step 4**: Object `[]` is converted to primitive string `""`.
- **Step 5**: `""` is coerced to number `0`.
- **Step 6**: `0 == 0` evaluates to `true`!

## 2. Why does `[1, 2, 10].sort()` order numbers as `[1, 10, 2]`?
`.sort()` converts array elements to strings by default! String `"10"` comes before `"2"` lexicographically. To sort numbers, pass a comparison callback: `.sort((a, b) => a - b)`.

## 3. What happens when you use `return` inside a `try...finally` block inside a loop?
The `finally` block ALWAYS executes before returning from the function! If `finally` contains its own `return` statement, it overwrites any previous `return` from `try` or `catch`.

## 4. What is the output of `switch (NaN)` matching `case NaN:`?
It outputs `default`! Switch uses strict equality (`===`), and `NaN === NaN` is `false`.

## 5. What happens when you iterate over an object created with `Object.create(null)`?
It has NO prototype (`Object.prototype`), so calling `obj.hasOwnProperty("key")` throws a `TypeError: obj.hasOwnProperty is not a function`. Always use `Object.prototype.hasOwnProperty.call(obj, key)`.
