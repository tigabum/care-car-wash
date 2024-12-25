import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase-admin";

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);

    // Check if user email is admin (you can modify this check based on your needs)
    if (!decodedToken.email?.endsWith("@wowcarwash.com")) {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
