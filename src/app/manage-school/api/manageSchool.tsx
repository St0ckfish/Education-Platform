import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const schoolsApis = createApi({
    reducerPath: "schoolsApis",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['schools'],
    endpoints: (builder) => ({
        getAllSchools: builder.query({
            query: ({ token, page, search }: { token: string, page: number, search: string }) => ({
                url: `management/school/all?page=${page}&size=10${search !== "" ? `&search=${search}` : ""}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },

            }),
            providesTags: ["schools"]
        }),
        getSchoolById: builder.query({
            query: ({ token, page, search }: { token: string, page: number, search: string }) => ({
                url: `management/school/all?page=${page}&size=10${search !== "" ? `&search=${search}` : ""}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },

            }),
            providesTags: ["schools"]
        }),
        deleteSchool: builder.mutation({
            query: ({ token, id }: { token: string, id: number }) => ({
                url: `management/course/${id}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ["schools"]

        })
    })
})

export const { useGetAllSchoolsQuery, useGetSchoolByIdQuery, useDeleteSchoolMutation } = schoolsApis