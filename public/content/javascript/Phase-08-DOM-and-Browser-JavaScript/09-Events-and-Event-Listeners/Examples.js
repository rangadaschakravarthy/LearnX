// Day 09 — Events and Event Listeners Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 09 — Events and Event Listeners");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 09 — Events and Event Listeners demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
