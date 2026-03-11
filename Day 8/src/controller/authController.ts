import { SignUpModel } from "../models/signup.model.js";
import { AppError } from "../utility/AppError.js";
import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import type { EmailDecodedToken } from "../utility/Type.js";
import { emailQueue } from "../queue/emailQueue.js";
import { smsQueue } from "../queue/smsQueue.js";
import { validationResult } from "express-validator";
import { eventEmitter } from "../services/eventEmitter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET;

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg = errors.array()[0]?.msg;

      const err = new AppError(errorMsg, 400);
      return next(err);
    }

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

    const accessToken = jwt.sign(
      {
        email,
        role: isUserExist.role || "user",
        emailConfirmed: isUserExist.emailConfirmed,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    res
      .status(200)
      .json({ success: true, message: "login success", accessToken });
  } catch (error) {
    next(error);
  }
};

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { password, ...rest } = req.body;
  try {
    if (!password || !password?.trim()) {
      const err = new AppError("password is required", 400);
      return next(err);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new SignUpModel({ ...rest, password: hashedPassword });

    const emailVerifyToken = jwt.sign({ email: rest.email }, JWT_SECRET || "", {
      expiresIn: "24h",
    });

    const url = `http://localhost:8000/auth/verify/${emailVerifyToken}`;

    const template = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <title>Email Verification</title>
            <style>
                .email-container {
                    font-family: sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .verification-button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 15px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h1>Verify Your Email Address</h1>
                <p>Hi there,</p>
                <p>Thank you for signing up! Please click the button below to verify your email address and activate your account:</p>
                
                <a href="${url}" style="color: white; class="verification-button">Verify Email</a>
                
                <p>If the button above does not work, please copy and paste the following link into your web browser:</p>
                <p>
                    <a href="${url}">${url}</a>
                </p>
                <p>Thanks,<br>Your Team</p>
            </div>
        </body>
        </html>`;

    const savedUser = await newUser.save();
    if (!savedUser) {
      const err = new AppError("error while signup", 400);
      return next(err);
    }

    const mailSend = await emailQueue.add(
      "sendVerificationEmail",
      {
        email: rest.email,
        subject: "Verify Email Address",
        template,
      },
      { attempts: 2 },
    );

    if (rest.phoneNumber) {
      const smsSend = await smsQueue.add(
        "sendVerificationSMS",
        {
          body: "Please verify your email for access resource",
          to: rest.phoneNumber,
          from: process.env.TWILIO_PHONE_NUMBER as string,
        },
        { attempts: 2 },
      );

      if (!smsSend) {
        return res.status(201).json({
          success: true,
          message: "signup successfully.",
          issue: "issue in sending sms",
        });
      }
    }

    if (!mailSend) {
      const err = new AppError("error while sending verify email", 400);
      return next(err);
    }

    res.status(201).json({ success: true, message: "signup successfully." });
  } catch (error) {
    next(error);
  }
};

export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  const { password, ...updateData } = req.body;
  const imageFile = req.file?.buffer;
  try {
    if (imageFile) {
      const compressedPath = path.join(
        __dirname,
        "assets",
        "compressedImages",
        `profile-${Date.now()}.jpg`,
      );
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

    const updatedProfile = await SignUpModel.findByIdAndUpdate(
      userId,
      updateData,
      { returnDocument: "after" },
    );

    if (!updatedProfile) {
      const err = new AppError("error while updating profile", 400);
      return next(err);
    }
    res
      .status(201)
      .json({ success: true, message: "profile updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const emailTokenVerifyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const emailToken: string = req.params.token as string;
  try {
    const decodeToken = jwt.verify(
      emailToken,
      JWT_SECRET || "",
    ) as EmailDecodedToken;
    if (!decodeToken) {
      const err = new AppError("failed to verify email", 400);
      return next(err);
    }

    const verifyUser = await SignUpModel.findOneAndUpdate(
      { email: decodeToken.email || "" },
      { emailConfirmed: true },
    );

    if (!verifyUser) {
      const err = new AppError("error while verifying user", 400);
      return next(err);
    }

    eventEmitter.emit("user.signup", {
      email: "patoliya.ap1@gmail.com",
      subject: "welcome message",
      template: `<h1>Welcome to Company</h1>`,
    });

    res.status(200).json({
      success: true,
      message: "email verified successfully ,check your email",
    });
  } catch (error) {
    next(error);
  }
};
