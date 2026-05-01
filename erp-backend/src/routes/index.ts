import { Router } from 'express';
import authRoutes from './auth.routes';
import formsRoutes from './forms.routes';
import userRoutes from './user.routes';

const router = Router();

// check health of APIs
router.get('/health', (req, res) => {
    res.status(200).send('<h1>API is Healthy!!</h1>')
})

// Auth Routes
router.use('/auth', authRoutes);

// User Routes
router.use('/user', userRoutes);


router.use('/forms', formsRoutes);

export default router;
