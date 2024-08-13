import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 기본적으로 localStorage 사용
import authReducer from "../modules/auth";

const persistConfig = {
  key: "root",
  storage,
  // 필요한 경우 whitelist나 blacklist 설정
  // whitelist: ['auth', 'user'], // 특정 리듀서만 유지하고 싶을 때
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
