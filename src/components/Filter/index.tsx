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
    <div className="filters-sidebar h-fit p-4 md:p-6 rounded-[20px] flex bg-white relative flex-col lg:w-fit items-start">
        <div className="flex justify-between items-center w-full mb-2 md:mb-4 xl:mb-6 2xl:mb-8">
            <h2 className="text-lg 2xl:text-xl font-semibold">All Filters
            <VscListFilter onClick={()=>setOpen(!open)} name="allFilters"  id="allFilters" className="inline lg:hidden ml-3 cursor-pointer size-5"/></h2>
            <button className='btn-border text-black !border-black text-xs font-medium max-w-[72px] !px-2 whitespace-nowrap text-center'>clear all</button>
        </div>
        <div className="flex lg:gap-7 xl:gap-10 2xl:gap-12">
            <div className={`absolute p-6 lg:p-0 rounded-3xl bg-white lg:relative z-[100] ${!open ? '-left-[120%] lg:left-0' : 'left-0'} transition-all top-[54px] md:top-16 lg:top-0 w-full flex flex-col gap-2 xl:gap-4 duration-300 h-max`}>
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
    </div>
    </>
  )
}
