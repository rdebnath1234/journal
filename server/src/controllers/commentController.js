import xss from 'xss';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import asyncHandler from '../utils/asyncHandler.js';

const getPostComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.id })
    .sort({ createdAt: -1 })
    .populate('user', 'name');
  res.json(comments);
});

const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const message = xss(req.body.message);
  const name = req.user ? req.user.name : xss(req.body.name || 'Guest');

  const comment = await Comment.create({
    post: post._id,
    user: req.user ? req.user._id : undefined,
    name,
    message,
  });

  const populated = await comment.populate('user', 'name');

  res.status(201).json(populated);
});

export { getPostComments, addComment };
