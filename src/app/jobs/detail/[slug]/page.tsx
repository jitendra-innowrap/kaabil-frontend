import JobListingCard from "@/components/Cards/JobListingCard";
import GallerySlider from "@/components/JobDetail/Slider/GallarySlider";
import Map from "@/components/Map";
import ReadMoreComponent from "@/components/utils/ReadMoreText";
import Image from "next/image";
import Link from "next/link";
import { CiCalendar, CiHeart } from "react-icons/ci";
import { FaCheck, FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrFacebookOption } from "react-icons/gr";
import { IoShareSocialOutline } from "react-icons/io5";

export default function Home() {
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
    
    const jobsSlides = successList.map((job, index) => (
        <div className="flex w-[100%] md:w-[338px]" key={index}>
          <JobListingCard key={index} {...job} />
        </div>
        ));
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
              className="flex-shrink-0 border border-[#07082833] size-16 xl:size-16 rounded-full"
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
          <div className="flex gap-3 md:gap-4 justify-end items-end">
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
      <section className="container mt-5 md:mt-8 xl:mt-10 mb-6 md:mb-10 xl:mb-14 2xl:mb-16 ">
        <div className="grid  grid-cols-12 gap-4 md:gap-6 2xl:gap-10">
            <div className="h-fit order-2  col-span-12 lg:col-span-4 2xl:col-span-3 job-detail-sidebar p-3 md:p-4 xl:p-8 rounded-xl w-full shadow-default">
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5">About this role</h2>
              <div className="bg-[#F8F8F8] font-medium text-black p-3 md:p-4 rounded-xl mb-2 md:mb-4 xl:mb-5">115 Applied</div>              
              <div className="flex items-center">
                <CiCalendar className=" flex-shrink-0 text-[#777373] mr-1 md:mr-2"/>
                  <span className="whitespace-nowrap">Job Posted On</span>
                  <span className="justify-self-end w-full text-end">Jan 1, 2025</span>
              </div>
              <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5">Industry</h2>
              <div className="flex flex-wrap gap-1 md:gap-2">
                <div className="label grey">Marketing</div>
                <div className="label lightgreen">It Security</div>
                <div className="label lightgreen">It Rist Management</div>
              </div>
              <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5 flex items-center gap-2">
                <Image src="/new-assets/icons/idea-bulb.png" className="size-6 inline-block" width={150} height={150} alt="idea icon" />
                Required Skills</h2>
              <div className="flex flex-wrap gap-1 md:gap-2">
                <div className="label grey">Project Management</div>
                <div className="label lightgreen">Adobe Photoshop</div>
                <div className="label grey">Business Awareness</div>
                <div className="label lightgreen">Decision Making</div>
                <div className="label lightgreen"> ISO 27001</div>
                <div className="label lightgreen">CISM</div>
                <div className="label grey">IT Risk Management</div>
              </div>
              <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5 flex items-center gap-2">
                <Image src="/new-assets/icons/edu-hat.png" className="size-6 inline-block" width={150} height={150} alt="idea icon" />
                Education</h2>
              <div className="flex flex-wrap gap-1 md:gap-2">
                <div className="label grey">Bachelor of Computer Science</div>
                <div className="label lightgreen">CRISC</div>
                <div className="label grey">Business Continuity Management</div>
              </div>
              <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5 flex items-center gap-2">
                <Image src="/new-assets/icons/distance-pin.png" className="w-auto
                h-6 ml-1 inline-block" width={150} height={150} alt="idea icon" />
                Location</h2>
                <p className="mb-2 md:mb-4 xl:mb-5">Goregaon West, Mumbai, Maharashtra</p>
                <div className="w-full">
                  <Map />
                </div>
              <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5 flex items-center gap-2">
                <Image src="/new-assets/icons/star-circle.png" className="size-6 inline-block" width={150} height={150} alt="idea icon" />
                Perks and Benefits</h2>
              <div className="flex flex-wrap gap-1 md:gap-2">
                <div className="label grey">Flexible working hours</div>
                <div className="label lightgreen">Health insurance</div>
                <div className="label lightgreen">Learning opportunities</div>
                <div className="label lightgreen">Paid time off</div>
                <div className="label grey">Performance bonuses</div>
              </div>
            </div>
            <div className="lg:order-2 col-span-12 lg:col-span-8 2xl:col-span-9 job-description">
              <ul className="flex mb-3 md:mb-4 2xl:mb-6 gap-5 md:gap-8 xl:gap-10 2xl:gap-12 border-b py-2 2xl:py-[10px] border-[#D4D4D4]">
                <li className={`text-red md:text-sm font-bold`}>
                  <Link href="#description">Job Description</Link></li>
                <li className={`md:text-sm font-normal`}>
                  <Link href="#about" className="text-black hover:font-bold hover:text-red">About the company</Link></li>
              </ul>
              <div id="description" className="py-4 md:py-6 xl:py-8 2xl:py-10 rounded-xl shadow-default">
                <div className="px-4 md:px-6 xl:px-8 2xl:px-10">
                  <h2 className="text-lg 2xl:text-xl font-semibold mb-3 md:mb-4 xl:mb-6">Job Description</h2>
                  <p className="text-sm leading-[32px] mb-4 md:mb-6 xl:mb-8">The key purpose of this job role is to develop, communicate and implement a strategy to identify, mitigate and handle current and potential issues / lapses in security of Information Technology Systems and Processes.
                    <br />This job involves cross functional liaison with IT, Facilities & Properties, HR, Finance, Operation functions & clients to ensure Information Systems security across HGS.</p>
                  <h2 className="text-lg 2xl:text-xl font-semibold mb-3 md:mb-4 xl:mb-6">Key Responsibilities</h2>
                  <ul className="list-disc ml-8 text-base leading-9 mb-6 md:mb-8 xl:mb-10">
                    <li>Apply a risk based approach to identify and report on the key security threats and exposures across all systems, policies, processes and infrastructure including facilitation of risk assessment within key outsource providers.
                    </li>
                    <li>Ensure any material security risks to the business are communicated in a timely and effective manner, with appropriate recommendations for resolution.</li>
                    <li>Facilitate information security risk assessments for all processes and monitor internal control systems to ensure that appropriate information access levels and security controls are maintained</li>
                    <li>Maintain effective working relationships with business management and proactively assist them in identifying and prioritizing areas of potential risk that need focus.</li>
                    <li>Assess and approve the Information Security risks in the risk management report
                    </li>
                    <li>
                    Facilitate and support VAPT process and deliver report to customer.
                    </li>
                  </ul>
                  <h2 className="text-lg 2xl:text-xl font-semibold mb-3 md:mb-4 xl:mb-6">Required Qualifications</h2>
                  <h3 className="font-medium">Education:</h3>
                  <ul className="list-disc ml-8 text-base leading-9 my-2">
                    <li>Bachelor's degree in Computer Science, Information Technology, Cybersecurity, or a related field.
                    </li>
                    <li>
                    A Master’s degree in Cybersecurity or Business Administration is a plus.
                    </li>
                  </ul>
                  <h3 className="font-medium">Certifications:</h3>
                  <ul className="list-disc ml-8 text-base leading-9 my-2">
                    <li>CISSP, CISM, CRISC, ISO 27001 Lead Auditor/Implementer, or equivalent certifications.
                    </li>
                    <li>
                    A Master’s degree in Cybersecurity or Business Administration is a plus.
                    </li>
                  </ul>
                  <h3 className="font-medium">Experience:</h3>
                  <ul className="list-disc ml-8 text-base leading-9 my-2">
                    <li>10-12 years of experience in information security or risk management, with at least 3 years in a leadership role</li>
                  </ul>
                </div>
              </div>
              <div id="about" className="py-4 md:py-6 xl:py-8 2xl:py-10 rounded-xl shadow-default mt-4 md:mt-6 xl:mt-4">
                <div className="px-4 md:px-6 xl:px-8 2xl:px-10">
                  <h2 className="text-lg 2xl:text-xl font-semibold mb-3 md:mb-4 xl:mb-6">About the company</h2>
                </div>
                <hr />
                <div className="px-4 md:px-6 xl:px-8 2xl:px-10 my-3 flex sm:items-center justify-between flex-col sm:flex-row gap-5 xl:gap-7 2xl:gap-8">
                  <div className="flex flex-col sm:flex-row gap-2 xl:gap-3 2xl:gap-4">
                    <Image
                    src={"/new-assets/icons/Comapny-profile-icon.png"}
                    width={68}
                    height={68}
                    alt="company profile logo"
                    className="flex-shrink-0 border border-[#0708280a] size-16 xl:size-[75px] rounded-lg"
                    />
                    <div className="block">
                      <h1 className="text-[#231F20] xl:text-lg xl:leading-8 font-medium">{jobdetail?.name}</h1>
                      <p className="text-[#231F20] text-sm mt-1">IT Services and IT Consulting <br />
                      10,001+ employees</p>
                    </div>
                  </div>
                  <button className="bg-black h-fit">Explore More </button>
                </div>
                <div className="px-4 md:px-6 xl:px-8 2xl:px-10  mt-4 md:mt-6 xl:mt-8">
                  <ReadMoreComponent/>
                </div>
              </div>
              <div className="py-4 md:py-6 xl:py-8 2xl:py-10 rounded-xl shadow-default mt-4 md:mt-6 xl:mt-4">
                <div className="px-4 md:px-6 xl:px-8 2xl:px-10">
                  <h2 className="text-lg 2xl:text-xl font-semibold mb-3 md:mb-4 xl:mb-6">Tags</h2>
                  <div className="flex gap-4 md:gap-6 flex-wrap">
                    <div className="label grey">Full time</div>
                    <div className="label grey">IT Security</div>
                    <div className="label grey">Information Security</div>
                    <div className="label grey">IT Incident Management</div>
                    <div className="label grey">IT Controls </div>
                  </div>
                  <div className="flex gap-4 md:gap-6 mt-3 md:mt-4 xl:mt-6">
                    <h2 className="text-lg 2xl:text-xl font-semibold inline-block">Share Job:</h2>
                    <div className="flex gap-4 md:gap-6">
                      <div className="size-6 bg-black text-white rounded-full grid place-items-center">
                        <GrFacebookOption/>
                      </div>
                      <div className="size-6 bg-black text-white rounded-full grid place-items-center">
                        <FaXTwitter/>
                      </div>
                      <div className="size-6 bg-black text-white rounded-full grid place-items-center">
                        <FaLinkedinIn/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
      <section className="py-5 xl:py-6 bg-[#F8F8F8]">
        <div className="w-full flex flex-col my-5 md:my-8 xl:my-14 2xl:my-16  mx-auto">
          <div className="">                        
            <div className="container section-heading sm:ml-[70px]">
                <h2 className='text-black text-start text-2xl md:text-3xl xl:text-4xl 2xl:text-[48px] 2xl:leading-[54px]  font-medium'>Similar jobs</h2>
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
        </div>
      </section>
    </main>
  );
}
