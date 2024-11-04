"use client"
import { useState } from "react";
import { useGetAllCoursesQuery } from "./api/getCoursesSlice";
import Courses from "./components/Courses";
import EmptyCourses from "./components/EmptyCourses";
import Cookies from "js-cookie"

const ResourseManagement = () => {

    const token = Cookies.get('token') || "";
    const [currentPage, setCurrentPage] = useState(0);
    const [search , setSearch] = useState("")

    const {data , isLoading } = useGetAllCoursesQuery({token , page:currentPage , search})
    console.log('courses:', data)

    return (
        <>
            <div className="lg:ml-[270px] mr-[5px]">
                {
                    data?.data?.empty ?
                    <EmptyCourses/>
                    :
                    <Courses search={search} setSearch={setSearch} isLoading={isLoading} setCurrentPage={setCurrentPage} data={data} />
                }
            </div>
        </>
    )
}

export default ResourseManagement;