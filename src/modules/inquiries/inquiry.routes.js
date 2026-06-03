import { Router } from 'express';
import { create, myInquiries, allInquiries, getOne, reply, updateStatus } from './inquiry.controller.js';
import { createInquiryValidation, replyValidation, updateStatusValidation } from './inquiry.validation.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';

const router = Router();

router.use(authenticate);

router.post('/', createInquiryValidation, create);
router.get('/my', myInquiries);
router.get('/:id', getOne);
router.post('/:id/reply', replyValidation, reply);
router.get('/', authorize('admin', 'sales_agent'), allInquiries);
router.patch('/:id/status', authorize('admin', 'sales_agent'), updateStatusValidation, updateStatus);

export default router;