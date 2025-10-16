import express from "express";
import { protectedRoutesMiddleware } from "../middleware";
import {
  createProduct,
  deleteProductById,
  fetchProducts,
  updateProduct,
} from "../services/productService";

export const productRouter = express.Router();

productRouter.delete(
  "/products/delete-product",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { productId } = req.body;
    const serviceResponse = await deleteProductById(productId);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

productRouter.get(
  "/products/fetch-products",
  protectedRoutesMiddleware,
  async (req, res) => {
    res.json(await fetchProducts());
  }
);

productRouter.post(
  "/products/update-product",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { productToUpdate } = req.body;
    const serviceResponse = await updateProduct(productToUpdate);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);

productRouter.post(
  "/products/create-product",
  protectedRoutesMiddleware,
  async (req, res) => {
    const { productToCreate } = req.body;
    const serviceResponse = await createProduct(productToCreate);

    return res.status(serviceResponse.statusCode).json(serviceResponse.message);
  }
);
