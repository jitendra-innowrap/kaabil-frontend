import { useAppDispatch } from "@/redux/hooks";
import { setEducationModal } from "@/redux/profileSlice";
import React from "react";

const Education = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-white rounded-lg mt-3 px-12 py-6">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex justify-between">
          <div className="flex gap-3 items-center">
            <img src="/new-assets/icons/graduation-cap.svg" />
            <h1 className="text-[#231F20] font-semibold text-md">Education</h1>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              dispatch(setEducationModal(true));
            }}
          >
            <img
              src="/new-assets/icons/ink_marker.svg"
              className="h-3 mt-1"
              alt=""
            />
            <span className="text-sm font-bold text-red">Edit</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 flex gap-14">
          <div>
            <h1 className="text-sm text-[#4D4D4F]">Highest Education</h1>
          </div>
          <div>
            <h1 className="text-sm font-medium text-[#231F20]">Graduate</h1>
          </div>
        </div>
      </div>
      <div className="grid grid-col-12 mt-4">
        <div className="col-span-12">
          <h1 className="text-[#231F20] text-sm">Certification</h1>
        </div>
        <div className="col-span-12 mt-2 flex gap-3">
          <div>
            <img src="/new-assets/icons/certificate.svg" className="h-24" />
            <h1 className="text-xs mt-2 text-[#231F20]">Product Design</h1>
          </div>
          <div>
            <img src="/new-assets/icons/certificate.svg" className="h-24" />
            <h1 className="text-xs mt-2 text-[#231F20]">User Research</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
