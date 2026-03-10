import express from "express";
import {
  emailTokenVerifyController,
  loginController,
  signupController,
} from "../../controller/authController.js";

import {
  loginValidator,
  signupValidator,
} from "../../middleware/expressValidatorMiddleware.js";
import { validate } from "../../utility/validate.js";

export const authRouter = express.Router();

// login
authRouter.post("/login", loginValidator, validate, loginController);

// signup
authRouter.post("/signup", signupValidator, validate, signupController);

// verify
authRouter.get("/verify/:token", emailTokenVerifyController);
