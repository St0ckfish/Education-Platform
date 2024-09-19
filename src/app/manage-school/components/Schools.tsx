/* eslint-disable @next/next/no-img-element */
"use client"
import Spinner from '@/components/spinner';
import Link from "next/link";
import React from 'react';
import ReactPaginate from 'react-paginate';

interface Props {
    data: any;
    search: string;
    setSearch: (search: string) => void;
    isLoading: boolean;
    setCurrentPage: (page: number) => void
}

const Schools: React.FC<Props> = ({ data, search, setSearch, isLoading, setCurrentPage }) => {
    const handlePageClick = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };

    console.log(data);

    return (
        <>
            {
                isLoading ? (
                    <div className='mt-64'>
                        <Spinner />
                    </div>
                ) : (
                    <div className="relative md:px-2 mt-10 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen h-screen">
                        <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
                            <div className="my-3">
                                <label htmlFor="icon" className="sr-only">Search</label>
                                <div className="relative min-w-72 md:min-w-80">
                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                        <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                    </div>
                                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="icon" name="icon" className="py-2 dark:bg-[#0D0D0D] dark:border-gray-800 outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Link href="/add-new-school" className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">+ Add new school</Link>
                            </div>
                        </div>
                        <div className="overflow-auto relative shadow-md sm:rounded-lg">
                            <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] dark:bg-[#06203C] dark:text-white">
                                    <tr>
                                        
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Name School
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Code
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Theme
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Work Start
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Work End
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Actions
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Features
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Admin
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data?.content.map((item: any, index: number) => (
                                        <tr key={index} className="bg-white card border-b  hover:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ">
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.code}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.theme}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.workDayStartTime}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.workDayEndTime}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Deactivate
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href="/features" className="font-medium text-blue-600 hover:underline">Feature</Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={`/manage-school/admin/${item.id}`} className="font-medium text-blue-600 hover:underline">View</Link>
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
                            pageCount={data?.data?.totalPagesCount}
                            previousLabel="< "
                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </div>
                )
            }

        </>
    );
}

export default Schools;