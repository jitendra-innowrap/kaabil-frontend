import React from 'react'
import { jobcardtype } from './CompanyCard'
import Image from 'next/image'
import Link from 'next/link'
export interface industryCard extends jobcardtype {
  color: string
}
import { motion } from 'framer-motion';

export default function IndustryCard({ icon, title, jobUrl, color }: industryCard) {
  return (
    <Link className="block w-full h-full hover:scale-[1.03] transition-all duration-200" href={jobUrl}>
      <div style={{ background: `${color}` }} className={`w-full h-full flex flex-col justify-between bg-white rounded-2xl p-4 2xl:p-6 text-center`}>
        <div className="block">
          <Image
            className="h-[63px] lg:h-[100px] xl:h-[90px] 3xl:h-[127px] w-auto rounded-full cursor-pointer mx-auto"
            src={icon}
            width={90}
            height={90}
            alt="company-icons"
          />
          <motion.h3 initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }} className="font-medium text-black line-clamp-2 text-sm 2xl:text-xl 3xl:text-[22px] 3xl:leading-[30px] mt-2 2xl:mt-4 mx-auto px-3 max-w-[140px] 2xl:max-w-[180px]">{title}</motion.h3>
        </div>
      </div>
    </Link>
  )
}
