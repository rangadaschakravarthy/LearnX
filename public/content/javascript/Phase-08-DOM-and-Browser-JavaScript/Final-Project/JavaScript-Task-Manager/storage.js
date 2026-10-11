// Storage Module Wrapper
const STORAGE_KEY = "js_task_manager_tasks";

const TaskStorage = {
    loadTasks() {
        const data = localStorage.getItem(STORAGE_KEY);
        try {
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Failed to parse tasks from localStorage", e);
            return [];
        }
    },
    saveTasks(tasks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
};
