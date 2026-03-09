import { AppError } from "../utility/AppError.js";
export const roleBaseMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.role || "")) {
            const message = `access denied for role ${req.role}`;
            const err = new AppError(message, 401);
            return next(err);
        }
        next();
    };
};
//# sourceMappingURL=roleBaseMiddleware.js.map