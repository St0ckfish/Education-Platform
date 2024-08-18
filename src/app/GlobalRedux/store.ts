"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { courseSlice } from "../resource-management/api/createCourseSlice";
import {feedbackSlice} from "../feedback/api/feedbackSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [courseSlice.reducerPath]: courseSlice.reducer,
        [feedbackSlice.reducerPath]: feedbackSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(courseSlice.middleware).concat(feedbackSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;