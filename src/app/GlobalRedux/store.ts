"use client"

import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from "../api/apiSlice"

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefualtMiddleware)=>getDefualtMiddleware().concat(apiSlice.middleware)
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;