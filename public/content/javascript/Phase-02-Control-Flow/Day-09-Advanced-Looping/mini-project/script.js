/**
 * Day 09 Mini-Project: Student Data Analyzer
 */

const defaultDataset = [
  {
    id: 101,
    name: 'Alice Johnson',
    department: 'Computer Science',
    scores: { math: 95, coding: 98, english: 88 }
  },
  {
    id: 102,
    name: 'Bob Smith',
    department: 'Computer Science',
    scores: { math: 72, coding: 80, english: 85 }
  },
  {
    id: 103,
    name: 'Charlie Brown',
    department: 'Mathematics',
    scores: { math: 99, coding: 85, english: 90 }
  },
  {
    id: 104,
    name: 'Diana Prince',
    department: 'Mathematics',
    scores: { math: 91, coding: 94, english: 96 }
  }
];

function analyzeStudentData(students) {
  let totalScoreSum = 0;
  let totalSubjectCount = 0;
  let topStudent = null;
  let topAverage = -1;
  const deptAverages = {};
  const honorRoll = [];

  // Iterate students using for...of
  for (const student of students) {
    const scores = student.scores;
    let studentSum = 0;
    let count = 0;

    // Iterate student scores object using Object.entries
    for (const [subject, score] of Object.entries(scores)) {
      studentSum += score;
      count++;
      totalScoreSum += score;
      totalSubjectCount++;
    }

    const studentAvg = count > 0 ? studentSum / count : 0;

    if (studentAvg > topAverage) {
      topAverage = studentAvg;
      topStudent = student.name;
    }

    if (studentAvg >= 90) {
      honorRoll.push(student.name);
    }

    // Accumulate department scores
    const dept = student.department;
    if (!deptAverages[dept]) {
      deptAverages[dept] = { sum: 0, count: 0 };
    }
    deptAverages[dept].sum += studentAvg;
    deptAverages[dept].count += 1;
  }

  // Calculate final dept averages using Object.entries
  const formattedDeptAvg = {};
  for (const [dept, data] of Object.entries(deptAverages)) {
    formattedDeptAvg[dept] = Number((data.sum / data.count).toFixed(2));
  }

  const overallAvg = totalSubjectCount > 0 ? Number((totalScoreSum / totalSubjectCount).toFixed(2)) : 0;

  return {
    totalStudents: students.length,
    overallAverage: overallAvg,
    topStudent: `${topStudent} (${topAverage.toFixed(2)}%)`,
    honorRoll,
    departmentAverages: formattedDeptAvg
  };
}

// Browser Initialization
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('jsonInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsDiv = document.getElementById('results');

    jsonInput.value = JSON.stringify(defaultDataset, null, 2);

    analyzeBtn.addEventListener('click', () => {
      try {
        const parsed = JSON.parse(jsonInput.value);
        const report = analyzeStudentData(parsed);

        let honorHtml = '';
        for (const name of report.honorRoll) {
          honorHtml += `<li>🌟 ${name}</li>`;
        }

        let deptHtml = '';
        for (const [dept, avg] of Object.entries(report.departmentAverages)) {
          deptHtml += `<li><strong>${dept}</strong>: ${avg}%</li>`;
        }

        resultsDiv.innerHTML = `
          <p>Total Students: <span class="metric">${report.totalStudents}</span></p>
          <p>Overall Average: <span class="metric">${report.overallAverage}%</span></p>
          <p>Top Performer: <span class="metric">${report.topStudent}</span></p>
          
          <h4>Honor Roll (90%+ Avg)</h4>
          <ul>${honorHtml || '<li>None</li>'}</ul>

          <h4>Department Averages</h4>
          <ul>${deptHtml}</ul>
        `;
      } catch (err) {
        resultsDiv.innerHTML = `<p style="color: #ef4444;">JSON Parsing Error: ${err.message}</p>`;
      }
    });

    analyzeBtn.click();
  });
}

// Node.js Execution Support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { analyzeStudentData, defaultDataset };
  if (require.main === module) {
    console.log('--- Student Data Analyzer CLI Output ---');
    const report = analyzeStudentData(defaultDataset);
    console.log(JSON.stringify(report, null, 2));
  }
}
