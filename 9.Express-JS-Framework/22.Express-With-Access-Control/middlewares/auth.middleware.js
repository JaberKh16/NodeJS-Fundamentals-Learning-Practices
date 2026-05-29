import jwt from 'jsonwebtoken';
import ac from '../configs/roles.js';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) || "secretkey";
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}


export const authorize = (action, resource) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const permission = ac.can(req.user.role)[action](resource);
        if (!permission.granted) {
            return res.status(403).json({ 
                message: `Forbidden: You don't have permission to ${action} ${resource}`
            });
        }
        req.permission = permission; // Attach permission info to request
        next();
    }
}
