import express from "express"
import {registerAdmin, registerCustomer, loginAdmin, loginCustomer, getCustomer, getAdmin} from "../controllers/Auth.js"
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register/customer", registerCustomer);
router.post("/register/admin", registerAdmin);
router.post("/login/customer", loginCustomer);
router.post("/login/admin", loginAdmin);
router.get("/customer", verifyToken, getCustomer);
router.get("/admin", verifyToken, getAdmin);

export default router;