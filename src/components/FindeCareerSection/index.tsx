'use client'
import React from 'react'
import Select from 'react-select'
import GallerySlider from '../JobDetail/Slider/GallarySlider'
import CareerRoleCard from './CareerRoleCard'
import Image from 'next/image'

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
    <div className="grid md:grid-cols-12 xl:w-[950px] 3xl:w-[1279px]">
    <div className="absolute bottom-4 3xl:bottom-12 left-0 w-full">
        <div className="">
            <GallerySlider
                speed={2000}
                slides={inputSlides}
                spaceBetween={16}
                loop={true}
                autoplay={true}
                />
        </div>
    </div>
        <div className="section-heading mb-5 xl:mb-8 col-span-7 max-w-[95%] md:max-w-[650px] mx-auto">
            <h2 className='text-black text-start text-2xl xl:text-3xl 2xl:text-[40px] 2xl:leading-[64px] font-medium mb-2'>Not sure what  <span className="font-kalam font-bold text-red"> job</span> suits you?</h2>
            <p className="font-normal xl:text-sm 3xl:text-xl 3xl:leading-9">Find career paths that match your skills and strengths.</p>
            <p className="font-semibold text-lg xl:text-base 3xl:text-xl mt-7 xl:mt-8 3xl:mt-10 mb-3 3xl:mb-4 3xl:max-w-[520px]">Answer a few simple questions and we’ll help you discover the right careers!</p>
            <div className="flex flex-col items-end">
                <Select
                className='w-full react-select text-xs 3xl:text-base shadow-sm'
                options={[
                    { value: 'IT', label: 'IT' },
                    { value: 'Finance', label: 'Finance' },
                    { value: 'Healthcare', label: 'Healthcare' },
                ]}
                placeholder="Select your education level"
                components={{
                    IndicatorSeparator: () => null, // Remove the separator
                    DropdownIndicator: () => (<img className='mr-3 w-3 3xl:w-4' src="/new-assets/icons/find-career-dropdown-arrow.png" alt="" />)
                }}
                classNamePrefix={"find-career"}
                />
                <button className='text-xs 2xl:text-base mt-3 3xl:mt-4' style={{textTransform:"unset"}}>Start your career guidance test</button>
            </div>
        </div>
        <div className="col-span-5">
            <Image height={1704} width={1448} quality={100} src='/new-assets/banners/find-career-banner-update.png' alt='find-career' className='w-full 3xl:-ml-10 max-w-[350px] 3xl:max-w-[450px] 3xl:min-w-[481px] mx-auto' />
        </div>
    </div>
  )
}
