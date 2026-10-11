// Day 12 — Forms and Form Handling Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 12 — Forms and Form Handling");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 12 — Forms and Form Handling demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
