const products = [
    {
        id: 1,
        name: 'Zapatilla Deportiva 1',
        price: 100,
        description: 'Zapatilla ideal para correr.',
        image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Zapatilla1'
    },
    {
        id: 2,
        name: 'Zapatilla Casual 2',
        price: 200,
        description: 'Zapatilla cómoda para uso diario.',
        image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Zapatilla2'
    },
    {
        id: 3,
        name: 'Zapatilla de Baloncesto 3',
        price: 300,
        description: 'Zapatilla diseñada para el baloncesto.',
        image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Zapatilla3'
    },
    {
        id: 4,
        name: 'Zapatilla de Senderismo 4',
        price: 250,
        description: 'Zapatilla resistente para senderismo.',
        image: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=Zapatilla4'
    },
    {
        id: 5,
        name: 'Zapatilla de Fitness 5',
        price: 120,
        description: 'Zapatilla ideal para el gimnasio.',
        image: 'https://via.placeholder.com/150/800080/FFFFFF?text=Zapatilla5'
    },
    {
        id: 6,
        name: 'Zapatilla Elegante 6',
        price: 180,
        description: 'Zapatilla elegante para ocasiones especiales.',
        image: 'https://via.placeholder.com/150/FFC0CB/FFFFFF?text=Zapatilla6'
    },
];

let cart = [];
let filteredProducts = products;

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar lista antes de mostrar productos filtrados
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        productList.appendChild(productDiv);
    });
}

function searchProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    displayCart();
}

function updateCartCount() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerText = `Carrito (${cart.length})`;
}

function displayCart() {
    const cartSection = document.getElementById('cart-section');
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Eliminar</button></p>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    document.getElementById('total-price').innerText = `Total: $${total}`;
    cartSection.style.display = cart.length > 0 ? 'block' : 'none';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCart();
}

function checkout() {
    alert('Compra finalizada. ¡Gracias por tu compra!');
    cart = [];
    updateCartCount();
    displayCart();
}
