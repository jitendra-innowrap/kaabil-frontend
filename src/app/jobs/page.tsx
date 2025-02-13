import PlayStoreAppAd from "@/components/Banners/PlaystoreAppAd";
import Breadcrumb from "@/components/Breadcrumb";
import FilterSidebar from "@/components/Filter";
import JobList from "@/components/JobList";
import SearchSection from "@/components/SearchSection";
import Image from "next/image";

export default function Home() {

  return (
    <div className="">
      <div className='container mb-5 xl:mb-6'>
        <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col mb-8 mt-10 md:mt-14 2xl:mt-20 xl:max-w-[570px] 2xl:max-w-[770px]">
                  <Breadcrumb root="Home" category="For Women" />
                <div className="block">
                    <h1 className='my-6 text-2xl md:text-3xl xl:text-7xl 2xl:text-8xl  font-extrabold'>Find a jobs that works for you</h1>
                    <p className="mt-2 md:mt-5 max-w-[700px] text-lg xl:text-xl">
                        <span className='font-bold text-base'>Kaabil </span> is India's First Women's Growth Hub focusing on Women's Jobs, Skills, and Networking.
                    </p>
                </div>
            </div>
            <div className="block">
              <Image
                  src={"/assets/banners/job-banner.png"}
                  width={280}
                  height={350}
                  className='w-[280px] mx-auto xl:w-[350px] !h-auto'
                  alt='Jobs for Women'
                  />
            </div>
        </div>
      </div>
      <div className="container xl:!px-7">
        <div className="seach-section bg-[#2C2C2C] rounded-3xl md:rounded-full px-5 py-8 md:px-14 md:py-12 xl:px-24 xl:py-14 2xl:px-20">
          <SearchSection/>
        </div>
      </div>

      <section className="container">
        <div className="my-5 md:my-8 2xl:my-10 flex items-center gap-5 md:gap-7 xl:gap-10 2xl:gap-12">
          <h2 className="font-bold text-lg md:text-3xl 2xl:text-4xl">Popular Jobs</h2>
          <ul className="flex overflow-auto gap-2 md:gap-4">
            <li className="rounded-[36px] px-4 md:px-6 py-2 md:py-4 border font-medium border-black text-base md:text-lg 2xl:text-2xl w-[70px] min-w-fit text-center capitalize">Retail</li>
            <li className="rounded-[36px] px-4 md:px-6 py-2 md:py-4 border font-medium border-black text-base md:text-lg 2xl:text-2xl w-[70px] min-w-fit text-center capitalize">Manufacturing</li>
            <li className="rounded-[36px] px-4 md:px-6 py-2 md:py-4 border font-medium border-black text-base md:text-lg 2xl:text-2xl w-[70px] min-w-fit text-center capitalize">IT</li>
            <li className="rounded-[36px] px-4 md:px-6 py-2 md:py-4 border font-medium border-black text-base md:text-lg 2xl:text-2xl w-[70px] min-w-fit text-center capitalize">Healthcare</li>
            <li className="rounded-[36px] px-4 md:px-6 py-2 md:py-4 border font-medium border-black text-base md:text-lg 2xl:text-2xl w-[70px] min-w-fit text-center capitalize">Hospitality</li>
            <li className="rounded-[36px] px-4 md:px-6 py-2 md:py-4 border font-medium border-black text-base md:text-lg 2xl:text-2xl w-[70px] min-w-fit text-center capitalize">Travel</li>
          </ul>
        </div>
        <div className="lg:mt-16 2xl:mt-[70px] flex flex-col lg:flex-row gap-5 md:gap-7 xl:gap-10">
            <FilterSidebar/>
            <JobList />
        </div>
      </section>

      <PlayStoreAppAd/>
    </div>
  );
}
