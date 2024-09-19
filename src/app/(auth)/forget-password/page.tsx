"use client"
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import { useFindAccountMutation } from "./api/findAccountSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const ForgetPassword = () => {
    const router = useRouter()

    const [value, setValue] = useState("")
    const [findAccount, { data, isSuccess, isLoading }] = useFindAccountMutation()

    const handleSend = async (e: any) => {
        e.preventDefault()
        findAccount(value)
    };

    useEffect(() => {
        if (isSuccess) {
            if (data.success) {
                router.push("otp")
                Cookies.set("emailOpt", data.data.emails[0] )
                Cookies.set("userOpt", data.data.userId )
            }
        }
    }, [isSuccess])




    return (
        <>
            <div className="grid grid-cols-2 justify-center items-center ease-in duration-300 max-[1040px]:grid-cols-1 h-screen">
                <div className="max-[1040px]:hidden">
                    <img className="w-[800px] h-[920px]" src="images/Forgot password.png" alt="#" />
                </div>
                <div className="gird justify-center items-center text-center">
                    <div className="grid mb-10">
                        <h1 className="font-bold text-[28px] font-sans text-[#041631]">Forgot Password</h1>
                        <p className="text-[#526484] font-sans text-[20px] font-semibold">Enter your username or email to get OTP.</p>
                    </div>
                    <div className="grid justify-center items-center">
                        <form className="grid gap-10">
                            <label htmlFor="text" className="grid text-[#041631] text-start text-[18px] font-sans font-semibold">
                                username or email
                                <input onChange={(e) => setValue(e.target.value)} id="text" placeholder="Enter your username or email" className="w-[450px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" type="text" required />
                            </label>

                            {
                                isLoading ? <Spinner /> :
                                    <div className="flex justify-center text-center">
                                        <button onClick={handleSend} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[170px] ease-in duration-300">Recovery code</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;