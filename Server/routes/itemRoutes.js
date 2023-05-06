import express from "express"
import {addItem, getAllItems, getItemById, deleteItem, updateItem, getItemByInventoryType} from "../controllers/Item.js"

const router = express.Router();

router.post("/", addItem);
router.get("/", getAllItems);
router.get("/type", getItemByInventoryType);
router.get("/:id", getItemById);
router.delete("/:id", deleteItem);
router.patch("/:id", updateItem);

export default router;