import request from 'supertest';
import app from '../server';
import db from '../db';
import bcrypt from 'bcrypt';

jest.mock('../db');
jest.mock('bcrypt');

const mockedDb = db as jest.Mocked<typeof db>;
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;


describe('Authentication API: /api/auth', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.log as jest.Mock).mockRestore();
    (console.error as jest.Mock).mockRestore();
  });


  describe('POST /register', () => {

    test('should register a new user successfully with valid data', async () => {
      (mockedDb.query.users.findFirst as jest.Mock).mockResolvedValue(undefined);
      mockedBcrypt.hash.mockResolvedValue('hashed_password_string' as never);

      const mockValues = jest.fn();
      (mockedDb.insert as jest.Mock).mockReturnValue({
        values: mockValues,
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          passwordConfirm: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'User registered successfully.' });
      
      expect(mockValues).toHaveBeenCalledTimes(1);
    });

    test('should return a 409 Conflict error if the email already exists', async () => {
      (mockedDb.query.users.findFirst as jest.Mock).mockResolvedValue({ id: 'some-id', email: 'test@example.com' });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Another User',
          email: 'test@example.com',
          password: 'password123',
          passwordConfirm: 'password123',
        });

      expect(response.status).toBe(409);
      expect(response.body).toEqual({ message: 'A user with this email already exists.' });
      expect(mockedDb.insert).not.toHaveBeenCalled();
    });

    test('should return a 400 Bad Request error for invalid input', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          passwordConfirm: 'password456',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors.fieldErrors).toHaveProperty('passwordConfirm');
    });
  });


  describe('POST /login', () => {

    const mockUser = {
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password_string',
    };

    test('should log in a user and return a JWT on success', async () => {
      (mockedDb.query.users.findFirst as jest.Mock).mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(true as never);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'correct_password',
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    test('should return a 401 Unauthorized error for a user that does not exist', async () => {
      (mockedDb.query.users.findFirst as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nouser@example.com',
          password: 'any_password',
        });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Invalid credentials.' });
      expect(mockedBcrypt.compare).not.toHaveBeenCalled();
    });

    test('should return a 401 Unauthorized error for an incorrect password', async () => {
      (mockedDb.query.users.findFirst as jest.Mock).mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(false as never);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrong_password',
        });
      
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Invalid credentials.' });
    });
  });
});