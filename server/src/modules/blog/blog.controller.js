import { validationResult } from 'express-validator';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from './blog.service.js';
import { successResponse } from '../../utils/apiResponse.js';

export const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }
    const blog = await createBlog(req.body);
    return successResponse(res, 201, 'Blog created', { blog });
  } catch (error) { next(error); }
};

export const list = async (req, res, next) => {
  try {
    const blogs = await getBlogs(req.query);
    return successResponse(res, 200, 'Blogs retrieved', { blogs });
  } catch (error) { next(error); }
};

export const getOne = async (req, res, next) => {
  try {
    const blog = await getBlogById(req.params.id);
    return successResponse(res, 200, 'Blog retrieved', { blog });
  } catch (error) { next(error); }
};

export const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ success: false, errors: errors.array() });
    const blog = await updateBlog(req.params.id, req.body);
    return successResponse(res, 200, 'Blog updated', { blog });
  } catch (error) { next(error); }
};

export const remove = async (req, res, next) => {
  try {
    await deleteBlog(req.params.id);
    return successResponse(res, 200, 'Blog deleted');
  } catch (error) { next(error); }
};