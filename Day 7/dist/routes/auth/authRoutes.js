import express from "express";
import { loginController, signupController, } from "../../controller/authController.js";
export const authRouter = express.Router();
// login
authRouter.post("/login", loginController);
// signup
authRouter.post("/signup", signupController);
//# sourceMappingURL=authRoutes.js.map