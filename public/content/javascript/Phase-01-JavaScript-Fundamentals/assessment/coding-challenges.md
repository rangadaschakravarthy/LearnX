# Phase 1 Assessment: Coding Challenges (20 Problems)

1. **Safe Float Comparator**: Write a function `areFloatsEqual(num1, num2)` that safely compares two floating-point numbers using `Number.EPSILON`.
2. **Universal Type Inspector**: Write a function `getExactType(val)` that returns `"string"`, `"number"`, `"nan"`, `"null"`, `"undefined"`, `"array"`, `"object"`, `"date"`, etc.
3. **Exact Falsy Counter**: Write a function `countFalsyValues(arr)` that iterates through an array and returns the total number of falsy elements.
4. **Deep Object Property Extractor**: Write a function `extractCity(user)` using optional chaining `?.` and nullish coalescing `??` to return `user.address.city` or fallback `"Unknown City"`.
5. **Radix Integer Sum**: Write a function `sumStringIntegers(str1, str2)` that parses string numbers like `"10px"` and `"20em"` using `parseInt(str, 10)` and returns their integer sum.
6. **Increment Evaluator**: Write a script demonstrating the difference between prefix `++x` and postfix `x++` output values.
7. **Strict Mode Variable Safeguard**: Write a function that safely handles potential undeclared variable assignments without crashing under `"use strict"`.
8. **Constant Object Mutator**: Write a function `updateUserProfile(profile, newRole)` that mutates a `const` object property safely without reassigning the variable pointer.
9. **Object Freeze Checker**: Write a function `isObjectFrozen(obj)` that checks if an object is frozen using `Object.isFrozen()`.
10. **Boolean Converter Matrix**: Write a function `toBooleanArray(arr)` that transforms an array of mixed elements into their strict boolean representations (`true`/`false`).
11. **Short-Circuit Default Manager**: Write a function `getTimeout(config)` returning `config.timeout ?? 3000`.
12. **Safe Division Guard**: Write a function `safeDivide(a, b)` that returns `"Cannot divide by zero"` if `b === 0`, or the quotient if valid.
13. **BigInt Range Calculator**: Write a function `addBigIntegers(a, b)` that accepts BigInts or numeric strings and returns their BigInt sum.
14. **Coercion Trace Generator**: Write a function that tests loose equality (`==`) between two inputs and returns an explanation string if their types differ.
15. **Array Subtype Verification**: Write a function `filterArraysOnly(list)` that accepts a list of mixed values and returns an array containing only true array elements using `Array.isArray()`.
16. **Ternary Classifier**: Write a function `classifyAge(age)` returning `"Child"` (< 13), `"Teenager"` (13-19), or `"Adult"` (20+) using ternary expressions.
17. **NaN Validator**: Write a function `containsNaN(arr)` that returns `true` if any element in `arr` is strictly `NaN` using `Number.isNaN()`.
18. **Prefix Prefix Sum**: Write a function `calculatePrefixSequence(val)` that performs `++val` three times and returns the final value.
19. **Template Interpolator**: Write a function `formatUserCard(name, age, role)` returning a formatted template literal string.
20. **Strict Equality Filter**: Write a function `strictCompare(a, b)` returning `true` if both value and type match, or `false` otherwise.
