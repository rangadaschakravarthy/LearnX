# Solutions — Practice Module 09 (Advanced Looping)

```javascript
// Problem 1
function uppercaseItems(arr) {
  const result = [];
  for (const item of arr) {
    result.push(String(item).toUpperCase());
  }
  return result;
}

// Problem 2
function countVowelsForOf(str) {
  let count = 0;
  const vowels = 'aeiouAEIOU';
  for (const char of str) {
    if (vowels.includes(char)) count++;
  }
  return count;
}

// Problem 3
function getOwnPropertyKeys(obj) {
  const keys = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
}

// Problem 4
function sumObjectValues(obj) {
  let total = 0;
  for (const val of Object.values(obj)) {
    if (typeof val === 'number') total += val;
  }
  return total;
}

// Problem 5
function formatKeyValuePairs(obj) {
  const lines = [];
  for (const [key, val] of Object.entries(obj)) {
    lines.push(`${key}: ${val}`);
  }
  return lines;
}

// Problem 6
function formatIndexValuePairs(arr) {
  const formatted = [];
  for (const [index, val] of arr.entries()) {
    formatted.push(`#${index}: ${val}`);
  }
  return formatted;
}

// Problem 7
function filterObjectByThreshold(obj, minVal) {
  const filtered = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val >= minVal) {
      filtered[key] = val;
    }
  }
  return filtered;
}

// Problem 8
function countPropertyTypes(obj) {
  const counts = { string: 0, number: 0, boolean: 0, other: 0 };
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const type = typeof obj[key];
      if (counts[type] !== undefined) counts[type]++;
      else counts.other++;
    }
  }
  return counts;
}

// Problem 9
function findMatrixTargetLabeled(matrix, target) {
  let loc = null;
  search: for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === target) {
        loc = [r, c];
        break search;
      }
    }
  }
  return loc;
}

// Problem 10
function countDeepProperties(obj) {
  let count = 0;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        count += countDeepProperties(obj[key]);
      } else {
        count++;
      }
    }
  }
  return count;
}

// Problem 11
function deduplicateWithSet(arr) {
  const set = new Set(arr);
  const result = [];
  for (const item of set) {
    result.push(item);
  }
  return result;
}

// Problem 12
function invertObjectKeys(obj) {
  const inverted = {};
  for (const [key, val] of Object.entries(obj)) {
    inverted[val] = key;
  }
  return inverted;
}

// Problem 13
function calculateAverageGrade(studentObj) {
  const grades = Object.values(studentObj);
  if (grades.length === 0) return 0;
  let sum = 0;
  for (const g of grades) sum += g;
  return Number((sum / grades.length).toFixed(2));
}

// Problem 14
function auditDepartments(depts) {
  const cleared = [];
  deptLoop: for (const dept of depts) {
    for (const emp of dept.employees) {
      if (emp.status === 'BANNED') continue deptLoop;
    }
    cleared.push(dept.name);
  }
  return cleared;
}

// Problem 15
function mergeUserOrders(users, orders) {
  const merged = [];
  for (const user of users) {
    const userOrders = [];
    for (const order of orders) {
      if (order.userId === user.id) {
        userOrders.push(order);
      }
    }
    merged.push({ ...user, orders: userOrders });
  }
  return merged;
}
```
