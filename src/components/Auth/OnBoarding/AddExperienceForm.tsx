import React, { useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'

export default function AddExperienceForm() {
    const [type, setType] = useState(1);
    const [workingFrom, setWorkingFrom] = useState("");

  return (
    <div className="p-4 md:p-7 rounded-lg shadow-default">
        <input type="text" className='mb-2' id="designation" onChange={()=>{}} name="designation" placeholder="Enter your designation" />
        <input type="text" className='mb-2' id="companyName" onChange={()=>{}} name="companyName" placeholder="Enter your company name" />
        <input type="text" className='mb-2' id="salary" onChange={()=>{}} name="salary" placeholder="Monthly salary eg : 15000 (Optional)" />
        <div className="grid sm:grid-cols-3 gap-3 3xl:gap-4 mt-3">
            <div className={`"col-span-1 label-option cursor-pointer ${type===1?"bg-red text-white":""}`} onClick={()=> setType(1)}>Full-time</div>
            <div className={`"col-span-1 label-option cursor-pointer ${type===2?"bg-red text-white":""}`} onClick={()=> setType(2)}>Part-time</div>
            <div className={`"col-span-1 label-option cursor-pointer ${type===3?"bg-red text-white":""}`} onClick={()=> setType(3)}>Intership</div>
        </div>
        <div className="flex items-center gap-2 my-4">
            <input type="checkbox" name='present' className='!mb-0 inline-block !w-4 !h-4 cursor-pointer' id="startDate" onChange={()=>{}}  />
            <label className='!mb-0 inline-block' htmlFor="present">Currently working here</label>
        </div>
        <div className="relative h-fit sm:w-1/2 text-left group">
            <button type="button" className="!text-[#4D4D4F] px-3 !py-2 flex items-center justify-between shadow-default  btn-border" id="menu-button" aria-expanded="true" aria-haspopup="true">
                {workingFrom || "Working From"}  <IoMdArrowDropdown className='ml-1 xl:ml-5 text-[#000000] size-5'/>
            </button>
            <div className="opacity-0 hidden group-hover:block group-hover:opacity-100 absolute right-0 z-10 w-56 origin-top-right top-full focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="rounded-md bg-white ring-1 shadow-lg ring-black/5 mt-1">
                    <div className="py-0" role="none">
                    <div onClick={()=>setWorkingFrom("Home")} className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 outline-hidden" role="menuitem" tabIndex={-1} id="menu-item-2">Home</div>
                    <div onClick={()=>setWorkingFrom("Office")} className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 outline-hidden" role="menuitem" tabIndex={-1} id="menu-item-2">Office</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
