import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagType";

export const baseApi = createApi({
  reducerPath: "baseApi",

  tagTypes: tagTypesList,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://buddy-script-backend-pi.vercel.app/v1/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
