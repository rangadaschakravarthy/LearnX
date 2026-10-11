// Day 07 — Creating and Removing Elements Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 07 — Creating and Removing Elements");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 07 — Creating and Removing Elements demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
