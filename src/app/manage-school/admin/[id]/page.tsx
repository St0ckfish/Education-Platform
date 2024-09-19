/* eslint-disable @next/next/no-img-element */
"use client"
import Spinner from '@/components/spinner';
import { useState } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation';
const Admins = () => {


    const params = useParams()

    console.log(params);

    const [search, setSearch] = useState("")

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
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="icon" name="icon" className="py-2 dark:bg-[#0D0D0D] dark:border-gray-800 outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link href={`add-new-admin/${params.id}`} className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">+ Add new Admin</Link>
                    </div>
                </div>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                            <tr className='text-gray-700 uppercase bg-[#daeafb] dark:bg-[#06203C] dark:text-white'>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Code
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    About
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Plan
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Actions
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b  hover:bg-gray-50 card">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Nahda
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    C45121
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    This is text
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    NAHDA_ONE@gmail.com
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    01522045796
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    Zamalk,Cairo,Egypt
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    Deactivate
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={`edit-admin/${params.id}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Admins;