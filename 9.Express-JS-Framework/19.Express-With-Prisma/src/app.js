import express from "express";
import movieRoutes from "./routes/movie.routes.js";



// setup express
const app = express();


// api routes
app.use("/movies", movieRoutes);


// json setup => middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/api/movies", movieRoutes);
