import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const addNewAdminApi = createApi({
    reducerPath: "addNewAdminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        addAdmin: builder.mutation({
            query: ({ token, body }) => ({
                url: "management/school-admin",
                method: "Post",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: body
            })
        }),
    })
})


export const {
    useAddAdminMutation,

} = addNewAdminApi