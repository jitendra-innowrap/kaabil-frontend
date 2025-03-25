"use client";
import React, { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SignIn from "@/components/Auth/SignIn";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { PiBellBold } from "react-icons/pi";
import { BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { setSaveMobileNumber, signOut } from "@/redux/userSlice";
import { setProgress } from "@/redux/progressSlice";
import { clearSessionData } from "../utils/deviceId";
import { AiOutlineClose } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { closeLoginDialog, openLoginDialog } from "@/redux/loginDialogSlice";

interface prop {
  closeSideMenu?: () => void;
}

export default function SignInButton({ closeSideMenu }: prop) {
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.loginDialog.isOpen);
  const progress = useAppSelector((state) => state.progress.value);
  const isUser = useAppSelector((state) => state.auth.token);
  const { is_profile_verify } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const popupRef = useRef<any>(null);

  const closePopup = () => {
    dispatch(closeLoginDialog());
    setOpen(false);
  };

  const handleSignIn = () => {
    closeSideMenu?.();
    dispatch(openLoginDialog());
    setOpen(true);
    // When User sigin start the process from first
    dispatch(setSaveMobileNumber(""));
    dispatch(setProgress(1));
  };

  const logout = () => {
    dispatch(signOut());
    dispatch(setProgress(1));
    clearSessionData();
  };

  const handleOverlayClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("onboarding-overlay")) {
      closePopup();
    }
  };

  useEffect(() => {
    // Add or remove 'no-scroll' class to body when popup is open or closed
    if (open) {
      document.addEventListener("click", handleOverlayClick);
      document.body.classList.add("no-scroll");
    } else {
      document.removeEventListener("click", handleOverlayClick);
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.removeEventListener("click", handleOverlayClick);
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  return (
    <div className="flex">
      {true && (
        <Popup
          ref={popupRef}
          open={open}
          closeOnDocumentClick={false}
          onClose={closePopup}
          modal
          className="onboarding relative"
          overlayStyle={{
            background: "#4D4D4DC2",
            padding: "20px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <SignIn onClose={closePopup} />
        </Popup>
      )}
      {!isUser || is_profile_verify === "0" ? (
        <button
          id="sign-in-button"
          onClick={handleSignIn}
          className="bg-red text-white text-xs !p-0 2xl:text-sm lg:w-[70px] 2xl:w-[84px] h-[32px] 2xl:h-[38px] grid place-items-center rounded-[9px]"
        >
          Sign In
        </button>
      ) : (
        <div className="flex items-center gap-3 2xl:gap-7">
          <div className="relative" tabIndex={0}>
            <span className="size-2 xl:size-[14px] bg-success text-white rounded-full absolute text-[10px] grid place-items-center leading-none -top-[4px] -right-[4px] border-[1.5px] border-white">
              5
            </span>
            <PiBellBold className="size-4 3xl:size-5" />
          </div>
          <div className="relative group/menu flex items-center cursor-pointer">
            <div tabIndex={0} className="relative">
              <span className="size-2 xl:size-[14px] bg-success text-white rounded-full absolute text-[10px] grid place-items-center leading-none top-[1px] -right-[2px] border-[1.5px] border-white">
                5
              </span>
              <Image
                height={100}
                width={100}
                src="/new-assets/icons/avatar.svg"
                className="w-auto max-w-fit h-[30px] xl:h-[40px] 2xl:h-[50px]"
                alt="kaabil logo"
              />
            </div>
            <BiChevronDown className="font-medium text-xl 3xl:text-2xl text-black" />
            <div className="absolute z-30 hidden group-focus-within/menu:block group-hover/menu:block top-0 left-0">
              <div className="bg-white shadow-default mt-[52px] 2xl:mt-[76px] rounded-xl w-[140px] 3xl:w-[180px] border border-lightGrey divide-y divide-lightGrey">
                
              <div className="flex items-center group/link gap-3 3xl:gap-4 text-Grey hover:text-black py-3 2xl:py-4 font-medium hover:font-semibold text-xs 2xl:text-base px-5 cursor-pointer">
                  {/* Default (gray) image - hidden on hover */}
                  <Image 
                    className="size-4 3xl:size-5 block group-hover/link:hidden" 
                    src="/new-assets/icons/user.svg" 
                    width={20} 
                    height={20} 
                    alt="Profile" 
                  />
                  
                  {/* Black image - shown on hover */}
                  <Image 
                    className="size-4 3xl:size-5 hidden group-hover/link:block" 
                    src="/new-assets/icons/user-black.svg" 
                    width={20} 
                    height={20} 
                    alt="Profile" 
                  />
                  
                  View Profile
                </div>
                <div
                  className="flex items-center group/link gap-3 3xl:gap-4 text-Grey hover:text-black py-3 2xl:py-4 font-medium hover:font-semibold text-xs 2xl:text-base px-5 cursor-pointer"
                >
                  <Image className="size-4 3xl:size-5 block group-hover/link:hidden" src={'/new-assets/icons/my-jobs.svg'} width={50} height={50} alt="logout" />
                  <Image className="size-4 3xl:size-5 hidden group-hover/link:block" src={'/new-assets/icons/my-jobs-black.svg'} width={50} height={50} alt="logout" />
                  My Jobs
                </div>
                <div
                  onClick={logout}
                  className="flex items-center group/link gap-3 3xl:gap-4 text-Grey hover:text-black py-3 2xl:py-4 font-medium hover:font-semibold text-xs 2xl:text-base px-5 cursor-pointer"
                >
                  <Image className="size-4 3xl:size-5 block group-hover/link:hidden" src={'/new-assets/icons/logout.svg'} width={50} height={50} alt="logout" />
                  <Image className="size-4 3xl:size-5 hidden group-hover/link:block" src={'/new-assets/icons/logout-black.svg'} width={50} height={50} alt="logout" />
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
