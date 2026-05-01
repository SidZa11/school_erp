import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error('🔥 Error:', err.message);
  res.status(err).json({ error: err.message || 'Internal Server Error' });
};


export const loginErrorHandler = (err: any, res : Response) => {
  console.error('🔥 Error:', err.message);
  res.status(err.status).json({ message: err.message || 'Internal Server Error' });
};


export const databaseError = (err : any, res : Response) => {
  console.log('Error: ', err);
  res.status(400).json({message: err.message || 'Database Error!'});
}

export const formErrorHandler = (err: any, res : Response) => {
  // console.error('🔥 Error:', err.message);
  res.status(err.status|| 403).json({ message: err.message || 'Internal Server Error' });
};