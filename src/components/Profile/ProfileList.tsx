"use client";
import { useState, useRef } from "react";
import Breadcrumb from "../Breadcrumb";
import { ProfileTabs } from "../utils";
import About from "./About";
import Image from "next/image";
import Education from "./Education";
import Experience from "./Experience";
import Resume from "./Resume";
import ProfileCard from "./ProfileCard";
import AboutMe from "./AboutMe";

const ProfileList = () => {
  const [activeTab, setActiveTab] = useState("About");

  const sectionRefs: any = {
    About: useRef<HTMLDivElement>(null),
    Education: useRef<HTMLDivElement>(null),
    Experience: useRef<HTMLDivElement>(null),
    Resume: useRef<HTMLDivElement>(null),
    "About Me": useRef<HTMLDivElement>(null), // Updated for "About Me"
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const offset = 100; // Adjust for any fixed headers
    const targetRef = sectionRefs[tab];
    if (targetRef && targetRef.current) {
      const top =
        targetRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 sm:mt-2 bg-white sm:bg-transparent">
        {/* Breadcrumb Section */}
        <div className="col-span-12 pt-2 sm:pt-0 px-3 sm:px-0">
          <Breadcrumb root="Home" category="My Profile" />
        </div>
        {/* Title */}
        <div className="hidden sm:block col-span-12 mt-3">
          <h1 className="text-[#231F20] text-[22px] font-medium">My Profile</h1>
        </div>
        <div className="hidden sm:flex col-span-12 sm:col-span-8 flex-wrap gap-4 md:gap-12 border-b-2 border-[#D4D4D4] text-[#D4D4D4]">
          {ProfileTabs?.map((tab) => (
            <h2
              key={tab}
              className={`cursor-pointer pb-2 text-sm md:text-base ${
                activeTab === tab
                  ? "border-b-4 border-red text-red font-bold"
                  : "text-black font-medium"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </h2>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-12 sm:gap-4 lg:gap-9 pt:4 sm:pt-0 sm:mt-6 mb-8">
        <div className="sm:hidden col-span-12 sm:col-span-8 flex flex-wrap gap-4 md:gap-12 bg-white pt-3 px-4 justify-between order-1 sticky top-[52px] z-10">
          {ProfileTabs?.map((tab) => (
            <h2
              key={tab}
              className={`cursor-pointer pb-2 text-sm md:text-base ${
                activeTab === tab
                  ? "border-b-4 border-red text-red font-bold"
                  : "text-black font-medium"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </h2>
          ))}
        </div>
        <div className="col-span-12 xl:col-span-8 lg:col-span-7 md:col-span-7 order-2 sm:order-0 lg:order-0">
          <div ref={sectionRefs.About}>
            <About />
          </div>
          <div ref={sectionRefs.Education} className="mt-4">
            <Education />
          </div>
          <div ref={sectionRefs.Experience} className="mt-4">
            <Experience />
          </div>
          <div ref={sectionRefs.Resume} className="mt-4">
            <Resume />
          </div>
          <div ref={sectionRefs["About Me"]} className="mt-4">
            <AboutMe />
          </div>
        </div>
        <div className="col-span-12 xl:col-span-4 lg:col-span-5 md:col-span-5 order-0 sm:order-3 bg-white sm:bg-transparent  px-3 sm:px-0">
          <ProfileCard />
        </div>
      </div>
    </>
  );
};

export default ProfileList;
