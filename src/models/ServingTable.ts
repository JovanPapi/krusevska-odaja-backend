import { Association, Model, Optional } from "sequelize";
import { ServingTableStatus } from "../enum/ServingTableStatus";
import { Order } from "./Order";
import { Payment } from "./Payment";
import { Waiter } from "./Waiter";
import { KitchenOrder } from "./KitchenOrder";

export interface ServingTableAttributes {
  uuid: string;
  code: number;
  totalPrice: number;
  amountPaid: number;
  remainingBalance: number;
  servingTableStatus: ServingTableStatus;
  waiter_uuid: string;
  waiter?: Waiter;
  listOfOrders?: Order[];
  listOfPayments?: Payment[];
  listOfKitchenOrders?: KitchenOrder[];

  updateListOfOrders?: (newOrderToAdd: Order) => void;
}

export type ServingTableCreationAttributes = Optional<
  ServingTableAttributes,
  | "uuid"
  | "totalPrice"
  | "amountPaid"
  | "remainingBalance"
  | "listOfOrders"
  | "listOfPayments"
>;

export class ServingTable
  extends Model<ServingTableAttributes, ServingTableCreationAttributes>
  implements ServingTableAttributes
{
  public uuid!: string;
  public code!: number;
  public totalPrice!: number;
  public amountPaid!: number;
  public remainingBalance!: number;
  public servingTableStatus!: ServingTableStatus;
  public waiter?: Waiter;
  public listOfOrders?: Order[];
  public listOfPayments?: Payment[];
  public listOfKitchenOrders?: KitchenOrder[];

  // FK References
  public waiter_uuid!: string;

  public updateListOfOrders(newOrderToAdd: Order) {
    this.listOfOrders?.push(newOrderToAdd);

    const listOfOrderProducts = newOrderToAdd.listOfOrderProducts!;
    let amountToAdd = 0;

    for (const op of listOfOrderProducts) {
      amountToAdd += (op.product?.price as number) * op.quantity;
    }

    this.totalPrice += amountToAdd;
    this.remainingBalance += amountToAdd;
  }

  public static associations: {
    waiter: Association<ServingTable, Waiter>;
    listOfOrders: Association<ServingTable, Order>;
    listOfPayments: Association<ServingTable, Payment>;
    listOfKitchenOrders: Association<ServingTable, KitchenOrder>;
  };
}
