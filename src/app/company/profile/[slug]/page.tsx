'use client'
import Image from "next/image";
import PlayStoreAppAd from "@/components/Banners/PlaystoreAppAd";
import GallerySlider from "@/components/JobDetail/Slider/GallarySlider";
import CompanyGallerycard from "@/components/Cards/CompanyGallerycard";
import JobListingCardSmall from "@/components/Cards/JobListingCardSmall";
import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import api from "@/Services/Apiservice";
import toast from "react-hot-toast";
import CompanyGallery from "@/components/Gallary/CompanyGallary";

export default function CompanyDetails() {
const {slug} = useParams();
const [isLoading, setIsLoading] = useState(true);
const [CompanyDetails, setCompanyDetails] = useState<Company>();
const [companyGallary, setCompanyGallary] = useState<(CompanyImage | CompanyVideo)[]>([]);

const [companyJobs, setCompanyJobs] = useState<(CompanyJob | CompanyJobCategory)[]>([])
const jobsSlides = companyJobs
  ?.filter((job): job is CompanyJob => 'id' in job) // Type guard to filter only CompanyJob
  .map((job, index) => (
    <div className="flex w-[100%] md:w-[338px]" key={index}>
      <JobListingCardSmall key={index} detail={job} />
    </div>
  ));
useEffect(() => {
  async function fetchCompanyDetails() {
    try {
      let payload = {
        company_master_id: slug as string,
        flag: '2'
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

      if (responseData.code === 1) {
        setCompanyDetails(responseData.result?.[0]);
        setCompanyJobs(responseData.job)
        setCompanyGallary([...responseData.result?.[0]?.company_image, ...responseData.result?.[0]?.company_videos ])
      }else{
        notFound();
      }
    } catch (error: any) {
      console.error(error);
      toast.error("something went wrong", { position: "bottom-right" });
    }
    setIsLoading(false)
  };
  fetchCompanyDetails();
}, [slug]);



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
  
  return (
    <main>
      <section className="bg-[#0a0100] py-10 xl:py-14 2xl:py-[76px] relative">
            <Image
                src="/new-assets/icons/Comapny-profile-bg.png"
                width={988}
                height={300}
                alt="company profile logo"
                className="absolute md:max-w-[50%] h-full w-auto top-0 right-0 z-0"
                />
          <div className="container relative z-[1]">
            <div className="flex flex-col sm:flex-row gap-5 xl:gap-7 2xl:gap-8">
            <Image
                src={CompanyDetails?.company_logo || ""}
                width={200}
                height={97}
                alt="company profile logo"
                className="rounded-2xl flex-shrink-0 size-16 xl:size-20 2xl:size-40"
                />
                <div className="block">
                  <div className="flex justify-between lg:justify-start gap-5 xl:gap-7 2xl:gap-8 items-center">
                    <div className="block">
                      <h1 className="font-medium text-white text-xl lg:text-3xl">{CompanyDetails?.company_name}</h1>
                      <p className="text-greyText mt-1">{"www.lorem.ipsum"}</p>
                    </div> 
                    <button className="btn-border">+ Follow</button>
                  </div>
                  
                  <div className="flex flex-wrap mt-4 xl:mt-5 2xl:mt-6 gap-5 lg:gap-8 xl:gap-10">
                    <div className="flex gap-2 lg:gap-3 2xl:gap-4">
                      <Image
                      src={'/new-assets/icons/foundation-icon.png'}
                      width={44}
                      height={44}
                      alt="company profile logo"
                      className="rounded-2xl size-8 xl:size-10 2xl:size-11"
                      />
                      <div className="text-white">
                        <strong className="block">Founded</strong>
                        <span>Lorem</span>
                      </div>
                    </div>
                    <div className="flex gap-2 lg:gap-3 2xl:gap-4">
                      <Image
                      src={'/new-assets/icons/employees-icon.png'}
                      width={44}
                      height={44}
                      alt="company profile logo"
                      className="rounded-2xl size-8 xl:size-10 2xl:size-11"
                      />
                      <div className="text-white">
                        <strong className="block">Employees</strong>
                        <span>{CompanyDetails?.company_emp_size}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 lg:gap-3 2xl:gap-4">
                      <Image
                      src={'/new-assets/icons/foundation-icon.png'}
                      width={44}
                      height={44}
                      alt="company profile logo"
                      className="rounded-2xl size-8 xl:size-10 2xl:size-11"
                      />
                      <div className="text-white">
                        <strong className="block">Location</strong>
                        <span>{CompanyDetails?.company_location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 lg:gap-3 2xl:gap-4">
                      <Image
                      src={'/new-assets/icons/foundation-icon.png'}
                      width={44}
                      height={44}
                      alt="company profile logo"
                      className="rounded-2xl size-8 xl:size-10 2xl:size-11"
                      />
                      <div className="text-white">
                        <strong className="block">Industry</strong>
                        <span>Lorem</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </section>
      <section className="container">
          <ul className="flex xl:mx-10 my-5 md:my-8 xl:my-10 gap-5 md:gap-8 xl:gap-10 2xl:gap-12 border-b pb-2 2xl:p-[10px] border-[#D4D4D4]">
            <li className={`text-red md:text-sm font-bold`}>
              <Link href={"#about"}>About</Link>
            </li>
            <li className={`md:text-sm font-normal`}>
              <Link href={"#jobs"} className="text-black">Jobs</Link>
            </li>
            <li className={`md:text-sm font-normal`}>
              <Link href={"#benefits"} className="text-black">Perks & Benefits</Link>
            </li>
          </ul>
          <div id="about" className="py-5 md:py-8 xl:py-14 2xl:py-16 rounded-xl shadow-default">
            <div className="px-5 md:px-8 xl:px-14 2xl:px-16">
              <h2 className="text-lg 2xl:text-xl font-semibold mb-4 md:mb-6 xl:mb-8">About {CompanyDetails?.company_name}</h2>
              <p className="text-sm leading-[32px] mb-4 md:mb-6 xl:mb-8">{CompanyDetails?.company_description
                }</p>
              <h2 className="text-lg 2xl:text-xl font-semibold">Gallery</h2>
            </div>
            <CompanyGallery galleryItems={companyGallary} />
          </div>
          <div id="jobs" className="my-5 md:my-8 xl:my-10 py-5 md:py-8 xl:py-14 2xl:py-16 rounded-xl shadow-default">
            <div className="px-5 md:px-8 xl:px-14 2xl:px-16">
              <h2 className="text-lg 2xl:text-xl font-semibold">{CompanyDetails?.job_count} Jobs in {CompanyDetails?.company_name}</h2>
            </div>
            <div className="block">
                <GallerySlider
                slides={jobsSlides}
                spaceBetween={25}
                showNavigation
                loop={false}
                autoplay={false}
                />
            </div>
          </div>
          <div id="benefits" className="my-5 md:my-8 xl:my-10 py-5 md:py-8 xl:py-14 2xl:py-16 rounded-xl shadow-default">
            <div className="px-5 md:px-8 xl:px-14 2xl:px-16">
              <h2 className="text-lg 2xl:text-xl font-semibold mb-4 md:mb-6 xl:mb-8">Perks & Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 xl:gap-10 2xl:gap-11">
                  {
                    CompanyDetails?.benifits.map((benefit)=>(
                      <div className="block">
                     <Image
                        src={"/new-assets/icons/employee-benefit1.png"}
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
      <section className="py-5 xl:py-6">
          <PlayStoreAppAd />
      </section>
    </main>
  );
}
