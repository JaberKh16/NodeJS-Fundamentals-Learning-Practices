import express from 'express';
import { 
    handleListFetch, 
    handleNewEntry, 
    handleSearchById,
    handleUpdateById,
    handleDeleteById 
}  
from '../controllers/post.controller.js';

const router  = express.Router();

router.get('/index', handleListFetch);
router.post('/create', handleNewEntry);
router.get('/:id', handleSearchById);
router.put('/update/:id', handleUpdateById);
router.delete('/delete/:id', handleDeleteById);

export default router;