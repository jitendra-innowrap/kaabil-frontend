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

export default function MyJobs() {
  const [jobs, setJobs] = useState<JobResult[]>([]);
  const {isLoggedIn} = useAppSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const searchParams = useSearchParams();
  
  const router = useRouter();
  useEffect(() => {
    fetchJobs();
  }, [isLoggedIn, currentPage, selectedTab]);

  async function fetchJobs() {
    try {
      type SearchPayload = {
        page: string;
        flag: string;
        company_master_id?: string
      };
      let payload:SearchPayload = {
        page:currentPage.toString(),
        flag: selectedTab===1?"":"1",
      };
      if(selectedTab===3) payload.company_master_id="0";

      const formData = new FormData();
      // ✅ Automatically append all fields from the object
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value as string); // Convert all values to strings
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
        if(responseData.result?.[0]?.id==null){
          toast.error("page not found", { position: "bottom-right" });
          router.push("/");
        }
        setJobs(response?.data?.result as JobResult[]);
        const totalCompany = response?.data?.total_company_job;
        const companyPerPage = 50;
        const totalPages = Math.ceil(totalCompany / companyPerPage);
        setTotalJobs(totalCompany || response?.data?.result?.length);
        setTotalPages(totalPages);
        setIsLoading(false)
      }else{
        notFound();
      }
    } catch (error: any) {
      if(error?.status==404){
        notFound();
      }
      console.log(error);
      setIsLoading(false);
      setJobs([]);
    }
  };
  const handleTab=(key:number)=>{
    setCurrentPage(1);
    console.log(key)
    setSelectedTab(key);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    console.log(key, params);
    router.push(`/CompanyTrading?${params.toString()}`, { scroll: false }); // Update the URL without refreshing the page
  }
  return (
    <div className='container'>
        <div className="mt-5 3xl:mt-6 mb-7 3xl:mb-8">
            <Breadcrumb root='Home' category='My Jobs' />
        </div>
        <h1 className='text-[#231F20] text-xl 3xl:text-2xl font-medium'>My jobs</h1>
        <div className="pb-5 md:pb-8 xl:pb-14 2xl:pb-16 flex flex-col lg:flex-row justify-between gap-5 md:gap-7 lg:gap-8 2xl:gap-10 3xl:gap-12">
            {/* <pre>{JSON.stringify(jobs, null, 2)}</pre> */}
            <div className="w-full">
              {/* Navigation Tabs */}
              <div className="bg-[#f9f9f9] mb-6 mt-4">
                <div className=" mx-auto  border-b border-[#D4D4D4]">
                  <div className="flex gap-5 xl:gap-10 3xl-gap-12 justify-start text-start items-start">
                    <Link
                      className={`px-0 py-3 inline-flex items-center  text-sm font-meduim ${
                        selectedTab === 1
                          ? "border-b-4 border-red text-red-500 font-bold  -mb-[1px]"
                          : "text-black hover:text-red-500"
                      }`}
                      href="#"
                      onClick={() => handleTab(1)}
                    >
                      Applied Jobs
                    </Link>
                    <Link
                      className={`px-0 py-3 inline-flex items-center text-sm  ${
                        selectedTab === 2
                          ? "border-b-4 border-red text-red-500 font-bold -mb-[1px]"
                          : "text-black hover:text-red-500"
                      }`}
                      href="#"
                      onClick={() => handleTab(2)}
                    >
                      ShortListed Jobs
                    </Link>
                    <Link
                      className={`px-0 py-3 inline-flex items-center text-sm   ${
                        selectedTab == 3
                          ? "border-b-4 border-red text-red-500 font-bold -mb-[0px]"
                          : "text-black hover:text-red-500"
                      }`}
                      href="#"
                      onClick={() => handleTab(3)}
                    >
                      Saved Jobs
                    </Link>
                  </div>
                </div>
              </div>
              
              {jobs.length>0?<div className="flex flex-col w-full gap-3 3xl:gap-4">
                <h3 className='text-sm 3xl:text-base text-[#787878]'>{`You have applied for ${totalJobs || 0} jobs`}</h3>
                {
                  jobs.map((job)=>(
                    <div className="flex w-[100%]" key={`job-${job?.id}`}>
                      <JobListingCard {...job} />
                    </div>
                  ))
                }
              </div>
                :
              <div className="pt-10 xl:pt-20 3xl:pt-32 bg-[#f9f9f9] mx-auto w-full px-4 pb-12">
                <Image className="w-[280px] h-[190px] mx-auto 3xl:w-[323px] 3xl:h-[262px]" width={650} height={520} src={'/new-assets/images/no-company.svg'} alt="no-company-found"/>
                <h3 className="text-xl 3xl:text-2xl font-medium text-center">No company found</h3>
                <p className="text-sm 3xl:text-base font-normal text-center">You haven't followed any company yet. Start following to stay updated!</p>
              </div>}
            </div>
            <div className="nudges-bar flex flex-shrink-0 flex-col gap-4 md:gap-6 max-w-[400px] mx-auto lg:mx-0 lg:w-[280px] 2xl:w-[341px]">
                {<ProfileCard/>}
                {<QuickAction/>}
                {<BoostProfile/>}
            </div>
        </div>
    </div>
  )
}
