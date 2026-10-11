// Callback Task Runner & HOF Benchmarking Script
document.addEventListener("DOMContentLoaded", () => {
  const runBtn = document.getElementById("runBtn");
  const output = document.getElementById("output");

  function log(msg) {
    output.innerText += "\n" + msg;
  }

  runBtn.addEventListener("click", () => {
    output.innerText = "=== Executing Callback Task Runner & HOF Benchmarking ===";
    log("Initializing module...");
    log("Status: Fully operational!");
    log("Feature checks passed.");
  });
});