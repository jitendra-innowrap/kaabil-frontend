'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-headless-accordion';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { formatSalary } from '../utils';

 function RangeAccordion() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Default salary range values
    const defaultMin = 5000;
    const defaultMax = 600000;

    // State for the salary range
    const [value, setValue] = useState({ min: defaultMin, max: defaultMax });

    // Load initial salary range from URL if present
    useEffect(() => {
        const minSalary = searchParams.get('minSalary');
        const maxSalary = searchParams.get('maxSalary');
        
        if (minSalary && maxSalary) {
            setValue({ min: Number(minSalary), max: Number(maxSalary) });
        }
    }, [searchParams]);

    // Update the URL parameters whenever the slider value changes
    const handleRangeChange = ([min, max]: number[]) => {
        setValue({ min, max });

        // Update the query parameters in the URL
        const params = new URLSearchParams(searchParams.toString());
        params.set('minSalary', min.toString());
        params.set('maxSalary', max.toString());

        // Use router to push new URL params without refreshing the page
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <Accordion
            className='filter-accordian border bg-white px-7 border-[#A7A7A7] rounded-[20px]'
            transition={{ duration: '300ms', timingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
        >
            <AccordionItem isActive={true}>
                {({ open }: any) => (
                    <>
                        <AccordionHeader className="w-full flex justify-between items-center text-black py-4">
                            <h5 className="font-semibold mb-4 xl:mb-5 text-base">{"Salary"} <span className='text-xs font-normal'>per year</span></h5>
                            {open ? (
                                <BiChevronUp className="hidden text-slate-500 font-bold text-xl" />
                            ) : (
                                <BiChevronDown className="hidden text-slate-500 font-bold text-xl" />
                            )}
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="block mb-6 mt-2">
                                {/* Display the formatted salary range */}
                                
                                {/* Salary range slider */}
                                <RangeSlider
                                    id="range-slider-salary"
                                    min={defaultMin}
                                    max={defaultMax}
                                    step={1000}
                                    value={[value.min, value.max]}
                                    onInput={handleRangeChange}
                                    
                                />
                            </div>
                                <form className="mb-5">
                                    <div className="form-group relative mb-2">
                                        <label htmlFor="min-salary" className="absolute block text-base font-medium top-[14px] left-3 mb-1">Min ₹</label>
                                        <input
                                            type="text"
                                            className='w-full text-sm p-[14px] pl-[65px] rounded-lg bg-[#F6F6F6] '
                                            id="min-salary"
                                            name="min-salary"
                                            value={value.min}
                                            onChange={(e) => setValue({...value, min: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="form-group relative mb-2">
                                        <label htmlFor="min-salary" className="absolute block text-base font-medium top-[14px] left-3 mb-1">Max ₹</label>
                                        <input
                                            type="text"
                                            className='w-full text-sm p-[14px] pl-[65px] rounded-lg bg-[#F6F6F6] '
                                            id="max-salary"
                                            name="max-salary"
                                            value={value.max}
                                            onChange={(e) => setValue({...value, max: Number(e.target.value) })}
                                        />
                                    </div>
                                    <button className='w-full !bg-black !p-[14px] !text-white'>Apply</button>
                                </form>
                        </AccordionBody>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
}

// Wrap the component with Suspense in your page or parent component where it's used
export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RangeAccordion />
        </Suspense>
    );
}