// Day 01 — Browser and DOM Fundamentals Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 01 — Browser and DOM Fundamentals");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 01 — Browser and DOM Fundamentals demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
