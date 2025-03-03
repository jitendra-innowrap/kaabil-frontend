'use client';
import React, { ReactNode, useEffect, useState } from 'react';
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
    searchPlaceholder?: string;
    searchIcon?: ReactNode;
}
function LoadMoreAccordion({ 
    fetchMoreItems, 
    header,
    isSearchable = false, 
    isRadio = false, 
    list,
    searchPlaceholder = "",
    searchIcon = <BiSearch />
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
        <Accordion alwaysOpen className='filter-accordian border bg-white px-7 border-[#A7A7A7] rounded-[20px]' transition={{ duration: '300ms', timingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}>
            <AccordionItem isActive={true}>
                {({ open=true }: any) => (
                    <>
                        <AccordionHeader className="w-full flex justify-between items-center text-black py-4">
                            <span className="font-semibold text-sm 2xl:text-base">{header}</span>
                            {open ? (
                                <BiChevronUp className="hidden text-slate-500 font-bold text-xl" />
                            ) : (
                                <BiChevronDown className="hidden text-slate-500 font-bold text-xl" />
                            )}
                        </AccordionHeader>
                        <AccordionBody>
                            {isSearchable ? (
                                <div className="relative mt-4 xl:mt-5">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="py-2 pl-8 2xl:pl-10 h-[40px] px-4 w-full text-xs 2xl:text-sm rounded-[12px] z-0 focus:shadow focus:outline-none bg-[#F6F6F6] placeholder:text-[#6C757D] placeholder:font-normal"
                                        placeholder={searchPlaceholder?searchPlaceholder:`Search ${header}`}
                                    />
                                    <div className="absolute top-[32px] left-[10px] -translate-y-1/2">
                                        <span className="mr-4 ">
                                            {searchIcon?searchIcon:<BiSearch className='size-4 xl:size-5 bg-[#6C757D] text-[#6C757D] font-bold' color='#6C757D' />}
                                        </span>
                                    </div>
                                </div>
                            ) : null}
                            {list?.length>0 &&<ul className='pb-3 3xl:pb-5 grid gap-3  pt-3 3xl:pt-5 overflow-y-auto custom-scrollbar'>
                                {list.map((item) => (
                                    isRadio ? (
                                        <li key={item.id} className='flex justify-between gap-3' onClick={() => handleRadio(item)}>
                                            <Radio item={item.name} checked={selected === item.name} />
                                            <span className='mr-3 text-xs 2xl:text-sm text-end'>{item.id}</span>
                                        </li>
                                    ) : (
                                        <li key={item.id} className='flex justify-between gap-3' onClick={() => handleCheck(item)}>
                                            <Check item={item.name} checked={selected.split('|').includes(item.name)} />
                                            <span className='mr-3 text-xs 2xl:text-sm text-end'>{item.id}</span>
                                        </li>
                                    )
                                ))}
                            </ul>}
                            {fetchMoreItems && <button className='show-more !py-2'>show more</button>}
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
    list,
    searchIcon,
    searchPlaceholder
}: LoadMoreAccordionProps) {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadMoreAccordion 
                header={header}
                fetchMoreItems={fetchMoreItems}
                list={list} 
                searchIcon={searchIcon}
                searchPlaceholder={searchPlaceholder}
                isSearchable={isSearchable} 
                isRadio={isRadio} 
            />
        </React.Suspense>
    );
}