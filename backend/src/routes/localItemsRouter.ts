import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

/**
 * @route   GET /api/local-items
 * @desc    Primary data retrieval endpoint. Fetches a complete list of all "local items"
 * (e.g., restaurants, cafes, hotels) from the 'items' table in the database.
 * This endpoint is read-only and serves as the main data source for the frontend.
 * @access  Public
 *
 * @returns {Promise<Response>} A promise that resolves to the Express Response object.
 *
 * @success
 * - **Status Code:** 200 OK
 * - **Content-Type:** application/json
 * - **Body:** A JSON array of item objects, where each object conforms to the
 * 'items' table schema. Returns an empty array [] if the table is empty.
 *
 * @failure
 * - **Status Code:** 500 Internal Server Error
 * - **Content-Type:** application/json
 * - **Body:** A JSON object with a generic error message: { "message": "Error fetching data" }.
 * The specific database error is logged to the server console for debugging.
 */
router.get('/local-items', async (req: Request, res: Response) => {

  try {
    const items = await db.query.items.findMany();
    res.status(200).json(items);

  } catch (err) {
    console.error("Error fetching items from database:", err);
    res.status(500).json({ message: "Error fetching data" });
  }
});

export default router;