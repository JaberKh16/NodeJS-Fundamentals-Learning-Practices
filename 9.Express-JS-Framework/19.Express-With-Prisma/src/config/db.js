import { PrimsmaClient } from "@prisma/client";
import { log } from "console";



const prisma = new PrimsmaClient({
    log: NodeEnv === "development" ? ["query", "error", "warn"] : ["error"]
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