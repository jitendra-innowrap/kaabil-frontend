import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProfileModal } from "@/redux/profileSlice";
import Image from "next/image";
import React from "react";

const About = () => {
  const { profileData } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  console.log(profileData, "Verify profileData");
  return (
    <div className="bg-white rounded-lg">
      <div className="grid grid-cols-12 pt-6 py-4 px-12">
        <div className="col-span-10">
          <div className="flex gap-3 items-center">
            <div>
              <Image
                className="cursor-pointer mx-auto size-[70px] 2xl:size-[102px] mb-2"
                src={"/new-assets/icons/avatar.svg"}
                width={500}
                height={500}
                alt="resume-builder"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-[#231F20] text-lg font-medium">
                {profileData?.first_name ?? "-"} {profileData?.last_name}
              </h1>
              <h3 className="text-sm text-[#231F20] font-medium">
                Lead UI/UX Designer at HT Media Labs
              </h3>
              <h5 className="text-[12px] text-[#4D4D4F]">
                {profileData?.city ?? "-"}
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
          <span className="text-sm font-bold text-red">Edit</span>
        </div>
      </div>
      <hr className="border-[#D4D4D4]" />
      <div className="grid grid-cols-12 px-12 pb-2 pt-4">
        <div className="col-span-10">
          <h1 className="text-md text-[#231F20] font-semibold">
            About {profileData?.first_name ?? "-"}
          </h1>
        </div>
        <div className="col-span-2 flex justify-end gap-2 cursor-pointer mt-3">
          <img
            src="/new-assets/icons/ink_marker.svg"
            className="h-3 mt-1"
            alt=""
          />
          <span className="text-sm font-bold text-red">Edit</span>
        </div>
      </div>
      <div className="grid grid-cols-12 px-12 pt-2 pb-8">
        <div className="col-span-12 flex gap-12">
          {/* First Text */}
          <div className="text-sm text-[#4D4D4F] flex flex-col gap-5">
            <h1>Highest Education</h1>
            <h1>Skills</h1>
            <h1>Previous jobs</h1>
            <h1>Strengths</h1>
          </div>
          {/* Second Text */}
          <div className="text-sm flex flex-col gap-5">
            <h1 className="text-[#231F20] font-medium">
              {profileData?.education_name ?? "-"}
            </h1>
            <div className="text-[#717B9E] flex flex-wrap gap-2 text-[12px]">
              {profileData?.skills?.length > 0 ? (
                profileData.skills.map(
                  (skill: { id: string; name: string }) => (
                    <h1
                      key={skill.id}
                      className="bg-[#EEF2FECC] px-2 py-1 rounded-md"
                    >
                      {skill?.name}
                    </h1>
                  )
                )
              ) : (
                <div>"-"</div>
              )}
            </div>

            <h1 className="text-[#231F20] font-medium">Scootsy</h1>
            <h1 className="text-[#231F20] font-medium">
              {profileData?.profile_strength ?? "-"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
