import Image from 'next/image'
import React from 'react'
interface prop{
  id?: string,
  icon?: string,
  color?: string,
  title?: string,
  desc?: string,
}
export default function UpdloadCvNudge({id, icon, color, title, desc}:prop) {
  return (
    <div className={`flex justify-between rounded-2xl px-4 3xl:px-6 py-3 3xl:py-5`} style={{background: `#${color || "F9D1D7"}`}}>
        <div className="block">
            <h3 className="text-sm md:text-base 2xl:text-lg font-bold">{title? title: "Upload your CV for improved matching results"}</h3>
            <p className=' text-xs md:text-sm'>{desc ? desc: "Quickly update your current CV for better results."}</p>
            <button className="mt-3 md:mt-4 !text-white !bg-black !text-xs">Upload</button>
        </div>
        <Image
            className="cursor-pointer w-[80px] 2xl:w-[100px] h-auto"
            src={icon ? icon: '/new-assets/images/nudges/listing/cv-nudge.svg'}
            width={287}
            draggable={false}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
