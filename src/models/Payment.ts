import { Association, Model, Optional } from "sequelize";
import { PaymentMethod } from "../enum/PaymentMethod";
import { ServingTable } from "./ServingTable";
import { Waiter } from "./Waiter";

export interface PaymentAttributes {
  uuid: string;
  paymentDate: Date;
  paymentMethod: PaymentMethod;
  amountPaid: number;
  servingTable_uuid: string;
  waiter_uuid: string;
  servingTable?: ServingTable;
  waiter?: Waiter;
  //TODO: It should have an orderUuid, indicating which order this payment is for (for future use)
}

export type PaymentCreationAttributes = Optional<
  PaymentAttributes,
  "uuid" | "paymentDate"
>;

export class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  public uuid!: string;
  public paymentDate!: Date;
  public paymentMethod!: PaymentMethod;
  public amountPaid!: number;
  public servingTable?: ServingTable;
  public waiter?: Waiter;

  // FK references
  public servingTable_uuid!: string;
  public waiter_uuid!: string;

  public static associations: {
    servingTable: Association<Payment, ServingTable>;
    waiter: Association<Payment, Waiter>;
  };
}
