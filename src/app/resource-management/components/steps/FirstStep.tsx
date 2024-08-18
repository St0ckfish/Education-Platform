"use client"
import React from 'react'
import { Label, Select, Textarea, TextInput } from "flowbite-react";
import style from "./style.module.css"
import { useAddCourseMutation, useGetCountryQuery, useGetEduSystemQuery } from '../../api/createCourseSlice';
import Cookies from "js-cookie"

interface FirstStepProps {
  handleNext: () => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ handleNext  }) => {

  const token = Cookies.get('token');

  const [addCourse] = useAddCourseMutation();

  const {data : dataCountry  , isSuccess : successCountry} = useGetCountryQuery(token)
  const {data : dataEdu , isSuccess: successEduSystem  } = useGetEduSystemQuery(token)

  const handleSend = async () => {
    try{
      addCourse(token , ).unwrap()

    }catch(e){
      e
    }
  }


  return (
    <form className='bg-white p-3 shadow-md shadow-[#00000040] rounded-md' onSubmit={(e) => {
      e.preventDefault()
      handleNext()
    }}>
      <div className='grid md:grid-cols-2 gap-10 '>
        <div>
          <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="country">country <span className='text-[#367AFF] text-xl'>*</span></label>
          <Select className={`${style.selectForm}`} id='country'>
            {successCountry && (
              <>
                <option>Select country</option>
                {dataCountry.data.content.map((item : any) => (
                <option key={item.id}>{item.name_en}</option>
                ))}
              </>
            )}
            
          </Select>
        </div>
        <div>
          <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="eduSystem">eduSystem <span className='text-[#367AFF] text-xl'>*</span></label>
          <Select className={`${style.selectForm}`} id='eduSystem'>
            {successEduSystem && (
              <>
                <option>Select EduSystem</option>
                {dataEdu.data.content.map((item : any , index: number) => (
                <option key={index}>{item}</option>
                ))}
              </>
            )}
            
          </Select>
        </div>
        <div>
          <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="grade">Grade Level <span className='text-[#367AFF] text-xl'>*</span></label>
          <Select className={`${style.selectForm}`} id='grade'>
            <option>Select Grade Level</option>
            <option>Sec</option>
            <option>Thierd</option>
          </Select>
        </div>
        <div>
          <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="code">Code <span className='text-[#367AFF] text-xl'>*</span></label>
          <TextInput id="code" type="number" placeholder="Enter code" required />
        </div>
      </div>
      <h3 className='font-semibold my-5 md:text-xl	text-[#526484]'>Category</h3>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseNameEn" value="Course name English" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <TextInput id="courseNameEn" type="text" placeholder="Enter course name" required />
      </div>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseNameAr" value="Course name Arabic" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <TextInput id="courseNameAr" type="text" placeholder="Enter course name" required />
      </div>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseNameFr" value="Course name French" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <TextInput id="courseNameFr" type="text" placeholder="Enter course name" required />
      </div>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseDescriptionEn" value="course description English" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <Textarea rows={7} id="courseDescriptionEn" placeholder="Write course description" required />
      </div>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseDescriptionAr" value="course description Arabic" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <Textarea rows={7} id="courseDescriptionAr" placeholder="Write course description" required />
      </div>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseDescriptionFr" value="course description French" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <Textarea rows={7} id="courseDescriptionFr" placeholder="Write course description" required />
      </div>
      <div className='my-4 flex justify-end'>
        <button className='text-white flex items-center bg-[#367AFF] md:text-lg py-1.5 px-8 rounded-md hover:opacity-80' >Next
          <svg width="24" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2106 18.2928C10.6011 18.6833 11.2343 18.6833 11.6248 18.2928L16.5122 13.4006C17.2926 12.6194 17.2923 11.3536 16.5116 10.5728L11.6212 5.6825C11.2307 5.2919 10.5975 5.2919 10.207 5.6825C9.81643 6.073 9.81643 6.7062 10.207 7.0967L14.3926 11.2823C14.7832 11.6728 14.7831 12.306 14.3926 12.6965L10.2106 16.8786C9.82004 17.2691 9.82004 17.9023 10.2106 18.2928Z" fill="white" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default FirstStep
