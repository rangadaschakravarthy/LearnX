"use strict";

function analyzeStudent() {
  const marks = Number(document.getElementById("marksInput").value);
  const attendance = Number(document.getElementById("attendanceInput").value);
  const output = document.getElementById("outputDisplay");

  // Guard 1: Input Validation
  if (isNaN(marks) || marks < 0 || marks > 100) {
    output.innerText = "❌ Error: Marks must be between 0 and 100";
    return;
  }
  if (isNaN(attendance) || attendance < 0 || attendance > 100) {
    output.innerText = "❌ Error: Attendance must be between 0% and 100%";
    return;
  }

  // 1. Determine Pass/Fail Status (Minimum 75% attendance AND 40 marks required)
  const passedAttendance = attendance >= 75;
  const passedMarks = marks >= 40;
  const isOverallPass = passedAttendance && passedMarks;

  // 2. Determine Letter Grade
  let grade = "F";
  if (marks >= 90) grade = "A+ (Excellent)";
  else if (marks >= 80) grade = "A (Very Good)";
  else if (marks >= 70) grade = "B (Good)";
  else if (marks >= 60) grade = "C (Satisfactory)";
  else if (marks >= 40) grade = "D (Pass)";
  else grade = "F (Fail)";

  // 3. Scholarship Eligibility (Marks >= 90 AND Attendance >= 90%)
  const isScholarshipEligible = marks >= 90 && attendance >= 90;

  output.innerHTML = `
    <div><strong>Overall Status:</strong> ${isOverallPass ? '<span style="color:#4ade80;">PASSED ✅</span>' : '<span style="color:#f43f5e;">FAILED ❌</span>'}</div>
    <div><strong>Letter Grade:</strong> ${grade}</div>
    <div><strong>Attendance Requirement:</strong> ${passedAttendance ? 'Met (>= 75%)' : 'Failed (< 75%)'}</div>
    <div><strong>Scholarship Eligible:</strong> ${isScholarshipEligible ? 'Yes! 🌟 (High Academic Merit)' : 'No'}</div>
  `;
}

document.addEventListener("DOMContentLoaded", analyzeStudent);
