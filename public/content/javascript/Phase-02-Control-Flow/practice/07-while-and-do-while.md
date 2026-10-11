# Practice Module 07 — `while` and `do...while` Loops

Solve each of the following 15 problems using `while` or `do...while` loops. Check solutions in `solutions/07-while-and-do-while-solutions.md`.

---

### Problem 1: Digit Count
Function `countDigits(n)` returns total number of digits in positive integer `n` using integer division (`n = Math.floor(n / 10)`).

### Problem 2: Digit Sum
Function `sumDigits(n)` returns sum of digits of non-negative integer `n`.

### Problem 3: Number Reversal
Function `reverseInteger(n)` reverses numeric digits e.g. `1234` -> `4321`.

### Problem 4: Palindrome Integer Check
Function `isPalindromeNumber(n)` checks if integer reads same forward and backward.

### Problem 5: Collatz Sequence Length
Function `collatzLength(n)` counts steps to reach 1 (if even: `n/2`, if odd: `3n+1`).

### Problem 6: Greatest Common Divisor (GCD)
Function `findGCD(a, b)` implements Euclidean algorithm using `while(b !== 0)`.

### Problem 7: Least Common Multiple (LCM)
Function `findLCM(a, b)` uses GCD formula `(a * b) / GCD(a, b)`.

### Problem 8: Input Validator Simulation
Function `validatePasswordSimulation(attempts)` simulates `do...while` loop checking until valid password `"secret123"` is provided.

### Problem 9: Binary Converter
Function `toBinaryString(n)` converts non-negative integer `n` to binary string representation using repeated modulo 2 and division.

### Problem 10: Square Root Floor (Integer Math)
Function `integerSquareRoot(n)` calculates `floor(sqrt(n))` using `while` loop incrementing `i * i <= n`.

### Problem 11: ATM Pin Entry Lockdown (Max 3 Tries)
Function `simulateAtmPin(inputPins, correctPin)` uses `do...while` to check pins up to 3 attempts.

### Problem 12: Guessing Game Step Counter
Function `countGuessesToTarget(target, stepSize)` counts iterations required to reach or exceed `target`.

### Problem 13: Power of Two Verifier
Function `isPowerOfTwoWhile(n)` checks if `n > 0` is exact power of two by dividing by 2 repeatedly.

### Problem 14: Compound Interest Double Time
Function `yearsToDoubleInvestment(principal, annualRate)` calculates years needed to double principal using compound interest loop.

### Problem 15: String Substring Search via Pointer
Function `findSubstringPointer(text, pattern)` finds index using manual pointer increment inside `while` loop.
