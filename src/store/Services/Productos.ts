import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
export interface IProducto {
  _id: string;
  nombre:string
  imagen: string;
  precio: number;
  description: string;
  categoria: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetAllProductsResponse {
  total: number;
  totalPages: number;
  page: number;
  itemsPerPage: number;
  items: IProducto[];
}

export const productosApi = createApi({
  reducerPath: "productosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}/productos`,
    prepareHeaders: (headers, {getState}) => {
      headers.set("apikey", process.env.REACT_APP_API_KEY as string);
      const token = (getState() as RootState).security.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
  }),
  endpoints: (builder) => ({
    allProductos: builder.query({
      query: ({page = 1, items = 10}) => ({
        url: `?page=${page}&items=${items}`,
      })
    })
  })
});

export const { useAllProductosQuery } = productosApi;
