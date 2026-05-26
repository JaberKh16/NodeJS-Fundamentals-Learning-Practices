const router = require("express").Router();
const { createCategory } = require("../controllers/category.controller");

router.get("/categories/index", listCategory);
router.post("/categories/create", createCategory);
router.get("/categories/:id", getCategory);
router.update("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

module.exports = router;
