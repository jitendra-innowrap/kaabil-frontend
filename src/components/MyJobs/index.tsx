'use client'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import ProfileCard from '../Nudges/Listing/ProfileCard'
import QuickAction from '../Nudges/Listing/QuickAction'
import BoostProfile from '../Nudges/Listing/BoostProfile'
import api from '@/Services/Apiservice'
import { useAppSelector } from '@/redux/hooks'
import toast from 'react-hot-toast'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import JobListingCard from '../Cards/JobListingCard'
import Link from 'next/link'
import Image from 'next/image'
import ShortListedJobCard from './Cards/ShortlistedJobCard'
import AppliedJobCard from './Cards/AppliedJobCard'
import SaveJobCard from './Cards/SaveJobCard'
import Pagination from '../Pagination'

export default function MyJobs() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const pageParam = searchParams.get('page');
  const [jobs, setJobs] = useState<JobResult[] | null>(null);
  const { isLoggedIn } = useAppSelector((state) => state.user);
  // Initialize state from URL params directly
  const [currentPage, setCurrentPage] = useState(() => {
    return pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : 1;
  });

  const [selectedTab, setSelectedTab] = useState(() => {
    return tabParam && !isNaN(Number(tabParam)) && Number(tabParam) >= 1 && Number(tabParam) <= 3 
      ? Number(tabParam) 
      : 1;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const jobsPerPage = 50;

  const router = useRouter();

  // Initialize tab from URL params or default to 1
  useEffect(() => {
    
    if (tabParam && !isNaN(Number(tabParam))) {
      const tab = Number(tabParam);
      if (tab >= 1 && tab <= 3) {
        setSelectedTab(tab);
      }
    }
    
    if (pageParam && !isNaN(Number(pageParam))) {
      setCurrentPage(Number(pageParam));
    }
  }, [searchParams, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
      return;
    }
    fetchJobs();
  }, [isLoggedIn, currentPage, selectedTab]);

  async function fetchJobs() {
    try {
      type SearchPayload = {
        page: string;
        flag: string;
        company_master_id?: string;
      };
      let payload: SearchPayload = {
        page: currentPage.toString(),
        flag: selectedTab === 1 ? "" : "1",
      };
      if (selectedTab === 3) payload.company_master_id = "0";

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      
      let endpoint = "";
      if (selectedTab === 1) {
        endpoint = "/Company/myJobs";
      } else if (selectedTab === 2) {
        endpoint = "/Company/myJobs";
      } else if (selectedTab === 3) {
        endpoint = "/Company/saveJobList";
      }
      
      setIsLoading(true);
      setTotalPages(1);
      setTotalJobs(0);
      
      const response = await api.post(`${endpoint}?pageLength=10`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      const responseData = response.data;
      if (responseData.code === 1) {
        if (responseData.result?.[0]?.id == null) {
          toast.error("page not found", { position: "bottom-right" });
          router.push("/");
        }
        setJobs(response?.data?.result as JobResult[]);
        const totalJobs = response?.data?.total || response?.data?.total_save_job;
        const totalPages = Math.ceil(totalJobs / jobsPerPage);
        console.log(totalJobs,"total")
        setTotalJobs(totalJobs);
        setTotalPages(totalPages);
        setIsLoading(false);
      } else {
        notFound();
      }
    } catch (error: any) {
      if (error?.status == 404) {
        notFound();
      }
      console.log(error);
      setIsLoading(false);
      setJobs([]);
    }
  };

  const handleActive = (page: number) => {
    setCurrentPage(page);
    setJobs(null);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  
  const handUnsave=(id:string)=>{
    let updatedList = jobs?.filter((job: JobResult) => 
        job && 'id' in job && job.id !== id
      );
    setJobs(updatedList || null);
    const updatedJobs = totalJobs -1
    setTotalJobs(updatedJobs)
    const updatedPages = Math.ceil(updatedJobs / jobsPerPage);
    setTotalPages(updatedPages)
    console.clear()
    console.log('old list', jobs)
    console.log('updatedList', updatedList)
  }
  const handleTab = (key: number) => {
    setJobs(null);
    setCurrentPage(1);
    setSelectedTab(key);
    const params = new URLSearchParams();
    params.set("tab", key.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Get appropriate empty state message based on selected tab
  const getEmptyStateMessage = () => {
    switch (selectedTab) {
      case 1:
        return {
          title: "No applied jobs found",
          description: "You haven't applied to any jobs yet. Start applying to see them here!",
          image: '/new-assets/images/no-shortlisted.svg'
        };
      case 2:
        return {
          title: "Not shortlisted yet",
          description: "Once you are shortlisted by recruiter. Shortlisted jobs are shown here",
          image: '/new-assets/images/no-shortlisted.svg'
        };
      case 3:
        return {
          title: "No saved jobs found",
          description: "You haven't saved any jobs yet. Save jobs to view them later!",
          image: '/new-assets/images/no-shortlisted.svg'
        };
      default:
        return {
          title: "No jobs found",
          description: "There are no jobs to display",
          image: '/new-assets/images/no-shortlisted.svg'
        };
    }
  };

  // Get appropriate count text based on selected tab
  const getCountText = () => {
    switch (selectedTab) {
      case 1:
        return `You have applied for ${totalJobs || 0} jobs`;
      case 2:
        return `You have been shortlisted for ${totalJobs || 0} jobs`;
      case 3:
        return `You have saved ${totalJobs || 0} jobs`;
      default:
        return `Total: ${totalJobs || 0}`;
    }
  };

  return (
    <div className='container'>
      <div className="mt-5 3xl:mt-6 mb-7 3xl:mb-8">
        <Breadcrumb root='Home' category='My Jobs' />
      </div>
      <h1 className='hidden sm:block text-[#231F20] text-xl 3xl:text-2xl font-medium'>My jobs</h1>
      <div className="pb-5 md:pb-8 xl:pb-14 2xl:pb-16 flex flex-col sm:flex-row justify-between gap-5 md:gap-7 lg:gap-8 2xl:gap-10 3xl:gap-12">
        <div className="w-full order-1 sm:order-0">
          {/* Navigation Tabs */}
          <div className="bg-[#f9f9f9] mb-6 mt-4">
            <div className="mx-auto border-b border-[#D4D4D4]">
              <div className="flex gap-5 xl:gap-10 3xl-gap-12 justify-start text-start items-start">
                <Link
                  className={`px-0 py-3 inline-flex items-center text-sm font-meduim ${
                    selectedTab === 1
                      ? "border-b-4 border-red text-red-500 font-bold -mb-[1px]"
                      : "text-black hover:text-red-500"
                  }`}
                  href="/my-jobs?tab=1"
                  onClick={() => handleTab(1)}
                >
                  Applied Jobs
                </Link>
                <Link
                  className={`px-0 py-3 inline-flex items-center text-sm ${
                    selectedTab === 2
                      ? "border-b-4 border-red text-red-500 font-bold -mb-[1px]"
                      : "text-black hover:text-red-500"
                  }`}
                  href="/my-jobs?tab=2"
                  onClick={() => handleTab(2)}
                >
                  Shortlisted Jobs
                </Link>
                <Link
                  className={`px-0 py-3 inline-flex items-center text-sm ${
                    selectedTab == 3
                      ? "border-b-4 border-red text-red-500 font-bold -mb-[0px]"
                      : "text-black hover:text-red-500"
                  }`}
                  href="/my-jobs?tab=3"
                  onClick={() => handleTab(3)}
                >
                  Saved Jobs
                </Link>
              </div>
            </div>
          </div>
          
          {jobs !==null ? (
            <div className="w-full">
              {jobs?.length > 0 ? (
                <div className="flex flex-col w-full gap-3 3xl:gap-4">
                  <h3 className='text-sm 3xl:text-base text-[#787878]'>{getCountText()}</h3>
                  {jobs.map((job) => (
                    <div className="flex w-[100%]" key={`job-${job?.id}`}>
                      {selectedTab === 3 ? (
                        <SaveJobCard {...job} unsave={handUnsave} jobs={jobs} />
                      ) : selectedTab === 2 ? (
                        <ShortListedJobCard {...job} />
                      ) : (
                        <AppliedJobCard {...job} />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pt-10 xl:pt-20 3xl:pt-32 bg-[#f9f9f9] mx-auto w-full px-4 pb-12">
                  <Image 
                    className="w-[220px] h-auto mx-auto 3xl:w-[323px]" 
                    width={650} 
                    height={520} 
                    src={getEmptyStateMessage().image} 
                    alt="no-jobs-found"
                  />
                  <h3 className="text-xl 3xl:text-2xl mt-8 3xl:mt-14 font-medium text-center">
                    {getEmptyStateMessage().title}
                  </h3>
                  <p className="text-sm 3xl:text-base font-normal mt-2 3xl:mt-4 max-w-[280px] 3xl:maw-w-[343px] text-center mx-auto">
                    {getEmptyStateMessage().description}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[200px]">
              <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="mt-10 md:mt-14 2xl:mt-16">
              <Pagination
                currentPage={currentPage}
                handleActive={handleActive}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
        
        <div className="nudges-bar sm:mt-28 lg:mt-32 flex flex-shrink-0  md:gap-6 max-w-[400px] mx-auto lg:mx-0 sm:w-[300px] lg:w-[280px] 2xl:w-[341px] order-0 sm:order-1">
          <div className={"sticky top-[80px] flex flex-col gap-4"}>
            <ProfileCard/>
            <div className="invisible">
            <QuickAction/>
            <BoostProfile/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
