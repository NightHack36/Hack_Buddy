import { Request, Response } from "express";
import mongoose from "mongoose";

export const verifyObjectId = (objectIdParams: string[]) => {
  return (req: Request, res: Response, next: any) => {
    for (let i = 0; i < objectIdParams.length; ++i) {
      if (!mongoose.Types.ObjectId.isValid(req.params[objectIdParams[i]])) {
        res.status(403).json({ message: "invalid id" });
        return;
      }
    }
    return next();
  };
};
