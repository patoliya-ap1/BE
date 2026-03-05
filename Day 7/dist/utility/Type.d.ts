declare global {
    namespace Express {
        interface Request {
            email?: string;
            role?: string;
        }
    }
}
export interface DecodedToken {
    email?: string;
    role?: string;
    iat: number;
    exp: number;
}
//# sourceMappingURL=Type.d.ts.map