import express from "express";
import { CheckCredits, createContent, createImage, generateCompetitorAnalysis, generateSeo } from "../controllers/gpt.js";

const router = express.Router();

router.post("/", createContent);
router.post("/credits", CheckCredits);
router.post("/analysis", generateCompetitorAnalysis);
router.post("/seo", generateSeo);
router.post("/image", createImage);

export default router;