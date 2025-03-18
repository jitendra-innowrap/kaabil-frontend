'use client'
import CompanyCard, { jobcardtype } from '@/components/Cards/CompanyCard';
import GallerySlider from '@/components/JobDetail/Slider/GallarySlider'
import { getSessionData } from '@/components/utils/deviceId';
import api from '@/Services/Apiservice';
import React, { useEffect, useState } from 'react'

export default function TopCompaniesHiring() {
    const [topCompanies, setTopCompanies] = useState<jobcardtype[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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
        console.clear();
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
    <div className="flex flex-col items-center my-3 md:my-4 xl:my-6 mx-auto">
          <h2 className='font-medium w-full pl-8 text-lg xl:text-xl 3xl:text-2xl 3xl:leading-7 mb-1 xl:mb-2'>Top companies <span className="font-kalam text-red">hiring</span> now</h2>
              <div className="job_listing_center_top_companies_nudge">                        
                  <div className="block">
                      <GallerySlider
                      slides={slides}
                      spaceBetween={10}
                      showNavigation
                      loop={true}
                      autoplay={true}
                      autoplayDuration={3000}
                      freeMode={false}
                      slidesPerView={3}
                      breakpoints={{
                          480:{
                              slidesPerView: 2,
                          },
                          768: {
                            slidesPerView: 3,
                          },
                          1024: {
                            spaceBetween:12,
                            slidesPerView: 2,
                          },
                          1280: {
                            spaceBetween:12,
                            slidesPerView: 3,
                          },
                          1500: {
                            spaceBetween:16,
                            slidesPerView: 3,
                          },
                        }}
                      />
                  </div>
              </div>
          </div>
  )
}
