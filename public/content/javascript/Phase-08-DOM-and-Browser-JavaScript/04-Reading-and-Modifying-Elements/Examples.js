// Day 04 — Reading and Modifying Elements Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 04 — Reading and Modifying Elements");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 04 — Reading and Modifying Elements demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
