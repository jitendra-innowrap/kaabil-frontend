'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-headless-accordion';
import { BiChevronDown, BiChevronUp, BiSearch } from 'react-icons/bi';
import Radio from './Radio';
import Check from './Check';

// Define the types for the props
interface LoadMoreAccordionProps {
  removeOptionsSearch?:boolean;
  fetchMoreItems?: (keyword: string) => Promise<Array<{ key: string, doc_count: number, latitude?: number, longitude?: number }>>;
  maxItems?: number;
  filterKey: string;
  header: string;
  isSearchable?: boolean;
  isRadio?: boolean;
  list: Array<{ key: string, doc_count: number, latitude?: number, longitude?: number }>;
  searchPlaceholder?: string;
  searchIcon?: ReactNode;
  showOptionsOnlyOnSearch?: boolean;
}

function LoadMoreAccordion({
  fetchMoreItems,
  maxItems = 0,
  header,
  filterKey,
  isSearchable = false,
  isRadio = false,
  list,
  searchPlaceholder = "",
  searchIcon = <BiSearch />,
  showOptionsOnlyOnSearch = false,
  removeOptionsSearch
}: LoadMoreAccordionProps) {
  const [selected, setSelected] = useState<string>('');
  const [search, setSearch] = useState("ok");
  const [showAll, setShowAll] = useState(false);
  const [dynamicList, setDynamicList] = useState<Array<{ key: string, doc_count: number, latitude?: number, longitude?: number }>>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load filters from URL on initial load and when filters change
  useEffect(() => {
    const urlFilters = searchParams.get(filterKey.toLowerCase());
    setSelected(urlFilters || ''); // Set to empty string if no filters are present
    console.log('Filters updated:', urlFilters);
  }, [searchParams.toString(), filterKey]);

  useEffect(() => {
    setSearch("");
  }, [removeOptionsSearch]);

  // Handle search input change
  useEffect(() => {
    if (isSearchable && fetchMoreItems) {
      const fetchOptions = async () => {
        const options = await fetchMoreItems(search);
        setDynamicList(options);
      };
      fetchOptions();
    }
  }, [search, isSearchable, fetchMoreItems]);

  // Filter the list based on search input and remove empty keys
  const filteredList = (fetchMoreItems ? dynamicList : list)
    ?.filter(item => item.key && item.key.toLowerCase().includes(search.toLowerCase()));

  // Determine the list to display based on "Show More" state
  const displayedList = maxItems > 0 && !showAll ? filteredList.slice(0, maxItems) : filteredList;

  // Determine if options should be shown based on search and showOptionsOnlyOnSearch prop
  const shouldShowOptions = !showOptionsOnlyOnSearch || search.trim() !== "";

  const handleCheck = (item: { key: string, latitude?: number, longitude?: number }) => {
    const selectedArray = selected ? selected.split('|') : [];
    const itemName = item.key;
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
      params.set(filterKey.toLowerCase(), newSelected);
    } else {
      params.delete(filterKey.toLowerCase());
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleRadio = (item: { key: string, latitude?: number, longitude?: number }) => {
    const isSelected = selected === item.key;
    const newSelected = isSelected ? '' : item.key;
    setSelected(newSelected);

    // Update the URL parameters
    const params = new URLSearchParams(searchParams.toString());
    if (newSelected) {
      params.set(filterKey.toLowerCase(), newSelected);
    } else {
      params.delete(filterKey.toLowerCase());
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };


  return (
    <Accordion alwaysOpen className='filter-accordian border bg-white px-7 border-[#A7A7A7] rounded-[20px]' transition={{ duration: '300ms', timingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}>
      <AccordionItem isActive={true}>
        {({ open = true }: any) => (
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
                    placeholder={searchPlaceholder ? searchPlaceholder : `Search ${header}`}
                  />
                  <div className="absolute top-[32px] left-[10px] -translate-y-1/2">
                    <span className="mr-4 ">
                      {searchIcon ? searchIcon : <BiSearch className='size-4 xl:size-5 bg-[#6C757D] text-[#6C757D] font-bold' color='#6C757D' />}
                    </span>
                  </div>
                </div>
              ) : <></>}
              {shouldShowOptions && filteredList?.length > 0 ? (
                <ul className={`pb-3 3xl:pb-5 grid gap-3 pt-3 3xl:pt-5 overflow-y-auto ${maxItems > 0 && showAll ? 'max-h-72' : ''} custom-scrollbar`}>
                  {displayedList.map((item) => (
                    isRadio ? (
                      <li key={item.key} className='flex justify-between items-center gap-3' onClick={() => handleRadio(item)}>
                        <Radio item={item.key} checked={selected === item.key} />
                        <span className='mr-3 text-xs 2xl:text-sm text-end'>{item.doc_count >= 0 ? item.doc_count : ''}</span>
                      </li>
                    ) : (
                      <li key={item.key} className='flex justify-between items-center gap-3' onClick={() => handleCheck(item)}>
                        <Check item={item.key} checked={selected.split('|').includes(item.key)} />
                        <span className='mr-3 text-xs 2xl:text-sm text-end'>{item.doc_count >= 0 ? item.doc_count : ''}</span>
                      </li>
                    )
                  ))}
                </ul>
              ) : <></>}
              {shouldShowOptions && maxItems > 0 && filteredList.length > maxItems ? (
                <button
                  className={`show-more !py-2 text-sm text-blue-500 hover:text-blue-700 ${showAll ? 'mt-3' : ''}`}
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? 'Show Less' : 'Show More'}
                </button>
              ) : <></>}
            </AccordionBody>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}

// Wrap the LoadMoreAccordion component with Suspense when using useSearchparmas recommended
export default function Page({
    fetchMoreItems,
    maxItems,
    header,
    filterKey,
    isSearchable = false,
    isRadio = false,
    list,
    searchIcon,
    searchPlaceholder,
    showOptionsOnlyOnSearch = false, // Pass the new prop
    removeOptionsSearch = false,
}: LoadMoreAccordionProps) {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadMoreAccordion
                filterKey={filterKey}
                header={header}
                maxItems={maxItems}
                fetchMoreItems={fetchMoreItems}
                list={list}
                removeOptionsSearch={removeOptionsSearch}
                searchIcon={searchIcon}
                searchPlaceholder={searchPlaceholder}
                isSearchable={isSearchable}
                isRadio={isRadio}
                showOptionsOnlyOnSearch={showOptionsOnlyOnSearch} // Pass the new prop
            />
        </React.Suspense>
    );
}