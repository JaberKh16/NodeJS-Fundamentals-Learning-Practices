const router = require('express').Router();
const {  
    listCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');


router.get("/index", listCategories);
router.post("/create", createCategory);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);


module.exports = router;
