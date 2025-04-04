import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
interface prop{
  id?: string,
  icon?: string,
  color?: string,
  title?: string,
  desc?: string,
}
export default function EditProfileNudge({id, icon, color, title, desc}:prop) {
  const router = useRouter();
  const handleClick=()=>{
    router.push('/my-profile')
  }
  return (
    <div onClick={handleClick} className={`flex cursor-pointer justify-between rounded-2xl px-4 3xl:px-6 py-3 3xl:py-5`} style={{background: `#${color || "FDE0AD"}`}}>
        <div className="block">
            <h3 className="text-sm md:text-base 2xl:text-lg font-bold">{title? title: "The more we know, the better we can help place you. "}</h3>
            <p className=' text-xs md:text-sm'>{desc ? desc: "Go on to Edit Profile to help us get to know you better."}</p>
            <button className="mt-3 md:mt-4 !text-white !bg-black !text-xs">Edit</button>
        </div>
        <Image
            className="cursor-pointer w-[80px] 2xl:w-[100px] h-auto"
            src={icon ? icon: '/new-assets/images/nudges/listing/edit-profile.svg'}
            width={287}
            draggable={false}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
