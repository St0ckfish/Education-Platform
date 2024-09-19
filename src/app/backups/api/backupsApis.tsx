import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const backupsApis = createApi({
    reducerPath: "backupsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['backups'],
    endpoints: (builder) => ({
        getAllBackups: builder.query({
            query: ({ token, page, search }: { token: string, page: number, search: string }) => ({
                url: `management/backup/all?page=${page}&size=10${search !== "" ? `&search=${search}` : ""}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },

            }),
            providesTags: ["backups"]
        }),
        deleteBackup: builder.mutation({
            query: ({ token, id }: { token: string, id: number }) => ({
                url: `management/course/${id}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ["backups"]

        })
    })
})

export const { useGetAllBackupsQuery, useDeleteBackupMutation } = backupsApis