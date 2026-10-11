# String Coercion and Explicit Conversion

## 1. Explicit Conversion via `String()`

The safest way to convert any value to a string is `String(val)`:

```js
String(123);        // "123"
String(true);       // "true"
String(null);       // "null"
String(undefined);  // "undefined"
String([1, 2, 3]);  // "1,2,3"
```

---

## 2. Implicit Coercion with `+` Operator

When the binary `+` operator encounters a string operand, it converts the other operand to a string and concatenates:

```js
"5" + 2;         // "52"
2 + "5";         // "25"
5 + 5 + "5";     // "105" (evaluated left to right: 5+5=10, 10+"5"="105")
"5" + true;      // "5true"
"val: " + null;  // "val: null"
```

---

## 3. Arithmetic Coercion (`-`, `*`, `/`)

Non-plus arithmetic operators force strings into numbers:

```js
"10" - "2";   // 8
"10" * "2";   // 20
"10" / "2";   // 5
"hello" - 2;  // NaN (Not a Number)
```
