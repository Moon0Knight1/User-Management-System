const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AppDataSource = require("../db");
const auth = require("../middleware/auth");

// CREATE USER
router.post("/users", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const userRepo = AppDataSource.getRepository("User");

        const existingUser = await userRepo.findOneBy({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = userRepo.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepo.save(user);

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET
        );

        res.json({
            message: "User Created Successfully",
            token
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
});

// GET USERS
router.get("/users", auth, async (req, res) => {

    try {

        const userRepo = AppDataSource.getRepository("User");

        const users = await userRepo.find();

        res.json(users);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;