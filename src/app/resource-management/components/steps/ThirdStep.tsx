import React from 'react'
import { FileInput, Label, TextInput } from "flowbite-react";

interface ThirdStepProps {
    handleNext: () => void;
    handlePrev: () => void;
}

const ThirdStep: React.FC<ThirdStepProps> = ({ handleNext, handlePrev }) => {
    return (
        <div className='bg-white p-3 shadow-md  rounded-md'>
            <div>
                <h3 className='font-semibold mb-5 md:text-xl text-[#526484]'>Lesson</h3>
                <div className='my-3'>
                    <div className="mb-4 block">
                        <Label className='md:text-lg capitalize font-medium' htmlFor="LessonName" value="Lesson Name" />
                    </div>
                    <TextInput id="LessonName" type="text" placeholder="Enter course name" required />
                </div>
                <div className='my-3'>
                    <div className="mb-4 block">
                        <Label className='md:text-lg capitalize font-medium' htmlFor="LessonGoals" value="Lesson Goals" />
                    </div>
                    <TextInput id="LessonGoals" type="text" placeholder="Enter lesson goals" required />
                </div>
                <h3 className='font-semibold my-5 md:text-xl text-[#526484]'>Topic</h3>
                <div className='my-3'>
                    <div className="mb-4 block">
                        <Label className='md:text-lg capitalize font-medium' htmlFor="TopicName" value="Topic Name" />
                    </div>
                    <TextInput id="TopicName" type="text" placeholder="Enter topic name" required />
                </div>
                <div className='my-3'>
                    <div className="mb-4 block">
                        <Label className='md:text-lg capitalize font-medium' value="Tutorial" />
                    </div>
                    <FileInput />
                </div>

            </div>



            <div className='my-4 flex justify-end'>
                <button onClick={handlePrev} className='text-[#367AFF] font-medium border flex items-center md:text-lg py-1.5 ps-8 pe-5 rounded-lg hover:opacity-80 me-2' >
                    <svg className='me-2' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.28943 0.707204C6.89892 0.316674 6.26572 0.316674 5.87522 0.707204L0.987819 5.5994C0.207419 6.3806 0.20772 7.6464 0.98842 8.4272L5.87882 13.3175C6.26932 13.7081 6.90252 13.7081 7.29304 13.3175C7.68357 12.927 7.68357 12.2938 7.29304 11.9033L3.10742 7.7177C2.71682 7.3272 2.71692 6.69399 3.10742 6.30349L7.28943 2.12141C7.67996 1.73089 7.67996 1.09772 7.28943 0.707204Z" fill="#3E5AF0" />
                    </svg>
                    Previous
                </button>
                <button onClick={handleNext} className='text-white font-medium border border-[#367AFF] flex items-center bg-[#367AFF] md:text-lg py-1.5 px-8 rounded-lg hover:opacity-80' >Next
                    <svg width="24" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2106 18.2928C10.6011 18.6833 11.2343 18.6833 11.6248 18.2928L16.5122 13.4006C17.2926 12.6194 17.2923 11.3536 16.5116 10.5728L11.6212 5.6825C11.2307 5.2919 10.5975 5.2919 10.207 5.6825C9.81643 6.073 9.81643 6.7062 10.207 7.0967L14.3926 11.2823C14.7832 11.6728 14.7831 12.306 14.3926 12.6965L10.2106 16.8786C9.82004 17.2691 9.82004 17.9023 10.2106 18.2928Z" fill="white" />
                    </svg>
                </button>
            </div>

        </div>
    )
}

export default ThirdStep
