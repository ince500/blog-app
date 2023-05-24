import express from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = (decoded as any).id;
      next();
    } catch (error) {
      res.status(403).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "No token provided" });
  }
};

export default auth;
