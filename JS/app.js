const products = [
    { id: 1, name: 'Zapatilla Deportiva', price: 100, description: 'Zapatilla ideal para correr.', image: 'https://res.cloudinary.com/futbol-factory/image/upload/c_pad,f_auto,h_2000,w_1600/v1/products/235551_1.jpg' },
    { id: 2, name: 'Zapatilla Casual', price: 200, description: 'Zapatilla cómoda para uso diario.', image: 'https://static.futbolfactory.es/products/248317_1.webp' },
    { id: 3, name: 'Zapatilla de Baloncesto', price: 300, description: 'Zapatilla diseñada para el baloncesto.', image: 'https://static.futbolfactory.es/products/229128_1.webp' },
    { id: 4, name: 'Zapatilla para mujer', price: 250, description: 'Zapatilla para el género femenino.', image: 'https://static.futbolfactory.es/products/248645_1.webp' },
    { id: 5, name: 'Zapatilla de Fitness', price: 120, description: 'Zapatilla ideal para el gimnasio.', image: 'https://static.futbolfactory.es/products/248615_1.webp' },
    { id: 6, name: 'Zapatilla Botín', price: 180, description: 'Zapatilla para jugar al fútbol.', image: 'https://static.futbolfactory.es/products/247756_1.webp' },
    { id: 7, name: 'Zapatilla de Senderismo', price: 220, description: 'Zapatilla resistente para trekking.', image: 'https://static.futbolfactory.es/products/247756_1.webp' },
    { id: 8, name: 'Zapatilla de Correr', price: 150, description: 'Zapatilla ligera para correr largas distancias.', image: 'https://static.futbolfactory.es/products/247756_1.webp' },
    { id: 9, name: 'Zapatilla de Skate', price: 130, description: 'Zapatilla diseñada para el skateboarding.', image: 'https://static.futbolfactory.es/products/247756_1.webp' },
    { id: 10, name: 'Zapatilla de Moda', price: 260, description: 'Zapatilla estilizada para el uso diario.', image: 'https://static.futbolfactory.es/products/247756_1.webp' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = products;

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
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
            <input type="number" id="quantity-${product.id}" value="1" min="1" style="width: 60px;">
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
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);
    
    if (isNaN(quantity) || quantity < 1) {
        showNotification('Por favor, ingresa una cantidad válida.');
        return; // Salir de la función si la cantidad no es válida
    }
    
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += quantity; // Incrementar cantidad
    } else {
        cart.push({ ...products.find(p => p.id === productId), quantity });
    }
    
    updateCartCount();
    displayCart();
    localStorage.setItem('cart', JSON.stringify(cart)); // Almacenar el carrito en localStorage
    showNotification('Producto agregado al carrito');
}

function updateCartCount() {
    const cartDiv = document.getElementById('cart');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartDiv.innerText = `Carrito (${totalItems})`;
}

function displayCart() {
    const cartSection = document.getElementById('cart-section');
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity; // Calcular el total considerando la cantidad
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity} 
            <button onclick="removeFromCart(${index})">Eliminar</button></p>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    document.getElementById('total-price').innerText = `Total: $${total}`;
    cartSection.style.display = cart.length > 0 ? 'block' : 'none';

    // Agregar botón para vaciar el carrito
    const clearCartButton = document.getElementById('clear-cart-button');
    if (!clearCartButton) {
        const button = document.createElement('button');
        button.id = 'clear-cart-button';
        button.innerText = 'Vaciar carrito';
        button.onclick = clearCart;
        cartSection.appendChild(button);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCart();
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar localStorage
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart'); // Limpiar localStorage
    updateCartCount();
    displayCart();
    // No mostrar notificación de carrito vaciado
}

function checkout() {
    showNotification('Compra finalizada. ¡Gracias por tu compra!'); // Mostrar mensaje de compra
    clearCart(); // Usar la función clearCart para vaciar el carrito
}

function showNotification(message) {
    const notificationDiv = document.getElementById('notification');
    notificationDiv.innerText = message;
    notificationDiv.style.display = 'block';

    setTimeout(() => {
        notificationDiv.style.display = 'none';
    }, 3000); // Ocultar después de 3 segundos
}
