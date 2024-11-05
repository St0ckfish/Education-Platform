"use client"

import { Select } from "flowbite-react";
import style from "./style.module.css"
import { useAddSchoolMutation, useGetCurriculumQuery, useGetEducationsQuery, useGetLanguagesQuery, useGetRegionQuery, useGetTypeQuery } from "./api/createSchoolApi";
import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { useGetEducationLevelQuery } from "../create-course/api/createCourseSlice";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useRouter } from "next/navigation";


const AddNewSchool = () => {

    const router = useRouter()
    const token = Cookies.get('token') || "";
    const lang = Cookies.get('lang') || "";
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [about, setAbout] = useState("")
    const [theme, setTheme] = useState("")
    const [curriculum, setCurriculum] = useState("")
    const [type, setType] = useState("")
    const [languages, setLanguages] = useState<string[]>([]);
    const [levels, setLevels] = useState<string[]>([]);
    const [educations, setEducations] = useState<string[]>([]);
    const [regionId, setRegionId] = useState("")
    const [fallSemesterStartDate, setFallSemesterStartDate] = useState('');
    const [fallSemesterEndDate, setFallSemesterEndDate] = useState('');
    const [springSemesterStartDate, setSpringSemesterStartDate] = useState('');
    const [springSemesterEndDate, setSpringSemesterEndDate] = useState('');
    const [summerSemesterStartDate, setSummerSemesterStartDate] = useState('');
    const [summerSemesterEndDate, setSummerSemesterEndDate] = useState('');
    const [established, setEstablished] = useState('');
    const [workDayStartTime, setWorkDayStartTime] = useState('');
    const [workDayEndTime, setWorkDayEndTime] = useState('');
    const [numberOfLegalAbsenceDays, setNumberOfLegalAbsenceDays] = useState('');
    const { isSuccess: successCurriculum, data: dataCurriculum } = useGetCurriculumQuery(token)
    const { isSuccess: successType, data: dataType } = useGetTypeQuery(token)
    const { isSuccess: successLanguages, data: dataLanguages } = useGetLanguagesQuery(token)
    const { isSuccess: successLevels, data: dataLevels } = useGetEducationLevelQuery(token)
    const { isSuccess: successEducations, data: dataEducations } = useGetEducationsQuery(token)
    const { isSuccess: successRegions, data: dataRegions } = useGetRegionQuery(token)
    const [addSchool, { error, isError, isSuccess }] = useAddSchoolMutation()
    const [openLanguages, setOpenLanguages] = useState(false);
    const [openLevels, setOpenLevels] = useState(false);
    const [openEducations, setOpenEducations] = useState(false);

    // Error Messages
    const [nameError, setNameError] = useState("");
    const [codeError, setCodeError] = useState("");
    const [aboutError, setAboutError] = useState("");
    const [themeError, setThemeError] = useState("");
    const [curriculumError, setCurriculumError] = useState("");
    const [typeError, setTypeError] = useState("");
    const [languagesError, setLanguagesError] = useState("");
    const [levelsError, setLevelsError] = useState("");
    const [educationsError, setEducationsError] = useState("");
    const [errorFallSemesterStartDate, setErrorFallSemesterStartDate] = useState('');
    const [errorFallSemesterEndDate, setErrorFallSemesterEndDate] = useState('');
    const [errorSpringSemesterStartDate, setErrorSpringSemesterStartDate] = useState('');
    const [errorSpringSemesterEndDate, setErrorSpringSemesterEndDate] = useState('');
    const [errorSummerSemesterStartDate, setErrorSummerSemesterStartDate] = useState('');
    const [errorSummerSemesterEndDate, setErrorSummerSemesterEndDate] = useState('');
    const [errorEstablished, setErrorEstablished] = useState('');
    const [errorWorkDayStartTime, setErrorWorkDayStartTime] = useState('');
    const [errorWorkDayEndTime, setErrorWorkDayEndTime] = useState('');
    const [errorRegionId, setErrorRegionId] = useState('');
    const [errorNumberOfLegalAbsenceDays, setErrorNumberOfLegalAbsenceDays] = useState('');
  

    const validateInputs = () => {
        // Reset all error messages
        setNameError("");
        setCodeError("");
        setAboutError("");
        setThemeError("");
        setCurriculumError("");
        setTypeError("");
        setLanguagesError("");
        setLevelsError("");
        setEducationsError("");
        setErrorFallSemesterStartDate('');
        setErrorFallSemesterEndDate('');
        setErrorSpringSemesterStartDate('');
        setErrorSpringSemesterEndDate('');
        setErrorSummerSemesterStartDate('');
        setErrorSummerSemesterEndDate('');
        setErrorEstablished('');
        setErrorWorkDayStartTime('');
        setErrorWorkDayEndTime('');
        setErrorRegionId('');
        setErrorNumberOfLegalAbsenceDays('');
    
        let isValid = true;
    
        // Perform validations
        if (name.trim() === "") {
            setNameError("Name School is required");
            isValid = false;
        }
    
        if (code.trim() === "") {
            setCodeError("Code is required");
            isValid = false;
        }
    
        if (about.trim() === "") {
            setAboutError("About is required");
            isValid = false;
        }
    
        if (theme.trim() === "") {
            setThemeError("Theme is required");
            isValid = false;
        }
    
        if (!curriculum) {
            setCurriculumError("Curriculum is required");
            isValid = false;
        }
    
        if (!type) {
            setTypeError("Type is required");
            isValid = false;
        }
    
        if (languages.length === 0) {
            setLanguagesError("At least one language is required");
            isValid = false;
        }
    
        if (levels.length === 0) {
            setLevelsError("At least one level is required");
            isValid = false;
        }
    
        if (educations.length === 0) {
            setEducationsError("At least one education system is required");
            isValid = false;
        }
    
        if (!fallSemesterStartDate) {
            setErrorFallSemesterStartDate('This field is required');
            isValid = false;
        }
        if (!fallSemesterEndDate) {
            setErrorFallSemesterEndDate('This field is required');
            isValid = false;
        }
        if (!springSemesterStartDate) {
            setErrorSpringSemesterStartDate('This field is required');
            isValid = false;
        }
        if (!springSemesterEndDate) {
            setErrorSpringSemesterEndDate('This field is required');
            isValid = false;
        }
        if (!summerSemesterStartDate) {
            setErrorSummerSemesterStartDate('This field is required');
            isValid = false;
        }
        if (!summerSemesterEndDate) {
            setErrorSummerSemesterEndDate('This field is required');
            isValid = false;
        }
        if (!established) {
            setErrorEstablished('This field is required');
            isValid = false;
        }
        if (!workDayStartTime) {
            setErrorWorkDayStartTime('This field is required');
            isValid = false;
        }
        if (!workDayEndTime) {
            setErrorWorkDayEndTime('This field is required');
            isValid = false;
        }
        if (!regionId) {
            setErrorRegionId('This field is required');
            isValid = false;
        }
    
        // Parse the number for validation
        const parsedNumberOfLegalAbsenceDays = parseFloat(numberOfLegalAbsenceDays);
    
        if (!numberOfLegalAbsenceDays) {
            setErrorNumberOfLegalAbsenceDays('This field is required');
            isValid = false;
        } else if (isNaN(parsedNumberOfLegalAbsenceDays)) {
            setErrorNumberOfLegalAbsenceDays('Must be a number');
            isValid = false;
        }
    
        // Date validations
        if (new Date(fallSemesterStartDate) >= new Date(fallSemesterEndDate)) {
            setErrorFallSemesterEndDate('End date must be greater than start date');
            isValid = false;
        }
        if (new Date(springSemesterStartDate) >= new Date(springSemesterEndDate)) {
            setErrorSpringSemesterEndDate('End date must be greater than start date');
            isValid = false;
        }
        if (new Date(summerSemesterStartDate) >= new Date(summerSemesterEndDate)) {
            setErrorSummerSemesterEndDate('End date must be greater than start date');
            isValid = false;
        }
        if (new Date(workDayStartTime) >= new Date(workDayEndTime)) {
            setErrorWorkDayEndTime('End time must be greater than start time');
            isValid = false;
        }
    
        return isValid;
    };
    

    const toggleDropdown = () => {
        setOpenLanguages(!openLanguages);
        setOpenLevels(false)
        setOpenEducations(false)
    };
    const toggleDropdownLevels = () => {
        setOpenLevels(!openLevels);
        setOpenEducations(false)
        setOpenLanguages(false);

    };
    const toggleDropdownEducations = () => {
        setOpenEducations(!openEducations);
        setOpenLanguages(false);
        setOpenLevels(false)
    };

    const handleCheckboxChange = (value: string) => {
        setLanguages(prev =>
            prev.includes(value) ?
                prev.filter(lang => lang !== value) :
                [...prev, value]
        );
    };
    const handleCheckboxChangeLevels = (value: string) => {
        setLevels(prev =>
            prev.includes(value) ?
            prev.filter(level => level !== value) :
            [...prev, value]
        );
    };
    const handleCheckboxChangeEducations = (value: string) => {
        setEducations(prev =>
            prev.includes(value) ?
                prev.filter(education => education !== value) :
                [...prev, value]
        );
    };

    const formatDate = (dateString: string) => {
        if (dateString) {
            const date = new Date(dateString);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `--${month}-${day}`;
        }
        return '';
    };


    const handleSend = async (e: any) => {
        e.preventDefault();

        if (!validateInputs()) {
            return;
        }

        if (!name || !about || !code || !theme || !curriculum || !type || !languages.length || !levels.length || !educations.length || !regionId) {
            toast.error('Please fill out all required fields.');
            return;
        }
    
        const data = {
            name,
            about,
            code,
            theme,
            curriculum,
            type,
            languages,
            stages: levels,
            educationSystemsIds: educations,
            semesterDate: {
                fallSemesterStartDate,
                fallSemesterEndDate,
                springSemesterStartDate,
                springSemesterEndDate,
                summerSemesterStartDate,
                summerSemesterEndDate,
            },
            established,
            numberOfLegalAbsenceDays,
            workDayStartTime,
            workDayEndTime,
            regionId,
        };
    
        try {
            await addSchool({ token, data }).unwrap();
            toast.success('School added successfully!');
        } catch (error) {
            toast.error('Failed to add school. Please try again.');
        }
    };
    useEffect(() => {
        if (isError) {
            if (error && 'data' in error && (error as FetchBaseQueryError).data) {
                const errorData = (error as FetchBaseQueryError).data as any;
                if (errorData?.message) {
                    toast.error(errorData.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            } else {
                toast.error("Something went wrong, please try again later", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("School created successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            router.push("/manage-school")
        }
    }, [isSuccess, router])

    return (
        <>
            <div className="lg:ml-[270px] mr-[5px] grid justify-center items-center mt-10">

                <form>
                    <h1 className="font-bold text-[28px] mb-4 font-sans text-[#041631] dark:text-white">Add New School</h1>

                    <div className="grid p-10 bg-white card rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px]  gap-5 md:w-[600px] sm:w-[500px]">
                        <div className="flex items-center justify-start gap-2">
                            <svg className="h-6 w-6 font-bold text-[#526484] group-hover:text-[#3e5af0]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="3" y1="21" x2="21" y2="21" />  <line x1="3" y1="10" x2="21" y2="10" />  <polyline points="5 6 12 3 19 6" />  <line x1="4" y1="10" x2="4" y2="21" />  <line x1="20" y1="10" x2="20" y2="21" />  <line x1="8" y1="14" x2="8" y2="17" />  <line x1="12" y1="14" x2="12" y2="17" />  <line x1="16" y1="14" x2="16" y2="17" /></svg>
                            <h1 className="text-[22px] font-sans font-semibold">School Information</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                            <label htmlFor="name" className="grid text-[18px] font-sans font-semibold">
                                Name School
                                <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" className="w-full py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px]" />
                                {nameError && <span className="text-red-600 text-sm">{nameError}</span>}
                            </label>
                            <label htmlFor="code" className="grid text-[18px] font-sans font-semibold">
                                Code
                                <input value={code} onChange={(e) => setCode(e.target.value)} id="code" type="text" className="w-full py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px]" />
                                {codeError && <span className="text-red-600 text-sm">{codeError}</span>}
                            </label>
                            <label htmlFor="about" className="grid text-[18px] font-sans font-semibold">
                                About
                                <input value={about} onChange={(e) => setAbout(e.target.value)} id="about" type="text" className="w-full py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px]" />
                                {aboutError && <span className="text-red-600 text-sm">{aboutError}</span>}
                            </label>
                            <label htmlFor="theme" className="grid text-[18px] font-sans font-semibold">
                                theme
                                <input value={theme} onChange={(e) => setTheme(e.target.value)} id="theme" type="text" className="w-full py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px]" />
                                {themeError && <span className="text-red-600 text-sm">{themeError}</span>}
                            </label>
                            <div>
                                <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="curriculum">curriculum <span className='text-[#367AFF] text-xl'>*</span></label>
                                <Select value={curriculum} onChange={(e) => setCurriculum(e.target.value)} className={`${style.selectForm} `} id='curriculum'>
                                    {successCurriculum && (
                                        <>
                                            <option className='hidden'>Select curriculum</option>
                                            {Object.values(dataCurriculum.data).map((value: any) => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                                {curriculumError && <span className="text-red-600 text-sm">{curriculumError}</span>}
                            </div>
                            <div>
                                <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="type">type <span className='text-[#367AFF] text-xl'>*</span></label>
                                <Select value={type} onChange={(e) => setType(e.target.value)} className={`${style.selectForm}`} id='type'>
                                    {successType && (
                                        <>
                                            <option className='hidden'>Select type</option>
                                            {Object.values(dataType.data).map((value: any) => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                                {typeError && <span className="text-red-600 text-sm">{typeError}</span>}
                            </div>
                            <div className="relative">
                                {successLanguages && (
                                    <>
                                        <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="languages">languages <span className='text-[#367AFF] text-xl'>*</span></label>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleDropdown();
                                            }}
                                            className="w-full p-2.5 flex justify-between items-center text-sm font-medium text-gray-500 bg-white border dark:bg-gray-700 border-gray-300 rounded-lg "
                                        >
                                            Select Languages
                                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.707082 0.71057C0.316552 1.10108 0.316552 1.73428 0.707082 2.12478L5.59927 7.01218C6.38047 7.79258 7.64627 7.79228 8.42707 7.01158L13.3174 2.12118C13.708 1.73068 13.708 1.09748 13.3174 0.70696C12.9269 0.31643 12.2937 0.31643 11.9032 0.70696L7.71757 4.89258C7.32707 5.28318 6.69387 5.28308 6.30337 4.89258L2.12129 0.71057C1.73077 0.32004 1.0976 0.32004 0.707082 0.71057Z" fill="#041631" />
                                            </svg>
                                        </button>
                                        {openLanguages && (
                                            <ul className="absolute max-h-[200px] overflow-auto z-10 w-full mt-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 dark:bg-gray-700  rounded-lg   ">
                                                {Object.keys(dataLanguages.data).map((key: any) => (
                                                    <li key={key} className="w-full select-none border-b border-gray-200 rounded-t-lg ">
                                                        <div className="flex items-center ps-3">
                                                            <input
                                                                id={key}
                                                                type="checkbox"
                                                                value={key}
                                                                checked={languages.includes(key)}
                                                                onChange={() => handleCheckboxChange(key)}
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                                                            />
                                                            <label
                                                                htmlFor={key}
                                                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                {dataLanguages.data[key]}
                                                            </label>
                                                        </div>
                                                    </li>
                                                ))}

                                            </ul>
                                        )}
                                    </>
                                )}
                            {languagesError && <span className="text-red-600 text-sm">{languagesError}</span>}
                            </div>
                            <div className="relative">
                                {successLevels && (
                                    <>
                                        <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="Levels">Stages <span className='text-[#367AFF] text-xl'>*</span></label>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleDropdownLevels();
                                            }}
                                            className="w-full p-2.5 flex justify-between items-center text-sm font-medium text-gray-500 bg-white dark:bg-slate-700 border border-gray-300 rounded-lg "
                                        >
                                            Select Stages
                                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.707082 0.71057C0.316552 1.10108 0.316552 1.73428 0.707082 2.12478L5.59927 7.01218C6.38047 7.79258 7.64627 7.79228 8.42707 7.01158L13.3174 2.12118C13.708 1.73068 13.708 1.09748 13.3174 0.70696C12.9269 0.31643 12.2937 0.31643 11.9032 0.70696L7.71757 4.89258C7.32707 5.28318 6.69387 5.28308 6.30337 4.89258L2.12129 0.71057C1.73077 0.32004 1.0976 0.32004 0.707082 0.71057Z" fill="#041631" />
                                            </svg>
                                        </button>
                                        {openLevels && (
                                            <ul className="absolute dark:bg-slate-700 max-h-[200px] overflow-auto z-10 w-full mt-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg   ">
                                                {Object.keys(dataLevels.data).map((key: any) => (
                                                    <li key={key} className="w-full select-none border-b border-gray-200 rounded-t-lg ">
                                                        <div className="flex items-center ps-3">
                                                            <input
                                                                id={key}
                                                                type="checkbox"
                                                                value={key}
                                                                checked={levels.includes(key)}
                                                                onChange={() => handleCheckboxChangeLevels(key)}
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                                                            />
                                                            <label
                                                                htmlFor={key}
                                                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                {dataLevels.data[key]}
                                                            </label>
                                                        </div>
                                                    </li>
                                                ))}

                                            </ul>
                                        )}
                                    </>
                                )}
                            {levelsError && <span className="text-red-600 text-sm">{levelsError}</span>}
                          
  </div>
                            <div className="relative">
                                {successEducations && (
                                    <>
                                        <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="educationSystemsIds">Education Systems <span className='text-[#367AFF] text-xl'>*</span></label>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleDropdownEducations();
                                            }}
                                            className="w-full p-2.5 flex justify-between items-center text-sm font-medium text-gray-500 bg-white dark:bg-slate-700 border border-gray-300 rounded-lg "
                                        >
                                            Select Levels
                                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.707082 0.71057C0.316552 1.10108 0.316552 1.73428 0.707082 2.12478L5.59927 7.01218C6.38047 7.79258 7.64627 7.79228 8.42707 7.01158L13.3174 2.12118C13.708 1.73068 13.708 1.09748 13.3174 0.70696C12.9269 0.31643 12.2937 0.31643 11.9032 0.70696L7.71757 4.89258C7.32707 5.28318 6.69387 5.28308 6.30337 4.89258L2.12129 0.71057C1.73077 0.32004 1.0976 0.32004 0.707082 0.71057Z" fill="#041631" />
                                            </svg>
                                        </button>
                                        {openEducations && (
                                            <ul className="absolute dark:bg-slate-700 max-h-[200px] overflow-auto z-10 w-full mt-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg   ">
                                                {dataEducations.data.content.map((item: any) => (
                                                    <li key={item.id} className="w-full select-none border-b border-gray-200 rounded-t-lg ">
                                                        <div className="flex items-center ps-3">
                                                            <input
                                                                id={item.id}
                                                                type="checkbox"
                                                                value={item.id}
                                                                checked={educations.includes(item.id)}
                                                                onChange={() => handleCheckboxChangeEducations(item.id)}
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                                                            />
                                                            <label
                                                                htmlFor={item.id}
                                                                className="w-full dark:text-white py-3 ms-2 text-sm font-medium text-gray-900"
                                                            >
                                                                {item.name}
                                                            </label>
                                                        </div>
                                                    </li>
                                                ))}

                                            </ul>
                                        )}
                                    </>
                                )}
                            {educationsError && <span className="text-red-600 text-sm">{educationsError}</span>}

                            </div>
                            <div>
                                <label htmlFor="fallSemesterStartDate" className="text-[18px] font-sans font-semibold">
                                    Fall Semester Start Date
                                </label>
                                <input
                                    id="fallSemesterStartDate"
                                    type="date"
                                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                                    onChange={(e) => setFallSemesterStartDate(formatDate(e.target.value))}
                                />
                                {errorFallSemesterStartDate && <p className="text-red-500">{errorFallSemesterStartDate}</p>}
                            </div>
                            <div>
                                <label htmlFor="fallSemesterEndDate" className="text-[18px] font-sans font-semibold">
                                    Fall Semester End Date
                                </label>
                                <input
                                    id="fallSemesterEndDate"
                                    type="date"
                                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                                    onChange={(e) => setFallSemesterEndDate(formatDate(e.target.value))}
                                />
                            {errorFallSemesterEndDate && <p className="text-red-500">{errorFallSemesterEndDate}</p>}
                            </div>
                            <div>
                                <label htmlFor="springSemesterStartDate" className="text-[18px] font-sans font-semibold">
                                    Spring Semester Start Date
                                </label>
                                <input
                                    id="springSemesterStartDate"
                                    type="date"
                                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                                    onChange={(e) => setSpringSemesterStartDate(formatDate(e.target.value))}
                                />
                            {errorSpringSemesterStartDate && <p className="text-red-500">{errorSpringSemesterStartDate}</p>}
                            </div>
                            <div>
                                <label htmlFor="springSemesterEndDate" className="text-[18px] font-sans font-semibold">
                                    Spring Semester End Date
                                </label>
                                <input
                                    id="springSemesterEndDate"
                                    type="date"
                                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                                    onChange={(e) => setSpringSemesterEndDate(formatDate(e.target.value))}
                                />
                                {errorSpringSemesterEndDate && <p className="text-red-500">{errorSpringSemesterEndDate}</p>}
                            </div>
                            <div>
                                <label htmlFor="summerSemesterStartDate" className="text-[18px] font-sans font-semibold">
                                    Summer Semester Start Date
                                </label>
                                <input
                                    id="summerSemesterStartDate"
                                    type="date"
                                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                                    onChange={(e) => setSummerSemesterStartDate(formatDate(e.target.value))}
                                />
                                {errorSummerSemesterStartDate && <p className="text-red-500">{errorSummerSemesterStartDate}</p>}
                            </div>
                            <div>
                                <label htmlFor="summerSemesterEndDate" className="text-[18px] font-sans font-semibold">
                                    Summer Semester End Date
                                </label>
                                <input
                                    id="summerSemesterEndDate"
                                    type="date"
                                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                                    onChange={(e) => setSummerSemesterEndDate(formatDate(e.target.value))}
                                />
                                {errorSummerSemesterEndDate && <p className="text-red-500">{errorSummerSemesterEndDate}</p>}
                            </div>
                            <div>
                                <label htmlFor="established" className="text-[18px] font-sans font-semibold">
                                    Established
                                </label>
                                <input
                                    id="established"
                                    type="date"
                                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                                    value={established}
                                    onChange={(e) => setEstablished(e.target.value)}
                                />
                                {errorEstablished && <p className="text-red-500">{errorEstablished}</p>}
                            </div>
                            <div>
                                <label htmlFor="workDayStartTime" className="text-[18px] font-sans font-semibold">
                                    Work Day Start Time
                                </label>
                                <input
                                    id="workDayStartTime"
                                    type="time"
                                    step={2}
                                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                                    value={workDayStartTime}
                                    onChange={(e) => setWorkDayStartTime(e.target.value)}
                                />
                                {errorWorkDayStartTime && <p className="text-red-500">{errorWorkDayStartTime}</p>}
                            </div>
                            <div>
                                <label htmlFor="workDayEndTime" className="text-[18px] font-sans font-semibold">
                                    Work Day End Time
                                </label>
                                <input
                                    id="workDayEndTime"
                                    type="time"
                                    step={2}
                                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                                    value={workDayEndTime}
                                    onChange={(e) => setWorkDayEndTime(e.target.value)}
                                />
                                {errorWorkDayEndTime && <p className="text-red-500">{errorWorkDayEndTime}</p>}
                            </div>
                            <div>
                                <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="region">region <span className='text-[#367AFF] text-xl'>*</span></label>
                                <Select value={regionId} onChange={(e) => setRegionId(e.target.value)} className={`${style.selectForm}`} id='region'>
                                    {successRegions && (
                                        <>
                                            <option className='hidden'>Select region</option>
                                            {dataRegions.data.content.map((item: any) => (
                                                <option key={item.id} value={item.id}>

                                                    {lang === "english" && item.name_en || lang === "arabic" && item.name_ar || lang === "french" && item.name_fr}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                                {errorRegionId && <p className="text-red-500">{errorRegionId}</p>}
                            </div>
                            <div>
                                <label htmlFor="numberOfLegalAbsenceDays" className="text-[18px]  font-sans font-semibold">
                                    Number Of Legal Absence Days
                                </label>
                                <input value={numberOfLegalAbsenceDays} onChange={(e) => setNumberOfLegalAbsenceDays(e.target.value)} id="numberOfLegalAbsenceDays" type="text" className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                {errorNumberOfLegalAbsenceDays && <p className="text-red-500">{errorNumberOfLegalAbsenceDays}</p>}
                            </div>
                        </div>
                        <div className="flex justify-center text-center">
                            <button onClick={(e) => handleSend(e)} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white  text-[18px] w-[140px] ease-in duration-300">Add school</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddNewSchool;