const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/register",async(req,res) => {
    const {name,email,password} = req.body;

    const userExists = await User.findOne({email});
    if (userExists)
        return res.status(400).json({message:"User already exists !"});

    const user = await User.create({name,email,password});
    res.json({message:"Registered successfully "});
});

router.get("/login", (req, res) => {
    res.send("Login API is working. Use POST request.");
});

router.post("/login",async (req,res) => {
    const {email,password} = req.body;
    
    const user = await User.findOne({email});
    if(!user || user.password !== password)
        return res.status(400).json({message:"Invalid credentials" });
    res.json({message:"Login successful", user});
    
});

//This is forgot Password API Backend 

router.post("/forgotPassword",async (req,res) =>{
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user)
        return res.status(400).json({message:"User not found"});
    const token = crypto.reandomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15*60*1000;
    await user.save();
    const resetLink = `http://localjpst:3000/resetPassword.html?token=${token}`;

    console.log("Reset Link : ",resetLink );
    res.json({message:"Reset link sent to your email"});
});
//This is reset Password API backend 
router.post("/resetPassword",async (req,res) => {

    const {token,password } = req.body;
    const user = await User.findOne({
        resetToken : token,
        resetTokenExpiry : {$gt:Date.now()}
        
    });
    if(!user)
        return res.status(400).json({message: "Invalid or expired token "});

    user.passwprd = await bcrypt.hash(password,10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.json({message:"Password reset Succefull "});
});

module.exports = router;