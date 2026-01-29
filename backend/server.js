const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());
//This 2 lines for order routes 
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders",orderRoutes);



//For mongoDB connection

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.log("MongoDB Connection Error:", err.message);
  });


// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Frontend connected successfully" });
});

// Auth routes
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
