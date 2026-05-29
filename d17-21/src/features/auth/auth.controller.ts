import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { setAuthCookies, clearAuthCookies } from "../../core/utils/cookie.utils";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "../../core/utils/jwt.utils";
import { successResponse, AppError } from "../../core/utils/response";
import { HTTP_STATUS } from "../../config/constants";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      successResponse(res, "Registered successfully", result, HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken } = await authService.login(req.body);
      setAuthCookies(res, accessToken, refreshToken);
      successResponse(res, "Login successful");
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refresh_token;
      if (!token) throw new AppError(HTTP_STATUS.UNAUTHORIZED, "No refresh token provided");

      const { userId, email, role } = verifyRefreshToken(token);
      const newAccessToken = signAccessToken({ userId, email, role });
      const newRefreshToken = signRefreshToken({ userId, email, role });

      setAuthCookies(res, newAccessToken, newRefreshToken);
      successResponse(res, "Token refreshed");
    } catch (error) {
      next(new AppError(401, "Invalid or expired refresh token"));
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      clearAuthCookies(res);
      successResponse(res, "Logged out successfully");
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      successResponse(res, "Profile fetched successfully", req.user);
    } catch (error) {
      next(error);
    }
  }
}