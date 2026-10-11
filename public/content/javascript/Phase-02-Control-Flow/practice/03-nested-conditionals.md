# Practice Module 03 — Nested Conditionals & Multi-Variable Logic

Solve each of the following 15 problems. Check solutions in `solutions/03-nested-conditionals-solutions.md`.

---

### Problem 1: Bank Withdrawal Verification
Function `processWithdrawal(balance, amount, pinValid)`: Check if `pinValid` is true; if so, check if `amount <= balance`. Return `"SUCCESS"`, `"INSUFFICIENT FUNDS"`, or `"INVALID PIN"`.

### Problem 2: E-Commerce Free Shipping & Discount
Function `calculateShipping(cartTotal, isMember, destination)`: If `isMember` is true, shipping is 0 if `cartTotal >= 30`, else 5. If non-member, 0 if `cartTotal >= 100`, else 10. If international, add 15.

### Problem 3: Multi-Factor Authentication (MFA)
Function `validateLogin(username, password, mfaCode, mfaEnabled)`: Check username and password match. If true, if `mfaEnabled` is true, verify `mfaCode === "123456"`. Return appropriate status string.

### Problem 4: Hotel Room Pricing
Function `getRoomPrice(season, roomType, isVIP)`: Season ("peak", "off-peak"), roomType ("single", "suite"). Apply VIP 20% discount if `isVIP` is true.

### Problem 5: Insurance Premium Risk Rating
Function `getInsuranceRisk(age, smoker, preExisting)`: Calculate risk tier ("Low", "Medium", "High", "Declined").

### Problem 6: Loan Approval Engine
Function `evaluateLoan(creditScore, income, debt)`: Debt-to-income ratio check nested under credit score tiers.

### Problem 7: Flight Boarding Pass Access
Function `canAccessLounge(ticketClass, frequentFlyerStatus, isDelay)`: First class -> true; Business class -> if Gold status; Economy -> if Gold status AND delay > 2 hours.

### Problem 8: Employee Bonus Calculator
Function `calculateBonus(sales, yearsOfService, managerRating)`: Nested evaluation of performance ratings and tenure thresholds.

### Problem 9: Car Rental Eligibility & Surcharge
Function `rentCar(age, hasDriverLicense, needsInsurance)`: Must be licensed and age >= 21. If age < 25, add $25/day young driver surcharge.

### Problem 10: Event Ticket Tiering
Function `getTicketCategory(age, studentID, EarlyBird)`: Determine price based on age, student discount, and early bird status.

### Problem 11: System Permission Guard
Function `checkAccess(role, isOwner, isBanned)`: If `isBanned`, access denied. Admin has all access; User has access if `isOwner`.

### Problem 12: Restaurant Reservation Validation
Function `bookTable(partySize, availableSeats, holdsVipCard)`: Check capacity, party size <= 8 unless VIP card held.

### Problem 13: Course Prerequisite & Overload
Function `canEnroll(completedPrereqs, gpa, courseCredits)`: Must have prereqs. If credits > 18, requires GPA >= 3.5.

### Problem 14: Mobile Data Throttling
Function `getDataSpeed(usageGB, planLimitGB, isPriorityUser)`: If usage <= limit -> "4G Speed". If exceeded, priority users get "3G Speed", others get "2G Speed".

### Problem 15: Tax Audit Selection Trigger
Function `requiresAudit(declaredIncome, claimedDeductions, redFlagsCount)`: Trigger audit if deductions > 50% income OR redFlags >= 2.
