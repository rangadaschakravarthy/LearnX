/**
 * Phase 2 Final Capstone — Logic Challenge Engine
 */

const challenges = [
  {
    id: 1,
    title: '1. Guard Clause Validator',
    desc: 'Write function `validateOrder(status, total)` returning "CANCELLED" if status === "cancelled", "FREE_SHIPPING" if total >= 100, else "STANDARD". Use guard clauses.',
    starter: `function validateOrder(status, total) {\n  if (status === 'cancelled') return 'CANCELLED';\n  if (total >= 100) return 'FREE_SHIPPING';\n  return 'STANDARD';\n}`,
    tests: [
      { input: ['cancelled', 150], expected: 'CANCELLED' },
      { input: ['active', 120], expected: 'FREE_SHIPPING' },
      { input: ['active', 50], expected: 'STANDARD' }
    ]
  },
  {
    id: 2,
    title: '2. Switch Dispatcher',
    desc: 'Write function `getHttpReason(code)` returning "OK" for 200, "NOT_FOUND" for 404, "ERROR" for 500, else "UNKNOWN". Use switch.',
    starter: `function getHttpReason(code) {\n  switch(code) {\n    case 200: return 'OK';\n    case 404: return 'NOT_FOUND';\n    case 500: return 'ERROR';\n    default: return 'UNKNOWN';\n  }\n}`,
    tests: [
      { input: [200], expected: 'OK' },
      { input: [404], expected: 'NOT_FOUND' },
      { input: [403], expected: 'UNKNOWN' }
    ]
  },
  {
    id: 3,
    title: '3. Accumulator Loop',
    desc: 'Write function `sumEvens(n)` returning sum of all even numbers from 0 up to n inclusive using a loop.',
    starter: `function sumEvens(n) {\n  let total = 0;\n  for (let i = 0; i <= n; i += 2) {\n    total += i;\n  }\n  return total;\n}`,
    tests: [
      { input: [10], expected: 30 },
      { input: [5], expected: 6 }
    ]
  },
  {
    id: 4,
    title: '4. Digit Reversal',
    desc: 'Write function `reverseNum(n)` returning reversed digits of positive integer n using a while loop.',
    starter: `function reverseNum(n) {\n  let rev = 0;\n  while (n > 0) {\n    rev = rev * 10 + (n % 10);\n    n = Math.floor(n / 10);\n  }\n  return rev;\n}`,
    tests: [
      { input: [1234], expected: 4321 },
      { input: [905], expected: 509 }
    ]
  },
  {
    id: 5,
    title: '5. Labeled Grid Search',
    desc: 'Write function `findChar(grid, target)` returning [r, c] of target character using a labeled loop, or null if not found.',
    starter: `function findChar(grid, target) {\n  let loc = null;\n  search: for (let r = 0; r < grid.length; r++) {\n    for (let c = 0; c < grid[r].length; c++) {\n      if (grid[r][c] === target) {\n        loc = [r, c];\n        break search;\n      }\n    }\n  }\n  return loc;\n}`,
    tests: [
      { input: [[['a','b'],['c','X']], 'X'], expected: [1, 1] }
    ]
  }
];

let currentIdx = 0;
const statusMap = {};

function initUI() {
  if (typeof document === 'undefined') return;

  const challengeList = document.getElementById('challengeList');
  const codeEditor = document.getElementById('codeEditor');
  const runBtn = document.getElementById('runBtn');

  challenges.forEach((ch, idx) => {
    const li = document.createElement('li');
    li.className = `challenge-item ${idx === 0 ? 'active' : ''}`;
    li.innerHTML = `<span>${ch.title}</span><span class="status-badge" id="badge-${ch.id}">Pending</span>`;
    li.addEventListener('click', () => selectChallenge(idx));
    challengeList.appendChild(li);
  });

  selectChallenge(0);

  runBtn.addEventListener('click', () => runTestsForCurrent());
}

function selectChallenge(idx) {
  currentIdx = idx;
  const ch = challenges[idx];

  document.querySelectorAll('.challenge-item').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });

  document.getElementById('challengeTitle').innerText = ch.title;
  document.getElementById('challengeDesc').innerText = ch.desc;
  document.getElementById('codeEditor').value = ch.starter;
  document.getElementById('testOutput').innerHTML = '<p style="color: var(--text-muted);">Click "Run Verification Tests" to execute assertions...</p>';
}

function runTestsForCurrent() {
  const ch = challenges[currentIdx];
  const code = document.getElementById('codeEditor').value;
  const outputDiv = document.getElementById('testOutput');
  outputDiv.innerHTML = '';

  let allPassed = true;
  try {
    const userFn = new Function(`return (${code})`)();

    ch.tests.forEach((t, i) => {
      const result = userFn(...t.input);
      const passed = JSON.stringify(result) === JSON.stringify(t.expected);
      if (!passed) allPassed = false;

      const p = document.createElement('p');
      p.className = passed ? 'test-pass' : 'test-fail';
      p.innerText = `${passed ? '✓' : '✗'} Test #${i + 1}: expected ${JSON.stringify(t.expected)}, got ${JSON.stringify(result)}`;
      outputDiv.appendChild(p);
    });

    statusMap[ch.id] = allPassed;
    const badge = document.getElementById(`badge-${ch.id}`);
    if (badge) {
      badge.innerText = allPassed ? 'Passed' : 'Failed';
      badge.className = `status-badge ${allPassed ? 'passed' : ''}`;
    }

    updateScore();
  } catch (err) {
    outputDiv.innerHTML = `<p class="test-fail">Syntax/Execution Error: ${err.message}</p>`;
  }
}

function updateScore() {
  const passedCount = Object.values(statusMap).filter(Boolean).length;
  document.getElementById('scoreText').innerText = `${passedCount} / ${challenges.length}`;
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initUI);
}

if (typeof module !== 'undefined') {
  module.exports = { challenges };
}
