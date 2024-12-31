import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import { auth } from "../config/firebase-admin";

interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const isAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = await auth.verifyIdToken(token);
    if (!decodedToken.admin) {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
