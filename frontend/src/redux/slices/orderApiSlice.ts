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

    userOrder: builder.query<Order, number>({
      query: (id) => ({
        url: `/userorder/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useUserOrderQuery } = orderApiSlice;
