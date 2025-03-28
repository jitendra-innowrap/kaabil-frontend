'use client'
import React, { useState } from 'react';
import { Twirl as Hamburger } from 'hamburger-react'
import { SlGlobe, SlMagnifier } from 'react-icons/sl';
import Link from 'next/link';
import { BiChevronDown } from 'react-icons/bi';
import SignInButton from './SignInButton';
import Image from 'next/image';

export default function BurgerMenu() {
    const [isOpen, setOpen] = useState(false);
    const closeSideMenu = ()=>{
        setOpen(false);
    }
    return (
        <div className="relative">
            
            {isOpen && (
                <div 
                    className="fixed inset-0 z-10 bg-black opacity-50" 
                    onClick={() => setOpen(false)}
                />
            )}
            <div className=" relative" onClick={()=> setOpen(!isOpen)}>
                <Image src={'/new-assets/icons/mobile-menu-icon.svg'} width={20} height={12} alt='menu icon' />
            </div>
            <div 
                className={`fixed z-10 top-0 left-0 h-full w-[calc(100vw_-_60px)] rounded-e-2xl max-w-[380px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex pl-5 relative mt-4 mb-10 pr-4 items-center">
                    <img
                        src="/assets/logos/Kaabil logo.svg"
                        className='w-auto max-w-fit h-[50px] md:h-[80px] 2xl:h-[100px]'
                        alt='kaabil logo'
                        />
                </div>
                {/* <div className="flex gap-3 px-6 py-2 border rounded-full mb-6 mx-6">
                    <SlMagnifier  className='size-5' color='#959595' />
                    <input type="text" className='outline-none focus:outline-none placeholder:text-[#959595] w-[300px] text-sm' placeholder='Search Jobs, Companies & More' />
                </div> */}
                <ul className="flex flex-col px-6 gap-4 xl:gap-8">
                    <li className='flex'>
                        <Link href={"/jobs"} className='text-Grey hover:text-black font-medium hover:font-semibold relative after:w-full after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                        Jobs
                        </Link>
                    </li>
                    <li className='relative group/menu flex'>
                        <Link href={"/"} className='text-Grey hover:text-black font-medium group-hover/menu:font-semibold relative after:w-full after:h-1 after:rounded-[4px] group-hover/menu:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                        Career Tools
                        </Link>
                    </li>
                    <li className='flex'>
                        <Link href={"/"} className='text-Grey hover:text-black font-medium hover:font-semibold relative after:w-full after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                        Skill Centre
                        </Link>
                    </li>
                    <li className='flex'>
                        <Link href={"/"} className='text-Grey hover:text-black font-medium hover:font-semibold relative after:w-full after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                        About Us
                        </Link>
                    </li>
                </ul>
                <ul className='flex flex-col px-6 gap-7 mt-5'>
                    <li className='relative group/menu flex'>
                        <Link href={"/"} className='text-Grey hover:text-black font-medium group-hover/menu:font-semibold relative after:w-full after:h-1 after:rounded-[4px] group-hover/menu:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                        Employer Corner
                        </Link>
                    </li>
                    <li className='relative group/menu text-Grey font-medium flex'>
                        <Link href={"/"} className='relative text-black flex items-center p-2 border border-[#e3e3e3] rounded-lg'>
                        <SlGlobe className='text-black font-medium mr-1'/> English
                        <BiChevronDown className='font-medium text-2xl text-black'/>
                        </Link>
                    </li>
                    <li>
                        <SignInButton closeSideMenu={closeSideMenu}/>
                    </li>
                    <li>
                    <Image
                        height={100}
                        width={412}
                        quality={100}
                        src="/new-assets/icons/empowered by mahindra logo.png"
                        className='w-auto max-w-[113px] h-[22px] xl:h-[20px] 2xl:h-[31px]'
                        alt='kaabil logo'
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
}