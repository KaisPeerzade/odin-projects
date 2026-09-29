import "./style.css";


const projectList = document.querySelector("#project-list");
const todoList = document.querySelector("#todo-list");

const projectTitle = document.querySelector("#project-title");
const todoCount = document.querySelector("#todo-count");

const addTodoBtn = document.querySelector("#add-todo-btn");
const addProjectBtn = document.querySelector("#add-project-btn");


const todoModal = document.querySelector("#todo-modal");
const projectModal = document.querySelector("#project-modal");


const todoForm = document.querySelector("#todo-form");
const projectForm = document.querySelector("#project-form");


const closeTodoModal = document.querySelector("#close-todo-modal");
const cancelTodo = document.querySelector("#cancel-todo");


const closeProjectModal =
    document.querySelector("#close-project-modal");

const cancelProject =
    document.querySelector("#cancel-project");


const todoModalTitle =
    document.querySelector("#todo-modal-title");


const todoIdInput =
    document.querySelector("#todo-id");

const todoTitle =
    document.querySelector("#todo-title");

const todoDescription =
    document.querySelector("#todo-description");

const todoDate =
    document.querySelector("#todo-date");

const todoPriority =
    document.querySelector("#todo-priority");

const todoNotes =
    document.querySelector("#todo-notes");

const projectName =
    document.querySelector("#project-name");


export function renderProjects(
    projects,
    currentProjectId,
    onProjectClick,
    onProjectDelete
) {
    projectList.innerHTML = "";

    projects.forEach(project => {

        const projectItem =
            document.createElement("div");

        projectItem.classList.add("project-item");

        if (project.id === currentProjectId) {
            projectItem.classList.add("active");
        }


        const projectButton =
            document.createElement("button");

        projectButton.classList.add("project-button");

        projectButton.textContent =
            `${project.name} (${project.todos.length})`;


        projectButton.addEventListener(
            "click",
            () => onProjectClick(project.id)
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.classList.add("delete-project");

        deleteButton.textContent = "×";

        deleteButton.title = "Delete project";


        deleteButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                onProjectDelete(project.id);
            }
        );


        projectItem.appendChild(projectButton);

        if (project.name !== "Inbox") {
            projectItem.appendChild(deleteButton);
        }

        projectList.appendChild(projectItem);
    });
}


export function renderTodos(
    project,
    onToggleTodo,
    onEditTodo,
    onDeleteTodo
) {

    todoList.innerHTML = "";

    projectTitle.textContent = project.name;


    const total = project.todos.length;

    const completed =
        project.todos.filter(
            todo => todo.completed
        ).length;


    todoCount.textContent =
        `${completed} of ${total} completed`;


    if (project.todos.length === 0) {

        const empty =
            document.createElement("div");

        empty.classList.add("empty-state");

        empty.innerHTML = `
            <div class="empty-icon">✓</div>
            <h2>No todos yet</h2>
            <p>Add a task to get started.</p>
        `;

        todoList.appendChild(empty);

        return;
    }


    project.todos.forEach(todo => {

        const todoItem =
            document.createElement("div");

        todoItem.classList.add("todo-item");

        todoItem.classList.add(
            `priority-${todo.priority}`
        );


        if (todo.completed) {
            todoItem.classList.add("completed");
        }


        const check =
            document.createElement("button");

        check.classList.add("todo-check");

        check.innerHTML =
            todo.completed ? "✓" : "";

        check.addEventListener(
            "click",
            () => onToggleTodo(todo.id)
        );


        const content =
            document.createElement("div");

        content.classList.add("todo-content");


        const title =
            document.createElement("h3");

        title.textContent = todo.title;


        const date =
            document.createElement("span");

        date.classList.add("todo-date");

        date.textContent =
            formatDate(todo.dueDate);


        const priority =
            document.createElement("span");

        priority.classList.add("priority-label");

        priority.textContent =
            todo.priority;


        content.appendChild(title);

        content.appendChild(date);

        content.appendChild(priority);


        const actions =
            document.createElement("div");

        actions.classList.add("todo-actions");


        const editButton =
            document.createElement("button");

        editButton.textContent = "Edit";

        editButton.addEventListener(
            "click",
            () => onEditTodo(todo)
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener(
            "click",
            () => onDeleteTodo(todo.id)
        );


        actions.appendChild(editButton);

        actions.appendChild(deleteButton);


        todoItem.appendChild(check);

        todoItem.appendChild(content);

        todoItem.appendChild(actions);


        todoList.appendChild(todoItem);
    });
}


function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date =
        new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


export function openTodoModal(todo = null) {

    todoModal.classList.remove("hidden");

    if (todo) {

        todoModalTitle.textContent =
            "Edit Todo";

        todoIdInput.value =
            todo.id;

        todoTitle.value =
            todo.title;

        todoDescription.value =
            todo.description;

        todoDate.value =
            todo.dueDate;

        todoPriority.value =
            todo.priority;

        todoNotes.value =
            todo.notes;

    } else {

        todoModalTitle.textContent =
            "Add Todo";

        todoForm.reset();

        todoIdInput.value = "";
    }
}


export function closeTodoModalWindow() {

    todoModal.classList.add("hidden");

    todoForm.reset();
}


export function openProjectModal() {

    projectModal.classList.remove("hidden");

    projectName.focus();
}


export function closeProjectModalWindow() {

    projectModal.classList.add("hidden");

    projectForm.reset();
}


export function getTodoFormData() {

    return {
        id: todoIdInput.value,
        title: todoTitle.value.trim(),
        description: todoDescription.value.trim(),
        dueDate: todoDate.value,
        priority: todoPriority.value,
        notes: todoNotes.value.trim()
    };
}


export function getProjectName() {

    return projectName.value.trim();
}


export function setupEventListeners({
    onAddTodo,
    onSaveTodo,
    onAddProject,
    onCloseTodo,
    onCloseProject
}) {

    addTodoBtn.addEventListener(
        "click",
        onAddTodo
    );


    closeTodoModal.addEventListener(
        "click",
        onCloseTodo
    );


    cancelTodo.addEventListener(
        "click",
        onCloseTodo
    );


    addProjectBtn.addEventListener(
        "click",
        openProjectModal
    );


    closeProjectModal.addEventListener(
        "click",
        onCloseProject
    );


    cancelProject.addEventListener(
        "click",
        onCloseProject
    );


    todoForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            onSaveTodo(
                getTodoFormData()
            );
        }
    );


    projectForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            onAddProject(
                getProjectName()
            );
        }
    );


    window.addEventListener(
        "click",
        (event) => {

            if (event.target === todoModal) {
                onCloseTodo();
            }

            if (event.target === projectModal) {
                onCloseProject();
            }
        }
    );
}