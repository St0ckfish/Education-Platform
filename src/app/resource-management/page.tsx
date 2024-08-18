"use client"
import React, { useState } from 'react'
import FirstStep from "./components/steps/FirstStep"
import SecoundStep from "./components/steps/SecoundStep"
import ThirdStep from './components/steps/ThirdStep';
import FourthStep from './components/steps/FourthStep';

function Page() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((cur) => cur + 1)

    }
    const handlePrev = () => {
        setActiveStep((cur) => cur - 1)
    }

    const steps = [
        {
            step: 1,
            about: "Course Information",
            ele: <FirstStep handleNext={handleNext} />
        },
        {
            step: 2,
            about: "Course Option",
            ele: <SecoundStep handleNext={handleNext} handlePrev={handlePrev} />
        },
        {
            step: 3,
            about: "Course Content",
            ele: <ThirdStep handleNext={handleNext} handlePrev={handlePrev} />
        },
        {
            step: 4,
            about: "Course Preview",
            ele: <FourthStep handleNext={handleNext} handlePrev={handlePrev} />
        }
    ];



    return (
        <div className="lg:ml-[280px] mr-[5px] relative mt-5 overflow-x-auto  bg-transparent sm:rounded-lg px-2  min-h-screen">
            <h1 className="font-bold text-[28px] font-sans text-[#041631]">Create Course</h1>
            <div className='grid md:grid-cols-3 gap-8 mt-16'>
                <div className='md:col-span-2'>
                    <div className=' h-full '>
                        {steps[activeStep].ele}

                    </div>
                </div>
                <div>
                    <div
                        className='flex flex-col '

                    >
                        {steps.map((item, index) => (
                            <div className='flex items-center' key={index}>
                                <div className={`cursor-pointer transition-all duration-300 font-medium text-lg my-5 p-1.5 px-4 rounded-full shadow-md shadow-[#00000040] ${activeStep >= index
                                    ? 'bg-[#3E5AF0] text-white'
                                    : 'bg-[#F9F9F9] text-black'
                                    }`}
                                    onClick={() => setActiveStep(index)}
                                >
                                    {item.step}
                                </div>
                                {activeStep >= index && (
                                    <span className='ms-3 text-[#526484]'>{item.about}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Page
