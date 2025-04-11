'use client'
import React, { useEffect, useState } from 'react';
import { Twirl as Hamburger } from 'hamburger-react'
import { SlGlobe, SlMagnifier } from 'react-icons/sl';
import Link from 'next/link';
import { BiChevronDown } from 'react-icons/bi';
import SignInButton from './SignInButton';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';
import ProfileCard from '../Nudges/SideMenu/Profile';
import { useRouter } from 'next/navigation';

export default function BurgerMenu() {
    const [isOpen, setOpen] = useState(false);
    const closeSideMenu = ()=>{
        setOpen(false);
    }
    const {isLoggedIn} = useAppSelector((state) => state.user);
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden', 'fixed', 'w-full', 'pr-[calc(100vw-100%)]');
        } else {
            document.body.classList.remove('overflow-hidden', 'fixed', 'w-full', 'pr-[calc(100vw-100%)]');
        }
        
        return () => {
            document.body.classList.remove('overflow-hidden', 'fixed', 'w-full', 'pr-[calc(100vw-100%)]');
        };
    }, [isOpen]);
    
    const handleSignIn =()=>{
        const button = document.getElementById('sign-in-button');
        if (button) {
            button.click(); // Programmatically triggers the button click
        }
        setOpen(false);
        return
    }
    const router = useRouter();
    return (
        <div className="relative">

            {isOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black opacity-50"
                    onClick={() => setOpen(false)}
                />
            )}
            <div className=" relative" onClick={()=> setOpen(!isOpen)}>
                <Image src={'/new-assets/icons/mobile-menu-icon.svg'} className='' width={20} height={12} alt='menu icon' />
            </div>
            <div
                className={`fixed z-10 top-0 left-0 h-full w-[calc(100vw_-_60px)] rounded-e-2xl max-w-[380px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div onClick={()=>{router.push('/'); setOpen(false)}} className="flex pl-5 relative mt-4 mb-10 pr-4 items-center">
                    <img
                        src="/new-assets/logos/kaabil-logo.svg"
                        className='w-auto max-w-fit h-[50px] md:h-[80px] 2xl:h-[100px]'
                        alt='kaabil logo'
                        />
                </div>
                {/* <div className="flex gap-3 px-6 py-2 border rounded-full mb-6 mx-6">
                    <SlMagnifier  className='size-5' color='#959595' />
                    <input type="text" className='outline-none focus:outline-none placeholder:text-[#959595] w-[300px] text-sm' placeholder='Search Jobs, Companies & More' />
                </div> */}
                <div className="flex flex-col gap-2 justify-between h-[calc(100vh_-_128px)] md:h-[calc(100vh_-_158px)]">
                    <ul className="flex flex-col px-6 gap-4 xl:gap-8">
                        {
                            !isLoggedIn ? <li>
                                <button
                                onClick={handleSignIn}
                                className="bg-red !p-0 text-white sign-in-btn text-xs 2xl:text-sm !w-[116px] xl:w-[84px] h-[33px] 2xl:h-[38px] grid place-items-center rounded-[9px] mb-6"
                                >
                                Sign In
                                </button>
                            </li>
                            :
                            <div className="block">
                                <ProfileCard closeSideMenu={closeSideMenu}/>
                            </div>
                        }
                        <li className='flex'>
                            <Link onClick={closeSideMenu} href={"/jobs"} className='text-Grey hover:text-black font-medium hover:font-semibold relative after:w-full after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-12px] after:left-0 flex items-center gap-3'>
                            <Image src={"/new-assets/icons/menu-jobs-bag.svg"} width={18} height={18} alt='jobs icon' />
                            Jobs
                            </Link>
                        </li>
                        {/* <li className='relative group/menu flex'>
                            <Link onClick={closeSideMenu} href={"/"} className='text-Grey hover:text-black font-medium group-hover/menu:font-semibold relative after:w-full after:h-1 after:rounded-[4px] group-hover/menu:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                            Career Tools
                            </Link>
                        </li> */}
                        <li className='flex'>
                            <Link onClick={closeSideMenu} href={"/companies"} className='text-Grey hover:text-black font-medium hover:font-semibold relative after:w-full after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-12px] after:left-0 flex items-center gap-3'>
                            <Image src={"/new-assets/icons/menu-jobs-bag.svg"} width={18} height={18} alt='jobs icon' />
                            Companies
                            </Link>
                        </li>
                        <li className='flex'>
                            <Link onClick={closeSideMenu} href={"/about-us"} className='text-Grey hover:text-black font-medium hover:font-semibold relative after:w-full after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-12px] after:left-0 flex items-center gap-3'>
                            <Image src={"/new-assets/icons/menu-about.svg"} width={18} height={18} alt='jobs icon' />
                            About Us
                            </Link>
                        </li>
                        {!isLoggedIn && <li className='flex'>
                            <Link onClick={closeSideMenu} href={"https://meuat.kaam.com/recruiter/login"} className='text-Grey hover:text-black font-medium hover:font-semibold relative after:w-full after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-12px] after:left-0 flex items-center gap-3'>
                            <Image src={"/new-assets/icons/menu-recruiter.svg"} width={18} height={18} alt='jobs icon' />
                            Recruiter Login
                            </Link>
                        </li>}
                    </ul>
                    <ul className='flex flex-col justify-end px-6 gap-7 mt-5'>
                        {/* <li className='relative group/menu flex'>
                            <Link onClick={closeSideMenu} href={"/"} className='text-Grey hover:text-black font-medium group-hover/menu:font-semibold relative after:w-full after:h-1 after:rounded-[4px] group-hover/menu:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                            Employer Corner
                            </Link>
                        </li>
                        <li className='relative group/menu text-Grey font-medium flex'>
                            <div className='relative text-black flex items-center p-2 border border-[#e3e3e3] rounded-lg'>
                            <SlGlobe className='text-black font-medium mr-1'/> English
                            <BiChevronDown className='font-medium text-2xl text-black'/>
                            </div>
                        </li> */}
                        {/* <li>
                            <SignInButton closeSideMenu={closeSideMenu}/>
                        </li> */}
                        <li>
                        <Image
                            height={100}
                            width={412}
                            quality={100}
                            src="/new-assets/icons/mahindra-logo.svg"
                            className='absolute bottom-5 left-5 w-auto max-w-[115px] h-[35px] xl:h-[20px] 2xl:h-[31px]'
                            alt='kaabil logo'
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}