import Blog from './blog.model.js';

export const createBlog = async (data) => Blog.create(data);

export const getBlogs = async (filters = {}) => {
  const query = {};
  if (filters.category) query.category = filters.category;
  if (filters.status) query.status = filters.status;
  return Blog.find(query).sort({ publishedDate: -1 }).lean();
};

export const getBlogById = async (id) => {
  const blog = await Blog.findById(id).lean();
  if (!blog) {
    const error = new Error('Blog not found');
    error.statusCode = 404;
    throw error;
  }
  return blog;
};

export const updateBlog = async (id, data) => {
  const blog = await Blog.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!blog) throw { statusCode: 404, message: 'Blog not found' };
  return blog;
};

export const deleteBlog = async (id) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) throw { statusCode: 404, message: 'Blog not found' };
};