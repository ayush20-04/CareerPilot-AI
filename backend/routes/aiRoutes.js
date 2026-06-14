import express from "express";
import {
  analyzeProfile,
  generateAboutSection,
  generatePost,
  optimizeHeadline,
  suggestSkills
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze-profile", analyzeProfile);
router.post("/optimize-headline", optimizeHeadline);
router.post("/generate-about", generateAboutSection);
router.post("/suggest-skills", suggestSkills);
router.post("/generate-post", generatePost);

export default router;
