import { UserPayloadType } from "user";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
const dotenv = require('dotenv');

dotenv.config();



// Secret key to verify JWTs (keep this secure in a real application!)
const JWT_SECRET = process.env.JWT_SECRET ||  'your-super-secret-key';

// Middleware to verify JWT
export const authenticateJWT = (req : Request, res:  Response, next : NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (token == null) {
    return res.json({status : 401, message : 'Unauthorized Request!'}); // Unauthorized
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden (invalid token)
    }
    
    // If the token is valid, attach the user payload to the request object
    req.user = user as UserPayloadType;
    next(); // Proceed to the next middleware or route handler
  });
};