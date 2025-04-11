import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { decode } from "next-auth/jwt";
dotenv.config();

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies["__Secure-next-auth.session-token"] ||
      req.cookies["next-auth.session-token"];

    if (!token) {
      res.status(401).json({ message: "No Token Found" });
      return;
    }
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) throw new Error("NEXTAUTH_SECRET is not defined");

    const decodedToken = await decode({
      token,
      secret,
    });

    if (!decodedToken) {
      res.status(401).json({ message: "Invalid Token" });
      return;
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
