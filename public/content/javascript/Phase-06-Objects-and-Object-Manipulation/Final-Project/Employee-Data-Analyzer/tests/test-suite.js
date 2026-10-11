// Test Suite for Employee Data Analyzer
const stats = require("../utils/stats");
const testEmp = [{ salary: 100 }, { salary: 200 }];
console.log("Test Passed:", stats.calculateAverageSalary(testEmp) === 150);
