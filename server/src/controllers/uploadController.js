import asyncHandler from '../utils/asyncHandler.js';
import { cloudinary } from '../config/cloudinary.js';
import fs from 'fs';

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'northwind-journal',
    resource_type: 'image',
  });

  fs.unlink(req.file.path, () => {});

  res.status(201).json({
    url: result.secure_url,
    publicId: result.public_id,
  });
});

export { uploadImage };
