import Image from 'next/image'
import React from 'react'

export default function QuickAction() {
  return (
    <div className='rounded-2xl px-4 xl:px-6 py-3 xl:py-5 bg-white'>
    <div className="flex justify-between gap-2">
      <h3 className='font-medium text-sm 2xl:text-base'>Add More Skills to Find Better Job Matches!</h3>
      <div className="flex items-center h-fit cursor-pointer">
        <Image src={'/new-assets/icons/pencil.png'} alt='edit-pencil' aria-label='edit icon' className='w-3 h-3 mr-1' width={90} height={90}/>
        <span className='text-red text-sm font-semibold'>Edit</span>
      </div>
    </div>
    <div className="flex gap-3 md:gap-4 mt-2 2xl:mt-3">
      <div className="label text-[10px] 2xl:text-xs">
        Figma
      </div>
    </div>
    <div className="flex mt-3 2xl:mt-4 justify-between gap-2">
      <h3 className='font-medium text-sm 2xl:text-base'>Your Preferred job location</h3>
      <div className="flex items-center h-fit cursor-pointer">
        <Image src={'/new-assets/icons/pencil.png'} alt='edit-pencil' aria-label='edit icon' className='w-3 h-3 mr-1' width={90} height={90}/>
        <span className='text-red text-sm font-semibold'>Edit</span>
      </div>
    </div>
    <div className="flex gap-3 md:gap-4 mt-2 2xl:mt-3">
      <div className="label text-[10px] 2xl:text-xs">
        Mumbai
      </div>
      <div className="label text-[10px] 2xl:text-xs">
        Pune
      </div>
    </div>
    </div>
  )
}
