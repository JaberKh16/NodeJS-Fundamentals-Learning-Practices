import express from 'express';

import{
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller';


// create router
const router = express.Router();

// define routes
router.post("/create", createUser);
router.get("/index", getUsers);
router.get("/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

// export router
export default router;