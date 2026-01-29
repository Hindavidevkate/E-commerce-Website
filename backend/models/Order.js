const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    mobile: String,
    area: String,
    houseNo: String,
    paymentMethod: String,

    items: [
        {
            id: Number,
            name: String,
            price: Number,
            quantity: Number,
            image: String
        }
    ],
    status: { type: String, default: "Placed" },


    totalAmount: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
