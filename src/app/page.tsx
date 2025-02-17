

import Image from "next/image";
import PlayStoreAppAd from "@/components/Banners/PlaystoreAppAd";
import SearchSection from "@/components/SearchSection";
import GallerySlider from "@/components/JobDetail/Slider/GallarySlider";
import CompanyCard from "@/components/Cards/CompanyCard";
import JobtypeCard from "@/components/Cards/JobtypeCard";
import IndustryCard from "@/components/Cards/IndustryCard";
import CareerSkill from "@/components/Cards/CareerSkill";
import FindCareerSection from "@/components/FindeCareerSection";
import SuccessCard from "@/components/Cards/SuccessCard";
import ArticleCard from "@/components/Cards/ArticleCard";
import Interviewlaptop from "@/components/Nudges/Home/Interviewlaptop";
import ResumeBuilder from "@/components/Nudges/Home/ResumeBuilder";
export default function Home() {
    const jobsList = [
        {
         icon: "/new-assets/company-icons/image (1).png",
         title: "Senior Software Engineer",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (2).png",
         title: "Senior Software Engineer",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (3).png",
         title: "Senior Software Engineer",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (4).png",
         title: "Senior Software Engineer",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (1).png",
         title: "Senior Software Engineer",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (2).png",
         title: "Senior Software Engineer",
         jobUrl: "/"
        },
        {
         icon: "/new-assets/company-icons/image (3).png",
         title: "Senior Software Engineer",
         jobUrl: "/"
        },
    ]
    const successList = [
        {name: "", role:"", image:"", video:""},
        {name: "", role:"", image:"", video:""},
        {name: "", role:"", image:"", video:""},
        {name: "", role:"", image:"", video:""},
        {name: "", role:"", image:"", video:""},
        {name: "", role:"", image:"", video:""},
        {name: "", role:"", image:"", video:""},
        {name: "", role:"", image:"", video:""},
    ]

    const successSlides = successList.map((job, index) => (
        <SuccessCard key={index} {...job} />
      ));

    const nudges = [
        <Interviewlaptop/>,
        <ResumeBuilder/>
    ]
    
      const slides = jobsList.map((job, index) => (
        <CompanyCard key={index} {...job} />
    )); 
    const articleSlides = jobsList.map((job, index) => (
        <ArticleCard key={index} {...job} />
    ));
    
    const industries = [
    {
        icon: "/new-assets/industeries/icon-1.png",
        title: "Sales and marketing",
        jobUrl: "/",
        color: "#FDEAC9"
    },
    {
        icon: "/new-assets/industeries/icon-2.png",
        title: "IT and technology",
        jobUrl: "/",
        color: "#DDF4E9"
    },
    {
        icon: "/new-assets/industeries/icon-3.png",
        title: "Hospitality and travel",
        jobUrl: "/",
        color: "#F9D1D7"
    },
    {
        icon: "/new-assets/industeries/icon-4.png",
        title: "Banking and finance",
        jobUrl: "/",
        color: "#E6E7E8"
    },
    {
        icon: "/new-assets/industeries/icon-1.png",
        title: "Education and training",
        jobUrl: "/",
        color: "#FDEAC9"
    },
    {
        icon: "/new-assets/industeries/icon-2.png",
        title: "Senior Software Engineer",
        jobUrl: "/",
        color: "#E6E7E8"
    },
    {
        icon: "/new-assets/industeries/icon-3.png",
        title: "Senior Software Engineer",
        jobUrl: "/",
        color: "#F9D1D7"
    },
]

    const inputSlides = industries.map((job, index) => (
        <IndustryCard key={index} {...job} />
    ));
    const skillsSlides = industries.map((job, index) => (
      <CareerSkill key={index} {...job} />
    ));

    const JobTypes = [
        {
            icon: "/new-assets/job-types/full-time.png",
            title: "Full Time",
            jobUrl: "/"
           },
           {
            icon: "/new-assets/job-types/intership.png",
            title: "Internship",
            jobUrl: "/"
           },
           {
            icon: "/new-assets/job-types/part-time.png",
            title: "Part Time",
            jobUrl: "/"
           },
    ]

    return (
        <main>
            <section className=''>
                <div className=''>
                    <Image src='/new-assets/banners/Hero banner.png' quality={100} alt="" width={1920} height={500}
                    className="w-full h-auto"
                    />
                </div>
                <div className="bg-[#F5F5F5]">
                    <div className="container search-section px-5 py-8 md:px-14 md:py-12 xl:px-24 xl:py-14 2xl:px-20">
                        <h2 className='text-black text-center text-2xl md:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[64px] mb-5 xl:mb-8 font-medium'>Find your dream job with <span className="font-kalam text-red">Kaabil!</span></h2>
                        <SearchSection />
                    </div>
                </div>
            </section>

            <section className="bg-[#F5F5F5] py-5 xl:py-6">
                <h2 className='text-black text-center text-2xl md:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[64px] mb-5 xl:mb-8 font-medium'>Top companies <span className="font-kalam text-red">hiring</span> now</h2>
                <div className="w-full flex flex-col items-center my-5 md:my-8 xl:my-14 2xl:my-16  mx-auto">
                    <div className="container">                        
                        <div className="block">
                            <GallerySlider
                            slides={slides}
                            spaceBetween={25}
                            showNavigation
                            loop={false}
                            autoplay={false}
                            />
                        </div>
                    </div>
                    <button className="mx-auto mt-8 md:mt-10 2xl:mt-14">View all companies</button>
                </div>
            </section>

            <section className="py-5 xl:py-6">
                <div className="w-full flex flex-col items-center my-5 md:my-8 xl:my-14 2xl:my-16  mx-auto">
                <h2 className='text-black text-center text-2xl md:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[64px] mb-5 xl:mb-8 font-medium'>What type of <span className="font-kalam text-red">job</span> are you looking for?</h2>
                <div className="container small grid grid-cols-1 xl:grid-cols-3 gap-4 w-full mb-5 md:mb-8 xl:mb-14 2xl:mb-16">
                    {JobTypes.map((job, index) => (
                    <JobtypeCard key={index} {...job} />
                    ))}
                </div>
                <h2 className='text-black text-center text-2xl md:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[64px] mb-5 xl:mb-8 font-medium'>Explore job opportunities across top  <span className="font-kalam text-red">industries</span> </h2>

                    <div className="container">                        
                        <div className="block">
                            <GallerySlider
                            slides={inputSlides}
                            spaceBetween={25}
                            showNavigation
                            loop={false}
                            autoplay={false}
                            />
                        </div>
                    </div>
                    <button className="mx-auto mt-8 md:mt-10 2xl:mt-14">View all companies</button>
                </div>
            </section>
            <section className="bg-[#F5F5F5]">
                <div className="container py-5 md:py-8 xl:py-14 2xl:py-16">
                    <div className="bg-[#FEF5E4] rounded-[24px] p-6 2xl:p-9 flex flex-col lg:flex-row gap-4 xl:gap-6">
                        <div className="w-full flex items-center">
                        <h2 className="mx-auto max-w-[400px] flex-shrink-0 2xl:max-w-[500px] text-xl md:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[52px] font-medium">Kaabil helps you create resumes, practice for interviews, and get jobs!</h2>
                        </div>
                        <div className="lg:w-1/2">
                        <GallerySlider
                        slides={nudges}
                        arrowOut={false}
                        spaceBetween={20}
                        showNavigation
                        loop={false}
                        autoplay={false}
                        slidesPerView={1}
                        />
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 xl:py-6 bg-[#F5F5F5]">
                <div className="w-full flex flex-col items-center my-5 md:my-8 xl:my-14 2xl:my-16  mx-auto">
                <div className="section-heading mb-5 xl:mb-8 container">
                    <h2 className='text-black text-center text-2xl md:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[64px] font-medium mb-2'>Learn key <span className="font-kalam text-red">skills</span> for career success</h2>
                    <p className="font-normal text-center xl:text-lg 2xl:text-xl 2xl:leading-9">Access all the tools and skills to transform your professional journey from where you are to where you want to be.</p>
                </div>
                <div className="container">                        
                    <div className="block">
                        <GallerySlider
                        slides={skillsSlides}
                        spaceBetween={20}
                        showNavigation
                        loop={false}
                        autoplay={false}
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
                            1200: {
                              slidesPerView: 4,
                            },
                            1500: {
                              slidesPerView: 5,
                            },
                          }}
                        />
                    </div>
                </div>
                </div>
            </section>
            <section className="pt-5 xl:pt-6 bg-[#E6E7E8]">
                <div className="container small w-full flex flex-col items-center mt-5 md:mt-8 xl:mt-14 2xl:mt-16  mx-auto">
                <FindCareerSection/>
                </div>
            </section>
            <section className="py-5 xl:py-6">
                <div className="container small gap-5 xl:gap-10 2xl:gap-14 flex flex-col md:flex-row-reverse items-center my-5 md:my-8 xl:my-14 2xl:my-16  mx-auto">
                    <div className="section-heading mb-5 xl:mb-8 flex-1">
                        <h2 className='text-black text-start text-2xl md:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[64px] font-medium mb-2'>Why choose <span className="font-kalam text-red">Kaabil?</span></h2>
                        <p className="font-normal xl:text-lg 2xl:text-xl 2xl:leading-9"><span className="font-semibold">Kaabil, in partnership with Mahindra Rise,</span> empowers women jobseekers, especially first-timers, by connecting them to diverse opportunities, local jobs, and skill development resources.</p>
                        <div className="my-5 xl:my-7 2xl:my-8 space-y-3 md:space-y-7 2xl:space-y-8">
                            <div className="flex gap-3 xl:gap-4 2xl:gap-6 items-center">
                                <strong className="text-white flex-shrink-0 grid place-items-center bg-[#EE7487] rounded-full size-7 2xl:size-12">1</strong>
                                <div className="block">
                                    <h5 className="font-semibold md:text-lg 2xl:text-xl">Jobs tailored for you:</h5>
                                    <p className="md:text-lg 2xl:text-xl">Find roles that match your skills and career goals.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 xl:gap-4 2xl:gap-6 items-center">
                                <strong className="text-white flex-shrink-0 grid place-items-center bg-[#EE7487] rounded-full size-7 2xl:size-12">2</strong>
                                <div className="block">
                                    <h5 className="font-semibold md:text-lg 2xl:text-xl">Entry-level friendly:</h5>
                                    <p className="md:text-lg 2xl:text-xl">Perfect for young girls starting their careers.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 xl:gap-4 2xl:gap-6 items-center">
                                <strong className="text-white flex-shrink-0 grid place-items-center bg-[#EE7487] rounded-full size-7 2xl:size-12">3</strong>
                                <div className="block">
                                    <h5 className="font-semibold md:text-lg 2xl:text-xl">Upskill as you go:</h5>
                                    <p className="md:text-lg 2xl:text-xl">Learn new skills while applying for jobs.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 xl:gap-4 2xl:gap-6 items-center">
                                <strong className="text-white flex-shrink-0 grid place-items-center bg-[#EE7487] rounded-full size-7 2xl:size-12">4</strong>
                                <div className="block">
                                    <h5 className="font-semibold md:text-lg 2xl:text-xl">Trusted by employers:</h5>
                                    <p className="md:text-lg 2xl:text-xl">Connect with companies looking for fresh talent.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="text-red xl:text-lg">
                                <span className="font-semibold text-3xl md:text-4xl 2xl:text-[40px] leading-[140%]">500k+</span> <br /> Women on the platform
                            </div>
                            <div className="text-red xl:text-lg">
                                <span className="font-semibold text-3xl md:text-4xl 2xl:text-[40px] leading-[140%]">500k+</span> <br /> Women on the platform
                            </div>
                            <div className="text-red xl:text-lg">
                                <span className="font-semibold text-3xl md:text-4xl 2xl:text-[40px] leading-[140%]">500k+</span> <br /> Women on the platform
                            </div>
                        </div>

                    </div>
                    <div className="flex-1 order-1">                        
                        <Image src={`/new-assets/banners/why-choose-home.png`} width={704} height={735} alt="" className="w-full h-auto" />
                    </div>
                </div>
            </section>
            <section className="py-5 xl:py-6 bg-red">
                <div className="w-full flex flex-col items-center my-5 md:my-8 xl:my-14 2xl:my-16 mx-auto">
                    <div className="section-heading mb-5 xl:mb-8 ">
                        <h2 className='text-white text-center text-2xl md:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[46px] font-medium mb-2'>Meet the women who’ve found <br />
                        <span className="font-kalam">career success  </span>with Kaabil.</h2>
                    </div>
                    <div className="container !px-5">                        
                        <div className="block">
                            <GallerySlider
                            slides={successSlides}
                            spaceBetween={20}
                            showNavigation
                            loop={false}
                            autoplay={false}
                            slidesPerView={1.4}
                            breakpoints={{
                                480:{
                                    slidesPerView: 2,
                                },
                                768: {
                                  slidesPerView: 2.5,
                                },
                                1024: {
                                  slidesPerView: 3,
                                },
                                1200: {
                                  slidesPerView: 4,
                                },
                                1500: {
                                  slidesPerView: 5,
                                },
                              }}
                            />
                        </div>
                    </div>
                    <button className="btn-border mt-6 md:mt-8 2xl:mt-10">View All Stories</button>
                </div>
            </section>
            <section className="py-5 xl:py-6 bg-[#F8F8F8]">
                <div className="w-full flex flex-col my-5 md:my-8 xl:my-14 2xl:my-16  mx-auto">
                    <div className="container">                        
                        <div className="section-heading md:ml-[70px]">
                            <h2 className='text-black text-start text-2xl md:text-3xl xl:text-4xl 2xl:text-[48px] 2xl:leading-[54px]  font-medium'>Articles</h2>
                            <p className="mb-5 xl:mb-8">Register  to receive weekly articles, tips and more from our team</p>
                        </div>
                        <div className="block">
                            <GallerySlider
                            slides={articleSlides}
                            spaceBetween={25}
                            showNavigation
                            loop={false}
                            autoplay={false}
                            slidesPerView={1}
                            breakpoints={{
                                768: {
                                  slidesPerView: 1.5,
                                },
                                1024: {
                                  slidesPerView: 2,
                                },
                                1200: {
                                  slidesPerView: 2.5,
                                },
                                1500: {
                                  slidesPerView: 3,
                                },
                              }}
                            />
                        </div>
                    </div>
                    <button className="mx-auto mt-8 md:mt-10 2xl:mt-14 w-[200px]">View All</button>
                </div>
                <PlayStoreAppAd />
            </section>
        </main>
    );
}
