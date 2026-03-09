import express from 'express'
import { postsRouter } from './posts/postsRoutes.js';
import { authRouter } from './auth/authRoutes.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { profileRouter } from './profile/profileRoutes.js';
import { streamRouter } from './stream/streamRoutes.js';

export const mainRouter = express.Router()

mainRouter.use("/posts", postsRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/profile", authMiddleware, profileRouter);
mainRouter.use("/stream", streamRouter);