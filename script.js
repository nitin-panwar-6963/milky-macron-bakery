// --- Product Data ---
const products = [
    { id: 1, name: "Classic Vanilla Macaron", price: 2.50, description: "Smooth vanilla bean buttercream.", image: "vanilla-macaron.jpg" },
    { id: 2, name: "Salted Caramel Macaron", price: 2.75, description: "Sweet and salty caramel filling.", image: "caramel-macaron.jpg" },
    { id: 3, name: "Raspberry Rose Macaron", price: 3.00, description: "Tart raspberry jam with a hint of rose.", image: "raspberry-macaron.jpg" },
    { id: 4, name: "Pistachio Macaron", price: 2.75, description: "Nutty, creamy pistachio filling.", image: "pistachio-macaron.jpg" },
    { id: 5, name: "Chocolate Chip Cookie", price: 3.50, description: "Our famous gooey chocolate chip.", image: "choc-chip-cookie.jpg" },
    { id: 6, name: "Lemon Poppy Scone", price: 4.00, description: "Fluffy scone with a bright lemon glaze.", image: "lemon-scone.jpg" }
];

let cart = []; // The array to hold items currently in the cart

// --- Function to Render Products (Menu) ---
function renderProducts() {
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Add the <img> tag here
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

        productListDiv.appendChild(card);
    });

    // Attach event listeners to all new "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', event => {
            const productId = parseInt(event.target.dataset.id);
            addItemToCart(productId);
        });
    });
}

// --- Function to Add Item to Cart ---
function addItemToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        renderCart();
    }
}

// --- Function to Render Shopping Cart ---
function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    let total = 0;

    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        checkoutBtn.disabled = true;
        cartTotalSpan.textContent = '$0.00';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        cartItemsDiv.appendChild(itemElement);
    });

    cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
}

// --- Function to Handle Checkout ---
function handleCheckout() {
    if (cart.length > 0) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        alert(`Order Placed! 🥳\n\nItems: ${cart.length} unique items\nTotal: $${total.toFixed(2)}\n\nThank you for your order! (This is a simulation.)`);
        
        cart = [];
        renderCart();
    } else {
        alert('Your cart is empty. Please add some sweet treats!');
    }
}


// --- Initialize when the page loads ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();

    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
});