/**
 * Day 09 — Example 04: Labeled Loops and Nested Data Processing
 */

// 1. Matrix Search with Labeled Break
const grid = [
  ['O', 'O', 'O'],
  ['O', 'X', 'O'],
  ['O', 'O', 'O']
];

console.log('--- 2D Grid Treasure Search ---');
let targetRow = -1;
let targetCol = -1;

gridSearch: for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[r].length; c++) {
    if (grid[r][c] === 'X') {
      targetRow = r;
      targetCol = c;
      break gridSearch; // Instantly breaks out of both loops
    }
  }
}

console.log(`Treasure 'X' located at Row ${targetRow}, Column ${targetCol}`);

// 2. Multi-Department Employee Scan with Labeled Continue
const companyData = [
  { dept: 'Engineering', members: ['Alice', 'Bob', 'Charlie'] },
  { dept: 'Security-Audited', members: ['David', 'FLAGGED_ACCOUNT', 'Eve'] },
  { dept: 'Marketing', members: ['Frank', 'Grace'] }
];

console.log('\n--- Scanning Department Accounts ---');
deptLoop: for (let i = 0; i < companyData.length; i++) {
  const deptObj = companyData[i];
  console.log(`\nScanning Department: ${deptObj.dept}`);

  for (let j = 0; j < deptObj.members.length; j++) {
    const member = deptObj.members[j];
    if (member === 'FLAGGED_ACCOUNT') {
      console.log(`  SECURITY THREAT ENCOUNTERED in ${deptObj.dept}! Abandoning department audit immediately.`);
      continue deptLoop; // Skip rest of this department and move to next department
    }
    console.log(`  Passed member check: ${member}`);
  }
}
