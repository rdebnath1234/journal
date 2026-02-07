import slugify from 'slugify';
import xss from 'xss';
import Post from '../models/Post.js';
import asyncHandler from '../utils/asyncHandler.js';

const generateUniqueSlug = async (title) => {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let counter = 1;
  while (await Post.findOne({ slug })) {
    slug = `${base}-${counter}`;
    counter += 1;
  }
  return slug;
};

const getPosts = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || '6', 10), 1), 24);
  const search = req.query.search ? xss(req.query.search) : '';
  const tags = req.query.tags ? req.query.tags.split(',').map((tag) => tag.trim().toLowerCase()).filter(Boolean) : [];

  const query = { status: 'published' };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }
  if (tags.length) {
    query.tags = { $in: tags };
  }

  const total = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('author', 'name');

  res.json({
    data: posts,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  });
});

const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug, status: 'published' }).populate('author', 'name');
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json(post);
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'name');
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json(post);
});

const createPost = asyncHandler(async (req, res) => {
  const title = xss(req.body.title);
  const content = xss(req.body.content);
  const image = req.body.image ? xss(req.body.image) : '';
  const tags = Array.isArray(req.body.tags) ? req.body.tags.map((tag) => xss(tag).toLowerCase()) : [];
  const status = req.body.status || 'published';

  const slug = await generateUniqueSlug(title);

  const post = await Post.create({
    title,
    slug,
    content,
    image,
    tags,
    status,
    author: req.user._id,
  });

  res.status(201).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const updates = {};
  if (req.body.title) {
    updates.title = xss(req.body.title);
    updates.slug = await generateUniqueSlug(updates.title);
  }
  if (req.body.content) updates.content = xss(req.body.content);
  if (typeof req.body.image !== 'undefined') updates.image = xss(req.body.image || '');
  if (Array.isArray(req.body.tags)) updates.tags = req.body.tags.map((tag) => xss(tag).toLowerCase());
  if (req.body.status) updates.status = req.body.status;

  const updated = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(updated);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  await Comment.deleteMany({ post: post._id });
  await post.deleteOne();

  res.json({ message: 'Post deleted' });
});

export { getPosts, getPostBySlug, getPostById, createPost, updatePost, deletePost };
