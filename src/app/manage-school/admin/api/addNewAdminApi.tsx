import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const addNewAdminApi = createApi({
    reducerPath: "addNewAdminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getGander: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/gender",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getReligion: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/religion",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getNationality: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/nationality",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getEmployeeType: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/employee-type",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getQualification: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/qualification",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getRegions: builder.query({
            query: (token: string) => ({
                url: "management/region/all?size=100",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
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
        getAdmin: builder.query({
            query: ({ token, id }) => ({
                url: `management/school-admin/update/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
        }),
        updateAdmin: builder.mutation({
            query: ({ token, id, body }) => ({
                url: `management/school-admin/${id}`,
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                token, body
            })
        }),

    })
})


export const {
    useGetGanderQuery,
    useGetReligionQuery,
    useGetNationalityQuery,
    useGetEmployeeTypeQuery,
    useGetQualificationQuery,
    useGetRegionsQuery,
    useAddAdminMutation,
    useGetAdminQuery,
    useUpdateAdminMutation

} = addNewAdminApi