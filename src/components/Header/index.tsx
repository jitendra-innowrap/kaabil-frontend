import Image from 'next/image'
import React from 'react'
import { SlGlobe } from 'react-icons/sl'
import BurgerMenu from './BurgerMenu'
import Link from 'next/link'
import { BiChevronDown } from 'react-icons/bi'
import SignInButton from './SignInButton'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import SearchSection from '../SearchSection'
import HeaderSearch from './HeaderSearch'

export default function Header() {

  return (
    <header className='relative'>
        <div className="border-b-[1px] shadow-default flex justify-center">
            <div className='flex container py-4 md:py-3 justify-between lg:justify-start items-center'>
                <Link href="/" className="flex relative pr-4 md:pr-8 xl:pr-14 items-center">
                    <Image
                        height={70}
                        width={141}
                        src="/assets/logos/Kaabil logo.svg"
                        className='w-auto max-w-fit h-[40px] xl:h-[50px] 2xl:h-[70px]'
                        alt='kaabil logo'
                        />
                </Link>
                <div className="hidden lg:flex h-full flex-col w-[-webkit-fill-available]">
                    <div className="flex h-full justify-between items-center">
                        <ul className="flex py-4 gap-3 xl:gap-4 2xl:gap-8">
                            <li className='flex'>
                                <Link href={"/jobs"} className='text-Grey hover:text-black font-medium hover:font-semibold text-sm 2xl:text-base relative after:w-full after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                                Jobs
                                </Link>
                            </li>
                            <li className='relative group/menu flex'>
                                <Link href={"/"} className='text-Grey hover:text-black font-medium text-sm 2xl:text-base group-hover/menu:font-semibold relative after:w-full after:h-1 after:rounded-[4px] group-hover/menu:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                                Career Tools
                                </Link>
                                <BiChevronDown className='font-medium text-2xl text-Grey group-hover/menu:text-black'/>
                                <div className="absolute hidden group-hover/menu:block top-0 left-0">
                                    <div className="bg-white shadow-default mt-[56px] rounded-xl w-[288px] border border-lightGrey divide-y divide-lightGrey">
                                        <Link href='/' className='block text-Grey hover:text-black py-4 font-medium hover:font-semibold text-sm 2xl:text-base px-5'>Resume Builder</Link>
                                        <Link href='/' className='block text-Grey hover:text-black py-4 font-medium hover:font-semibold text-sm 2xl:text-base px-5'>Career Guide</Link>
                                        <Link href='/' className='block text-Grey hover:text-black py-4 font-medium hover:font-semibold text-sm 2xl:text-base px-5'>Mock Interviews</Link>
                                    </div>
                                </div>
                            </li>
                            <li className='flex'>
                                <Link href={"/"} className='text-Grey hover:text-black font-medium hover:font-semibold text-sm 2xl:text-base relative after:w-full after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                                Skill Centre
                                </Link>
                            </li>
                            <li className='flex'>
                                <Link href={"/"} className='text-Grey hover:text-black font-medium hover:font-semibold text-sm 2xl:text-base relative after:w-full after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                                About Us
                                </Link>
                            </li>
                        </ul>
                        <HeaderSearch/>
                        <ul className='flex gap-3 2xl:gap-7 items-center'>
                            <li className='relative group/menu flex'>
                                <Link href={"/"} className='text-Grey hover:text-black font-medium text-sm 2xl:text-base group-hover/menu:font-semibold relative after:w-full after:h-1 after:rounded-[4px] group-hover/menu:after:bg-red after:absolute after:bottom-[-12px] after:left-0'>
                                Employer Corner
                                </Link>
                                <BiChevronDown className='font-medium text-2xl text-black'/>
                                <div className="absolute hidden group-hover/menu:block top-0 left-0">
                                    <div className="bg-white shadow-default mt-[56px] rounded-xl w-[200px] border border-lightGrey divide-y divide-lightGrey">
                                        <Link href='/' className='block text-Grey hover:text-black py-4 font-medium hover:font-semibold text-sm 2xl:text-base px-5'>Post Job</Link>
                                        <Link href='/' className='block text-Grey hover:text-black py-4 font-medium hover:font-semibold text-sm 2xl:text-base px-5'>Hire Talent</Link>
                                    </div>
                                </div>
                            </li>
                            <li className='relative group/menu text-Grey font-medium flex'>
                                <Link href={"/"} className='relative text-black flex items-center text-sm 2xl:text-base p-2 border border-[#e3e3e3] rounded-lg'>
                                <SlGlobe className='text-black font-medium text-sm 2xl:text-base mr-1'/> English
                                <BiChevronDown className='font-medium text-2xl text-black'/>
                                </Link>
                            </li>
                            <li>
                                <SignInButton/>
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
                <div className="lg:hidden mr-4">
                    <BurgerMenu />
                </div>
            </div>
        </div>
    </header>
  )
}
