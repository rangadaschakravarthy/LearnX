const data = [
  { name: "Alice", scores: { math: 90, CS: 95 } },
  { name: "Bob", scores: { math: 80, CS: 85 } }
];

function analyzeData(list) {
  let count = 0, sum = 0;
  for (const item of list) {
    for (const score of Object.values(item.scores)) {
      sum += score;
      count++;
    }
  }
  return { avg: count > 0 ? sum / count : 0 };
}

if (typeof document !== 'undefined') {
  document.getElementById('runBtn')?.addEventListener('click', () => {
    const res = analyzeData(data);
    document.getElementById('out').innerText = `Class Average: ${res.avg}%`;
  });
}

if (typeof module !== 'undefined') module.exports = { analyzeData };
