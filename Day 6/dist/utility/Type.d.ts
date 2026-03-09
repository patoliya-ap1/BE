interface User {
    email: string;
    role: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export interface DecodedToken {
    user?: User;
    iat: number;
    exp: number;
}
export {};
//# sourceMappingURL=Type.d.ts.map