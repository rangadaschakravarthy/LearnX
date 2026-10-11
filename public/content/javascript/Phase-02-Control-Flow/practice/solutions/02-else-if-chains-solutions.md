# Solutions — Practice Module 02 (Else-If Chains)

```javascript
// Problem 1
function getLetterGrade(score) {
  if (score >= 90) return 'A';
  else if (score >= 80) return 'B';
  else if (score >= 70) return 'C';
  else if (score >= 60) return 'D';
  else return 'F';
}

// Problem 2
function getBMICategory(weight, height) {
  const bmi = weight / (height * height);
  if (bmi < 18.5) return 'Underweight';
  else if (bmi < 25) return 'Normal';
  else if (bmi < 30) return 'Overweight';
  else return 'Obese';
}

// Problem 3
function getAgeStage(age) {
  if (age < 2) return 'Baby';
  else if (age < 13) return 'Child';
  else if (age < 20) return 'Teenager';
  else if (age < 65) return 'Adult';
  else return 'Senior';
}

// Problem 4
function getTrafficAction(color) {
  const c = color.toLowerCase();
  if (c === 'red') return 'Stop';
  else if (c === 'yellow') return 'Caution';
  else if (c === 'green') return 'Go';
  else return 'Invalid';
}

// Problem 5
function calculateTax(income) {
  if (income <= 10000) return 0;
  else if (income <= 50000) return income * 0.10;
  else if (income <= 100000) return income * 0.20;
  else return income * 0.30;
}

// Problem 6
function fizzBuzzCheck(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  else if (n % 3 === 0) return 'Fizz';
  else if (n % 5 === 0) return 'Buzz';
  else return String(n);
}

// Problem 7
function getShippingFee(weightKg) {
  if (weightKg <= 2) return 5;
  else if (weightKg <= 5) return 10;
  else if (weightKg <= 10) return 15;
  else return 25;
}

// Problem 8
function getQuadrant(x, y) {
  if (x > 0 && y > 0) return 'Q1';
  else if (x < 0 && y > 0) return 'Q2';
  else if (x < 0 && y < 0) return 'Q3';
  else if (x > 0 && y < 0) return 'Q4';
  else return 'Axis';
}

// Problem 9
function isMovieAllowed(rating, age) {
  if (rating === 'G') return true;
  else if (rating === 'PG') return true;
  else if (rating === 'PG-13') return age >= 13;
  else if (rating === 'R') return age >= 17;
  else return false;
}

// Problem 10
function getCreditTier(score) {
  if (score >= 800) return 'Excellent';
  else if (score >= 740) return 'Very Good';
  else if (score >= 670) return 'Good';
  else if (score >= 580) return 'Fair';
  else return 'Poor';
}

// Problem 11
function getSeason(month) {
  if (month === 12 || month === 1 || month === 2) return 'Winter';
  else if (month >= 3 && month <= 5) return 'Spring';
  else if (month >= 6 && month <= 8) return 'Summer';
  else if (month >= 9 && month <= 11) return 'Autumn';
  else return 'Invalid';
}

// Problem 12
function classifyTriangle(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0 || (a + b <= c) || (a + c <= b) || (b + c <= a)) return 'Invalid';
  if (a === b && b === c) return 'Equilateral';
  else if (a === b || b === c || a === c) return 'Isosceles';
  else return 'Scalene';
}

// Problem 13
function getDiscountPercent(code) {
  if (code === 'SAVE10') return 10;
  else if (code === 'SAVE20') return 20;
  else if (code === 'SAVE30') return 30;
  else return 0;
}

// Problem 14
function getDayCategory(dayNum) {
  if (dayNum >= 1 && dayNum <= 5) return 'Weekday';
  else if (dayNum === 6 || dayNum === 7) return 'Weekend';
  else return 'Invalid';
}

// Problem 15
function getWaterState(tempC) {
  if (tempC <= 0) return 'Solid (Ice)';
  else if (tempC < 100) return 'Liquid (Water)';
  else return 'Gas (Steam)';
}
```
