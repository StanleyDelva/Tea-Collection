import express from 'express';

import { getPosts, addPost, updatePost, deletePost } from '../dboperations.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', addPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;