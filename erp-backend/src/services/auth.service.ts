import { UserPayloadType } from "user";
import { sqlPool } from "../config/db";
import jwt from 'jsonwebtoken';
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'encryption';
export const loginUser = async ({ username, password }: { username: string, password: string }) => {

  // SQL Client
  const pool = await sqlPool;
  
  // Required Parameter
  const requestBody = JSON.stringify({
    Userid: username,
    PasswordHash: password
  });

  // Execution of SP
  const result = await pool.request().query(
    `EXEC [dbo].[usp_get_LoginDetails] '${requestBody}'`
  );

  // Return Result
  const userData = result.recordset[0];

  // If Login Failed
  if(userData.Status !== 200) {
    const error = new Error(userData.Message);
    (error as any).status = userData.Status;
    throw error;
  }

  // Body of JWT
  const tokenPayload : UserPayloadType = {
    ID : userData.ID,
    UserID : userData.UserID,
    Username : userData.Username,
    RoleID : userData.RoleID
  }

  const token = jwt.sign(tokenPayload, JWT_SECRET, {algorithm : "HS256", expiresIn : '18h'})
  
  return {
    status : userData.Status,
    message : userData.Message,
    token : token
  }
  
};
