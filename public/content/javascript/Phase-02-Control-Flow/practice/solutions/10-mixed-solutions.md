# Solutions — Practice Module 10 (Mixed Problem Solving Challenge)

```javascript
// Problem 1
function checkInventoryAlerts(stock) {
  const alerts = {};
  for (const [item, count] of Object.entries(stock)) {
    if (count === 0) alerts[item] = "OUT OF STOCK";
    else if (count < 5) alerts[item] = "REORDER NOW";
    else alerts[item] = "IN STOCK";
  }
  return alerts;
}

// Problem 2
function calculateInvoice(items, countryCode) {
  let subtotal = 0;
  for (const item of items) {
    subtotal += item.price * item.qty;
  }
  let taxRate = 0;
  if (countryCode === 'UK') taxRate = 0.20;
  else if (countryCode === 'DE') taxRate = 0.19;

  const tax = subtotal * taxRate;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    shipping,
    total: Number(total.toFixed(2))
  };
}

// Problem 3
function evalUserAccess(users) {
  const allowed = [];
  for (const user of users) {
    if (user.isActive && user.mfaEnabled && (user.role === 'admin' || user.role === 'superadmin')) {
      allowed.push(user.name);
    }
  }
  return allowed;
}

// Problem 4
function buildGradeHistogram(scores) {
  const histogram = { '90-100': 0, '80-89': 0, '70-79': 0, '60-69': 0, '<60': 0 };
  for (const score of scores) {
    if (score >= 90) histogram['90-100']++;
    else if (score >= 80) histogram['80-89']++;
    else if (score >= 70) histogram['70-79']++;
    else if (score >= 60) histogram['60-69']++;
    else histogram['<60']++;
  }
  return histogram;
}

// Problem 5
function planSavings(initial, monthlyDeposit, annualRatePercent, months) {
  let balance = initial;
  const monthlyRate = annualRatePercent / 100 / 12;
  for (let m = 1; m <= months; m++) {
    balance += monthlyDeposit;
    balance += balance * monthlyRate;
  }
  return Number(balance.toFixed(2));
}

// Problem 6
function sumMatrixBoundary(matrix) {
  if (matrix.length === 0) return 0;
  const rows = matrix.length;
  const cols = matrix[0].length;
  let sum = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
        sum += matrix[r][c];
      }
    }
  }
  return sum;
}

// Problem 7
function getTopThreeScores(scores) {
  const sorted = [...scores].sort((a, b) => b - a);
  return sorted.slice(0, 3);
}

// Problem 8
function flattenCategories(categories) {
  let names = [];
  for (const cat of categories) {
    names.push(cat.name);
    if (cat.subcategories && cat.subcategories.length > 0) {
      names = names.concat(flattenCategories(cat.subcategories));
    }
  }
  return names;
}

// Problem 9
function validatePassword(password) {
  if (password.length < 8) return false;
  let hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;
  const specials = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  for (const char of password) {
    if (char >= 'A' && char <= 'Z') hasUpper = true;
    else if (char >= 'a' && char <= 'z') hasLower = true;
    else if (char >= '0' && char <= '9') hasDigit = true;
    else if (specials.includes(char)) hasSpecial = true;
  }
  return hasUpper && hasLower && hasDigit && hasSpecial;
}

// Problem 10
function applyCartCoupons(cart, coupons) {
  let total = 0;
  for (const item of cart) total += item.price * item.qty;
  for (const coupon of coupons) {
    if (coupon.type === 'percent') total *= (1 - coupon.value / 100);
    else if (coupon.type === 'flat') total -= coupon.value;
  }
  return Math.max(total, 0);
}

// Problem 11
function getSpiralOrder(matrix) {
  if (matrix.length === 0) return [];
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col++) result.push(matrix[top][col]);
    top++;
    for (let row = top; row <= bottom; row++) result.push(matrix[row][right]);
    right--;
    if (top <= bottom) {
      for (let col = right; col >= left; col--) result.push(matrix[bottom][col]);
      bottom--;
    }
    if (left <= right) {
      for (let row = bottom; row >= top; row--) result.push(matrix[row][left]);
      left++;
    }
  }
  return result;
}

// Problem 12
function assessChurnRisk(customer) {
  let riskScore = 0;
  if (customer.daysInactive > 60) riskScore += 50;
  else if (customer.daysInactive > 30) riskScore += 25;

  if (customer.supportTickets > 5) riskScore += 30;
  if (customer.refunds > 2) riskScore += 20;

  if (riskScore >= 70) return "HIGH RISK";
  if (riskScore >= 40) return "MEDIUM RISK";
  return "LOW RISK";
}

// Problem 13
function calculateWorkHours(log) {
  let totalHours = 0;
  let overtimeHours = 0;
  for (const [day, hours] of Object.entries(log)) {
    totalHours += hours;
    if (hours > 8) overtimeHours += (hours - 8);
  }
  return { totalHours, overtimeHours };
}

// Problem 14
function findLongestPalindromeSubstring(str) {
  let longest = "";
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      const sub = str.slice(i, j);
      if (sub === sub.split('').reverse().join('') && sub.length > longest.length) {
        longest = sub;
      }
    }
  }
  return longest;
}

// Problem 15
function hasScheduleConflict(tasks) {
  const sorted = [...tasks].sort((a, b) => a.start - b.start);
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].end > sorted[i + 1].start) return true;
  }
  return false;
}
```
