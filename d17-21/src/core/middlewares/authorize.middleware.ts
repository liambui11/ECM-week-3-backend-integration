import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/response";

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError(401, "Unauthorized"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(403, `Forbidden: Requires role [${allowedRoles.join(", ")}]`)
      );
    }

    next();
  };
};