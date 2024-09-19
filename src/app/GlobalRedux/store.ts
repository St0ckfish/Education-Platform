"use client";
import { configureStore } from "@reduxjs/toolkit";
import { courseSlice } from "../create-course/api/createCourseSlice";
import { feedbackSlice } from "../feedback/api/feedbackSlice"
import { findAccountSlice } from "../(auth)/forget-password/api/findAccountSlice";
import { selectEmailSlice } from "../(auth)/otp/api/selectEmailSlice";
import { loginSlice } from "../(auth)/login/api/loginSlice";
import { AllCoursesSlice } from "../resource-management/api/getCoursesSlice";
import { backupsApis } from "../backups/api/backupsApis";
import { schoolsApis } from "../manage-school/api/manageSchool";
import { createSchoolSlice } from "../add-new-school/api/createSchoolApi";
import { dashboardSlice } from "../Dashboard/api/dashboardApi";
import { systemsApis } from "../education-system/api/manageSystems";
import { adminAPi } from "../manage-school/admin/api/adminApis";
import ThemeSlice from "./ThemeSlice";
import { editAdminApi } from "../manage-school/admin/edit-admin/[id]/api/EditAdminApi";
import { addNewAdminApi } from "../manage-school/admin/add-new-admin/[id]/api/AddNewAdminApi";

export const store = configureStore({
    reducer: {
        theme: ThemeSlice,
        [loginSlice.reducerPath]: loginSlice.reducer,
        [courseSlice.reducerPath]: courseSlice.reducer,
        [feedbackSlice.reducerPath]: feedbackSlice.reducer,
        [findAccountSlice.reducerPath]: findAccountSlice.reducer,
        [selectEmailSlice.reducerPath]: selectEmailSlice.reducer,
        [AllCoursesSlice.reducerPath]: AllCoursesSlice.reducer,
        [backupsApis.reducerPath]: backupsApis.reducer,
        [schoolsApis.reducerPath]: schoolsApis.reducer,
        [createSchoolSlice.reducerPath]: createSchoolSlice.reducer,
        [dashboardSlice.reducerPath]: dashboardSlice.reducer,
        [systemsApis.reducerPath]:systemsApis.reducer,
        [adminAPi.reducerPath]: adminAPi.reducer,
        [editAdminApi.reducerPath]: editAdminApi.reducer,
        [addNewAdminApi.reducerPath] : addNewAdminApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().
            concat(loginSlice.middleware).
            concat(courseSlice.middleware).
            concat(feedbackSlice.middleware).
            concat(findAccountSlice.middleware).
            concat(selectEmailSlice.middleware).
            concat(AllCoursesSlice.middleware).
            concat(backupsApis.middleware).
            concat(schoolsApis.middleware).
            concat(createSchoolSlice.middleware).
            concat(dashboardSlice.middleware).
            concat(systemsApis.middleware).
            concat(adminAPi.middleware).
            concat(editAdminApi.middleware).
            concat(addNewAdminApi.middleware)
    ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;