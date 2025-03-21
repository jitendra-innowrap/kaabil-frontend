'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
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

export default function JobListingCardSmall({detail, isCompanyJob=false}:{detail:CompanyJob, isCompanyJob?:boolean}) {
  const token = useSelector((state: RootState) => state.user.token);
  const userSkills = useSelector((state: RootState) => state.user.skills);
  const user = useSelector((state: RootState) => state.user);
  const [isApplied, setIsApplied] = React.useState(detail?.is_job_apply=="1"?true:false);
  const [isFavorited, setIsFavorited] = React.useState(detail?.saveJob_status=="1"?true:false);
  const dispatch = useDispatch();  
  const handleApply = async (id:string)=>{
    if(!token){
      dispatch(setProgress(1))
      dispatch(openLoginDialog())
      const button = document.getElementById('sign-in-button');
      if (button) {
        button.click(); // Programmatically triggers the button click
      }
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
    if(!token){
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
          <span tabIndex={0} onClick={()=>{handleSave(detail?.id)}}>
            {
              !isFavorited? (
                <VscHeart className={`text-[#717B9E] size-4 3xl:size-5 cursor-pointer`}/>
              ) : (
                <VscHeartFilled className={`text-red size-4 3xl:size-5 cursor-pointer`}/>
              )
            }
          </span>
        </div>
        <h3 className='text-sm 3xl:text-base 2xl:text-lg font-medium my-[6px] 3xl:my-3 line-clamp-1'>{detail?.job_title}</h3>
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
          {
            detail?.jobs_skills?.slice(0, 3)?.map((skill)=>(
              <li className='label small cursor-default' title={skill?.name}>{skill?.name}</li>
            ))
          }{
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
        <button onClick={()=>{handleApply(detail?.id)}} className={`grid place-items-center btn-border whitespace-nowrap !p-0 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm text-white !bg-red !border-red  ${isApplied?"opacity-60 disabled cursor-default":""}`}>{isApplied?"Job Applied":"Quick Apply"}</button>
        </div>
      </div>
    </div>
  )
}
