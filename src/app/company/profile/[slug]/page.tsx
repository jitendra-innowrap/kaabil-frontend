import Image from "next/image";
import PlayStoreAppAd from "@/components/Banners/PlaystoreAppAd";
import GallerySlider from "@/components/JobDetail/Slider/GallarySlider";
import CompanyGallerycard from "@/components/Cards/CompanyGallerycard";
import JobListingCard from "@/components/Cards/JobListingCard";

export default function Home() {
  const profiledata = {
    profileicon: "",
    name: "Tech Mahindra",
    website: "www.techmahindra.com",
    options:[
      {icon: "/new-assets/icons/foundation-icon.png", label: "Founded", value: "1986"},
      {icon: "/new-assets/icons/employees-icon.png", label: "Employees", value: "10k+"},
      {icon: "/new-assets/icons/location-icon.png", label: "Location", value: "pune, Maharashtra"},
      {icon: "/new-assets/icons/industry-icon.png", label: "Industry", value: "IT Services and IT Consulting"},
    ]
  }
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
  
  const gallerySlides = successList.map((job, index) => (
    <CompanyGallerycard key={index} {...job} />
  ));
  const jobsSlides = successList.map((job, index) => (
    <div className="flex w-[100%] md:w-[338px]" key={index}>
      <JobListingCard key={index} {...job} />
    </div>
    ));
  return (
    <main>
      <section className="bg-[#0a0100] py-10 xl:py-14 2xl:py-[76px] relative">
            <Image
                src={"/new-assets/icons/Comapny-profile-bg.png"}
                width={988}
                height={300}
                alt="company profile logo"
                className="absolute md:max-w-[50%] h-full w-auto top-0 right-0 z-0"
                />
          <div className="container relative z-[1]">
            <div className="flex flex-col sm:flex-row gap-5 xl:gap-7 2xl:gap-8">
            <Image
                src={"/new-assets/icons/Comapny-profile-icon.png"}
                width={200}
                height={97}
                alt="company profile logo"
                className="rounded-2xl flex-shrink-0 size-16 xl:size-20 2xl:size-40"
                />
                <div className="block">
                  <div className="flex justify-between lg:justify-start gap-5 xl:gap-7 2xl:gap-8 items-center">
                    <h1 className="font-medium text-white text-xl lg:text-3xl">{profiledata?.name}</h1> <button className="btn-border">+ Follow</button>
                  </div>
                  <p className="text-greyText mt-1">{profiledata?.website}</p>
                  <div className="flex flex-wrap mt-4 xl:mt-5 2xl:mt-6 gap-5 lg:gap-8 xl:gap-10">
                    {
                      profiledata?.options.map((options)=>(
                        <div key={options?.label} className="flex gap-2 lg:gap-3 2xl:gap-4">
                          <Image
                          src={options?.icon}
                          width={44}
                          height={44}
                          alt="company profile logo"
                          className="rounded-2xl size-8 xl:size-10 2xl:size-11"
                          />
                          <div className="text-white">
                            <strong className="block">{options?.label}</strong>
                            <span>{options?.value}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
            </div>
          </div>
      </section>
      <section className="container">
          <ul className="flex xl:mx-10 my-5 md:my-8 xl:my-10 gap-5 md:gap-8 xl:gap-10 2xl:gap-12 border-b pb-2 2xl:p-[10px] border-[#D4D4D4]">
            <li className={`text-red md:text-sm font-bold`}>About</li>
            <li className={`md:text-sm font-normal`}>Jobs</li>
            <li className={`md:text-sm font-normal`}>Perks & Benefits</li>
          </ul>
          <div className="py-5 md:py-8 xl:py-14 2xl:py-16 rounded-xl shadow-default">
            <div className="px-5 md:px-8 xl:px-14 2xl:px-16">
              <h2 className="text-lg 2xl:text-xl font-semibold mb-4 md:mb-6 xl:mb-8">About Tech Mahindra</h2>
              <p className="text-sm leading-[32px] mb-4 md:mb-6 xl:mb-8">Tech Mahindra offers technology consulting and digital solutions to global enterprises across industries, enabling transformative scale at unparalleled speed. With 150,000+ professionals across 90+ countries helping 1100+ clients, TechM provides a full spectrum of services including consulting, information technology, enterprise applications, business process services, engineering services, network services, customer experience & design services, AI & analytics, and cloud & infrastructure services. It is the first Indian company in the world to have been awarded the Sustainable Markets Initiative’s Terra Carta Seal, in recognition of actively leading the charge to create a climate and nature-positive future.Tech Mahindra (NSE: TECHM) is part of the Mahindra Group, founded in 1945, one of the largest and most admired multinational federations of companies.Visit www.techmahindra.com to #ScaleAtSpeed</p>
              <h2 className="text-lg 2xl:text-xl font-semibold">Gallery</h2>
            </div>
            <div className="block">
                <GallerySlider
                slides={gallerySlides}
                spaceBetween={25}
                showNavigation
                loop={false}
                autoplay={false}
                />
            </div>
          </div>
          <div className="my-5 md:my-8 xl:my-10 py-5 md:py-8 xl:py-14 2xl:py-16 rounded-xl shadow-default">
            <div className="px-5 md:px-8 xl:px-14 2xl:px-16">
              <h2 className="text-lg 2xl:text-xl font-semibold">45 Jobs in Tech Mahindra</h2>
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
          <div className="my-5 md:my-8 xl:my-10 py-5 md:py-8 xl:py-14 2xl:py-16 rounded-xl shadow-default">
            <div className="px-5 md:px-8 xl:px-14 2xl:px-16">
              <h2 className="text-lg 2xl:text-xl font-semibold mb-4 md:mb-6 xl:mb-8">Perks & Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 xl:gap-10 2xl:gap-11">
                  {
                    successList.map((benefit)=>(
                      <div className="block">
                     <Image
                        src={"/new-assets/icons/employee-benefit1.png"}
                        width={45}
                        height={45}
                        alt="company profile logo"
                        className="rounded-2xl size-8 md:size-10 mb-3 md:mb-4"
                        />
                        <h3 className="text-black font-medium mb-2 md:mb-3">Flexi Work Arrangement</h3>
                        <p className="text-[#152B41] text-sm font-normal">To help associates balance their professional and personal commitments during emergency situations.</p>

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
