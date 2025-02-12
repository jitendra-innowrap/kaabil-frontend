'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import React, { useState } from 'react'

export default function MobileInputForm() {
  const progress = useAppSelector((state) => state.progress.value);
    const dispatch = useAppDispatch();
    const [mobile, setMobile] = useState("")
    const handleSubmit =()=>{
      dispatch(setProgress(2));
    }
    const handleChange =(e:any)=>{
      setMobile(e.target.value)
    }
  return (
    <div>
        <h2 className='text-center font-semibold text-lg md:text-xl 2xl:text-[28px] 2xl:leading-[36px]'>Lets start with your mobile number</h2>
        <form onSubmit={handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
            <label htmlFor="mobile">Mobile Number</label>
            <input type="tel" id="mobile" value={mobile} onChange={handleChange} name="mobile" placeholder="Enter your mobile number to receive OTP" />
            <button className={`${mobile?'':'disable'}`} disabled={!mobile} type="submit">
                next
            </button>
        </form>
    </div>
  )
}
