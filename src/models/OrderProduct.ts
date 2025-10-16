import { Association, Model, Optional } from "sequelize";
import { KitchenOrder } from "./KitchenOrder";
import { Order } from "./Order";
import { Product } from "./Product";

export interface OrderProductAttributes {
  uuid: string;
  quantity: number;
  product_uuid: string;
  order_uuid: string;
  kitchenOrder_uuid: string;

  product?: Product;
  order?: Order;
  kitchenOrder?: KitchenOrder;
}

export type OrderProductCreationAttributes = Optional<
  OrderProductAttributes,
  "uuid"
>;

export class OrderProduct
  extends Model<OrderProductAttributes, OrderProductCreationAttributes>
  implements OrderProductAttributes
{
  public uuid!: string;
  public quantity!: number;
  public product?: Product;
  public order?: Order;
  public kitchenOrder?: KitchenOrder;

  // FK references
  public product_uuid!: string;
  public order_uuid!: string;
  public kitchenOrder_uuid!: string;

  public static associations: {
    product: Association<OrderProduct, Product>;
    order: Association<OrderProduct, Order>;
    kitchenOrder: Association<OrderProduct, KitchenOrder>;
  };
}
