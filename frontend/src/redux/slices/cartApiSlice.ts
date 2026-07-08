import type { Cart } from "@/interface/cart";
import { apiSlice } from "./apiSlice";

interface CartItem {
  product_id: number;
  quantity: number;
}

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAddToCart: builder.mutation<CartItem, CartItem>({
      query: (cartItem) => ({
        url: "/addtocart",
        method: "POST",
        body: cartItem,
      }),
    }),
    updateAddToCart: builder.mutation({
      query: ({ id, quantity }: { id: number; quantity: number }) => ({
        url: `/updatecartitem/${id}`,
        body: { quantity },
        method: "PUT",
      }),
    }),
    getCard: builder.query<Cart, void>({
      query: () => ({
        url: "/getcart",
      }),
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `/deletecartitem/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateAddToCartMutation,
  useUpdateAddToCartMutation,
  useGetCardQuery,
  useDeleteCartItemMutation,
} = cartApiSlice;
