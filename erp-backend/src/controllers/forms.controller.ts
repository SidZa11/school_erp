import { Request, Response, NextFunction } from 'express';
import { getFormDataService } from '../services/forms.service';

export const getFormData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getFormDataService();
    res.json(data);
  } catch (err) {
    next(err);
  }
};
