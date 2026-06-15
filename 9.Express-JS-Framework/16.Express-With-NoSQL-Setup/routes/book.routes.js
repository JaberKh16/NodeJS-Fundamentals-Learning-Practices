const express = require('express');
const {
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
} = require('../controllers/book.controller');

const router = express.Router();

// CRUD Routes (order matters - more specific routes first)
// Stats and special routes
router.get('/stats/dashboard', getBookStats);
router.get('/top-rated', getTopRatedBooks);
router.post('/bulk', bulkCreateBooks);

// Category and Author routes (before :id route to avoid conflicts)
router.get('/category/:category', getBooksByCategory);
router.get('/author/:author', getBooksByAuthor);

// ISBN route (before :id route)
router.get('/isbn/:isbn', getBookByIsbn);

// Main CRUD routes
router.get('/index', getAllBooks);
router.post('/create', createBook);
router.get('/:id', getBookById);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

// Update routes (PATCH)
router.patch('/:id/discount', applyDiscount);
router.patch('/:id/quantity', updateQuantity);
router.patch('/:id/status', updateBookStatus);

module.exports = router;