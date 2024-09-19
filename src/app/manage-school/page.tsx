"use client"
import { useState } from "react";
import Schools from "./components/Schools";
import EmptySchools from "./components/emptySchools";
import Cookies from "js-cookie"
import { useGetAllSchoolsQuery } from "./api/manageSchool";

const ManageSchool = () => {
    
    const token = Cookies.get('token') || "";
    
    const [search , setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(0);
    const { data , isError , isLoading } = useGetAllSchoolsQuery({ token, page:currentPage, search })

    const empty = data?.data?.emptyPage 

    return (
        <>
            <div className="lg:ml-[270px] mr-[5px]">
                
                {
                    empty || isError ?
                    <EmptySchools/>
                    :
                    <Schools data={data} search={search} setSearch={setSearch} isLoading={isLoading} setCurrentPage={setCurrentPage}/>
                }
            </div>
        </>
    )
}

export default ManageSchool;