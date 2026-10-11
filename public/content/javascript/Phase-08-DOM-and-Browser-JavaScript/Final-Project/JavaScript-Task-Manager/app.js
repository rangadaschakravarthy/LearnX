// Task Manager Main Application Logic
document.addEventListener("DOMContentLoaded", () => {
    let tasks = TaskStorage.loadTasks();

    const taskForm = document.getElementById("task-form");
    const titleInput = document.getElementById("task-title");
    const categorySelect = document.getElementById("task-category");
    const prioritySelect = document.getElementById("task-priority");
    const taskContainer = document.getElementById("task-container");
    const counterElement = document.getElementById("task-counter");
    const clearCompletedBtn = document.getElementById("clear-completed-btn");

    function updateApp() {
        TaskStorage.saveTasks(tasks);
        DOMRenderer.renderTaskList(tasks, taskContainer);
        DOMRenderer.updateCounter(tasks, counterElement);
    }

    if (taskForm) {
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = titleInput.value.trim();
            if (!title) return;

            const newTask = {
                id: Date.now().toString(),
                title: title,
                category: categorySelect.value,
                priority: prioritySelect.value,
                completed: false
            };

            tasks.push(newTask);
            titleInput.value = "";
            updateApp();
        });
    }

    if (taskContainer) {
        taskContainer.addEventListener("click", (e) => {
            const taskItem = e.target.closest(".task-item");
            if (!taskItem) return;
            const taskId = taskItem.dataset.id;

            if (e.target.classList.contains("toggle-cb")) {
                tasks = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
                updateApp();
            } else if (e.target.classList.contains("delete-btn")) {
                tasks = tasks.filter(t => t.id !== taskId);
                updateApp();
            }
        });
    }

    if (clearCompletedBtn) {
        clearCompletedBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => !t.completed);
            updateApp();
        });
    }

    // Initial render
    updateApp();
    console.log("Task Manager App Ready.");
});
