'use client'
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import Popup from 'reactjs-popup'
interface prop{
  id?: string,
  icon?: string,
  color?: string,
  title?: string,
  desc?: string,
}
export default function WelcomeVideoNudge({id, icon, color, title, desc}:prop) {
    const {helpVideoData} = useAppSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const popupRef = useRef<any>(null);
    const closePopup=()=>{
      setOpen(false);
    }
  return (
    <div className={`flex justify-between flex-row-reverse gap-4 rounded-2xl px-4 3xl:px-6 py-3 3xl:py-5`} style={{background: `#${color || "E31837"}`}}>
        <div className="block">
            <h3 className="text-sm md:text-base text-white 2xl:text-lg font-bold">{title? title: "Welcome to Kaabil"}</h3>
            <p className=' text-xs md:text-sm text-white'>{desc ? desc: "Here's a tip on how to stand out from the crowd123"}</p>
            {/* <button className="mt-3 md:mt-4 !text-white !bg-black !text-xs">Add</button> */}
        </div>
        <Image
            className="cursor-pointer w-[80px] 2xl:w-[100px] h-auto"
            src={icon ? icon: '/new-assets/images/nudges/listing/wlcm-video.svg'}
            width={287}
            draggable={false}
            height={253}
            alt="resume-builder"
            onClick={()=> setOpen(true)}
            /> 
      {/* Popup for displaying media */}
            <Popup
              ref={popupRef}
              open={open}
              onClose={closePopup}
              modal
              className="video-payer company-gallary"
              overlayStyle={{
                background: "#4D4D4DC2",
                padding: "20px",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >(
                <video
                  src={helpVideoData?.video_url}
                  controls
                  autoPlay
                  playsInline
                  style={{ width: "auto", height: "auto", maxHeight:"400px", margin:"auto " }}
                >
                  Your browser does not support the video tag.
                </video>
              )
            </Popup>
    </div>
  )
}
