import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const selectEmailSlice = createApi({
    reducerPath: "selectEmailSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        selectEmail: builder.mutation({
            query: (arg : any) => ({
                url : `auth/password/select-email?user-id=${arg.userid}&email=${arg.email}`,
                method: "POST",
            })
        })
    })
})

export const {useSelectEmailMutation} = selectEmailSlice