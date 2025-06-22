import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import localItemsRouter from './api/localItemsRouter';
import authRouter from './api/authRouter';
import reviewsRouter from './api/reviewsRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', localItemsRouter);
app.use('/api', reviewsRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Server] Server is running on http://localhost:${PORT}`);
  });
}

export default app;