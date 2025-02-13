'use client'
import React, { useState } from 'react'
import LoadMoreAccordian from './LoadMoreAccordian'
import { VscListFilter } from 'react-icons/vsc'
import { HiOutlineFilter } from 'react-icons/hi'
import RangeAccordian from './RangeAccordian'
import PopularTags from './PopularTags'

export default function FilterSidebar() {
    const [open, setOpen] = useState(false);
  return (
    <>
    {open && <div className="block bg-black opacity-20 w-screen h-screen fixed top-0 left-0" onClick={()=>setOpen(false)}></div>}
    <div className="flex relative flex-col w-full items-start lg:gap-7 xl:gap-10 2xl:gap-12">
        <h2 className="font-bold text-lg md:text-3xl 2xl:text-4xl hidden lg:block">All Filter</h2>
        <div className="flex">
            <div className={`absolute rounded-3xl bg-white lg:relative z-[100] ${!open ? '-left-full lg:left-0' : 'left-0'} transition-all -top-1 flex flex-col gap-2 xl:gap-4 duration-300 h-max w-[290px]`}>
                <LoadMoreAccordian 
                    header="Job Types"
                    list={[
                        {id: '1', name: 'Full time'},
                        {id: '2', name: 'Part time'},
                        {id: '3', name: 'Freelance'},
                        {id: '4', name: 'Internship'}
                    ]} 
                    />

                <LoadMoreAccordian 
                    header="Experience" 
                    list={[
                        {id: '1', name: 'Expert'},
                        {id: '2', name: 'Intermediate'},
                        {id: '3', name: 'Beginner'}
                    ]} 
                    />

                <LoadMoreAccordian 
                    header="Sectors" 
                    isSearchable={true} 
                    fetchMoreItems={true}
                    list={[
                        {id: '1', name: 'Search Sector'},
                        {id: '2', name: 'IT'},
                        {id: '3', name: 'Media'},
                        {id: '4', name: 'FinTech'},
                        {id: '5', name: 'Telecom'},
                        {id: '6', name: 'Hospitality'},
                        {id: '7', name: 'Retail'},
                        {id: '8', name: 'Education'},
                        {id: '9', name: 'Healthcare'},
                        {id: '10', name: 'Construction'},
                        {id: '11', name: 'Transportation'},
                        {id: '12', name: 'Real Estate'}
                    ]} 
                />

                <LoadMoreAccordian 
                    header="City" 
                    isSearchable={true} 
                    fetchMoreItems={true}
                    list={[
                        {id: '1', name: 'Search City'},
                        {id: '2', name: 'Delhi/NCR (50)'},
                        {id: '3', name: 'Gurugram (45)'},
                        {id: '4', name: 'Faridabad (20)'},
                        {id: '5', name: 'Mumbai (15)'},
                        {id: '6', name: 'Ahmedabad (13)'},
                        {id: '7', name: 'Uttar Pradesh (7)'},
                        {id: '8', name: 'Bengaluru (30)'},
                        {id: '9', name: 'Chennai (25)'},
                        {id: '10', name: 'Pune (18)'},
                        {id: '11', name: 'Kolkata (12)'},
                        {id: '12', name: 'Hyderabad (22)'}
                    ]} 
                    />

                <LoadMoreAccordian 
                    header="Companies" 
                    isSearchable={true} 
                    fetchMoreItems={true}
                    list={[
                        {id:'1', name:'IT Company A'},
                        {id:'2', name:'IT Company B'},
                        {id:'3', name:'Media Company A'},
                        {id:'4', name:'FinTech Company A'},
                        {id:'5', name:'Telecom Company A'}
                    ]} 
                    />

                <LoadMoreAccordian 
                    header="Skills" 
                    isSearchable={true} 
                    fetchMoreItems={true}
                    list={[
                        {id:'1', name:'JavaScript'},
                        {id:'2', name:'Python'},
                        {id:'3', name:'Project Management'},
                        {id:'4', name:'Data Analysis'},
                        {id:'5', name:'Graphic Design'}
                    ]} 
                    />

                <LoadMoreAccordian 
                    header="Benefits" 
                    list={[
                        {id:'1', name:'Health Insurance'},
                        {id:'2', name:'Paid Time Off'},
                        {id:'3', name:'Retirement Plan'},
                        {id:'4', name:'Remote Work Options'},
                        {id:'5', name:'Professional Development'}
                    ]} 
                    />

                <RangeAccordian/>
                <PopularTags/>
            </div>
        </div>
        
        <div className="flex flex-col-reverse gap-6 sm:flex-row lg:hidden w-full justify-between sm:mb-5 xl:mb-12">
              <p className="block">170 similar jobs found for “Store Manager” in Delhi</p>
              <div className="flex gap-5 justify-between sm:justify-end">
                <p className="block whitespace-nowrap"><label className='cursor-pointer' htmlFor="sortBy">Sort BY</label> <HiOutlineFilter name="sortBy"  id="sortBy" className="inline cursor-pointer size-5"/></p>
                <p onClick={()=>setOpen(!open)} className="block whitespace-nowrap lg:hidden"><label className='cursor-pointer' htmlFor="allFilters">All Filters</label> <VscListFilter name="allFilters"  id="allFilters" className="inline cursor-pointer size-5"/></p>
              </div>
              </div>
    </div>
    </>
  )
}
