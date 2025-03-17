'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-headless-accordion';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useAppSelector } from '@/redux/hooks';

function RangeAccordion() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { min: reduxMin, max: reduxMax } = useAppSelector((state) => state.jobFiltersMaster.salary);

    // State for the temporary salary range (used for slider and input fields)
    const [tempValue, setTempValue] = useState({ min: reduxMin, max: reduxMax });

    // State for the applied salary range (used for URL params)
    const [appliedValue, setAppliedValue] = useState({ min: reduxMin, max: reduxMax });

    // Update the temporary values when Redux state changes
    useEffect(() => {
        setTempValue({ min: reduxMin, max: reduxMax });
        setAppliedValue({ min: reduxMin, max: reduxMax });
    }, [reduxMin, reduxMax]);

    // Load initial salary range from URL if present
    useEffect(() => {
        const minSalary = searchParams.get('minSalary');
        const maxSalary = searchParams.get('maxSalary');

        if (minSalary && maxSalary) {
            setTempValue({ min: Number(minSalary), max: Number(maxSalary) });
            setAppliedValue({ min: Number(minSalary), max: Number(maxSalary) });
        }
    }, [searchParams]);

    // Handle slider changes
    const handleRangeChange = ([min, max]: number[]) => {
        setTempValue({ min, max });
    };

    // Handle input field changes
    const handleInputChange = (type: 'min' | 'max', newValue: number) => {
        setTempValue((prev) => ({ ...prev, [type]: newValue }));
    };

    // Handle Apply button click
    const handleApply = () => {
        setAppliedValue(tempValue); // Set the applied values

        // Update the query parameters in the URL
        const params = new URLSearchParams(searchParams.toString());
        params.set('minSalary', tempValue.min.toString());
        params.set('maxSalary', tempValue.max.toString());

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
                                {/* Salary range slider */}
                                <RangeSlider
                                    id="range-slider-salary"
                                    min={reduxMin} // Use Redux state for min
                                    max={reduxMax} // Use Redux state for max
                                    step={1000}
                                    value={[tempValue.min, tempValue.max]} // Use temporary values
                                    onInput={handleRangeChange}
                                />
                            </div>
                            <form className="mb-5">
                                <div className="form-group relative mb-2">
                                    <label htmlFor="min-salary" className="absolute block text-xs 2xl:text-sm top-[14px] left-3 mb-1">Min ₹</label>
                                    <input
                                        type="text"
                                        className='w-full text-xs 2xl:text-sm p-[14px] pl-[65px] rounded-lg bg-[#F6F6F6] mt-[1px]'
                                        id="min-salary"
                                        name="min-salary"
                                        value={tempValue.min}
                                        onChange={(e) => handleInputChange('min', Number(e.target.value))}
                                    />
                                </div>
                                <div className="form-group relative mb-2">
                                    <label htmlFor="max-salary" className="absolute block text-xs 2xl:text-sm top-[14px] left-3 mb-1">Max ₹</label>
                                    <input
                                        type="text"
                                        className='w-full text-xs 2xl:text-sm p-[14px] pl-[65px] rounded-lg bg-[#F6F6F6] mt-[1px]'
                                        id="max-salary"
                                        name="max-salary"
                                        value={tempValue.max}
                                        onChange={(e) => handleInputChange('max', Number(e.target.value))}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className='w-full filter-range-btn !bg-black text-xs 2xl:text-sm font-normal !text-white'
                                    onClick={handleApply}
                                >
                                    Apply
                                </button>
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