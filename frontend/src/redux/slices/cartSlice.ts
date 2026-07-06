import { addDecimals, updateCart } from "@/utils/cartUtils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  ID: number;
  product_id: number;
  name: string;
  image: string;
  price: number;
  count_inStock: number;
  quantity: number;
}

export interface ShippingAddress {
  user_address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface CartState {
  items: CartItem[];
  itemsPrice: number;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

const cartFromStorage = localStorage.getItem("cart");

const initialState: CartState = cartFromStorage
  ? JSON.parse(cartFromStorage)
  : {
      items: [],
      itemsPrice: 0,
      shippingPrice: "0.00",
      taxPrice: "0.00",
      totalPrice: "0.00",
      shippingAddress: {},
      paymentMethod: "PayPal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;

      const existItem = state.items.find(
        (x) => x.product_id === item.product_id,
      );

      if (existItem) {
        state.items = state.items.map((x) =>
          x.product_id === item.product_id ? item : x,
        );
      } else {
        state.items.push(item);
      }
      updateCart(state);
    },
    updateCartItem(
      state,
      action: PayloadAction<{
        product_id: number;
        quantity: number;
      }>,
    ) {
      const item = state.items.find(
        (x) => x.product_id === action.payload.product_id,
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }

      updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.ID !== action.payload);

      return updateCart(state);
    },
    saveShipipingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  updateCartItem,
  removeFromCart,
  saveShipipingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
