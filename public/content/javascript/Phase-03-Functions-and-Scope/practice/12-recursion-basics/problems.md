# 12. Recursion Basics Practice

> Practice problems covering 12. Recursion Basics Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Recursive Factorial
**Description:** Write `factorial(n)` recursively. Handle base case `n <= 1` returning 1 and invalid negative inputs.

**Expected Behavior / Test:**
```js
factorial(5) // 120
```

---

## Problem 2: Recursive Fibonacci Sequence
**Description:** Write `fibonacci(n)` returning the nth Fibonacci number (`fib(0)=0, fib(1)=1`).

**Expected Behavior / Test:**
```js
fibonacci(7) // 13
```

---

## Problem 3: Recursive Sum of Array
**Description:** Write `sumArray(arr)` returning the sum of array elements recursively by splitting head and tail.

**Expected Behavior / Test:**
```js
sumArray([1, 2, 3, 4]) // 10
```

---

## Problem 4: Recursive Power Function (`pow(base, exp)`)
**Description:** Write `pow(base, exp)` recursively for non-negative integer exponents.

**Expected Behavior / Test:**
```js
pow(2, 3) // 8
```

---

## Problem 5: Recursive String Reverse
**Description:** Write `reverseString(str)` returning the reversed string recursively.

**Expected Behavior / Test:**
```js
reverseString("hello") // "olleh"
```

---

## Problem 6: Recursive Countdown Array
**Description:** Write `countdown(n)` returning array `[n, n-1, ..., 1]` recursively.

**Expected Behavior / Test:**
```js
countdown(5) // [5, 4, 3, 2, 1]
```

---

## Problem 7: Recursive Range Generator
**Description:** Write `rangeOfNumbers(start, end)` returning array of integers from `start` to `end` inclusive.

**Expected Behavior / Test:**
```js
rangeOfNumbers(2, 5) // [2, 3, 4, 5]
```

---

## Problem 8: Recursive Palindrome Check
**Description:** Write `isPalindrome(str)` returning `true` if string reads same forward and backward recursively ignoring spaces/case.

**Expected Behavior / Test:**
```js
isPalindrome("racecar") // true
```

---

## Problem 9: Recursive Count Occurrences
**Description:** Write `countOccurrences(arr, target)` counting occurrences of `target` in flat array recursively.

**Expected Behavior / Test:**
```js
countOccurrences([1, 2, 1, 3, 1], 1) // 3
```

---

## Problem 10: Recursive Greatest Common Divisor (GCD)
**Description:** Write `gcd(a, b)` using Euclidean algorithm recursively.

**Expected Behavior / Test:**
```js
gcd(48, 18) // 6
```

---

## Problem 11: Recursive Sum of Digits
**Description:** Write `sumOfDigits(n)` summing all digits of positive integer `n` recursively (`sumOfDigits(123) = 6`).

**Expected Behavior / Test:**
```js
sumOfDigits(123) // 6
```

---

## Problem 12: Recursive Check Array Sorted
**Description:** Write `isSorted(arr)` returning `true` if array of numbers is sorted in ascending order.

**Expected Behavior / Test:**
```js
isSorted([1, 2, 3]) // true
```

---

## Problem 13: Recursive Binary Search
**Description:** Write `binarySearch(arr, target, low, high)` finding target index in sorted array recursively.

**Expected Behavior / Test:**
```js
binarySearch([10, 20, 30], 20, 0, 2) // 1
```

---

## Problem 14: Recursive Flatten Single Level
**Description:** Write `flattenOneLevel(arr)` flattening 1 level of array nesting recursively.

**Expected Behavior / Test:**
```js
flattenOneLevel([1, [2, 3], 4]) // [1, 2, 3, 4]
```

---

## Problem 15: Maximum Stack Call Depth Limit
**Description:** Write a recursive function without base case to observe `RangeError: Maximum call stack size exceeded`.

**Expected Behavior / Test:**
```js
causeStackOverflow()
```

---

