import app from './app';
import { sqlPool } from './config/db';
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

sqlPool.then(() => {
  console.log('✅ Connected to SQL Server');
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch((err : any) => {
  console.error('❌ DB connection failed:', err);
});
