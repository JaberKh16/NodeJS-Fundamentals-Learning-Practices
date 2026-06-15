const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        trim: true,
        maxlength: [30, 'username can not exceed 30 characters'],
        minlength: [3, 'username must be atleast 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true,
        maxlength: [30, 'email can not exceed 30 characters'],
        minlength: [10, 'email must be atleast 10 characters'],
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true
    },
    salt: {
        type: String,
        required: true
    },
    keyLength: {
        type: Number,
        required: true,
        default: 64
    },
    options: {
        type: Object,
        default: {}
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    accessToken: {
        type: String,
        default: ''
    },
    refreshToken: {
        type: String,
        default: ''
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);