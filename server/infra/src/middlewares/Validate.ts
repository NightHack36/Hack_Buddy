import { Request, Response } from "express";

export const validate = (fields: any) => {
  return (req: Request, res: Response, next: any) => {
    const body = req.body;
    const keys = Object.keys(fields);
    let badRequest = false;
    for (let i = 0; i < keys.length; ++i) {
      if (body[keys[i]] === null || typeof body[keys[i]] !== fields[keys[i]]) {
        badRequest = true;
        break;
      }
    }
    if (badRequest)
      res.status(400).json({ message: "Bad request, data is incomplete" });
    else return next();
  };
};
