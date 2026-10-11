// Day 08 — DOM Traversal Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 08 — DOM Traversal");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 08 — DOM Traversal demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
