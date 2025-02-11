import { CheckOptions } from '@/Types/Filter'
import React from 'react'

function Radio({item, checked=false}:CheckOptions) {
    
  return (
    <span className={`font-medium cursor-pointer text-black text-sm flex items-center`}>
      <span className={`flex w-4 h-4 rounded-full border mr-4 text-[8px] font-bold justify-center transition-all duration-300 items-center ${checked?'border-white bg-[#e41c3b] text-white':'text-transparent border-black'}`}>
        &#10003;
      </span>
      <span className={`${checked?'text-black':'text-[#8C8C8C]'}`}>
        {item}
      </span>
    </span>
  )
}

export default Radio