import request from 'supertest';
import app from '../server';
import db from '../db';

jest.mock('../db');

const mockedDb = db as jest.Mocked<typeof db>;

describe('GET /api/local-items', () => {

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.log as jest.Mock).mockRestore();
    (console.error as jest.Mock).mockRestore();
  });

  test('should return a 200 OK status and an array of items on success', async () => {
    const mockItems = [
      { id: 'res-1', name: 'Mock Restaurant', type: 'restaurant' },
    ];
    (mockedDb.query.items.findMany as jest.Mock).mockResolvedValue(mockItems);

    const response = await request(app).get('/api/local-items');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItems);
  });

  test('should return a 500 Internal Server Error if the database query fails', async () => {
    const dbError = new Error('Database connection failed');
    (mockedDb.query.items.findMany as jest.Mock).mockRejectedValue(dbError);

    const response = await request(app).get('/api/local-items');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error fetching data' });
  });
});
