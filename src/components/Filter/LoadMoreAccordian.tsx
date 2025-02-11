'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-headless-accordion';
import { BiChevronDown, BiChevronUp, BiSearch } from 'react-icons/bi';
import Radio from './Radio';
import Check from './Check';

// Define the types for the props
interface LoadMoreAccordionProps {
    fetchMoreItems?: any; // Define a more specific type if possible
    header: string;
    isSearchable?: boolean;
    isRadio?: boolean;
    list: Array<{ id: number | string; name: string }>;
}
function LoadMoreAccordion({ 
    fetchMoreItems, 
    header,
    isSearchable = false, 
    isRadio = false, 
    list
}: LoadMoreAccordionProps) {
    const [selected, setSelected] = useState<string>('');    
    const [search, setSearch] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    // Load filters from URL on initial load
    useEffect(() => {
        const urlFilters = searchParams.get(header.toLowerCase());
        if (urlFilters) {
            setSelected(urlFilters);
        }
    }, [searchParams, header]);

    const handleCheck = (item: { id: number | string; name: string }) => {
        const selectedArray = selected ? selected.split('|') : [];
        const itemName = item.name;
        const isSelected = selectedArray.includes(itemName);

        let updatedSelected;
        if (isSelected) {
            updatedSelected = selectedArray.filter(selectedItem => selectedItem !== itemName);
        } else {
            updatedSelected = [...selectedArray, itemName];
        }

        const newSelected = updatedSelected.join('|');
        setSelected(newSelected);

        // Update the URL parameters
        const params = new URLSearchParams(searchParams.toString());
        if (newSelected) {
            params.set(header.toLowerCase(), newSelected);
        } else {
            params.delete(header.toLowerCase());
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleRadio = (item: { id: number | string; name: string }) => {
        const isSelected = selected === item.name;
        const newSelected = isSelected ? '' : item.name;
        setSelected(newSelected);

        // Update the URL parameters
        const params = new URLSearchParams(searchParams.toString());
        if (newSelected) {
            params.set(header.toLowerCase(), newSelected);
        } else {
            params.delete(header.toLowerCase());
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <Accordion className='border bg-white px-7 border-[#A7A7A7] rounded-[20px]' transition={{ duration: '300ms', timingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}>
            <AccordionItem isActive={true}>
                {({ open }: any) => (
                    <>
                        <AccordionHeader className="w-full flex justify-between items-center text-black py-4">
                            <span className="font-normal text-base">{header}</span>
                            {open ? (
                                <BiChevronUp className="text-slate-500 font-bold text-xl" />
                            ) : (
                                <BiChevronDown className="text-slate-500 font-bold text-xl" />
                            )}
                        </AccordionHeader>
                        <AccordionBody>
                            {isSearchable ? (
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="py-2 px-4 w-full font-medium text-sm rounded-[100px] z-0 focus:shadow focus:outline-none border border-[#8C8C8C] placeholder:text-black placeholder:font-normal"
                                        placeholder={`Search ${header}`}
                                    />
                                    <div className="absolute top-1/2 right-1 -translate-y-1/2">
                                        <button className="mr-4 h-full">
                                            <BiSearch />
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                            <ul className='mb-4 grid gap-4 max-h-[210px] overflow-y-auto custom-scrollbar'>
                                {list.map((item) => (
                                    isRadio ? (
                                        <li key={item.id} onClick={() => handleRadio(item)}>
                                            <Radio item={item.name} checked={selected === item.name} />
                                        </li>
                                    ) : (
                                        <li key={item.id} onClick={() => handleCheck(item)}>
                                            <Check item={item.name} checked={selected.split('|').includes(item.name)} />
                                        </li>
                                    )
                                ))}
                            </ul>
                            {fetchMoreItems && <button className='text-[#e41c3b] underline mb-5'>View all</button>}
                        </AccordionBody>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
}

// Wrap the LoadMoreAccordion component with Suspense in your page or parent component where it's used
export default function Page({fetchMoreItems, 
    header,
    isSearchable = false, 
    isRadio = false, 
    list
}: LoadMoreAccordionProps) {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadMoreAccordion 
                header={header}
                fetchMoreItems={fetchMoreItems}
                list={list} 
                isSearchable={isSearchable} 
                isRadio={isRadio} 
            />
        </React.Suspense>
    );
}