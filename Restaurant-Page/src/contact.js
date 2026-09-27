function contact() {
    const content = document.querySelector("#content");

    const heading = document.createElement("h1");
    heading.textContent = "Contact Us";

    const phone = document.createElement("p");
    phone.textContent = "Phone: 98765 43210";

    const email = document.createElement("p");
    email.textContent = "Email: latavola@gmail.com";

    const address = document.createElement("p");
    address.textContent = "Address: Pune, Maharashtra";

    content.appendChild(heading);
    content.appendChild(phone);
    content.appendChild(email);
    content.appendChild(address);
}

export default contact;