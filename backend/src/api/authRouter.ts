import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { authenticateToken, AuthenticatedRequest } from '../middleware/authenticateToken';

const router = Router();
const SALT_ROUNDS = 10;

/**
 * Defines the validation schema for new user registration.
 * Enforces rules for name, email format, password strength, and password confirmation.
 */
const registrationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match.",
  path: ["passwordConfirm"],
});

/**
 * @route   POST /api/auth/register
 * @desc    Registers a new user after validating input and checking for uniqueness.
 * @access  Public
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = registrationSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({ errors: validationResult.error.flatten() });
      return;
    }

    const { name, email, password } = validationResult.data;
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      res.status(409).json({ message: 'A user with this email already exists.' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await db.insert(users).values({
      name: name,
      email: email,
      password: hashedPassword,
    });

    console.log(`[Registration] User registered successfully: ${email}`);
    res.status(201).json({ message: 'User registered successfully.' });

  } catch (error) {
    console.error('[Registration] An error occurred:', error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
});



/**
 * @route   POST /api/auth/login
 * @desc    Authenticates a user by email and password, returning a JWT on success.
 * @access  Public
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Please provide both email and password.' });
            return;
        }
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });
        const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false;
        if (!user || !isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        if (!process.env.JWT_SECRET) {
            console.error("FATAL ERROR: JWT_SECRET is not defined.");
            res.status(500).json({ message: 'Internal server configuration error.' });
            return;
        }
        const payload = { id: user.id, name: user.name, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`[Login] User logged in successfully: ${email}`);
        res.status(200).json({
            message: 'Logged in successfully.',
            token: token,
        });
    } catch (error) {
        console.error('[Login] An error occurred:', error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});

/**
 * @route   GET /api/auth/profile
 * @desc    Fetches the profile of the currently authenticated user.
 * @access  Private (Requires JWT)
 */
router.get('/profile', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ user: req.user });
});


export default router;
