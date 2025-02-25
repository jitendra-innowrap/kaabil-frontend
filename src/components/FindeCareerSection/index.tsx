'use client'
import React from 'react'
import Select from 'react-select'
import GallerySlider from '../JobDetail/Slider/GallarySlider'
import CareerRoleCard from './CareerRoleCard'

export default function FindCareerSection() {
    const roles = [
        {icon: '/new-assets/banners/image.png', title: "General Duty Assistant"},
        {icon: '/new-assets/banners/image-1.png', title: "Packers"},
        {icon: '/new-assets/banners/image-2.png', title: "Data Entry Operator"},
        {icon: '/new-assets/banners/image-3.png', title: "Assistant Teacher"},
        {icon: '/new-assets/banners/image-4.png', title: "Customer Service"},
        {icon: '/new-assets/banners/image-5.png', title: "Packers"},
        {icon: '/new-assets/banners/image-6.png', title: "Beautician"},
        {icon: '/new-assets/banners/image-5.png', title: "Beautician"},
        {icon: '/new-assets/banners/image-5.png', title: "Beautician"},
        {icon: '/new-assets/banners/image-5.png', title: "Beautician"},
    ]
    const inputSlides = roles.map((role, index) => (
            <CareerRoleCard key={index} {...role} />
        ));
  return (
    <div className="grid md:grid-cols-12">
        <div className="section-heading mb-5 xl:mb-8 col-span-7">
            <h2 className='text-black text-start text-2xl xl:text-3xl 2xl:text-[40px] 2xl:leading-[64px] font-medium mb-2'>Not sure what  <span className="font-kalam font-bold text-red"> job</span> suits you?</h2>
            <p className="font-normal xl:text-sm 2xl:text-xl 2xl:leading-9">Find career paths that match your skills and strengths.</p>
            <p className="font-semibold text-lg xl:text-base 2xl:text-xl mt-7 xl:mt-8 2xl:mt-10 mb-3 2xl:mb-4">Answer a few simple questions and we’ll help you discover the right careers!</p>
            <div className="flex flex-col items-end">
                <Select
                className='w-full react-select'
                options={[
                    { value: 'IT', label: 'IT' },
                    { value: 'Finance', label: 'Finance' },
                    { value: 'Healthcare', label: 'Healthcare' },
                ]}
                placeholder="Select your education level"
                components={{
                    IndicatorSeparator: () => null, // Remove the separator
                    DropdownIndicator: () => (<img className='mr-3' src="/new-assets/icons/find-career-dropdown-arrow.png" alt="" />)
                }}
                classNamePrefix={"find-career"}
                />
                <button className='w-[220px] mt-3 2xl:mt-4'>Next</button>
            </div>
        </div>
        <div className="col-span-5 xl:mt-10">
            <img src='/new-assets/banners/find-career-banner-update.png' alt='find-career' className='w-full max-w-[350px] 2xl:max-w-[450px] mx-auto' />
        </div>
        <div className="absolute bottom-0 left-0 w-full">
            <div className="">
                
                <GallerySlider
                    speed={2000}
                    slides={inputSlides}
                    spaceBetween={20}
                    loop={true}
                    autoplay={true}
                    />
            </div>
        </div>
    </div>
  )
}
