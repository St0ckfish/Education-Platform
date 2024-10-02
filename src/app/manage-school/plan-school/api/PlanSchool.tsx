import { baseUrl } from "@/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const SchoolPlanApi = createApi({
    reducerPath: "schoolPlan",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ["schoolPlan"],
    endpoints: (builder) => ({
        getAllSchoolPlans: builder.query({
            query: ({ token, page }) => ({
                url: `management/school/plan/all?page=${page}&size=10&active`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getSchoolPlan: builder.query({
            query: ({ token, id }) => ({
                url: `management/school/plan/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),

    })
})


export const {useGetAllSchoolPlansQuery , useGetSchoolPlanQuery} = SchoolPlanApi

