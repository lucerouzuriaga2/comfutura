import { Router } from "express";
import {
  getAllSections,
  getSectionByKey,
  upsertSection,
  deleteSection,
} from "../controllers/section.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Rutas públicas
router.get("/", getAllSections);
router.get("/:key", getSectionByKey);

// Rutas protegidas para administración
router.post("/:key", protect, upsertSection);
router.delete("/:key", protect, deleteSection);

export default router;
