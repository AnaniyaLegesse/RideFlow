import { Router } from 'express';
import {
  create,
  list,
  getOne,
  update,
  remove,
} from './blog.controller.js';
import {
  createBlogValidation,
  updateBlogValidation,
} from './blog.validation.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog posts (public read, admin write)
 */

/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Get all published blog posts
 *     tags: [Blog]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [INSIGHTS, ENGINEERING, ANNOUNCEMENTS]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Published, Draft]
 *     responses:
 *       200:
 *         description: List of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     blogs:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Blog'
 */
router.get('/', list);

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: Get a single blog post by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     blog:
 *                       $ref: '#/components/schemas/Blog'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', getOne);

/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new blog post (admin / sales_agent)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, category, content, excerpt, coverUrl, author, publishedDate]
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [INSIGHTS, ENGINEERING, ANNOUNCEMENTS]
 *               content:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               coverUrl:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [Published, Draft]
 *     responses:
 *       201:
 *         description: Blog post created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     blog:
 *                       $ref: '#/components/schemas/Blog'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post('/', authenticate, authorize('admin', 'sales_agent'), createBlogValidation, create);

/**
 * @swagger
 * /blog/{id}:
 *   put:
 *     summary: Update a blog post (admin / sales_agent)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [INSIGHTS, ENGINEERING, ANNOUNCEMENTS]
 *               content:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               coverUrl:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [Published, Draft]
 *     responses:
 *       200:
 *         description: Blog post updated
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put('/:id', authenticate, authorize('admin', 'sales_agent'), updateBlogValidation, update);

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Delete a blog post (admin only)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete('/:id', authenticate, authorize('admin'), remove);

export default router;