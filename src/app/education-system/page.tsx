"use client"
import { useState } from "react";
import Cookies from "js-cookie"
import { useGetAllEducationSystemQuery } from "./api/manageSystems";
import Systems from "./components/Systems";
import EmptyEducations from "./components/emptySchools";

const ManageSchool = () => {
    
    const token = Cookies.get('token') || "";
    
    const [search , setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(0);
    const { data , isError , isLoading } = useGetAllEducationSystemQuery({ token, page:currentPage, search })

    const empty = data?.data?.emptyPage 
    

    return (
        <>
            <div className="lg:ml-[270px] mr-[5px]">
                {
                    empty || isError ?
                    <EmptyEducations/>
                    :
                    <Systems data={data} search={search} setSearch={setSearch} isLoading={isLoading} setCurrentPage={setCurrentPage}/>
                }
            </div>
        </>
    )
}

export default ManageSchool;