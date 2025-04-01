'use client'
import { clearSessionData } from '@/components/utils/deviceId';
import { setProgress } from '@/redux/progressSlice';
import { signOut } from '@/redux/userSlice';
import React from 'react'
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
interface prop {
    onClose: () => void;
  }
export default function LogoutDialog({ onClose }: prop) {
    const dispatch = useDispatch();
    const handleLogout=()=>{
        dispatch(signOut());
        onClose();
        dispatch(setProgress(1));
        clearSessionData();
    }
    return (
        <div className="relative sign-up-modal mx-auto py-5 md:py-8 xl:py-10 w-[90%] rounded-2xl">
              <div onClick={onClose}>
                <IoClose className="absolute z-30 cursor-pointer top-4 -right-4 size-8 font-bold stroke-[1.9]" />
              </div>
              <div>
                <h2 className="text-center font-semibold text-lg md:text-xl 2xl:text-[28px] 2xl:leading-[36px]">
                    Are you sure you want to logout?
                </h2>
                    <div className="mt-4 flex gap-3 w-full justify-center">
                    <button
                        onClick={()=>onClose()}
                        type="button"
                        className={`no-margin cancel-logout px-6 py-2 text-red !border-red btn-border rounded`}
                    >
                        Not Now
                    </button>
                    <button
                        onClick={handleLogout}
                        type="button"
                        className={`no-margin px-6 py-2 bg-red text-white rounded`}
                    >
                        Yes, Logout !
                    </button>
                    </div>
                </div>

            </div>
        
      );
}
