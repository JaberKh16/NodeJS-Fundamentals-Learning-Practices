
import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';



const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));


export default app;