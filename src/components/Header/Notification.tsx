import Image from 'next/image';
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { PiBellBold } from 'react-icons/pi'
import Popup from 'reactjs-popup';

export default function Notification() {
    const [open, setOpen] = useState(false);
    const handleOpen =() => {
        setOpen(true);
    }
    const handleClose =() => {
        setOpen(false)
    }
    const notifications =[
        {
            id:'1',
        },
        {
            id:'2',
        },
        {
            id:'3',
        },
        {
            id:'4',
        },
        {
            id:'5',
        },
        {
            id:'6',
        },
        {
            id:'7',
        },
    ]
  return (
    <>
        <div className="relative cursor-pointer" tabIndex={0} onClick={handleOpen}>
            <span className="size-2 xl:size-[14px] 3xl:size-[16px] bg-success text-white rounded-full absolute text-[10px] grid place-items-center leading-none -top-[4px] -right-[4px] border-[1.5px] border-white">
              5
            </span>
            <PiBellBold className="size-4 3xl:size-5" />
        </div>
        <Popup
            open={open}
            onClose={handleClose}
            modal
            lockScroll
            className="notification relative logout"
            overlayStyle={{
                background: "#4D4D4DC2",
                padding: "20px",
                overflow: "hidden",
            }}
            >
                <div className="bg-white rounded 2xl:rounded-xl 3xl:rounded-2xl p-3 3xl:p-8">
                    <div className="flex justify-between items-center">
                        <div className='font-medium 2xl:text-lg 3xl:text-2xl leading-5 flex gap-1 items-center'>
                            Notification
                            <span className="size-2 xl:size-[16px] 3xl:size-5 bg-success text-white rounded-full text-[10px] grid place-items-center leading-none -top-[4px] -right-[4px] border-[1.5px] border-white">
                            5
                            </span>
                        </div>
                        <IoClose
                            className="size-4 3xl:size-6 cursor-pointer -translate-y-1"
                            onClick={handleClose}
                        />
                    </div>
                    
                    <div className="flex mt-2 2xl:mt-3 mb-2 2xl:mb-[9px] justify-end">
                        <p className='font-medium text-end text-[11px] leading-[100%]'>MARK ALL READ</p>
                    </div>
                    <div className="flex flex-col gap-[6px] 3xl:gap-2 h-[323px] xl:h-[389px] 2xl:h-[423px] 3xl:h-[614px]  overflow-auto notification-list">
                        {
                            notifications.map((noti)=>(
                                <div key={noti.id} className="notification-card border rounded-lg flex p-2 3xl:p-3 gap-3 bg-[#F9D1D754]">
                            <Image className='size-14 3xl:size-[70px]' src={'/new-assets/icons/notification-profile-placeholder.svg'} width={140} height={140} alt='profile photo' />
                            <div className="3xl:pt-3">
                                <div className="flex gap-5">
                                    <p className='text-[10px] 3xl:text-xs text-[#4D4D4F]  line-clamp-2'>Hi Anuradha Jain, thank you for reaching...</p>
                                    <IoClose
                                        className="size-3 cursor-pointer 3xl:-translate-y-3"
                                    />
                                </div>
                                <p className='text-[#4D4D4FB2] text-end mt-4 text-[10px] leading-[100%]'>11:03 am</p>
                            </div>
                        </div>
                            ))
                        }
                    </div>
                </div>
        </Popup>
    </>
  )
}
