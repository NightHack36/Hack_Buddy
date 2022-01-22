import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserTokenDetails } from "../models/user";
dotenv.config();

export const verifyToken = (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) {
      res.status(401).json({ message: "Unauthorize" });
      return;
    }
    const secret = process.env.JWT_SECRET_KEY as string;
    const data = jwt.verify(token, secret);
    const tokenDetails = data as UserTokenDetails;
    if (!tokenDetails.id) {
      res.status(401).json({ message: "Unauthorize" });
      return;
    }
    req.headers["user"] = JSON.stringify(data);
    return next();
  } catch (err: any) {
    console.log(err);
    res.status(401).json({ message: "Unauthorize" });
  }
};
