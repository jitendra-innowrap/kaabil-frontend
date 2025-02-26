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
    <header className='sticky top-0 bg-white z-50'>
        <div className='relative'>
            <div className="border-b-[1px] shadow-default flex justify-center">
                <div className='flex container py-4 lg:py-1 2xl:py-[10px] justify-between lg:justify-start items-center'>
                    <Link href="/" className="flex relative pr-4 md:pr-8 xl:pr-14 items-center">
                        <Image
                            height={70}
                            width={141}
                            src="/new-assets/logos/Kaabil logo.png"
                            className='w-auto max-w-fit h-[40px] xl:h-[40px] 2xl:h-[70px]'
                            alt='kaabil logo'
                            />
                    </Link>
                    <div className="hidden lg:flex h-full flex-col w-[-webkit-fill-available]">
                        <div className="flex h-full justify-between items-center">
                            <ul className="flex py-4 gap-3 xl:gap-4 2xl:gap-[30px]">
                                <li className='flex'>
                                    <Link href={"/jobs"} className='text-Grey hover:text-black font-medium hover:font-semibold text-xs 2xl:text-base relative after:w-full after:h-[3px] 2xl:after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-8px] 2xl:after:bottom-[-12px] after:left-0'>
                                    Jobs
                                    </Link>
                                </li>
                                <li className='relative group/menu cursor-pointer flex '>
                                    <Link href={"/"} className='text-Grey hover:text-black font-medium text-xs 2xl:text-base group-hover/menu:font-semibold relative after:w-full after:h-[3px] 2xl:after:h-1 after:rounded-[4px] group-hover/menu:after:bg-red after:absolute after:bottom-[-8px] 2xl:after:bottom-[-12px] after:left-0'>
                                        Career Tools
                                    </Link>
                                    <BiChevronDown className='font-light 2xl:text-2xl text-Grey group-hover/menu:text-black'/>
                                    <div className="absolute z-30 hidden group-hover/menu:block top-0 left-0">
                                        <div className="bg-white shadow-default mt-[40px] 2xl:mt-[56px] rounded-xl w-[180px] 2xl:w-[288px] border border-lightGrey divide-y divide-lightGrey">
                                            <Link href='/' className='block text-Grey hover:text-black py-3 2xl:py-4 font-medium hover:font-semibold text-xs 2xl:text-base px-5'>Resume Builder</Link>
                                            <Link href='/' className='block text-Grey hover:text-black py-3 2xl:py-4 font-medium hover:font-semibold text-xs 2xl:text-base px-5'>Career Guide</Link>
                                            <Link href='/' className='block text-Grey hover:text-black py-3 2xl:py-4 font-medium hover:font-semibold text-xs 2xl:text-base px-5'>Mock Interviews</Link>
                                        </div>
                                    </div>
                                </li>
                                <li className='flex'>
                                    <Link href={"/"} className='text-Grey hover:text-black font-medium hover:font-semibold text-xs 2xl:text-base relative after:w-full after:h-[3px] 2xl:after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-8px] 2xl:after:bottom-[-12px] after:left-0'>
                                    Skill Centre
                                    </Link>
                                </li>
                                <li className='flex'>
                                    <Link href={"/"} className='text-Grey hover:text-black font-medium hover:font-semibold text-xs 2xl:text-base relative after:w-full after:h-[3px] 2xl:after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-8px] 2xl:after:bottom-[-12px] after:left-0'>
                                    About Us
                                    </Link>
                                </li>
                            </ul>
                            <HeaderSearch/>
                            <ul className='flex gap-[10px] items-center'>
                                <li className='relative group/menu text-Grey flex'>
                                    <Link href={"/"} className='relative text-black font-thin flex items-center text-xs 2xl:text-base p-2 border border-[#e3e3e3] rounded-lg'>
                                    <Image src={'/new-assets/icons/globe.svg'} width={19} height={19} className='mr-1' alt='globe icon'/> English
                                    <BiChevronDown className='font-medium 2xl:text-2xl text-black'/>
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
        </div>
    </header>
  )
}
