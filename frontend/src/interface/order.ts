import type { Address } from "./address";
import type { Product } from "./products";

export interface Order {
  ID: number;
  user_id: number;
  status: string;
  total_amount: number;
  shipping: number;
  tax: number;
  total_price: number;
  is_paid: boolean;
  order_address: Address;
  items: OrderItem[];
}

export interface OrderItem {
  ID: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}
