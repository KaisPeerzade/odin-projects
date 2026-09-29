import Todo from "./todo";
import Project from "./project";

import {
    saveProjects,
    loadProjects
} from "./storage";

import {
    renderProjects,
    renderTodos,
    openTodoModal,
    closeTodoModalWindow,
    openProjectModal,
    closeProjectModalWindow,
    setupEventListeners
} from "./dom";


let projects = [];

let currentProjectId = null;


// Load saved projects

function initialize() {

    const savedProjects =
        loadProjects();


    if (savedProjects && savedProjects.length > 0) {

        projects = savedProjects;

        currentProjectId =
            projects[0].id;

    } else {

        const inbox =
            new Project("Inbox");

        projects.push(inbox);

        currentProjectId =
            inbox.id;

        saveProjects(projects);
    }


    render();
}


// Get current project

function getCurrentProject() {

    return projects.find(
        project =>
            project.id === currentProjectId
    );
}


// Render application

function render() {

    const currentProject =
        getCurrentProject();


    if (!currentProject) {
        return;
    }


    renderProjects(
        projects,
        currentProjectId,
        selectProject,
        deleteProject
    );


    renderTodos(
        currentProject,
        toggleTodo,
        editTodo,
        deleteTodo
    );
}


// Select project

function selectProject(projectId) {

    currentProjectId =
        projectId;

    render();
}


// Add project

function addProject(name) {

    if (!name) {
        return;
    }


    const project =
        new Project(name);

    projects.push(project);

    currentProjectId =
        project.id;


    saveProjects(projects);

    closeProjectModalWindow();

    render();
}


// Delete project

function deleteProject(projectId) {

    const project =
        projects.find(
            project => project.id === projectId
        );


    if (!project) {
        return;
    }


    const confirmed =
        confirm(
            `Delete project "${project.name}"?`
        );


    if (!confirmed) {
        return;
    }


    projects =
        projects.filter(
            project => project.id !== projectId
        );


    if (currentProjectId === projectId) {

        currentProjectId =
            projects[0].id;
    }


    saveProjects(projects);

    render();
}


// Open add todo modal

function addTodo() {

    openTodoModal();
}


// Save todo

function saveTodo(data) {

    const project =
        getCurrentProject();


    if (!project) {
        return;
    }


    // Editing existing todo

    if (data.id) {

        const todo =
            project.getTodo(data.id);


        if (todo) {

            todo.title =
                data.title;

            todo.description =
                data.description;

            todo.dueDate =
                data.dueDate;

            todo.priority =
                data.priority;

            todo.notes =
                data.notes;
        }

    }

    // Creating new todo

    else {

        const todo =
            new Todo(
                data.title,
                data.description,
                data.dueDate,
                data.priority,
                data.notes
            );


        project.addTodo(todo);
    }


    saveProjects(projects);

    closeTodoModalWindow();

    render();
}


// Edit todo

function editTodo(todo) {

    openTodoModal(todo);
}


// Delete todo

function deleteTodo(todoId) {

    const confirmed =
        confirm("Delete this todo?");


    if (!confirmed) {
        return;
    }


    const project =
        getCurrentProject();


    project.removeTodo(todoId);

    saveProjects(projects);

    render();
}


// Complete todo

function toggleTodo(todoId) {

    const project =
        getCurrentProject();


    const todo =
        project.getTodo(todoId);


    if (!todo) {
        return;
    }


    todo.completed =
        !todo.completed;


    saveProjects(projects);

    render();
}


// Event listeners

setupEventListeners({

    onAddTodo: addTodo,

    onSaveTodo: saveTodo,

    onAddProject: () => {
        openProjectModal();
    },

    onCloseTodo:
        closeTodoModalWindow,

    onCloseProject:
        closeProjectModalWindow
});


// Start app

initialize();