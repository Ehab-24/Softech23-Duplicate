import express from "express";
const router = express.Router();

import {addOrder, getAllOrders, getOrderById, deleteOrder, updateOrder} from "../controllers/Order.js"

router.post("/", addOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrder);
router.patch("/:id", updateOrder);

export default router;