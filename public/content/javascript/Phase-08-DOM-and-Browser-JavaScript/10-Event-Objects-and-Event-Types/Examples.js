// Day 10 — Event Objects and Event Types Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 10 — Event Objects and Event Types");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 10 — Event Objects and Event Types demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
