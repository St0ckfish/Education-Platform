import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./axios"

export const apiSlice = createApi({
    reducerPath: "login",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (ReqBody) => ({
                url: "auth/login",
                method: "POST",
                body: ReqBody
            })
        }),
    })
})


export const {useLoginMutation , useGetSchoolsQuery } = apiSlice