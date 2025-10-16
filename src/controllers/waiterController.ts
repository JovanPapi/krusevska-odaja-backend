import express from "express";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { protectedRoutesMiddleware } from "../middleware";
import {
  createWaiter,
  deleteWaiterById,
  fetchWaitersForAdminPage,
  fetchWaitersForWaiterPage,
  updateWaiter,
} from "../services/waiterService";

export const waiterRouter = express.Router();

waiterRouter.get(
  "/waiters/fetch-waiters-for-admin-page",
  protectedRoutesMiddleware,
  async (req, res) => {
    return res.status(HTTPStatusCode.OK).json(await fetchWaitersForAdminPage());
  }
);

waiterRouter.get(
  "/waiters/fetch-waiters-for-waiter-page",
  protectedRoutesMiddleware,
  async (req, res) => {
    return res
      .status(HTTPStatusCode.OK)
      .json(await fetchWaitersForWaiterPage());
  }
);

waiterRouter.delete(
  "/waiters/delete-waiter",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { waiterUuid } = req.body;

    const serviceResponse = await deleteWaiterById(waiterUuid);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

waiterRouter.post(
  "/waiters/update-waiter",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { waiterToUpdate } = req.body;

    const serviceResponse = await updateWaiter(waiterToUpdate);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

waiterRouter.post(
  "/waiters/create-waiter",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { waiterToCreate } = req.body;

    const serviceResponse = await createWaiter(waiterToCreate);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);
