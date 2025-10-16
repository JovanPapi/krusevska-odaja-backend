import { Association, Model, Optional } from "sequelize";
import { Order } from "./Order";
import { Payment } from "./Payment";
import { ServingTable } from "./ServingTable";
import { KitchenOrder } from "./KitchenOrder";

export interface WaiterAttributes {
  uuid: string;
  code: number;
  firstName: string;
  lastName: string;
  listOfServingTables?: ServingTable[];
  listOfOrders?: Order[];
  listOfPayments?: Payment[];
  listOfKitchenOrders?: KitchenOrder[];
}

export type WaiterCreationAttributes = Optional<
  WaiterAttributes,
  "uuid" | "listOfServingTables" | "listOfOrders" | "listOfPayments"
>;

export class Waiter
  extends Model<WaiterAttributes, WaiterCreationAttributes>
  implements WaiterAttributes
{
  public uuid!: string;
  public code!: number;
  public firstName!: string;
  public lastName!: string;
  public listOfServingTables?: ServingTable[];
  public listOfOrders?: Order[];
  public listOfPayments?: Payment[];
  public listOfKitchenOrders?: KitchenOrder[];

  public static associations: {
    listOfServingTables: Association<Waiter, ServingTable>;
    listOfOrders: Association<Waiter, Order>;
    listOfPayments: Association<Waiter, Payment>;
    listOfKitchenOrders: Association<Waiter, KitchenOrder>;
  };
}
