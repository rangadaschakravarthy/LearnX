# Day 09 Exercises Solutions

## Easy Exercises (`easy/01-modern-loop-basics.js`)

```javascript
function sumArrayWithForOf(numbers) {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

function countObjectKeysWithForIn(obj) {
  let count = 0;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      count++;
    }
  }
  return count;
}

function reverseStringWithForOf(str) {
  let reversed = '';
  for (const char of str) {
    reversed = char + reversed;
  }
  return reversed;
}
```

---

## Medium Exercises (`medium/02-object-and-array-iteration.js`)

```javascript
function calculateTotalSalary(salaries) {
  let total = 0;
  for (const salary of Object.values(salaries)) {
    total += salary;
  }
  return total;
}

function formatInventorySummary(inventory) {
  const summary = [];
  for (const [item, count] of Object.entries(inventory)) {
    if (count > 0) {
      summary.push(`${item.toUpperCase()}: ${count} units available`);
    }
  }
  return summary;
}

function invertKeyValueMap(map) {
  const inverted = {};
  for (const [key, value] of Object.entries(map)) {
    inverted[value] = key;
  }
  return inverted;
}
```

---

## Challenge Exercises (`challenge/03-nested-data-aggregation.js`)

```javascript
function findFirstNegative(matrix) {
  let result = null;

  searchLoop: for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] < 0) {
        result = { row: r, col: c, value: matrix[r][c] };
        break searchLoop;
      }
    }
  }

  return result;
}

function aggregateDepartmentGrades(departments) {
  let totalStudents = 0;
  let globalGradeSum = 0;
  const deptAverages = {};

  for (const deptObj of departments) {
    let deptSum = 0;
    const studentCount = deptObj.students.length;

    for (const student of deptObj.students) {
      deptSum += student.grade;
      globalGradeSum += student.grade;
      totalStudents++;
    }

    deptAverages[deptObj.dept] = studentCount > 0 ? Number((deptSum / studentCount).toFixed(2)) : 0;
  }

  const overallAverage = totalStudents > 0 ? Number((globalGradeSum / totalStudents).toFixed(2)) : 0;

  return {
    totalStudents,
    overallAverage,
    deptAverages
  };
}
```
