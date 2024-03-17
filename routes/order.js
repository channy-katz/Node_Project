import express from "express";
import { addOrder, getAllOrders, getOrderById, deleteOrder, updateOrder } from "../controllers/order.js";
import { auth } from "../middlwares/auth.js";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id/:role", deleteOrder);
router.post("/",auth, addOrder);
router.put("/:role/:ordNum", updateOrder);

export default router;