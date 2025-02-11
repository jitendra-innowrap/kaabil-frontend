'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FiCamera } from 'react-icons/fi'
import { HiOutlineCurrencyRupee, HiOutlineFilter } from 'react-icons/hi'
import { MdAccessTime } from 'react-icons/md'
import Pagination from '../Pagination'
import Link from 'next/link'

export default function JobList() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; // Total number of pages
    const maxPagesToShow = 5; // Maximum pages to display

    // Function to get the pagination group
    const getPaginationGroup = () => {
        let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let end = Math.min(totalPages, start + maxPagesToShow - 1);

        if (end - start < maxPagesToShow - 1) {
            start = Math.max(1, end - maxPagesToShow + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handleActive = (page:any) => {
        setCurrentPage(page);
    };

  return (
    <div style={{width:"-webkit-fill-available"}}>
            <div className="hidden lg:flex justify-between mb-5 xl:mb-12">
              <p className="block">170 similar jobs found for “Store Manager” in Delhi</p>
              <p className="block">Sort BY <HiOutlineFilter className="inline size-5"/></p>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
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
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><MdAccessTime className='inline size-3 md:size-5'/> Full Time</span> 
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><FiCamera className='inline size-3 md:size-5'/> 2-5 years of experience</span>
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><HiOutlineCurrencyRupee className='inline size-3 md:size-5'/> 3L-6 Lacs PA</span>
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
              <div className="border sm:flex w-full max-w-[920px] border-[#A7A7A7] rounded-[20px] justify-between px-3 sm:px-8 py-3 sm:py-7">
                <div className="block">
                  <Image
                      src={"/assets/logos/jio.png"}
                      width={64}
                      height={58.4}
                      alt="company logo"
                      className="block sm:hidden mb-2"
                      />
                  <strong className="font-bold text-lg md:text-xl mb-2 block">Store Floor Manager | Delhi</strong>
                  <p className="font-light text-base text-[#727272]">Posted by HR Services Limited</p>
                  <div className="flex flex-wrap gap-y-1 flex-row md:items-center mt-3 gap-x-1 md:gap-x-3 md:mt-3">
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><MdAccessTime className='inline size-3 md:size-5'/> Full Time</span> 
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><FiCamera className='inline size-3 md:size-5'/> 2-5 years of experience</span>
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><HiOutlineCurrencyRupee className='inline size-3 md:size-5'/> 3L-6 Lacs PA</span>
                  </div>
                  <div className="flex mt-4 flex-wrap opacity-80 gap-2 text-xs md:text-[14px]">
                    <span>Store Manager</span>
                    <span>Luxury Sales</span>
                    <span>Sales Operation</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Image
                    src={"/assets/logos/jio.png"}
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
              {/* Find By Salary */}
              <div className="border lg:w-[calc(100vw_-_500px)] max-w-[920px] border-[#A7A7A7] bg-[#DBF0F6] rounded-[20px] justify-between px-4 sm:px-12 py-3 sm:py-7">
                <div className="block">
                  <strong className="font-bold text-lg md:text-xl mb-4 md:mb-5 2xl:mb-6 block">Find job by salary</strong>
                </div>
                <div className="flex gap-2 md:gap-3 overflow-x-auto custom-scrollbar items-end">
                  <div className="bg-white px-6 md:px-7 py-4 md:py-5 rounded-[10px] whitespace-nowrap">
                    <p className="text-sm mb-2">₹ 0 to 5 Lacs</p>
                    <p className="text-[#5912A1] text-xs">10 jobs</p>
                  </div>
                  <div className="bg-white px-6 md:px-7 py-4 md:py-5 rounded-[10px] whitespace-nowrap">
                    <p className="text-sm mb-2">₹ 0 to 5 Lacs</p>
                    <p className="text-[#5912A1] text-xs">10 jobs</p>
                  </div>
                  <div className="bg-white px-6 md:px-7 py-4 md:py-5 rounded-[10px] whitespace-nowrap">
                    <p className="text-sm mb-2">₹ 0 to 5 Lacs</p>
                    <p className="text-[#5912A1] text-xs">10 jobs</p>
                  </div>
                  <div className="bg-white px-6 md:px-7 py-4 md:py-5 rounded-[10px] whitespace-nowrap">
                    <p className="text-sm mb-2">₹ 0 to 5 Lacs</p>
                    <p className="text-[#5912A1] text-xs">10 jobs</p>
                  </div>
                  <div className="bg-white px-6 md:px-7 py-4 md:py-5 rounded-[10px] whitespace-nowrap">
                    <p className="text-sm mb-2">₹ 0 to 5 Lacs</p>
                    <p className="text-[#5912A1] text-xs">10 jobs</p>
                  </div>
                  <div className="bg-white px-6 md:px-7 py-4 md:py-5 rounded-[10px] whitespace-nowrap">
                    <p className="text-sm mb-2">₹ 0 to 5 Lacs</p>
                    <p className="text-[#5912A1] text-xs">10 jobs</p>
                  </div>
                </div>
              </div>
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
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><MdAccessTime className='inline size-3 md:size-5'/> Full Time</span> 
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><FiCamera className='inline size-3 md:size-5'/> 2-5 years of experience</span>
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><HiOutlineCurrencyRupee className='inline size-3 md:size-5'/> 3L-6 Lacs PA</span>
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
              {/* Update Profile Add */}
              <div className="border grid gap-5 md:gap-8 xl:gap-10 2xl:gap-16 grid-cols-1 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 lg:w-[calc(100vw_-_500px)] max-w-[920px] border-[#A7A7A7] bg-[#DBF0F6] rounded-[20px] justify-between px-4 sm:px-12 py-3 sm:py-7">
                <p className="col-span-1 font-bold text-lg md:text-xl 2xl:text-2xl">Your profile completeness
                in 65%</p>
                <p className="col-span-2 text-base md:text-lg 2xl:text-xl">Companies know only 65% about your talent. Update your profile to get more jobs</p>
                <button className="text-white bg-[#32A071] col-span-1 text-sm h-fit p-2 rounded-[20px]">Update Your Profile</button>
              </div>
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
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><MdAccessTime className='inline size-3 md:size-5'/> Full Time</span> 
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><FiCamera className='inline size-3 md:size-5'/> 2-5 years of experience</span>
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><HiOutlineCurrencyRupee className='inline size-3 md:size-5'/> 3L-6 Lacs PA</span>
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
              <div className="border sm:flex w-full max-w-[920px] border-[#A7A7A7] rounded-[20px] justify-between px-3 sm:px-8 py-3 sm:py-7">
                <div className="block">
                  <Image
                      src={"/assets/logos/jio.png"}
                      width={64}
                      height={58.4}
                      alt="company logo"
                      className="block sm:hidden mb-2"
                      />
                  <strong className="font-bold text-lg md:text-xl mb-2 block">Store Floor Manager | Delhi</strong>
                  <p className="font-light text-base text-[#727272]">Posted by HR Services Limited</p>
                  <div className="flex flex-wrap gap-y-1 flex-row md:items-center mt-3 gap-x-1 md:gap-x-3 md:mt-3">
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><MdAccessTime className='inline size-3 md:size-5'/> Full Time</span> 
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><FiCamera className='inline size-3 md:size-5'/> 2-5 years of experience</span>
                      <span className='opacity-80 flex items-center gap-1 md:gap-2 text-xs md:text-[14px]'><HiOutlineCurrencyRupee className='inline size-3 md:size-5'/> 3L-6 Lacs PA</span>
                  </div>
                  <div className="flex mt-4 flex-wrap opacity-80 gap-2 text-xs md:text-[14px]">
                    <span>Store Manager</span>
                    <span>Luxury Sales</span>
                    <span>Sales Operation</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Image
                    src={"/assets/logos/jio.png"}
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
            </div>
            {/* Pagination */}
            <div className="mt-10 md:mt-14 2xl:mt-16">
                <Pagination
                    currentPage={currentPage}
                    handleActive={handleActive}
                    getPaginationGroup={getPaginationGroup()}
                    pages={totalPages}
                />
            </div>
          </div>
  )
}
