'use client'
import Image from "next/image";
import PlayStoreAppAd from "@/components/Banners/PlaystoreAppAd";
import SearchSection from "@/components/SearchSection";
import GallerySlider from "@/components/JobDetail/Slider/GallarySlider";
import CompanyCard, { jobcardtype } from "@/components/Cards/CompanyCard";
import JobtypeCard from "@/components/Cards/JobtypeCard";
import IndustryCard, { industryCard } from "@/components/Cards/IndustryCard";
import CareerSkill from "@/components/Cards/CareerSkill";
import FindCareerSection from "@/components/FindeCareerSection";
import SuccessCard from "@/components/Cards/SuccessCard";
import ArticleCard from "@/components/Cards/ArticleCard";
import Interviewlaptop from "@/components/Nudges/Home/Interviewlaptop";
import ResumeBuilder from "@/components/Nudges/Home/ResumeBuilder";
import { useEffect, useState } from "react";
import api from "@/Services/Apiservice";
import { getSessionData } from "@/components/utils/deviceId";
import Link from "next/link";
export default function Home() {
    const [homeData, setHomeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [JobTypes, setJobTypes] = useState([
        {
            icon: "/new-assets/job-types/full-time.png",
            title: "Full Time Jobs",
            jobUrl: "/"
           },
           {
            icon: "/new-assets/job-types/part-time.png",
            title: "Part Time Jobs",
            jobUrl: "/"
           },
           {
            icon: "/new-assets/job-types/intership.png",
            title: "Internship 2",
            jobUrl: "/"
           },
    ])
    const [topCompanies, setTopCompanies] = useState<jobcardtype[]>([]);
    const [topIndustries, setTopIndustries] = useState<industryCard[]>([]);
    // ✅ Fetch roles and job types from API
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
            setHomeData(response?.data?.result);
            setJobTypes(response?.data?.result?.job_types?.map((typ: any, i: number) => ({
              icon: typ?.id==1?
                    "/new-assets/job-types/full-time.png":
                    typ?.id==2?
                    "/new-assets/job-types/part-time.png":
                    "/new-assets/job-types/intership.png",
              title: typ?.name,
              jobUrl: '/'
            })));
            setTopCompanies(response?.data?.result?.top_companies?.map((comp: any, i: number) => ({
              icon: comp?.company_logo || "/new-assets/icons/company_icon_placeholder.png",
              title: comp?.company_name,
              companyId: `${comp?.id}`,
              jobUrl: `/`
            })));
            const colors = ["#FDEAC9", "#DDF4E9", "#F9D1D7", "#E6E7E8"]; // Define the colors array
            setTopIndustries(response?.data?.result?.top_industries?.map((ind: any, i: number) => ({
              icon: ind?.industry_icon || "/new-assets/icons/company_icon_placeholder.png",
              title: ind?.name,
              companyId: '/',
              jobUrl: `/jobs?industries_filter=${ind?.name}`,
              color: colors[i % colors.length], // Assign color cyclically
            })));
          } catch (error) {
            console.error("Error fetching job types:", error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchHomedata();
      }, []);
    const jobsList = [
        {
         icon: "/new-assets/company-icons/image (1).png",
         title: "Jio",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (2).png",
         title: "Mahindra Holidays and Resorts India Ltd",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (3).png",
         title: "Tata Consultancy Services",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (4).png",
         title: "Tech Mahindra Ltd",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (1).png",
         title: "Jio",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (2).png",
         title: "Mahindra Holidays and Resorts India Ltd",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (3).png",
         title: "Tata Consultancy Services",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (4).png",
         title: "Tech Mahindra Ltd",
         jobUrl: "/"
        },
    ]
    const successList = [
        {name: "", role:"", image:"/new-assets/success-slider/slide1.png", video:""},
        {name: "", role:"", image:"/new-assets/success-slider/slide2.png", video:"true"},
        {name: "", role:"", image:"/new-assets/success-slider/slide3.png", video:"true"},
        {name: "", role:"", image:"/new-assets/success-slider/slide4.png", video:""},
        {name: "", role:"", image:"/new-assets/success-slider/slide5.png", video:""},
        {name: "", role:"", image:"/new-assets/success-slider/slide1.png", video:""},
        {name: "", role:"", image:"/new-assets/success-slider/slide2.png", video:"true"},
        {name: "", role:"", image:"/new-assets/success-slider/slide3.png", video:"true"},
        {name: "", role:"", image:"/new-assets/success-slider/slide4.png", video:""},
        {name: "", role:"", image:"/new-assets/success-slider/slide5.png", video:""},
    ]

    const successSlides = successList.map((success, index) => (
        <div className={`success-story-card ${index % 2 === 0 ? 'even' : 'odd'}`}>
          <SuccessCard key={index} {...success} />
        </div>
      ));

    const nudges = [
        <ResumeBuilder/>,
        <Interviewlaptop/>,
    ]
    
      const slides = topCompanies.map((job, index) => (
        <CompanyCard key={index} {...job} />
    )); 
    const articleSlides = jobsList.map((job, index) => (
        <ArticleCard key={index} {...job} />
    ));
    
    const industries = [
        {
            icon: "/new-assets/industeries/icon-1a.png",
            title: "Sales and marketing",
            jobUrl: "/",
            color: "#FDEAC9"
        },
        {
            icon: "/new-assets/industeries/icon-2a.png",
            title: "IT and technology",
            jobUrl: "/",
            color: "#DDF4E9"
        },
        {
            icon: "/new-assets/industeries/icon-3a.png",
            title: "Hospitality and travel",
            jobUrl: "/",
            color: "#F9D1D7"
        },
        {
            icon: "/new-assets/industeries/icon-4a.png",
            title: "Banking and finance",
            jobUrl: "/",
            color: "#E6E7E8"
        },
        {
            icon: "/new-assets/industeries/icon-5a.png",
            title: "Education and training",
            jobUrl: "/",
            color: "#FDEAC9"
        },
    {
        icon: "/new-assets/industeries/icon-1a.png",
        title: "Sales and marketing",
        jobUrl: "/",
        color: "#FDEAC9"
    },
    {
        icon: "/new-assets/industeries/icon-2a.png",
        title: "IT and technology",
        jobUrl: "/",
        color: "#DDF4E9"
    },
    {
        icon: "/new-assets/industeries/icon-3a.png",
        title: "Hospitality and travel",
        jobUrl: "/",
        color: "#F9D1D7"
    },
    {
        icon: "/new-assets/industeries/icon-4a.png",
        title: "Banking and finance",
        jobUrl: "/",
        color: "#E6E7E8"
    },
    {
        icon: "/new-assets/industeries/icon-5a.png",
        title: "Education and training",
        jobUrl: "/",
        color: "#FDEAC9"
    },
]

    const inputSlides = topIndustries?.map((job, index) => (
        <IndustryCard key={index} {...job} />
    ));

    const skills = [
        {
            image: "/new-assets/skills/21-century.png",
            title: "Future ready skills",
            link: "/",
            index: "1"
        },
        {
            image: "/new-assets/skills/digital-literacy.png",
            title: "Computer skills",
            link: "/",
            index: "2"
        },
        {
            image: "/new-assets/skills/interview.png",
            title: "Interview & career skills",
            link: "/",
            index: "3"
        },
        {
            image: "/new-assets/skills/21-century.png",
            title: "Future ready skills",
            link: "/",
            index: "1"
        },
        {
            image: "/new-assets/skills/digital-literacy.png",
            title: "Computer skills",
            link: "/",
            index: "2"
        },
        {
            image: "/new-assets/skills/interview.png",
            title: "Interview & career skills",
            link: "/",
            index: "3"
        },
    ]
    const skillsSlides = skills.map((skill) => (
      <CareerSkill key={skill.index} {...skill} />
    ));

    

    return (
        <main>
            <section className=''>
                <Link href={'/jobs'} className='block'>
                    <Image src='/new-assets/home/banner.png' quality={100} alt="" width={3840} height={1000}
                    className="w-full h-auto"
                    />
                </Link>
                <div className="bg-[#F5F5F5]">
                    <div className="container search-section px-5 py-8 md:px-14 md:py-12 xl:px-24 xl:py-14 2xl:px-20">
                        <h2 className='text-black text-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[64px] mb-5 xl:mb-8 font-medium'>Find your dream job with <span className="font-kalam font-bold text-red">Kaabil!</span></h2>
                        <SearchSection />
                    </div>
                </div>
            </section>

            <section className="bg-[#F6F7F7] py-5 xl:py-6">
                <h2 className='text-black text-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[64px] mb-5 2xl:mb-4 font-medium'>Top companies <span className="font-kalam font-bold text-red">hiring</span> now</h2>
                <div className="w-full flex flex-col items-center mb-5 md:mb-8 2xl:mb-12  mx-auto">
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
                    <button className="mx-auto text-xs 2xl:text-base font-normal 3xl:w-[252px] 3xl:h-[50px] mt-6 md:mt-8">View all companies</button>
                </div>
            </section>

            <section className="section-shadow">
                <div className="w-full flex flex-col items-center py-5 md:py-8 xl:py-14 2xl:py-16 mx-auto">
                <h2 className='text-black text-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[64px] mb-5 xl:mb-6 font-medium'>What type of <span className="font-kalam text-red font-bold">job</span> are you looking for?</h2>
                <div className="container small grid grid-cols-1 lg:grid-cols-3 gap-4 2xl:gap-6 w-full mb-5 md:mb-8 xl:mb-[70px] 2xl:mb-[84px]">
                    {JobTypes.map((job, index) => (
                    <JobtypeCard key={index} {...job} />
                    ))}
                </div>
                <h2 className='text-black text-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[64px] mb-5 xl:mb-6 font-medium'>Explore job opportunities across top  <span className="font-kalam text-red font-bold">industries</span> </h2>

                    <div className="container no-pad mb-4">                        
                        <div className="block">
                            <GallerySlider
                            slides={inputSlides}
                            spaceBetween={25}
                            showNavigation
                            loop={true}
                            arrowShadows
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
                                1280: {
                                  spaceBetween:20,
                                  slidesPerView: 5,
                                },
                                1500: {
                                  spaceBetween:30,
                                  slidesPerView: 5,
                                },
                              }}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-[#F6F7F7]">
                <div className="container no-pad py-5 md:py-8 xl:py-14 2xl:py-16">
                    <div className="bg-[#FEF5E4] rounded-[24px] p-4 px-2 flex flex-col lg:flex-row gap-4 lg:gap-6">
                        <div className="w-full flex items-center">
                        <h2 className="mx-auto max-w-[300px] xl:max-w-[400px] flex-shrink-0 2xl:max-w-[500px] text-xl md:text-2xl xl:text-3xl 2xl:text-[40px] 2xl:leading-[52px] font-medium">Kaabil helps you create resumes, practice for interviews, and get jobs!</h2>
                        </div>
                        <div className="lg:w-1/2 home-nudges">
                        <GallerySlider
                        slides={nudges}
                        arrowOut={false}
                        spaceBetween={20}
                        showNavigation
                        loop={true}
                        autoplay={true}
                            autoplayDuration={3000}
                            freeMode={false}
                        slidesPerView={1}
                        />
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-5 xl:pb-6 bg-[#F5F5F5]">
                <div className="w-full flex flex-col items-center mb-5 md:mb-8 xl:mb-14 2xl:mb-16  mx-auto">
                <div className="section-heading mb-5 xl:mb-8 container">
                    <h2 className='text-black text-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[64px] font-medium mb-0'>Learn key <span className="font-kalam text-red font-bold ">skills</span> for career success</h2>
                    <p className="font-normal text-center xl:text-lg 2xl:text-xl 2xl:leading-9">Access all the tools and skills to transform your professional journey from where you are to where you want to be.</p>
                </div>
                <div className="container no-pad">                        
                    <div className="block">
                        <GallerySlider
                        slides={skillsSlides}
                        spaceBetween={20}
                        showNavigation
                        loop={true}
                        autoplay={false}
                            autoplayDuration={3000}
                            freeMode={false}
                        slidesPerView={1}
                        breakpoints={{
                            480:{
                                slidesPerView: 1.3,
                            },
                            768: {
                              slidesPerView: 2.5,
                            },
                            1024: {
                              slidesPerView: 3,
                            },
                          }}
                        />
                    </div>
                </div>
                </div>
            </section>
            <section className="pt-5 xl:pt-6 bg-[#eeefef] relative">
                <div className="container small w-full flex flex-col items-center mt-5 md:mt-8 xl:mt-12 mx-auto">
                <FindCareerSection/>
                </div>
            </section>
            <section className="">
                <div className="container gap-5 xl:gap-10 2xl:gap-14 flex flex-col md:flex-row-reverse items-center py-5 md:py-8 xl:py-14 2xl:py-16  mx-auto">
                    <div className="section-heading mb-5 xl:mb-8 flex-1">
                        <h2 className='text-black text-start text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[64px] font-medium mb-2'>Why choose <span className="font-kalam font-bold text-red">Kaabil?</span></h2>
                        <p className="font-normal xl:text-sm 2xl:text-lg 2xl:leading-[29px]"><span className="font-semibold">Kaabil, in partnership with Mahindra Rise,</span> empowers women jobseekers, especially first-timers, by connecting them to diverse opportunities, local jobs, and skill development resources.</p>
                        <div className="my-5 xl:my-7 2xl:my-8 space-y-3 md:space-y-5 2xl:space-y-6">
                            <div className="flex gap-3 xl:gap-4 2xl:gap-6 items-center">
                                <strong className="text-white flex-shrink-0 grid place-items-center bg-[#EE7487] rounded-full size-7 2xl:size-[45px]">1</strong>
                                <div className="block">
                                    <h5 className="font-semibold md:text-xs 2xl:text-xl">Jobs tailored for you:</h5>
                                    <p className="md:text-xs 2xl:text-xl">Find roles that match your skills and career goals.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 xl:gap-4 2xl:gap-6 items-center">
                                <strong className="text-white flex-shrink-0 grid place-items-center bg-[#EE7487] rounded-full size-7 2xl:size-[45px]">2</strong>
                                <div className="block">
                                    <h5 className="font-semibold md:text-xs 2xl:text-xl">Entry-level friendly:</h5>
                                    <p className="md:text-xs 2xl:text-xl">Perfect for young girls starting their careers.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 xl:gap-4 2xl:gap-6 items-center">
                                <strong className="text-white flex-shrink-0 grid place-items-center bg-[#EE7487] rounded-full size-7 2xl:size-[45px]">3</strong>
                                <div className="block">
                                    <h5 className="font-semibold md:text-xs 2xl:text-xl">Upskill as you go:</h5>
                                    <p className="md:text-xs 2xl:text-xl">Learn new skills while applying for jobs.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 xl:gap-4 2xl:gap-6 items-center">
                                <strong className="text-white flex-shrink-0 grid place-items-center bg-[#EE7487] rounded-full size-7 2xl:size-[45px]">4</strong>
                                <div className="block">
                                    <h5 className="font-semibold md:text-xs 2xl:text-xl">Trusted by employers:</h5>
                                    <p className="md:text-xs 2xl:text-xl">Connect with companies looking for fresh talent.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 2xl:gap-[76px] pt-3 mb-4 2xl:mb-0">
                            <div className="text-red">
                                <span className="font-semibold text-lg md:text-3xl 2xl:text-[40px] leading-[140%]">500k+</span> <br /> 
                                <span className="block text-xs xl:text-sm text-center w-[105px]">Women on the platform</span>
                            </div>
                            <div className="text-red">
                                <span className="font-semibold text-lg md:text-3xl 2xl:text-[40px] leading-[140%]">3000+</span> <br /> 
                                <span className="block text-xs xl:text-sm text-center w-[110px]">Women joined skill program</span>
                            </div>
                            <div className="text-red">
                                <span className="font-semibold text-lg md:text-3xl 2xl:text-[40px] leading-[140%]">3000+</span> <br /> 
                                <span className="block text-xs xl:text-sm text-center w-[130px]">Women got hired</span>
                            </div>
                        </div>
                        <button className='text-xs 2xl:text-base w-[170px] 2xl:w-[247px] 2xl:h-[50px] mt-3 2xl:mt-6 3xl:mt-[36px]'>Read More</button>
                    </div>
                    <div className="flex-1 order-1">                        
                        <Image src={`/new-assets/banners/why-choose-home.png`} width={704} height={735} alt="" className="w-full h-auto" />
                    </div>
                </div>
            </section>
            <section className="bg-red">
                <div className="w-full flex flex-col items-center py-5 md:py-8 xl:py-14 2xl:py-[50px] mx-auto">
                    <div className="section-heading mb-5">
                        <h2 className='text-white text-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[46px] font-medium mb-2'>Meet the women who’ve found <br />
                        <span className="font-kalam font-bold">career success  </span>with Kaabil.</h2>
                    </div>
                    <div className="container big !px-5">                        
                        <div className="block">
                            <GallerySlider
                            slides={successSlides}
                            spaceBetween={20}
                            showNavigation
                            loop={true}
                            autoplay={true}
                            arrowOut={false}
                            autoplayDuration={3000}
                            freeMode={false}
                            arrowColor="white"
                            slidesPerView={1.4}
                            breakpoints={{
                                480:{
                                    slidesPerView: 2,
                                },
                                768: {
                                  slidesPerView: 2.5,
                                },
                                1024: {
                                  slidesPerView: 4,
                                },
                                1200: {
                                  slidesPerView: 5,
                                },
                                1500: {
                                  slidesPerView: 5,
                                },
                              }}
                            />
                        </div>
                    </div> 
                    <button className="btn-border 2xl:w-[218px] 2xl:h-[50px] text-xs 2xl:text-base mt-6 md:mt-8 2xl:mt-10">View All Stories</button>
                </div>
            </section>
            <section className="bg-[#F8F8F8]">
                <div className="w-full flex flex-col py-5 md:py-8 xl:py-14 2xl:py-[68px] mb-3 mx-auto">
                    <div className="container no-pad">                        
                        <div className="section-heading md:ml-[70px]">
                            <h2 className='text-black text-start text-2xl md:text-3xl 2xl:text-[48px] 2xl:leading-[54px]  font-normal mb-2'>Articles</h2>
                            <p className=" text-base xl:text-lg 2xl:text-2xl">Register  to receive weekly articles, tips and more from our team</p>
                        </div>
                        <div className="block">
                            <GallerySlider
                            slides={articleSlides}
                            spaceBetween={25}
                            showNavigation
                            loop={true}
                            autoplay={true}
                            autoplayDuration={3000}
                            freeMode={false}
                            slidesPerView={1}
                            breakpoints={{
                                768: {
                                  slidesPerView: 1.5,
                                },
                                1024: {
                                  slidesPerView: 2,
                                },
                                1200: {
                                  slidesPerView: 3,
                                },
                                1500: {
                                  slidesPerView: 3,
                                },
                              }}
                            />
                        </div>
                    </div>
                    <button className="mx-auto mt-8 text-xs 2xl:text-base 2xl:mt-8 lg:min-w-[150px] 2xl:min-w-[200px]">View All</button>
                </div>
                <PlayStoreAppAd />
            </section>
        </main>
    );
}
