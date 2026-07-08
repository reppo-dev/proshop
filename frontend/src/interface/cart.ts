import type { Product } from "./products";

export interface Cart {
  ID: number;
  user_id: number;
  items: CartItem[];
}

export interface CartItem {
  ID: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}
