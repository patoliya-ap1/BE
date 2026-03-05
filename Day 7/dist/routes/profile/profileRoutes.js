import express from "express";
import multer from "multer";
import { getProfileByIDController, updateProfileController } from "../../controller/profileController.js";
const upload = multer({ storage: multer.memoryStorage() });
export const profileRouter = express.Router();
// get profile
profileRouter.get("/:id", getProfileByIDController);
// update profile
profileRouter.put("/:id", upload.single("profile-picture"), updateProfileController);
//# sourceMappingURL=profileRoutes.js.map