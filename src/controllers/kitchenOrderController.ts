import express from "express";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { protectedRoutesMiddleware } from "../middleware";
import {
  fetchCompletedKitchenOrdersForWaiter,
  fetchUncompletedKitchenOrders,
  markKitchenOrderAsCompleted,
} from "../services/kitchenOrderService";

export const kitchenOrderRouter = express.Router();

kitchenOrderRouter.get(
  "/kitchen-orders/fetch-uncompleted-kitchen-orders",
  protectedRoutesMiddleware,
  async (req, res) => {
    return res
      .status(HTTPStatusCode.OK)
      .json(await fetchUncompletedKitchenOrders());
  }
);

kitchenOrderRouter.post(
  "/kitchen-orders/fetch-completed-kitchen-orders",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { waiterUuid } = req.body;
    return res
      .status(HTTPStatusCode.OK)
      .json(await fetchCompletedKitchenOrdersForWaiter(waiterUuid));
  }
);

kitchenOrderRouter.post(
  "/kitchen-orders/mark-order-as-completed",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { kitchenOrderUuid } = req.body;

    const serviceResponse = await markKitchenOrderAsCompleted(kitchenOrderUuid);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);
