import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiCamera } from 'react-icons/fi'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { MdAccessTime } from 'react-icons/md'

export default function JobCard() {
  return (
    <div className="border sm:flex w-full max-w-[920px] border-[#A7A7A7] rounded-[20px] justify-between px-3 sm:px-8 py-3 sm:py-7">
                                    <div className="block">
                                        <Image
                                            src={"/assets/logos/caratlane.png"}
                                            width={64}
                                            height={58.4}
                                            alt="company logo"
                                            className="block sm:hidden mb-2"
                                        />
                                        <strong className="font-bold text-lg md:text-xl mb-2 block">Store Floor Manager | Noida</strong>
                                        <p className="font-light text-base text-[#727272]">Posted by HR Services Limited</p>
                                        <div className="flex flex-wrap gap-y-1 flex-row md:items-center mt-3 gap-x-1 md:gap-x-3 md:mt-3">
                                            <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><MdAccessTime className='inline size-3 md:size-5' /> Full Time</span>
                                            <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><FiCamera className='inline size-3 md:size-5' /> 2-5 years of experience</span>
                                            <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><HiOutlineCurrencyRupee className='inline size-3 md:size-5' /> 3L-6 Lacs PA</span>
                                        </div>
                                        <div className="flex mt-4 flex-wrap opacity-80 gap-2 text-xs md:text-[14px]">
                                            <span>Store Manager</span>
                                            <span>Luxury Sales</span>
                                            <span>Sales Operation</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <Image
                                            src={"/assets/logos/caratlane.png"}
                                            width={80}
                                            height={73}
                                            alt="company logo"
                                            className="hidden sm:block"
                                        />
                                        <div className="flex gap-2 md:gap-3">
                                            <button className="font-bold text-xs md:text-sm py-2 mt-5 px-5 border-black border rounded-[20px]">
                                                Save
                                            </button>
                                            <Link href={'/jobs/detail/store-floor-manager-noida'} className="font-bold text-xs text-white bg-[#E41C3B] md:text-sm py-2 mt-5 px-5 border-[#E41C3B] border rounded-[20px]">
                                                Apply Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
  )
}
