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
  return (
    <>
        <div className="relative cursor-pointer" tabIndex={0} onClick={handleClose}>
            <span className="size-2 xl:size-[14px] bg-success text-white rounded-full absolute text-[10px] grid place-items-center leading-none -top-[4px] -right-[4px] border-[1.5px] border-white">
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
                <div className="bg-white rounded xl:rounded-xl 3xl:rounded-2xl p-5 3xl:p-8">
                    <div className="flex">
                        <div className='font-medium xl:text-xl 3xl:text-2xl leading-5 tracking-[-32px]'>Notification</div>
                        <IoClose
                            className="absolute top-2 right-2 cursor-pointer"
                            onClick={handleClose}
                        />
                    </div>
                </div>
        </Popup>
    </>
  )
}
