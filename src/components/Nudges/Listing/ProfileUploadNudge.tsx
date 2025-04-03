import Image from 'next/image'
import React from 'react'
interface prop{
  id?: string,
  icon?: string,
  color?: string,
  title?: string,
  desc?: string,
}
export default function ProfileUploadNudge({id, icon, color, title, desc}:prop) {
  return (
    <div className={`flex justify-between rounded-2xl px-4 3xl:px-6 py-3 3xl:py-5`} style={{background: `#${color || "C3DEF3"}`}}>
        <div className="block">
            <h3 className="text-sm md:text-base 2xl:text-lg font-bold">{title? title: "Upload your profile picture"}</h3>
            <p className=' text-xs md:text-sm'>{desc ? desc: "Candidates with profile pictures are 4x more likely to get responses from companies."}</p>
            <button className="mt-3 md:mt-4 !text-white !bg-black !text-xs">Upload</button>
        </div>
        <Image
            className="cursor-pointer w-[80px] 2xl:w-[100px] h-auto"
            src={icon ? icon: '/new-assets/images/nudges/listing/profile-picture.svg'}
            width={287}
            draggable={false}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
