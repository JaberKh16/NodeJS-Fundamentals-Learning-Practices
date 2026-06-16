
import e from "express";
import { prisma } from "../config/db.js";
import { generateToken } from "../../utils/generate-token-helper.js";

const handleRegister = async (req, res) => {
    // process the rquested data
    try {
        const { name, email, password } = req.body;

        // validate data
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "Name, email, and password are required"
            });
        }

        // ... rest of the registration logic
        // check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "User with this email already exists"
            });
        }

        // create new user
        // hash the password before storing (not implemented here for simplicity)
        // const hashedPassword = await bcrypt.hash(password, 10);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

         res.status(201).json({
            success: true,
            data: newUser
        });

    } catch (error) {
        console.error("Error occurred while registering user:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            });
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            });
        }

        // generate token (not implemented here for simplicity)
        const token = generateToken(user, res);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error("Error occurred while logging in user:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}


const handleLogout = async (req, res) => {
    try {
        // clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        console.error("Error occurred while logging out user:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
}


export { handleRegister, handleLogin, handleLogout };