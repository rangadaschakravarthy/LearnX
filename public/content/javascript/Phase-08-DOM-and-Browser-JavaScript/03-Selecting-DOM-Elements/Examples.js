// Day 03 — Selecting DOM Elements Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 03 — Selecting DOM Elements");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 03 — Selecting DOM Elements demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
