import { CheckOptions } from '@/Types/Filter'
import React from 'react'

function Check({item, checked=false}:CheckOptions) {
    
  return (
    <span title={item as string} className={`font-medium cursor-pointer text-black text-sm flex items-center`}>
      <div className={`flex w-4 h-4 border mr-4 text-[8px] font-bold justify-center transition-all duration-300 items-center ${checked?'border-white bg-[#e41c3b]  text-white':'text-transparent border-black'}`}>&#10003;</div><div className='flex w-fit'>
      <span className={`${checked?'text-black':'text-[#8C8C8C]'}`}>
        {item}
      </span>  
    </div></span>
  )
}

export default Check