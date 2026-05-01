import { createUser, getUserList } from '@controllers/user.controllers';
import { authenticateJWT } from '@middlewares/authenticateJWT.middleware';
import { Router } from 'express';


const router = Router();

router.post('/getList', authenticateJWT, getUserList);
router.post('/createUser', authenticateJWT, createUser);

export default router;