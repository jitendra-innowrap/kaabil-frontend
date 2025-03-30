import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setResumeModal } from "@/redux/profileSlice";
import React, { useState } from "react";

const Resume = () => {
  const dispatch = useAppDispatch();
  const { profileData } = useAppSelector((state) => state.profile);
  const [fileName, setFileName] = useState("");

  const handleFileClick = () => {
    // Simulate file selection and update the file name
    setFileName("sample_resume.pdf");
  };

  return (
    <div className="profile-card bg-white rounded-lg mt-3 p-[16px] sm:p-[20px] lg:px-12 py-6">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex justify-between">
          <div className="flex gap-3 items-center">
            <img src="/new-assets/icons/resume.svg" alt="Resume Icon" />
            <h1 className="text-[#231F20] font-semibold text-[14px] sm:text-md">Resume</h1>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => dispatch(setResumeModal(true))}
          >
            <img
              src="/new-assets/icons/ink_marker.svg"
              className="h-3 mt-1"
              alt=""
            />
            <span className="text-[13px] sm:text-sm font-bold text-red">Edit</span>
          </div>
        </div>
        <div className="col-span-12 mt-4">
          <div className="flex flex-col gap-4">
            {profileData?.user_portfolio &&
            profileData.user_portfolio.length > 0 ? (
              profileData.user_portfolio.map((item: any, index: number) => (
                <div
                  key={index}
                  className="relative flex items-center w-full p-2 bg-white border border-[#4D4D4F66] rounded-lg cursor-pointer"
                  onClick={() => window.open(item.file, "_blank")}
                >
                  {/* File Name Display */}
                  <div className="flex-grow text-[12px] sm:text-sm text-gray-700 px-3">
                    {item?.file_name || "No file chosen"}
                  </div>
                  {/* Icon */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-500">
                    <img
                      src="/new-assets/icons/attach_file.svg"
                      alt="Attach File Icon"
                    />
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
