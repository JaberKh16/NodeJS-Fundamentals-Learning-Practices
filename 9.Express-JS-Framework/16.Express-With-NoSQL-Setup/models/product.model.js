const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required.'],
        unique: true,
        trim: true,
        maxlength: [100, 'product name cannot exceed 100 characters'],
        minlength: [5, 'product name must be atleast 5 characters']
    },
    code: {
        type: String, 
        required: [true, 'code is required.'],
        unique: true
    },
    description: {
        type: String,
        maxlength: [2000, 'Description cannot exceed 2000 characters'],
        trim: true
    },
    price: {
        type: Number, 
        required: [true, 'price is required.'],
        min: [0, 'Price cannot be negative'],
        max: [10000, 'Price cannot exceed 10,000'],
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'Price must be greater than 0'
        }
    },
    status: {
        type: Boolean,
        default: true,
        description:'true = active, false = inactive'
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Cotton', 'Electronics', 'Machinary', 'Science', 'Technology', 'Mecial', 'Liquid', 'Children'],
            message: '{VALUE} is not a valid category'
        },
        trim: true
    },
});


module.exports = mongoose.model('products', productSchema);