/**
 * Sequelize Product model definition.
 * Represents a product in the database.
 */
import { Association, Model, Optional } from "sequelize";
import { ProductCategory } from "../enum/ProductCategory";
import { Ingredient } from "./Ingredient";
import { OrderProduct } from "./OrderProduct";

/**
 * Product attributes interface
 */
export interface ProductAttributes {
  uuid: string;
  name: string;
  nameTranslated: string;
  price: number;
  description: string;
  productCategory: ProductCategory;
  listOfIngredients?: Ingredient[];
  listOfOrderProducts?: OrderProduct[];
}

/**
 * Product creation attributes interface
 */
export type ProductCreationAttributes = Optional<ProductAttributes, "uuid">;

/**
 * Product model class
 */
export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public uuid!: string;
  public name!: string;
  public nameTranslated!: string;
  public price!: number;
  public description!: string;
  public productCategory!: ProductCategory;
  public listOfIngredients?: Ingredient[];
  public listOfOrderProduct?: OrderProduct[];

  public static associations: {
    listOfIngredients: Association<Product, Ingredient>;
    listOfOrderProducts: Association<Product, OrderProduct>;
  };
}
