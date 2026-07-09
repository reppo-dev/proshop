import type { Order } from "@/interface/order";
import { apiSlice } from "./apiSlice";

interface OrderResponse {
  message: string;
  order: Order;
}

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, void>({
      query: () => ({
        url: "/createorder",
        method: "POST",
      }),
    }),

    userOrder: builder.query<Order, void>({
      query: () => ({
        url: "/userorder",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useUserOrderQuery } = orderApiSlice;
