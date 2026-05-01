import { Router } from 'express';
import { getFormData } from '../controllers/forms.controller';

const router = Router();

router.get('/', getFormData);

export default router;
