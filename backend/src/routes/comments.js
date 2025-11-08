import { Router } from "express";
import { getComments, getCommentById, createComment, deleteComment } from '../controllers/commentController.js';

const router = Router();

// GET /api/comments
router.get('/', getComments);

// GET /api/comments/:id
router.get('/:id', getCommentById);

//POST /api/comments
router.post('/', createComment);

// DELETE /api/comments/:id
router.delete('/:id', deleteComment);

export default router;