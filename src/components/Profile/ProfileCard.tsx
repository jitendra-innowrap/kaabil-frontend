import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React from "react";
import { formatJobDates } from "../utils";
import { useRouter } from "next/navigation";
import { setSelectedTab } from "@/redux/jobsFilterSlice";
import { setProfileModal } from "@/redux/profileSlice";

const ProfileCard = () => {
  const router = useRouter();
  const { profileData, appliedJobs, shortListedJobs, savedJobs } =
    useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const jobStats = [
    {
      label: "Applied Jobs",
      count: appliedJobs,
      tabIndex: 1,
    },
    {
      label: "Shortlisted Jobs",
      count: shortListedJobs,
      tabIndex: 2,
    },
    { label: "Saved Jobs", count: savedJobs, tabIndex: 3 },
  ];

  return (
    <div className="bg-white rounded-2xl py-3 sticky  mt-4 md:top-20 lg:top-16 3xl:top-[100px] md:mt-[84px]">
      <div className="grid grid-col-12">
        <div className="col-span-12">
          <Image
            className="cursor-pointer mx-auto size-[70px] 2xl:size-[102px] mb-2 rounded-full object-cover border-4 border-red"
            src={
              profileData?.photo_url
                ? profileData?.photo_url
                : "/new-assets/icons/avatar.svg"
            }
            width={287}
            height={253}
            alt="resume-builder"
          />
        </div>
        <div className="col-span-12">
          <h1 className="text-xl text-center font-medium text-[#231F20]">
            {profileData?.name ?? ""}
          </h1>
        </div>
        <div className="col-span-12">
          <h1 className="text-xs text-center text-[#4D4D4F]">
            {profileData?.city ?? ""}
          </h1>
        </div>
        <div className="col-span-12 mt-2">
          <h1 className="text-sm text-center">
            {profileData?.company_name} -{" "}
            {profileData?.user_experiences?.[0]?.job_start_date &&
            profileData?.user_experiences?.[0]?.job_end_date
              ? formatJobDates(
                  profileData.user_experiences[0].job_start_date,
                  profileData.user_experiences[0].job_end_date
                )
              : ""}
          </h1>
        </div>
        <div className="col-span-12 mt-2">
          {profileData?.skills && profileData.skills.length > 0 && (
            <div className="text-[#717B9E] flex flex-wrap justify-center gap-3 text-[12px] md:text-[8px] lg:text-[9px] xl:text-[12px]">
              {profileData.skills.map((skill: any, index: number) => (
                <h1 key={index} className="bg-[#EEF2FECC] px-2 py-1 rounded-md">
                  {skill?.name}
                </h1>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-12 flex justify-center items-center px-6 gap-2 mt-4">
          <div className="w-full h-[6px] 2xl:h-2 rounded-lg bg-[#CCCCCC]">
            <div
              className={`rounded-lg h-full ${
                profileData?.user_profile_percentage == 100
                  ? "bg-[#019e43]"
                  : "bg-red"
              }`}
              style={{
                width: `${profileData?.user_profile_percentage ?? 0}%`,
              }}
            ></div>
          </div>{" "}
          <span className="text-xs 2xl:text-sm">
            {profileData?.user_profile_percentage ?? 0}%
          </span>
        </div>

        <div className="col-span-12 mt-1">
          <h1 className="text-red text-center text-sm">
            Your Profile is {profileData?.user_profile_percentage ?? 0}%
            Complete!
          </h1>
        </div>

        {profileData?.user_profile_percentage !== 100 && (
          <div className="col-span-12 2xl:px-16 justify-center flex">
            <button
              onClick={() => {
                dispatch(setProfileModal(true));
              }}
              className="mt-3 w-fit 2xl:w-full mx-auto md:mt-4 !text-red btn-border !border-red !text-xs"
            >
              Complete Your Profile Now
            </button>
          </div>
        )}
        <div className="col-span-12 flex justify-center px-6 mt-6">
          <div className="bg-[#F1F5FE] flex w-full justify-around px-4 rounded-2xl py-3">
            {jobStats?.map((job, index) => (
              <React.Fragment key={index}>
                <div>
                  <h1 className="text-[#7B7B7D] text-[11px] sm:text-md text-center">
                    {job.label.split(" ")[0]}
                  </h1>
                  <h1 className="text-[#7B7B7D] text-[11px] sm:text-md text-center">
                    {job.label.split(" ")[1]}
                  </h1>
                  <h1 className="text-center text-[#4D4D4F] mt-2 text-lg">
                    {job.count}
                  </h1>
                  <h1
                    className="text-center text-red mt-2 text-[12px] sm:text-sm font-medium cursor-pointer"
                    onClick={() => {
                      router.push(`/my-jobs?tab=${job.tabIndex}`);
                    }}
                  >
                    View all
                  </h1>
                </div>
                {/* Add divider except for the last item */}
                {index < jobStats.length - 1 && (
                  <div className="border-r border-[#D4D4D4] pr-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
