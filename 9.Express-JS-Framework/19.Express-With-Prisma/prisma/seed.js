import { PrimsaClient } from "@prisma/client";

const prisma = new PrimsaClient();

const seed = async () => {
    try {
        // clear existing data
        await prisma.user.deleteMany();
        await prisma.movie.deleteMany();

        // create users
        const user1 = await prisma.user.create({
            data: {
                name: "Alice",
                email: "alice@example.com",
                password: "password123"
            }
        });

        const user2 = await prisma.user.create({
            data: {
                name: "Bob",
                email: "bob@example.com",
                password: "password123"
            }
        });

        // create movies
        await prisma.movie.create({
            data: {
                title: "Inception",
                description: "A mind-bending thriller about dreams within dreams.",
                releaseDate: new Date("2010-07-16"),
                creatorId: user1.id
            }
        });

        await prisma.movie.create({
            data: {
                title: "The Matrix",
                description: "A hacker discovers the true nature of reality and his role in the war against its controllers.",
                releaseDate: new Date("1999-03-31"),
                creatorId: user2.id
            }
        });

        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

seed();