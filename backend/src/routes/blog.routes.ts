import { Router } from "express";
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";
import { protect } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";

const router = Router();

// Rutas públicas
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

// Rutas protegidas para administración
router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
