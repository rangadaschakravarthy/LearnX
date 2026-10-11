# Solutions — Practice Module 04 (Ternary Operator)

```javascript
// Problem 1
function getMin(a, b) {
  return a < b ? a : b;
}

// Problem 2
function getAdultMessage(age) {
  return age >= 18 ? "Adult" : "Minor";
}

// Problem 3
function getOddEvenLabel(n) {
  return n % 2 === 0 ? "Even" : "Odd";
}

// Problem 4
function formatItemCount(count, singularWord) {
  return `${count} ${singularWord}${count === 1 ? '' : 's'}`;
}

// Problem 5
function absTernary(n) {
  return n < 0 ? -n : n;
}

// Problem 6
function getDisplayName(name) {
  return name ? name : "Guest";
}

// Problem 7
function ratePerformance(score) {
  return score >= 80 ? "High" : score >= 50 ? "Medium" : "Low";
}

// Problem 8
function toggleStatus(current) {
  return current === "inactive" ? "active" : "inactive";
}

// Problem 9
function applyDiscount(price, isMember) {
  return isMember ? price * 0.85 : price;
}

// Problem 10
function classifySign(n) {
  return n > 0 ? "Positive" : n < 0 ? "Negative" : "Zero";
}

// Problem 11
function getThemeClass(isDarkMode) {
  return isDarkMode ? "theme-dark" : "theme-light";
}

// Problem 12
function quickShipping(orderAmount) {
  return orderAmount >= 50 ? 0 : 5.99;
}

// Problem 13
function getGreeting(user) {
  return user && user.name ? `Welcome back, ${user.name}` : "Please sign in";
}

// Problem 14
function isLeapYearTernary(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? true : false;
}

// Problem 15
function safeDivide(a, b) {
  return b !== 0 ? a / b : null;
}
```
