// Day 15 — Timers and Dynamic UI Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 15 — Timers and Dynamic UI");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 15 — Timers and Dynamic UI demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
