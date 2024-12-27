import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userSlice from "./userSlice";
import paginationSlice from "./paginationSlice";
import productSlice from "./productSlice";
import searchSlice from "./searchSlice";
import orderSlice from "./orderSlice";
import cartSlice from "./cartSlice";
import blogSlice from "./blogSlice";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

let currentStorage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export const setPersistStorage = (useSessionStorage) => {
  currentStorage = useSessionStorage
    ? createWebStorage("session")
    : createWebStorage("local");
};

const persistCommonConfig = {
  storage: {
    getItem: (key) => currentStorage.getItem(key),
    setItem: (key, value) => currentStorage.setItem(key, value),
    removeItem: (key) => currentStorage.removeItem(key),
  },
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["login", "userInfo", "favourites", "cartId"],
};

const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userSlice),
    order: orderSlice,
    cart: cartSlice,
    pagination: paginationSlice,
    product: productSlice,
    search: searchSlice,
    blog: blogSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
