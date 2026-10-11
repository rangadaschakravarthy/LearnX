# Phase 8: Medium Practice Solutions

```javascript
// Problem 1: Event Delegation on List
const todoList = document.getElementById("todo-list");
if (todoList) {
    todoList.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") console.log(e.target.textContent);
    });
}

// Problem 2: Delete Button Event Delegation
if (todoList) {
    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const li = e.target.closest("li");
            if (li) li.remove();
        }
    });
}

// Problem 3: Live Character Counter
const bio = document.getElementById("bio");
const counter = document.getElementById("counter");
if (bio && counter) {
    bio.addEventListener("input", () => {
        counter.textContent = bio.value.length;
    });
}

// Problem 4: Real-time Email Validation
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
if (emailInput && emailError) {
    emailInput.addEventListener("blur", () => {
        if (!emailInput.value.includes("@")) {
            emailError.textContent = "Invalid email address";
        } else {
            emailError.textContent = "";
        }
    });
}

// Problem 5: Password Toggle Visibility
const pwdInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggle-pwd");
if (pwdInput && toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        const isPwd = pwdInput.type === "password";
        pwdInput.type = isPwd ? "text" : "password";
        toggleBtn.textContent = isPwd ? "Hide" : "Show";
    });
}

// Problem 6 & 7: localStorage Theme
const themeSelect = document.getElementById("theme-select");
if (themeSelect) {
    themeSelect.addEventListener("change", (e) => {
        localStorage.setItem("theme", e.target.value);
        document.body.className = e.target.value;
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) document.body.className = savedTheme;
});
```
