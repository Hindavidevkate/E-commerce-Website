async function loadOrders() {

    let container = document.getElementById("ordersContainer");

    try {
        const res = await fetch("http://localhost:5000/api/orders/my-orders");
        const orders = await res.json();

        if (orders.length === 0) {
            container.innerHTML = "<h4>No orders yet</h4>";
            return;
        }

        orders.forEach(order => {

            let itemsHTML = "";
            order.items.forEach(item => {
                itemsHTML += `
                <div class="d-flex align-items-center mb-2">
                    <img src="${item.image}" width="60" class="me-2">
                    <div>
                        ${item.name} (x${item.quantity}) — ₹${item.price}
                    </div>
                </div>`;
            });

            container.innerHTML += `
            <div class="col-md-6">
                <div class="card mb-4 shadow">
                    <div class="card-body">
                        <h5>Order ID: ${order._id}</h5>
                        <p><b>Status:</b> ${order.status}</p>
                        <p><b>Total:</b> ₹${order.totalAmount}</p>
                        <p><b>Date:</b> ${new Date(order.date).toLocaleString()}</p>

                        <h6>Items:</h6>
                        ${itemsHTML}

                        <button class="btn btn-primary mt-2" onclick="trackOrder('${order.status}')">
                            Track Order
                        </button>
                    </div>
                </div>
            </div>`;
        });

    } catch (err) {
        container.innerHTML = "Error loading orders";
    }
}

loadOrders();
function trackOrder(status) {

    let stages = ["Placed", "Shipped", "Out for Delivery", "Delivered"];
    let currentIndex = stages.indexOf(status);

    let message = "Order Progress:\n\n";

    stages.forEach((stage, index) => {
        if (index <= currentIndex) {
            message += "✅ " + stage + "\n";
        } else {
            message += "⬜ " + stage + "\n";
        }
    });

    alert(message);
}
