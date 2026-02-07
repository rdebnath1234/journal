import { body } from 'express-validator';

const postCreateValidator = [
  body('title').trim().isLength({ min: 4 }).withMessage('Title must be at least 4 characters'),
  body('content').trim().isLength({ min: 20 }).withMessage('Content must be at least 20 characters'),
  body('image').optional().isURL().withMessage('Image must be a valid URL'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Status is invalid'),
];

const postUpdateValidator = [
  body('title').optional().trim().isLength({ min: 4 }).withMessage('Title must be at least 4 characters'),
  body('content').optional().trim().isLength({ min: 20 }).withMessage('Content must be at least 20 characters'),
  body('image').optional().isURL().withMessage('Image must be a valid URL'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Status is invalid'),
];

export { postCreateValidator, postUpdateValidator };
