import { baseUrl } from "@/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const createSchoolPermissionsSlice = createApi({
    reducerPath: "createSchoolPermissionsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getSchoolPermissions: builder.query({
            query: (token: string) => ({
                url: "management/school/plan/permissions",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getSchoolPlans: builder.query({
            query: ({ token, id }: { token: string, id: any}) => ({
                url: `management/school/plan/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            // providesTags: ["schoolPlans"]
        }),
    })
})


export const { useGetSchoolPermissionsQuery, useGetSchoolPlansQuery } = createSchoolPermissionsSlice