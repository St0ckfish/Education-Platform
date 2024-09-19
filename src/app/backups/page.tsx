"use client"
import Cookies from "js-cookie"
import { useGetAllBackupsQuery } from "./api/backupsApis";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const BackUp = () => {

    const token = Cookies.get('token') || "";
    const [currentPage ,setCurrentPage] = useState(0)
    const [search , setSearch] = useState("")

    const { data, isLoading } = useGetAllBackupsQuery({ token , page:currentPage , search })


    const handlePageClick = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <>
            <div className="lg:ml-[270px] md:px-2 mr-[5px] relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen h-screen">
                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
                    <div className="my-3">
                        <label htmlFor="icon" className="sr-only">Search</label>
                        <div className="relative min-w-72 md:min-w-80">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="icon" name="icon" className="py-2  outline-none border-2 px-4 ps-11 block w-full border-gray-200 dark:bg-[#0D0D0D] dark:text-white dark:border-gray-800 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                        </div>
                    </div>
                </div>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] dark:bg-[#06203C] dark:text-white">
                            <tr>
                                
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Mode
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    size
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    extension
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.content?.map((item: any) => (
                                <tr key={item.id} className="bg-white border-b card hover:bg-gray-50">
                                  
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  dark:text-white">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.mode}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.size}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.extension}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={data?.data?.totalPages}
                    previousLabel="< "
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>


        </>
    );
}

export default BackUp;