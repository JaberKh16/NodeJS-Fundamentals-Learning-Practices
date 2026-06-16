import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { log } from "console";
import { config } from 'dotenv';

// Load environment variables
config();

// Get environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// Create PostgreSQL adapter
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

// Initialize Prisma Client with adapter
const prisma = new PrismaClient({
    adapter,  // ← This is required in Prisma 7!
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