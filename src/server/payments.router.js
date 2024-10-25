import { Router } from 'express';
import controller from './payments.controller';

const router = Router();

router.route('/confirm').post(controller.confirmPayment);

export default router;
