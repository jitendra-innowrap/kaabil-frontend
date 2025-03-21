'use client'
import PlayStoreAppAd from "@/components/Banners/PlaystoreAppAd";
import Breadcrumb from "@/components/Breadcrumb";
import CompanyCard, { jobcardtype } from "@/components/Cards/CompanyCard";
import FilterSidebar from "@/components/Filter";
import GallerySlider from "@/components/JobDetail/Slider/GallarySlider";
import JobList from "@/components/JobList";
import BoostProfile from "@/components/Nudges/Listing/BoostProfile";
import FindCareer from "@/components/Nudges/Listing/FindCareer";
import ProfileCard from "@/components/Nudges/Listing/ProfileCard";
import QuickAction from "@/components/Nudges/Listing/QuickAction";
import ResumeBuilder from "@/components/Nudges/Listing/ResumeBuilder";
import SearchSection from "@/components/SearchSection";
import { getSessionData } from "@/components/utils/deviceId";
import { useAppSelector } from "@/redux/hooks";
import api from "@/Services/Apiservice";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
    const {isLoggedIn} = useAppSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [topCompanies, setTopCompanies] = useState<jobcardtype[]>([]);
  const slides = topCompanies.map((job, index) => (
      <CompanyCard key={index} {...job} />
  )); 
  useEffect(() => {
    const fetchHomedata = async () => {
      try {
        const { deviceId, secret, salt } = getSessionData();
        
        // Ensure session data is available
        if (!deviceId || !secret || !salt) {
          console.log("Session data not available, retrying...");
          setTimeout(fetchHomedata, 1000); // Retry after 1 second
          return;
        }

        const response = await api.get("/Home/homeData");
        console.log(response);
        setTopCompanies(response?.data?.result?.top_companies?.map((comp: any, i: number) => ({
          icon: comp?.company_logo || "/new-assets/icons/company_icon_placeholder.png",
          title: comp?.company_name,
          companyId: `${comp?.id}`,
          jobUrl: '/'
        })));
      } catch (error) {
        console.error("Error fetching job types:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomedata();
  }, []);
  return (
    <main className="bg-[#F9F9F9]">
      
      <section className=''>
        <div className=''>
            <Image src='/new-assets/banners/listing-banner.png' quality={100} alt="" width={1920} height={500}
            className="w-full h-auto"
            />
        </div>
        <div className="">
            <div className="container search-section px-5 pt-8 md:px-14 md:pt-12 xl:px-24 xl:pt-14 2xl:px-20">
                <SearchSection />
            </div>
        </div>
      </section>
      {/* <pre>{JSON.stringify([jobs[0]], null, 2)}</pre> */}
      <section className="container">
        <div className="mt-8 lg:mt-10 2xl:mt-14 pb-5 md:pb-8 xl:pb-14 2xl:pb-16 flex flex-col lg:flex-row gap-5 md:gap-7 lg:gap-4 xl:gap-4 3xl:gap-7">
            <FilterSidebar/>
            <Suspense fallback={<>... Loading</>}>
              <JobList />
            </Suspense>
            <div className="nudges-bar flex flex-shrink-0 flex-col gap-4 md:gap-6 max-w-[400px] mx-auto lg:w-[280px] 2xl:w-[341px]">
              <FindCareer/>
              {isLoading && <ProfileCard/>}
              {isLoading && <QuickAction/>}
              <ResumeBuilder/>
              {isLoading && <BoostProfile/>}
            </div>
        </div>
      </section>

      {!isLoading && <section className="bg-white py-5 xl:py-6">
          <div className="w-full flex flex-col items-center my-5 md:my-8 xl:my-14 2xl:my-16  mx-auto">
          <h2 className='text-black text-center text-2xl md:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[64px] mb-5 xl:mb-8 font-medium'>Top companies <span className="font-kalam text-red">hiring</span> now</h2>
              <div className="container no-pad">                        
                  <div className="block">
                      <GallerySlider
                      slides={slides}
                      spaceBetween={25}
                      showNavigation
                      loop={true}
                      autoplay={true}
                      autoplayDuration={3000}
                      freeMode={false}
                      slidesPerView={3}
                      breakpoints={{
                          480:{
                              slidesPerView: 3,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1024: {
                            spaceBetween:20,
                            slidesPerView: 5,
                          },
                          1500: {
                            spaceBetween:35,
                            slidesPerView: 5,
                          },
                        }}
                      />
                  </div>
              </div>
          </div>
      </section>}
    </main>
  );
}
