import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import localItemsRouter from './api/localItemsRouter';
import authRouter from './api/authRouter';
import reviewsRouter from './api/reviewsRouter';
import createFavoritesRouter from './api/favoritesRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
const favoritesRouter = createFavoritesRouter(io);
app.use('/api/auth', authRouter);
app.use('/api', localItemsRouter);
app.use('/api', reviewsRouter);
app.use('/api', favoritesRouter);


io.on('connection', (socket) => {
  console.log(`[Socket.IO] A user connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[Socket.IO] User disconnected: ${socket.id}`);
  });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`[Server] Server is running on http://localhost:${PORT}`);
    console.log(`[Socket.IO] WebSocket server is ready and listening.`);
  });
}

export default app;