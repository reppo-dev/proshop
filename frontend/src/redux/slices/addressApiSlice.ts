import type { ModleCreateAddress } from "@/interface/address";
import { apiSlice } from "./apiSlice";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation<ModleCreateAddress, ModleCreateAddress>({
      query: (data) => ({
        url: "/createaddress",
        body: data,
        method: "PUT",
      }),
    }),
  }),
});

export const { useCreateAddressMutation } = addressApiSlice;
