/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

// create the contact schema
const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add the contact'],
        },
        email: {
            type: String,
            required: [true, 'Please add the email'],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, 'Please add the phone number'],
        },
        user_id: {
            type:String,
            required: [true, 'User id is required.']
        }
    },
    {
        timestamps: true,
    }
);

// create the model
const contactModel = mongoose.model('Contact', contactSchema);

module.exports = contactModel;
