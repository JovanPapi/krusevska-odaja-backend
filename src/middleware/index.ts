import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/jwt";
import cors from "cors";

export function protectedRoutesMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (authHeader === undefined) {
    return res.status(401).json("No token provided");
  }

  const token = authHeader.split(" ")[1]; // Bearer token
  const decoded = verifyToken(token);

  if (decoded === null) {
    return res.status(403).json("Invalid token");
  }

  (req as any).user = decoded;
  next();
}

export function corsConfigMiddleware() {
  return cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: false,
  });
}
