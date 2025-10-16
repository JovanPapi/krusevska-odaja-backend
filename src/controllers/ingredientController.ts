import express from "express";
import { protectedRoutesMiddleware } from "../middleware";
import {
  createIngredient,
  deleteIgredientById,
  fetchIngredients,
  updateIngredient,
} from "../services/ingredientService";

export const ingredientRouter = express.Router();

ingredientRouter.get(
  "/ingredients/fetch-ingredients",
  protectedRoutesMiddleware,
  async (req, res) => {
    return res.json(await fetchIngredients());
  }
);

ingredientRouter.delete(
  "/ingredients/delete-ingredient",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { ingredientId } = req.body;

    const serviceResponse = await deleteIgredientById(ingredientId);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

ingredientRouter.post(
  "/ingredients/update-ingredient",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { ingredientToUpdate } = req.body;

    const serviceResponse = await updateIngredient(ingredientToUpdate);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

ingredientRouter.post(
  "/ingredients/create-ingredient",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { ingredientToCreate } = req.body;

    const serviceResponse = await createIngredient(ingredientToCreate);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);
