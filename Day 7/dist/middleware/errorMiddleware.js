import { AppError } from "../utility/AppError.js";
export const errorMiddleware = (error, req, res, next) => {
    error.message = error.message || "internal server error";
    error.statusCode = error.statusCode || 500;
    if (error.name === "CastError") {
        const message = `Resource not found. Invalid ${error.path}`;
        error = new AppError(message, 400);
    }
    if (error.name === "ValidationError") {
        const message = Object.values(error.errors)[0].message ||
            "validation error";
        error = new AppError(message, 400);
    }
    if (error.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid. Try again.";
        error = new AppError(message, 400);
    }
    if (error.name === "TokenExpiredError") {
        const message = "JSON Web Token has expired. Try again.";
        error = new AppError(message, 400);
    }
    res.status(error.statusCode).json({ success: false, message: error.message });
};
//# sourceMappingURL=errorMiddleware.js.map