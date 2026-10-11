# Practice Module 02 — Else-If Chains & Ordering

Solve each of the following 15 problems. Check solutions in `solutions/02-else-if-chains-solutions.md`.

---

### Problem 1: Grade Calculator
Map numeric score (0-100) to letters: `>=90` -> 'A', `>=80` -> 'B', `>=70` -> 'C', `>=60` -> 'D', `<60` -> 'F'.

### Problem 2: BMI Category
Calculate BMI (`weight / (height * height)`) and return: `<18.5` -> "Underweight", `<25` -> "Normal", `<30` -> "Overweight", `>=30` -> "Obese".

### Problem 3: Age Classifier
Map age to stage: `<2` -> "Baby", `<13` -> "Child", `<20` -> "Teenager", `<65` -> "Adult", `>=65` -> "Senior".

### Problem 4: Traffic Signal Action
Map color string to action: "red" -> "Stop", "yellow" -> "Caution", "green" -> "Go", any other -> "Invalid".

### Problem 5: Tax Bracket Calculator
Given income: `<=10000` -> 0%, `<=50000` -> 10%, `<=100000` -> 20%, `>100000` -> 30%. Return tax amount.

### Problem 6: FizzBuzz Single Check
Given integer `n`: divisible by 3 and 5 -> "FizzBuzz", divisible by 3 -> "Fizz", divisible by 5 -> "Buzz", else return `String(n)`.

### Problem 7: Shipping Fee Estimator
Given package weight in kg: `<=2` -> $5, `<=5` -> $10, `<=10` -> $15, `>10` -> $25.

### Problem 8: Quadrant Identifier
Given `(x, y)` coordinates: `x>0,y>0` -> Q1, `x<0,y>0` -> Q2, `x<0,y<0` -> Q3, `x>0,y<0` -> Q4, else "Axis".

### Problem 9: Movie Rating Suitability
Given PG rating code ("G", "PG", "PG-13", "R") and viewer age, check if allowed (`true`/`false`).

### Problem 10: Credit Score Rating
Credit score: `>=800` -> "Excellent", `>=740` -> "Very Good", `>=670` -> "Good", `>=580` -> "Fair", `<580` -> "Poor".

### Problem 11: Season Estimator
Given month number (1-12): 12, 1, 2 -> "Winter"; 3, 4, 5 -> "Spring"; 6, 7, 8 -> "Summer"; 9, 10, 11 -> "Autumn".

### Problem 12: Triangle Classifier
Given 3 side lengths: invalid side length -> "Invalid", 3 equal -> "Equilateral", 2 equal -> "Isosceles", all different -> "Scalene".

### Problem 13: Discount Code Tier
Given code ("SAVE10", "SAVE20", "SAVE30"), return percentage discount (10, 20, 30) or 0 for invalid.

### Problem 14: Day of Week Classifier
Given day number (1-7): 1-5 -> "Weekday", 6-7 -> "Weekend", else "Invalid".

### Problem 15: Water State at Pressure
Given temperature in Celsius at sea level: `<=0` -> "Solid (Ice)", `<100` -> "Liquid (Water)", `>=100` -> "Gas (Steam)".
