// imports router
import express from "express";

// create router
const router = express.Router();


// define routes
router.get("/", (req, res) => {
  res.send("Get all movies");
});

router.post("/", (req, res) => {
  res.send("Create a new movie");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Get movie with ID: ${id}`);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Update movie with ID: ${id}`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Delete movie with ID: ${id}`);
});

// export router
export default router;