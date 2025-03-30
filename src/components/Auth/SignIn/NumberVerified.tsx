import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

export default function NumberVerified({ size, closePopup }: any) {
  const progress: any = useAppSelector((state) => state.progress.value);
  const mobile = useAppSelector((state) => state.user.mobile);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setProgress(4));
  };

  return (
    // @ts-ignore
    <Dialog
      open={progress === 3}
      size={size}
      className={`onboarding-dailog ${
        size === "md" ? "fixed -top-8 -translate-x-1/2  onboarding-scale" : ""
      }`}
    >
      <div className="pb-6">
        {/* @ts-ignore */}
        <DialogHeader>
          <div className="relative w-full">
            <IoClose
              className="absolute top-2 right-2 cursor-pointer"
              size={size === "md" ? 32 : 28}
              onClick={closePopup}
            />
            <div
              className={`${
                size === "md"
                  ? "flex justify-center items-center mt-6"
                  : "flex justify-start items-start mt-16"
              } `}
            >
              <h2
                className={`text-[#231F20] font-semibold ${
                  size === "md" ? "!text-[26px]" : "!text-[22px]"
                }`}
              >
                Number Verified
              </h2>
            </div>
            {size === "md" && (
              <Image
                src={"/new-assets/icons/number-verified.png"}
                width={100}
                height={100}
                className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mt-2"
                alt="number-verified"
              />
            )}
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="block mt-6">
          {/* @ts-ignore */}
          <DialogBody className="mt-2 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll p-0 px-5">
            <div className={`${size === "md" ? "px-12" : "px-0"}`}>
              <label htmlFor="mobile" className="text-[#231F20] mobile-text">
                Mobile Number
              </label>
              <div className="form-group relative">
                <Image
                  src={"/new-assets/icons/number-verified.png"}
                  width={100}
                  height={100}
                  className="w-8 h-8 absolute right-3 top-3"
                  alt="number-verified"
                />
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  disabled
                  name="mobile"
                  placeholder="Enter your mobile number to receive OTP"
                  className="font-semibold"
                />
              </div>
            </div>
          </DialogBody>
          {/* @ts-ignore */}
          <DialogFooter className={`p-0 pb-6  flex justify-center ${size === "md" ? "!px-[66px]" : "px-[20px]"}`} >
            <div className="mt-4 w-full">
              <button
                className={`${
                  size === "md" ? "text-lg" : "text-md"
                } mt-1 no-margin px-6 py-2 !bg-red hover:bg-red text-white rounded-full`}
                disabled={!mobile}
                type="submit"
              >
                next
              </button>
            </div>
          </DialogFooter>
        </form>
      </div>
    </Dialog>
  );
}
