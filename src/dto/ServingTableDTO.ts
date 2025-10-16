import { OrderDTO } from "./OrderDTO";

export interface UpdateServingTableDTO {
  uuid: string;
  waiterUuid: string;
  code: number;
}

export interface CreateServingTableWithFirstOrderDTO {
  waiterUuid: string;
  servingTableCode: number;
  orderDTO: OrderDTO;
}

export interface UpdateServingTableWithNewOrderDTO {
  servingTableUuid: string;
  waiterUuid: string;
  orderDTO: OrderDTO;
}

export interface PayServingTablePriceDTO {
  waiterUuid: string;
  servingTableUuid: string;
  amountToPay: number;
}
