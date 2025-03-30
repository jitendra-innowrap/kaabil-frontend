'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GrLocation } from 'react-icons/gr';
import Select from 'react-select';
import Image from 'next/image';
import { optionType } from '@/Types/common';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import api from '@/Services/Apiservice';
import { getSessionData } from '../utils/deviceId';

function SearchSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location_filter') || '');
  const [latitude, setLatitude] = useState(searchParams.get('latitude') || '');
  const [longitude, setLongitude] = useState(searchParams.get('longitude') || '');
  const [industry, setIndustry] = useState(searchParams.get('industry') || '');
  const [locationOptions, setLocationOptions] = useState<optionType[]>([]);
  const [industryOptions, setIndustryOptions] = useState<optionType[]>([]);
  const autocompleteService = useSelector((state: RootState) => state.search.autocompleteService);
  const isScriptLoaded = useSelector((state: RootState) => state.search.isScriptLoaded);
  useEffect(() => {
    fetchIndustries();
    fetchLocations();
  }, []);

  // Sync state with URL parameters
  useEffect(() => {
    const searchParam = searchParams.get('search') || '';
    const locationParam = searchParams.get('location_filter') || '';
    const industryParam = searchParams.get('industries_filter') || '';

    setSearch(searchParam);
    setLocation(locationParam);
    setIndustry(industryParam);
  }, [searchParams?.toString()]);
  

  const fetchIndustries = async () => {
    try {
      const { deviceId, secret, salt } = getSessionData();
      
      // Ensure session data is available
      if (!deviceId || !secret || !salt) {
        console.log("Session data not available, retrying...");
        setTimeout(fetchIndustries, 1000); // Retry after 1 second
        return;
      }

      const response = await api.post("/MasterData/getIndustry");
      console.log(response);
      setIndustryOptions(response.data?.result.map((ind:{id:string, name:string}) => ({ value: ind.id, label: ind.name })))
     
    } catch (error) {
      console.error("Error fetching job types:", error);
    }
  };
  const fetchLocations = async () => {
    try {
      const { deviceId, secret, salt } = getSessionData();
      
      // Ensure session data is available
      if (!deviceId || !secret || !salt) {
        console.log("Session data not available, retrying...");
        setTimeout(fetchIndustries, 1000); // Retry after 1 second
        return;
      }

      const response = await api.get("/MasterData/getCity");
      console.log(response);
      setLocationOptions(response.data?.result.map((ind:{id:string, name:string}) => ({ value: ind.id, label: ind.name })))
     
    } catch (error) {
      console.error("Error fetching job types:", error);
    }
  };
  const handleSearch = (e: any) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) {
      params.set('location_filter', location);
      if (latitude && longitude) {
        params.set('latitude', latitude);
        params.set('longitude', longitude);
      }
    }
    if (industry) params.set('industries_filter', industry);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-3 lg:gap-0 mx-auto rounded-xl 2xl:rounded-[20px] lg:shadow-default max-w-[800px] xl:max-w-[880px] 2xl:max-w-[1050px] 3xl:max-w-[1313px] lg:bg-white lg:h-[65px] 2xl:h-[90px] 3xl:h-[100px] items-center">
      <input
        type="text"
        id="searchbar_input"
        placeholder="Job Title or Company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="placeholder:truncate w-full text-xs 2xl:text-base 3xl:text-lg md:col-span-4 placeholder:text-[#231F20] opacity-60 px-6 py-2 lg:px-8 3xl:pl-[31px] lg:py-4"
      />
      <div className="relative w-full z-[10] lg:w-[220px] 2xl:w-[250px] 3xl:w-[345px] rounded-[40px]">
        <Select
          value={location ? locationOptions.find(opt => opt.label === location) : null}
          options={locationOptions}
          placeholder="Select Location"
          className="text-xs 2xl:text-base"
          classNamePrefix="select-location"
          // onInputChange={handleLocationInputChange}
          onChange={(selectedOption) => setLocation(selectedOption ? selectedOption.label : '')}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => (
              <img className="mr-3 opacity-60 w-4 2xl:w-5 h-auto" src="/new-assets/icons/chevron-down.svg" alt="" />
            ),
          }}
        />
        <GrLocation className="absolute left-[30px] lg:left-[14px] 2xl:left-[18px] opacity-60 top-[16px] lg:top-[10px] 2xl:top-[16px] size-5 lg:size-4 2xl:size-5 text-[#808080]" />
      </div>
      <div className="relative w-full z-[10] rounded-[40px] lg:w-[190px] 2xl:w-[220px] 3xl:w-[295px]">
        <Select
          value={industry?industryOptions.find(opt => opt.value === industry):null}
          options={industryOptions}
          placeholder="Select Industry"
          className="text-xs 2xl:text-base"
          classNamePrefix="select-industry"
          onChange={(selectedOption) => setIndustry(selectedOption ? selectedOption.label : '')}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => (
              <img className="mr-3 opacity-60 w-4 2xl:w-5 h-auto" src="/new-assets/icons/chevron-down.svg" alt="" />
            ),
          }}
        />
      </div>
      <button
        type='submit'
        className="text-sx md:text-lg lg:text-xs 2xl:text-lg justify-center w-full font-medium px-6 flex lg:px-8 2xl:h-[100px]  lg:w-[160px] 2xl:min-w-[180px] 3xl:min-w-[222px] whitespace-nowrap bg-[#E41C3B] text-white"
      >
        <Image className="mr-2 2xl:mr-4 lg:w-4 2xl:w-6" src="/new-assets/icons/search-icon.svg" width="24" height="24" alt="Search" />
        Search Jobs
      </button>
    </form>
  );
}
export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchSection />
        </Suspense>
    );
}