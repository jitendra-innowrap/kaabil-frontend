'use client'
import React, { useState } from 'react';
import { Twirl as Hamburger } from 'hamburger-react'
import { SlMagnifier } from 'react-icons/sl';

export default function BurgerMenu() {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="relative">
            <div className=" relative z-[11]"><Hamburger toggled={isOpen} toggle={setOpen} /></div>
            <div 
                className={`fixed z-10 top-0 right-0 h-full w-[100vw] max-w-[380px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex pl-5 relative mt-4 mb-10 pr-4 items-center">
                    <img
                        src="/assets/logos/Kaabil logo.svg"
                        className='w-auto max-w-fit h-[50px] md:h-[80px] 2xl:h-[100px]'
                        alt='kaabil logo'
                        />
                </div>
                <div className="flex gap-3 px-6 py-2 border rounded-full mb-6 mx-6">
                    <SlMagnifier  className='size-5' color='#959595' />
                    <input type="text" className='outline-none focus:outline-none placeholder:text-[#959595] w-[300px] text-sm' placeholder='Search Jobs, Companies & More' />
                </div>
                <ul className="px-6 text-xl font-bold">
                    <li className='mb-3'>Home</li>
                    <li className='mb-3'>Pathfinder</li>
                    <li className='mb-3'>Community Forum</li>
                    <li className='mb-3'>LMS</li>
                    <li className='mb-3'>About</li>
                </ul>
                <div className="flex px-6 justify-end my-5">
                    <img
                        src="/assets/logos/Google Play light.svg"
                        className='w-auto h-[44px]'
                        alt='Google Play Logo'
                    />
                </div>
                <div className="flex flex-col gap-4 px-6">
                    <a href="#" target="_blank" className='px-6 py-2 font-bold text-white bg-[#E41C3B] rounded-3xl' rel="noopener noreferrer">Job Exchange</a>
                    <a href="#" target="_blank" className='px-6 py-2 font-bold text-white bg-[#4D4D4F] rounded-3xl' rel="noopener noreferrer">Employer Portal</a>
                </div>
            </div>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50" 
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
}