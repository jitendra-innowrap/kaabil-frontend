import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import styles from "./signIn.module.css";


export default function NumberVerified({ size, closePopup }: any) {
  const progress: any = useAppSelector((state) => state.progress.value);
  const mobile = useAppSelector((state) => state.user.mobile);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setProgress(4));
  };

  return (
    <div className="pb-6 sm:max-w-[528px] sm:mx-auto">
        {/* @ts-ignore */}
        <div>
          <div className="relative w-full">
            <IoClose
              className="absolute top-2 right-2 cursor-pointer"
              size={size === "md" ? 32 : 28}
              onClick={closePopup}
            />
            <div
              className={`flex sm:justify-center items-center pt-[74px] sm:mt-5 sm:pt-0`}
            >
              <h2
                className={`text-[#231F20] font-semibold ${
                  size === "md" ? "!text-[28px]" : "!text-[20px]"
                }`}
              >
                Number Verified
              </h2>
            </div>
            <Image
                src={"/new-assets/icons/number-verified.png"}
                width={100}
                height={100}
                className="hidden sm:block w-16 h-16 lg:w-20 lg:h-20 mx-auto mt-2"
                alt="number-verified"
              />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="block mt-6">
          {/* @ts-ignore */}
          <div className="mt-2">
            <label htmlFor="mobile" className="text-[#231F20] mb-[8px] sm:mb-[10px] text-[14px] sm:text-lg md:text-xl 2xl:text-[16px] block">
              Mobile Number
            </label>
            <div className="form-group relative">
              <Image
                  src={"/new-assets/icons/number-verified.png"}
                  width={100}
                  height={100}
                  className="w-8 h-8 absolute right-3 top-[7px] sm:top-3"
                  alt="number-verified"
              />
              <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  disabled
                  name="mobile"
                  placeholder="Enter your mobile number to receive OTP"
                  className={`form-control ${styles.onboarding_dialog_input} border px-3 py-2 w-full rounded-[8px] sm:rounded-[12px] text-[#231F20]`}
              />
            </div>
          </div>
          {/* @ts-ignore */}
          <div className={`p-0 pb-6  flex justify-center`} >
            <div className="mt-4 w-full">
              <button
                className={`${styles.onboarding_dialog_btn} w-full ${
                  size === "md" ? "text-lg" : "text-md"
                } mt-1 no-margin !bg-red hover:bg-red text-white`}
                disabled={!mobile}
                type="submit"
              >
                next
              </button>
            </div>
          </div>
        </form>
      </div>
  );
}
