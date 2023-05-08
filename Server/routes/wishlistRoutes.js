import express from "express"
const router = express.Router();
import { verifyToken } from "../middlewares/verifyToken.js";
import { getWishlist, addWishlist, deleteWishlist } from "../controllers/Wishlist.js"

router.get("/getAll",verifyToken, getWishlist);
router.post("/", verifyToken, addWishlist);
router.post("/remove/:id", verifyToken, deleteWishlist);1

export default router;