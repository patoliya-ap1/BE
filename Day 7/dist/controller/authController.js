import { SignUpModel } from "../models/signup.model.js";
import { AppError } from "../utility/AppError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const JWT_SECRET = process.env.JWT_SECRET;
export const loginController = async (req, res, next) => {
    const { email, password, role } = req.body;
    try {
        const isUserExist = await SignUpModel.findOne({ email });
        if (!isUserExist) {
            const err = new AppError(`user not found with email ${email}`, 404);
            return next(err);
        }
        const passwordMatch = await bcrypt.compare(password, isUserExist.password);
        if (!passwordMatch) {
            const err = new AppError(`invalid credentials`, 401);
            return next(err);
        }
        if (!JWT_SECRET) {
            const err = new AppError(`please provide JWT_SECRET variable`, 404);
            return next(err);
        }
        const accessToken = jwt.sign({ email, role: isUserExist.role || "" }, JWT_SECRET, { expiresIn: "24h" });
        res
            .status(200)
            .json({ success: true, message: "login success", accessToken });
    }
    catch (error) {
        next(error);
    }
};
export const signupController = async (req, res, next) => {
    const { password, ...rest } = req.body;
    try {
        if (!password || !password?.trim()) {
            const err = new AppError("password is required", 400);
            return next(err);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new SignUpModel({ ...rest, password: hashedPassword });
        const savedUser = await newUser.save();
        if (!savedUser) {
            const err = new AppError("error while signup", 400);
            return next(err);
        }
        res.status(201).json({ success: true, message: "signup successfully." });
    }
    catch (error) {
        next(error);
    }
};
export const updateProfileController = async (req, res, next) => {
    const userId = req.params.id;
    const { password, ...updateData } = req.body;
    const imageFile = req.file?.buffer;
    try {
        if (imageFile) {
            const compressedPath = path.join(__dirname, "assets", "compressedImages", `profile-${Date.now()}.jpg`);
            const compressedImage = await sharp(imageFile)
                .jpeg({ quality: 70 })
                .toFile(compressedPath);
            updateData.profilePicture = compressedPath;
        }
        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }
        const updatedProfile = await SignUpModel.findByIdAndUpdate(userId, updateData, { returnDocument: "after" });
        if (!updatedProfile) {
            const err = new AppError("error while updating profile", 400);
            return next(err);
        }
        res
            .status(201)
            .json({ success: true, message: "profile updated successfully." });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=authController.js.map