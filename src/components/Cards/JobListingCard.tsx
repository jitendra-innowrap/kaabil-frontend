'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiHeart } from 'react-icons/ci'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { LiaMapMarkerAltSolid } from 'react-icons/lia'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbBriefcase2 } from 'react-icons/tb'
import { formatDate, showExperience, showSalary, timeAgo } from '../utils'
import api from '@/Services/Apiservice'
import toast from 'react-hot-toast'

export default function JobListingCard(prop:any) {
  const [isFavorited, setIsFavorited] = React.useState(prop?.saveJob_status==="1"?true:false);
    const handleApply = (id:string) => {
      // setIsFavorited(!isFavorited)
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
            if(response.data?.status==="2"){
              toast.success('Job Unsaved!', { position: 'bottom-right' });
              setIsFavorited(false);
            }else if(response.data?.status==="1"){
              toast.success('Job saved!', { position: 'bottom-right' });
              setIsFavorited(true);
            }
            console.log(response);
          } catch (error) {
            console.error('Error fetching jobs:', error);
          }
    }
  return (
    <div className='job-card h-full flex flex-col justify-between w-full border shadow-sm border-lightGrey rounded-2xl bg-white p-4 3xl:p-6'>
      <div className="flex gap-3 3xl:gap-4 justify-between">
          <div className="flex gap-[10px] 3xl:gap-4">
          <Image
            src={prop?.company_logo || '/new-assets/icons/company_icon_placeholder.png'}
            width={44}
            height={44}
            alt="company profile logo"
            className="rounded-full border border-[#B9B9B9] size-9 3xl:size-11"
            />
            <div className="">
            <h3 className='text-xs 3xl:text-sm text-[#070828]'>{prop?.company_name}</h3>
            <p className='text-[8px] mt-1 3xl:text-xs text-[#B9B9B9]'>{timeAgo(prop?.created_date)}</p>
          </div>
        </div>
        <span tabIndex={0} onClick={()=>{handleSave(prop?.id)}}>
        {
          !isFavorited? (
            <IoIosHeartEmpty className={`text-[#717B9E] size-4 3xl:size-5 cursor-pointer`}/>
          ) : (
            <IoIosHeart className={`text-red size-4 3xl:size-5 cursor-pointer`}/>
          )
        }
        
        </span>
      </div>
      <h3 className='text-sm 3xl:text-base min-h-10 2xl:text-lg 3xl:min-h-14 font-medium my-[6px] 3xl:my-3 line-clamp-2'>{prop?.job_title}</h3>
      <div className="flex mb-1 md:mb-2">
      <img src={'/new-assets/icons/location-pin-dot.svg'} alt='Map pin' width={100} height={100} className='size-3 2xl:size-[19px]' />
      <span className='ml-2 text-[10px] 2xl:text-sm text-[#545581]'>{prop?.job_location_city_list?.map((city:string, index:number) => (
        <React.Fragment key={index}>
          {city}
          {index < prop?.job_location_city_list.length - 1 && ", "}
        </React.Fragment>
      ))}</span>
      </div>
      <div className="flex gap-2">
        <div className="flex">
          <TbBriefcase2 className='text-[#545581] size-3 2xl:size-5'/>
          <span className='ml-2 text-[10px] 2xl:text-sm text-[#545581]'>{showExperience(prop?.min_exp ||"0", prop?.max_exp || "0", "yrs experience")}</span>
        </div>
        <div className='ml-5 text-[10px] 2xl:text-sm text-[#545581]'>{showSalary(prop?.is_industry_standard || "0", prop?.salary_range_unit ||"0",prop?.min_salary ||"0",prop?.max_salary ||"0")} 
          {/* / <small className='text-[#B1B4B7]'>month</small> */}
          </div>
      </div>
      <div className="flex flex-wrap xl:flex-nowrap gap-4 min-h-16 justify-between">
        <ul className='flex flex-wrap gap-2 mt-3'>
          {prop?.skills?.slice(0, 3)?.map((skill:any, index:number) => (
            <li className='label small' key={index}>
              {skill?.name}
            </li>
          ))}
          {
            prop?.skills?.length > 3 && (
              <li className='label small cursor-default'>+{(prop?.skills?.length - 3).toString()} More</li>
            )
          }
        </ul>
        <div className="flex action-btns gap-2 3xl:gap-4 flex-wrap xl:max-w-[170px] xl:flex-nowrap justify-end items-end">
        <Link href={`/jobs/detail/${prop?.id}`} className='grid place-items-center btn-border whitespace-nowrap !py-0 xl:!px-5 3xl:!px-8 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm text-red !border-red'>view Job</Link>
        <button type='button' onClick={()=>{handleApply(prop?.id)}} className='grid place-items-center btn-border whitespace-nowrap !py-0 xl:!px-5 3xl:!px-8 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm text-white !bg-red !border-red'>quick Apply</button>
        </div>
      </div>
    </div>
  )
}
