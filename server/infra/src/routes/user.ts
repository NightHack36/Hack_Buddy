import express from "express";
import { login, register, resetPassword } from "../controllers/user";
import { verifyToken } from "../middlewares/token-verifier";
import { validate } from "../middlewares/Validate";

const router = express.Router();

router.post(
  "/register",
  validate({
    firstName: "string",
    lastName: "string",
    email: "string",
    mobileNumber: "number",
  }),
  register
);

router.post("/login", validate({ email: "string", password: "string" }), login);

router.post(
  "/:id/reset-password",
  validate({ newPassword: "string" }),
  verifyToken,
  resetPassword
);

export default router;
