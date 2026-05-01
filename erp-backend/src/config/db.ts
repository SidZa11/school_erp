const dotenv = require('dotenv');
import sql from 'mssql'

dotenv.config();

const config: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER!,
  database: process.env.DB_NAME!,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

export const sqlPool = new sql.ConnectionPool(config).connect();
