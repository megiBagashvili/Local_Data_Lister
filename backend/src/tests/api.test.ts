import request from 'supertest';
import app from '../server';
import { Request, Response } from 'express';


const mockLocalItems = [
  {
    id: 'test-1',
    name: 'Test Cafe',
    type: 'cafe',
    location: '123 Test Street',
    photos: ['/test.jpg'],
  },
  {
    id: 'test-2',
    name: 'Test Hotel',
    type: 'hotel',
    location: '456 Test Avenue',
    photos: ['/hotel.jpg'],
  }
];

jest.mock('../routes/localItemsRouter', () => {
  const express = require('express');
  const mockRouter = express.Router();
  mockRouter.get('/local-items', (req: Request, res: Response) => {
    res.status(200).json(mockLocalItems);
  });

  return mockRouter;
});

describe('API Endpoint: /api/local-items', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterAll(() => {
      (console.log as jest.Mock).mockRestore();
  });

  test('should return a 200 OK status with the correct JSON payload from the mock router', async () => {
    const response = await request(app).get('/api/local-items');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(mockLocalItems);
  });
});