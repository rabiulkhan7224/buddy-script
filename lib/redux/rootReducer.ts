import { baseApi } from "./api/baseApi";
export const reducer = {
  //auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
