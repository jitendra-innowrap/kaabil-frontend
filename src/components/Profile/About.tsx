import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProfileModal } from "@/redux/profileSlice";
import Image from "next/image";
import React from "react";

const About = () => {
  const { profileData } = useAppSelector((state) => state.profile);
  const { email, isEmailVerified } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className="profile-card bg-white shadow-sm sm:shadow-default rounded-xl sm:rounded-lg">
      <div className="grid grid-cols-12 sm:pt-6 py-4 p-[16px] sm:p-[20px] lg:px-12">
        <div className="col-span-10">
          <div className="flex gap-3 items-center">
            <div className="hidden md:block">
              <Image
                className="cursor-pointer size-[70px] 2xl:size-[102px] object-cover mb-2 rounded-full"
                src={
                  profileData?.photo_url
                    ? profileData?.photo_url
                    : "/new-assets/icons/avatar.svg"
                }
                width={102}
                height={102}
                alt="resume-builder"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-[#231F20] text-lg font-medium">
                {profileData?.name ?? ""}
              </h1>
              <h3 className="text-sm text-[#231F20] font-medium">
                {profileData?.job_type
                  ? profileData.company_name
                    ? `${profileData.job_type} ${
                        profileData.designation ?? ""
                      } at ${profileData.company_name}`
                    : `${profileData.job_type} ${profileData.designation ?? ""}`
                  : ""}
              </h3>

              <h5 className="text-[12px] text-[#4D4D4F]">
                {profileData?.city ?? ""}
              </h5>
            </div>
          </div>
        </div>
        <div
          className="col-span-2 flex justify-end gap-2 cursor-pointer"
          onClick={() => dispatch(setProfileModal(true))}
        >
          <img
            src="/new-assets/icons/ink_marker.svg"
            className="h-3 mt-1"
            alt=""
          />
          <span className="text-[13px] sm:text-sm font-bold text-red">
            Edit
          </span>
        </div>
      </div>
      <hr className="border-[#D4D4D4]" />
      <div className="grid grid-cols-12 p-[16px] sm:p-[20px] lg:px-12 pb-2 pt-4">
        <div className="col-span-10">
          <h1 className="text-[14px] sm:text-md text-[#231F20] font-semibold">
            About {profileData?.first_name ?? ""}
          </h1>
        </div>
        <div
          className="col-span-2 flex justify-end gap-2 cursor-pointer sm:mt-3"
          onClick={() => dispatch(setProfileModal(true))}
        >
          <img
            src="/new-assets/icons/ink_marker.svg"
            className="h-3 mt-1"
            alt=""
          />
          <span className="text-[13px] sm:text-sm font-bold text-red">
            Edit
          </span>
        </div>
      </div>
      <div className="p-[16px] sm:p-[20px] lg:px-12 pb-8">
        <div className="grid grid-cols-12 gap-y-4">
          {/* Email */}
          <div className="col-span-4 flex items-center">
            <h1 className="text-sm text-[#4D4D4F]">Email</h1>
          </div>
          <div className="col-span-8">
            <h1 className="text-sm text-[#231F20] font-medium">
              {isEmailVerified? email : "-"}
            </h1>
          </div>
          {/* Highest Education */}
          <div className="col-span-4 flex items-center">
            <h1 className="text-sm text-[#4D4D4F]">Highest Education</h1>
          </div>
          <div className="col-span-8">
            <h1 className="text-sm text-[#231F20] font-medium">
              {profileData?.education_name ?? ""}
            </h1>
          </div>

          {/* Skills */}
          <div className="col-span-4 flex items-center">
            <h1 className="text-sm text-[#4D4D4F]">Skills</h1>
          </div>
          <div className="col-span-8">
            <div className="flex flex-wrap gap-3 text-[12px] text-[#717B9E]">
              {profileData?.skills?.length > 0 ? (
                profileData.skills.map(
                  (skill: { id: string; name: string }) => (
                    <span
                      key={skill.id}
                      className="bg-[#EEF2FECC] px-2 py-1 rounded-md shadow-sm"
                    >
                      {skill.name}
                    </span>
                  )
                )
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {/* Previous Jobs */}
          <div className="col-span-4 flex items-center">
            <h1 className="text-sm text-[#4D4D4F]">Previous Jobs</h1>
          </div>
          <div className="col-span-8">
            <h1 className="text-sm text-[#231F20] font-medium">
              {profileData?.company_name ?? ""}
            </h1>
          </div>
          <div className="col-span-4 flex items-center">
            <h1 className="text-sm text-[#4D4D4F]">Strengths</h1>
          </div>
          <div className="col-span-8">
            <h1 className="text-sm text-[#231F20] font-medium">
              {profileData?.soft_skills?.length > 0
                ? profileData.soft_skills
                    .map((skill: { name: string }) => skill.name)
                    .join(", ")
                : ""}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
