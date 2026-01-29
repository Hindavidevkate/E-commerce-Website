const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/place-order", async (req, res) => {
    try {
        const order = req.body;

        let total = 0;
        order.items.forEach(i => {
            total += i.price * i.quantity;
        });

        order.totalAmount = total;

        const newOrder = new Order(order);
        await newOrder.save();

        res.json({ message: "Order saved" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//This is for my orders get requests 

// Get all orders
router.get("/my-orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
