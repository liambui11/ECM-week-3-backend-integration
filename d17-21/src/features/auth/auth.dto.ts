import { z } from "zod";
import { loginSchema, registerSchema } from "./auth.validator";

export type RegisterDto = z.infer<typeof registerSchema>["body"];
export type LoginDto = z.infer<typeof loginSchema>["body"];
