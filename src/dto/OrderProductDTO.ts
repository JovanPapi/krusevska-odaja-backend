import { Product } from "../models/Product";

export interface OrderProductDTO {
  quantity: number;
  product: Product;
}
