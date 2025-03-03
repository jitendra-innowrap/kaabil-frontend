'use client'
import React, { useState } from 'react'
import LoadMoreAccordian from './LoadMoreAccordian'
import { VscListFilter } from 'react-icons/vsc'
import { HiOutlineFilter } from 'react-icons/hi'
import RangeAccordian from './RangeAccordian'
import PopularTags from './PopularTags'
import { GrLocation } from 'react-icons/gr'

export default function FilterSidebar() {
    const [open, setOpen] = useState(false);
  return (
    <>
    {open && <div className="block bg-black z-10 opacity-20 w-screen h-screen fixed top-0 left-0" onClick={()=>setOpen(false)}></div>}
    <div className="filters-sidebar h-fit p-4 md:p-6 rounded-[20px] flex bg-white relative flex-col lg:w-fit items-start">
        <div className="flex justify-between items-center w-full mb-2 md:mb-4 xl:mb-6 2xl:mb-8">
            <h2 className="text-lg 2xl:text-xl">All Filters
            <VscListFilter onClick={()=>setOpen(!open)} name="allFilters"  id="allFilters" className="inline lg:hidden ml-3 cursor-pointer size-5"/></h2>
            <button className='btn-border text-black !border-black text-xs font-medium max-w-[72px] !px-2 whitespace-nowrap text-center' style={{textTransform:'unset'}}>clear all</button>
        </div>
        <div className="flex lg:gap-7 xl:gap-10 2xl:gap-12">
            <div className={`absolute p-6 lg:p-0 rounded-3xl bg-white lg:relative z-[100] ${!open ? '-left-[120%] lg:left-0' : 'left-0'} transition-all top-[54px] md:top-16 lg:top-0 w-full flex flex-col gap-4 xl:gap-5 duration-300 h-max`}>
                

                
                <LoadMoreAccordian 
                    header="Search by Job Role" 
                    isSearchable={true} 
                    searchPlaceholder='Job role'
                    list={[]} 
                    />

                <LoadMoreAccordian 
                    header="Search by Location"  
                    isSearchable={true} 
                    searchIcon={<GrLocation className='size-4 2xl:size-5 text-[#6C757D] font-bold' />}
                    list={[]} 
                    searchPlaceholder='Choose city'
                    />
    
                <LoadMoreAccordian 
                    header="Industry" 
                    fetchMoreItems={true}
                    list={[
                        {id: '670', name: 'IT and Technology'},
                        {id: '100', name: 'Telecomunications'},
                        {id: '435', name: 'Hospitality and Travel'},
                        {id: '863', name: 'Marketing'},
                        {id: '235', name: 'Banking and Finance'},
                    ]} 
                />
                <LoadMoreAccordian 
                    header="Job Type"
                    list={[
                        {id: '2345', name: 'Full time'},
                        {id: '670', name: 'Part time'},
                        {id: '435', name: 'Internship'}
                    ]} 
                    />
                <LoadMoreAccordian 
                    header="Experience level" 
                    list={[
                        {id:'10', name:'Fresher'},
                        {id:'10', name:'Experienced'},
                    ]} 
                    />

                <LoadMoreAccordian 
                    header="Work Mode" 
                    list={[
                        {id:'10', name:'On site'},
                        {id:'10', name:'Hybrid'},
                        {id:'10', name:'Remote'},
                    ]} 
                    />

                <LoadMoreAccordian 
                    header="Benefits" 
                    list={[
                        {id:'10', name:'Pickup and drop services'},
                        {id:'10', name:'Late night drop services'},
                        {id:'10', name:'Flexible Work Hours'},
                        {id:'10', name:'Maternity leave'},
                        {id:'10', name:'Health Insurance'},
                    ]} 
                    />

                <RangeAccordian/>
                <PopularTags/>
            </div>
        </div>
    </div>
    </>
  )
}
