import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseUrl } from "../../api/axios"

console.log(baseUrl);

export const feedbackSlice = createApi({
    reducerPath: "feedbackApi",
    baseQuery:  fetchBaseQuery({
        baseUrl:baseUrl
    }),
    endpoints: (builder) => ({
        getAllFeedback: builder.query({
            query:(token) => ({
                url: "management/feedback/all?size=10&page=0&deleted=false",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),

    })
})


export const {useGetAllFeedback} = feedbackSlice
