import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { appSlice } from "./Slices/appSlice";
import { secSlice } from "./Slices/secSlice";
import { securityApi } from "./Services/Security";
import { productosApi } from "./Services/Productos";

const preLoadedState = JSON.parse(localStorage.getItem('reduxState') || '{}');

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    sec: secSlice.reducer,
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
  const { sec } = store.getState();
  localStorage.setItem("reduxState", JSON.stringify({sec}));
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
