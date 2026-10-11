function analyzeNumber(n) {
  let isPrime = n > 1;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) { isPrime = false; break; }
  }
  let sum = 0, temp = Math.abs(n);
  while (temp > 0) { sum += temp % 10; temp = Math.floor(temp / 10); }
  return { n, isPrime, digitSum: sum };
}

if (typeof document !== 'undefined') {
  document.getElementById('runBtn')?.addEventListener('click', () => {
    const val = Number(document.getElementById('numInput').value);
    const res = analyzeNumber(val);
    document.getElementById('out').innerHTML = `<p>Is Prime: <strong>${res.isPrime}</strong> | Digit Sum: <strong>${res.digitSum}</strong></p>`;
  });
}

if (typeof module !== 'undefined') module.exports = { analyzeNumber };
