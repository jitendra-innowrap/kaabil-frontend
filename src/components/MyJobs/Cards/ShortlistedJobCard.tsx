'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { formatDate, getCompanyInitials, showExperience, showSalary, showSalarySimilarJob, showToast, timeAgo } from '@/components/utils'
import api from '@/Services/Apiservice'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setProgress } from '@/redux/progressSlice'
import { clearSessionData } from '@/components/utils/deviceId'
import { signOut } from '@/redux/userSlice'
import { FaHeart } from 'react-icons/fa6'
import { VscHeart, VscHeartFilled } from 'react-icons/vsc'
import { openLoginDialog } from '@/redux/loginDialogSlice'

export default function ShortListedJobCard(prop:any) {
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
          className="rounded-full border border-[#B9B9B9] size-9 3xl:size-11"
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
    // if(!isApplied && prop?.jobs_questions && prop?.jobs_questions.length>0){
    //   // setOpenJobQuestions(true);
    //   return
    // }
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
    <Link href={`/jobs/detail/${prop?.id}`} passHref legacyBehavior>
      <div onClick={()=>{console.log(prop)}} className='job-card cursor-pointer h-full flex flex-col justify-between w-full border shadow-sm border-lightGrey rounded-2xl bg-white p-4 3xl:p-6'>
        <div className="flex gap-3 3xl:gap-4 justify-between">
            <div className="flex gap-[10px] 3xl:gap-4">
              <CompanyLogo name={prop?.company_name} logo={prop?.logo} index={prop?.id || 0} />
              <div className="">
                <h3 className='text-xs 3xl:text-sm text-[#070828]'>{prop?.company_name}</h3>
                <p className='text-[8px] mt-1 3xl:text-xs text-[#B9B9B9]'>{timeAgo(prop?.job_posted_date)}</p>
              </div>
            {prop?.profile_matched_percentage>50 &&<div className="job-profile-match label small lightgreen">
            {prop?.profile_matched_percentage}% Profile Match
            </div>}
          </div>
          <span tabIndex={0} 
            onClick={(e) => {
              e.stopPropagation();
              handleSave(prop?.id);
            }}
          >
          {
            !isFavorited? (
              <VscHeart className={`text-[#717B9E] size-4 3xl:size-5 cursor-pointer`}/>
            ) : (
              <VscHeartFilled className={`text-red size-4 3xl:size-5 cursor-pointer`}/>
            )
          }
          </span>
        </div>
        <h3 className='text-sm 3xl:text-base 2xl:text-lg font-medium my-[6px] 3xl:my-3 line-clamp-1'>{prop?.job_title}</h3>
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
              <span className='text-[10px] 2xl:text-sm'>{`${showSalarySimilarJob(prop?.is_industry_standard || "0", prop?.salary_range_unit ||"0",prop?.min_salary ||"0",prop?.max_salary ||"0")} `} </span>
              {prop?.is_industry_standard !=1 && <small className='text-[#B1B4B7]'> &nbsp; {` ${ prop?.salary_range_unit== "1"?` month`:` year`}`}</small>}
              </>
            }
          </div>
        </div>
        <div className="flex flex-wrap xl:flex-nowrap gap-4 justify-between">
          {/* <pre>{JSON.stringify(prop, null,2)}</pre> */}
          <ul className='skills-wrapper flex flex-wrap gap-2 mt-3'>
            {prop?.jobs_skills?.slice(0, 3)?.map((skill:any, index:number) => {
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
              prop?.jobs_skills?.length > 3 && (
                <li className='label small cursor-default'>+{(prop?.jobs_skills?.length - 3).toString()} More</li>
              )
            }
          </ul>
          <div className="flex action-btns gap-2 3xl:gap-4 flex-wrap xl:max-w-[170px] xl:flex-nowrap justify-end items-end">
          <button type='button' onClick={()=>{handleApply(prop?.id)}} className={`flex  place-items-center btn-border whitespace-nowrap !py-0 xl:!px-2 3xl:!px-[13px] h-[30px] 3xl:h-[44px] gap-1 3xl:gap-[6px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm text-[#4D4D4F] !bg-[#f0f1f1] !border-[#f0f1f1] font-medium ${isApplied?"opacity-100 disabled cursor-default":""}`}>
              <svg width="13" height="13" className='size-[10px] 3xl:size-3' viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.8">
                  <path d="M5.25737 10.3573C5.20718 10.4078 5.14751 10.4479 5.08179 10.4752C5.01607 10.5025 4.94559 10.5166 4.87441 10.5166C4.80323 10.5166 4.73275 10.5025 4.66703 10.4752C4.60131 10.4479 4.54164 10.4078 4.49145 10.3573L1.4332 7.29853C1.28088 7.14616 1.19531 6.93954 1.19531 6.72409C1.19531 6.50865 1.28088 6.30202 1.4332 6.14966L1.81616 5.7667C1.96853 5.61438 2.17515 5.52881 2.3906 5.52881C2.60604 5.52881 2.81267 5.61438 2.96503 5.7667L4.87441 7.67607L10.0338 2.5167C10.1861 2.36438 10.3928 2.27881 10.6082 2.27881C10.8237 2.27881 11.0303 2.36438 11.1827 2.5167L11.5656 2.89966C11.7179 3.05202 11.8035 3.25865 11.8035 3.47409C11.8035 3.68954 11.7179 3.89616 11.5656 4.04853L5.25737 10.3573Z" fill="#4D4D4F"/>
                  </g>
              </svg>
              Applied on {prop?.applied_job_date}
          </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
