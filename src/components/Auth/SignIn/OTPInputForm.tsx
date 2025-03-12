'use client'
import { resendOTP, verifyOTP } from '@/redux/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { getAuthUser, storeAuthToken, storeAuthUser, storeProgress } from '@/components/utils/deviceId';

export default function OTPInputForm() {
  const progress = useAppSelector((state) => state.progress.value);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState(60); // Countdown timer for OTP resend
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (progress === 2) {
      inputRefs.current[0]?.focus();
    }
  }, [progress]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Formik for OTP input handling
  const formik = useFormik({
    initialValues: { otp: ['', '', '', ''] },
    validationSchema: Yup.object({
      otp: Yup.array()
      .test('complete-otp', 'Mobile otp is required', (value) =>
        value?.some((digit) => digit.trim() !== '')
      ).test('required-otp', 'Please enter all digits', (value) =>
        value?.every((digit) => digit.trim() !== '')
      ),
    }),
    onSubmit: async (values) => {
      const otpValue = values.otp.join(''); // Join OTP digits
  
      try {
        const response: any = await dispatch(verifyOTP({ otp: otpValue, company_id: "", company_offices_id: "" })).unwrap();
        console.log(response);
        if (response?.code == 1) {
          storeAuthToken(response?.token);
          storeAuthUser(response?.result);
          dispatch(setProgress(3));
          storeProgress(3)
          toast.success("Logged In Successfully!", { position: "bottom-right" });
        } else {
          throw new Error("Invalid OTP");
        }
      } catch (error: any) {
        console.error("OTP Verification Failed:", error);
        toast.error(error?.message || "Invalid OTP, please try again!", { position: "bottom-right" });
      }
    },
  });
  

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...formik.values.otp];
      newOtp[index] = value;
      formik.setFieldValue("otp", newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && index > 0 && !formik.values.otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async (event: React.FormEvent) => {
    if(isResending || timer > 0){
      return;
    }
    try {
      setIsResending(true);
      // formData.append('email', formik.values.email);
      // Call the API to register the user
      const response:any = await dispatch(resendOTP())
        if (response?.payload?.code == 1) {
        toast.success(`OTP resent successfully!`, {
          position: "bottom-right",
        })
        // Start the timer countdown
        setTimer(60);
      }else{
        toast.error(`Something Went Wrong, Try Again!`, {
          position: "bottom-right",
        })
      }
    } catch (err: any) {
      console.error('Registration Error:', err);
      toast.error(err.data.message || 'An error occurred, Try again later!', {
        position: "bottom-right"
      })
    } finally {
      setIsResending(false);
    }
  };

  const [isResending, setIsResending] = useState(false);

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
    setTimer(60)
  }
}, [])

  return (
    <div>
      <h2 className='text-center font-semibold text-lg md:text-xl 2xl:text-[28px] 2xl:leading-[36px]'>
        OTP Verification
      </h2>
      <p className='text-center mt-2'>We have sent a verification code to your number</p>
      <Image
        src="/new-assets/icons/otp-icon.png"
        alt="OTP verification form"
        width={60}
        height={60}
        className='mx-auto mt-5'
      />
      <form className="block mt-8 md:mt-10" onSubmit={formik.handleSubmit}>
        <label htmlFor="mobile">Mobile Number</label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={user?.mobile}
          placeholder="Enter your mobile number to receive OTP"
          readOnly
          required
        />
        <div className="flex gap-6 sm:gap-10 mt-2 xl:mt-[10px] justify-between">
          {formik.values.otp.map((digit, index) => (
            <div className="relative" key={index}>
              <input
                className="otp-input w-full border border-borderBlue text-center text-lg md:text-xl font-semibold"
                name={`otp${index}`}
                type="tel"
                maxLength={1}
                autoComplete="off"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(ref) => { inputRefs.current[index] = ref; }}
              />
              {index < 3 && <span className='text-[#98A2B3] top-3 -right-5 sm:-right-7 text-3xl absolute'>-</span>}
            </div>
          ))}
        </div>
        {formik.errors.otp && <p className="text-red-500 mt-2">{formik.errors.otp}</p>}
        <button className={`mt-4 ${formik.isValid ? '' : 'opacity-50 cursor-not-allowed'}`} type="submit" disabled={!formik.isValid}>
          Next
        </button>
        <p className='mt-4 2xl:mt-5 text-center'>Didn’t receive code? 
          <span tabIndex={0} onClick={handleResendOtp} className={`font-medium text-red ml-1 cursor-pointer ${isResending || timer > 0? 'opacity-50':''}`}
            >
                {isResending || timer > 0 ? `Resend OTP (${timer}s)` : 'Resend OTP'}
          </span>
        </p>
      </form>
    </div>
  );
}
