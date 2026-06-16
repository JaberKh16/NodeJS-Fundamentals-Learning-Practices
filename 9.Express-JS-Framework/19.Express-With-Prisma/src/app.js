import express from 'express';
import movieRoutes from './routes/movie.routes.js';
// import userRoutes from './routes/user.routes.js';
import postsRoutes from './routes/post.routes.js';



// setup express
const app = express();


// json setup => middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/api/movies", movieRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);

export default app;
