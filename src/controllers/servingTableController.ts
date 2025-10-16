import express from "express";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { protectedRoutesMiddleware } from "../middleware";
import {
  closeServingTable,
  createServingTableWithFirstOrder,
  deleteServingTableById,
  fetchServingTableById,
  fetchServingTables,
  payServingTablePrice,
  updateServingTableProperties,
  updateServingTableWithNewOrder,
} from "../services/servingTableService";

export const servingTableRouter = express.Router();

servingTableRouter.get(
  "/serving-tables/fetch-serving-tables",
  protectedRoutesMiddleware,
  async (req, res) => {
    return res.json(await fetchServingTables());
  }
);

servingTableRouter.post(
  "/serving-tables/fetch-serving-table-by-id",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { servingTableUuid } = req.body;

    return res
      .status(HTTPStatusCode.OK)
      .json(await fetchServingTableById(servingTableUuid));
  }
);

servingTableRouter.delete(
  "/serving-tables/delete-serving-table",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { servingTableUuid } = req.body;

    const serviceResponse = await deleteServingTableById(servingTableUuid);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

servingTableRouter.post(
  "/serving-tables/update-serving-table",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { servingTableToUpdate } = req.body;

    const serviceResponse = await updateServingTableProperties(
      servingTableToUpdate
    );

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

servingTableRouter.post(
  "/serving-tables/close-serving-table",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { servingTableUuid } = req.body;

    const serviceResponse = await closeServingTable(servingTableUuid);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

servingTableRouter.post(
  "/serving-tables/create-serving-table-with-first-order",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { servingTableToCreate } = req.body;

    const serviceResponse = await createServingTableWithFirstOrder(
      servingTableToCreate
    );

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

servingTableRouter.post(
  "/serving-tables/update-serving-table-with-new-order",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { servingTableToUpdate } = req.body;

    const serviceResponse = await updateServingTableWithNewOrder(
      servingTableToUpdate
    );

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

servingTableRouter.post(
  "/serving-tables/pay-serving-table-price",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { payServingTablePrice: requestBody } = req.body;

    const serviceResponse = await payServingTablePrice(requestBody);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);
