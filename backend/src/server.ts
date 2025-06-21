import express from 'express';
import cors from 'cors';
import localItemsRouter from './routes/localItemsRouter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use('/api', localItemsRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Server] Server is running on http://localhost:${PORT}`);
  });
}

export default app;

