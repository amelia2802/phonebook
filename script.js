const searchTxt = document.getElementById("search-name");
const searchBtn = document.getElementById("search-btn");
const addUser = document.getElementById("add-user");

let userArray = JSON.parse(sessionStorage.getItem('userArray')) || [];
let contactForm = "";
let contacts = "";

function addContacts() {
    contactForm = `
        <form id="contactForm">
            <a id="close" href="#">X</a>
            <label for="username">Name</label>
            <input id="username" type="text" placeholder="Fullname" required>
            <label for="number">Phone Number</label>
            <input id="number" type="number" min="1000000000" max="9999999999" placeholder="Phone Number" required>
            <button id="add" type="submit">Add to contacts</button>
        </form>
    `;
    document.getElementById("header").innerHTML += contactForm;

    document.getElementById("close").addEventListener("click", () => {
        document.getElementById("contactForm").remove();
        window.location.reload(true);
    });

    document.getElementById("add").addEventListener("click", (e) => {
        e.preventDefault();

        let userName = document.getElementById("username").value;
        let contactNumber = document.getElementById("number").value;
        

        userArray.push({ userName, contactNumber });
        sessionStorage.setItem('userArray', JSON.stringify(userArray));

        addToContacts(userName);
        window.location.reload(true);

        document.getElementById("contactForm").remove();
    });
}

addUser.addEventListener('click', () => {
    addContacts();
});

function addToContacts(userName){
    const contactSection = `
        <section class="contact">
            <img class="pfp" src="./img/header.jpg">
            <p>${userName}</p>
            <img class="call" src="./img/call.png">
        </section>
    `;

    document.getElementById("book").innerHTML+= contactSection
}

function searchContact(name) {
    const result = userArray.find(contact => contact.userName.toLowerCase() === name.toLowerCase());
    if (result) {
        document.getElementById("search-results").innerHTML = `<p>${result.userName}: ${result.contactNumber}</p>`;
    } else {
        document.getElementById("search-results").innerHTML = `<p>Not found</p>`;
    }
}

searchTxt.addEventListener('input', () => {
    const query = searchTxt.value;
    if (query) {
        searchContact(query);
    } else {
        document.getElementById("search-results").innerHTML = '';
    }
});

window.addEventListener('load', () => {
    userArray.forEach(contact => addToContacts(contact.userName));
})


