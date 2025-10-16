import { OrderDTO } from "../dto/OrderDTO";
import ServiceResponseDTO from "../dto/ServiceResponseDTO";
import {
  CreateServingTableWithFirstOrderDTO,
  PayServingTablePriceDTO,
  UpdateServingTableDTO,
  UpdateServingTableWithNewOrderDTO,
} from "../dto/ServingTableDTO";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { PaymentMethod } from "../enum/PaymentMethod";
import { ServingTableStatus } from "../enum/ServingTableStatus";
import { KitchenOrder } from "../models/KitchenOrder";
import { Order } from "../models/Order";
import { OrderProduct } from "../models/OrderProduct";
import { Payment } from "../models/Payment";
import { Product } from "../models/Product";
import { ServingTable } from "../models/ServingTable";
import { Waiter } from "../models/Waiter";

/**
 * Service method that retrieves all serving tables from database.
 *
 * @return {Promise<ServingTable[]>} - List of serving tables
 */
export function fetchServingTables(): Promise<ServingTable[]> {
  return ServingTable.findAll({
    include: [
      { model: Waiter, as: "waiter", attributes: ["firstName", "lastName"] },
      {
        model: Order,
        as: "listOfOrders",
        attributes: ["uuid", "code", "totalPrice", "creationDate"],
        include: [
          {
            model: OrderProduct,
            as: "listOfOrderProducts",
            include: [{ model: Product, as: "product" }],
          },
        ],
      },
    ],
  });
}

/**
 * Service method that retrieves single serving table by given id
 *
 * @param {string} servingTableUuid - ID of serving table
 * @return {ServingTable} - Serving table object
 */
export function fetchServingTableById(
  servingTableUuid: string
): Promise<ServingTable | null> {
  return ServingTable.findOne({
    where: { uuid: servingTableUuid },
    include: [
      { model: Waiter, as: "waiter", attributes: ["firstName", "lastName"] },
      {
        model: Order,
        as: "listOfOrders",
        attributes: ["uuid", "code", "totalPrice", "creationDate"],
        include: [
          {
            model: OrderProduct,
            as: "listOfOrderProducts",
            include: [{ model: Product, as: "product" }],
          },
        ],
      },
    ],
  });
}

/**
 * Service method that deletes a serving table by given id.
 *
 * @param {string} servingTableId ID of the serving table that needs to be deleted
 * @return {Promise<ServiceResponseDTO>} - DTO object that contains statusCode and message of the operation.
 * @implNote Available for administrators only
 */
export async function deleteServingTableById(
  servingTableId: string
): Promise<ServiceResponseDTO> {
  try {
    const servingTableToDelete = await ServingTable.findByPk(servingTableId);

    if (servingTableToDelete === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Serving table was not found.",
      };
    }

    await servingTableToDelete.destroy();

    return {
      statusCode: HTTPStatusCode.OK,
      message: `Serving table with code: ${servingTableToDelete.code} is deleted successfully.`,
    };
  } catch (error) {
    console.error("Error while deleting serving table:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while deleting serving table.",
    };
  }
}

/**
 * Service method that closes a table by given id (doesn't delete it)
 *
 * @param {string} servingTableId - of the serving table that needs to be closed
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 * @implNote Available for administrators only
 */
export async function closeServingTable(
  servingTableId: string
): Promise<ServiceResponseDTO> {
  try {
    const servingTableToClose = await ServingTable.findOne({
      where: { uuid: servingTableId },
    });

    if (servingTableToClose === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Serving table was not found.",
      };
    }

    servingTableToClose.servingTableStatus = ServingTableStatus.CLOSED;

    await servingTableToClose.save();

    return {
      statusCode: HTTPStatusCode.OK,
      message: `Serving table with code: ${servingTableToClose.code} is closed successfully.`,
    };
  } catch (error) {
    console.error("Error while closing serving table:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while closing serving table.",
    };
  }
}

/**
 * Service method that updates fields of existing serving table (only code and waiter).
 * Can be called only from Administrator page by logged in admin
 *
 * @param {UpdateServingTableDTO} servingTableToUpdate - Existing serving table which fields needs to be updated
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function updateServingTableProperties(
  servingTableToUpdate: UpdateServingTableDTO
): Promise<ServiceResponseDTO> {
  try {
    const servingTable = await ServingTable.findOne({
      where: { uuid: servingTableToUpdate.uuid },
    });

    if (servingTable === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Serving table was not found.",
      };
    }

    const waiter = await Waiter.findOne({
      where: { uuid: servingTableToUpdate.waiterUuid },
    });

    if (waiter === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Waiter was not found.",
      };
    }

    const checkTablesWithSameCode = waiter.listOfServingTables?.find(
      (st) => st.code === servingTableToUpdate.code
    );

    if (checkTablesWithSameCode !== undefined) {
      return {
        statusCode: HTTPStatusCode.CONFLICT,
        message: `Waiter already has serving table with code: ${servingTableToUpdate.code}`,
      };
    }

    servingTable.code = servingTableToUpdate.code;
    await servingTable.save();

    await (servingTable as any).setWaiter(waiter);

    return {
      statusCode: HTTPStatusCode.OK,
      message: "Serving table is successfully updated.",
    };
  } catch (error) {
    console.error("Error while updating serving table:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while updating serving table.",
    };
  }
}

/**
 * Service method is used for creating new table for specific waiter. Along with the Serving Table creation,
 * object of WaiterDao, OrderProduct and Order entity are being processed and persisted.
 *
 * @param {CreateServingTableWithFirstOrderDTO} servingTableToCreate - DTO that stores contains information for creating new serving table.
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function createServingTableWithFirstOrder(
  servingTableToCreate: CreateServingTableWithFirstOrderDTO
): Promise<ServiceResponseDTO> {
  try {
    const waiter = await Waiter.findOne({
      where: { uuid: servingTableToCreate.waiterUuid },
    });

    if (waiter === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Waiter was not found.",
      };
    }

    const orderDTO = servingTableToCreate.orderDTO;

    // Create and persist object of Order, ServingTable & KitchenOrder
    // Must do this to avoid primary key constraints when associating models
    const servingTableToPersist = await ServingTable.create({
      code: servingTableToCreate.servingTableCode,
      servingTableStatus: ServingTableStatus.RESERVED,
      waiter_uuid: waiter.uuid,
      amountPaid: 0,
      remainingBalance: 0,
      totalPrice: 0,
    });

    const orderToPersist = await Order.create({
      code: orderDTO.code,
      waiter_uuid: waiter.uuid,
      servingTable_uuid: servingTableToPersist.uuid,
      creationDate: new Date(),
      totalPrice: 0,
    });

    const kitchenOrderToPersist = await KitchenOrder.create({
      completed: false,
      waiter_uuid: waiter.uuid,
      servingTable_uuid: servingTableToPersist.uuid,
      order_uuid: orderToPersist.uuid,
    });

    // Associate persisted Order, ServingTable & KitchenOrder with each OrderProduct
    const listOfOrderProducts = mapOrderProducts(
      orderDTO,
      orderToPersist,
      kitchenOrderToPersist
    );

    let totalPriceOfOrder = 0;

    // Persist all OrderProduct objects & calculate totalPrice of products
    for (const op of listOfOrderProducts) {
      await OrderProduct.create({
        kitchenOrder_uuid: op.kitchenOrder_uuid,
        order_uuid: op.order_uuid,
        product_uuid: op.product_uuid,
        quantity: op.quantity,
      });

      totalPriceOfOrder += op.price * op.quantity;
    }

    // Set remaining necessary properties
    orderToPersist.totalPrice = totalPriceOfOrder;
    servingTableToPersist.totalPrice = totalPriceOfOrder;
    servingTableToPersist.remainingBalance = totalPriceOfOrder;

    // Persist/update obects of Order, ServingTable
    await orderToPersist.save();
    await servingTableToPersist.save();

    return {
      statusCode: HTTPStatusCode.OK,
      message: "Serving table is successfully created.",
    };
  } catch (error) {
    console.error("Error while creating serving table:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while creating serving table.",
    };
  }
}

/**
 * Service method is used for updating Serving Table from a DB with a new Order.
 * It updates listOfOrders field of {ServingTable} object
 *
 * @param {UpdateServingTableDTO} servingTableToUpdate - DTO that stores information for updating existing serving table.
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function updateServingTableWithNewOrder(
  servingTableToUpdate: UpdateServingTableWithNewOrderDTO
): Promise<ServiceResponseDTO> {
  try {
    const servingTable = await ServingTable.findOne({
      where: { uuid: servingTableToUpdate.servingTableUuid },
    });
    const waiter = await Waiter.findOne({
      where: { uuid: servingTableToUpdate.waiterUuid },
    });

    if (servingTable === null || waiter === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Serving table or waiter were not found.",
      };
    }

    const orderDTO = servingTableToUpdate.orderDTO;

    // Need to persist new objects of Order & KitchenOrder before using it in OrderProduct elements
    // We do this to have them in database before creating assosications with their primary keys
    // Otherwise the database will throw error
    const orderToPersist = await Order.create({
      code: orderDTO.code,
      waiter_uuid: waiter.uuid,
      servingTable_uuid: servingTable.uuid,
      creationDate: new Date(),
      totalPrice: 0,
    });

    const kitchenOrderToPersist = await KitchenOrder.create({
      completed: false,
      servingTable_uuid: servingTable.uuid,
      waiter_uuid: waiter.uuid,
      order_uuid: orderToPersist.uuid,
    });

    const listOfOrderProducts = mapOrderProducts(
      orderDTO,
      orderToPersist,
      kitchenOrderToPersist
    );

    let totalPriceOfOrder = 0;
    for (const op of listOfOrderProducts) {
      await OrderProduct.create({
        kitchenOrder_uuid: op.kitchenOrder_uuid,
        order_uuid: op.order_uuid,
        product_uuid: op.product_uuid,
        quantity: op.quantity,
      });
      totalPriceOfOrder += op.price * op.quantity;
    }

    orderToPersist.totalPrice = totalPriceOfOrder;
    servingTable.totalPrice += totalPriceOfOrder;
    servingTable.remainingBalance += totalPriceOfOrder;

    await orderToPersist.save();
    await servingTable.save();

    return {
      statusCode: HTTPStatusCode.OK,
      message: "Serving table is successfully updated.",
    };
  } catch (error) {
    console.error("Error while updating serving table:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while updating serving table.",
    };
  }
}

/**
 * Service method is used for paying a table, full amount or partial, while making Payment ticket for it.
 * If paid full amount, the table is also closed, but not deleted.
 *
 * @param {PayServingTablePriceDTO} payServingTablePriceDTO - DTO that stores necessary data for executing partial payment of a table
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function payServingTablePrice(
  payServingTablePriceDTO: PayServingTablePriceDTO
): Promise<ServiceResponseDTO> {
  try {
    const waiter = await Waiter.findOne({
      where: { uuid: payServingTablePriceDTO.waiterUuid },
    });
    const servingTable = await ServingTable.findOne({
      where: { uuid: payServingTablePriceDTO.servingTableUuid },
    });

    if (waiter === null || servingTable === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Serving table or waiter were not found.",
      };
    }

    await Payment.create({
      amountPaid: payServingTablePriceDTO.amountToPay,
      paymentMethod: PaymentMethod.CASH,
      servingTable_uuid: servingTable.uuid,
      waiter_uuid: waiter.uuid,
      paymentDate: new Date(),
    });

    const remainingServingTablePrice =
      servingTable.remainingBalance - payServingTablePriceDTO.amountToPay;

    if (remainingServingTablePrice === 0) {
      servingTable.amountPaid = servingTable.totalPrice;
      servingTable.remainingBalance = 0;
      servingTable.servingTableStatus = ServingTableStatus.CLOSED;
    } else {
      servingTable.amountPaid += payServingTablePriceDTO.amountToPay;

      servingTable.remainingBalance -= payServingTablePriceDTO.amountToPay;
    }

    await servingTable.save();

    return { statusCode: HTTPStatusCode.OK, message: "Payment successful." };
  } catch (error) {
    console.error("Error while executing payment for serving table:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while executing payment for serving table.",
    };
  }
}

/**
 * Utility function responsible for associating Order object with each OrderProduct received from frontend.
 *
 * @param {OrderDTO} orderDTO - DTO that contains list of order-products that needs to be mapped.
 * @param {Order} orderToPersist - Order object used to associate each of the elements of order-products list.
 * @param {KitchenOrder} kitchenOrderToPersist - KitchenOrder object used to associate each of the elements of order-product list.
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
function mapOrderProducts(
  orderDTO: OrderDTO,
  orderToPersist: Order,
  kitchenOrderToPersist: KitchenOrder
) {
  const listOfOrderProductsTemp = orderDTO.listOfOrderProducts;
  const listOfOrderProducts = [];

  for (const orderProductDTO of listOfOrderProductsTemp) {
    const orderProduct = {
      quantity: orderProductDTO.quantity,
      price: orderProductDTO.product.price,
      product_uuid: orderProductDTO.product.uuid,
      order_uuid: orderToPersist.uuid,
      kitchenOrder_uuid: kitchenOrderToPersist.uuid,
    };

    listOfOrderProducts.push(orderProduct);
  }

  return listOfOrderProducts;
}
