import { Request, Response } from "express";

export const handleCors = (req: Request, res: Response, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-setHeaders", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
};
