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

interface prop {
  onClose: () => void;
}
export default function OTPInputForm({ size, closePopup, handleBack }: any) {
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
          value?.some((digit) => digit.trim() !== "")
        )
        .test("required-otp", "Please enter all digits", (value) =>
          value?.every((digit) => digit.trim() !== "")
        ),
    }),
    onSubmit: async (values) => {
      const otpValue = values.otp.join(""); // Join OTP digits

      try {
        const response: any = await dispatch(
          verifyOTP({ otp: otpValue, company_id: "", company_offices_id: "" })
        ).unwrap();
        if (response?.code == 1) {
          dispatch(setAuthToken(response?.token));
          dispatch(setUserId(response?.result?.id));
          storeAuthUser({ ...user, id: response?.result?.id });
          dispatch(setUserPhotoUrl(response?.result?.photo_url));
          dispatch(setUserName(response?.result?.name));
          dispatch(
            setUserIsProfileVerified(response?.result?.is_profile_verify)
          );
          if (response?.result?.is_profile_verify == "1") {
            dispatch(setProgress(11));
            closePopup();
            // Here we will close modal Based On Condtion
          } else {
            dispatch(setProgress(3));
            toast.success("Logged In Successfully!", {
              position: "bottom-right",
            });
          }
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
    <Dialog
      open={progress === 2}
      size={size}
      className={`onboarding-dailog ${
        size === "md" ? "fixed -top-8 -translate-x-1/2  onboarding-scale" : ""
      }`}
    >
      {/* @ts-ignore */}
      <DialogHeader>
        <div className="relative w-full">
          <div onClick={handleBack}>
            <FaArrowLeft className="absolute cursor-pointer top-2 z-30 left-2 size-6" />
          </div>

          <IoClose
            className="absolute top-2 right-2 cursor-pointer"
            size={size === "md" ? 32 : 28}
            onClick={closePopup}
          />
          <div
            className={`${
              size === "md"
                ? "flex justify-center items-center mt-8"
                : "flex justify-start items-start mt-16"
            } `}
          >
            <h2
              className={`text-[#231F20] font-semibold ${
                size === "md" ? "!text-[26px]" : "!text-[22px]"
              }`}
            >
              OTP Verification
            </h2>
          </div>
          <div className={`${size === "md" ? "text-center" : "text-start"}`}>
            <p
              className={`font-normal ${
                size === "md" ? "mt-2" : "mt-1"
              } text-[#000000] text-sm`}
            >
              We have sent the code verification to your number
            </p>
          </div>
          {size === "md" && (
            <Image
              src="/new-assets/icons/otp-icon.png"
              alt="OTP verification form"
              width={60}
              height={60}
              className="mx-auto mt-2"
            />
          )}
        </div>
      </DialogHeader>
      <form
        className={`block ${size === "xxl" ? "mt-2" : "mt-10"}`}
        onSubmit={formik.handleSubmit}
      >
        {/* @ts-ignore */}
        <DialogBody className="mt-2 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll p-0 px-5">
          <div className={`${size === "md" ? "px-12" : "px-0"}`}>
            <label
              htmlFor="mobile"
              className="text-[#231F20] mobile-text text-lg md:text-xl 2xl:text-[16px]"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={user?.mobile}
              placeholder="Enter your mobile number to receive OTP"
              readOnly
              required
              className={`text-[#231F20] ${
                user?.mobile ? "font-semibold" : "font-normal"
              }`}
            />
            <div
              className={`flex ${
                size === "xxl" ? "gap-10" : "gap-0"
              } mt-2 xl:mt-[10px] ${
                size === "xxl" ? "justify-start" : "justify-between"
              }`}
            >
              {formik.values.otp.map((digit, index) => (
                <div className="relative" key={index}>
                  <input
                    className="otp-input border border-borderBlue text-center text-lg md:text-xl font-semibold"
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
                  {index < 3 && (
                    <span
                      className={`text-[#98A2B3] ${
                        size === "md" ? "top-4 -right-8" : "top-2 -right-7"
                      }  text-3xl absolute`}
                    >
                      -
                    </span>
                  )}
                </div>
              ))}
            </div>
            {formik.errors.otp && (
              <p className="text-red-500 mt-2">{formik.errors.otp}</p>
            )}
          </div>
        </DialogBody>
        {/* @ts-ignore */}
        <DialogFooter
          className={`p-0 pb-6 mt-5 flex justify-center ${
            size === "md" ? "!px-[66px]" : "px-[20px]"
          }`}
        >
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={`sign-btn ${
              size === "md" ? "text-lg" : "text-md"
            } mt-1 no-margin px-6 py-2 !bg-red hover:bg-red text-white rounded-full ${
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
        </DialogFooter>
      </form>
    </Dialog>
  );
}
