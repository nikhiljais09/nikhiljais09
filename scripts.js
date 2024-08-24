const apiUrl = 'http://localhost:3000/api';

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            showPage('pets');
            loadPets();
        } else {
            alert('Login failed!');
        }
    });
}

function signup(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        showPage('login');
    });
}

function loadPets() {
    fetch(`${apiUrl}/pets`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => response.json())
    .then(pets => {
        const petList = document.getElementById('pet-list');
        petList.innerHTML = '';
        pets.forEach(pet => {
            const petItem = document.createElement('div');
            petItem.className = 'pet-item';
            petItem.innerHTML = `
                <h3>${pet.name}</h3>
                <p>${pet.description}</p>
                <button onclick="showOrderForm(${pet.id})">Order</button>
            `;
            petList.appendChild(petItem);
        });
    });
}

function showOrderForm(petId) {
    document.getElementById('pet-id').value = petId;
    showPage('order-form');
}

function orderPet(event) {
    event.preventDefault();
    const petId = document.getElementById('pet-id').value;
    const buyerName = document.getElementById('buyer-name').value;
    const buyerAddress = document.getElementById('buyer-address').value;

    fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ petId, buyerName, buyerAddress })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        showPage('pets');
    });
}
