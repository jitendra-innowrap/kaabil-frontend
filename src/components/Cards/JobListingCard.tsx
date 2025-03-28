'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { LiaMapMarkerAltSolid } from 'react-icons/lia'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbBriefcase2 } from 'react-icons/tb'
import { formatDate, getCompanyInitials, showExperience, showSalary, showToast, timeAgo } from '../utils'
import api from '@/Services/Apiservice'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setProgress } from '@/redux/progressSlice'
import { clearSessionData } from '../utils/deviceId'
import { signOut } from '@/redux/userSlice'
import { FaHeart } from 'react-icons/fa6'
import { VscHeart, VscHeartFilled } from 'react-icons/vsc'
import { openLoginDialog } from '@/redux/loginDialogSlice'
import Popup from 'reactjs-popup'
import ScreeningQuesModal from '../ScreeningQuestionsModal'

export default function JobListingCard(prop:any) {
  const [openJobQuestions, setOpenJobQuestions] = useState(false);
  const {token, isLoggedIn} = useSelector((state: RootState) => state.user);
  const userSkills = useSelector((state: RootState) => state.user.skills);
  const user = useSelector((state: RootState) => state.user);
  const [isApplied, setIsApplied] = React.useState(prop?.is_job_apply=="1"?true:false);
  const [isFavorited, setIsFavorited] = React.useState(prop?.saveJob_status=="1"?true:false);
  const dispatch = useDispatch();
  const bgColors = ['#A7226E', '#EC2049', '#F26B38', '#F7DB4F', '#2F9599'];
  const CompanyLogo: React.FC<{ name?: string; logo?: string; index: number }> = ({ name, logo, index }) => {
    if (logo) {
      return (
        <img
          src={logo}
          width={44}
          height={44}
          alt="company profile logo"
          className="rounded-full border border-[#B9B9B9] size-11 lg:size-9 3xl:size-11"
        />
      );
    }
  
    // Select random color
    const bgColor = bgColors[index % bgColors.length];
  
    return (
      <div
        className="flex items-center justify-center rounded-full border border-[#B9B9B9] size-9 3xl:size-11 text-white font-semibold text-sm"
        style={{ backgroundColor: bgColor }}
      >
        {getCompanyInitials(name)}
      </div>
    );
  };
  const closeScreeningModal=()=>{
    setOpenJobQuestions(false);
  }
  useEffect(() => {
    setIsFavorited(prop?.saveJob_status=="1"?true:false)
  }, [user,prop])
  
  const handleApply = async (id:string)=>{
    if(!isLoggedIn){
      dispatch(setProgress(1))
      dispatch(openLoginDialog());
      const button = document.getElementById('sign-in-button');
      if (button) {
        button.click(); // Programmatically triggers the button click
      }
      return
    }
    if(!isApplied && prop?.jobs_questions && prop?.jobs_questions.length>0){
      setOpenJobQuestions(true);
     return
    }
    if(!isApplied){
      try {
            const formData = new FormData();
            formData.append("job_id", id); // Convert all values to strings
            formData.append("token", token); // Convert all values to strings
            const response = await api.post(`/Company/applyJob?job_id=${id}`,formData,{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if(response.data?.code==1){
              showToast('Applied Successfully!');
              setIsApplied(true);
            }
            if(response.data?.message=="Invalid Hash Request"){
              showToast("Session Expired Please login !", true);
              dispatch(signOut());
              dispatch(setProgress(1));
              clearSessionData();
            }
            console.log(response);
          } catch (error) {
            console.error('Error fetching jobs:', error);
          }
        }
  }
  const handleSave = async (id:string)=>{
    if(!isLoggedIn){
      dispatch(setProgress(1))
      dispatch(openLoginDialog())
      const button = document.getElementById('sign-in-button');
      if (button) {
        button.click(); // Programmatically triggers the button click
      }
      return
    }
    try {
          const formData = new FormData();
          formData.append("job_id", id); // Convert all values to strings
          const response = await api.post(`/Company/saveJob?job_id=${id}`,formData,{
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if(response.data?.status=="2"){
            showToast('Job Unsaved!', );
            setIsFavorited(false);
          }else if(response.data?.status=="1"){
            showToast('Job saved!', );
            setIsFavorited(true);
          }
          if(response.data?.message=="Invalid Hash Request"){
            showToast("Session Expired Please login !", true);
            dispatch(signOut());
            dispatch(setProgress(1));
            clearSessionData();
          }
          console.log(response);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
  }
  return (
    <>
    <Link href={`/jobs/detail/${prop?.id}`} passHref legacyBehavior>
      <div className='job-card h-full flex flex-col justify-between w-full border shadow-sm border-lightGrey rounded-2xl bg-white lg:p-4 3xl:p-6'>
        <div className="flex gap-3 3xl:gap-4 justify-between">
            <div className="flex gap-4 lg:gap-[10px] 3xl:gap-4">
              <CompanyLogo name={prop?.company_name} logo={prop?.company_logo} index={prop?.id || 0} />
              <div className="">
                <h3 className='text-xs 3xl:text-sm text-[#070828]'>{prop?.company_name}</h3>
                <p className='text-[8px] mt-1 3xl:text-xs text-[#B9B9B9]'>{timeAgo(prop?.job_posted_date)}</p>
              </div>
            {prop?.profile_matched_percentage>50 &&<div className="job-profile-match label small lightgreen">
            {prop?.profile_matched_percentage}% Profile Match
            </div>}
          </div>
          <span tabIndex={0} onClick={(e) => {
              e.stopPropagation();
              handleSave(prop?.id);
            }}>
          {
            !isFavorited? (
              <VscHeart className={`text-[#717B9E] size-[21px] lg:size-[18px] 3xl:size-5 cursor-pointer`}/>
            ) : (
              <VscHeartFilled className={`text-red size-[21px] lg:size-[18px] 3xl:size-5 cursor-pointer`}/>
            )
          }
          </span>
        </div>
        <h3 className='job-title lg:text-sm 3xl:text-base 2xl:text-lg font-medium my-[6px] 3xl:my-3 line-clamp-1'>{prop?.job_title}</h3>
        <div className="flex mb-1 md:mb-2">
          <img src={'/new-assets/icons/location-pin-dot.svg'} alt='Map pin' width={100} height={100} className='size-3 2xl:size-5' />
          <span className='ml-2 text-[10px] 2xl:text-sm text-[#545581] line-clamp-1' title={prop?.job_location?.[0]?.job_location || "Remote"}>{prop?.job_location?.[0]?.job_location || "Remote"}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex">
            {/* <TbBriefcase2 className='text-[#545581] size-3 2xl:size-5'/> */}
            <Image width={12} height={12} src={'/new-assets/icons/job-case.svg'} className='text-[#545581] size-3 2xl:size-5' alt='rupee icon' />
            <span className='ml-2 text-[10px] 2xl:text-sm text-[#545581]'>{showExperience(prop?.min_exp ||"0", prop?.max_exp || "0", "yrs experience")}</span>
          </div>
          <div className='ml-5 text-[10px] 2xl:text-sm text-[#545581] flex items-center'>
            
              <Image width={15} height={15} src={'/new-assets/icons/rupee.svg'} className='mr-1 2xl:mr-2 size-[11px] 2xl:size-[15px]' alt='rupee icon' />
            {
              (prop?.is_industry_standard=="1" || ((prop?.min_salary === null || prop?.min_salary === "" || prop?.min_salary === "0")) && ((prop?.max_salary === null || prop?.max_salary === "" || prop?.max_salary === "0")))?
              <span className='text-[10px] 2xl:text-sm'>As per Industry standards</span>:
              <>
              <span className='text-[10px] 2xl:text-sm'>{`${showSalary(prop?.is_industry_standard || "0", prop?.salary_range_unit ||"0",prop?.min_salary ||"0",prop?.max_salary ||"0")} `} </span>
              {prop?.is_industry_standard !=1 && <small className='text-[#B1B4B7]'> &nbsp; {` ${ prop?.salary_range_unit== "1"?` month`:` year`}`}</small>}
              </>
            }
          </div>
        </div>
        <div className="flex flex-wrap flex-col xl:flex-row xl:flex-nowrap lg:gap-4 min-h-16 justify-between">
          <ul className='skills-wrapper flex flex-wrap gap-2 mt-3'>
            {prop?.skills?.slice(0, 3)?.map((skill:any, index:number) => {
                const isSkillIncluded = userSkills?.some((userSkill) => userSkill.id == skill.id);
              return <li
              className={`label small flex gap-2 items-center ${isSkillIncluded ? 'lightgreen' : ''}`}
              key={index}
            >
              {skill?.name}
              {isSkillIncluded && (
                <img src="/new-assets/icons/check.svg" className='size-2' alt="" />
              )}
            </li>
            })}
            {
              prop?.skills?.length > 3 && (
                <li className='label small cursor-default'>+{(prop?.skills?.length - 3).toString()} More</li>
              )
            }
          </ul>
          <div className="flex action-btns update gap-2 3xl:gap-4 flex-wrap xl:flex-nowrap justify-end items-end">
          <Link href={`/jobs/detail/${prop?.id}`} className='grid place-items-center btn-border  xl:!min-w-[100px]  3xl:!min-w-[150px] whitespace-nowrap !py-0 xl:!px-5 3xl:!px-8 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm text-red !border-red'>view Job</Link>
          <button type='button' onClick={(e)=>{handleApply(prop?.id); e.stopPropagation();}} className={`flex items-center justify-center btn-border whitespace-nowrap !py-0 xl:!px-5 3xl:!px-8 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm !px-0  ${isApplied?" font-medium gap-1 3xl:gap-[6px] disabled cursor-default !bg-[#f0f1f1] !border-[#f0f1f1] text-[#4D4D4F]":"text-white !bg-red !border-red"}`}>{isApplied &&
            <svg width="13" height="13" className='size-[10px] 3xl:size-3' viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8">
                <path d="M5.25737 10.3573C5.20718 10.4078 5.14751 10.4479 5.08179 10.4752C5.01607 10.5025 4.94559 10.5166 4.87441 10.5166C4.80323 10.5166 4.73275 10.5025 4.66703 10.4752C4.60131 10.4479 4.54164 10.4078 4.49145 10.3573L1.4332 7.29853C1.28088 7.14616 1.19531 6.93954 1.19531 6.72409C1.19531 6.50865 1.28088 6.30202 1.4332 6.14966L1.81616 5.7667C1.96853 5.61438 2.17515 5.52881 2.3906 5.52881C2.60604 5.52881 2.81267 5.61438 2.96503 5.7667L4.87441 7.67607L10.0338 2.5167C10.1861 2.36438 10.3928 2.27881 10.6082 2.27881C10.8237 2.27881 11.0303 2.36438 11.1827 2.5167L11.5656 2.89966C11.7179 3.05202 11.8035 3.25865 11.8035 3.47409C11.8035 3.68954 11.7179 3.89616 11.5656 4.04853L5.25737 10.3573Z" fill="#4D4D4F"/>
                </g>
            </svg>
            }{isApplied?"Applied":"quick Apply"}</button>
          </div>
        </div>
      </div>
    </Link>
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
      <ScreeningQuesModal isApplied={isApplied} jobId={prop?.id || ""} questions={prop?.jobs_questions} setIsApplied={setIsApplied} onClose={closeScreeningModal} />
    </Popup>
    </>
  )
}
