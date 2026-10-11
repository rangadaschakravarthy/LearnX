// Employee Analysis Statistics Helper Module
function calculateAverageSalary(empList) {
  if (empList.length === 0) return 0;
  const total = empList.reduce((sum, emp) => sum + emp.salary, 0);
  return total / empList.length;
}
function filterByDepartment(empList, dept) {
  return empList.filter(emp => emp.department === dept);
}
module.exports = { calculateAverageSalary, filterByDepartment };
