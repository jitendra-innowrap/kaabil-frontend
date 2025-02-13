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
            className='border bg-white px-7 border-[#A7A7A7] rounded-[20px]'
            transition={{ duration: '300ms', timingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
        >
            <AccordionItem isActive={true}>
                {({ open }: any) => (
                    <>
                        <AccordionHeader className="w-full flex justify-between items-center text-black py-4">
                            <span className="font-normal text-base">{"Salary"}</span>
                            {open ? (
                                <BiChevronUp className="text-slate-500 font-bold text-xl" />
                            ) : (
                                <BiChevronDown className="text-slate-500 font-bold text-xl" />
                            )}
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="block mb-10">
                                {/* Display the formatted salary range */}
                                <div className="flex justify-between mb-5">
                                    <div className="text-lg">{formatSalary(value.min)}</div>
                                    <div className="text-lg">{formatSalary(value.max)}</div>
                                </div>
                                
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