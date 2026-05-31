import prismaClient from "../utils/prisma-client";
import { hashPassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken, generateResetToken } from "../utils/jwt.utils";

export const registerUser = async (email, password, username) => {
    if(!email || !password || !username) {
        throw new Error("Email, password, and username are required");
    }
    const existingUser = await prismaClient.user.findUnique({
        where: { email: email}
    });
    if(existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await prismaClient.user.create({
        data: {
            email: email,
            password: hashedPassword,
            username: username
        }
    });

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    return { accessToken, refreshToken };
}

export const loginUser = async (email, password) => {
    if(!email || !password) {
        throw new Error("Email and password are required");
    }
    const user = await prismaClient.user.findUnique({
        where: { email: email }
    });
    if(!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if(!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return { accessToken, refreshToken };
}

export const logoutUser = async (userId) => {
    // Invalidate refresh token logic can be implemented here (e.g., by storing invalidated tokens in a database)
    return { message: "User logged out successfully" };
}

export const refreshAccessToken = async (refreshToken) => {
    if(!refreshToken) {
        throw new Error("Refresh token is required");
    }
    // Validate the refresh token and generate a new access token
    const payload = validateRefreshToken(refreshToken);
    if(!payload) {
        throw new Error("Invalid refresh token");
    }
    const accessToken = generateAccessToken(payload.userId);
    const newRefreshToken = generateRefreshToken(payload.userId);

    return { accessToken, refreshToken: newRefreshToken };
}
 

export const forgotPassword = async (email) => {
    if(!email) {
        throw new Error("Email is required");
    }
    const user = await prismaClient.user.findUnique({
        where: {email: email}
    });
    if(!user) {
        throw new Error("User not found");
    }
    // generate reset token and send email logic can be implemented here
    const { token, expiry } = generateResetToken();
    await prismaClient.user.update({
        where: { id: user.id },
        data: {
            resetToken: token,
            resetTokenExpiry: expiry
        }
    });
    // Send reset email logic can be implemented here (e.g., using nodemailer)
    return { message: "Password reset email sent", token: token }; // In production, you would not return the token in the response
}

export const resetPassword = async(token, newPassword) => {
    if(!token || !newPassword) {
        throw new Error("Reset token and new password are required");
    }
    const user = await prismaClient.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpiry: {
                gt: new Date()
            }
        }
    });
    if(!user) {
        throw new Error("Invalid or expired reset token");
    }
    const hashedPassword = await hashPassword(newPassword);
    await prismaClient.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null
        }
    });
    return { message: "Password reset successfully" };
}