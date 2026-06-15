const Book = require('../models/book.model'); 

// @desc    Create a new book
// @route   POST /api/books
// @access  Public
const createBook = async (req, res) => {
    try {
        const { isbn } = req.body;
        
        // Check if book already exists
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: 'Book with this ISBN already exists'
            });
        }

        const book = await Book.create(req.body);
        
        return res.status(201).json({
            success: true,
            data: book
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all books with filtering, sorting, pagination
// @route   GET /api/books
// @access  Public
const getAllBooks = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Filtering
        const filter = {};
        
        if (req.query.category) filter.category = req.query.category;
        if (req.query.language) filter.language = req.query.language;
        if (req.query.status) filter.status = req.query.status === 'true';
        if (req.query.author) filter.author = { $regex: req.query.author, $options: 'i' };
        if (req.query.name) filter.name = { $regex: req.query.name, $options: 'i' };
        
        // Price range filter
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
        }
        
        // Published date range
        if (req.query.fromDate || req.query.toDate) {
            filter.publishedDate = {};
            if (req.query.fromDate) filter.publishedDate.$gte = new Date(req.query.fromDate);
            if (req.query.toDate) filter.publishedDate.$lte = new Date(req.query.toDate);
        }
        
        // Sorting
        const sort = {};
        if (req.query.sortBy) {
            const sortField = req.query.sortBy;
            const sortOrder = req.query.order === 'desc' ? -1 : 1;
            sort[sortField] = sortOrder;
        } else {
            sort.createdAt = -1; // Default sort by newest
        }
        
        // Text search
        let books;
        let total;
        
        if (req.query.search) {
            // Text search on name, author, description
            books = await Book.find(
                { $text: { $search: req.query.search } },
                { score: { $meta: "textScore" } }
            )
            .sort({ score: { $meta: "textScore" } })
            .skip(skip)
            .limit(limit);
            
            total = await Book.countDocuments({ $text: { $search: req.query.search } });
        } else {
            books = await Book.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit);
                
            total = await Book.countDocuments(filter);
        }
        
        return res.status(200).json({
            success: true,
            count: books.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: books
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get book by ISBN
// @route   GET /api/books/isbn/:isbn
// @access  Public
const getBookByIsbn = async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found with this ISBN'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Public
const updateBook = async (req, res) => {
    try {
        // Prevent updating immutable fields
        delete req.body.createdAt;
        delete req.body._id;
        
        // Check for duplicate ISBN if updating
        if (req.body.isbn) {
            const existingBook = await Book.findOne({ 
                isbn: req.body.isbn, 
                _id: { $ne: req.params.id } 
            });
            if (existingBook) {
                return res.status(400).json({
                    success: false,
                    message: 'Another book with this ISBN already exists'
                });
            }
        }
        
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return updated document
                runValidators: true // Run schema validations
            }
        );
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Public
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: book
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Apply discount to a book
// @route   PATCH /api/books/:id/discount
// @access  Public
const applyDiscount = async (req, res) => {
    try {
        const { discountPercent } = req.body;
        
        if (!discountPercent || discountPercent < 0 || discountPercent > 90) {
            return res.status(400).json({
                success: false,
                message: 'Discount must be between 0 and 90 percent'
            });
        }
        
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        await book.applyDiscount(discountPercent);
        
        return res.status(200).json({
            success: true,
            message: `Discount of ${discountPercent}% applied successfully`,
            data: {
                originalPrice: book.price,
                discountPercentage: book.discountPercentage,
                finalPrice: book.finalPrice
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update book quantity (inventory)
// @route   PATCH /api/books/:id/quantity
// @access  Public
const updateQuantity = async (req, res) => {
    try {
        const { quantity, operation } = req.body;
        
        if (!quantity || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid quantity is required'
            });
        }
        
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        if (operation === 'add') {
            book.quantity += quantity;
        } else if (operation === 'subtract') {
            if (book.quantity - quantity < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Insufficient quantity available'
                });
            }
            book.quantity -= quantity;
        } else {
            book.quantity = quantity;
        }
        
        await book.save();
        
        return res.status(200).json({
            success: true,
            data: {
                name: book.name,
                quantity: book.quantity,
                status: book.status
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get books by category (using static method)
// @route   GET /api/books/category/:category
// @access  Public
const getBooksByCategory = async (req, res) => {
    try {
        const books = await Book.findByCategory(req.params.category);
        
        return res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get books by author
// @route   GET /api/books/author/:author
// @access  Public
const getBooksByAuthor = async (req, res) => {
    try {
        const books = await Book.find({ 
            author: { $regex: req.params.author, $options: 'i' },
            status: true
        }).sort({ publishedDate: -1 });
        
        return res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get bestselling/highly rated books
// @route   GET /api/books/top-rated
// @access  Public
const getTopRatedBooks = async (req, res) => {
    try {
        const minRating = parseFloat(req.query.minRating) || 4;
        const limit = parseInt(req.query.limit) || 10;
        
        const books = await Book.find({ 
            rating: { $gte: minRating },
            status: true
        })
        .sort({ rating: -1, price: 1 })
        .limit(limit);
        
        return res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Bulk create books
// @route   POST /api/books/bulk
// @access  Public
const bulkCreateBooks = async (req, res) => {
    try {
        const books = req.body;
        
        if (!Array.isArray(books) || books.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of books'
            });
        }
        
        const result = await Book.insertMany(books, { ordered: false });
        
        return res.status(201).json({
            success: true,
            message: `${result.length} books created successfully`,
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
            successful: error.result?.insertedCount || 0,
            failed: error.writeErrors?.length || 0
        });
    }
};

// @desc    Update book status (activate/deactivate)
// @route   PATCH /api/books/:id/status
// @access  Public
const updateBookStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (typeof status !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'Status must be boolean (true/false)'
            });
        }
        
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: `Book ${status ? 'activated' : 'deactivated'} successfully`,
            data: book
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get statistics (dashboard)
// @route   GET /api/books/stats/dashboard
// @access  Public
const getBookStats = async (req, res) => {
    try {
        const stats = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalBooks: { $sum: 1 },
                    totalValue: { $sum: { $multiply: ["$price", "$quantity"] } },
                    averagePrice: { $avg: "$price" },
                    averageRating: { $avg: "$rating" },
                    totalQuantity: { $sum: "$quantity" },
                    activeBooks: {
                        $sum: { $cond: ["$status", 1, 0] }
                    }
                }
            }
        ]);
        
        const categoryStats = await Book.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                    averagePrice: { $avg: "$price" }
                }
            }
        ]);
        
        return res.status(200).json({
            success: true,
            data: {
                overview: stats[0] || {},
                byCategory: categoryStats
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    getBookByIsbn,
    updateBook,
    deleteBook,
    applyDiscount,
    updateQuantity,
    getBooksByCategory,
    getBooksByAuthor,
    getTopRatedBooks,
    bulkCreateBooks,
    updateBookStatus,
    getBookStats
};