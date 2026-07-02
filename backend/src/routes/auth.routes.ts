import { Router } from "express";
import { login, getMe, registerAdmin } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Endpoint público para iniciar sesión
router.post("/login", login);

// Endpoints protegidos para administradores
router.get("/me", protect, getMe);
router.post("/register", protect, registerAdmin);

export default router;
