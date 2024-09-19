import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const AllCoursesSlice = createApi({
    reducerPath: "getCourses",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['courses'],
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: ({token , page , search} : {token: string , page: number , search: string}) => ({
                url: `management/course/all?size=10&page=${page}${search !== "" ? `&search=${search}` : ""} `,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                
            }),
            providesTags: ["courses"]
        }),
        getCourseById: builder.query({
            query: ({token , id} : {token: string , id: any}) => ({
                url: `management/course/update/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                
            }),
            providesTags: ["courses"]
        }),
        getLeasson: builder.query({
            query: ({token , id} : {token: string , id: any}) => ({
                url: `management/lesson/update/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                
            }),
            providesTags: ["courses"]
        }),
        getTopic: builder.query({
            query: ({token , id} : {token: string , id: any}) => ({
                url: `management/lesson-topic/update/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                
            }),
            providesTags: ["courses"]
        }),
        deleteCourse: builder.mutation({
            query: ({token , id } : {token: string , id: number}) => ({
                url: `management/course/${id}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ["courses"]
        }),
    })
})

export const {useGetAllCoursesQuery , useGetLeassonQuery , useGetTopicQuery , useDeleteCourseMutation , useGetCourseByIdQuery } = AllCoursesSlice