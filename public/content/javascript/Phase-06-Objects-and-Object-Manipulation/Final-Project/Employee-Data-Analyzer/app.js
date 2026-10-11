// Employee Data Analyzer Capstone Entry Point
const data = require("./data");
const stats = require("./utils/stats");

console.log("=== Employee Data Analyzer Output ===");
console.log("Total Employees:", data.employees.length);
console.log("Average Salary:", stats.calculateAverageSalary(data.employees));
console.log("Engineering Department:", stats.filterByDepartment(data.employees, "Engineering"));
