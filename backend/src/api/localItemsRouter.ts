import { Router, Response, NextFunction } from 'express';
import db from '../db';
import { items, favorites } from '../db/schema';
import { sql, eq, count, getTableColumns } from 'drizzle-orm';
import { authenticateToken, AuthenticatedRequest } from '../middleware/authenticateToken';

const router = Router();

/**
 * @function optionalAuthentication
 * @desc A middleware wrapper that makes token authentication optional for a route.
 * It checks for an 'Authorization' header. If one exists, it uses the standard
 * authenticateToken middleware to validate it. If no header is present, it simply
 * allows the request to proceed, enabling guest access.
 */
const optionalAuthentication = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next();
  }
  authenticateToken(req, res, next);
};

/**
 * @route   GET /api/local-items
 * @desc    Primary data retrieval endpoint. Fetches a complete list of all "local items"
 * and enhances them with favorite data (total count and user-specific status).
 * @access  Public (provides generic data) & Private (provides personalized data for authenticated users)
 */
router.get('/local-items', optionalAuthentication, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user && typeof req.user !== 'string' && 'id' in req.user ? req.user.id : null;

  try {
    const results = await db
      .select({
        ...getTableColumns(items), 
        favoriteCount: sql<number>`coalesce(count(${favorites.itemId}), 0)`.mapWith(Number),
        isFavoritedByUser: sql<boolean>`coalesce(bool_or(${favorites.userId} = ${userId}), false)`.mapWith(Boolean)
      })
      .from(items)
      .leftJoin(favorites, eq(items.id, favorites.itemId))
      .groupBy(items.id)
      .orderBy(items.name);

    res.status(200).json(results);

  } catch (err) {
    console.error("Error fetching items from database:", err);
    res.status(500).json({ message: "Error fetching data" });
  }
});

export default router;