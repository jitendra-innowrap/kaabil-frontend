import React from 'react'

export default function CareerRoleCard({icon, title}: {icon: string, title:string}) {
  return (
    <div className="rounded-[70px] bg-white flex items-center p-1">
        <img src={icon} alt='find-career' className='size-10 xl:size-12 2xl:size-16' />
        <h4 className='font-medium'>{title}</h4>
    </div>
  )
}
