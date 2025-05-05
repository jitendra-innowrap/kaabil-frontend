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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import LogoutDialog from "../Auth/LogoutDialog";
import Notification from "./Notification";
import { RiArrowDropDownFill } from "react-icons/ri";
import { MdOutlineChat } from "react-icons/md";
import { showToast } from "../utils";
import toast from "react-hot-toast";

interface prop {
  closeSideMenu?: () => void;
}

export default function SignInButton({ closeSideMenu }: prop) {
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.user);
  const authUser = useAppSelector((state) => state.auth);
  const isOpen = useAppSelector((state) => state.loginDialog.isOpen);
  const progress = useAppSelector((state) => state.progress.value);
  const isUser = useAppSelector((state) => state.auth.token);
  const { is_profile_verify, unreadNotifications } = useAppSelector(
    (state) => state.user
  );
  const [open, setOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const popupRef = useRef<any>(null);
  const logoutdialogRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Get current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const logoutConfirmed = urlParams.get('logout-confirmation');    if (logoutConfirmed === 'true') {
      logout();
      // Clean the URL without reloading
      router.replace(window.location.pathname);
    }
  }, []);

  const closePopup = () => {
    dispatch(closeLoginDialog());
    setOpen(false);
  };
  const closeLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleSignIn = () => {
    closeSideMenu?.();
    // alert("sign in")
    dispatch(openLoginDialog());
    setOpen(true);
    // When User sigin start the process from first
    dispatch(setSaveMobileNumber(""));
    dispatch(setProgress(1));
  };

  const logout = () => {
    setOpenLogoutDialog(true);
  };
  const gotoMyjob = () => {
    router.push("/my-jobs");
  };
  const gotoMyProfile = () => {
    router.push("/my-profile");
  };

  const gotoMyInbox = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const chatUrl = `https://meuat.kaam.com/jobseeker/inbox?admin_id=${authUser?.id}&token=${authUser?.token}&profile_img=${user?.photo_url}`;
    if (isIOS) {
       // Most reliable method across all devices
      const a = document.createElement('a');
      a.href = chatUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Fallback if window doesn't open
      setTimeout(() => {
        if (!window.closed) {
          window.location.href = chatUrl;
        }
      }, 500);
    }else{
      // First check notification permission status
      if (window.Notification.permission === 'granted') {
        // Permission already granted - proceed to inbox
        window.open(chatUrl, '_blank', 'noopener,noreferrer');
      } else if (window.Notification.permission !== 'denied') {
        // Permission not yet decided - request permission first
        window.Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            window.open(chatUrl, '_blank', 'noopener,noreferrer');
          } else {
            showCustomToast();
          }
        });
      } else {
        // Permission was previously denied
        showCustomToast();
      }
    }
  };
  const showCustomToast = () => {
    toast.custom((t) => (
      <div
        className={`flex fixed top-6 left-1/2 -translate-x-1/2 text-[#231F20] max-w-[547px] w-[90%] lg:w-[60%] border rounded-lg border-[#E3183780] justify-between bg-[#FFEAED] text-xs md:text-sm p-3 xl:px-4 ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
        style={{
          transform: t.visible ? 'translate(-50%, 0)' : 'translate(-50%, -20px)',
          opacity: t.visible ? 1 : 0,
          transition: 'all 0.3s ease',
        }}
      >
        Kindly enable notifications in your web browser to receive real-time updates.
        <IoClose 
          size={16}
          className="size-5 3xl:size-6 cursor-pointer hover:opacity-70"
          color="#231F20"
          onClick={() => toast.dismiss(t.id)}
        />
      </div>
    ), {
      duration: 5000, // 5 seconds
      position: 'top-center',
    });
  };

  const handleOverlayClick = (e: MouseEvent) => {
    const target = e.target as HTMLFormElement;
    if (target.classList.contains("onboarding-overlay")) {
      closePopup();
    }
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when an option is selected
  const handleOptionClick = (action: () => void) => {
    setIsDropDownOpen(false);
    action();
  };

  useEffect(() => {
    // Add or remove 'no-scroll' class to body when popup is open or closed
    // if (open) {
    //   document.addEventListener("click", handleOverlayClick);
    //   document.body.classList.add("no-scroll");
    // } else if (openLogoutDialog) {
    //   document.addEventListener("click", handleOverlayClick);
    //   document.body.classList.add("no-scroll");
    // } else {
    //   document.removeEventListener("click", handleOverlayClick);
    //   document.body.classList.remove("no-scroll");
    // }
    return () => {
      document.removeEventListener("click", handleOverlayClick);
      document.body.classList.remove("no-scroll");
    };
  }, [open, openLoginDialog, openLogoutDialog]);

  return (
    <div className="flex">
      {isOpen && <SignIn closePopup={closePopup} />}
      <Popup
        ref={logoutdialogRef}
        open={openLogoutDialog}
        onClose={closeLogoutDialog}
        modal
        className="onboarding relative logout"
        overlayStyle={{
          background: "#4D4D4DC2",
          padding: "20px",
          overflow: "hidden",
        }}
        contentStyle={{
          height: progress === 5 ? "150%" : "auto",
        }}
      >
        <LogoutDialog onClose={closeLogoutDialog} />
      </Popup>
      {!isUser || is_profile_verify === "0" ? (
        <button
          id="sign-in-button"
          onClick={handleSignIn}
          className="bg-red !p-0 text-white sign-in-btn text-xs 2xl:text-sm lg:w-[70px] xl:w-[84px] h-[32px] 2xl:h-[38px] grid place-items-center rounded-[9px]"
        >
          Sign In
        </button>
      ) : (
        <div className="flex items-center gap-3 2xl:gap-6 3xl:gap-7">
          <Notification />
          <div
            ref={dropdownRef}
            className="relative group/menu flex items-center cursor-pointer mobile-profile-option"
            onMouseEnter={() => setIsDropDownOpen(true)}
            onMouseLeave={() => setIsDropDownOpen(false)}
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          >
            <div
              tabIndex={0}
              className="relative size-[30px] xl:size-[40px] 2xl:size-[50px]"
            >
              {/* {unreadNotifications > 0 && <span className="size-3 xl:size-[14px] 3xl:size-[18px] bg-success text-white rounded-full absolute text-[8px] xl:text-[9px] 3xl:text-[11px] grid place-items-center leading-none -top-[4px] -right-[4px] xl:top-[2px] xl:-right-[4px] 2xl:top-[2px] 2xl:-right-[1px] 3xl:-top-[0px] 3xl:-right-[4px] border-[1.5px] border-white">
                {unreadNotifications}
              </span>} */}
              <Image
                height={100}
                width={100}
                src={user?.photo_url || "/new-assets/icons/avatar.svg"}
                className="object-cover border rounded-full flex-shrink-0 size-[30px] w-full xl:size-[40px] 2xl:size-[50px]"
                alt="Profile picture"
              />
            </div>
            <RiArrowDropDownFill className="font-medium text-xl 3xl:text-2xl text-black" />

            {/* Dropdown menu - now controlled by isOpen state */}
            <div
              className={`absolute z-30 ${
                isDropDownOpen ? "block" : "hidden"
              } top-0 lg:left-0 profile-options-menu`}
            >
              <div className="bg-white shadow-default mt-[45px] lg:mt-[52px] 2xl:mt-[76px] rounded-xl w-[140px] 2xl:w-[180px] border border-lightGrey divide-y divide-lightGrey">
                <div
                  onClick={() => handleOptionClick(gotoMyProfile)}
                  className="flex items-center group/link gap-3 3xl:gap-4 text-Grey hover:text-black py-3 2xl:py-4 font-medium hover:font-semibold text-xs 2xl:text-base px-5 cursor-pointer"
                >
                  <Image
                    className="size-4 3xl:size-5 block group-hover/link:hidden"
                    src="/new-assets/icons/user.svg"
                    width={20}
                    height={20}
                    alt="Profile"
                  />
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
                  onClick={() => handleOptionClick(gotoMyInbox)}
                  className="flex items-center group/link gap-3 3xl:gap-4 text-Grey hover:text-black py-3 2xl:py-4 font-medium hover:font-semibold text-xs 2xl:text-base px-5 cursor-pointer"
                >
                  <MdOutlineChat className="size-4 3xl:size-5 block text-[#4D4D4F] group-hover/link:text-black"/>
                  My Inbox
                </div>
                <div
                  onClick={() => handleOptionClick(gotoMyjob)}
                  className="flex items-center group/link gap-3 3xl:gap-4 text-Grey hover:text-black py-3 2xl:py-4 font-medium hover:font-semibold text-xs 2xl:text-base px-5 cursor-pointer"
                >
                  <Image
                    className="size-4 3xl:size-5 block group-hover/link:hidden"
                    src="/new-assets/icons/my-jobs.svg"
                    width={50}
                    height={50}
                    alt="My Jobs"
                  />
                  <Image
                    className="size-4 3xl:size-5 hidden group-hover/link:block"
                    src="/new-assets/icons/my-jobs-black.svg"
                    width={50}
                    height={50}
                    alt="My Jobs"
                  />
                  My Jobs
                </div>
                <div
                  onClick={() => handleOptionClick(logout)}
                  className="flex items-center group/link gap-3 3xl:gap-4 text-Grey hover:text-black py-3 2xl:py-4 font-medium hover:font-semibold text-xs 2xl:text-base px-5 cursor-pointer"
                >
                  <Image
                    className="size-4 3xl:size-5 block group-hover/link:hidden"
                    src="/new-assets/icons/logout.svg"
                    width={50}
                    height={50}
                    alt="Logout"
                  />
                  <Image
                    className="size-4 3xl:size-5 hidden group-hover/link:block"
                    src="/new-assets/icons/logout-black.svg"
                    width={50}
                    height={50}
                    alt="Logout"
                  />
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
