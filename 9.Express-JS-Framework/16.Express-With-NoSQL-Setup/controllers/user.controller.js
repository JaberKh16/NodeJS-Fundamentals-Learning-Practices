const User = require('../models/user.model');
const {hashPasswordScrypt, verifyPasswordScrypt} = require('../utils/hash');
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require('../utils/token');

const handleUserRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Username, email and password are required.'
            });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({
                status: 409,
                success: false,
                message: 'User already exists with this email.'
            });
        }

        const hashedPassword = await hashPasswordScrypt(password);
        
        const newEntry = await User.create({
            username,
            email,
            password: hashedPassword.hash,
            salt: hashedPassword.salt,
            keyLength: hashedPassword.keyLength,
            options: hashedPassword.options
        });

        const accessToken = generateAccessToken({
            userId: newEntry._id,
            email: newEntry.email,
            role: newEntry.role || 'user'
        });
        
        const refreshToken = generateRefreshToken({
            userId: newEntry._id,
            email: newEntry.email,
            role: newEntry.role || 'user'
        });
        
        newEntry.refreshToken = refreshToken;
        await newEntry.save();

        return res.status(201).json({
            success: true,
            status: 201,
            message: 'User registered successfully',
            data: {
                user: {
                    id: newEntry._id,
                    username: newEntry.username,
                    email: newEntry.email,
                    role: newEntry.role || 'user'
                },
                accessToken,
                refreshToken
            }
        });

    } catch (err) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: err.message
        });
    }
};

const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Email and password are required.'
            });
        }

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: 'Invalid email or password.'
            });
        }

        const isValidPassword = await verifyPasswordScrypt(
            password,
            existingUser.password,
            existingUser.salt,
            existingUser.keyLength,
            existingUser.options
        );

        if (!isValidPassword) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: 'Invalid email or password.'
            });
        }

        const accessToken = generateAccessToken({
            userId: existingUser._id,
            email: existingUser.email,
            role: existingUser.role || 'user'
        });

        const refreshToken = generateRefreshToken({
            userId: existingUser._id,
            email: existingUser.email,
            role: existingUser.role || 'user'
        });

        existingUser.refreshToken = refreshToken;
        existingUser.accessToken = accessToken;
        existingUser.lastLogin = new Date();
        await existingUser.save();

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                    role: existingUser.role || 'user'
                },
                accessToken,
                refreshToken,
                expiresIn: '1h'
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};


const handleUserLogout = async(req, res) => {
    try {
        const { userId } = req.user;
        await User.findByIdAndUpdate(userId, { refreshToken: null });
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch(err){
        return res.status(500).json({
            status: 500,
            msg: err.message
        });
    }
}

const handleRefreshToken = async(req, res) => {
    try {
        const { refreshToken } = req.body;
        if(!refreshToken) {
            return res.status(400).json({
                status: 400,
                success: false,
                msg: 'Refresh token is required'
            })
        }

        // verify refresh token 
        const verified = verifyRefreshToken(refreshToken);
        if (!verified.valid) {
            return res.status(403).json({
                success: false,
                message: verified.error
            });
        }

        // Check if token exists in database
        const user = await User.findOne({
            _id: verified.payload.userId,
            refreshToken: refreshToken
        });
        
        if (!user) {
            return res.status(403).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }
        
        // Generate new access token
        const newAccessToken = generateAccessToken({
            userId: user._id,
            email: user.email,
            role: user.role
        });
        
        return res.status(200).json({
            success: true,
            accessToken: newAccessToken,
            expiresIn: '1h'
        });
        


    } catch(err) {
        return res.status(500).json({
            status: 500,
            msg: err.message
        });
    }
}


const handleUserList = async(req, res) => {
    try {
        const users = await User.find();
        if(!users){
            return res.stauts(204).json({
                status: 204,
                msg: 'Users not available'
            })
        }
        return res.status(200).json({
            status: 200,
            msg: 'Users list found',
            data: users
        })
    } catch(err){
        return res.status(500).json({
            status: 500,
            msg: err.message
        });
    }
}



const handleUserUpdate = async(req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updateUser){
            return res.status(204).json({
                status: 204,
                msg: 'User id not found'
            });
        }
        return res.status(200).json({
            status: 200,
            msg: 'User id updated',
            data: updateUser
        });
    } catch(err) {
        return res.status(500).json({
            status: 500,
            msg: err.message
        });
    }
}


const handleUserDelete = async(req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            return res.status(204).json({
                status: 204,
                msg: 'User id not found'
            });
        }
        return res.status(200).json({
            status: 200,
            msg: 'User id deleted',
            data: deleteUser
        });
    } catch(err) {
        return res.status(500).json({
            status: 500,
            msg: err.message
        });
    }
}



module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleUserLogout,
    handleRefreshToken,
    handleUserList,
    handleUserUpdate,
    handleUserDelete
}