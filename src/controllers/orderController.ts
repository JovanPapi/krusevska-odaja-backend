import express from "express";
import { protectedRoutesMiddleware } from "../middleware";
import {
  deleteOrderFromServingTable,
  deleteProductFromOrder,
} from "../services/orderService";

export const orderRouter = express.Router();

orderRouter.delete(
  "/orders/delete-product-from-order",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { deleteProductFromOrderDTO } = req.body;

    const serviceResponse = await deleteProductFromOrder(
      deleteProductFromOrderDTO
    );

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

orderRouter.delete(
  "/orders/delete-order-from-serving-table",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { orderUuid } = req.body;

    const serviceResponse = await deleteOrderFromServingTable(orderUuid);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);
