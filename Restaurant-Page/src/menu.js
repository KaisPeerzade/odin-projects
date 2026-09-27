function menu() {
    const content = document.querySelector("#content");

    const heading = document.createElement("h1");
    heading.textContent = "Our Menu";

    const pizza = document.createElement("h2");
    pizza.textContent = "Margherita Pizza - ₹299";

    const pasta = document.createElement("h2");
    pasta.textContent = "Alfredo Pasta - ₹349";

    const burger = document.createElement("h2");
    burger.textContent = "Classic Burger - ₹249";

    content.appendChild(heading);
    content.appendChild(pizza);
    content.appendChild(pasta);
    content.appendChild(burger);
}

export default menu; 