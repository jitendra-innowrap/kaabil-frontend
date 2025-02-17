'use client'
import React, { useRef, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import SignIn from '@/components/Auth/SignIn';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hooks';
import { PiBellBold } from 'react-icons/pi';
import { BiChevronDown } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from '@/redux/userSlice';
import { setProgress } from '@/redux/progressSlice';

interface prop {
  closeSideMenu?: () => void;  
}

export default function SignInButton({ closeSideMenu }: prop) {
  const dispatch = useDispatch();
  const isUser = useAppSelector((state) => state.user.name);
  const [open, setOpen] = useState(false)
  const popupRef = useRef<any>(null);

  const closePopup = () => {
    setOpen(false);
    if (popupRef.current) {
      popupRef.current.close();
    }
  };

  const handleSignIn = () => {
    setOpen(true);
    closeSideMenu?.();
  };

  const logout = () => {
    dispatch(signOut());
    dispatch(setProgress(1));
  };

  return (
    <div className="flex">
      {/* Always render the popup but control its visibility */}
      <Popup
        ref={popupRef}
        open={open}
        onClose={closePopup}
        modal
        overlayStyle={{
          background: '#4D4D4DC2',
          padding: '20px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <SignIn onClose={closePopup} />
      </Popup>

      {!isUser ? (
        <button 
          onClick={handleSignIn}
          className='bg-red text-white text-sm w-[120px] h-[38px] grid place-items-center rounded-[9px]'
        >
          Sign In
        </button>
      ) : (
        <div className="flex items-center gap-3 2xl:gap-7">
          <div className="relative" tabIndex={0}>
            <span className='size-2 xl:size-[14px] bg-success text-white rounded-full absolute text-[10px] grid place-items-center leading-none -top-[4px] -right-[4px] border-[1.5px] border-white'>5</span>
            <PiBellBold className='size-4 xl:size-5'/>
          </div>
          <div className='relative group/menu flex items-center cursor-pointer'>
            <div tabIndex={0} className="relative">
              <span className='size-2 xl:size-[14px] bg-success text-white rounded-full absolute text-[10px] grid place-items-center leading-none top-[1px] -right-[2px] border-[1.5px] border-white'>5</span>
              <Image
                height={100}
                width={100}
                src="/new-assets/icons/avatar.png"
                className='w-auto max-w-fit h-[30px] xl:h-[40px] 2xl:h-[50px]'
                alt='kaabil logo'
              />
            </div>
            <BiChevronDown className='font-medium text-2xl text-black'/>
            <div className="absolute z-30 hidden group-focus-within/menu:block group-hover/menu:block top-0 right-0">
              <div className="bg-white shadow-default mt-[56px] rounded-xl w-[200px] border border-lightGrey divide-y divide-lightGrey">
                <div 
                  onClick={logout} 
                  className='block text-Grey hover:text-black py-4 font-medium hover:font-semibold text-sm 2xl:text-base px-5 cursor-pointer'
                >
                  Logout
                </div>
                <div 
                  onClick={() => setOpen(true)}
                  className='block text-Grey hover:text-black py-4 font-medium hover:font-semibold text-sm 2xl:text-base px-5 cursor-pointer'
                >
                  Complete Profile
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}