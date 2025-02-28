import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import React, { useState } from 'react'
import AddExperienceForm from './AddExperienceForm';

export default function AddExperience() {
  const progress = useAppSelector((state) => state.progress.value);
  const dispatch = useAppDispatch();
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setProgress(9));
  };

  

  return (
    <div className=''>
      <h2 className='text-center font-semibold text-lg md:text-xl xl:text-[28px] 2xl:leading-[38px]'>
      You’re almost there! Add<br /> your 
      <span className='text-red'> experience </span>

      </h2>
      <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
        <h4 className='text-lg font-medium'>What’s your level of experience?</h4>
        <div className="my-4 flex flex-col sm:flex-row gap-4">
          <div className="form-group flex-1 gap-4 rounded-lg px-5 py-4 shadow-default flex items-center">
            <input type="radio" id="experience1" name="experience" className='cursor-pointer inline-block !m-0 !w-4 !h-4' value="entry" />
            <label htmlFor="experience1" className="!mb-0 gap-2 inline-block cursor-pointer">
              Entry Level
            </label>
          </div>
          <div className="form-group flex-1 gap-4 rounded-lg px-5 py-4 shadow-default flex items-center">
          <input type="radio" id="experience2" name="experience" className='cursor-pointer inline-block !m-0 !w-4 !h-4' value="intermediate" />
            <label htmlFor="experience2" className="!mb-0 gap-2 inline-block cursor-pointer">
              Intermediate
            </label>
          </div>
        </div>
        <h4 className='text-lg mb-4 font-medium'>Please add your latest experience</h4>
        <AddExperienceForm/>
        <div className="flex text-red font-semibold mt-7 cursor-pointer" onClick={handleSubmit}>+ add more experience</div>
        <div className="flex w-full items-end">
          <div className="whitespace-nowrap"><span className='text-red'>{progress-4}</span> - 6</div>
          <div className="flex gap-4 items-end w-full justify-end">
          <span onClick={()=>{dispatch(setProgress(10))}} className={`max-w-[130px] cursor-pointer hover:border-gray-400 flex items-center btn-border h-[56px]`}>
            Skip
          </span>
          <button className={` max-w-[100px] sm:max-w-[250px] flex-shrink-0 justify-start`} disabled={false} type="submit">
            Next
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}
