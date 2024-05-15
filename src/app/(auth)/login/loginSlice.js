"use client";
import { baseUrl } from "@/app/api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    userLoading: false,
    user: null,
};

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
    try {
        const res = await axios.post(`${baseUrl}/api/v1/auth/login?username=${email}&password=${password}`);
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error((error).response.data.msg);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}, // Add empty reducers object
    extraReducers: (builder) => {
        // LOGIN
        builder.addCase(login.pending, (state) => {
            state.userLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.userLoading = false;
            state.user = action.payload.user;
            toast.success("Login Success");
        });
        builder.addCase(login.rejected, (state, action) => {
            state.userLoading = false;
            toast.error("User Not Found");
        });
    },
});

export default authSlice.reducer;