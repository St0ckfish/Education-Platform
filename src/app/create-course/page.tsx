"use client"
import React, { useState } from 'react'
import FirstStep from "./components/steps/FirstStep"
import SecoundStep from "./components/steps/SecoundStep"
import ThirdStep from './components/steps/ThirdStep';
import { useAddCourseMutation } from './api/createCourseSlice';
import Cookies from "js-cookie"

function Page() {
    const [activeStep, setActiveStep] = useState(0);

    const [code, setCode] = useState("")
    const [countryId, setCountryId] = useState("")
    const [level, setLevel] = useState("")
    const [registrationType, setRegistrationType] = useState("")
    const [language, setLanguage] = useState("")
    const [eduSystemId, setEduSystemId] = useState("")
    const [name_en, setName_en] = useState("")
    const [name_ar, setName_ar] = useState("")
    const [name_fr, setName_fr] = useState("")
    const [description_en, setDescription_en] = useState("")
    const [description_ar, setDescription_ar] = useState("")
    const [description_fr, setDescription_fr] = useState("")
    const [prerequisites, setPrerequisites] = useState<string[]>([""]);

    const token = Cookies.get('token') || "";

    const [addCourse, { data , originalArgs , error}] = useAddCourseMutation();

    const handleNext = () => {
        setActiveStep((cur) => cur + 1)

    }
    const handlePrev = () => {
        setActiveStep((cur) => cur - 1)
    }

    const handleSend = async () => {
        const objectReq = {
            "code": code,
            "countryId": countryId,
            "level": level,
            "registrationType": registrationType,
            "language": language,
            "eduSystemId": eduSystemId,
            "name_en": name_en,
            "name_ar": name_ar,
            "name_fr": name_fr,
            "description_en": description_en,
            "description_ar": description_ar,
            "description_fr": description_fr,
            "prerequisiteIds": prerequisites
        }
        addCourse({ token, data: objectReq }).unwrap()
    }

  

    const steps = [
        {
            step: 1,
            about: "Course Information",
            ele: <FirstStep
                handleNext={handleNext}
                code={code}
                setCode={setCode}
                countryId={countryId}
                setCountryId={setCountryId}
                language={language}
                eduSystemId={eduSystemId}
                setEduSystemId={setEduSystemId}
                setLanguage={setLanguage}
                registrationType={registrationType}
                setRegistrationType={setRegistrationType}
                level={level}
                setLevel={setLevel}
                name_en={name_en}
                setName_en={setName_en}
                name_ar={name_ar}
                setName_ar={setName_ar}
                name_fr={name_fr}
                setName_fr={setName_fr}
                description_en={description_en}
                setDescription_en={setDescription_en}
                description_ar={description_ar}
                setDescription_ar={setDescription_ar}
                description_fr={description_fr}
                setDescription_fr={setDescription_fr}
            />
        },
        {
            step: 2,
            about: "Course Option",
            ele: <SecoundStep
                handleNext={handleNext}
                handlePrev={handlePrev}
                prerequisites={prerequisites}
                setPrerequisites={setPrerequisites}
                handleSend={handleSend}
            />
        },
        {
            step: 3,
            about: "Course Content",
            ele: <ThirdStep dataAddCourse={data} handleNext={handleNext} handlePrev={handlePrev} />
        }
    ];

    return (
        <div className="lg:ml-[280px] mr-[5px] relative mt-5 overflow-x-auto  bg-transparent sm:rounded-lg px-2  min-h-screen">
            <h1 className="font-bold text-[28px] font-sans text-[#041631] dark:text-white">Create Course</h1>
            <div className='grid md:grid-cols-3 gap-8 mt-16'>
                <div className='md:col-span-2'>
                    <div className=' h-full '>
                        {steps[activeStep].ele}
                    </div>
                </div>
                <div>
                    <div className='flex flex-col'>
                        {steps.map((item, index) => (
                            <div className='flex items-center' key={index}>
                                <div className={`cursor-pointer transition-all duration-300 font-medium text-lg my-5 p-1.5 px-4 rounded-full shadow-md shadow-[#00000040] ${activeStep >= index
                                    ? 'bg-[#3E5AF0] text-white'
                                    : 'bg-[#F9F9F9] text-black'
                                    }`}
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
