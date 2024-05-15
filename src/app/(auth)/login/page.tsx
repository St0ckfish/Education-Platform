"use client"
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import { useRef, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./loginSlice";

const Login = () => {
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userLoading = useSelector((state) => state.userLoading);



    const handleSubmit = (e:any) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <>
            <div className="grid grid-cols-2 justify-center items-center ease-in duration-300 max-[1040px]:grid-cols-1 h-screen">
                <div className="max-[1040px]:hidden">
                    <img className="w-[800px] h-[920px]" src="images/Login.png" alt="#" />
                </div>
                <div className="gird justify-center items-center text-center">
                    <div className="grid mb-10">
                        <h1 className="font-bold text-[28px] font-sans text-[#041631]">Log in</h1>
                        <p className="text-[#526484] font-sans text-[20px] font-semibold">To access your account</p>
                    </div>
                    <div className="grid justify-center items-center">
                        <form onSubmit={handleSubmit} className="grid gap-10">
                            <label htmlFor="email" className="grid text-[#041631] text-start text-[18px] font-sans font-semibold">
                                Your Email
                                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" className="w-[450px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" type="email" required />
                            </label>
                            <label htmlFor="password" className="grid text-[#041631] text-start text-[18px] font-sans font-semibold">
                                Your Password
                                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" className="w-[450px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" type="password" required />
                            </label>
                            <div className="flex text-end justify-end">
                                <a href="/forget-password" className="flex text-[12px] text-[#526484] font-medium font-sans hover:underline ">Forgot password ?</a>
                            </div>
                            {
                               userLoading? <Spinner/>:
                                    <div className="flex justify-center text-center">
                                        <button type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[140px] ease-in duration-300">Login</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;