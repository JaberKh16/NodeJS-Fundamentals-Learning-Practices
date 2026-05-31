import prismaClient from "../utils/prisma-client";
import * as AuthService from "../services/auth.services";


export const handleRegister = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const result = await AuthService.registerUser(email, password, username);
        const { accessToken, refreshToken } = result;
        
        // setup the cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: process.env.REFRESH_TOKEN_MAX_AGE ||  7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(201).json({ message: "User registered successfully", token: accessToken });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.loginUser(email, password);
        const { accessToken, refreshToken } = result;
        
        // setup the cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: process.env.REFRESH_TOKEN_MAX_AGE ||  7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(200).json({ message: "User logged in successfully", token: accessToken });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const handleLogout = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user info in req.user
        await AuthService.logoutUser(userId);
        
        // Clear the refresh token cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const handleRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const result = await AuthService.refreshAccessToken(refreshToken);
        const { accessToken } = result;
        return res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const handleForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const { message, token } = await AuthService.forgotPassword(email);
        // Here you would typically send the reset token to the user's email address
        return res.status(200).json({ message: message, token: token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const handleResetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const message = await AuthService.resetPassword(token, newPassword);
        return res.status(200).json({ message: message });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}