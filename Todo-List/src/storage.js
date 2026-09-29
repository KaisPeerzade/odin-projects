const STORAGE_KEY = "odin-todo-list";

export function saveProjects(projects) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(projects)
    );
}


export function loadProjects() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return null;
    }

    return JSON.parse(data);
}