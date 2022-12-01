import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { appSlice } from "./Slices/appSlice";
import { securitySlice } from "./Slices/securitySlice";
import { securityApi } from "./Services/Security";
import { productosApi } from "./Services/Productos";

const preLoadedState = JSON.parse(localStorage.getItem('reduxState') || '{}');

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    security: securitySlice.reducer,
    [securityApi.reducerPath]: securityApi.reducer,
    [productosApi.reducerPath]: productosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      securityApi.middleware,
      productosApi.middleware,
    ]),
  preloadedState: preLoadedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
