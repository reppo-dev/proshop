import type { Address } from "./address";
import type { Product } from "./products";

export interface Order {
  ID: number;
  UserID: number;
  Status: string;
  TotalAmount: number;
  is_paid: boolean;
  order_address: Address;
  Items: OrderItem[];
}

export interface OrderItem {
  ID: number;
  ProductID: number;
  Quantity: number;
  Price: number;
  Product: Product;
}
