const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 🔹 Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists!" });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Signup successful!" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 🔹 Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password!" });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password!" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful!", token, user });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
