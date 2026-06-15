const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        unique: true,
        trim: true,
        maxlength: [200, 'Product name cannot exceed 200 characters'],
        minlength: [3, 'Product name must be at least 3 characters']
    },
    isbn: {
        type: String, 
        required: [true, 'ISBN is required.'],
        unique: true,
        trim: true,
        match: [/^(97(8|9))?\d{9}(\d|X)$/, 'Please enter a valid ISBN number']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
        maxlength: [100, 'Author name cannot exceed 100 characters']
    },
    price: {
        type: Number,  // Changed from String to Number for better validation
        required: [true, 'Price is required.'],
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
        description: 'true = active, false = inactive'
    },
    // Additional professional fields
    description: {
        type: String,
        maxlength: [2000, 'Description cannot exceed 2000 characters'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography', 'Children'],
            message: '{VALUE} is not a valid category'
        },
        trim: true
    },
    publishedDate: {
        type: Date,
        required: [true, 'Published date is required'],
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: 'Published date cannot be in the future'
        }
    },
    pageCount: {
        type: Number,
        min: [1, 'Page count must be at least 1'],
        max: [5000, 'Page count cannot exceed 5000']
    },
    language: {
        type: String,
        required: [true, 'Language is required'],
        default: 'English',
        enum: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic'],
        trim: true
    },
    publisher: {
        type: String,
        required: [true, 'Publisher name is required'],
        trim: true,
        maxlength: [150, 'Publisher name cannot exceed 150 characters']
    },
    edition: {
        type: String,
        trim: true,
        default: '1st Edition'
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
        default: 0
    },
    discountPercentage: {
        type: Number,
        min: [0, 'Discount cannot be less than 0%'],
        max: [90, 'Discount cannot exceed 90%'],
        default: 0
    },
    rating: {
        type: Number,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot exceed 5'],
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: 'Rating must be an integer'
        }
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    coverImage: {
        type: String,
        match: [/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/, 'Please enter a valid image URL']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true  // Cannot be changed after creation
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,  // Automatically manages createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for better query performance
bookSchema.index({ name: 'text', author: 'text', description: 'text' });
bookSchema.index({ price: 1, category: 1 });
bookSchema.index({ publishedDate: -1 });

// Virtual field for final price after discount
bookSchema.virtual('finalPrice').get(function() {
    if (this.discountPercentage > 0) {
        return this.price * (1 - this.discountPercentage / 100);
    }
    return this.price;
});

// Middleware to update the 'updatedAt' field
bookSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Instance method example
bookSchema.methods.applyDiscount = function(discountPercent) {
    this.discountPercentage = Math.min(discountPercent, 90);
    return this.save();
};

// Static method example
bookSchema.statics.findByCategory = function(category) {
    return this.find({ category: category, status: true });
};

module.exports = mongoose.model('books', bookSchema);