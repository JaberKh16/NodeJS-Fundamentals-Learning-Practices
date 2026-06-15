const User = require('../models/user.model');
const {hashPasswordScrypt, verifyPasswordScrypt} = require('../utils/hash');

const handleUserRegister = async(req, res) => {
    try {
        // check all field are provided
        const { username, email, password } = req.body;
        if(!username || !email || !password ){
            return res.status(409).json({
                status: 409,
                msg: 'username, email and password are required.'
            });
        }

        // check if email already exist
        const fetchExisted = await User.findOne({ emai: email });
        if(fetchExisted) {
            return res.status(200).json({
                stauts: 200,
                msg: 'User already existed.'
            });
        }

        // hashed the password
        const hashedPassword = hashPasswordScrypt(password);
        const newEntry = await User.create({
            name,
            email,
            password: hashed.hash,
            salt: hashed.salt,
            options: hashed.options
        });

        // Generate tokens
        const accessToken = generateAccessToken({
            userId: user._id,
            email: user.email,
            role: user.role
        });
        
        const refreshToken = generateRefreshToken({
            userId: user._id,
            email: user.email,
            role: user.role
        });
        
        // Store refresh token
        user.refreshToken = refreshToken;
        await user.save();


        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                accessToken,
                refreshToken
            }
        });

    } catch(err){
        return res.status(500).json({
            status: 500,
            msg: err.message
        });
    }
}


const handleUserLogin = async(req, res) => {
    try {
        // check if email already exist
        const { email, password } = req.body;
        if(!email || !password ){
            return res.status(409).json({
                status: 409,
                msg: 'email and password are required.'
            });
        }
        // Check if user exists (fixed typo: emai -> email)
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // if existed then compare password
        const isValidPassword = await verifyPasswordScrypt(
            password,
            existingUser.password, // stored hashed
            existingUser.salt,
            existingUser.options
        );

        if(!isValidPassword) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // generate access token 
        const accessToken = generateAccessToken({
            userId: existingUser._id,
            email: existingUser.email,
            role: existingUser.role || 'user'
        });

        // generate refresh token 
        const refreshToken = generateRefereshToken({
            userId: existingUser._id
        });

        // Store refresh token in database (optional but recommended)
        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        return res.status(200).json({
            status: 200,
            success: true,
            msg: 'Login successful',
            data: {
                user: {
                    id: existingUser._id,
                    email: existingUser.email,
                    name: existingUser.username,
                    role: existingUser.role
                },
                accessToken,
                refreshToken,
                expiresIn: '1h'
            }
        });


    } catch(err){
        console.error('Login error:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
}


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
        const updateUser = await User.findIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updateUser){
            return res.status(204).json({
                status: 204,
                msg: 'User id not found'
            });
        }
        return res.status(200).json({
            status: 200,
            msg: 'User id updated',
            data: deleteUser
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
        const deleteUser = await User.findIdAndDelete(req.params.id);
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
    handleUserList,
    handleUserUpdate,
    handleUserDelete
}