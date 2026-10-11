// Day 05 — Attributes and Data Attributes Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 05 — Attributes and Data Attributes");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 05 — Attributes and Data Attributes demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
