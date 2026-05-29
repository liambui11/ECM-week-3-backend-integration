import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, TokenPayload } from "../utils/jwt.utils";
import { AppError } from "../utils/response";
import { HTTP_STATUS } from "../../config/constants";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.access_token;

  if (!token) {
    return next(new AppError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized: No token provided"));
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return next(new AppError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized: Invalid or expired token"));
  }
};