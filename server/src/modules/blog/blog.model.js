import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['INSIGHTS', 'ENGINEERING', 'ANNOUNCEMENTS'],
  },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  coverUrl: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Draft',
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;