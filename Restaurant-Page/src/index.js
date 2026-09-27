import "./style.css";
import home from "./home";
import menu from "./menu";
import contact from "./contact";

const content = document.querySelector("#content");

const homeButton = document.querySelector("#home");
const menuButton = document.querySelector("#menu");
const contactButton = document.querySelector("#contact");

home();

homeButton.addEventListener("click", function () {
    content.innerHTML = "";
    home();
});

menuButton.addEventListener("click", function () {
    content.innerHTML = "";
    menu();
});

contactButton.addEventListener("click", function () {
    content.innerHTML = "";
    contact();
});