import { sqlPool } from "@config/db";
import { Request } from "express";


export const userCreation = async (req: Request) => {
  // console.log(req.user, req.body);

  const form = req.body;
  const user = req.user;
  const obj = JSON.stringify({ ...user, ...form });
  console.log(`EXEC [dbo].[usp_iu_UserCreation] '${obj.replace(/'/g, "''")}'`);
  // SQL Client
  const pool = await sqlPool;
  // Execution of SP
  const result = await pool.request().query(
    `EXEC [dbo].[usp_iu_UserCreation] '${obj.replace(/'/g, "''")}'`
  );

  const createUserResult = result.recordset[0];
  // console.log(createUserResult);

  // If Creation Failed
  if (createUserResult.Status !== 200) {
    const error = new Error(createUserResult.Message);
    (error as any).status = createUserResult.Status;
    throw error;
  }

  return {
    status: createUserResult.Status,
    message: createUserResult.Message,
  }
}