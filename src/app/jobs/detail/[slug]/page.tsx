"use client";
import JobListingCard from "@/components/Cards/JobListingCard";
import JobListingCardSmall from "@/components/Cards/JobListingCardSmall";
import GallerySlider from "@/components/JobDetail/Slider/GallarySlider";
import Map from "@/components/Map";
import {
  encryptJobId,
  formatDate,
  getCompanyInitials,
  showExperience,
  showSalary,
  showSalaryJobDetails,
  showToast,
} from "@/components/utils";
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
import { ShareSocial } from "react-share-social";
import Tabs from "@/components/Tabs";
import { clearSessionData, getSessionData } from "@/components/utils/deviceId";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { signOut } from "@/redux/userSlice";
import { setProgress } from "@/redux/progressSlice";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { openLoginDialog } from "@/redux/loginDialogSlice";
import ScreeningQuesModal from "@/components/ScreeningQuestionsModal";
import ShareButtons from "@/components/SocialShare";
import appConfig from "@/config/app.config";
import { branchIo, setOpenShare } from "@/redux/jobsFilterSlice";

export default function Home() {
  const { slug } = useParams();
  const { token, isLoggedIn } = useSelector((state: RootState) => state.user);
  const userSkills = useSelector((state: RootState) => state.user.skills);
  const [openJobQuestions, setOpenJobQuestions] = useState(false);
  const dispatch = useDispatch();

  const [jobDetails, setJobDetails] = useState<JobResult>();
  const [skillMatchCount, setSkillMatchCount] = useState(0);
  // const [openShare, setOpenShare] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(
    jobDetails?.is_job_apply == "1" ? true : false
  );
  const [isFavorited, setIsFavorited] = useState(
    jobDetails?.saveJob_status == "1" ? true : false
  );
  const [similarJobs, setSimilarJobs] = useState<CompanyJob[]>([]);
  const router = useRouter();

  const closeScreeningModal = () => {
    setOpenJobQuestions(false);
  };
  const handleSignIn = () => {
    if (!isLoggedIn) {
      dispatch(setProgress(1));
      dispatch(openLoginDialog());
      const button = document.getElementById("sign-in-button");
      if (button) {
        button.click(); // Programmatically triggers the button click
      }
      return;
    }
  };

  useEffect(() => {
    setIsFavorited(jobDetails?.saveJob_status == "1");
    setIsApplied(jobDetails?.is_job_apply == "1" ? true : false);
  }, [jobDetails, token, isLoggedIn]);

  useEffect(() => {
    if (jobDetails) {
      const payload = {
        branch_key: appConfig.branchKey,
        channel: "website",
        data: {
          $canonical_url: `${appConfig.branchIODesktopUrl}/${jobDetails?.id}`,
          $desktop_url: `${appConfig.branchIODesktopUrl}/${jobDetails?.id}`,
          $android_url: `${appConfig.branchIOAndroidUrl}?id=com.app.kaabil_uat&hl=en`,
          $canonical_identifier: "content/job",
          job_id: encryptJobId(
            jobDetails?.id,
            appConfig.secretKey,
            appConfig.secretKey
          ),
        },
      };

      // Dispatch the thunk with payload only
      // @ts-ignore
      dispatch(branchIo(payload));
    }
  }, [jobDetails]);

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        let payload = {
          job_id: slug as string,
        };
        const { deviceId, secret, salt } = getSessionData();
        // Ensure session data is available
        if (!deviceId || !secret || !salt) {
          // console.log("Session data not available, retrying...");
          setTimeout(fetchJobDetails, 1000); // Retry after 1 second
          return;
        }
        const formData = new FormData();
        // ✅ Automatically append all fields from the object
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value); // Convert all values to strings
        });
        const response = await api.post("/Company/jobDetails", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const responseData = response.data as ApiResponseJobDetail;
        if (responseData.code === 1) {
          if (responseData.result?.[0]?.id == null) {
            showToast("page not found", true);
            router.push("/");
          }
          setJobDetails(responseData?.result?.[0] as JobResult);
          setSimilarJobs(responseData?.similar_jobs);
          setIsFavorited(responseData?.result?.[0]?.saveJob_status == "1");
          setIsApplied(
            responseData?.result?.[0]?.is_job_apply == "1" ? true : false
          );
        } else {
          notFound();
        }
      } catch (error: any) {
        if (error?.status == 404) {
          notFound();
        }
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchJobDetails();
  }, [slug]);

  useEffect(() => {
    const matchedSkillsCount =
      jobDetails?.jobs_skills?.filter((skill) =>
        userSkills?.some((uSkill) => uSkill?.id === skill?.id)
      ).length || 0;

    setSkillMatchCount(matchedSkillsCount);
  }, [jobDetails, token, userSkills]);

  const jobsSlides = similarJobs?.map((job, index) => (
    <JobListingCardSmall key={index} detail={job} />
  ));

  const style = {
    root: {
      background: "linear-gradient(45deg, #f6fbff 30%, #f6fbff 90%)",
      borderRadius: 3,
      border: 0,
      boxShadow: "0 3px 5px 2px #00000006",
      color: "white",
      width: "85vw",
      maxWidth: "300px",
      padding: "15px",
    },
    copyContainer: {
      border: "1px solid blue",
      background: "rgb(0,0,0,0.7)",
    },
    title: {
      color: "#000",
      fontStyle: "italic",
      fontSize: 18,
    },
  };

  const handleShare = () => {
    dispatch(setOpenShare(true));
  };

  const handleApply = async (id: string) => {
    if (!isLoggedIn) {
      dispatch(setProgress(1));
      dispatch(openLoginDialog());
      const button = document.getElementById("sign-in-button");
      if (button) {
        button.click(); // Programmatically triggers the button click
      }
      return;
    }
    if (
      !isApplied &&
      jobDetails?.jobs_questions &&
      jobDetails?.jobs_questions.length > 0
    ) {
      setOpenJobQuestions(true);
      return;
    }
    if (!isApplied) {
      try {
        const formData = new FormData();
        formData.append("job_id", id); // Convert all values to strings
        formData.append("token", token); // Convert all values to strings
        const response = await api.post(
          `/Company/applyJob?job_id=${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data?.code == 1) {
          showToast("Applied Successfully!");
          setIsApplied(true);
        }
        if (response.data?.message == "Invalid Hash Request") {
          showToast("Session Expired Please login !", true);
          dispatch(signOut());
          dispatch(setProgress(1));
          clearSessionData();
        }
        console.log(response);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
  };
  const handleSave = async (id: string) => {
    if (!isLoggedIn) {
      dispatch(setProgress(1));
      dispatch(openLoginDialog());
      const button = document.getElementById("sign-in-button");
      if (button) {
        button.click(); // Programmatically triggers the button click
      }
      return;
    }
    try {
      const formData = new FormData();
      formData.append("job_id", id); // Convert all values to strings
      const response = await api.post(
        `/Company/saveJob?job_id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data?.status == "2") {
        showToast("Job Unsaved!");
        setIsFavorited(false);
      } else if (response.data?.status == "1") {
        showToast("Job saved!");
        setIsFavorited(true);
      }
      if (response.data?.message == "Invalid Hash Request") {
        showToast("Session Expired Please login !", true);
        dispatch(signOut());
        dispatch(setProgress(1));
        clearSessionData();
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
      </div>
    );
  }

  const tabTitles = ["Job Description", "About the company"];
  const bgColors = ["#A7226E", "#EC2049", "#F26B38", "#F7DB4F", "#2F9599"];
  const CompanyLogo: React.FC<{
    name?: string;
    logo?: string;
    index: number;
    styles: string;
  }> = ({ name, logo, index, styles }) => {
    if (logo) {
      return (
        <img
          src={logo}
          width={68}
          height={68}
          alt="company profile logo"
          className={styles}
        />
      );
    }

    // Select random color
    const bgColor = bgColors[index % bgColors.length];

    return (
      <div
        className={`flex items-center justify-center text-white font-semibold text-sm ${styles}`}
        style={{ backgroundColor: bgColor }}
      >
        {getCompanyInitials(name)}
      </div>
    );
  };
  return (
    <main className="bg-white">
      {/* Add to stick sm:sticky sm:top-[52px] lg:top-[56px] 3xl:top-[90px] z-10 */}
      <section className="bg-[#FDEAC9] py-6 xl:py-8">
        <div className="container relative z-[1]">
          <div className="flex justify-between flex-wrap xl:flex-nowrap flex-col sm:flex-row sm:items-end gap-5 xl:gap-7 2xl:gap-8">
            <div className="flex justify-between flex-row gap-3 2xl:gap-5 3xl:gap-8 lg:max-w-[calc(100%_-_300px)]">
              <CompanyLogo
                index={1}
                logo={jobDetails?.logo}
                styles="flex-shrink-0 border border-[#07082833] size-12 2xl:size-16 rounded-full"
                name={jobDetails?.company_name}
              />
              <div className="block">
                <div className="flex justify-between lg:justify-start gap-5 xl:gap-7 2xl:gap-8 items-center">
                  <h1 className="font-medium text-[#231F20] text-xl 2xl:text-3xl">
                    {jobDetails?.job_title}
                  </h1>
                </div>
                <p className="text-[#231F20] text-xs 2xl:text-sm 3xl:text-base mt-1">
                  {jobDetails?.company_name}
                </p>
                <div className="flex items-center flex-wrap xl:flex-nowrap mt-4 2xl:mt-6 gap-4 3xl:gap-6">
                  {/* Option 1 */}
                  <div className="flex gap-2 3xl:gap-3">
                    <Image
                      src="/new-assets/icons/briefcase-red.svg"
                      width={80}
                      height={80}
                      alt="Briefcase icon"
                      className="size-4 3xl:size-6"
                    />
                    <div className="text-[#231F20] flex items-center">
                      <strong className="block text-xs 2xl:text-sm font-normal xl:whitespace-nowrap">
                        {showExperience(
                          jobDetails?.min_exp || "0",
                          jobDetails?.max_exp || "0",
                          "years"
                        )}
                      </strong>
                    </div>
                  </div>

                  {/* Option 2 */}
                  <div className="flex gap-2 3xl:gap-3">
                    <Image
                      src="/new-assets/icons/clock-red.svg"
                      width={80}
                      height={80}
                      alt="Clock icon"
                      className="size-4 3xl:size-6"
                    />
                    <div className="text-[#231F20] flex items-center">
                      <strong className="block text-xs 2xl:text-sm font-normal xl:whitespace-nowrap">
                        {jobDetails?.job_type}
                      </strong>
                    </div>
                  </div>

                  {/* Option 3 */}
                  <div className="flex gap-2 3xl:gap-3">
                    <Image
                      src="/new-assets/icons/wallet-red.svg"
                      width={80}
                      height={80}
                      alt="Wallet icon"
                      className="size-4 3xl:size-6"
                    />
                    <div className="text-[#231F20] flex items-center">
                      {jobDetails?.is_industry_standard == "1" ||
                      ((jobDetails?.min_salary === null ||
                        jobDetails?.min_salary === "" ||
                        jobDetails?.min_salary === "0") &&
                        (jobDetails?.max_salary === null ||
                          jobDetails?.max_salary === "" ||
                          jobDetails?.max_salary === "0")) ? (
                        <strong className="block text-xs 2xl:text-sm font-normal xl:whitespace-nowrap">
                          As per Industry standards
                        </strong>
                      ) : (
                        <strong className="block text-xs 2xl:text-sm font-normal xl:whitespace-nowrap">
                          {showSalaryJobDetails(
                            jobDetails?.is_industry_standard || "0",
                            jobDetails?.salary_range_unit || "0",
                            jobDetails?.min_salary || "0",
                            jobDetails?.max_salary || "0"
                          )}
                          {` ${
                            jobDetails?.salary_range_unit == "1"
                              ? ` month`
                              : ` year`
                          }`}
                        </strong>
                      )}
                    </div>
                  </div>

                  {/* Option 4 */}
                  <div className="flex gap-2 3xl:gap-3">
                    <Image
                      src="/new-assets/icons/location-pin-red.svg"
                      width={80}
                      height={80}
                      alt="Map pin icon"
                      className="size-4 3xl:size-6"
                    />
                    <div className="text-[#231F20] flex items-center">
                      <strong className="block text-xs 2xl:text-sm font-normal max-w-[300px] xl:max-w-[180px] 2xl:max-w-[200px] 3xl:max-w-[260px] line-clamp-1 xl:whitespace-nowrap truncate">
                        {jobDetails?.jobs_location?.[0]?.job_location ||
                          "Remote"}
                      </strong>
                    </div>
                  </div>
                  {skillMatchCount > 0 && (
                    <span className="label green flex font-medium 3xl:font-medium !lowercase items-center xl:whitespace-nowrap">
                      {skillMatchCount} {skillMatchCount==1?"skill":"skills"} match{" "}
                      <FaCheck className="ml-1 3xl:ml-2 text-[8px] 3xl:text-xs font-light" />{" "}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {token ? (
              <div className="hidden sm:flex gap-2 3xl:gap-3 justify-end items-center h-fit">
                <div
                  onClick={handleShare}
                  className="bg-white cursor-pointer flex-shrink-0 grid place-items-center rounded-full size-8 3xl:size-[50px]"
                >
                  <img
                    src="/new-assets/icons/share.svg"
                    className="text-[#4D4D4F] size-[14px] 3xl:size-[17px]"
                  />
                </div>
                <button
                  onClick={() => handleSave(jobDetails?.id || "")}
                  className="text-[#231F20] btn-border h-[35px] 3xl:h-[50px] !text-xs 3xl:!text-sm flex items-center gap-2 !border-black"
                >
                  save{" "}
                  {!isFavorited ? (
                    <VscHeart
                      className={`text-black 3xl:size-5 cursor-pointer`}
                    />
                  ) : (
                    <VscHeartFilled
                      className={`text-red 3xl:size-5 cursor-pointer`}
                    />
                  )}
                </button>
                <button
                  onClick={() => handleApply(jobDetails?.id || "")}
                  className={`whitespace-nowrap h-[35px] 3xl:h-[50px] w-[130px] 3xl:w-[176px] !text-xs 3xl:!text-sm ${
                    isApplied ? "opacity-60 disabled cursor-default" : ""
                  }`}
                >
                  {isApplied ? "Job Applied" : "apply now"}
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex gap-3 md:gap-4 justify-end items-center h-fit">
                <div
                  onClick={handleShare}
                  className="bg-white cursor-pointer flex-shrink-0 grid place-items-center rounded-full size-8 3xl:size-[50px]"
                >
                  <img
                    src="/new-assets/icons/share.svg"
                    className="text-[#4D4D4F] size-[14px] 3xl:size-[17px]"
                  />
                </div>
                <button
                  onClick={handleSignIn}
                  className={`whitespace-nowrap flex items-center h-[35px] 3xl:h-[50px] !text-xs 3xl:!text-sm ${
                    isApplied ? "!bg-[#f2f2f2] text-black cursor-default" : ""
                  }`}
                >
                  Sign in to apply for this Job
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="container mt-5 md:mt-8 xl:mt-10 mb-6 md:mb-10 xl:mb-14 2xl:mb-16 bg-[#ffffff]">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 2xl:gap-10">
          <div className="h-fit job-detail-sidebar flex-shrink-0 p-3 md:p-4 lg:p-5 3xl:p-8 rounded-xl w-full shadow-default">
            <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold mb-2 md:mb-4 3xl:mb-5">
              About this role
            </h2>
            {/* <div className="bg-[#F8F8F8] font-medium text-black p-3 md:p-4 rounded-xl mb-2 md:mb-4 xl:mb-5">{jobDetails?.candidates_applied_for_job} Applied</div>               */}
            <div className="flex items-center">
              <Image
                src="/new-assets/icons/calendar.svg"
                className="size-4 2xl:size-6 mr-1 2xl:mr-2 flex-shrink-0 inline-block"
                width={150}
                height={150}
                alt="idea icon"
              />
              <span className="whitespace-nowrap text-xs 2xl:text-sm 3xl:text-base">
                Job Posted On
              </span>
              <span className="justify-self-end w-full text-end text-xs 2xl:text-sm 3xl:text-base">
                {formatDate(jobDetails?.job_posted_date)}
              </span>
            </div>
            {/* <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              <h2 className="text-lg 2xl:text-xl font-semibold mb-2 md:mb-4 xl:mb-5">Industry</h2>
              <div className="flex flex-wrap gap-1 md:gap-2">
                <div className="label grey">Marketing</div>
                <div className="label lightgreen">It Security</div>
                <div className="label lightgreen">It Rist Management</div>
              </div> */}
            <hr className="border-[#D6DDEB] my-4 2xl:my-5 3xl:my-6" />
            <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold mb-2 md:mb-4 3xl:mb-5 flex items-center gap-2">
              <Image
                src="/new-assets/icons/lightbulb.svg"
                className="size-[18px] 2xl:size-[26px] flex-shrink-0 inline-block"
                width={150}
                height={150}
                alt="idea icon"
              />
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {jobDetails?.jobs_skills?.map((skill) => (
                <div
                  className={`label  ${
                    userSkills?.some((uSkill) => uSkill?.id == skill?.id)
                      ? "lightgreen"
                      : "grey"
                  }`}
                >
                  {skill?.name}
                </div>
              ))}
            </div>
            <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
            <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold mb-2 md:mb-4 3xl:mb-5 flex items-center gap-2">
              <Image
                src="/new-assets/icons/graduation-hat.svg"
                className="size-4 2xl:size-6 flex-shrink-0 inline-block"
                width={150}
                height={150}
                alt="idea icon"
              />
              Education
            </h2>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {jobDetails?.education.split(",")?.map((education) => (
                <div className="label grey lightgreen">{education}</div>
              ))}
            </div>
            <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
            {jobDetails?.jobs_location?.[0]?.job_location && (
              <>
                <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold mb-2 md:mb-4 3xl:mb-5 flex items-center gap-2">
                  <Image
                    src="/new-assets/icons/location-marker.svg"
                    className="w-auto
                h-5 2xl:h-6 flex-shrink-0 inline-block"
                    width={150}
                    height={150}
                    alt="idea icon"
                  />
                  Location
                </h2>
                <p className="mb-2 text-xs 2xl:text-sm 3xl:text-base md:mb-2 3xl:mb-5">
                  {jobDetails?.jobs_location?.[0]?.job_location}
                </p>
                <div className="w-full">
                  <Map
                    lat={jobDetails?.jobs_location?.[0]?.latitude || ""}
                    lng={jobDetails?.jobs_location?.[0]?.longitude || ""}
                  />
                </div>
                <hr className="border-[#D6DDEB] my-4 md:my-5 xl:my-6" />
              </>
            )}
            <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold mb-2 md:mb-4 3xl:mb-5 flex items-center gap-2">
              <Image
                src="/new-assets/icons/perks-star.svg"
                className="size-[18px] 3xl:size-[26px] flex-shrink-0 inline-block"
                width={150}
                height={150}
                alt="idea icon"
              />
              Perks and Benefits
            </h2>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {jobDetails?.job_benefits?.map((benefit) => (
                <div className="label grey lightgreen">{benefit?.name}</div>
              ))}
            </div>
          </div>
          <div className="job-description">
            <Tabs tabTitles={tabTitles} />
            <div
              id="job-description"
              className="py-4 md:py-6 xl:py-8 2xl:py-10 rounded-xl shadow-default"
            >
              <div className="job-action-btn-sx">
                {token ? (
                  <div className="flex gap-2 3xl:gap-3 justify-center items-center h-fit">
                    <div
                      onClick={handleShare}
                      className="bg-white cursor-pointer flex-shrink-0 grid place-items-center rounded-full size-8 3xl:size-[50px]"
                    >
                      <img
                        src="/new-assets/icons/share.svg"
                        className="text-[#4D4D4F] size-[14px] 3xl:size-[17px]"
                      />
                    </div>
                    <button
                      onClick={() => handleSave(jobDetails?.id || "")}
                      className="text-[#231F20] btn-border h-[35px] 3xl:h-[50px] !text-xs 3xl:!text-sm flex items-center gap-2 !border-black"
                    >
                      save{" "}
                      {!isFavorited ? (
                        <VscHeart
                          className={`text-black 3xl:size-5 cursor-pointer`}
                        />
                      ) : (
                        <VscHeartFilled
                          className={`text-red 3xl:size-5 cursor-pointer`}
                        />
                      )}
                    </button>
                    <button
                      onClick={() => handleApply(jobDetails?.id || "")}
                      className={`whitespace-nowrap h-[35px] 3xl:h-[50px] w-[130px] 3xl:w-[176px] !text-xs 3xl:!text-sm ${
                        isApplied ? "opacity-60 disabled cursor-default" : ""
                      }`}
                    >
                      {isApplied ? "Job Applied" : "apply now"}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3 md:gap-4 justify-center items-center h-fit">
                    <div
                      onClick={handleShare}
                      className="bg-white cursor-pointer flex-shrink-0 grid place-items-center rounded-full size-8 3xl:size-[50px]"
                    >
                      <img
                        src="/new-assets/icons/share.svg"
                        className="text-[#4D4D4F] size-[14px] 3xl:size-[17px]"
                      />
                    </div>
                    <button
                      onClick={handleSignIn}
                      className={`whitespace-nowrap flex items-center h-[35px] 3xl:h-[50px] !text-xs 3xl:!text-sm ${
                        isApplied
                          ? "!bg-[#f2f2f2] text-black cursor-default"
                          : ""
                      }`}
                    >
                      Sign in to apply for this Job
                    </button>
                  </div>
                )}
              </div>
              <div className="job-description-content px-4 md:px-6 xl:px-8 2xl:px-10">
                <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold mb-2 md:mb-4 3xl:mb-6">
                  Job Description
                </h2>
                <div
                  className="text-xs leading-6 3xl:text-sm 3xl:leading-[32px] mb-4 md:mb-6 xl:mb-8"
                  dangerouslySetInnerHTML={{
                    __html:
                      jobDetails?.additional_info &&
                      typeof jobDetails.additional_info === "string"
                        ? jobDetails.additional_info
                        : "",
                  }}
                />
              </div>
            </div>
            <div
              id="about-the-company"
              className="py-4 md:py-6 xl:py-8 2xl:py-10 rounded-xl shadow-default mt-4 md:mt-6 xl:mt-4"
            >
              <div className="px-4 md:px-6 xl:px-8 2xl:px-10">
                <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold mb-2 md:mb-4 3xl:mb-6">
                  About the company
                </h2>
              </div>
              <hr />
              <div className="px-4 md:px-6 xl:px-8 2xl:px-10 my-3 flex flex-row flex-wrap sm:items-center justify-between gap-3 xl:gap-7 2xl:gap-8">
                <div className="flex flex-row gap-2 xl:gap-3 2xl:gap-4 items-start sm:items-center">
                  <CompanyLogo
                    index={1}
                    logo={jobDetails?.logo}
                    styles="flex-shrink-0 border border-[#0708280a] size-14 2xl:size-16 3xl:size-[75px] rounded-lg"
                    name={jobDetails?.company_name}
                  />
                  <div className="block">
                    <h1 className="text-[#231F20] text-sm 2xl:text-base 3xl:text-lg leading-8 font-medium">
                      {jobDetails?.company_name}
                    </h1>
                    <p className="text-[#636363] text-[10px] 2xl:text-sm -mt-1 2xl:mt-1">
                      {jobDetails?.industry_name} <br />
                      {jobDetails?.company_emp_size}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/company/profile/${jobDetails?.company_master_id}`}
                  className="!bg-black !text-white h-fit whitespace-nowrap !text-[10px] 2xl:!text-sm 3xl:!text-base btn"
                >
                  Explore More
                </Link>
              </div>
              <div className="px-4 md:px-6 xl:px-8 2xl:px-10  mt-4 md:mt-6 xl:mt-8">
                <ReadMoreComponent
                  fullText={jobDetails?.company_description || ""}
                />
              </div>
            </div>
            {/* <div className="py-4 md:py-6 xl:py-8 2xl:py-10 rounded-xl shadow-default mt-4 md:mt-6 xl:mt-4">
                <div className="px-4 md:px-6 xl:px-8 2xl:px-10">
                  <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold mb-2 md:mb-4 3xl:mb-6">Tags</h2>
                  <div className="flex gap-4 md:gap-6 flex-wrap">
                    <div className="label grey">Full time</div>
                    <div className="label grey">IT Security</div>
                    <div className="label grey">Information Security</div>
                    <div className="label grey">IT Incident Management</div>
                    <div className="label grey">IT Controls </div>
                  </div>
                  <div className="flex gap-4 md:gap-6 mt-3 md:mt-4 xl:mt-6">
                    <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-semibold inline-block">Share Job:</h2>
                    <div className="flex gap-4 md:gap-6">
                      <div className="size-4 2xl:size-5 3xl:size-6 bg-black text-white rounded-full grid place-items-center">
                        <GrFacebookOption className="size-3 3xl:size-4"/>
                      </div>
                      <div className="size-4 2xl:size-5 3xl:size-6 bg-black text-white rounded-full grid place-items-center">
                        <FaXTwitter className="size-3 3xl:size-4"/>
                      </div>
                      <div className="size-4 2xl:size-5 3xl:size-6 bg-black text-white rounded-full grid place-items-center">
                        <FaLinkedinIn className="size-[10px] 3xl:size-[14px]"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </section>
      {jobsSlides?.length > 0 && (
        <section className="bg-[#f9f9f9]">
          <div className="w-full flex flex-col py-5 md:py-8 xl:py-14 2xl:py-16  mx-auto">
            <div className="container section-heading">
              <h2 className="text-black text-start text-2xl md:text-2xl 2xl:text-3xl 3xl:text-4xl 2xl:mb-3 font-medium">
                Similar jobs
              </h2>
            </div>
            <div className="block container slider">
              <GallerySlider
                slides={jobsSlides}
                spaceBetween={20}
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
                    slidesPerView: 4,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1920: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
              />
            </div>
          </div>
        </section>
      )}
      {/* <Popup
        open={openShare}
        onClose={handleClose}
        modal
        className="share-modal"
        overlayStyle={
          {
            // background: 'rgba(0, 0, 0, 0.5)',
          }
        }
      > */}
      <ShareButtons jobDetails={jobDetails || {}} />
      {/* </Popup> */}
      <Popup
        open={openJobQuestions}
        onClose={() => setOpenJobQuestions(false)}
        modal
        lockScroll
        className="screening-modal-container"
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.7)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScreeningQuesModal
          isApplied={isApplied}
          jobId={jobDetails?.id || ""}
          questions={jobDetails?.jobs_questions}
          setIsApplied={setIsApplied}
          onClose={closeScreeningModal}
        />
      </Popup>
    </main>
  );
}
