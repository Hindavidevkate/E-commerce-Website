const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            productId: Number,
            name: String,
            price: Number,
            quantity: Number,
            image: String
        }
    ],

    totalAmount: Number,

    address: {
        fullName: String,
        mobile: String,
        pincode: String,
        city: String,
        state: String,
        houseNo: String,
        area: String
    },

    orderDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        default: "Placed"
    }
});

module.exports = mongoose.model("Order", orderSchema);
