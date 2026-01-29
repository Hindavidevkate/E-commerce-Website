function showQR() {
  let paymentMethod = document.getElementById("Payment").value;
  let qr = document.getElementById("myQR");

  if (paymentMethod === "COD") {
    qr.style.display = "none";
  } else {
    qr.style.display = "block";
  }
}

document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    const orderData = {
        name: document.getElementById("inputName").value,
        address: document.getElementById("inputAddress").value,
        city: document.getElementById("inputCity").value,
        state: document.getElementById("inputState").value,
        pincode: document.getElementById("inputPin").value,
        mobile: document.getElementById("mobile").value,
        area: document.getElementById("area").value,
        houseNo: document.getElementById("house-no").value,
        paymentMethod: document.getElementById("Payment").value,
        items: cart
    };

    const res = await fetch("http://localhost:5000/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    });

    const data = await res.json();
    alert("Order Placed Successfully 🎉");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});
