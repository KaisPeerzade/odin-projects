function home() {
    const content = document.querySelector("#content");

    const heading = document.createElement("h1");
    heading.textContent = "Welcome to La Tavola";

    const paragraph = document.createElement("p");
    paragraph.textContent =
        "Welcome to La Tavola, a cozy restaurant serving delicious food made with fresh ingredients.";

    content.appendChild(heading);
    content.appendChild(paragraph);
}

export default home;