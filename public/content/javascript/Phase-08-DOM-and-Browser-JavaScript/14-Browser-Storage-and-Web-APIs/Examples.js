// Day 14 — Browser Storage and Web APIs Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 14 — Browser Storage and Web APIs");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 14 — Browser Storage and Web APIs demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
