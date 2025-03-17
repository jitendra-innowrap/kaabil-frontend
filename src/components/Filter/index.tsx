'use client'
import React, { useEffect, useState } from 'react'
import LoadMoreAccordian from './LoadMoreAccordian'
import { VscListFilter } from 'react-icons/vsc'
import { HiOutlineFilter } from 'react-icons/hi'
import RangeAccordian from './RangeAccordian'
import PopularTags from './PopularTags'
import { GrLocation } from 'react-icons/gr'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'

export default function FilterSidebar() {
    const [open, setOpen] = useState(false);
    const filters = useAppSelector((state) => state.jobFiltersMaster);
    const [autocompleteService, setAutocompleteService] = useState<any>(null); // State for Google Places AutocompleteService

    // Load Google Places API script and initialize AutocompleteService
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCp-H598wbMhBWMz9I_zbvdcknH-fiBVCo&libraries=places`;
        script.async = true;
        script.onload = () => {
            if (window.google && window.google.maps && window.google.maps.places) {
                setAutocompleteService(new window.google.maps.places.AutocompleteService());
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    const router = useRouter();
    
    // Handle Clear All button click
    const handleClearAll = () => {
        // Remove all search parameters and navigate to the base URL
        router.push('/jobs', { scroll: false }); // Replace '/jobs' with your base route
    };

    // Function to fetch location options from Google Maps API
    const fetchLocationOptions = async (keyword: string) => {
        if (!autocompleteService || !keyword) return [];

        return new Promise<Array<{ key: string; doc_count: number }>>((resolve) => {
            autocompleteService.getPlacePredictions({ input: keyword }, (predictions: any, status: any) => {
                if (status === 'OK') {
                    const options = predictions.map((prediction: any) => ({
                        key: prediction.description,
                        doc_count: -1, // Add a dummy count
                    }));
                    resolve(options);
                } else {
                    resolve([]);
                }
            });
        });
    };
  return (
    <>
    {open && <div className="block bg-black z-10 opacity-20 w-screen h-screen fixed top-0 left-0" onClick={()=>setOpen(false)}></div>}
    <div className="filters-sidebar lg:min-w-[260px] h-fit p-4 md:p-6 rounded-[20px] flex bg-white relative flex-col lg:w-fit items-start">
    {/* <pre>{JSON.stringify(filters,null,2)}</pre> */}
        <div className="flex justify-between items-center w-full mb-2 md:mb-4 xl:mb-6 2xl:mb-8">
            <h2 className="text-lg 2xl:text-xl">All Filters
            <VscListFilter onClick={()=>setOpen(!open)} name="allFilters"  id="allFilters" className="inline lg:hidden ml-3 cursor-pointer size-5"/></h2>
            <button onClick={handleClearAll} className='btn-border text-black !border-black text-xs font-medium max-w-[72px] !px-2 whitespace-nowrap text-center' style={{textTransform:'unset'}}>clear all</button>
        </div>
        <div className="flex lg:gap-7 xl:gap-10 2xl:gap-12">
            <div className={`absolute p-6 lg:p-0 rounded-3xl bg-white lg:relative z-[100] ${!open ? '-left-[120%] lg:left-0' : 'left-0'} transition-all top-[54px] md:top-16 lg:top-0 w-full flex flex-col gap-4 xl:gap-5 duration-300 h-max`}>
                <LoadMoreAccordian 
                    showOptionsOnlyOnSearch
                    header="Search by Location"  
                    isSearchable={true} 
                    searchIcon={<GrLocation className='size-4 2xl:size-5 text-[#6C757D] font-bold' />}
                    list={filters?.location_filter} 
                    maxItems={10}
                    filterKey='location_filter'
                    // fetchMoreItems={fetchLocationOptions}
                    searchPlaceholder='Choose city'
                    />
                {/* <LoadMoreAccordian 
                    header="Industry" 
                    list={[]} 
                    filterKey='industry'
                /> */}
                <LoadMoreAccordian 
                    header="Job Type"
                    list={filters?.job_types_filter} 
                    filterKey='job_types_filter'
                    />
                <LoadMoreAccordian 
                    header="Experience level" 
                    filterKey='experience'
                    list={[
                        {doc_count:10, key:'Fresher'},
                        {doc_count:10, key:'Experienced'},
                    ]} 
                    />

                <LoadMoreAccordian 
                    header="Work Mode"
                    filterKey='job_location_types_filter' 
                    list={filters?.job_location_types_filter} 
                    />

                <LoadMoreAccordian 
                    maxItems={8}
                    filterKey='benefits_filter'
                    // isSearchable
                    header="Benefits" 
                    list={filters?.benefits_filter} 
                    />

                <RangeAccordian/>
                {/* <PopularTags/> */}
            </div>
        </div>
    </div>
    </>
  )
}
