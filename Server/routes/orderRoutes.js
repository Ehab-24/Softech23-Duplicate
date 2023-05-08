import express from "express";
const router = express.Router();

import {addOrder, getAllOrders, getOrderByCustomerDate, getOrderByCustomerEmail, getOrderByCustomerName, getOrderById, deleteOrder, updateOrder} from "../controllers/Order.js"

router.post("/", addOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrder);
router.patch("/:id", updateOrder);
router.get("/name", getOrderByCustomerName);
router.get("/date", getOrderByCustomerDate);
router.get("/email", getOrderByCustomerEmail);

export default router;