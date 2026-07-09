import type { ModleCreateAddress } from "@/interface/address";
import { apiSlice } from "./apiSlice";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation<ModleCreateAddress, void>({
      query: (data) => ({
        url: "/",
      }),
    }),
  }),
});
