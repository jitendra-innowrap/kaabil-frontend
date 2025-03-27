'use client'
import { openLoginDialog } from '@/redux/loginDialogSlice';
import { setProgress } from '@/redux/progressSlice';
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function RegisterInMinutes() {
  const dispatch = useDispatch();
  const handlelogin =()=>{
          dispatch(setProgress(1))
          dispatch(openLoginDialog());
          const button = document.getElementById('sign-in-button');
          if (button) {
            button.click(); // Programmatically triggers the button click
          }
          return
  }
  return (<>
        <div className="hidden lg:flex bg-[#F9D1D7] justify-between rounded-2xl px-4 3xl:px-6 py-3 3xl:py-5">
                <div className="block">
                    <h3 className="text-lg leading-5 3xl:text-2xl 3xl:leading-7 font-medium">It only takes a minute to register</h3>
                    <p className='text-xs 3xl:text-base 3xl:leading-5'>Start your career journey today!</p>
                    <button onClick={handlelogin} className="mt-3 md:mt-4 text-xs 3xl:text-sm">Register to Apply jobs</button>
                </div>
                <Image
                    className="cursor-pointer w-[100px] 3xl:w-[157px] h-[100px] sm:h-auto"
                    src={'/new-assets/images/nudges/listing/timer.png'}
                    width={287}
                    height={253}
                    alt="resume-builder"
                    /> 
            </div>
            <div className="block lg:hidden w-full">
              <Image
                className="cursor-pointer w-full h-auto"
                src={'/new-assets/nudges/complete/register-in-minutes.svg'}
                width={287}
                height={253}
                alt="resume-builder"
                />
            </div>
  </>
  )
}
