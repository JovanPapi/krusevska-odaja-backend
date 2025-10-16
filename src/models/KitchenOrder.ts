import { Association, Model, Optional } from "sequelize";
import { OrderProduct } from "./OrderProduct";
import { Waiter } from "./Waiter";
import { ServingTable } from "./ServingTable";
import { Order } from "./Order";

export interface KitchenOrderAttributes {
  uuid: string;
  completed: boolean;
  order_uuid: string;
  waiter_uuid: string;
  servingTable_uuid: string;

  waiter?: Waiter;
  order?: Order;
  servingTable?: ServingTable;
  listOfOrdersProducts?: OrderProduct[];
}

export type KitchenOrderCreationAttributes = Optional<
  KitchenOrderAttributes,
  "uuid" | "completed"
>;

export class KitchenOrder
  extends Model<KitchenOrderAttributes, KitchenOrderCreationAttributes>
  implements KitchenOrderAttributes
{
  public uuid!: string;
  public completed!: boolean;
  public waiter?: Waiter;
  public order?: Order;
  public servingTable?: ServingTable;
  public listOfOrdersProducts?: OrderProduct[];

  // foregien keys
  public waiter_uuid!: string;
  public servingTable_uuid!: string;
  public order_uuid!: string;

  public static associations: {
    listOfOrdersProducts: Association<KitchenOrder, OrderProduct>;
    waiter: Association<KitchenOrder, Waiter>;
    servingTable: Association<KitchenOrder, ServingTable>;
    order: Association<KitchenOrder, Order>;
  };
}
