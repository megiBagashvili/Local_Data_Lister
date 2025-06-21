import * as fs from "fs";
import { loadData } from "./localItemsRouter";

jest.mock("fs");

const mockedReadFileSync = fs.readFileSync as jest.Mock;

describe("Data Loading and Validation Logic (loadData)", () => {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  let consoleOutput: string[] = [];

  beforeEach(() => {
    console.log = (message) => consoleOutput.push(message);
    console.error = (message) => consoleOutput.push(message);
    consoleOutput = [];
  });

  afterAll(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  describe("when data.json is well-formed and valid", () => {
    it("should load, parse, and validate the data without errors", () => {
      const validData = [
        {
          id: "res-1",
          name: "Palaty",
          type: "restaurant",
          location: "2 Alexander Pushkin Street, Kutaisi 4600",
          photos: ["/images/palaty.jpg"],
        },
      ];

      mockedReadFileSync.mockReturnValue(JSON.stringify(validData));

      expect(() => loadData()).not.toThrow();

      const result = loadData();
      expect(result).toEqual(validData);

      expect(consoleOutput).toContain(
        "[Router] Successfully loaded and validated 1 items from data.json."
      );
    });
  });

  describe("when data.json is missing or unreadable", () => {
    it("should throw an error", () => {
      const errorMessage = "ENOENT: no such file or directory";
      mockedReadFileSync.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      expect(() => loadData()).toThrow(errorMessage);
    });
  });

  describe("when data.json is malformed", () => {
    it("should throw an error if the JSON is syntactically incorrect", () => {
      const malformedJson = '[{"id": "res-1", "name": "Test"';
      mockedReadFileSync.mockReturnValue(malformedJson);
      expect(() => loadData()).toThrow();
    });

    it("should throw an error if the data violates the LocalItem schema", () => {
      const schemaInvalidData = [
        {
          name: "Invalid Item",
          type: "cafe",
          location: "Someplace",
          photos: [],
        },
        {
          id: "item-2",
          name: "Another Invalid Item",
          type: "invalid_type",
          location: "Someplace else",
          photos: ["/photo.jpg"],
        },
      ];
      mockedReadFileSync.mockReturnValue(JSON.stringify(schemaInvalidData));

      expect(() => loadData()).toThrow(
        "Invalid data.json structure. Router cannot initialize."
      );
    });
  });
});
