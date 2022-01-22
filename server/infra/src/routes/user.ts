import express from "express";
import { getMyHackathons } from "../controllers/hackathon";
import {
  login,
  register,
  resetPassword,
  searchUser,
} from "../controllers/user";
import { verifyObjectId } from "../middlewares/ObjectIdVerifier";
import { verifyToken } from "../middlewares/token-verifier";
import { validate } from "../middlewares/Validate";

const router = express.Router();

router.post(
  "/register",
  validate({
    firstName: "string",
    lastName: "string",
    email: "string",
  }),
  register
);

router.post("/login", validate({ email: "string", password: "string" }), login);

router.post(
  "/:id/reset-password",
  verifyToken,
  validate({ newPassword: "string" }),
  verifyObjectId(["id"]),
  resetPassword
);

router.get(
  "/:id/hackathon",
  verifyToken,
  verifyObjectId(["id"]),
  getMyHackathons
);

router.get("/", verifyToken, searchUser);

export default router;
