import { AppError } from "../utility/AppError.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    try {
        if (!token) {
            const err = new AppError("token required for access resource", 404);
            return next(err);
        }
        const decodedToken = jwt.verify(token, JWT_SECRET || "");
        if (decodedToken) {
            req.email = decodedToken.email || "";
            req.role = decodedToken.role || "";
            req.emailConfirmed = decodedToken.emailConfirmed || "";
            return next();
        }
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=authMiddleware.js.map