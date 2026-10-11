// Day 13 — Keyboard, Mouse and Input Events Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 13 — Keyboard, Mouse and Input Events");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 13 — Keyboard, Mouse and Input Events demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
