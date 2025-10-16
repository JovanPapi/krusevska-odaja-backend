import { Association, Model, Optional } from "sequelize";
import { OrderProduct } from "./OrderProduct";
import { ServingTable } from "./ServingTable";
import { Waiter } from "./Waiter";
import { KitchenOrder } from "./KitchenOrder";

export interface OrderAttributes {
  uuid: string;
  code: number;
  totalPrice: number;
  creationDate: Date;
  waiter_uuid: string;
  servingTable_uuid: string;

  waiter?: Waiter;
  servingTable?: ServingTable;
  listOfOrderProducts?: OrderProduct[];
  listOfKitchenOrders?: KitchenOrder[];
}

export type OrderCreationAttributes = Optional<OrderAttributes, "uuid">;

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public uuid!: string;
  public code!: number;
  public totalPrice!: number;
  public creationDate!: Date;
  public waiter?: Waiter;
  public servingTable?: ServingTable;
  public listOfOrderProducts?: OrderProduct[];
  public listOfKitchenOrders?: KitchenOrder[];

  //FK references
  public waiter_uuid!: string;
  public servingTable_uuid!: string;

  public static associations: {
    waiter: Association<Order, Waiter>;
    servingTable: Association<Order, ServingTable>;
    listOfOrderProducts: Association<Order, OrderProduct>;
    listOfKitchenOrders: Association<Order, KitchenOrder>;
  };
}
