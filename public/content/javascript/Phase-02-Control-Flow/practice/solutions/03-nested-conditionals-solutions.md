# Solutions — Practice Module 03 (Nested Conditionals)

```javascript
// Problem 1
function processWithdrawal(balance, amount, pinValid) {
  if (!pinValid) return "INVALID PIN";
  if (amount <= balance) return "SUCCESS";
  return "INSUFFICIENT FUNDS";
}

// Problem 2
function calculateShipping(cartTotal, isMember, destination) {
  let fee = 0;
  if (isMember) {
    fee = cartTotal >= 30 ? 0 : 5;
  } else {
    fee = cartTotal >= 100 ? 0 : 10;
  }
  if (destination === 'international') {
    fee += 15;
  }
  return fee;
}

// Problem 3
function validateLogin(username, password, mfaCode, mfaEnabled) {
  if (username !== 'admin' || password !== 'secret') return 'INVALID CREDENTIALS';
  if (mfaEnabled) {
    if (mfaCode === '123456') return 'LOGIN SUCCESSFUL';
    return 'INVALID MFA CODE';
  }
  return 'LOGIN SUCCESSFUL';
}

// Problem 4
function getRoomPrice(season, roomType, isVIP) {
  let base = season === 'peak' ? (roomType === 'suite' ? 300 : 150) : (roomType === 'suite' ? 200 : 100);
  if (isVIP) base *= 0.8;
  return base;
}

// Problem 5
function getInsuranceRisk(age, smoker, preExisting) {
  if (age > 70 && smoker) return 'Declined';
  if (smoker || preExisting) {
    if (age > 50) return 'High';
    return 'Medium';
  }
  return 'Low';
}

// Problem 6
function evaluateLoan(creditScore, income, debt) {
  const dti = debt / income;
  if (creditScore >= 750) {
    return dti <= 0.45 ? 'APPROVED' : 'REJECTED_HIGH_DEBT';
  } else if (creditScore >= 650) {
    return dti <= 0.35 ? 'APPROVED_HIGH_RATE' : 'REJECTED';
  }
  return 'REJECTED';
}

// Problem 7
function canAccessLounge(ticketClass, frequentFlyerStatus, delayHours) {
  if (ticketClass === 'First') return true;
  if (ticketClass === 'Business' && frequentFlyerStatus === 'Gold') return true;
  if (ticketClass === 'Economy' && frequentFlyerStatus === 'Gold' && delayHours > 2) return true;
  return false;
}

// Problem 8
function calculateBonus(sales, yearsOfService, managerRating) {
  if (managerRating < 3) return 0;
  let bonus = sales * 0.05;
  if (yearsOfService >= 5) bonus += 1000;
  if (managerRating === 5) bonus += 500;
  return bonus;
}

// Problem 9
function rentCar(age, hasDriverLicense, needsInsurance) {
  if (!hasDriverLicense || age < 21) return 'INELIGIBLE';
  let dailyRate = 50;
  if (age < 25) dailyRate += 25;
  if (needsInsurance) dailyRate += 15;
  return dailyRate;
}

// Problem 10
function getTicketCategory(age, studentID, earlyBird) {
  if (age < 12) return 10;
  let price = 30;
  if (studentID) price -= 10;
  if (earlyBird) price -= 5;
  return Math.max(price, 10);
}

// Problem 11
function checkAccess(role, isOwner, isBanned) {
  if (isBanned) return false;
  if (role === 'admin') return true;
  if (role === 'user' && isOwner) return true;
  return false;
}

// Problem 12
function bookTable(partySize, availableSeats, holdsVipCard) {
  if (partySize > availableSeats) return 'NO SEATS AVAILABLE';
  if (partySize > 8 && !holdsVipCard) return 'EXCEEDS STANDARD PARTY LIMIT';
  return 'CONFIRMED';
}

// Problem 13
function canEnroll(completedPrereqs, gpa, courseCredits) {
  if (!completedPrereqs) return false;
  if (courseCredits > 18 && gpa < 3.5) return false;
  return true;
}

// Problem 14
function getDataSpeed(usageGB, planLimitGB, isPriorityUser) {
  if (usageGB <= planLimitGB) return '4G Speed';
  if (isPriorityUser) return '3G Speed';
  return '2G Speed';
}

// Problem 15
function requiresAudit(declaredIncome, claimedDeductions, redFlagsCount) {
  if (redFlagsCount >= 2) return true;
  if (claimedDeductions > declaredIncome * 0.5) return true;
  return false;
}
```
