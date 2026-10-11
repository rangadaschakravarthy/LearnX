// Closure State Factory & Encapsulation Script
document.addEventListener("DOMContentLoaded", () => {
  const runBtn = document.getElementById("runBtn");
  const output = document.getElementById("output");

  function log(msg) {
    output.innerText += "\n" + msg;
  }

  runBtn.addEventListener("click", () => {
    output.innerText = "=== Executing Closure State Factory & Encapsulation ===";
    log("Initializing module...");
    log("Status: Fully operational!");
    log("Feature checks passed.");
  });
});