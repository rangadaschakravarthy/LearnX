# Solutions — Practice Module 05 (Switch Statements)

```javascript
// Problem 1
function getDayName(num) {
  switch (num) {
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    case 7: return "Sunday";
    default: return "Invalid Day";
  }
}

// Problem 2
function getDaysInMonth(month) {
  switch (month) {
    case 2: return 28;
    case 4: case 6: case 9: case 11: return 30;
    case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
    default: return 0;
  }
}

// Problem 3
function calculate(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : null;
    default: return null;
  }
}

// Problem 4
function getRoleAccessLevel(role) {
  switch (role.toLowerCase()) {
    case 'admin': return 3;
    case 'editor': return 2;
    case 'viewer': return 1;
    default: return 0;
  }
}

// Problem 5
function getSeasonFallthrough(month) {
  switch (month) {
    case 12: case 1: case 2: return "Winter";
    case 3: case 4: case 5: return "Spring";
    case 6: case 7: case 8: return "Summer";
    case 9: case 10: case 11: return "Autumn";
    default: return "Invalid";
  }
}

// Problem 6
function getHttpStatusText(code) {
  switch (code) {
    case 200: return "OK";
    case 301: return "Moved Permanently";
    case 404: return "Not Found";
    case 500: return "Internal Server Error";
    default: return "Unknown Code";
  }
}

// Problem 7
function getMimeType(ext) {
  switch (ext.toLowerCase()) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    default: return 'application/octet-stream';
  }
}

// Problem 8
function getGradeSwitch(score) {
  switch (true) {
    case (score >= 90): return 'A';
    case (score >= 80): return 'B';
    case (score >= 70): return 'C';
    case (score >= 60): return 'D';
    default: return 'F';
  }
}

// Problem 9
function getMoveVector(key) {
  switch (key) {
    case 'ArrowUp': return { x: 0, y: -1 };
    case 'ArrowDown': return { x: 0, y: 1 };
    case 'ArrowLeft': return { x: -1, y: 0 };
    case 'ArrowRight': return { x: 1, y: 0 };
    default: return { x: 0, y: 0 };
  }
}

// Problem 10
function toRoman5(n) {
  switch (n) {
    case 1: return "I";
    case 2: return "II";
    case 3: return "III";
    case 4: return "IV";
    case 5: return "V";
    default: return "";
  }
}

// Problem 11
function getPriorityColor(prio) {
  switch (prio.toLowerCase()) {
    case 'low': return 'green';
    case 'medium': return 'yellow';
    case 'high': return 'orange';
    case 'critical': return 'red';
    default: return 'gray';
  }
}

// Problem 12
function getCurrencySymbol(code) {
  switch (code.toUpperCase()) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'GBP': return '£';
    case 'JPY': return '¥';
    case 'INR': return '₹';
    default: return '?';
  }
}

// Problem 13
function getNextOrderState(current) {
  switch (current) {
    case 'pending': return 'processing';
    case 'processing': return 'shipped';
    case 'shipped': return 'delivered';
    case 'delivered': return 'completed';
    default: return 'invalid';
  }
}

// Problem 14
function getPlanetOrder(name) {
  switch (name.toLowerCase()) {
    case 'mercury': return 1;
    case 'venus': return 2;
    case 'earth': return 3;
    case 'mars': return 4;
    case 'jupiter': return 5;
    case 'saturn': return 6;
    case 'uranus': return 7;
    case 'neptune': return 8;
    default: return 0;
  }
}

// Problem 15
function convertLength(val, unitFrom, unitTo) {
  const key = `${unitFrom}->${unitTo}`;
  switch (key) {
    case 'm->km': return val / 1000;
    case 'km->m': return val * 1000;
    case 'cm->m': return val / 100;
    case 'm->cm': return val * 100;
    case 'inch->cm': return val * 2.54;
    default: return val;
  }
}
```
