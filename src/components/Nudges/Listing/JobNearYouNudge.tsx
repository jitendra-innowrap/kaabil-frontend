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
export default function JobsNearYouNudge({id, icon, color, title, desc}:prop) {
  const router = useRouter();
    const handleClick=()=>{
      router.push('/nearest-jobs')
    }
  return (
    <div onClick={handleClick}>
      <Image
        className="cursor-pointer w-full h-auto hidden lg:block"
        src={icon ? icon: '/new-assets/images/nudges/listing/jobs-near-you-nudge-full-updated2.webp'}
        width={341}
        quality={100}
        draggable={false}
        height={249}
        alt="resume-builder"
        /> 
        <Image
          className="cursor-pointer w-full h-auto lg:hidden"
          src={icon ? icon: '/new-assets/images/nudges/listing/jobs-near-you-mobile-updated2.webp'}
          width={341}
          quality={100}
          draggable={false}
          height={249}
          alt="resume-builder"
          /> 
    </div>
  )
}