import { Router } from 'express';
import {
  create,
  myInquiries,
  allInquiries,
  getOne,
  reply,
  updateStatus,
} from './inquiry.controller.js';
import {
  createInquiryValidation,
  replyValidation,
  updateStatusValidation,
} from './inquiry.validation.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';

const router = Router();

router.use(authenticate);

// Customer routes
router.post('/', createInquiryValidation, create);
router.get('/my', myInquiries);

// Any authenticated user can view and reply (ownership checked in service)
router.get('/:id', getOne);
router.post('/:id/reply', replyValidation, reply);

// Admin and sales_agent only
router.get('/', authorize('admin', 'sales_agent'), allInquiries);
router.patch('/:id/status', authorize('admin', 'sales_agent'), updateStatusValidation, updateStatus);

export default router;