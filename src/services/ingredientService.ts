import IngredientDTO from "../dto/IngredientDTO";
import ServiceResponseDTO from "../dto/ServiceResponseDTO";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { Ingredient } from "../models/Ingredient";

/**
 * Service method that retrieves all Ingredients from the database.
 *
 * @return {Promise<Ingredient[]>} - List of ingredients
 */
export function fetchIngredients(): Promise<Ingredient[]> {
  return Ingredient.findAll();
}

/**
 * Service method that deletes the ingredient by ID.
 *
 * @param {string} ingredientId - ID of the ingredient that needs to be deleted
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function deleteIgredientById(
  ingredientId: string
): Promise<ServiceResponseDTO> {
  try {
    const ingredientToDelete = await Ingredient.findOne({
      where: { uuid: ingredientId },
    });

    if (ingredientToDelete === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Ingredient not found.",
      };
    }

    await ingredientToDelete.destroy();

    return {
      statusCode: HTTPStatusCode.OK,
      message: `Ingredient: "${ingredientToDelete.name}" deleted successfully.`,
    };
  } catch (error) {
    console.error("Error while deleting ingredient", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while deleting ingredient.",
    };
  }
}

/**
 * Service method that updates existing ingredient.
 *
 * @param {IngredientDTO} ingredientToUpdate - DTO that contains information to update existing ingredient
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function updateIngredient(
  ingredientToUpdate: IngredientDTO
): Promise<ServiceResponseDTO> {
  try {
    const ingredient = await Ingredient.findOne({
      where: { uuid: ingredientToUpdate.uuid },
    });

    if (ingredient === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: `Ingredient: "${ingredientToUpdate.name}" was not found.`,
      };
    }

    ingredient.name = ingredientToUpdate.name;
    ingredient.nameTranslated = ingredientToUpdate.nameTranslated;

    await ingredient.save();

    return {
      statusCode: HTTPStatusCode.OK,
      message: `Ingredient: "${ingredient.name}" is updated successfully.`,
    };
  } catch (error) {
    console.error(
      `Error while upgrading Ingredient: ${ingredientToUpdate.name}.`
    );
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: `Error while upgrading Ingredient: ${ingredientToUpdate.name}.`,
    };
  }
}

/**
 * Service method that saves new ingredient in the database.
 *
 * @param {IngredientDTO} ingredientToCreate - DTO that contains information to create new ingredient.
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function createIngredient(
  ingredientToCreate: IngredientDTO
): Promise<ServiceResponseDTO> {
  try {
    const checkIngredientIfExist = await Ingredient.findOne({
      where: {
        name: ingredientToCreate.name,
        nameTranslated: ingredientToCreate.nameTranslated,
      },
    });

    if (checkIngredientIfExist !== null) {
      return {
        statusCode: HTTPStatusCode.CONFLICT,
        message: `Ingredient: "${ingredientToCreate.name} already exists."`,
      };
    }

    await Ingredient.create({ ...ingredientToCreate });

    return {
      statusCode: HTTPStatusCode.CREATED,
      message: `Ingredient: "${ingredientToCreate.name}" is created successfully.`,
    };
  } catch (error) {
    console.error(
      `Error while creating Ingredient: "${ingredientToCreate.name}".`
    );
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: `Error while creating Ingredient: "${ingredientToCreate.name}".`,
    };
  }
}
