import { verifyAccessToken } from "../utils/token";


export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    let token ;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.refreshToken) {
        token = req.cookies.refreshToken;
    }

    if (!token) {
        return res.status(401).json({ error: "Access token is missing" });
    }

    try {
        const decoded = verifyAccessToken(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}