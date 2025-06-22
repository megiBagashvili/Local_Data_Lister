import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * @interface AuthenticatedRequest
 * @desc Extends the default Express Request to include an optional 'user' property,
 * which will hold the decoded JWT payload for use in protected routes.
 */
export interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

/**
 * @function authenticateToken
 * @desc An Express middleware that validates a JSON Web Token (JWT).
 * It checks for a Bearer token in the Authorization header, verifies its
 * signature and expiration, and on success, attaches the decoded user
 * payload to the request object before passing control to the next handler.
 * @param {AuthenticatedRequest} req - The Express request object, extended to include 'req.user'.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {void}
 */
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).json({ message: 'Authentication token required.' });
    return;
  }

  if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined.");
    res.status(500).json({ message: 'Internal server configuration error.' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('JWT verification error:', err.message);
      res.status(403).json({ message: 'Token is invalid or expired.' });
      return;
    }
    req.user = user;
    next();
  });
};
