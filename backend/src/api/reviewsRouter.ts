import { Router, Response } from 'express';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import db from '../db';
import { items, reviews } from '../db/schema';
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
 * @desc    Submits a new review and updates the item's average rating.
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

    const newReview = await db.transaction(async (tx) => {
      const itemExists = await tx.query.items.findFirst({
        where: eq(items.id, itemId),
      });
      if (!itemExists) {
        throw new Error('ItemNotFound');
      }

      const existingReview = await tx.query.reviews.findFirst({
        where: and(eq(reviews.userId, userId), eq(reviews.itemId, itemId)),
      });
      if (existingReview) {
        throw new Error('DuplicateReview');
      }

      const insertedReview = await tx.insert(reviews).values({
        rating,
        comment,
        itemId,
        userId,
      }).returning();
      
      const allItemReviews = await tx.query.reviews.findMany({
        where: eq(reviews.itemId, itemId),
      });

      const totalRating = allItemReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / allItemReviews.length;
      const roundedAverage = Math.round(averageRating * 10) / 10;

      await tx.update(items)
        .set({ rating: String(roundedAverage) })
        .where(eq(items.id, itemId));
      
      console.log(`[Rating Aggregation] Updated average rating for item ${itemId} to ${roundedAverage}`);

      return insertedReview[0];
    });
    
    res.status(201).json(newReview);

  } catch (error) {
    if (error instanceof Error) {
        if (error.message === 'ItemNotFound') {
            res.status(404).json({ message: `Item with ID ${req.params.itemId} not found.` });
            return;
        }
        if (error.message === 'DuplicateReview') {
            res.status(409).json({ message: 'You have already submitted a review for this item.' });
            return;
        }
    }
    console.error('[Review Submission] An error occurred:', error);
    res.status(500).json({ message: 'An error occurred while submitting the review.' });
  }
});

export default router;
