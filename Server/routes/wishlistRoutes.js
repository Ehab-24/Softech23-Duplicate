import express from "express"
const router = express.Router();
import { verifyToken } from "../middlewares/verifyToken.js";
import { getWishlist, addWishlist, deleteWishlist } from "../controllers/Wishlist.js"

router.post("/getAll",verifyToken, getWishlist);
router.post("/", verifyToken, addWishlist);
router.delete("/:id", verifyToken, deleteWishlist);1

export default router;