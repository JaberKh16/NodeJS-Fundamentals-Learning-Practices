import express from "express";
import movieRoutes from "./routes/movieRoutes.js";



// setup express
const app = express();


// api routes
app.use("/movies", movieRoutes);


// json setup
app.use(express.json());


// routes
app.use("/api/movies", movieRoutes);
