import ServiceResponseDTO from "../dto/ServiceResponseDTO";
import { CreateWaiterDTO, UpdateWaiterDTO } from "../dto/WaiterDTO";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { Ingredient } from "../models/Ingredient";
import { Order } from "../models/Order";
import { OrderProduct } from "../models/OrderProduct";
import { Product } from "../models/Product";
import { ServingTable } from "../models/ServingTable";
import { Waiter } from "../models/Waiter";

/**
 * Service method that fetches waiters from database.
 * The waiters that don't have reserved tables, will be returned too with empty list.
 *
 * Used for administration page.
 *
 * @return {Promise<Waiter[]>} - List of waiters
 */
export function fetchWaitersForAdminPage(): Promise<Waiter[]> {
  return Waiter.findAll();
}

/**
 * Service method that fetches waiters from database.
 *
 * Used for Waiters page.
 *
 * @return {Promise<Waiter[]>} - List of waiters
 */
export function fetchWaitersForWaiterPage(): Promise<Waiter[]> {
  return Waiter.findAll({
    include: [
      {
        model: ServingTable,
        as: "listOfServingTables",
        where: { servingTableStatus: "Reserved" },
        required: false,
        include: [
          {
            model: Order,
            as: "listOfOrders",
            include: [
              {
                model: OrderProduct,
                as: "listOfOrderProducts",
                include: [
                  {
                    model: Product,
                    as: "product",
                    include: [{ model: Ingredient, as: "listOfIngredients" }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
}

/**
 * Service method that deletes waiter by given id.
 *
 * @param {string} waiterUuid - ID of the waiter
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function deleteWaiterById(
  waiterUuid: string
): Promise<ServiceResponseDTO> {
  try {
    const waiterToDelete = await Waiter.findByPk(waiterUuid);

    if (waiterToDelete === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Waiter was not found.",
      };
    }

    await waiterToDelete.destroy();

    return {
      statusCode: HTTPStatusCode.OK,
      message: `Waiter: "${waiterToDelete.firstName}" is successfully deleted.`,
    };
  } catch (error) {
    console.error("Error while deleting waiter:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while deleting waiter.",
    };
  }
}

/**
 * Service method that updates existing waiter.
 *
 * @param {UpdateWaiterDTO} waiterToUpdate - DTO that contains information for updating waiter.
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function updateWaiter(
  waiterToUpdate: UpdateWaiterDTO
): Promise<ServiceResponseDTO> {
  try {
    const waiter = await Waiter.findOne({
      where: { uuid: waiterToUpdate.uuid },
    });

    if (waiter === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: `Waiter: "${waiterToUpdate.firstName} ${waiterToUpdate.lastName}" was not found.`,
      };
    }

    const checkWaiterBySameCode = await Waiter.findOne({
      where: { code: waiterToUpdate.code },
    });

    if (checkWaiterBySameCode !== null) {
      return {
        statusCode: HTTPStatusCode.CONFLICT,
        message: `Waiter with code: ${checkWaiterBySameCode.code} already exist.`,
      };
    }

    waiter.set("firstName", waiterToUpdate.firstName);
    waiter.set("lastName", waiterToUpdate.lastName);
    waiter.set("code", waiterToUpdate.code);

    await waiter.save();

    return {
      statusCode: HTTPStatusCode.OK,
      message: `Waiter: "${waiter.firstName} ${waiter.lastName}" is successfully updated.`,
    };
  } catch (error) {
    console.error("Error while updating waiter:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while updating waiter.",
    };
  }
}

/**
 * Service method that creates new waiter
 *
 * @param {CreateWaiterDTO} waiterToCreate - DTO that contains information to create new waiter.
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function createWaiter(
  waiterToCreate: CreateWaiterDTO
): Promise<ServiceResponseDTO> {
  try {
    const checkWaiterIfExist = await Waiter.findOne({
      where: { code: waiterToCreate.code },
    });

    if (checkWaiterIfExist !== null) {
      return {
        statusCode: HTTPStatusCode.CONFLICT,
        message: `Waiter with code: ${waiterToCreate.code} already exist.`,
      };
    }

    await Waiter.create({ ...waiterToCreate });

    return {
      statusCode: HTTPStatusCode.CREATED,
      message: `Waiter with code: ${waiterToCreate.code} is successfully created.`,
    };
  } catch (error) {
    console.error("Error while creating waiter:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while creating waiter.",
    };
  }
}
