/**
 * Sequelize Ingredient model definition.
 * Represents an ingredient in the database.
 */
import { Association, Model, Optional } from "sequelize";
import { Product } from "./Product";

/**
 * Ingredient attributes interface
 */
export interface IngredientAttributes {
  uuid: string;
  name: string;
  nameTranslated: string;
  listOfProducts?: Product[];
}

/**
 * Ingredient creation attributes interface
 */
export type IngredientCreationAttributes = Optional<
  IngredientAttributes,
  "uuid"
>;

/**
 * Ingredient model class
 */
export class Ingredient
  extends Model<IngredientAttributes, IngredientCreationAttributes>
  implements IngredientAttributes
{
  public uuid!: string;
  public name!: string;
  public nameTranslated!: string;
  public listOfProducts?: Product[];

  public static associations: {
    listOfProducts: Association<Ingredient, Product>;
  };
}
