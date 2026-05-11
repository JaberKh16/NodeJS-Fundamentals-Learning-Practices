import e from "express";
import { prisma } from "../db";


// Get all users
export const getUsers = async (req, res) => {
    try {
       const users = await prisma.user.findMany();
       res.status(200).json({
        success: true,
        data: users
       });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
}

// get single user
export const getUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


// create user
export const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = await prisma.user.create({
            data: { name, email, age }
        });

        res.status(201).json({
            success: true,
            data: newUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// update user
export const updateUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, age } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email, age }
        });

        res.status(200).json({
            success: true,
            data: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// delete user
export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.user.delete({
            where: { id }
        });

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}