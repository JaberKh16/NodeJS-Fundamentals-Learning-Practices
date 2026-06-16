// import { PrismaClient } from '@prisma/client';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { log } from "console";
import { config } from 'dotenv';


// Load environment variables
config();

// Get environment
const NODE_ENV = process.env.NODE_ENV || 'development';


const prisma = new PrismaClient({
    log: NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        log("Database connected successfully");
    } catch (error) {
        log("Database connection failed:", error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        log("Database disconnected successfully");
    } catch (error) {
        log("Database disconnection failed:", error);
    }
};

export { connectDB, disconnectDB, prisma };