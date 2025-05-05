'use client'
import React, { useState, useRef, useEffect } from 'react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { RiTwitterXLine } from 'react-icons/ri'

export default function ShareButton() {
    const [expand, setExpand] = useState(false);
    const shareRef = useRef<HTMLDivElement>(null);

    const handleExpand = () => {
        setExpand(!expand);
    }

    // Close the expanded options when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
                setExpand(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={shareRef} className="share-article absolute top-0 right-0 sm:-right-5 lg:-right-12 gap-3 flex flex-col">
            <h6 className="text-[10px] text-center translate-y-1 xl:text-xs leading-[110%]">Share</h6>
            
            {/* Share trigger button - always visible */}
            <div 
                onClick={handleExpand} 
                aria-label='share-button' 
                className="rounded-full grid lg:hidden cursor-pointer place-items-center shadow-sm size-9 3xl:size-10 bg-white"
            >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.08458 9.56991L10.9225 12.3891M10.9154 4.61158L6.08458 7.43074M14.875 3.54199C14.875 4.7156 13.9236 5.66699 12.75 5.66699C11.5764 5.66699 10.625 4.7156 10.625 3.54199C10.625 2.36839 11.5764 1.41699 12.75 1.41699C13.9236 1.41699 14.875 2.36839 14.875 3.54199ZM6.375 8.50033C6.375 9.67393 5.4236 10.6253 4.25 10.6253C3.07639 10.6253 2.125 9.67393 2.125 8.50033C2.125 7.32672 3.07639 6.37533 4.25 6.37533C5.4236 6.37533 6.375 7.32672 6.375 8.50033ZM14.875 13.4587C14.875 14.6323 13.9236 15.5837 12.75 15.5837C11.5764 15.5837 10.625 14.6323 10.625 13.4587C10.625 12.2851 11.5764 11.3337 12.75 11.3337C13.9236 11.3337 14.875 12.2851 14.875 13.4587Z" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            {/* Share options - visible based on screen size and expand state */}
            <div className={`flex flex-col gap-3 ${expand ? 'flex' : 'hidden lg:flex'}`}>
                <div className="rounded-full grid cursor-pointer place-items-center shadow-sm size-9 3xl:size-10 bg-white hover:bg-gray-100 transition-colors">
                    <FaFacebookF className="text-[#1E1E1E]"/>
                </div>
                <div className="rounded-full grid cursor-pointer place-items-center shadow-sm size-9 3xl:size-10 bg-white hover:bg-gray-100 transition-colors">
                    <RiTwitterXLine className="text-[#1E1E1E]"/>
                </div>
                <div className="rounded-full grid cursor-pointer place-items-center shadow-sm size-9 3xl:size-10 bg-white hover:bg-gray-100 transition-colors">
                    <FaLinkedinIn className="text-[#1E1E1E]"/>
                </div>
                <div className="rounded-full grid cursor-pointer place-items-center shadow-sm size-9 3xl:size-10 bg-white hover:bg-gray-100 transition-colors">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5894 9.5C1.96398 8.74792 1.58398 7.78208 1.58398 6.72917C1.58398 4.33833 3.5394 2.375 5.93815 2.375H9.89648C12.2873 2.375 14.2507 4.33833 14.2507 6.72917C14.2507 9.12 12.2952 11.0833 9.89648 11.0833H7.91732" stroke="#231F20" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.4113 9.50033C17.0367 10.2524 17.4167 11.2182 17.4167 12.2712C17.4167 14.662 15.4612 16.6253 13.0625 16.6253H9.10417C6.71333 16.6253 4.75 14.662 4.75 12.2712C4.75 9.88033 6.70542 7.91699 9.10417 7.91699H11.0833" stroke="#231F20" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}