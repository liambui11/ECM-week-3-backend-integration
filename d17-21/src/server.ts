import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { DEFAULT_PORT } from './config/constants';

const PORT = process.env.PORT || DEFAULT_PORT;

console.log("🔗 DATABASE_URL loaded:", !!process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});