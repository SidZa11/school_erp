import { sqlPool } from '../config/db';

export const getFormDataService = async () => {
  const pool = await sqlPool;
  const result = await pool.request().query('SELECT TOP 10 * FROM Forms');
  return result.recordset;
};
