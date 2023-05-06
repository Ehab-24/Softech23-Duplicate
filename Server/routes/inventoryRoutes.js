import express from "express";
const router = express.Router();
import {addInventory, getAllInventory} from "../controllers/Inventory.js"

//Adding inventory
router.post("/", addInventory);

//Getting inventory
router.get("/", ()=>{});

export default router;