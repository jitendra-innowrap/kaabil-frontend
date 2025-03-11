import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import React, { useState } from 'react'
import { GoDotFill } from 'react-icons/go';
import AddExperienceForm from './AddExperienceForm';
import Image from 'next/image';

export default function AddMoreExperience() {
 const progress = useAppSelector((state) => state.progress.value);
   const dispatch = useAppDispatch();
   const [newExperience, setNewExperience] = useState(false)
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     dispatch(setProgress(11));
   };
 
   
 
   return (
     <div className=''>
       <h2 className='text-center font-semibold text-lg md:text-xl xl:text-[28px] 2xl:leading-[38px]'>
       Your 
         <span className='text-red'>experience </span>
 
       </h2>
       <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
         <h4 className='text-lg font-medium'>Please add all your experience</h4>
         <div className="my-4 p-4 rounded-lg shadow-default justify-between flex gap-4">
           <div className="">
             <h5 className='font-medium text-black mb-2'>Lead UI/UX Designer</h5>
             <h6 className=' text-sm mb-2'>HT Media Labs <GoDotFill className='inline-block size-2'/> Full-time</h6>
             <h6 className=' text-sm mb-2'>May 2020 - Present <GoDotFill className='inline-block size-2'/> 4 yrs</h6>
           </div>
           <div className="flex items-center h-fit cursor-pointer">
            <Image src={'/new-assets/icons/pencil.png'} alt='edit-pencil' aria-label='edit icon' className='w-3 h-3 mr-1' width={90} height={90}/>
            <span className='text-red text-sm font-semibold'>Edit</span>
           </div>
         </div>
         
         {newExperience && <AddExperienceForm/>}
         <div className="flex text-red font-semibold mt-7 cursor-pointer" onClick={()=>(setNewExperience(true))}>+ add more experience</div>
         <div className="flex w-full items-end">
           <div className="whitespace-nowrap"><span className='text-red'>{progress-4}</span> - 6</div>
           <div className="flex gap-4 items-end w-full justify-end">
          <span onClick={()=>{dispatch(setProgress(10))}} className={`max-w-[130px] cursor-pointer hover:border-gray-400 flex items-center btn-border h-[56px]`}>
             Skip
           </span>
           <button className={`max-w-[100px] sm:max-w-[250px] flex-shrink-0 justify-start`} disabled={false} type="submit">
             Next
           </button>
           </div>
         </div>
       </form>
     </div>
   );
}
