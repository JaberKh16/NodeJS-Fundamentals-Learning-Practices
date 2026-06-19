const router = require('express').Router();
const {  
    handleListCategories,
    handleNewEntry,
    handleSearchById,
    handleSearchByName,
    handleUpdateCategory,
    handleDeleteCategory
} = require('../controllers/category.controller');


router.get("/index", handleListCategories);
router.post("/create", handleNewEntry);
router.get("/:id", handleSearchById);
router.get("/search", handleSearchByName);
router.put("/update/:id", handleUpdateCategory);
router.delete("/delete/:id", handleDeleteCategory);


module.exports = router;
