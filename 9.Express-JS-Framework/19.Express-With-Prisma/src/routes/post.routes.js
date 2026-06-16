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
router.get('/create', handleNewEntry);
router.get('/:id', handleSearchById);
router.put('/:id', handleUpdateById);
router.delete('/:id', handleDeleteById);

export default router;