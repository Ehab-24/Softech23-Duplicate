import express from "express"
import {addReview, getAllReviews, getReviewById, getReviewsByItem, updateReview, deleteReview} from "../controllers/Review.js"
const router = express.Router();

router.post("/", addReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.get("/item/:id", getReviewsByItem);
router.delete("/:id", deleteReview);
router.patch("/:id", updateReview);

export default router;