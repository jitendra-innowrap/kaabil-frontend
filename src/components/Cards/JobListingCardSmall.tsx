'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { showExperience, showSalary, showSalarySimilarJob, showToast, timeAgo } from '../utils'
import ProfilePhoto from './ProfilePhoto'
import { VscHeart, VscHeartFilled } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import api from '@/Services/Apiservice'
import toast from 'react-hot-toast'
import { signOut } from '@/redux/userSlice'
import { setProgress } from '@/redux/progressSlice'
import { clearSessionData } from '../utils/deviceId'
import { openLoginDialog } from '@/redux/loginDialogSlice'
import Popup from 'reactjs-popup'
import ScreeningQuesModal from '../ScreeningQuestionsModal'

export default function JobListingCardSmall({detail, isCompanyJob=false}:{detail:CompanyJob, isCompanyJob?:boolean}) {
  const [openJobQuestions, setOpenJobQuestions] = useState(false);
  const {token, isLoggedIn} = useSelector((state: RootState) => state.user);
  const userSkills = useSelector((state: RootState) => state.user.skills);
  const user = useSelector((state: RootState) => state.user);
  const [isApplied, setIsApplied] = React.useState(detail?.is_job_apply=="1"?true:false);
  const [isFavorited, setIsFavorited] = React.useState(detail?.saveJob_status=="1"?true:false);
  const dispatch = useDispatch();  
  const closeScreeningModal=()=>{
    setOpenJobQuestions(false);
  }
  const handleApply = async (id:string)=>{
    if(!isLoggedIn){
      dispatch(setProgress(1))
      dispatch(openLoginDialog())
      const button = document.getElementById('sign-in-button');
      if (button) {
        button.click(); // Programmatically triggers the button click
      }
      return
    }
    if(!isApplied && detail?.jobs_questions && detail?.jobs_questions.length>0){
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
      dispatch(openLoginDialog());
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
            showToast('Job Unsaved!');
            setIsFavorited(false);
          }else if(response.data?.status=="1"){
            showToast('Job saved!');
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
  useEffect(() => {
    setIsFavorited(detail?.saveJob_status=='1')
  }, [detail])
  
  return (
    <>
    <Link href={`/jobs/detail/${detail?.id}`} passHref legacyBehavior>
      <div className='job-card h-full flex flex-col justify-between small w-full border shadow-sm border-lightGrey rounded-2xl bg-white p-4 3xl:p-6'>
        <div className="">
          <div className="flex gap-3 3xl:gap-4 justify-between">
            <div className="flex gap-[10px] 3xl:gap-4">
              <ProfilePhoto  index={1} logo={detail?.company_logo} styles="flex-shrink-0 border border-[#07082833] rounded-full size-9 3xl:size-11"  name={detail?.company_name} />
              <div className="">
                <h3 className='text-xs 3xl:text-sm text-[#070828]'>{detail?.company_name}</h3>
                <p className='text-[8px] mt-1 3xl:text-xs text-[#B9B9B9]'>{isCompanyJob?`${detail?.job_created_date} ago`:timeAgo(detail?.job_posted_date)}</p>
              </div>
            </div>
            <span tabIndex={0} onClick={(e) => {
              e.stopPropagation();
              handleSave(detail?.id);
            }}>
              {
                !isFavorited? (
                  <VscHeart className={`text-[#717B9E] size-4 3xl:size-5 cursor-pointer`}/>
                ) : (
                  <VscHeartFilled className={`text-red size-4 3xl:size-5 cursor-pointer`}/>
                )
              }
            </span>
          </div>
          <h3 className='text-sm 3xl:text-base 2xl:text-lg font-medium my-[6px] 3xl:my-3 truncate'>{detail?.job_title}</h3>
          <div className="flex mb-1 3xl:mb-2">
            <img src={'/new-assets/icons/location-pin-dot.svg'} alt='Map pin' width={100} height={100} className='size-[10px] 2xl:size-4' />
            <span className='ml-1 3xl:ml-2 text-[9px] 3xl:text-xs text-[#545581] line-clamp-1' title={detail?.job_location || "Remote"}>{(isCompanyJob?detail?.jobs_location?.[0]?.job_location:detail?.job_location) || "Remote"}</span>
          </div>
          <div className="flex justify-between 3xl:gap-2">
            <div className="flex">
              <Image width={12} height={12} src={'/new-assets/icons/job-case.svg'} className='text-[#545581] size-[10px] 2xl:size-[13px]' alt='case icon' />
              <span className='ml-1 3xl:ml-2 max-w-[96px] line-clamp-1 text-[9px] 3xl:text-xs text-[#545581]'>{showExperience(detail?.min_exp ||"0", detail?.max_exp || "0", "yrs experience")}</span>
            </div>
            {
              (detail?.is_industry_standard=="1" || ((detail?.min_salary === null || detail?.min_salary === "" || detail?.min_salary === "0")) && ((detail?.max_salary === null || detail?.max_salary === "" || detail?.max_salary === "0")))?
              <p className='flex flex-nowrap line-clamp-1 w-[80px] 3xl:w-[110px] justify-end'>
                <Image width={15} height={15} src={'/new-assets/icons/rupee.svg'} className='mr-1 2xl:mr-1 size-[10px] 2xl:size-[12px]' alt='rupee icon' />
                <span className={`text-[9px] 3xl:text-xs text-[#545581] line-clamp-1  ${detail?.is_industry_standard !='1'?'whitespace-nowrap':''}`}>{`${showSalarySimilarJob(detail?.is_industry_standard || "0", detail?.salary_range_unit ||"0",detail?.min_salary ||"0",detail?.max_salary ||"0")} `} </span>
              </p>
              :
              <div className='ml-2 3xl:ml-5 flex-1 flex-nowrap justify-center text-end text-[9px] 3xl:text-xs text-[#545581] flex items-center'>
                <p className='flex flex-nowrap'>
                  {/* {detail?.is_industry_standard !='1'&&  */}
                    <Image width={15} height={15} src={'/new-assets/icons/rupee.svg'} className='mr-1 2xl:mr-1 size-[11px] 2xl:size-[12px]' alt='rupee icon' />
                  {/* } */}
                  <span className={`text-[9px] 3xl:text-xs  whitespace-nowrap`}>{`${showSalarySimilarJob(detail?.is_industry_standard || "0", detail?.salary_range_unit ||"0",detail?.min_salary ||"0",detail?.max_salary ||"0")} `} </span>
                </p>
                {detail?.is_industry_standard !='1' && <small className='text-[#B1B4B7] flex flex-nowrap ml-1'> {` ${ detail?.salary_range_unit== "1"?` month`:` year`}`}</small>}
              </div>  
            }
                  
          </div>
          <ul className='flex flex-wrap gap-2 mt-3'>
            {detail?.jobs_skills?.slice(0, 3)?.map((skill:any, index:number) => {
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
              detail?.jobs_skills?.length > 3 && (
                <li className='label small cursor-default'>+{(detail?.jobs_skills?.length - 3).toString()} More</li>
              )
            }
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 min-h-16 justify-between">
          <div className="flex action-btns gap-4 flex-wrap justify-end items-end 3xl:pt-4">
          <Link href={`/jobs/detail/${detail?.id}`} className='grid place-items-center btn-border whitespace-nowrap !p-0 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm text-red !border-red'>view Job</Link>
          <button onClick={()=>{handleApply(detail?.id)}} className={`btn-border whitespace-nowrap !p-0 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm   ${isApplied?"disabled cursor-default !bg-[#f0f1f1] !border-[#f0f1f1] text-[#4D4D4F] gap-1 3xl:gap-[6px] flex justify-center items-center":"text-white !bg-red !border-red grid place-items-center"}`}>
            {
              isApplied && 
              <svg width="13" height="13" className='size-[10px] 3xl:size-3' viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.8">
                  <path d="M5.25737 10.3573C5.20718 10.4078 5.14751 10.4479 5.08179 10.4752C5.01607 10.5025 4.94559 10.5166 4.87441 10.5166C4.80323 10.5166 4.73275 10.5025 4.66703 10.4752C4.60131 10.4479 4.54164 10.4078 4.49145 10.3573L1.4332 7.29853C1.28088 7.14616 1.19531 6.93954 1.19531 6.72409C1.19531 6.50865 1.28088 6.30202 1.4332 6.14966L1.81616 5.7667C1.96853 5.61438 2.17515 5.52881 2.3906 5.52881C2.60604 5.52881 2.81267 5.61438 2.96503 5.7667L4.87441 7.67607L10.0338 2.5167C10.1861 2.36438 10.3928 2.27881 10.6082 2.27881C10.8237 2.27881 11.0303 2.36438 11.1827 2.5167L11.5656 2.89966C11.7179 3.05202 11.8035 3.25865 11.8035 3.47409C11.8035 3.68954 11.7179 3.89616 11.5656 4.04853L5.25737 10.3573Z" fill="#4D4D4F"/>
                  </g>
              </svg>
            }
            {isApplied?"Applied":"Quick Apply"}</button>
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
      <ScreeningQuesModal isApplied={isApplied} jobId={detail?.id || ""} questions={detail?.jobs_questions} setIsApplied={setIsApplied} onClose={closeScreeningModal} />
    </Popup>
    </>
  )
}
