// Day 02 — DOM Tree and Document Structure Runnable JavaScript Examples
document.addEventListener("DOMContentLoaded", () => {
    console.log("Initialized: Day 02 — DOM Tree and Document Structure");
    
    const demoBtn = document.getElementById("demo-btn");
    const outputBox = document.getElementById("output-box");

    if (demoBtn && outputBox) {
        demoBtn.addEventListener("click", () => {
            outputBox.textContent = "Button clicked! Running Day 02 — DOM Tree and Document Structure demonstration.";
            outputBox.classList.toggle("active");
        });
    }
});
