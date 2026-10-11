// Day 17 — Advanced DOM Projects and Problem Solving Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 17 — Advanced DOM Projects and Problem Solving");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 17 — Advanced DOM Projects and Problem Solving demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
