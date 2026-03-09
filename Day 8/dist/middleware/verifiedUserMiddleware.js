import { AppError } from "../utility/AppError.js";
export const verifiedUserMiddleware = (req, res, next) => {
    if (!req.emailConfirmed) {
        const err = new AppError("only verified user can access resource", 401);
        next(err);
    }
    next();
};
//# sourceMappingURL=verifiedUserMiddleware.js.map