// Business logic and database operations for User Authentication.

import bcrypt from "bcryptjs";
import prisma from "../../core/database/prisma";
import { signAccessToken, signRefreshToken, TokenPayload } from "../../core/utils/jwt.utils";
import { AppError } from "../../core/utils/response";
import { LoginDto, RegisterDto } from "./auth.dto";

export class AuthService {
  async register(dto: RegisterDto) {
    const existing = await prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new AppError(409, "Email already exists");

    const hashed = await bcrypt.hash(dto.password, 12);
    const user = await prisma.user.create({
      data: { email: dto.email, password: hashed, role: "user" },
    });

    return { id: user.id, email: user.email };
  }

  async login(dto: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new AppError(401, "Invalid credentials");

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new AppError(401, "Invalid credentials");

    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
    };
  }
}