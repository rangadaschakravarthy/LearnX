// Pure DOM Renderer Engine
const DOMRenderer = {
    renderTaskList(tasks, container) {
        container.innerHTML = "";
        if (tasks.length === 0) {
            container.innerHTML = "<p class='empty-msg'>No tasks found.</p>";
            return;
        }
        const fragment = document.createDocumentFragment();
        tasks.forEach(task => {
            const div = document.createElement("div");
            div.className = "task-item " + (task.completed ? "completed" : "");
            div.dataset.id = task.id;

            div.innerHTML = `
                <div>
                    <input type="checkbox" class="toggle-cb" ${task.completed ? "checked" : ""}>
                    <span>${task.title}</span>
                    <small>[${task.category}]</small>
                </div>
                <button class="delete-btn">Delete</button>
            `;
            fragment.appendChild(div);
        });
        container.appendChild(fragment);
    },
    updateCounter(tasks, counterElement) {
        const remaining = tasks.filter(t => !t.completed).length;
        counterElement.textContent = remaining + " tasks remaining";
    }
};
