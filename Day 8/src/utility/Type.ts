declare global {
  namespace Express {
    interface Request {
      email?: string;
      role?: string;
      emailConfirmed?: string;
    }
  }
}

export interface DecodedToken {
  email?: string;
  role?: string;
  emailConfirmed?: string;
  iat: number;
  exp: number;
}

export interface EmailDecodedToken {
  email?: string;
  iat: number;
  exp: number;
}

export interface EmailData {
  email: string;
  subject: string;
  template: string;
}
