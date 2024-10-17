import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/axios"


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
       
    })
})


export const { useGetSchoolPermissionsQuery } = createSchoolPermissionsSlice