document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    calculateSummary();
});

function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart)
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty">Your cart is empty.</p>';
        const right = document.querySelector('.right');
        right.classList.add('hidden');
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-detail">
                    <h1>${item.title}</h1>
                    <p>$${item.price}</p>
                </div>
            </div>
            <div class="cart-item-details">
                <div class="quantity-control">
                    <button class="subtract">-</button>
                    <h2 class="quantity">${item.quantity}</h2>
                    <button class="add">+</button>
                </div>
                <button class="remove" data-id="${item.id}"></button>
            </div>
        </div>
    `).join('');

    setupRemoveButtons();
    setupQuantityButtons();
}

function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.cart-item .remove');

    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log('year');
            const productId = e.target.dataset.id;
            removeFromCart(productId);
            renderCartItems();
            calculateSummary();
        });
    });
}

function setupQuantityButtons() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.cart-item .add').forEach((button, index) => {
        button.addEventListener('click', () => {
            cart[index].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
            calculateSummary();
        });
    });

    document.querySelectorAll('.cart-item .subtract').forEach((button, index) => {
        button.addEventListener('click', () => {
            console.log('year');
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
                calculateSummary();
            }
        });
    });
}


function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    calculateSummary();
    console.log(productId);
}
console.log(JSON.parse(localStorage.getItem('cart')));
function calculateSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.discount').textContent = `-$${discount.toFixed(2)}`;
    document.querySelector('.delivery-fee').textContent = `$${deliveryFee}`;
    document.querySelector('.total').textContent = `$${total.toFixed(2)}`;
}
