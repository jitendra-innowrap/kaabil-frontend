import Image from "next/image";
import { CiCalendar, CiHeart } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";

export default function Home() {
  const jobdetail = {
    profileicon: "",
    name: "Tech Mahindra",
    website: "www.techmahindra.com",
    options:[
      {icon: "/new-assets/icons/briefcase.png", label: "10-12 years"},
      {icon: "/new-assets/icons/clock.png", label: "Full time"},
      {icon: "/new-assets/icons/wallet.png", label: "₹45000-₹48000"},
      {icon: "/new-assets/icons/map-pin.png", label: "Goregaon, Mumbai"},
    ]
  }
  return (
    <main>
      <section className="bg-[#FDEAC9] py-6 xl:py-8 relative">
      <div className="container relative z-[1]">
        <div className="flex justify-between flex-wrap flex-col sm:flex-row gap-5 xl:gap-7 2xl:gap-8">
          <div className="flex justify-between flex-col sm:flex-row gap-5 xl:gap-7 2xl:gap-8">
            <Image
              src={"/new-assets/icons/Comapny-profile-icon.png"}
              width={68}
              height={68}
              alt="company profile logo"
              className="flex-shrink-0 border border-[#07082833] size-10 md:size-12 xl:size-16 rounded-full"
              />
              <div className="block">
                <div className="flex justify-between lg:justify-start gap-5 xl:gap-7 2xl:gap-8 items-center">
                  <h1 className="font-medium text-[#231F20] text-xl lg:text-3xl">{jobdetail?.name}</h1>
                </div>
                <p className="text-[#231F20] mt-1">{jobdetail?.website}</p>
                <div className="flex items-center flex-wrap mt-4 xl:mt-5 2xl:mt-6 gap-5 lg:gap-8 xl:gap-10">
                  {
                    jobdetail?.options.map((options)=>(
                      <div key={options?.label} className="flex gap-2 lg:gap-3 2xl:gap-4">
                        <Image
                        src={options?.icon}
                        width={80}
                        height={80}
                        alt="company profile logo"
                        className="size-4 md:size-6"
                        />
                        <div className="text-[#231F20]">
                          <strong className="block text-sm font-normal">{options?.label}</strong>
                        </div>
                      </div>
                    ))
                  }
                  <span className="label green text-sm flex font-semibold items-center">4 skills match <FaCheck className="ml-2"/> </span>
                </div>
              </div>
          </div>
          <div className="flex gap-3 md:gap-4 justify-end w-full">
            <div className="bg-white flex-shrink-0 grid place-items-center rounded-full size-8 md:size-10">
              <IoShareSocialOutline className="text-[#4D4D4F]"/>
            </div>
            <button className="text-[#231F20] btn-border flex h-fit items-center gap-2 !border-black">
              save <CiHeart strokeWidth={1.4}/>
            </button>
            <button className="h-fit whitespace-nowrap">apply now</button>
          </div>
        </div>
      </div>
      </section>
      <section className="container my-5 md:my-8 xl:my-10 ">
        <div className="flex gap-5 md:gap-8 2xl:gap-10">
            <div className="p-3 md:p-4 xl:p-8 rounded-xl w-full md:w-[440px] shadow-default">
              <h2 className="text-lg 2xl:text-xl font-semibold mb-4 md:mb-6 xl:mb-8">About this role</h2>
              <div className="bg-[#F8F8F8] font-medium text-black p-3 md:p-4 rounded-xl">115 Applied</div>              
              <div className="flex">
                <CiCalendar className="text-[#777373]"/>
              </div>
            </div>
        </div>
      </section>
    </main>
  );
}
