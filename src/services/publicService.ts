/**
 * Service for public APIs
 * Provides function to get all products from the database.
 */
import { Ingredient } from "../models/Ingredient";
import { Product } from "../models/Product";

/**
 * Retrieves all products from the database.
 * @returns {Promise<Product[]>} - Array of all products
 */
export function fetchProducts(): Promise<Product[]> {
  return Product.findAll({
    include: [
      {
        model: Ingredient,
        as: "listOfIngredients",
        through: { attributes: [] },
      },
    ],
  });
}
