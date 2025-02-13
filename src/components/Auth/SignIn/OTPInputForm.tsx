'use client'
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

export default function OTPInputForm() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const progress = useAppSelector((state) => state.progress.value); // Access progress state
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
  return (
    <div>
        <h2 className='text-center font-semibold text-lg md:text-xl 2xl:text-[28px] 2xl:leading-[36px]'>OTP Verification</h2>
        <p className='text-center mt-2'>We have sent the code verification to your number</p>
        <Image
        src="/new-assets/icons/otp-notification.png"
        alt="OTP verification form"
        width={60}
        className='mx-auto mt-5'
        height={60}
        />
        <form className="block mt-8 md:mt-10 ">
            <label htmlFor="mobile">Mobile Number</label>
            <input type="tel" id="mobile" name="mobile" placeholder="Enter your mobile number to receive OTP" required />
            <div className="flex gap-5 md:gap-8 xl:gap-10 mt-2 xl:mt-[10px] justify-center">
                {otp.map((digit, index) => (
                <input
                    key={index}
                    className="border border-borderBlue text-center p-2.5 h-10 md:h-16 2xl:h-20 text-lg md:text-xl font-semibold "
                    name={`otp${index}`}
                    type="tel"
                    maxLength={1}
                    autoComplete="off"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(ref) => { inputRefs.current[index] = ref; }}                   
                    />
                ))}
            </div>
            <button className='disable' type="submit">
                next
            </button>
        </form>
    </div>
  )
}
