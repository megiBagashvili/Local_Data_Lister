import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import { LocalItem, LocalItemsArraySchema } from '../types/LocalItem';

const router = Router();

let localItems: LocalItem[] = [];

const loadData = () => {
  try {
    const rawData = fs.readFileSync("data.json", "utf-8");
    const parsedData = JSON.parse(rawData);
    const validationResult = LocalItemsArraySchema.safeParse(parsedData);

    if (validationResult.success) {
      localItems = validationResult.data;
      console.log(
        `[Router] Successfully loaded and validated ${localItems.length} items from data.json.`
      );
    } else {
      console.error(
        "[Router] CRITICAL ERROR: Data validation failed for data.json structure."
      );
      console.error(validationResult.error.issues);
      throw new Error("Invalid data.json structure. Router cannot initialize.");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(
        `[Router] CRITICAL ERROR: Failed to load or parse data.json: ${err.message}`
      );
    } else {
      console.error("[Router] CRITICAL ERROR: An unknown error occurred during data loading.", err);
    }
    throw err;
  }
};

try {
  loadData();
} catch (err) {
  console.error("[Router] Data loading failed during router initialization.");
  throw err;
}
router.get('/local-items', (req: Request, res: Response) => {
  res.status(200).json(localItems);
});

export default router;