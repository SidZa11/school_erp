import { sqlPool } from "@config/db";
import { Request } from "express";


export const userList = async (req : Request) => {
    // console.log(req.user, req.body);

    const searchKey = req.body?.search || "";
    const active = req.body?.active || 0;
    const page = req.body?.page || 1;
    const pageSize = req.body?.pageSize || 6;
    
    // SQL Client
      const pool = await sqlPool;
    // Execution of SP
    const result = await pool.request().query(
        `EXEC [dbo].[usp_get_UserList] '${searchKey}', ${active}, ${page}, ${pageSize}`
    );

    // console.log(result)
    const userList = result.recordsets as any[];
    return {
        status: 200,
        message: "Success!!",
        pagination: userList[0][0],
        data: userList[1]
    }
}