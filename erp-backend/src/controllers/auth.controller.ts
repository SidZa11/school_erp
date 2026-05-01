import { Request, Response, NextFunction } from 'express';
import { loginUser } from '../services/auth.service';
import { loginErrorHandler } from '@middlewares/error.middleware';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (err) {
    loginErrorHandler(err, res)
  }
};
