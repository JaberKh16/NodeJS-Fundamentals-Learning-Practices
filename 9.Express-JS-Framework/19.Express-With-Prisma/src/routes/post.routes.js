import express from 'express';


const router  = express.Router();

router.get('/index', handleListFetch);
router.get('/create', handleNewEntry);
router.get('/:id', handleSearchById);
router.put('/:id', handleUpdateById);
router.delete('/:id', handleDeleteById);

export default router;