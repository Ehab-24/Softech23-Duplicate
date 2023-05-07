import express from "express"
import {registerAdmin, registerCustomer, updateCustomer, loginAdmin, loginCustomer, getCustomer, getAllCustomers} from "../controllers/Auth.js"
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register/customer", registerCustomer);
router.post("/register/admin", registerAdmin);
router.post("/login/customer", loginCustomer);
router.post("/login/admin", loginAdmin);
router.patch("/customer/:id", verifyToken, updateCustomer);
router.get("/customer", verifyToken, getCustomer);
router.get("/customers", getAllCustomers);

export default router;