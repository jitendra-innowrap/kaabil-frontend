'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-headless-accordion';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useAppSelector } from '@/redux/hooks';

function RangeAccordion() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { min: reduxMin, max: reduxMax } = useAppSelector((state) => state.jobFiltersMaster.salary);

    // State for the temporary salary range (used for slider and input fields)
    const [tempValue, setTempValue] = useState({ min: reduxMin, max: reduxMax });

    // State to track if values have been changed by user
    const [valuesChanged, setValuesChanged] = useState(false);

    // Update the temporary values when Redux state changes
    useEffect(() => {
        setTempValue({ min: reduxMin, max: reduxMax });
        setValuesChanged(false); // Reset changed flag when Redux updates
    }, [reduxMin, reduxMax]);

    // Load initial salary range from URL if present
    useEffect(() => {
        const minSalary = searchParams.get('minSalary');
        const maxSalary = searchParams.get('maxSalary');

        if (minSalary && maxSalary) {
            setTempValue({ min: Number(minSalary), max: Number(maxSalary) });
        }
    }, [searchParams]);

    // Handle slider changes
    const handleRangeChange = ([min, max]: number[]) => {
        setTempValue({ min, max });
        setValuesChanged(true); // Mark as changed when user interacts
    };

    // Handle input field changes
    const handleInputChange = (type: 'min' | 'max', newValue: number) => {
        setTempValue(prev => {
            const updated = { ...prev, [type]: newValue };
            // Check if either value has changed from initial Redux state
            const hasChanged = updated.min !== reduxMin || updated.max !== reduxMax;
            setValuesChanged(hasChanged);
            return updated;
        });
    };
    // Common panel closing function
    const closeFilterPanel = () => {
        const button = document.getElementById('filter-pannel-overlay');
        if (button) button.click();
    };
  
    // Handle Apply button click
    const handleApply = () => {
        if (!valuesChanged) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        
        // Only update params if values have changed
        if (valuesChanged) {
            params.set('minSalary', tempValue.min.toString());
            params.set('maxSalary', tempValue.max.toString());
        } else {
            // Remove params if they exist but values haven't changed
            params.delete('minSalary');
            params.delete('maxSalary');
        }

        // Use router to push new URL params without refreshing the page
        router.replace(`?${params.toString()}`, { scroll: false });
        closeFilterPanel();
    };
    
    // Handle Apply button click
    const handleMobileApply = () => {
        const params = new URLSearchParams(searchParams.toString());
        
        // Only update params if values have changed
        if (valuesChanged) {
            params.set('minSalary', tempValue.min.toString());
            params.set('maxSalary', tempValue.max.toString());
        } else {
            // Remove params if they exist but values haven't changed
            params.delete('minSalary');
            params.delete('maxSalary');
        }
        // Redirect to /jobs with params if not already there
        if (pathname !== '/jobs') {
            router.push(`/jobs?${params.toString()}`);
        } else {
            router.replace(`?${params.toString()}`, { scroll: false });
        }
        closeFilterPanel();
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
                            <div className="font-semibold mb-4 xl:mb-5 text-base">{"Salary"} <span className='text-xs font-normal'>per year</span></div>
                            {open ? (
                                <BiChevronUp className="hidden text-slate-500 font-bold text-xl" />
                            ) : (
                                <BiChevronDown className="hidden text-slate-500 font-bold text-xl" />
                            )}
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="block mb-6 mt-2">
                                <RangeSlider
                                    id="range-slider-salary"
                                    min={reduxMin}
                                    max={reduxMax}
                                    step={1000}
                                    value={[tempValue.min, tempValue.max]}
                                    onInput={handleRangeChange}
                                />
                            </div>
                            <form className="lg:mb-5">
                                <div className="form-group relative mb-2">
                                    <label htmlFor="min-salary" className="absolute block text-sm top-[14px] left-3 mb-1">Min ₹</label>
                                    <input
                                        type="number"
                                        className='w-full text-sm p-[14px] pl-[65px] rounded-lg bg-[#F6F6F6] mt-[1px]'
                                        id="min-salary"
                                        name="min-salary"
                                        value={tempValue.min}
                                        onChange={(e) => handleInputChange('min', Number(e.target.value))}
                                    />
                                </div>
                                <div className="form-group relative mb-2">
                                    <label htmlFor="max-salary" className="absolute block text-sm top-[14px] left-3 mb-1">Max ₹</label>
                                    <input
                                        type="number"
                                        className='w-full text-sm p-[14px] pl-[65px] rounded-lg bg-[#F6F6F6] mt-[1px]'
                                        id="max-salary"
                                        name="max-salary"
                                        value={tempValue.max}
                                        onChange={(e) => handleInputChange('max', Number(e.target.value))}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className='hidden lg:block w-full filter-range-btn !bg-black text-sm font-normal !text-white'
                                    onClick={handleApply}
                                >
                                    Apply
                                </button>
                                <div className="block lg:hidden sticky-apply-on-filter-pannel">
                                    <button
                                        type="button"
                                        className='w-full filter-range-btn !bg-black text-sm font-normal !text-white'
                                        onClick={handleMobileApply}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </form>
                        </AccordionBody>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <RangeAccordion />
        </Suspense>
    );
}