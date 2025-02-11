const products = [
    { id: 1, name: 'iPhone 14 Pro', price: 999, category: 'mobiles', image: 'https://tse2.mm.bing.net/th?id=OIP.NdRJByfpQ3eHVCmMck1w3AHaHa&pid=Api&P=0&h=180.jpg' },
    { id: 2, name: 'Samsung Galaxy S23', price: 899, category: 'mobiles', image: 'https://tse3.mm.bing.net/th?id=OIP.ysS81DvdtdVZOGBg3AqBcAHaHa&pid=Api&P=0&h=180.jpg' },
    { id: 3, name: 'MacBook Pro', price: 1499, category: 'laptops', image: 'https://tse3.mm.bing.net/th?id=OIP.X6X4amDtr6iIdGKrCKfwxAHaGB&pid=Api&P=0&h=180.jpg' },
    { id: 4, name: 'Dell XPS 13', price: 1299, category: 'laptops', image: 'https://tse3.mm.bing.net/th?id=OIP.wGzUm-uD49ol6hemb1Q9vAHaHa&pid=Api&P=0&h=180.jpg' },
    { id: 5, name: 'AirPods Pro', price: 249, category: 'accessories', image: 'https://tse2.mm.bing.net/th?id=OIP.rLKkoi50dRp0i-VtVLPzAAAAAA&pid=Api&P=0&h=180.jpg' },
    { id: 6, name: 'iPad Air', price: 599, category: 'tablets', image: 'https://tse4.mm.bing.net/th?id=OIP.iGvun4K-ezhL2EzzSgV1tAHaHa&pid=Api&P=0&h=180.jpg' },
    { id: 7, name: 'Google Pixel 7', price: 699, category: 'mobiles', image: 'https://tse2.mm.bing.net/th?id=OIP.QWrMM61avJ6-n5mYFZ9oZgHaHa&pid=Api&P=0&h=180.jpg' },
    { id: 8, name: 'Sony WH-1000XM4', price: 349, category: 'accessories', image: 'https://tse1.mm.bing.net/th?id=OIP.MWOYW-y7-f6j7N6SGN9o_AHaGd&pid=Api&P=0&h=180.jpg' },
    { id: 9, name: 'HP Spectre x360', price: 1399, category: 'laptops', image: 'https://tse2.mm.bing.net/th?id=OIP.QJbGA2TviDghP2oWOM6sDQHaGT&pid=Api&P=0&h=180.jpg' },
    { id: 10, name: 'Samsung Galaxy Watch 5', price: 279, category: 'accessories', image: 'https://tse4.mm.bing.net/th?id=OIP.EkNHAk0PAfquR6iUmoKZfgHaHa&pid=Api&P=0&h=180.jpg' }
];

let cart = [];
function initCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}


function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.classList.add('added-animation');
    setTimeout(() => {
        cartIcon.classList.remove('added-animation');
    }, 500);

    saveCart();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    saveCart();
}

function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('open');
}

function emptyCart() {
    if (confirm('Are you sure you want to empty your cart?')) {
        cart = [];
        saveCart();
    }
}

displayProducts();
initCart();


document.addEventListener('click', (e) => {
    const cartPanel = document.getElementById('cartPanel');
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartPanel.contains(e.target) && !cartIcon.contains(e.target) && cartPanel.classList.contains('open')) {
        cartPanel.classList.remove('open');
    }
});