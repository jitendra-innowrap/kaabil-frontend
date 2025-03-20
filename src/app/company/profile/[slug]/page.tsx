'use client'
import Image from "next/image";
import PlayStoreAppAd from "@/components/Banners/PlaystoreAppAd";
import GallerySlider from "@/components/JobDetail/Slider/GallarySlider";
import JobListingCardSmall from "@/components/Cards/JobListingCardSmall";
import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import api from "@/Services/Apiservice";
import toast from "react-hot-toast";
import CompanyGallery from "@/components/Gallary/CompanyGallary";
import Tabs from "@/components/Tabs";
import { clearSessionData, getSessionData } from "@/components/utils/deviceId";
import ProfilePhoto from "@/components/Cards/ProfilePhoto";
import { useDispatch } from "react-redux";
import { setProgress } from "@/redux/progressSlice";
import { signOut } from "@/redux/userSlice";

export default function CompanyDetails() {
const {slug} = useParams();
const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(true);
const [CompanyDetails, setCompanyDetails] = useState<Company>();
const [companyGallary, setCompanyGallary] = useState<(CompanyImage | CompanyVideo)[]>([]);
const [isFollowed, setIsFollowed] = useState(false);
const router = useRouter();
const [companyJobs, setCompanyJobs] = useState<(CompanyJob | CompanyJobCategory)[]>([])
const jobsSlides = companyJobs
  ?.filter((job): job is CompanyJob => 'id' in job) // Type guard to filter only CompanyJob
  .map((job, index) => (
      <JobListingCardSmall key={index} detail={job} isCompanyJob />
  ));
useEffect(() => {
  async function fetchCompanyDetails() {
    try {
      let payload = {
        company_master_id: slug as string,
        // company_master_id: '1506' as string,
        flag: '2',
        latitude:'0',
        longitude:'0',
        radius_id:'0'
      };

      const formData = new FormData();
      // ✅ Automatically append all fields from the object
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value); // Convert all values to strings
        });

      const response = await api.post('/Company/getCompanyJobDetail', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseData = response.data as CompanyDetailResponse;

      if (responseData.result?.[0]?.id !== null) {
        setCompanyDetails(responseData.result?.[0]);
        setCompanyJobs(responseData.job)
        setIsFollowed(responseData?.result?.[0]?.company_follow_status=="1")
        setCompanyGallary([...responseData.result?.[0]?.company_image, ...responseData.result?.[0]?.company_videos ])
      }else{
        console.log("Page Not Found:", response);
        // notFound();
        router.push('/')
      }
    } catch (error: any) {
      console.error(error);
      toast.error("something went wrong", { position: "bottom-right" });
    }
    setIsLoading(false)
  };
  fetchCompanyDetails();
}, [slug]);

const handleFollow = async ()=>{
  try {
        const formData = new FormData();
        formData.append("company_master_id", slug as string); // Convert all values to strings
        const response = await api.post(`/Company/followCompany?job_id=${slug}`,formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response?.data?.status)
        if(response.data?.status=="2"){
          toast.success(`You unfollowed ${CompanyDetails?.company_name}!`, { position: 'bottom-right' });
          setIsFollowed(false);
        }else if(response.data?.status=="1"){
          toast.success(`You followed ${CompanyDetails?.company_name}!`, { position: 'bottom-right' });
          setIsFollowed(true);
        }
        if(response.data?.message=="Invalid Hash Request"){
          toast.error("Session Expired Please login !", { position: 'bottom-right' });
          dispatch(signOut());
          dispatch(setProgress(1));
          clearSessionData();
        }
        console.log(response);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
}



if(isLoading){
  return (
    <div className="flex justify-center items-center h-screen">
      <div className='flex space-x-6 justify-center items-center'>
        <span className='sr-only'>Loading...</span>
          <div className='h-6 w-6 bg-red rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div className='h-6 w-6 bg-red rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div className='h-6 w-6 bg-red rounded-full animate-bounce'></div>
      </div>
    </div>
  )
}
 const tabTitles = ["About", "Jobs", "Perks & Benefits"]
  return (
    <main>
      <section className="bg-[#0a0100] py-10 2xl:py-16 3xl:py-[76px] relative">
            <Image
                src="/new-assets/icons/Comapny-profile-bg.png"
                width={988}
                height={300}
                quality={100}
                alt="company profile logo"
                className="absolute md:max-w-[50%] h-full w-auto top-0 right-0 z-0"
                />
          <div className="container relative z-[1]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 xl:gap-7 2xl:gap-8">
              <ProfilePhoto 
                logo={CompanyDetails?.company_logo} 
                styles="rounded-lg bg-white 2xl:rounded-2xl flex-shrink-0 size-16 lg:size-[105px] 2xl:size-36 3xl:size-40" 
                name={CompanyDetails?.company_name}
                index={1}
                />
                <div className="block">
                  <div className="flex 2xl:mt-2 justify-between lg:justify-start gap-5 xl:gap-7 2xl:gap-8">
                    <div className="block">
                      <div className="flex items-center gap-4 3xl:gap-6">
                        <h1 className="font-medium text-white text-2xl 3xl:text-[32px] 3xl:leading-[32px]">{CompanyDetails?.company_name}</h1>
                        <button onClick={handleFollow} className="btn-border w-[100px] 3xl:w-[123px] justify-center text-[##F2F2F2] company-follow-btn whitespace-nowrap !text-[11px] !font-light 3xl:!text-[14px] h-[28px] flex items-center 3xl:h-[38px] !px-3 !border-[0.3px] 3xl:!border-[1px] !rounded 3xl:!rounded-md !py-0">
                          {isFollowed? <img src="/new-assets/icons/follow-check.svg" className="mr-2" alt="check" />: <>+ &nbsp;</> }
                          {isFollowed?"Following":"Follow"}</button>
                      </div>
                      {/* <p className="text-greyText text-xs 2xl:text-base 3xl:text-lg mt-2 2xl:mt-3">{"www.lorem.ipsum"}</p> */}
                    </div> 
                  </div>
                  
                  <div className="flex flex-wrap mt-4 xl:mt-5 2xl:mt-6 gap-5 lg:gap-8 3xl:gap-10">
                    {/* <div className="flex gap-2 lg:gap-3 3xl:gap-4">
                      <Image
                      src={'/new-assets/icons/foundation-icon.png'}
                      width={1320}
                      height={1320}
                      quality={100}
                      alt="company profile logo"
                      className="rounded-2xl size-8 2xl:size-10 3xl:size-11"
                      />
                      <div className="text-white">
                        <strong className="block font-medium text-xs 2xl:text-base -mb-[2px] 2xl:mb">Founded</strong>
                        <span className="text-[10px] 2xl:text-sm font-light">Lorem</span>
                      </div>
                    </div> */}
                    <div className="flex gap-2 lg:gap-3 2xl:gap-4">
                      <Image
                      src={'/new-assets/icons/employee-icon.svg'}
                      width={1320}
                      height={1320}
                      quality={100}
                      alt="company profile logo"
                      className="rounded-2xl size-8 2xl:size-10 3xl:size-11"
                      />
                      <div className="text-white">
                        <strong className="block font-medium text-xs 2xl:text-base -mb-[2px] 2xl:mb">Employees</strong>
                        <span className="text-[10px] 2xl:text-sm font-light">{CompanyDetails?.company_emp_size}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 lg:gap-3 2xl:gap-4">
                      <Image
                      src={'/new-assets/icons/location-icon-round.svg'}
                      width={1320}
                      height={1320}
                      quality={100}
                      alt="company profile logo"
                      className="rounded-2xl size-8 2xl:size-10 3xl:size-11"
                      />
                      <div className="text-white">
                        <strong className="block font-medium text-xs 2xl:text-base -mb-[2px] 2xl:mb">Location</strong>
                        <span className="text-[10px] 2xl:text-sm font-light">{CompanyDetails?.company_location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 lg:gap-3 2xl:gap-4">
                      <Image
                      src={'/new-assets/icons/industry-icon-round.svg'}
                      width={1320}
                      height={1320}
                      quality={100}
                      alt="company profile logo"
                      className="rounded-2xl size-8 2xl:size-10 3xl:size-11"
                      />
                      <div className="text-white">
                        <strong className="block font-medium text-xs 2xl:text-base -mb-[2px] 2xl:mb">Industry</strong>
                        <span className="text-[10px] 2xl:text-sm font-light">{CompanyDetails?.industry_name}</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </section>
      <section className="container">
          <div className="my-5 md:my-8 3xl:my-10">
            <Tabs tabTitles={tabTitles}/>
          </div>
          <div id="about" className="py-3 md:py-5 xl:py-8 2xl:py-12 rounded-xl">
            <div className="px-3 md:px-5 xl:px-8 3xl:px-11">
              <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold mb-2 md:mb-4 3xl:mb-6">About {CompanyDetails?.company_name}</h2>
              <p className="text-xs leading-6 3xl:text-sm 3xl:leading-[32px] mb-4 md:mb-6 xl:mb-8">{CompanyDetails?.company_description
                }</p>
              <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold">Gallery</h2>
            </div>
            <CompanyGallery galleryItems={companyGallary} />
          </div>
          <div id="jobs" className="my-5 md:my-8 xl:my-10 py-5 md:py-8 xl:py-14 2xl:py-16 rounded-xl shadow-default">
            <div className="px-5 md:px-8 xl:px-14 2xl:px-16">
              <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold ">{CompanyDetails?.job_count} Jobs in {CompanyDetails?.company_name}</h2>
            </div>
            <div className="block">
                <GallerySlider
                slides={jobsSlides}
                spaceBetween={25}
                showNavigation
                loop={true}
                arrowOut={false}
                arrowColor="white"
                autoplay={true}
                autoplayDuration={3000}
                freeMode={false}
                slidesPerView={1}
                breakpoints={{
                    768: {
                      slidesPerView: 1.5,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                    1280: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                    1920:{
                      slidesPerView: 4,
                      spaceBetween: 24,
                    }
                  }}
                />
            </div>
          </div>
          <div id="perks-&-benefits" className="my-5 md:my-8 xl:my-10 py-5 md:py-8 xl:py-14 2xl:py-16 rounded-xl shadow-default">
            <div className="px-5 md:px-8 xl:px-14 2xl:px-16">
              <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold mb-2 md:mb-4 3xl:mb-6">Perks & Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 xl:gap-10 2xl:gap-11">
                  {
                    CompanyDetails?.benifits.map((benefit)=>(
                      <div className="block">
                     <Image
                        src={"/new-assets/icons/benefit-icon.svg"}
                        width={45}
                        height={45}
                        alt="company profile logo"
                        className="rounded-2xl size-8 md:size-10 mb-3 md:mb-4"
                        />
                        <h3 className="text-black font-medium mb-2 md:mb-3">{benefit?.name}</h3>
                        <p className="text-[#152B41] text-sm font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatem iste voluptas similique ab eius nisi eaque neque reprehenderit non.</p>

                  </div>
                    ))
                  }
              </div>
            </div>
          </div>
      </section>
      <section className="pt-7 pb-2">
          <PlayStoreAppAd />
      </section>
    </main>
  );
}
