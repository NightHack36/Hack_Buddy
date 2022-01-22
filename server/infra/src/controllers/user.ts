import { Request, Response } from "express";
import User from "./../schemas/user";
import {
  IUser,
  LoginUserInput,
  RegisterUserInput,
  ResetPasswordInput,
  UserTokenDetails,
} from "../models/user";
import { UserStatus } from "../enums/UserStatus";
import { generateRandomString } from "../utilities/RandomStringGenerator";
import argon2 from "argon2";
import { sendMail } from "../utilities/SendMail";
import jwt from "jsonwebtoken";
import { removeUserPassword } from "../utilities/RemoveUserPassword";
import { mapObject } from "../utilities/RemoveUnderscoreId";

export const register = async (req: Request, res: Response) => {
  try {
    const body: RegisterUserInput = req.body;
    const password = generateRandomString(8);
    const timeMilli = new Date().getTime();
    const user: IUser = await new User({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email.trim(),
      password: await argon2.hash(password),
      mobileNumber: body.mobileNumber,
      createdTime: timeMilli,
      updatedTime: timeMilli,
      status: UserStatus.FTL,
    }).save();
    const mailBody =
      "Hello, \n" +
      "your password to login on Hack-Buddy Platform: " +
      password;
    await sendMail(
      user.email,
      "User credential from Hack-Buddy Platform",
      mailBody
    );
    res.status(201).json(user);
  } catch (err: any) {
    if (err.keyPattern.email) {
      res.status(403).json({ message: "email already exists" });
      return;
    }
    console.log(err);
    res.status(500).json(err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const body: LoginUserInput = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) {
      res.status(401).json();
      return;
    }
    const verfied = await argon2.verify(user.password, body.password);
    if (verfied) {
      const secretKey = process.env.JWT_SECRET_KEY as string;
      const token = jwt.sign(
        {
          id: user.id,
        },
        secretKey,
        {
          expiresIn: "48h",
        }
      );
      const tempUser = removeUserPassword(mapObject(user));
      res.status(200).json({ user: tempUser, token });
    } else {
      res.status(401).json();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const body: ResetPasswordInput = req.body;
    const userId = req.params.id;
    const userDetails: UserTokenDetails = JSON.parse(
      req.headers["user"] as string
    );
    if (userDetails.id !== userId) {
      res.status(401).json();
      return;
    }
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          password: await argon2.hash(body.newPassword),
          status: UserStatus.ACTIVE,
        },
      }
    );
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
