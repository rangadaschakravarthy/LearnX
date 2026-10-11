# Solutions — Practice Module 01 (Simple Conditions)

```javascript
// Problem 1
function isEven(n) {
  return n % 2 === 0;
}

// Problem 2
function checkSign(n) {
  if (n > 0) return "Positive";
  if (n < 0) return "Negative";
  return "Zero";
}

// Problem 3
function canVote(age) {
  return age >= 18;
}

// Problem 4
function findMax(a, b) {
  if (a > b) return a;
  return b;
}

// Problem 5
function checkPass(score) {
  if (score >= 50) return "Pass";
  return "Fail";
}

// Problem 6
function isMultipleOfFive(n) {
  return n % 5 === 0;
}

// Problem 7
function getAbsoluteValue(n) {
  if (n < 0) return -n;
  return n;
}

// Problem 8
function isNewCentury(year) {
  return year >= 2001;
}

// Problem 9
function hasContent(str) {
  if (typeof str === 'string' && str.length > 0) return true;
  return false;
}

// Problem 10
function areStrictlyEqual(a, b) {
  return a === b;
}

// Problem 11
function checkSpeed(speed) {
  if (speed > 60) return "FINE APPLIED";
  return "OK";
}

// Problem 12
function checkFreezing(celsius) {
  if (celsius <= 0) return "FREEZING";
  return "NORMAL";
}

// Problem 13
function isCenturyYear(year) {
  return year % 100 === 0;
}

// Problem 14
function isSingleDigit(n) {
  return n >= -9 && n <= 9;
}

// Problem 15
function isValidHumanAge(age) {
  return age >= 0 && age <= 120;
}
```
