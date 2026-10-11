# Practice Module 10 — Mixed Problem Solving Challenge

Solve each of the following 15 comprehensive problem challenges. Check solutions in `solutions/10-mixed-solutions.md`.

---

### Problem 1: Inventory Re-Stock Warning Engine
Function `checkInventoryAlerts(stock)` takes object of item quantities, flags items `< 5` with `"REORDER NOW"`, items `0` with `"OUT OF STOCK"`, else `"IN STOCK"`.

### Problem 2: E-Commerce Tax & Tier Calculator
Function `calculateInvoice(items, countryCode)`: items array `[{ name, price, qty }]`. Sum line items, apply VAT based on country (`"US"` -> 0%, `"UK"` -> 20%, `"DE"` -> 19%), apply free shipping if subtotal > 100.

### Problem 3: Multi-User Access Evaluator
Function `evalUserAccess(users)`: takes array of user objects, returns array of user names permitted for admin panel based on role, active state, and MFA status.

### Problem 4: Grade Distribution Histogram
Function `buildGradeHistogram(scores)`: count scores falling into `90-100`, `80-89`, `70-79`, `60-69`, `<60`.

### Problem 5: Financial Compound Return Planner
Function `planSavings(initial, monthlyDeposit, annualRatePercent, months)`: returns final balance formatted to 2 decimals.

### Problem 6: Matrix Boundary Sum
Function `sumMatrixBoundary(matrix)`: sum outer ring elements of N x M grid.

### Problem 7: Game High Score Leaderboard Filter
Function `getTopThreeScores(scores)`: sort and return top 3 scores without mutating input array.

### Problem 8: Nested Category Tree Flattener
Function `flattenCategories(categories)`: recursively extract all category names from nested category tree objects.

### Problem 9: Password Complexity Validator
Function `validatePassword(password)`: check length >= 8, contains uppercase, lowercase, digit, special character.

### Problem 10: Shopping Cart Coupon Processor
Function `applyCartCoupons(cart, coupons)`: calculate final cart price applying valid percentage/flat coupons.

### Problem 11: Spiral Matrix Traversal Pattern
Function `getSpiralOrder(matrix)`: traverse N x M matrix in spiral order (clockwise).

### Problem 12: Customer Retention Churn Risk Assessor
Function `assessChurnRisk(customer)`: calculate risk score based on days inactive, ticket count, refund count.

### Problem 13: Time Log Total Calculator
Function `calculateWorkHours(log)`: sum hours across weekdays, flagging over-time hours (> 8h/day).

### Problem 14: Palindrome Substring Finder
Function `findLongestPalindromeSubstring(str)`: return longest palindrome substring.

### Problem 15: Task Schedule Conflict Detector
Function `hasScheduleConflict(tasks)`: takes array of `{ start: 9, end: 11 }` time intervals, returns `true` if any overlap.
