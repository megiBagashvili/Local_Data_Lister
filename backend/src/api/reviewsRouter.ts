import { Router, Response } from 'express';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import db from '../db';
import { items, reviews, users } from '../db/schema';
import { authenticateToken, AuthenticatedRequest } from '../middleware/authenticateToken';

const router = Router();


/**
 * @const reviewSchema
 * @desc A Zod schema to validate the body of a new review submission.
 * Enforces a rating between 1-5 and an optional comment.
 */
const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});


/**
 * @route   POST /api/items/:itemId/reviews
 * @desc    Submits a new review for a specific item after validating user authentication and input.
 * @access  Private (Requires JWT)
 */
router.post('/items/:itemId/reviews', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const validationResult = reviewSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ errors: validationResult.error.flatten() });
      return;
    }
    const { rating, comment } = validationResult.data;

    const { itemId } = req.params;

    if (!req.user || typeof req.user === 'string' || !('id' in req.user)) {
      res.status(401).json({ message: 'Invalid authentication token payload.' });
      return;
    }
    const userId = req.user.id as string;

    const itemExists = await db.query.items.findFirst({
      where: eq(items.id, itemId),
    });
    if (!itemExists) {
      res.status(404).json({ message: `Item with ID ${itemId} not found.` });
      return;
    }

    const existingReview = await db.query.reviews.findFirst({
      where: and(eq(reviews.userId, userId), eq(reviews.itemId, itemId)),
    });
    if (existingReview) {
      res.status(409).json({ message: 'You have already submitted a review for this item.' });
      return;
    }

    const newReview = await db.insert(reviews).values({
      rating,
      comment,
      itemId,
      userId,
    }).returning();

    console.log(`[Review] New review created for item ${itemId} by user ${userId}`);
    res.status(201).json(newReview[0]);

  } catch (error) {
    console.error('[Review Submission] An error occurred:', error);
    res.status(500).json({ message: 'An error occurred while submitting the review.' });
  }
});

export default router;