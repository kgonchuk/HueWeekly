import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { postReducer } from "./post/postSlice";

import {
  persistStore,
  persistReducer ,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, 
  whitelist: ['auth'], 
};


const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        posts: postReducer,


    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);     

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();