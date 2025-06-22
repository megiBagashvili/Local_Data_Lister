import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const router = Router();
const SALT_ROUNDS = 10;
const registrationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  passwordConfirm: z.string(),
})
.refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match.",
  path: ["passwordConfirm"],
});


/**
 * @route   POST /api/auth/register
 * @desc    Registers a new user with advanced validation.
 * @access  Public
 * @body    { name: string, email: string, password: string, passwordConfirm: string }
 *
 * @returns {Promise<void>}
 *
 * @success
 * - **Status Code:** 201 Created
 * - **Body:** { "message": "User registered successfully." }
 *
 * @failure
 * - **Status Code:** 400 Bad Request (for validation errors)
 * - **Body:** { "errors": { ...detailed error messages... } }
 * - **Status Code:** 409 Conflict (for duplicate email)
 * - **Body:** { "message": "A user with this email already exists." }
 * - **Status Code:** 500 Internal Server Error
 * - **Body:** { "message": "An error occurred during registration." }
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

export default router;














