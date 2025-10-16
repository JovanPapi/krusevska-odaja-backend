import { DeleteProductFromOrderDTO } from "../dto/OrderDTO";
import ServiceResponseDTO from "../dto/ServiceResponseDTO";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { Order } from "../models/Order";
import { OrderProduct } from "../models/OrderProduct";
import { Product } from "../models/Product";
import { ServingTable } from "../models/ServingTable";

/**
 * Service method that deletes specific OrderProduct from order.
 * It also re-calculates totalPrice & remainingBalance fields in affected ServingTable and totalPrice for affected Order.
 *
 * @param {DeleteProductFromOrderDTO} deleteProductFromOrderDTO - DTO that contains information for deleting product from order.
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function deleteProductFromOrder(
  deleteProductFromOrderDTO: DeleteProductFromOrderDTO
): Promise<ServiceResponseDTO> {
  try {
    const order = await Order.findOne({
      where: { uuid: deleteProductFromOrderDTO.orderUuid },

      include: [
        { model: ServingTable, as: "servingTable" },
        { model: OrderProduct, as: "listOfOrderProducts" },
      ],
    });
    const orderProduct = await OrderProduct.findOne({
      where: { uuid: deleteProductFromOrderDTO.orderProductUuid },
      include: [{ model: Product, as: "product" }],
    });

    if (order === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Order was not found.",
      };
    }
    if (orderProduct === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Order product was not found.",
      };
    }

    const servingTable = order.servingTable;
    if (servingTable === undefined) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Serving table of order was not found.",
      };
    }

    const finalPrice =
      (orderProduct.product?.price as number) * orderProduct.quantity;

    order.totalPrice -= finalPrice;
    servingTable.totalPrice -= finalPrice;
    servingTable.remainingBalance -= finalPrice;

    await orderProduct.destroy();

    if (order.listOfOrderProducts?.length === 1) {
      await order.destroy();
    }

    await order.save();
    await servingTable.save();

    return {
      statusCode: HTTPStatusCode.OK,
      message: "Product is deleted successfully.",
    };
  } catch (error) {
    console.error("Error while deleting product from Order:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while deleting product from Order.",
    };
  }
}

/**
 * Service method that deletes whole order from serving table and re-calculates total price of affected serving table.
 *
 * @param {string} orderUuid - ID of order
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function deleteOrderFromServingTable(
  orderUuid: string
): Promise<ServiceResponseDTO> {
  try {
    const order = await Order.findByPk(orderUuid, {
      include: [
        { model: ServingTable, as: "servingTable" },
        {
          model: OrderProduct,
          as: "listOfOrderProducts",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });

    if (order === null) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Order was not found.",
      };
    }

    const servingTable = order.servingTable;
    if (servingTable === undefined) {
      return {
        statusCode: HTTPStatusCode.NOT_FOUND,
        message: "Serving table of order was not found.",
      };
    }

    const finalPrice = order.listOfOrderProducts
      ?.map((op) => (op.product?.price as number) * op.quantity)
      .reduce((prevValue, currentValue) => prevValue + currentValue);

    servingTable.totalPrice -= finalPrice as number;
    servingTable.remainingBalance -= finalPrice as number;

    await order.destroy();
    await servingTable.save();

    return {
      statusCode: HTTPStatusCode.OK,
      message: "Order is deleted successfully.",
    };
  } catch (error) {
    console.error("Error while deleting order from serving table:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while deleting order from serving table.",
    };
  }
}
