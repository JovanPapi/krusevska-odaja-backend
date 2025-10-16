/**
 * Express router for Product API.
 * Exposes a REST endpoint to get all products.
 */
import express from "express";
import { fetchProducts } from "../services/publicService";

const publicRouter = express.Router();

/**
 * GET /products
 * Returns all products from the database.
 */
publicRouter.get("/public/fetch-products", async (req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default publicRouter;
