import express  from "express";
import { createOrder,getOrders, updateOrderStatus } from "../controllers/orderController.js";


const OrderRouter = express.Router();


OrderRouter.post("/",createOrder)
OrderRouter.get("/",getOrders)
OrderRouter.put("/:orderId/status", updateOrderStatus)

export default OrderRouter;