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
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const offset = 100; // Adjust based on your header height
    const targetRef = sectionRefs[tab];
    if (targetRef && targetRef.current) {
      const top =
        targetRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 mt-2">
        {/* Breadcrumb Section */}
        <div className="col-span-12">
          <Breadcrumb root="Home" category="My Profile" />
        </div>
        {/* Title */}
        <div className="col-span-12 mt-3">
          <h1 className="text-[#231F20] text-[22px] font-medium">My Profile</h1>
        </div>
        <div className="col-span-12 flex flex-wrap gap-4 md:gap-12 border-b-2 border-[#D4D4D4] text-[#D4D4D4]">
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
      <div className="grid grid-cols-12 gap-4 lg:gap-9 mt-6 mb-8">
        <div className="col-span-12 xl:col-span-8 lg:col-span-7 md:col-span-6">
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
          <div ref={sectionRefs.Resume} className="mt-4">
            <AboutMe />
          </div>
        </div>
        <div className="col-span-12 xl:col-span-4 lg:col-span-5 md:col-span-6">
          <ProfileCard />
        </div>
      </div>
    </>
  );
};

export default ProfileList;
