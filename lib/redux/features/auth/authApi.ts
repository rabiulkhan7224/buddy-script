import { baseApi } from "../../api/baseApi";
import Cookies from "js-cookie";
import { tagTypes } from "../../tagType";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // signup
    register: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),

    





    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.data?.accessToken) {
            Cookies.set("accessToken", data.data.accessToken, {
              expires: 30,
              secure: true,
              sameSite: "none",
            });
            //set token to local storage
            localStorage.setItem("token", data.data.accessToken);
          }
        } catch (err) {
          console.log("Login error:", err);
        }
      },
    }),


    // get me
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        credentials: "include",
      }),

      providesTags: [tagTypes.me],
    }),

    
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
 
} = userApi;
