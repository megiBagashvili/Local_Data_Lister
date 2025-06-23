import { Router, Response } from 'express';
import { and, eq, count } from 'drizzle-orm';
import { Server } from 'socket.io';
import db from '../db';
import { favorites } from '../db/schema';
import { authenticateToken, AuthenticatedRequest } from '../middleware/authenticateToken';

const createFavoritesRouter = (io: Server) => {
  const router = Router();

  /**
   * @route   POST /api/items/:itemId/favorite
   * @desc    Adds an item to favorites and broadcasts the new favorite count.
   * @access  Private
   */
  router.post(
    "/items/:itemId/favorite",
    authenticateToken,
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      try {
        const { itemId } = req.params;
        if (!req.user || typeof req.user === "string" || !("id" in req.user)) {
          res
            .status(401)
            .json({ message: "Invalid authentication token payload." });
          return;
        }
        const userId = req.user.id as string;

        try {
          await db.insert(favorites).values({ userId, itemId });
          const countResult = await db
            .select({ value: count() })
            .from(favorites)
            .where(eq(favorites.itemId, itemId));
          const newCount = countResult[0].value;
          io.emit("favorites-updated", { itemId, newCount });
          console.log(
            `[Socket.IO] Broadcasted favorites update for item ${itemId}. New count: ${newCount}`
          );

          res
            .status(201)
            .json({ message: "Item added to favorites successfully." });
        } catch (dbError: any) {
          if (dbError.code === "23505") {
            res
              .status(409)
              .json({ message: "This item is already in your favorites." });
          } else {
            throw dbError;
          }
        }
      } catch (error) {
        console.error("[Add Favorite] An error occurred:", error);
        res
          .status(500)
          .json({ message: "An error occurred while adding to favorites." });
      }
    }
  );

  /**
   * @route   DELETE /api/items/:itemId/favorite
   * @desc    Removes an item from favorites and broadcasts the new favorite count.
   * @access  Private
   */
  router.delete(
    "/items/:itemId/favorite",
    authenticateToken,
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      try {
        const { itemId } = req.params;
        if (!req.user || typeof req.user === "string" || !("id" in req.user)) {
          res
            .status(401)
            .json({ message: "Invalid authentication token payload." });
          return;
        }
        const userId = req.user.id as string;

        await db
          .delete(favorites)
          .where(
            and(eq(favorites.userId, userId), eq(favorites.itemId, itemId))
          );

        const countResult = await db
          .select({ value: count() })
          .from(favorites)
          .where(eq(favorites.itemId, itemId));
        const newCount = countResult[0].value;
        io.emit("favorites-updated", { itemId, newCount });
        console.log(
          `[Socket.IO] Broadcasted favorites update for item ${itemId}. New count: ${newCount}`
        );

        res.status(204).send();
      } catch (error) {
        console.error("[Remove Favorite] An error occurred:", error);
        res
          .status(500)
          .json({
            message: "An error occurred while removing from favorites.",
          });
      }
    }
  );

  return router;
};

export default createFavoritesRouter;