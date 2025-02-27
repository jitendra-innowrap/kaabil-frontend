import React from 'react'

export default function CareerRoleCard({icon, title}: {icon: string, title:string}) {
  return (
    <div className="rounded-[70px] bg-white flex items-center pr-[10px] 3xl:pr-[16px] p-[2px] gap-2 3xl:gap-4">
        <img src={icon} alt='find-career' className='size-10 xl:size-10 3xl:size-16' />
        <h4 className='font-medium text-xs 3xl:text-base'>{title}</h4>
    </div>
  )
}
