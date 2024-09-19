import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const adminAPi = createApi({
    reducerPath: "adminAPi",
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
        getAllAdmins: builder.query({
            query: ({ token, id }) => ({
                url: `management/school-admin/all?schoolId=${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
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
    useGetAllAdminsQuery

} = adminAPi