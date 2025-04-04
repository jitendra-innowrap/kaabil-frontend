"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { HiOutlineCurrencyRupee, HiOutlineFilter } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";
import Pagination from "../Pagination";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import JobListingCard from "../Cards/JobListingCard";
import Interview from "../Nudges/Listing/Interview";
import RegisterInMinutes from "../Nudges/Listing/RegisterInMinutes";
import { api2 } from "@/Services/Apiservice";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { getAuthUser, getSessionData } from "../utils/deviceId";
import { setJobFiltersMaster } from "@/redux/jobsFilterSlice";
import { useDispatch } from "react-redux";
import TopCompaniesHiring from "../Nudges/Listing/TopCompaniesHiring";
import FindCareer from "../Nudges/Listing/FindCareer";
import JobsNearYouNudge from "../Nudges/Listing/JobNearYouNudge";
import ShareStrength from "../Nudges/Listing/ShareStrength";
import UpdloadCvNudge from "../Nudges/Listing/UpdloadCvNudge";
import EducationUpdateNudge from "../Nudges/Listing/EducationUpdateNudge";
import ProfileUploadNudge from "../Nudges/Listing/ProfileUploadNudge";
import EditProfileNudge from "../Nudges/Listing/EditProfileNudge";
import WelcomeVideoNudge from "../Nudges/Listing/welcomeNudge";

function JobList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isfilterAvailable, setIsfilterAvailable] = useState(false);
  const page = searchParams.get("page") || "1"; // Get the current page from the URL
  const search = searchParams.get("search") || ""; // Get the current page from the URL
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10));
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const maxPagesToShow = 5; // Maximum pages to display
  const user = useAppSelector((state) => state.user);
  const { isLoggedIn, showSoftSkills, showUploadCV, showUpdateEducation, showProfilePhoto, showUpdateProfile, showHelpVideo } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState<object[]>([]);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const sort = searchParams.get("sort") || (isLoggedIn?"1":"3"); // Default to '1' (Relevance);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const updateSize = () => {
    setIsMobile(window.innerWidth < 1024);
  };
  
  // Initialize on mount
  updateSize();
  
  // Add resize listener
  window.addEventListener("resize", updateSize);
  
  // Cleanup
  return () => window.removeEventListener("resize", updateSize);
}, []);

// Nudges that appear on all screen sizes
const commonNudges = [
...(!isLoggedIn ? [<RegisterInMinutes key="register" />]: [])
];

// Nudges that only appear on mobile (<1024px)
const mobileOnlyNudges = isMobile ? [
  <JobsNearYouNudge key="jobs-near-you" />,
] : [];

// Conditional nudges for logged-in users (mobile only)
const loggedInMobileNudges = isLoggedIn && isMobile ? [
  ...(showSoftSkills ? [<ShareStrength key="share-strength" />] : []),
  ...(showUploadCV ? [<UpdloadCvNudge key="upload-cv" />] : []),
  ...(showUpdateEducation ? [<EducationUpdateNudge key="update-education" />] : []),
  ...(showProfilePhoto ? [<ProfileUploadNudge key="profile-photo" />] : []),
  ...(showUpdateProfile ? [<EditProfileNudge key="edit-profile" />] : []),
  ...(showHelpVideo ? [<WelcomeVideoNudge key="welcome-video" />] : []),
] : [];

// Nudges for non-logged-in users
const nudges = [
  ...mobileOnlyNudges,
  ...commonNudges,
];

// Nudges for logged-in users
const nudgesForLoggedInUser = [
  ...mobileOnlyNudges,
  ...(isLoggedIn ? [
    // <ProfileCard key="profile-card" />,
    // <QuickAction key="quick-action" />,
    ...loggedInMobileNudges,
    <TopCompaniesHiring key="top-companies" />,
  ] : []),
];

  // Reset page to 1 when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Update the sort parameter in the URL
    router.replace(`?${params.toString()}`, { scroll: false });
    setCurrentPage(1);
  }, [
    searchParams.get("job_types_filter"),
    searchParams.get("location_filter"),
    searchParams.get("industries_filter"),
    searchParams.get("experience"),
    searchParams.get("job_location_types_filter"),
    searchParams.get("benefits_filter"),
    searchParams.get("minSalary"),
    searchParams.get("maxSalary"),
    searchParams.get("search"),
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle sort option selection
  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort); // Update the sort parameter in the URL
    params.set("page", "1"); // Reset page to 1 when sort changes
    router.replace(`?${params.toString()}`, { scroll: false }); // Update the URL without refreshing the page
  };
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle sort option selection
  const handleOptionClick = (newSort: string) => {
    handleSortChange(newSort); // Update the sort value
    setIsOpen(false); // Close the dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Fetch jobs based on the current page
  useEffect(() => {
    const fetchJobs = async () => {
      // Parse URL parameters
      const jobTypesFilter =
        searchParams.get("job_types_filter")?.split("|") || [];
      const locationFilter =
        searchParams.get("location_filter")?.split("|") || [];
      const industriesFilter =
        searchParams.get("industries_filter")?.split("|") || [];
      const experienceFilter = searchParams.get("experience")?.split("|") || [];
      const mappedExperienceFilter = experienceFilter.map((exp) => {
        if (exp === "Fresher") {
          return 1;
        } else {
          return 0;
        }
      });
      const jobLocationTypesFilter =
        searchParams.get("job_location_types_filter")?.split("|") || [];
      const benefitsFilter =
        searchParams.get("benefits_filter")?.split("|") || [];
      const minSalary = searchParams.get("minSalary") || "";
      const maxSalary = searchParams.get("maxSalary") || "";
      const latitude = searchParams.get("latitude")?.split("|") || []; // Parse latitude as an array
      const longitude = searchParams.get("longitude")?.split("|") || []; // Parse longitude as an array
      const company_id = searchParams.get("cmp_id")?.split("|") || []; // Parse longitude as an array
      const search = searchParams.get("search") || "";

      // Check if any filters are applied
      const hasFilters =
        jobTypesFilter.length > 0 ||
        locationFilter.length > 0 ||
        industriesFilter.length > 0 ||
        experienceFilter.length > 0 ||
        jobLocationTypesFilter.length > 0 ||
        benefitsFilter.length > 0 ||
        minSalary ||
        maxSalary ||
        company_id.length > 0 ||
        search;

      // Format location_filter as an array of objects with latitude and longitude
      const formattedLocationFilter = locationFilter.map((location, index) => {
        const locationObj: {
          location: string;
          latitude?: number;
          longitude?: number;
        } = {
          location: location,
        };

        // Add latitude only if it exists
        if (latitude[index]) {
          locationObj.latitude = parseFloat(latitude[index]);
        }

        // Add longitude only if it exists
        if (longitude[index]) {
          locationObj.longitude = parseFloat(longitude[index]);
        }

        return locationObj;
      });

      // Construct payload
      let payload = {
        recommendate: isLoggedIn ? !hasFilters : false, // Set recommendate to true if no filters are applied, else false
        company_id_filter: company_id,
        soft_skill_filter: [],
        skill_filter: [],
        job_location_types_filter: jobLocationTypesFilter,
        industries_filter: industriesFilter,
        location_filter: formattedLocationFilter, // Use formatted location filter
        benefits_filter: benefitsFilter,
        job_types_filter: jobTypesFilter,
        experience_filter: mappedExperienceFilter,
        min_salary: minSalary ? Number(minSalary) : null,
        max_salary: maxSalary ? Number(maxSalary) : null,
        search: search,
        sort: sort == "3" ? 3 : sort == "1"? 1 : (isLoggedIn? 1: 3),
      };

      const { deviceId, secret, salt } = getSessionData();

      // Ensure session data is available
      if (!deviceId || !secret || !salt) {
        console.log("Session data not available, retrying...");
        setTimeout(fetchJobs, 1000); // Retry after 1 second
        return;
      }

      try {
        setIsJobsLoading(true)
        const response = await api2.post(
          `/api/job/list?page=${currentPage}&pageLength=10&userId=${
            user?.id || 0
          }`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setJobs(response.data?.data?.jobs as object[]);
        setIsJobsLoading(false);
        // Calculate total pages based on total jobs and jobs per page
        const totalJobs = response.data?.data?.total;
        const jobsPerPage = 10;
        const totalPages = Math.ceil(totalJobs / jobsPerPage);
        setTotalPages(totalPages);
        setTotalJobs(totalJobs);
        console.log(response.data?.data);
        let filterMasters = {
          benefits_filter:
            response.data?.data?.filters?.benefits_filter?.buckets,
          job_location_types_filter:
            response.data?.data?.filters?.job_location_types_filter?.buckets,
          job_types_filter:
            response.data?.data?.filters?.job_types_filter?.buckets,
          experience: response.data?.data?.filters?.experience_filter?.buckets,
          location_filter:
            response.data?.data?.filters?.location_filter?.buckets,
          industries_filter:
            response.data?.data?.filters?.industries_filter?.buckets,
          skill_filter: response.data?.data?.filters?.skill_filter?.buckets,
          soft_skills_filter:
            response.data?.data?.filters?.soft_skills_filter?.buckets,
          salary: {
            min: response.data?.data?.filters?.min_salary?.value,
            max: response.data?.data?.filters?.max_salary?.value,
          },
        };
        // @ts-ignore
        // if (!isfilterAvailable) 
        dispatch(setJobFiltersMaster(filterMasters));
        setIsfilterAvailable(true);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [page, user?.id, searchParams, currentPage]);

  // Handle pagination button click
  const handleActive = (page: number) => {
    setCurrentPage(page);

    // Create a new URLSearchParams object from the current search parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update the 'page' parameter
    params.set("page", page.toString());

    // Push the updated query parameters to the URL
    router.replace(`?${params.toString()}`, { scroll: true });
  };

  
  return (
    <div
      style={{ width: "-webkit-fill-available" }}
      className="lg:pl-3 xl:pl-7 3xl:pl-9"
    >
      <div className="mobile-container flex justify-between gap-2 mb-4 lg:mb-5 xl:mb-3 3xl:mb-6">
        <div className="">
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          <h2 className="font-medium text-base leading-7s xl:text-lg 3xl:text-2xl 3xl:leading-7 mb-1 xl:mb-2">
            {isLoggedIn ? "Recommended jobs for you" : "All Jobs"}
          </h2>
          {!isJobsLoading && <p className="text-[#787878] text-sm 2xl:text-sm">
            {totalJobs} jobs for you
          </p>}
        </div>
        <div
          className="relative h-fit sort-by-container mt-1 3xl:mt-0"
          ref={dropdownRef}
        >
          {/* Dropdown Button */}
          <button
            type="button"
            className="text-[#4D4D4F] px-3 !py-2 whitespace-nowrap flex items-center !border-black btn-border"
            id="menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            {sort === "3" ? "Recently Posted" :sort === "1" ? "Best Matched" : (isLoggedIn? "Best Matched":"Recently Posted")}
            <IoMdArrowDropdown
              className={`flex-shrink-0 ml-1 xl:ml-2 3xl:ml-5 text-[#000000] size-4 3xl:size-4 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className="sort-by-items-container absolute right-0 z-10 origin-top-right top-full focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="sort-items-wrapper rounded-md bg-white ring-1 shadow-lg ring-black/5 mt-1">
                <div className="py-0 sort-items divide-y" role="none">
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleOptionClick("1");
                    }}
                    className="sort-item block px-4 py-2 lg:px-[10px] lg:py-[7px] 3xl:px-4 3xl:py-2 text-xs lg:text-[10px] 3xl:text-sm whitespace-nowrap text-[#6b6b6b] hover:text-gray-900 outline-hidden cursor-pointer"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-2"
                  >
                    Best Matched
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleOptionClick("3");
                    }}
                    className="sort-item block px-4 py-2 lg:px-[10px] lg:py-[7px] 3xl:px-4 3xl:py-2 text-xs lg:text-[10px] 3xl:text-sm whitespace-nowrap text-[#6b6b6b] hover:text-gray-900 outline-hidden cursor-pointer"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-2"
                  >
                    Recently Posted
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isJobsLoading ?
      <div className="flex justify-center items-center h-[200px]">
        <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
      </div>
      :
      <div className="mobile-container flex flex-col gap-4 lg:gap-3 3xl:gap-4">
        {jobs.map((job: any, index) => {
          const items = [];

          // Add the job listing
          items.push(
            <div className="flex w-[100%]" key={`job-${job?.id}`}>
              <JobListingCard {...job} />
            </div>
          );

          // Add a nudge after every 2 job listings
          if ((index + 1) % 2 === 0) {
            const nudgeIndex = Math.floor((index + 1) / 2) - 1;

            // Check if the nudgeIndex is within the bounds of the nudges array
            if (user?.isLoggedIn) {
              if (nudgeIndex < nudgesForLoggedInUser.length) {
                items.push(nudgesForLoggedInUser[nudgeIndex]);
              }
            } else {
              if (nudgeIndex < nudges.length) {
                items.push(nudges[nudgeIndex]);
              }
            }
          }

          return items;
        })}
      </div>}
      {/* <div className="block lg:hidden mt-4">
        <FindCareer />
      </div> */}

      {/* Pagination */}
      <div className="mobile-container mt-12 mb-5 lg:mb-0 lg:mt-14 2xl:mt-16">
        <Pagination
          currentPage={currentPage}
          handleActive={handleActive}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobList />
    </Suspense>
  );
}
