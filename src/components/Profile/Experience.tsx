import React from "react";
import { experiences, formatJobDates } from "../utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setExperienceModal } from "@/redux/profileSlice";

const Experience = () => {
  const { profileData } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const getInitials = (companyName: any) => {
    if (!companyName) return "-";
    const words = companyName.split(" ");
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };

  return (
    <div className="profile-card bg-white rounded-lg mt-3 p-[16px] sm:p-[20px] lg:px-12 py-6">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex justify-between">
          <div className="flex gap-3 items-center">
            <img src="/new-assets/icons/briefcase-exprience.svg" />
            <h1 className="text-[#231F20] font-semibold text-[14px] sm:text-md">
              Experience
            </h1>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              dispatch(setExperienceModal(true));
            }}
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
      </div>
      <div className="grid grid-cols-12 pr-2 mt-5 gap-3">
        {profileData?.user_experiences?.length > 0 ? (
          profileData.user_experiences.map((exp: any, index: any) => (
            <div
              key={index}
              className="col-span-12 bg-white p-3 rounded-lg shadow-md light-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Image Section */}
                <div className="w-14 h-14 rounded-md overflow-hidden flex items-center justify-center bg-gray-200 text-gray-700 font-bold text-lg">
                  {exp?.company_logo ? (
                    <img
                      src={exp.company_logo}
                      alt={`${exp.company_name ?? "Company"} icon`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span>{getInitials(exp.company_name)}</span>
                  )}
                </div>
                {/* Text Section */}
                <div>
                  <h1 className="text-sm text-[#231F20] font-medium">
                    {exp?.designation || "-"}
                  </h1>
                  <h1 className="text-xs text-[#231F20]">
                    {exp?.company_name || "-"}
                  </h1>
                  <h1 className="text-xs text-[#231F20] flex items-center gap-2">
                    {exp?.job_type || "-"}{" "}
                    <span className="text-2xl">
                      <img src="/new-assets/icons/dot.svg" alt="Dot" />
                    </span>{" "}
                    {formatJobDates(exp?.job_start_date, exp?.job_end_date)}
                  </h1>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12 text-[#231F20] text-md font-medium">
            {profileData?.is_fresher == 0 ? "" : "Fresher"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
