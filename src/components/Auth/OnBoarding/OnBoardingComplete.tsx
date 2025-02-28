import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import Image from 'next/image';
import React, { useState } from 'react'
import { GoDotFill } from 'react-icons/go';
interface prop{
  onClose: () => void;  
}
export default function OnBoardingComplete({onClose}:prop) {
  const progress = useAppSelector((state) => state.progress.value);
     const dispatch = useAppDispatch();
     const [newExperience, setNewExperience] = useState(false)
     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       onClose();
     };

     return (
       <div className=''>
         <h2 className='text-center font-semibold text-lg md:text-xl xl:text-[28px] xl:leading-[38px]'> 
           <span className='text-red'>Congrats!</span> <br />
           Your profile is active    
         </h2>
         <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
           <div className=" p-4 flex-col sm:flex-row rounded-lg border-[1.6px] border-[#E3ECFB] shadow-tertiary justify-start flex sm:gap-4">
            <div className="flex flex-col justify-center items-center">
            <Image src={'/new-assets/icons/avatar.svg'} alt='edit-pencil' aria-label='edit icon' className='w-[75px] h-[75px] mr-1' width={150} height={150}/>
            <button className='!p-0 !rounded-full !text-[11px] !w-[87px] !h-6 !m-2'>Upload Photo</button>
            </div>
              <div className="">
                <h5 className='font-semibold text-black mb-1 text-center sm:text-left'>Shweta Malankar</h5>
                <h5 className='text-black mb-1 font-medium text-center sm:text-left'>Lead UI/UX Designer</h5>
                <h6 className=' text-sm text-[#4D4D4F] mb-2'>HT Media Labs <GoDotFill className='inline-block size-3'/> Full-time</h6>
                <h6 className=' text-sm text-[#4D4D4F]'>Selected job roles:  </h6>
                <h6 className=' text-sm font-medium mb-2 inline mr-2'><GoDotFill className='inline-block size-3'/> 2D Animator</h6>
                <h6 className=' text-sm font-medium mb-2 inline'><GoDotFill className='inline-block size-3'/> 3D Modeler</h6>
                <div className="flex gap-1 text-[#4D4D4F] text-sm mt-2">
                  Skills <span className='size-5 bg-[#F9D1D7] rounded-full text-center'>8</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 my-4">
                <input type="checkbox" name='present' className='!mb-0 !mt-1 cursor-pointer inline-block !w-4 !h-4' id="startDate" onChange={()=>{}}  />
                <label className='!mb-0 inline-block' htmlFor="present">I consent to share my number with the recruiter for connecting with me via
                <Image src={'/new-assets/icons/whatsapp.png'} alt='edit-pencil' aria-label='edit icon' className='w-[89px] h-[20px] inline ml-2' width={100} height={30}/>
                </label>
            </div>
            <button className={`flex-shrink-0 justify-start`} disabled={false} type="submit">
              Next
            </button>
         </form>
       </div>
     );
}
