import ProductDTO from "../dto/ProductDTO";
import ServiceResponseDTO from "../dto/ServiceResponseDTO";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { Ingredient } from "../models/Ingredient";
import { Product } from "../models/Product";

/**
 * Service method that retrieves all products from the database.
 *
 * @return {Promise<Product[]>} - List of products
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

/**
 * Service method that deletes product by given id.
 *
 * @param {string} productId - ID of the product
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function deleteProductById(
  productId: string
): Promise<ServiceResponseDTO> {
  try {
    const product = await Product.findOne({ where: { uuid: productId } });
    if (product === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "The product with given ID doesn't exist.",
      };
    }

    await Product.destroy({ where: { uuid: productId } });

    return {
      statusCode: HTTPStatusCode.OK,
      message: `Product: "${product.name}" is deleted.`,
    };
  } catch (error) {
    console.error("Error while deleting product:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "There was problem deleting the product.",
    };
  }
}

/**
 * Service method that updates existing product with new values for the fields.
 *
 * @param {ProductDTO} productToUpdate - DTO that contains information to update an existing product.
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function updateProduct(
  productToUpdate: ProductDTO
): Promise<ServiceResponseDTO> {
  try {
    const originalProduct = await Product.findOne({
      where: { uuid: productToUpdate.uuid },
    });

    if (originalProduct === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: `Product: "${productToUpdate.name} was not found.`,
      };
    }

    originalProduct.name = productToUpdate.name;
    originalProduct.nameTranslated = productToUpdate.nameTranslated;
    originalProduct.description = productToUpdate.description;
    originalProduct.price = productToUpdate.price;
    originalProduct.productCategory = productToUpdate.productCategory;
    await originalProduct.save();

    await (originalProduct as any).setListOfIngredients(
      productToUpdate.listOfIngredients
    );

    return {
      statusCode: HTTPStatusCode.OK,
      message: `Product: "${originalProduct.name}" is updated successfully.`,
    };
  } catch (error) {
    console.error("Error while updating product: ", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: `Error while updating product: "${productToUpdate.name}"`,
    };
  }
}

/**
 * Service method that saves new product in the database.
 *
 * @param {ProductDTO} productToCreate - DTO that contains information to create new product.
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function createProduct(
  productToCreate: ProductDTO
): Promise<ServiceResponseDTO> {
  try {
    const checkProductIfExist = await Product.findOne({
      where: {
        name: productToCreate.name,
        nameTranslated: productToCreate.nameTranslated,
      },
    });

    if (checkProductIfExist !== null) {
      return {
        statusCode: HTTPStatusCode.CONFLICT,
        message: `Product: "${productToCreate.name}" already exists.`,
      };
    }

    const prod = await Product.create({
      name: productToCreate.name,
      description: productToCreate.description,
      nameTranslated: productToCreate.nameTranslated,
      price: productToCreate.price,
      productCategory: productToCreate.productCategory,
    });

    if (
      productToCreate.listOfIngredients !== undefined &&
      productToCreate.listOfIngredients.length > 0
    ) {
      await (prod as any).setListOfIngredients(
        productToCreate.listOfIngredients
      );
    }
    return {
      statusCode: HTTPStatusCode.CREATED,
      message: `Product: "${productToCreate.name}" created successfully.`,
    };
  } catch (error) {
    console.error("Error while creating new product:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: `Error while creating product: ${productToCreate.name}`,
    };
  }
}
