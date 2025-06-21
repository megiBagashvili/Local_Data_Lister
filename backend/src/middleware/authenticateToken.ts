import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Extends the default Express Request to include an optional 'user' property,
 * which will hold the decoded JWT payload.
 */
export interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

/**
 * Express middleware to validate JWTs.
 * It checks for a Bearer token in the Authorization header, verifies it,
 * and attaches the decoded user payload to the request object before
 * passing control to the next handler.
 */
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Authentication token required." });
  }

  if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined.");
    return res
      .status(500)
      .json({ message: "Internal server configuration error." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("JWT verification error:", err.message);
      return res.status(403).json({ message: "Token is invalid or expired." });
    }
    req.user = user;
    next();
  });
};
