import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-2xl py-3">
      <div className="grid grid-col-12">
        <div className="col-span-12">
          <Image
            className="cursor-pointer mx-auto size-[70px] 2xl:size-[102px] mb-2"
            src={"/new-assets/icons/avatar.svg"}
            width={287}
            height={253}
            alt="resume-builder"
          />
        </div>
        <div className="col-span-12">
          <h1 className="text-xl text-center font-medium text-[#231F20]">
            Shweta Malankar
          </h1>
        </div>
        <div className="col-span-12">
          <h1 className="text-xs text-center text-[#4D4D4F]">
            Vikhroli East, Mumbai
          </h1>
        </div>
        <div className="col-span-12 mt-2">
          <h1 className="text-sm text-center">
            HT Media Labs - May 2020 - Present
          </h1>
        </div>
        <div className="col-span-12 mt-2">
          <div className="text-[#717B9E] flex justify-center gap-3 text-[12px] md:text-[8px] lg:text-[9px] xl:text-[12px]">
            <h1 className="bg-[#EEF2FECC] px-2 py-1 rounded-md">Figma</h1>
            <h1 className="bg-[#EEF2FECC] px-2 py-1 rounded-md">
              UI/UX Design
            </h1>
            <h1 className="bg-[#EEF2FECC] px-2 py-1 rounded-md">Leadership</h1>
            <h1 className="bg-[#EEF2FECC] px-2 py-1 rounded-md">Visual art</h1>
          </div>
        </div>
        <div className="col-span-12 flex justify-center items-center px-6 gap-2 mt-4">
          <div className="w-full h-[6px] 2xl:h-2 rounded-lg bg-[#CCCCCC]">
            <div
              className="rounded-lg h-full bg-red"
              style={{ width: `100%` }}
            ></div>
          </div>{" "}
          <span className="text-xs 2xl:text-sm">100%</span>
        </div>
        <div className="col-span-12 mt-1">
          <h1 className="text-red text-center text-sm">
            Your Profile is 100% Complete!
          </h1>
        </div>
        <div className="col-span-12 flex justify-center px-6 mt-6">
          <div className="bg-[#F1F5FE] flex w-full justify-between px-4 rounded-2xl py-3">
            {/* First */}
            <div>
              <h1 className="text-[#7B7B7D] text-md text-center">Applied</h1>
              <h1 className="text-[#7B7B7D] text-md text-center">Jobs</h1>
              <h1 className="text-center text-[#4D4D4F] mt-2 text-lg">05</h1>
              <h1 className="text-center text-[#4D4D4F] mt-2 text-sm font-medium">
                View all
              </h1>
            </div>
            <div className="border-r border-[#D4D4D4] pr-4" />
            {/* Second */}
            <div>
              <h1 className="text-[#7B7B7D] text-md text-center">Applied</h1>
              <h1 className="text-[#7B7B7D] text-md text-center">Jobs</h1>
              <h1 className="text-center text-[#4D4D4F] mt-2 text-lg">05</h1>
              <h1 className="text-center text-[#4D4D4F] mt-2 text-sm font-medium">
                View all
              </h1>
            </div>
            <div className="border-r border-[#D4D4D4] pr-4" />
            {/* Third */}
            <div>
              <h1 className="text-[#7B7B7D] text-md text-center">Applied</h1>
              <h1 className="text-[#7B7B7D] text-md text-center">Jobs</h1>
              <h1 className="text-center text-[#4D4D4F] mt-2 text-lg">05</h1>
              <h1 className="text-center text-[#4D4D4F] mt-2 text-sm font-medium">
                View all
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
