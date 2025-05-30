import express from "express";
import * as fs from "fs";

const app = express();
const PORT = 3001;

let localItems: any[] = [];

fs.readFile("data.json", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading data.json:", err);
  } else {
    try {
      localItems = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing data.json:", parseError);
    }
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the Backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
