const router = require("express").Router();
const { createCategory } = require("../controllers/category.controller");

router.get("/index", listCategory);
router.post("/create", createCategory);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
module.exports = router;
