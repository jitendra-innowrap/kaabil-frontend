import Image from 'next/image'
import React from 'react'
import { BiPlay } from 'react-icons/bi'
import { motion } from 'framer-motion';

export default function SuccessCard({video_url, cover_photo, designation_company, name}: SuccessCard) {
  return (
    <motion.div
      custom={1}
      initial="hidden"
      animate="visible"
      // variants={cardVariants}
      whileHover={{
        scale: 1.03,
        boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
      }} className="relative rounded-2xl 2xl:rounded-3xl">
        <div className="w-full absolute h-1/2 bottom-0 left-0 rounded-2xl 2xl:rounded-3xl" style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 37.24%, rgba(0, 0, 0, 0.75) 100%)'}}></div>
            <Image
                className="w-full rounded-2xl object-cover h-[300px] sm:h-[478px] md:h-[550px] lg:h-[296px] xl:h-[390px] 2xl:h-[485px] 3xl:h-[518px]"
                src={cover_photo ||"/"}
                width={939}
                height={1542}
                quality={100}
                alt="company-icons"
                />   
             <div className="p-3 2xl:p-5 absolute bottom-0 left-0"> 
                <h3 className='text-white font-normal text-sm md:text-base 2xl:text-2xl'>{name}</h3>
                <p className='!font-thin text-[#E6E7E8] text-[10px] 2xl:text-sm leading-none'>{designation_company}</p>
             </div>
            {video_url && <div className="absolute cursor-pointer bottom-2 right-2 size-9 2xl:size-11 bg-white rounded-full grid place-items-center">
            <BiPlay className='translate-x-[1px]'/>
          </div>}
        </motion.div>
  )
}
