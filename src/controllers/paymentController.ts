import express from "express";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { protectedRoutesMiddleware } from "../middleware";
import { fetchPayments } from "../services/paymentService";

export const paymentRouter = express.Router();

paymentRouter.get(
  "/payments/fetch-payments",
  protectedRoutesMiddleware,
  async (req, res) => {
    return res.status(HTTPStatusCode.OK).json(await fetchPayments());
  }
);
