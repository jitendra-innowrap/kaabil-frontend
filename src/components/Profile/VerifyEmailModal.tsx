"use client";
import { resendOTP, verifyOTP } from "@/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import {
  getAuthUser,
  storeAuthToken,
  storeAuthUser,
  storeProgress,
} from "@/components/utils/deviceId";
import {
  setAuthToken,
  setSaveEmail,
  setUserId,
  setUserIsProfileVerified,
  setUserName,
  setUserPhotoUrl,
} from "@/redux/userSlice";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import useCleverTap from "@/hooks/useCleverTap";

interface prop {
  onClose: () => void;
  email: string
}
export default function VerifyEmailModal({ email, onClose }: prop) {
  const progress = useAppSelector((state) => state.progress.value);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState(60); // Countdown timer for OTP resend
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (progress === 2) {
      inputRefs.current[0]?.focus();
    }
    if (progress === 2) setTimer(60);
  }, [progress]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer;
          }
          return 0;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Formik for OTP input handling
  const formik = useFormik({
    initialValues: { otp: ["", "", "", ""] },
    validationSchema: Yup.object({
      otp: Yup.array()
        .test("complete-otp", "Mobile otp is required", (value) =>
          value?.some((digit) => digit?.trim() !== "")
        )
        .test("required-otp", "Please enter all digits", (value) =>
          value?.every((digit) => digit?.trim() !== "")
        ),
    }),
    onSubmit: async (values) => {
      const otpValue = values.otp.join(""); // Join OTP digits

      try {
        const response: any = await dispatch(
          verifyOTP({ otp: otpValue, company_id: "", company_offices_id: "" })
        ).unwrap();
        if (response?.code == 1) {
            dispatch(setSaveEmail(email));
            toast.success("Email verified Successfully!", {
            position: "bottom-right",
            });
            onClose();
        } else {
          throw new Error("Invalid OTP");
        }
      } catch (error: any) {
        console.error("OTP Verification Failed:", error);
        toast.error(error?.message || "Invalid OTP, please try again!", {
          position: "bottom-right",
        });
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
  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0 && !formik.values.otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async (event: React.FormEvent) => {
    if (isResending || timer > 0) {
      return;
    }
    try {
      setIsResending(true);
      // formData.append('email', formik.values.email);
      // Call the API to register the user
      const response: any = await dispatch(resendOTP());
      if (response?.payload?.code == 1) {
        toast.success(`OTP resent successfully!`, {
          position: "bottom-right",
        });
        // Start the timer countdown
        setTimer(60);
      } else {
        toast.error(`Something Went Wrong, Try Again!`, {
          position: "bottom-right",
        });
      }
    } catch (err: any) {
      console.error("Registration Error:", err);
      toast.error(err.data.message || "An error occurred, Try again later!", {
        position: "bottom-right",
      });
    } finally {
      setIsResending(false);
    }
  };

  const [isResending, setIsResending] = useState(false);

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

  useEffect(() => {
    return () => {
      setTimer(60);
    };
  }, []);

  return (
    // @ts-ignore
    <div className="px-10">
      <div className="relative w-full mb-[28px] sm:mb-0">
        <IoClose
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        />
        <div
          className={`flex sm:justify-center items-center pt-[74px] sm:mt-5 sm:pt-0`}
        >
          <h2
            className={`text-[#231F20] font-semibold text-[20px] sm:text-[28px]`}
          >
            OTP Verification
          </h2>
        </div>
        <div className={"text-center"}>
          <p
            className={`font-normal text-[14px] mt-1 text-[#000000] text-sm`}
          >
            We have sent the verification code to your Email Address
          </p>
        </div>
        <Image
          src="/new-assets/icons/otp-icon.png"
          alt="OTP verification form"
          width={60}
          height={60}
          className="hidden sm:block mx-auto mt-2"
        />
      </div>
      <form
        className={`block mt-2  xl:mt-10`}
        onSubmit={formik.handleSubmit}
      >
        {/* @ts-ignore */}
        <div className="">
          <div className={`max-w-[528px] mx-auto`}>
            <label
              htmlFor="mobile"
              className="text-[#231F20] mb-[8px] sm:mb-[10px] text-[14px] sm:text-lg md:text-xl 2xl:text-[16px] block"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              readOnly
              required
              className={` border px-3 py-2 w-full rounded-[8px] sm:rounded-[12px] text-[#231F20] ${
                user?.mobile ? "font-semibold" : "font-normal"
              }`}
            />
            <div
              className={`flex items-center gap-2 sm:gap-4 justify-center  mt-2 xl:mt-[10px]`}
            >
              {formik.values.otp.map((digit, index) => (
                <>
                  <div className={`relative`} key={index}>
                    <input
                      className={`border border-borderBlue text-center text-lg md:text-xl font-semibold`}
                      name={`otp${index}`}
                      type="tel"
                      maxLength={1}
                      autoComplete="off"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                    />
                  </div>
                  {index < 3 && <span className={`text-[#98A2B3]`}>-</span>}
                </>
              ))}
            </div>
            {formik.errors.otp && (
              <p className="text-red-500 mt-2">{formik.errors.otp}</p>
            )}
          </div>
        </div>
        {/* @ts-ignore */}
        <div
          className={`sm:max-w-[528px] mx-auto p-0 pb-6 mt-5 sm:flex sm:flex-col justify-center sm:mb-4`}
        >
          <button
            type="submit"
            style={{width:"100% !important"}}
            disabled={!formik.isValid || formik.isSubmitting}
            className={`w-full text-base xl:text-lg mt-1 no-margin px-6 py-2 !bg-red hover:bg-red text-white ${
              !formik.isValid || formik.isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Verify
          </button>
          <div>
            <p className="mt-4 2xl:mt-5 text-[14px] sm:text-[16px] text-center text-[#000000]">
              Didn’t receive code?
              <span
                tabIndex={0}
                onClick={handleResendOtp}
                className={`font-medium text-red ml-1  cursor-pointer ${
                  isResending || timer > 0 ? "opacity-50" : ""
                }`}
              >
                {isResending || timer > 0
                  ? `Resend OTP (${timer}s)`
                  : "Resend OTP"}
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
