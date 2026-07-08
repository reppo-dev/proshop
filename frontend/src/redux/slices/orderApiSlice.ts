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
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
