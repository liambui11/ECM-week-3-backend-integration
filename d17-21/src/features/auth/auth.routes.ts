import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authenticate } from "../../core/middlewares/authenticate.middleware";
import { validate } from "../../core/middlewares/validate";
import { loginSchema, registerSchema } from "./auth.validator";

const router = Router();
const authCtrl = new AuthController();

router.post("/register", validate(registerSchema), authCtrl.register.bind(authCtrl));
router.post("/login", validate(loginSchema), authCtrl.login.bind(authCtrl));
router.post("/refresh", authCtrl.refresh.bind(authCtrl));     
router.post("/logout", authenticate, authCtrl.logout.bind(authCtrl));
router.get("/me", authenticate, authCtrl.me.bind(authCtrl));  

export default router;