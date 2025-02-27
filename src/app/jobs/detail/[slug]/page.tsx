'use client'
import JobListingCard from "@/components/Cards/JobListingCard";
import JobListingCardSmall from "@/components/Cards/JobListingCardSmall";
import GallerySlider from "@/components/JobDetail/Slider/GallarySlider";
import Map from "@/components/Map";
import { formatDate, showExperience, showSalary } from "@/components/utils";
import ReadMoreComponent from "@/components/utils/ReadMoreText";
import api from "@/Services/Apiservice";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { json, text } from "node:stream/consumers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCalendar, CiHeart } from "react-icons/ci";
import { FaCheck, FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrFacebookOption } from "react-icons/gr";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import Popup from "reactjs-popup";
import { ShareSocial } from 'react-share-social'
import { useAppSelector } from "@/redux/hooks";
import { Skill } from "@/Types/common";


export default function Home() {
  const {slug} = useParams();
  const userSkills = useAppSelector((state) => state.auth.skills) as Skill[];
  const [jobDetails, setJobDetails] = useState<JobResult>();
  const [skillMatchCount, setSkillMatchCount] = useState(0);
  const [openShare, setOpenShare] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(jobDetails?.saveJob_status=='2');
  const router = useRouter();
    const handleSave = () => {
      setIsFavorited(!isFavorited)
    }
    useEffect(() => {
      setIsFavorited(jobDetails?.saveJob_status=='2')
    }, [jobDetails]);
    
  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        let payload = {
          // job_id: slug as string,
          job_id: '2850' as string,
        };
  
        const formData = new FormData();
        // ✅ Automatically append all fields from the object
          Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value); // Convert all values to strings
          });
  
        const response = await api.post('/Company/jobDetails', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const responseData = response.data as ApiResponseJobDetail;
        if (responseData.code === 1) {
          // if(responseData.result?.[0]?.id==null){
          //   toast.error("page not found", { position: "bottom-right" });
          //   notFound();
          // }
          const matchedSkillsCount = jobDetails?.jobs_skills?.filter((skill) => userSkills.some((uSkill) => uSkill?.id === skill?.id)).length;
          setSkillMatchCount(matchedSkillsCount || 0);
          setJobDetails(responseData.result?.[0] as JobResult);
        }else{
          notFound();
        }
      } catch (error: any) {
        if(error?.status==401){
          router.back();
          console.error("page error: 👍👍👍",error);
        }else if(error?.status==404){
          notFound();
        }
      }
      setIsLoading(false)
    };
    fetchCompanyDetails();
  }, [slug]);
  const generateDummyJobs = (count: number): CompanyJob[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: `job_00${index + 1}`,
      company_master_id: `comp_00${index + 1}`,
      job_distance: `${5 + index * 5} miles`,
      job_location: ["New York, NY", "San Francisco, CA", "Austin, TX", "Chicago, IL", "Seattle, WA"][index % 5],
      min_salary: `${60 + index * 10}k`,
      max_salary: `${8 + index * 2}L`,
      additional_info: index % 2 === 0 ? "Remote work options available." : "Flexible hours.",
      job_created_date: `2025-02-${15 + index}`,
      is_job_apply: index % 2 === 0 ? "1" : "0",
      walk_in_interview: index % 3 === 0 ? "1" : "0",
      saveJob_status: `${index % 3}`,
      booked_interview_date: "",
      education_master_id: `edu_00${index + 1}`,
      min_exp: `${index + 1}`,
      max_exp: `${index + 3}`,
      skills_master_id: `skill_00${index + 1}`,
      applied_job_date: "",
      weight: (1.0 + index * 0.2).toFixed(1),
      salary_range_unit: "0",
      is_industry_standard: `${index % 2}`,
      job_title: ["Software Engineer", "Data Analyst", "Junior Developer", "Product Manager", "DevOps Engineer"][index % 5],
      freshers_can_apply: `${index % 2}`,
      row: `${index + 1}`,
      company_job_slots: [],
      jobs_questions: [],
      jobs_location: [],
      profile_matched_percentage: 75 + index * 5,
      perfect_match_percent: 80 + index * 5,
      is_show_candidate_percent: 1,
      jobs_skills: [],
    }));
  };
  
  // Generate 5 dummy jobs
  const jobs: CompanyJob[] = generateDummyJobs(5);
  const jobsSlides = jobs.map((job, index) => (
      <div className="flex w-[100%] md:w-[338px]" key={index}>
        <JobListingCardSmall key={index} detail={job} />
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
  const style = {
        root: {
          background: 'linear-gradient(45deg, #f6fbff 30%, #f6fbff 90%)',
          borderRadius: 3,
          border: 0,
          boxShadow: '0 3px 5px 2px #00000006',
          color: 'white',
          width: '85vw',
          maxWidth: '300px',
          padding: '15px',
        },
        copyContainer: {
          border: '1px solid blue',
          background: 'rgb(0,0,0,0.7)'
        },
        title: {
          color: '#000',
          fontStyle: 'italic',
          fontSize: 18,
        }
      };
      const handleClose = () => {
        setOpenShare(false)
    }
    const handleShare = () => {
        setOpenShare(true)
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
  return (
    <main>
      <section className="bg-[#FDEAC9] py-6 xl:py-8 relative">
      <div className="container relative z-[1]">
        <div className="flex justify-between flex-wrap flex-col sm:flex-row gap-5 xl:gap-7 2xl:gap-8">
          <div className="flex justify-between flex-col sm:flex-row gap-5 xl:gap-7 2xl:gap-8">
            <Image
              src={jobDetails?.logo || ""}
              width={68}
              height={68}
              alt="company profile logo"
              className="flex-shrink-0 border border-[#07082833] size-16 xl:size-16 rounded-full"
              />
              <div className="block">
                <div className="flex justify-between lg:justify-start gap-5 xl:gap-7 2xl:gap-8 items-center">
                  <h1 className="font-medium text-[#231F20] text-xl lg:text-3xl">{jobDetails?.company_name}</h1>
                </div>
                <p className="text-[#231F20] mt-1">{"www.lorem.ipsum"}</p>
                <div className="flex items-center flex-wrap mt-4 xl:mt-5 2xl:mt-6 gap-5 2xl:gap-10">
                  {/* Option 1 */}
                  <div className="flex gap-2 2xl:gap-4">
                    <Image
                      src="/new-assets/icons/briefcase.png"
                      width={80}
                      height={80}
                      alt="Briefcase icon"
                      className="size-4 2xl:size-6"
                    />
                    <div className="text-[#231F20]">
                      <strong className="block text-sm font-normal">{showExperience(jobDetails?.min_exp ||"0", jobDetails?.max_exp || "0", "years")}</strong>
                    </div>
                  </div>

                  {/* Option 2 */}
                  <div className="flex gap-2 2xl:gap-4">
                    <Image
                      src="/new-assets/icons/clock.png"
                      width={80}
                      height={80}
                      alt="Clock icon"
                      className="size-4 2xl:size-6"
                    />
                    <div className="text-[#231F20]">
                      <strong className="block text-sm font-normal">{jobDetails?.job_type}</strong>
                    </div>
                  </div>

                  {/* Option 3 */}
                  <div className="flex gap-2 2xl:gap-4">
                    <Image
                      src="/new-assets/icons/wallet.png"
                      width={80}
                      height={80}
                      alt="Wallet icon"
                      className="size-4 2xl:size-6"
                    />
                    <div className="text-[#231F20]">
                      <strong className="block text-sm font-normal">{showSalary(jobDetails?.is_industry_standard || "0", jobDetails?.salary_range_unit ||"0",jobDetails?.min_salary ||"0",jobDetails?.max_salary ||"0")}</strong>
                    </div>
                  </div>

                  {/* Option 4 */}
                  <div className="flex gap-2 2xl:gap-4">
                    <Image
                      src="/new-assets/icons/map-pin.png"
                      width={80}
                      height={80}
                      alt="Map pin icon"
                      className="size-4 2xl:size-6"
                    />
                    <div className="text-[#231F20]">
                      <strong className="block text-sm font-normal">{jobDetails?.jobs_location?.[0]?.job_location}</strong>
                    </div>
                  </div>
                  {skillMatchCount > 0 && <span className="label green text-xs 2xl:text-sm flex font-semibold items-center">{skillMatchCount} skills match <FaCheck className="ml-2"/> </span>}
                </div>
              </div>
          </div>
          <div className="flex gap-3 md:gap-4 justify-end items-end">
            <div onClick={handleShare} className="bg-white cursor-pointer flex-shrink-0 grid place-items-center rounded-full size-8 2xl:size-10">
              <IoShareSocialOutline className="text-[#4D4D4F]"/>
            </div>
            <button onClick={handleSave} className="text-[#231F20] btn-border !text-sm 2xl:!text-base flex h-fit items-center gap-2 !border-black">
              save {
                        !isFavorited? (
                          <IoIosHeartEmpty className={`text-black size-5 cursor-pointer`}/>
                        ) : (
                          <IoIosHeart className={`text-red size-5 cursor-pointer`}/>
                        )
                      }
            </button>
            <button className="h-fit whitespace-nowrap !text-sm 2xl:!text-base">apply now</button>
          </div>
        </div>
      </div>
      </section>
      <section className="container mt-5 md:mt-8 xl:mt-10 mb-6 md:mb-10 xl:mb-14 2xl:mb-16 ">
        <div className="grid  grid-cols-12 gap-4 md:gap-6 2xl:gap-10">
            <div className="h-fit order-2  col-span-12 lg:col-span-4 2xl:col-span-3 job-detail-sidebar p-3 md:p-4 xl:p-8 rounded-xl w-full shadow-default">
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5">About this role</h2>
              <div className="bg-[#F8F8F8] font-medium text-black p-3 md:p-4 rounded-xl mb-2 md:mb-4 xl:mb-5">{jobDetails?.candidates_applied_for_job} Applied</div>              
              <div className="flex items-center">
                <CiCalendar className=" flex-shrink-0 text-[#777373] mr-1 md:mr-2"/>
                  <span className="whitespace-nowrap">Job Posted On</span>
                  <span className="justify-self-end w-full text-end">{formatDate(jobDetails?.job_posted_date)}</span>
              </div>
              {/* <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5">Industry</h2>
              <div className="flex flex-wrap gap-1 md:gap-2">
                <div className="label grey">Marketing</div>
                <div className="label lightgreen">It Security</div>
                <div className="label lightgreen">It Rist Management</div>
              </div> */}
              <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5 flex items-center gap-2">
                <Image src="/new-assets/icons/idea-bulb.png" className="size-4 2xl:size-6 inline-block" width={150} height={150} alt="idea icon" />
                Required Skills</h2>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {
                  jobDetails?.jobs_skills?.map((skill)=>(
                    <div className={`label  ${userSkills.some((uSkill) => uSkill?.id == skill?.id) ? "lightgreen" : "grey"}`}>{skill?.name}{JSON.stringify(userSkills.some((uSkill) => uSkill?.id !== skill?.id))}</div>
                  ))
                }
              </div>
              <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5 flex items-center gap-2">
                <Image src="/new-assets/icons/edu-hat.png" className="size-4 2xl:size-6 inline-block" width={150} height={150} alt="idea icon" />
                Education</h2>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {
                  jobDetails?.education.split(",").map((education)=>(
                    <div className="label grey lightgreen">{education}</div>
                  ))
                }
              </div>
              <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5 flex items-center gap-2">
                <Image src="/new-assets/icons/distance-pin.png" className="w-auto
                h-4 2xl:h-6 ml-1 inline-block" width={150} height={150} alt="idea icon" />
                Location</h2>
                <p className="mb-2 md:mb-4 xl:mb-5">{jobDetails?.jobs_location?.[0]?.job_location}</p>
                <div className="w-full">
                  <Map lat={jobDetails?.jobs_location?.[0]?.latitude || ""} lng={jobDetails?.jobs_location?.[0]?.longitude || ""} />
                </div>
              <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5 flex items-center gap-2">
                <Image src="/new-assets/icons/star-circle.png" className="size-4 2xl:size-6 inline-block" width={150} height={150} alt="idea icon" />
                Perks and Benefits</h2>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {
                  jobDetails?.job_benefits?.map((benefit)=>(
                    <div className="label grey lightgreen">{benefit?.name}</div>
                  ))
                }
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
                  <div
                    className="text-sm leading-[32px] mb-4 md:mb-6 xl:mb-8"
                    dangerouslySetInnerHTML={{
                      __html:
                        jobDetails?.additional_info && typeof jobDetails.additional_info === "string"
                          ? jobDetails.additional_info
                          : "",
                    }}
                  />

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
                    src={jobDetails?.logo ||""}
                    width={68}
                    height={68}
                    alt="company profile logo"
                    className="flex-shrink-0 border border-[#0708280a] size-16 xl:size-[75px] rounded-lg"
                    />
                    <div className="block">
                      <h1 className="text-[#231F20] xl:text-lg xl:leading-8 font-medium">{jobdetail?.name}</h1>
                      <p className="text-[#231F20] text-sm mt-1">{jobDetails?.industry_name} <br />
                      {jobDetails?.company_emp_size}</p>
                    </div>
                  </div>
                  <Link href={`/company/profile/${jobDetails?.company_master_id}`} className="!bg-black !text-white btn-border h-fit">Explore More </Link>
                </div>
                <div className="px-4 md:px-6 xl:px-8 2xl:px-10  mt-4 md:mt-6 xl:mt-8">
                  <ReadMoreComponent fullText={jobDetails?.company_description || ""} />
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
              loop={true}
              autoplay={true}
                            autoplayDuration={3000}
                            freeMode={false}
              />
            </div>
          </div>
        </div>
      </section>
      <Popup
            open={openShare}
            onClose={handleClose}
            modal
            className="share-modal"
            overlayStyle={{
                // background: 'rgba(0, 0, 0, 0.5)',
            }}
            >
                <ShareSocial
                        title='Share this opportunity!'
                        style={style}
                        url={`${window.location.origin}/detail/franchise/${jobDetails?.share_url}`}
                        socialTypes={['facebook','twitter','whatsapp','linkedin']}
                    />
            </Popup>
    </main>
  );
}
