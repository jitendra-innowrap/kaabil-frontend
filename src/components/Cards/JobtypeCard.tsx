'use client'
import Image from 'next/image'
import React from 'react'
import { MdArrowOutward } from 'react-icons/md'
import { jobcardtype } from './CompanyCard'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion';


export default function JobtypeCard({ icon, title, jobUrl }: jobcardtype) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/jobs?job_types_filter=${title}`)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.4 }} whileHover={{ scale: 1.05 }} onClick={handleClick} className="job-type-card p-3 group cursor-pointer 3xl:max-h-[115px] 2xl:p-4 3xl:p-6 gap-2 lg:gap-4 flex rounded-2xl 2xl:rounded-3xl items-center justify-between bg-lightGrey">
      <div className="flex items-center">
        <Image
          className="hidden lg:block lg:size-[40px] xl:size-[47px] 3xl:size-[76px] cursor-pointer mx-auto"
          src={icon}
          width={90}
          height={90}
          alt="company-icons"
        />
        <h3 className='lg:ml-5 2xl:ml-6 3xl:ml-[30px] font-medium text-sm xl:text-base 3xl:text-2xl '>{title}</h3>
      </div>
      <div className="arrow flex-shrink-0 bg-[#FFFCFC] group-hover:bg-black size-9 3xl:size-14 rounded-full grid place-items-center">
        <MdArrowOutward className='text-black group-hover:text-white size-5 lg:size-[14px] xl:size-4 2xl:size-6' />
      </div>
    </motion.div>
  )
}
