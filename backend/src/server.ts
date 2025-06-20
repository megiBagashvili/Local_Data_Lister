import express from "express";
import * as fs from "fs";
import cors from "cors";
import { LocalItem, LocalItemsArraySchema } from "./types/LocalItem";

const app = express();
const PORT = 3001;

app.use(cors());

let localItems: LocalItem[] = [];

const loadData = () => {
  try {
    const rawData = fs.readFileSync("data.json", "utf-8");
    const parsedData = JSON.parse(rawData);
    const validationResult = LocalItemsArraySchema.safeParse(parsedData);

    if (validationResult.success) {
      localItems = validationResult.data;
      console.log(
        `Successfully loaded and validated ${localItems.length} items from data.json.`
      );
    } else {
      console.error(
        "CRITICAL ERROR: Data validation failed for data.json structure."
      );
      console.error(validationResult.error.issues);
      throw new Error("Invalid data.json structure. Server cannot start.");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(
        `CRITICAL ERROR: Failed to load or parse data.json: ${err.message}`
      );
    } else {
      console.error(
        "CRITICAL ERROR: An unknown error occurred during data loading.",
        err
      );
    }
    throw err;
  }
};

try {
  loadData();
} catch (err) {
  console.error("Server startup aborted due to critical data loading error.");
  process.exit(1);
}

app.get("/api/local-items", (req, res) => {
  res.status(200).json(localItems);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
