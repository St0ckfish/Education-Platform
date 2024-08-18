import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/axios"

export const courseSlice = createApi({
    reducerPath: "courseAndCountry",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({

        getCountry: builder.query({
            query: (token) => ({
                url: "management/country/all?page=0&size=10",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getEduSystem: builder.query({
            query: (token) => ({
                url: "edu_system/all?size=10&page=0&archived=false",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        addCourse: builder.mutation({
            query: (token, data) => ({
                url: "management/course",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: data
            })
        })
    })
})


export const { useGetCountryQuery, useAddCourseMutation , useGetEduSystemQuery } = courseSlice