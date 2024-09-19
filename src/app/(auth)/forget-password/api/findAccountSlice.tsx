import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/app/api/axios";


export const findAccountSlice = createApi({
    reducerPath: "findAccountSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        findAccount: builder.mutation({
            query: (body ) => ({
                url : `auth/password/find-account?username=${body}`,
                method: "POST",
            })
        })
    })
})

export const {useFindAccountMutation} = findAccountSlice