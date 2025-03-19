'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { CiHeart } from 'react-icons/ci'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { LiaMapMarkerAltSolid } from 'react-icons/lia'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbBriefcase2 } from 'react-icons/tb'
import { formatDate, getCompanyInitials, showExperience, showSalary, timeAgo } from '../utils'
import api from '@/Services/Apiservice'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setProgress } from '@/redux/progressSlice'
import { clearSessionData } from '../utils/deviceId'
import { signOut } from '@/redux/userSlice'
import { FaHeart } from 'react-icons/fa6'
import { VscHeart, VscHeartFilled } from 'react-icons/vsc'

export default function JobListingCard(prop:any) {
  const token = useSelector((state: RootState) => state.user.token);
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
              toast.success('Applied Successfully!', { position: 'bottom-right' });
              setIsApplied(true);
            }
            if(response.data?.message=="Invalid Hash Request"){
              toast.error("Session Expired Please login !", { position: 'bottom-right' });
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
            toast.success('Job Unsaved!', { position: 'bottom-right' });
            setIsFavorited(false);
          }else if(response.data?.status=="1"){
            toast.success('Job saved!', { position: 'bottom-right' });
            setIsFavorited(true);
          }
          if(response.data?.message=="Invalid Hash Request"){
            toast.error("Session Expired Please login !", { position: 'bottom-right' });
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
    <div onClick={()=>{console.log(prop)}} className='job-card h-full flex flex-col justify-between w-full border shadow-sm border-lightGrey rounded-2xl bg-white p-4 3xl:p-6'>
      <div className="flex gap-3 3xl:gap-4 justify-between">
          <div className="flex gap-[10px] 3xl:gap-4">
            <CompanyLogo name={prop?.company_name} logo={prop?.company_logo} index={prop?.id || 0} />
            <div className="">
              <h3 className='text-xs 3xl:text-sm text-[#070828]'>{prop?.company_name}</h3>
              <p className='text-[8px] mt-1 3xl:text-xs text-[#B9B9B9]'>{timeAgo(prop?.job_posted_date)}</p>
            </div>
          {prop?.profile_matched_percentage>50 &&<div className="job-profile-match label small lightgreen">
          {prop?.profile_matched_percentage}% Profile Match
          </div>}
        </div>
        <span tabIndex={0} onClick={()=>{handleSave(prop?.id)}}>
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
          {prop?.is_industry_standard !=1&& 
            <Image width={15} height={15} src={'/new-assets/icons/rupee.svg'} className='mr-1 2xl:mr-2 size-[11px] 2xl:size-[15px]' alt='rupee icon' />
          }
          <span className='text-[10px] 2xl:text-sm'>{`${showSalary(prop?.is_industry_standard || "0", prop?.salary_range_unit ||"0",prop?.min_salary ||"0",prop?.max_salary ||"0")} `} </span>
          {prop?.is_industry_standard !=1 && <small className='text-[#B1B4B7]'> &nbsp; {` ${ prop?.salary_range_unit== "1"?` month`:` year`}`}</small>}
        </div>
      </div>
      <div className="flex flex-wrap xl:flex-nowrap gap-4 min-h-16 justify-between">
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
        <div className="flex action-btns gap-2 3xl:gap-4 flex-wrap xl:max-w-[170px] xl:flex-nowrap justify-end items-end">
        <Link href={`/jobs/detail/${prop?.id}`} className='grid place-items-center btn-border whitespace-nowrap !py-0 xl:!px-5 3xl:!px-8 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm text-red !border-red'>view Job</Link>
        <button type='button' onClick={()=>{handleApply(prop?.id)}} className={`grid place-items-center btn-border whitespace-nowrap !py-0 xl:!px-5 3xl:!px-8 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm text-white !bg-red !border-red ${isApplied?"!bg-[#eef2fe] job-applied-btn !border-[#eef2fe] !text-black cursor-default":""}`}>{isApplied?"Applied":"quick Apply"}</button>
        </div>
      </div>
    </div>
  )
}
