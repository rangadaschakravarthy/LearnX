// JavaScript Function Laboratory Script
document.addEventListener("DOMContentLoaded", () => {
  // Tab switching
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // 1. Scope Explorer
  const btnTraceScope = document.getElementById("btnTraceScope");
  const scopeOutput = document.getElementById("scopeOutput");
  btnTraceScope.addEventListener("click", () => {
    scopeOutput.innerText = `[Scope Trace]
1. Local Environment Record: variable 'x' not found.
2. Outer (Function) Environment Record: variable 'x' not found.
3. Global Environment Record: variable 'x' found -> value: "GLOBAL_DATA"
[Result] Identifier resolved in 3 hops.`;
  });

  // 2. Closure Workbench
  let counterInstance = (function createCounter() {
    let count = 0;
    return {
      inc: () => ++count,
      get: () => count
    };
  })();

  const btnIncCounter = document.getElementById("btnIncCounter");
  const btnGetCounter = document.getElementById("btnGetCounter");
  const closureOutput = document.getElementById("closureOutput");

  btnIncCounter.addEventListener("click", () => {
    const val = counterInstance.inc();
    closureOutput.innerText = `[Closure Action] Counter incremented! Private state = ${val}`;
  });
  btnGetCounter.addEventListener("click", () => {
    closureOutput.innerText = `[Closure State] Private counter value = ${counterInstance.get()}`;
  });

  // 3. HOF Pipeline Studio
  const btnRunPipeline = document.getElementById("btnRunPipeline");
  const pipelineOutput = document.getElementById("pipelineOutput");
  btnRunPipeline.addEventListener("click", () => {
    const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
    const double = x => x * 2;
    const add10 = x => x + 10;
    const square = x => x * x;
    const pipeline = pipe(double, add10, square);
    const res = pipeline(3);
    pipelineOutput.innerText = `[Pipeline Execution]
Input: 3
1. double(3) = 6
2. add10(6) = 16
3. square(16) = 256
Final Result: ${res}`;
  });

  // 4. Recursion Visualizer
  const btnRunRecursion = document.getElementById("btnRunRecursion");
  const recursionOutput = document.getElementById("recursionOutput");
  btnRunRecursion.addEventListener("click", () => {
    recursionOutput.innerText = `[Call Stack Push]
-> push fact(5)
-> push fact(4)
-> push fact(3)
-> push fact(2)
-> push fact(1) [Base Case Hit!]

[Call Stack Pop & Return]
<- pop fact(1) returns 1
<- pop fact(2) returns 2 * 1 = 2
<- pop fact(3) returns 3 * 2 = 6
<- pop fact(4) returns 4 * 6 = 24
<- pop fact(5) returns 5 * 24 = 120
Final Output: 120`;
  });
});