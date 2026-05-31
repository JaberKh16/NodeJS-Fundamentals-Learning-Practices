import jwt from 'jsonwebtoken';
import crypto from 'crypto';



const generateAccessToken = (userId) => {
    return jwt.sign(
        {userId}, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '15m'}
    );
}

const generateRefreshToken = (userId) => {
    return jwt.sign(
        {userId}, 
        process.env.REFRESH_TOKEN_SECRET, 
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d'}
    );
}

const verifyAccessToken = (token, option) => {
    try {
        return jwt.verify(token, option);
    } catch (error) {
        return null;
    }
}


const generateResetToken = () => {
    const token = crypto.randomBytes(64).toString('hex');
    const expiry = new Date(Date.now() + 100 *60 *15); // Token expires in 15 minutes
    return { token, expiry };
} 

export { generateAccessToken, generateRefreshToken, verifyAccessToken, generateResetToken };   