import jwt from 'jsonwebtoken';


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

export { generateAccessToken, generateRefreshToken };   