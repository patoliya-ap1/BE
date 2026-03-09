import express from "express";
import {
  emailTokenVerifyController,
  loginController,
  signupController,
} from "../../controller/authController.js";

export const authRouter = express.Router();

// login
authRouter.post("/login", loginController);

// signup
authRouter.post("/signup", signupController);

// verify
authRouter.get("/verify/:token", emailTokenVerifyController);


