function generateTrianglePattern(rows) {
  const lines = [];
  for (let i = 1; i <= rows; i++) {
    let line = '';
    for (let j = 0; j < i; j++) line += '*';
    lines.push(line);
  }
  return lines.join('\n');
}

if (typeof document !== 'undefined') {
  document.getElementById('genBtn')?.addEventListener('click', () => {
    const val = Number(document.getElementById('rowsInput').value);
    document.getElementById('out').innerText = generateTrianglePattern(val);
  });
}

if (typeof module !== 'undefined') module.exports = { generateTrianglePattern };
