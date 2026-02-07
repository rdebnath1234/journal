import express from 'express';
import {
  getPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { addComment, getPostComments } from '../controllers/commentController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { postCreateValidator, postUpdateValidator } from '../validators/postValidators.js';
import { commentCreateValidator } from '../validators/commentValidators.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/id/:id', protect, getPostById);
router.get('/:slug', getPostBySlug);

router.post('/', protect, postCreateValidator, validate, createPost);
router.put('/:id', protect, postUpdateValidator, validate, updatePost);
router.delete('/:id', protect, deletePost);

router.get('/:id/comments', getPostComments);
router.post('/:id/comments', optionalAuth, commentCreateValidator, validate, addComment);

export default router;
