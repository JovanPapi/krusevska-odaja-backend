import { ProductCategory } from "../enum/ProductCategory";
import { Ingredient } from "../models/Ingredient";

export default interface ProductDTO {
  uuid: string;
  name: string;
  nameTranslated: string;
  description: string;
  price: number;
  productCategory: ProductCategory;
  listOfIngredients: Ingredient[];
}
