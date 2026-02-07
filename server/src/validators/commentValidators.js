import { body } from 'express-validator';

const commentCreateValidator = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('message').trim().isLength({ min: 2 }).withMessage('Message must be at least 2 characters'),
];

export { commentCreateValidator };
