const crypto = require('crypto');

// tokens form env
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || crypto.randomBytes(32).toString('hex');
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || crypto.randomBytes(32).toString('hex');


// generate random token ID
function generateTokenId(tokenLength) {
    return crypto.randomBytes(tokenLength).toString('hex');
}

// create signature for token
function createSignature(payload, secret, expiresAt) {
    const data = JSON.stringify(payload) + expiresAt + secret;
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

function generateAccessToken(payload, expiresInSeconds = 3600) {
    const expiresAt = Date.now() + (expiresInSeconds * 1000);
    const tokenId = generateTokenId();
    const tokenPayload = {
        ...payload,
        tokenId,
        type: 'access',
        expiresAt
    }

    // create signature
    const signature = createSignature(tokenPayload, ACCESS_TOKEN_SECRET, expiresAt);

    // combined payload and signature
    const tokenData = {
        payload: tokenPayload,
        signature
    };

    // encode to base64 
    return Buffer.from(JSON.stringify(tokenData)).toString('base64');

}

// generate refresh token (expires in 7 days by default)
function generateRefreshToken(payload, expiresInSeconds = 604800) {
    const expiresAt = Date.now() + (expiresInSeconds * 1000);
    const tokenId = generateTokenId();
    
    const tokenPayload = {
        ...payload,
        tokenId,
        type: 'refresh',
        expiresAt
    };
    
    const signature = createSignature(tokenPayload, REFRESH_TOKEN_SECRET, expiresAt);
    
    const tokenData = {
        payload: tokenPayload,
        signature
    };
    
    return Buffer.from(JSON.stringify(tokenData)).toString('base64');
}


// Verify access token
function verifyAccessToken(token) {
    try {
        // Decode token
        const tokenData = JSON.parse(Buffer.from(token, 'base64').toString());
        const { payload, signature } = tokenData;
        
        // Check if token is expired
        if (payload.expiresAt < Date.now()) {
            return { valid: false, error: 'Token expired' };
        }
        
        // Verify signature
        const expectedSignature = createSignature(payload, ACCESS_TOKEN_SECRET, payload.expiresAt);
        
        if (signature !== expectedSignature) {
            return { valid: false, error: 'Invalid signature' };
        }
        
        return { valid: true, payload };
    } catch (error) {
        return { valid: false, error: 'Invalid token format' };
    }
}

// Verify refresh token
function verifyRefreshToken(token) {
    try {
        const tokenData = JSON.parse(Buffer.from(token, 'base64').toString());
        const { payload, signature } = tokenData;
        
        if (payload.expiresAt < Date.now()) {
            return { valid: false, error: 'Refresh token expired' };
        }
        
        const expectedSignature = createSignature(payload, REFRESH_TOKEN_SECRET, payload.expiresAt);
        
        if (signature !== expectedSignature) {
            return { valid: false, error: 'Invalid signature' };
        }
        
        return { valid: true, payload };
    } catch (error) {
        return { valid: false, error: 'Invalid token format' };
    }
}

// Refresh access token using refresh token
function refreshAccessToken(refreshToken) {
    const verified = verifyRefreshToken(refreshToken);
    
    if (!verified.valid) {
        return { success: false, error: verified.error };
    }
    
    // Generate new access token
    const newAccessToken = generateAccessToken({
        userId: verified.payload.userId,
        email: verified.payload.email,
        role: verified.payload.role
    });
    
    return {
        success: true,
        accessToken: newAccessToken,
        expiresIn: '1h'
    };
}

// Middleware to verify token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access token required'
        });
    }
    
    const verified = verifyAccessToken(token);
    
    if (!verified.valid) {
        return res.status(403).json({
            success: false,
            message: verified.error
        });
    }
    
    req.user = verified.payload;
    next();
}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    refreshAccessToken,
    authenticateToken
};

