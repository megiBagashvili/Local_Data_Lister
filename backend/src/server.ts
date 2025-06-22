import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import localItemsRouter from './api/localItemsRouter';
import authRouter from './api/authRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', localItemsRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Server] Server is running on http://localhost:${PORT}`);
  });
}

export default app;