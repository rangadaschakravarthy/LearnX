function analyzeGrade(score, age) {
  let letter = 'F';
  if (score >= 90) letter = 'A';
  else if (score >= 80) letter = 'B';
  else if (score >= 70) letter = 'C';
  else if (score >= 60) letter = 'D';

  const canVote = age >= 18;
  return { score, letter, age, canVote };
}

if (typeof document !== 'undefined') {
  document.getElementById('calcBtn')?.addEventListener('click', () => {
    const score = Number(document.getElementById('scoreInput').value);
    const age = Number(document.getElementById('ageInput').value);
    const res = analyzeGrade(score, age);
    document.getElementById('out').innerHTML = `<p>Letter Grade: <strong>${res.letter}</strong> | Voting Eligible: <strong>${res.canVote}</strong></p>`;
  });
}

if (typeof module !== 'undefined') module.exports = { analyzeGrade };
