import { OrderProductDTO } from "./OrderProductDTO";

export interface OrderDTO {
  code: number;
  listOfOrderProducts: OrderProductDTO[];
}

export interface DeleteProductFromOrderDTO {
  orderUuid: string;
  orderProductUuid: string;
}
