import type { Product } from "./products";

export interface Order {
  ID: number;
  UserID: number;
  Status: string;
  TotalAmount: number;
  Items: OrderItem[];
}

export interface OrderItem {
  ID: number;
  ProductID: number;
  Quantity: number;
  Price: number;
  Product: Product;
}
