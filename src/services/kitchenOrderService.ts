import { Op } from "sequelize";
import ServiceResponseDTO from "../dto/ServiceResponseDTO";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { Ingredient } from "../models/Ingredient";
import { KitchenOrder } from "../models/KitchenOrder";
import { OrderProduct } from "../models/OrderProduct";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { ServingTable } from "../models/ServingTable";
import { Waiter } from "../models/Waiter";

/**
 * Service method that retrieves all kitchen orders that are not completed. Used in kitchen application.
 *
 * @return {Promise<KitchenOrder[]>} - List of kitchen orders
 */
export function fetchUncompletedKitchenOrders(): Promise<KitchenOrder[]> {
  return KitchenOrder.findAll({
    where: { completed: false },
    include: [
      {
        model: OrderProduct,
        as: "listOfOrderProducts",
        required: true,
        include: [
          {
            model: Product,
            as: "product",
            required: true,
            where: { productCategory: { [Op.ne]: "Drinks" } },
            include: [{ model: Ingredient, as: "listOfIngredients" }],
          },
        ],
      },
      { model: Waiter, as: "waiter", attributes: ["firstName", "lastName"] },
      { model: ServingTable, as: "servingTable", attributes: ["code"] },
    ],
  });
}

/** Service method that retrieves all complited kitchen orders for the waiter. Used in kitchen application.
 *
 * @return {Promise<KitchenOrder[]>} - List of kitchen orders
 */
export async function fetchCompletedKitchenOrdersForWaiter(
  waiterUuid: string
): Promise<KitchenOrder[] | ServiceResponseDTO> {
  try {
    return await KitchenOrder.findAll({
      where: { waiter_uuid: waiterUuid, completed: true },
      include: [
        { model: Order, as: "order", attributes: ["code"] },
        { model: ServingTable, as: "servingTable", attributes: ["code"] },
        { model: Waiter, as: "waiter", attributes: ["firstName", "lastName"] },
      ],
    });
  } catch (error) {
    console.error("Error while fetching completed kitchen orders:", error);
    return {
      statusCode: 500,
      message: "Error while fetching completed kitchen orders.",
    };
  }
}

/**
 * Service method that mark selected kitchen order as completed. It does not delete it from the DB.
 *
 * @param {string} kitchenOrderUuid - ID of kitchenOrder.
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function markKitchenOrderAsCompleted(
  kitchenOrderUuid: string
): Promise<ServiceResponseDTO> {
  try {
    const kitchenOrder = await KitchenOrder.findByPk(kitchenOrderUuid);

    if (kitchenOrder === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Kitchen order was not found.",
      };
    }

    kitchenOrder.completed = true;

    await kitchenOrder.save();

    return {
      statusCode: HTTPStatusCode.OK,
      message: "Order is marked as completed.",
    };
  } catch (error) {
    console.error("Error while marking order as completed:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while making order as completed.",
    };
  }
}
