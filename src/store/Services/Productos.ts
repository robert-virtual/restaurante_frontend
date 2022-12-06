import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface IProducto {
  nombre: string;
  imagenes: string[];
  description: string;
  precio: number;
  stock: number;
  createdAt: Date;
  _id: string;
  userId: string;
}

export interface INewProducto {
  nombre: string;
  imagenes: string[];
  description: string;
  precio: number;
  stock: number;
  createdAt: Date;
}

export interface IGetAllProductosResponse {
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
    prepareHeaders: (headers, { getState }) => {
      headers.set("apikey", process.env.REACT_APP_API_KEY as string);
      const token = (getState() as RootState).sec.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["Productos"],
  endpoints: (builder) => ({
    allProductos: builder.query({
      query: ({ page = 1, items = 10 }) => ({
        url: `?page=${page}&items=${items}`,
      }),
      providesTags: ["Productos"],
    }),
    productoById: builder.query<IProducto,string>({
      query: (id ) => `byindex/${id}`,
      providesTags: ["Productos"],
    }),
    allProductosAdmin: builder.query({
      query: () => "/all",
      providesTags: ["Productos"],
    }),
    updateProducto: builder.mutation({
      query: ({body,id}:{body: Partial<INewProducto>, id: string}) => {
        return {
          url: `update/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Productos"],
    }),
    deleteProducto: builder.mutation({
      query: (id: string) => {
        return {
          url: `delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Productos"],
    }),
    newProductoForm: builder.mutation({
      query: (body:FormData) => {
        return {
          url: "new",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Productos"],
    }),
    newProducto: builder.mutation({
      query: (body: INewProducto) => {
        return {
          url: "new",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Productos"],
    }),
  }),
});

export const {
  useAllProductosQuery,
  useProductoByIdQuery,
  useAllProductosAdminQuery,
  useNewProductoMutation,
  useNewProductoFormMutation,
  useUpdateProductoMutation,
  useDeleteProductoMutation,
} = productosApi;
