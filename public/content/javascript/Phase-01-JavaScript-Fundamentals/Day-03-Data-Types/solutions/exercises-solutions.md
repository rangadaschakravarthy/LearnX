# Day 03 Exercises Solutions

## Exercise 1 (🟢 Easy): Type Identification
```javascript
// TODO 1: typeof "123" -> "string"
// TODO 2: typeof 123n  -> "bigint"
// TODO 3: typeof null  -> "object" (Legacy bug)
// TODO 4: typeof []    -> "object"
// TODO 5: typeof NaN   -> "number"
```

---

## Exercise 2 (🟡 Medium): Primitive vs Reference Cloning Solution
```javascript
"use strict";

const initialSetting = {
  theme: "dark",
  user: {
    name: "Alex",
    permissions: ["read", "write"]
  }
};

// Fix: Perform deep clone so nested objects do not retain shared heap references
function cloneAndModifyUser(settings, newName) {
  const deepCopy = JSON.parse(JSON.stringify(settings)); // or structuredClone(settings)
  deepCopy.user.name = newName;
  return deepCopy;
}

const updatedSetting = cloneAndModifyUser(initialSetting, "Alexander");

console.log("Original User Name:", initialSetting.user.name); // "Alex"
console.log("Updated User Name:", updatedSetting.user.name);  // "Alexander"
```

---

## Exercise 3 (🔴 Challenge): Universal Type Detector Solution
```javascript
"use strict";

function getExactType(value) {
  if (Number.isNaN(value)) return "nan";
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

console.log(getExactType("Hello"));     // "string"
console.log(getExactType(100));         // "number"
console.log(getExactType(NaN));         // "nan"
console.log(getExactType(null));        // "null"
console.log(getExactType([1, 2, 3]));   // "array"
console.log(getExactType(new Date()));  // "date"
console.log(getExactType(/abc/));       // "regexp"
```
