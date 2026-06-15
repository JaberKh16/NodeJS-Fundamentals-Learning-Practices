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
    },
    password: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true,
        maxlength: [30, 'email can not exceed 30 characters'],
        minlength: [10, 'email must be atleast 10 characters'],
    },
    salt: {
        type: String,
        required: true
    },
    options: {
        type: Object,
        default: {}
    },
    status: {
        type: Boolean,
        default: true,
        description: 'true=active, false=inactive'
    },
    role: {
        type: String,
        default: 'user'
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
        default: ''
    },
    lastLogin: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

    
});

module.exports = mongoose.model('users', userSchema);
