import { configureStore } from "@reduxjs/toolkit";
import breweryReducer from "./brewerySlice";
import paginationMiddleware from "./paginationMiddleware";
import { enableMapSet } from "immer";

enableMapSet();

const store = configureStore({
  reducer: {
    breweries: breweryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(paginationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
