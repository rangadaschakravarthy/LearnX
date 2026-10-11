// Day 16 — DOM Patterns and Performance Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 16 — DOM Patterns and Performance");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 16 — DOM Patterns and Performance demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
