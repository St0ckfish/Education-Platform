"use client"
const EditAdmin = () => {
    return (
        <>
            <div className="lg:ml-[270px] mr-[5px] grid justify-center items-center h-[850px]">
                <form>
                    <div className="grid p-10 bg-white rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px] xl:h-[700px] h-[800px] gap-5 md:w-[600px] sm:w-[500px]">
                        <div className="flex items-center justify-start gap-2">
                            <svg className="h-6 w-6 font-bold text-[#000000] group-hover:text-[#3e5af0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <h1 className="text-[22px] font-sans font-semibold">Admin Information</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                            <label htmlFor="name" className="grid text-[18px] font-sans font-semibold">
                                Name
                                <input id="name" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                            </label>
                            <label htmlFor="code" className="grid text-[18px] font-sans font-semibold">
                                Code
                                <input id="code" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                            </label>
                            <label htmlFor="about" className="grid text-[18px] font-sans font-semibold">
                                About
                                <input id="about" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                            </label>
                            <label htmlFor="Version" className="grid text-[18px] font-sans font-semibold">
                                Email
                                <input id="Version" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                            </label>
                            <label htmlFor="Initial" className="grid text-[18px] font-sans font-semibold">
                                Phone Number
                                <input id="Initial" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                            </label>
                            <label htmlFor="Expiration" className="grid text-[18px] font-sans font-semibold">
                                Address
                                <input id="Expiration" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                            </label>
                        </div>
                        <div className="flex justify-center text-center">
                            <button type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white  text-[18px] w-[140px] ease-in duration-300">Add  Admin</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditAdmin;