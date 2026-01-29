let cart = JSON.parse(localStorage.getItem("cart")) || [];
let container = document.getElementById("cart-items");
let total = 0;

if (cart.length === 0) {
    container.innerHTML = "<h4>Your cart is empty 😢</h4>";
}

cart.forEach(item => {
    total += item.price * item.quantity;

    container.innerHTML += `
    <div class="col-md-4">
        <div class="card mb-3">
            <img src="${item.image}" class="card-img-top" height="200">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <div class="d-flex justify-content-center align-items-center gap-2">
                    <button class="btn btn-outline-danger" onclick="decreaseQty(${item.id})">➖</button>
                    <span><b>${item.quantity}</b></span>
                    <button class="btn btn-outline-success" onclick="increaseQty(${item.id})">➕</button>
                </div>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">
                    Remove From Cart
                </button>
            </div>
        </div>
    </div>
    `;
});

document.getElementById("total").innerText = "Total Amount: ₹" + total;
function removeFromCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Remove item
    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));

    // Refresh page to update cart view
    location.reload();
}
function increaseQty(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(i => i.id === productId);
    item.quantity += 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function decreaseQty(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(i => i.id === productId);

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        // if quantity becomes 0 → remove item
        cart = cart.filter(i => i.id !== productId);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
