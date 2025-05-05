import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAboutMeModal } from "@/redux/profileSlice";
import { Field } from "formik";
import React from "react";

const AboutMe = () => {
  const { profileData } = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();
  return (
    <div className="profile-card bg-white shadow-sm sm:shadow-default rounded-xl sm:rounded-lg mt-3 p-[16px] sm:p-[20px] lg:px-12 py-6">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex justify-between">
          <div className="flex gap-3 items-center">
            <h1 className="text-[#231F20] font-semibold text-[14px] sm:text-md">
              About Me
            </h1>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => dispatch(setAboutMeModal(true))}
          >
            <img
              src="/new-assets/icons/ink_marker.svg"
              className="h-3"
              alt=""
            />
            <span className="text-[13px] sm:text-sm font-bold text-red">
              Edit
            </span>
          </div>
        </div>
        <div className="col-span-12 mt-4 pr-4">
          <textarea
            rows={4}
            value={profileData?.bio_text}
            disabled
            placeholder="Enter about me"
            className="w-full text-[12px] sm:text-md pt-4 bg-[#F2F3F3] pl-4 focus:outline-none rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
