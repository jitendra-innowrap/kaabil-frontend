"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { RxTriangleDown } from "react-icons/rx";

export default function CompanyTrading() {
  const [sortBy, setSortBy] = useState("1");
  const [selectedTab, setSelectedTab] = useState("Trending");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  // Company data
  const companies = [
    { name: "Jio", icon: "/new-assets/company-icons/jio.png" },
    { name: "Tata Consultancy Services", icon: "/new-assets/company-icons/tcs.png" },
    { name: "Tech Mahindra Ltd", icon: "/new-assets/company-icons/mahindra.png" },
    { name: "Mahindra Holidays and Resorts India Ltd", icon: "/new-assets/company-icons/club.png" },
    { name: "NoBroker", icon: "/new-assets/company-icons/image-4.png" },
    { name: "Flexsin Technologies", icon: "/new-assets/company-icons/flexsin.png" },
    { name: "XpressBees", icon: "/new-assets/company-icons/image-6.png" },
    { name: "The Higher Pitch", icon: "/new-assets/company-icons/image-7.png" },
    { name: "FourthPointer Services", icon: "/new-assets/company-icons/image-8.png" },
    { name: "Axis Finance (AFL)", icon: "/new-assets/company-icons/axis.png" },
    { name: "ixigo", icon: "/new-assets/company-icons/ixigo.png" },
    { name: "Cloudnow Technologies", icon: "/new-assets/company-icons/image-11.png" },
    { name: "Mahindra Holidays and Resorts India Ltd", icon: "/new-assets/company-icons/club.png" },
    { name: "Porter", icon: "/new-assets/company-icons/porter.png" },
    { name: "EaseMyTrip", icon: "/new-assets/company-icons/emt.png" },
    { name: "Jio", icon: "/new-assets/company-icons/jio.png" },
    { name: "Tata Consultancy Services", icon: "/new-assets/company-icons/tcs.png" },
    { name: "Tech Mahindra Ltd", icon: "/new-assets/company-icons/mahindra.png" },
    { name: "Deloitte", icon: "/new-assets/company-icons/deolite.png" },
    { name: "Mahindra Holidays and Resorts India Ltd", icon: "/new-assets/company-icons/club.png" },
    { name: "Swiggy", icon: "/new-assets/company-icons/swiggy.png" },
    { name: "Flipkart", icon: "/new-assets/company-icons/flip.png" },
    { name: "Contempo Technologies", icon: "/new-assets/company-icons/contempo.png" },
    { name: "Quickinsure", icon: "/new-assets/company-icons/quickinsure.png" },
    { name: "Tech Mahindra Ltd", icon: "/new-assets/company-icons/mahindra.png" },
  ];

  // Following companies data
  const followingCompanies = [
    { name: "Jio", icon: "/new-assets/company-icons/jio.png" },
    { name: "Tata Consultancy Services", icon: "/new-assets/company-icons/tcs.png" },
    { name: "Tech Mahindra Ltd", icon: "/new-assets/company-icons/mahindra.png" },
  ];

  // Industries data
  const industries = [
    { name: "Flexsin Technologies", icon: "/new-assets/company-icons/flexsin.png" },
    { name: "XpressBees", icon: "/new-assets/company-icons/image-6.png" },
    { name: "The Higher Pitch", icon: "/new-assets/company-icons/image-7.png" },
    { name: "NoBroker", icon: "/new-assets/company-icons/image-4.png" },
    { name: "FourthPointer Services", icon: "/new-assets/company-icons/image-8.png" },
    { name: "ixigo", icon: "/new-assets/company-icons/ixigo.png" },
    { name: "Axis Finance (AFL)", icon: "/new-assets/company-icons/axis.png" },
    { name: "Porter", icon: "/new-assets/company-icons/porter.png" },
  ];

  return (
    <div className="flex bg-gray-50 flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <Image
          src={"/assets/banners/trading.svg"}
          alt="Office building view with silhouettes"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="">
          {/* Hero content */}
        </div>
      </div>

   {/* Navigation Tabs */}
   <div className="bg-gray-50 mt-6">
        <div className="max-w-[1120px] mx-auto  border-b border-gray-200">
          <div className="flex  gap-16 justify-start text-start items-start">
            <Link
              className={`px-0 py-3 inline-flex items-center  text-sm font-meduim ${
                selectedTab === "Trending"
                  ? "border-b-4 border-red text-red-500 font-bold  -mb-[1px]"
                  : "text-black hover:text-red-500"
              }`}
              href="#"
              onClick={() => setSelectedTab("Trending")}
            >
              Trending
            </Link>
            <Link
              className={`px-0 py-3 inline-flex items-center text-sm  ${
                selectedTab === "Following"
                  ? "border-b-4 border-red text-red-500 font-bold -mb-[1px]"
                  : "text-black hover:text-red-500"
              }`}
              href="#"
              onClick={() => setSelectedTab("Following")}
            >
              Following
            </Link>
            <Link
              className={`px-0 py-3 inline-flex items-center text-sm   ${
                selectedTab === "Industry"
                  ? "border-b-4 border-red text-red-500 font-bold -mb-[0px]"
                  : "text-black hover:text-red-500"
              }`}
              href="#"
              onClick={() => setSelectedTab("Industry")}
            >
              Industry
            </Link>
          </div>
        </div>
      </div>

      {/* Search Section */}
      {selectedTab === "Industry" && (
        <div className="mb-6">
          <div className="flex flex-wrap mt-4  ml-40 gap-2">
            {[
              "All",
              "Retail",
              "Media",
              "Healthcare",
              "Education",
              "IPO",
              "Hospitality",
              "IT Services",
              "Manufacturing",
            ].map((industry) => (
              <span
                key={industry}
                className={`px-6 py-2 rounded-lg  border-gray-0 cursor-pointer ${
                  selectedIndustry === industry ? "bg-black text-white" : "bg-gray-100"
                }`}
                onClick={() => setSelectedIndustry(industry)}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="w-full bg-gray-50 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex shadow-sm">
            {/* Remove parent rounded, shape corners individually on input & button */}
            <input
              placeholder="Company Name"
              className="w-full h-[58px] border-0 px-6 text-base focus:outline-none flex-1 rounded-l-lg"
            />
            <button className="h-[58px] bg-red-500 hover:bg-red-600 text-white px-6 flex items-center justify-center gap-3 min-w-[180px] shadow-md rounded-r-lg rounded-l-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span className="text-lg font-medium">Search Jobs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="max-w-6xl bg-gray-50 mx-auto w-full px-4 pb-12">
        {selectedTab === "Trending" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Trending companies</h2>
                <p className="text-sm text-gray-500">120 Companies found!</p>
              </div>
              <div className="flex items-center relative">
                <select
                  className="appearance-none w-[120px] h-10 pl-3 pr-10 border border-gray-500 rounded-md text-sm text-gray-700 bg-white hover:border-gray-600 focus:outline-none focus:border-red-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="1">Sort by</option>
                  <option value="2">A-Z</option>
                  <option value="3">Z-A</option>
                </select>
                <RxTriangleDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
              </div>
            </div>

            {/* Company Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {companies.map((company, index) => (
                <CompanyCard key={index} logo={company.icon} name={company.name} />
              ))}
            </div>
          </>
        )}

        {selectedTab === "Following" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Following companies</h2>
                <p className="text-sm text-gray-500">3 Companies found!</p>
              </div>
              <div className="flex items-center relative">
                <select
                  className="appearance-none w-[120px] h-10 pl-3 pr-10 border border-gray-500 rounded-md text-sm text-gray-700 bg-white hover:border-gray-600 focus:outline-none focus:border-red-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="1">Sort by</option>
                  <option value="2">A-Z</option>
                  <option value="3">Z-A</option>
                </select>
                <RxTriangleDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
              </div>
            </div>

            {/* Following Company Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {followingCompanies.map((company, index) => (
                <CompanyCard key={index} logo={company.icon} name={company.name} />
              ))}
            </div>
          </>
        )}

        {selectedTab === "Industry" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Industries</h2>
                <p className="text-sm text-gray-500">8 Industries found!</p>
              </div>
              <div className="flex items-center relative">
                <select
                  className="appearance-none w-[120px] h-10 pl-3 pr-10 border border-gray-500 rounded-md text-sm text-gray-700 bg-white hover:border-gray-600 focus:outline-none focus:border-red-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="1">Sort by</option>
                  <option value="2">A-Z</option>
                  <option value="3">Z-A</option>
                </select>
                <RxTriangleDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
              </div>
            </div>

            {/* Industry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col w-[180px] h-[200px]"
                >
                  <div className="p-4 flex justify-center items-center">
                    <div className="w-16 h-16 rounded-md flex items-center justify-center">
                      <Image
                        src={industry.icon}
                        alt={`${industry.name} icon`}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="px-4 pb-2 text-center">
                    <h3 className="text-sm font-medium">{industry.name}</h3>
                  </div>
                  <div className="mt-auto p-4 pt-2 text-center">
                    <Link
                      className="text-xs w-full 2xl:text-lg font-semibold justify-self-end"
                      href={`/industry/profile/${industry.name}`}
                    >
                      View Jobs
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface CompanyCardProps {
  logo: string;
  name: string;
  bgColor?: string;
}

function CompanyCard({ logo, name, bgColor }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col w-[180px] h-[220px]">
      <div className="p-4 flex justify-center items-center">
        <div className={`w-16 h-16 rounded-md flex items-center justify-center ${bgColor || ""}`}>
          <Image
            src={logo || "/placeholder.svg"}
            alt={`${name} logo`}
            width={40}
            height={60}
            className="object-contain"
          />
        </div>
      </div>
      <div className="px-4 pb-2 text-center">
        <h3 className="text-sm font-medium">{name}</h3>
      </div>
      <div className="mt-auto p-4 pt-2 text-center">
        <Link
          className="text-xs w-full 2xl:text-lg font-semibold justify-self-end"
          href={`/company/profile/${name}`}
        >
          View Jobs
        </Link>
      </div>
    </div>
  );
}