'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

export default function OTPInputForm() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const progress = useAppSelector((state) => state.progress.value); 
    const user = useAppSelector((state) => state.user);
    const [timer, setTimer] = useState(60); // Timer for 1 minute
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if(progress==2){
          inputRefs.current[0]?.focus();
        }
      }, [progress])
      useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
    
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
    
        return () => {
            if (interval) clearInterval(interval);
        };
      }, [timer]);
    
      useEffect(() => {
    
        return () => {
          setTimer(0)
        }
      }, [progress])
      
      const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        if (value && index < 3) {
          inputRefs.current[index + 1]?.focus();
        }
      };
    
      const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && !otp[index]) {
          inputRefs.current[index - 1]?.focus();
        }
      };
      const dispatch = useAppDispatch();
      
      const handleSubmit =()=>{
        dispatch(setProgress(3))
      }
  return (
    <div>
        <h2 className='text-center font-semibold text-lg md:text-xl 2xl:text-[28px] 2xl:leading-[36px]'>OTP Verification</h2>
        <p className='text-center mt-2'>We have sent the code verification to your number</p>
        <Image
        src="/new-assets/icons/otp-icon.png"
        alt="OTP verification form"
        width={60}
        className='mx-auto mt-5'
        height={60}
        />
        <form className="block mt-8 md:mt-10" onSubmit={handleSubmit}>
            <label htmlFor="mobile">Mobile Number</label>
            <input type="tel" id="mobile" name="mobile" value={user?.number} placeholder="Enter your mobile number to receive OTP" required />
            <div className="flex gap-6 sm:gap-10 mt-2 xl:mt-[10px] justify-between">
                {otp.map((digit, index) => (
                <div className="relative">
                  <input
                    key={index}
                    className="otp-input w-full border border-borderBlue text-center text-lg md:text-xl font-semibold "
                    name={`otp${index}`}
                    type="tel"
                    maxLength={1}
                    autoComplete="off"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(ref) => { inputRefs.current[index] = ref; }}                   
                    />
                    {index<3 && <span className='text-[#98A2B3] top-3 -right-5 sm:-right-7 text-3xl absolute'>-</span>}
                </div>
                ))}
            </div>
            <button className={``} type="submit">
                next
            </button>
        </form>
    </div>
  )
}
