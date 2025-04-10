'use client'
import React, { useEffect, useRef, useState } from 'react'
import Breadcrumb from '../Breadcrumb'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import JobsNearYouMap, { MapJobLocation } from '../Map/JobsNearYouMap';
import { useDispatch } from 'react-redux';
import { getSessionData } from '../utils/deviceId';
import api from '@/Services/Apiservice';
import Pagination from '../Pagination';
import NearestjobCard from '../Cards/NearestJobCard';
import { setCurrentLocation } from '@/redux/userSlice';
import { fetchUserLocation, showToast } from '../utils';
import CustomGoogleMap from '../Map/JobsNearYouMap';
import { google_map_api_key } from '@/config/app.config';

interface radius {
    created_by: string,
    created_date: string,
    id: string,
    name: string,
    order_no: string,
    status: string,
    updated_by: string,
    updated_date: string,
    value: string,
}

interface PlacePrediction {
    description: string;
    place_id: string;
    // Add other properties you need from the response
  }
export default function JobsNearYou() {
    const [isMapopen, setIsMapopen] = useState(false);
    const currentLocation = useAppSelector((state) => state.user.current_location);
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams.get("page") || "1"; // Get the current page from the URL
    const search = searchParams.get("search") || ""; // Get the current page from the URL
    const [currentPage, setCurrentPage] = useState(parseInt(page, 10));
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();
    const [jobs, setJobs] = useState<object[] | null>(null);
    const [isJobsLoading, setIsJobsLoading] = useState(true);
    const [selectedradius, setselectedradius] = useState<null | radius>(null);
    const [radiusList, setRadiusList] = useState<radius[]>([]);
    const [searchOptions, setSearchOptions] = useState<PlacePrediction[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [autocompleteService, setAutocompleteService] = useState<any>(null);
    const [geocoder, setGeocoder] = useState<any>(null);
    const [showAutoCompleteOptions, setShowAutoCompleteOptions] = useState(false);
    const [jobLocations, setJobLocations] = useState<MapJobLocation[] | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{
        lat: string;
        lng: string;
        address: string;
    } | null>(null);
    const [selectedJobId, setSelectedJobId] = useState<string >();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMarkerClick = (jobId: string) => {
    setSelectedJobId(jobId);
    // Scroll to the job card
    const element = document.getElementById(`job-${jobId}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    };

    // Load Google Maps API script
    useEffect(() => {
        const loadGoogleMapsScript = () => {
            if (typeof window !== 'undefined' && !window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${google_map_api_key}&libraries=places`;
                script.async = true;
                script.defer = true;
                script.onload = () => {
                    if (window.google) {
                        setAutocompleteService(new window.google.maps.places.AutocompleteService());
                        setGeocoder(new window.google.maps.Geocoder());
                    }
                };
                document.head.appendChild(script);
            } else if (window.google) {
                setAutocompleteService(new window.google.maps.places.AutocompleteService());
                setGeocoder(new window.google.maps.Geocoder());
            }
        };

        loadGoogleMapsScript();
    }, []);

    // Geocode the selected location
    const geocodeAddress = (address: string) => {
        if (!geocoder) return;

        geocoder.geocode({ address }, (results: any[], status: string) => {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                setSelectedLocation({
                    lat: location.lat().toString(),
                    lng: location.lng().toString(),
                    address
                });
            } else {
                console.error('Geocode was not successful for the following reason:', status);
                // Fallback to current location
                setSelectedLocation(null);
            }
        });
    };

     // Handle location selection from autocomplete
     const handleLocationSelect = (option: PlacePrediction) => {
        router.replace(`?page=1`, { scroll: true });
        setInputValue(option.description);
        setSearchOptions([]);
        setShowAutoCompleteOptions(false);
        geocodeAddress(option.description);
    };

    // Update payload with selected or current location
    const getPayload = () => {
        return {
            latitude: selectedLocation?.lat || currentLocation?.city_latitude || '',
            longitude: selectedLocation?.lng || currentLocation?.city_longitude || '',
            radius_id: selectedradius?.id || '2',
            radius_value: selectedradius?.value || '20',
            page: currentPage.toString(),
            filter_flag: '3',
        };
    };

    // Handle autocomplete requests
    const fetchAutocompleteResults = (input: string) => {
        if (!autocompleteService || input.length < 2) {
            setSearchOptions([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        autocompleteService.getPlacePredictions(
            {
                input,
                componentRestrictions: { country: 'in' },
                types: ['geocode']
            },
            (predictions: PlacePrediction[], status: string) => {
                setIsLoading(false);
                if (status === 'OK') {
                    setSearchOptions(predictions);
                } else {
                    setError(status === 'ZERO_RESULTS' ? 'No results found' : 'Failed to fetch predictions');
                    setSearchOptions([]);
                }
            }
        );
    };

    // Debounce function to limit API calls
    useEffect(() => {
        const timerId = setTimeout(() => {
            fetchAutocompleteResults(inputValue);
        }, 300);

        return () => clearTimeout(timerId);
    }, [inputValue, autocompleteService]);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(1);
        // Create a new URLSearchParams object from the current search parameters
        const params = new URLSearchParams(searchParams.toString());

        // Update the 'page' parameter
        params.set("page", '1');

        // Push the updated query parameters to the URL
        router.replace(`?${params.toString()}`, { scroll: true });
        setInputValue(e.target.value);
        setShowAutoCompleteOptions(true);
    };

    useEffect(() => {
        const fetchRadius = async () => {
      
            const { deviceId, secret, salt } = getSessionData();
      
            // Ensure session data is available
            if (!deviceId || !secret || !salt) {
            //   console.log("Session data not available, retrying...");
              setTimeout(fetchRadius, 1000); // Retry after 1 second
              return;
            }      
            try {
              setIsJobsLoading(true)
              const response = await api.get(
                `/MasterData/getRadius`
              );
            //   console.log(response, "radius list 👍👍👍")
              setRadiusList(response.data?.result as radius[]);
              setselectedradius(response?.data?.result?.[0])
              setIsJobsLoading(false);
            } catch (error) {
              console.error("Error fetching jobs:", error);
            }
          };
          fetchRadius();
    }, [])

    const handleRadius=(radius:radius)=>{
        setselectedradius(radius);
        setCurrentPage(1);
        // Create a new URLSearchParams object from the current search parameters
        const params = new URLSearchParams(searchParams.toString());

        // Update the 'page' parameter
        params.set("page", '1');

        // Push the updated query parameters to the URL
        router.replace(`?${params.toString()}`, { scroll: true });
    }
      // Handle pagination button click
    const handleActive = (page: number) => {
        setCurrentPage(page);

        // Create a new URLSearchParams object from the current search parameters
        const params = new URLSearchParams(searchParams.toString());

        // Update the 'page' parameter
        params.set("page", page.toString());

        // Push the updated query parameters to the URL
        router.replace(`?${params.toString()}`, { scroll: true });
    };

    // Fetch jobs based on the current page
    useEffect(() => {
        if(!inputValue) setInputValue(currentLocation?.city || "")
        fetchJobs();
    }, [page, selectedradius, selectedLocation, currentLocation?.city]);
    const errorShownRef = useRef(false);

    const handleFetchLocation = async (): Promise<boolean> => {
        try {
          const location = await fetchUserLocation();
          dispatch(setCurrentLocation(location));
          return true;
        } catch (error:any) {
          console.error('Error fetching location:', error);
          
          setJobs([])
          // Only show error if not already shown
            if (!errorShownRef.current) {
                if (error.message.includes('denied')) {
                    showToast('Please enable location access for local job searches', true);
                } else {
                    showToast('Could not determine your location', true);
                }
                errorShownRef.current = true;
            }
          return false;
        }
      };
      
    const fetchJobs = async () => {   
        // If no location is selected and no current location
        if (!currentLocation?.city_latitude && !currentLocation?.city_longitude && !selectedLocation) {
            await handleFetchLocation();
            return;
        } 
        const payload = getPayload();

        const { deviceId, secret, salt } = getSessionData();

        // Ensure session data is available
        if (!deviceId || !secret || !salt) {
        // console.log("Session data not available, retrying...");
        setTimeout(fetchJobs, 1000); // Retry after 1 second
        return;
        }

        try {
        const formData = new FormData();
        // ✅ Automatically append all fields from the object
        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value as string); // Convert all values to strings
        });
        setJobs(null)
        const response = await api.post(
            `/Company/getHiringNearMeJob`,
            payload,
            {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            }
        );
        if(response?.data?.code==1){
            setJobLocations(response?.data?.job_location as MapJobLocation[])
            setJobs(response.data?.nearest_jobs as object[]);
            // Calculate total pages based on total jobs and jobs per page
            const totalJobs = response.data?.total_nearest_jobs;
            const jobsPerPage = 20;
            const totalPages = Math.ceil(totalJobs / jobsPerPage);
            setTotalPages(totalPages);
            setTotalJobs(totalJobs);
        }else{
            setTotalJobs(0)
            setTotalPages(0)
            setJobs([]);
            setJobLocations(null)
        }
        setIsJobsLoading(false);
        } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsJobsLoading(false);
        }
    };
    const searchOptionRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (searchOptionRef.current && !searchOptionRef.current.contains(event.target as Node)) {
            setShowAutoCompleteOptions(false);
        }
        };
    
        if (showAutoCompleteOptions) {
        document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAutoCompleteOptions]);

  return (
    <div className="relative jobs-near-me flex">
        <div className='container no-mobile-container'>
            {/* {showPermissionHelp && (
            <div className="permission-help">
                <p>Please enable location permissions in your browser settings.</p>
                <button onClick={() => window.open('chrome://settings/content/location')}>
                Open Settings
                </button>
            </div>
            )} */}

            <div className="lg:w-1/2">
                <div className="hidden lg:block pt-5 3xl:pt-6 mb-7 3xl:mb-8">
                    <Breadcrumb root='Home' category='Jobs near me' />
                </div>
                <h2 className="hidden lg:block font-medium text-base leading-7s xl:text-lg 3xl:text-2xl 3xl:leading-7 mb-1 xl:mb-5 3xl:mb-[22px]">
                    Jobs near me
                </h2>
                <div className="mobile-container">
                    <div className="flex relative near-me-search flex-row gap-3 lg:gap-0 mx-auto rounded-xl 2xl:rounded-[16px] lg:shadow-default bg-white h-[50px] lg:h-[55px] 3xl:h-[68px] items-center mb-1 xl:mb-6 3xl:mb-[26px]">
                        <svg className='lg:hidden absolute left-3 top-4' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.7503 15.7508L12.4878 12.4883" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        {showAutoCompleteOptions && <div className="absolute bottom-0 w-full" ref={searchOptionRef}>
                            {isLoading && <div className="absolute z-10 w-full mt-1 bg-white border shadow-default rounded-xl 2xl:rounded-[16px] h-10">
                                <div className="flex justify-center items-center h-full">
                            <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
                        </div>
                                </div>}                            
                            {searchOptions.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border shadow-default rounded-xl 2xl:rounded-[16px] max-h-60 overflow-auto">
                                {searchOptions?.map((option) => (
                                    <li
                                    key={option.place_id}
                                    className="p-2 hover:bg-gray-100 cursor-pointer text-xs lg:text-xs"
                                    onClick={() => handleLocationSelect(option)}                                    >
                                    {option.description}
                                    </li>
                                ))}
                                </ul>
                            )}
                        </div>}
                        <input
                            type="text"
                            id="searchbar_input"
                            placeholder="Enter location"
                            value={inputValue}
                            onFocus={()=> setShowAutoCompleteOptions(true)}
                            onChange={onSearchChange}
                            className="placeholder:truncate w-full h-full rounded-xl text-xs 2xl:text-base 3xl:text-lg lg:font-semibold placeholder:text-gray-400 pl-9 px-4 py-2 lg:px-6 3xl:pl-[31px] lg:py-4"
                        />
                        <button
                            type='submit'
                            className="h-full w-[74px] hidden lg:grid !p-0 place-items-center absolute top-0 right-0 rounded-e-xl 2xl:rounded-e-2xl rounded-s-none"
                        >
                            <Image className="lg:w-4 2xl:w-6" src="/new-assets/icons/search-icon.svg" width="24" height="24" alt="Search" />
                        </button>
                        <div className="lg:hidden size-6 flex justify-center flex-shrink-0 items-center" onClick={()=>setIsMapopen(!isMapopen)}>
                            {isMapopen?<svg className='lg:hidden' width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.27127 6.98986C3.27127 7.93474 2.54657 8.72275 1.63564 8.72275C0.724707 8.72275 0.0184738 7.93469 0.0184738 6.98986C0.0184738 6.04498 0.743181 5.25698 1.65411 5.25698C2.56509 5.25698 3.27127 6.04503 3.27127 6.98986ZM13.8664 5.78882H6.24539C5.61319 5.78882 5.11175 6.32073 5.11175 6.98986C5.11175 7.65965 5.61381 8.1909 6.24539 8.1909H13.8664C14.4986 8.1909 15 7.65899 15 6.98986C15 6.32008 14.4979 5.78882 13.8664 5.78882ZM1.63564 0C0.743165 0 0 0.767795 0 1.73288C0 2.69797 0.724707 3.46577 1.63564 3.46577C2.54657 3.46577 3.27127 2.69797 3.27127 1.73288C3.27127 0.767795 2.54657 0 1.63564 0ZM13.8664 0.511651H6.24539C5.61319 0.511651 5.11175 1.04356 5.11175 1.71269C5.11175 2.38248 5.61381 2.91373 6.24539 2.91373H13.8664C14.4986 2.91373 15 2.38182 15 1.71269C15 1.04356 14.4979 0.511651 13.8664 0.511651ZM1.63564 10.5342C0.743165 10.5342 0 11.302 0 12.2671C0 13.2322 0.724707 14 1.63564 14C2.54661 13.9993 3.27127 13.2315 3.27127 12.2671C3.27127 11.302 2.54657 10.5342 1.63564 10.5342ZM13.8664 11.0459H6.24539C5.61319 11.0459 5.11175 11.5778 5.11175 12.2469C5.11175 12.9167 5.61381 13.448 6.24539 13.448H13.8664C14.4986 13.448 15 12.9161 15 12.2469C15 11.5778 14.4979 11.0459 13.8664 11.0459Z" fill="black"/>
                            </svg>:
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.29004 7.77998V17.51C2.29004 19.41 3.64004 20.19 5.28004 19.25L7.63004 17.91C8.14004 17.62 8.99004 17.59 9.52004 17.86L14.77 20.49C15.3 20.75 16.15 20.73 16.66 20.44L20.99 17.96C21.54 17.64 22 16.86 22 16.22V6.48998C22 4.58998 20.65 3.80998 19.01 4.74998L16.66 6.08998C16.15 6.37998 15.3 6.40998 14.77 6.13998L9.52004 3.51998C8.99004 3.25998 8.14004 3.27998 7.63004 3.56998L3.30004 6.04998C2.74004 6.36998 2.29004 7.14998 2.29004 7.77998Z" stroke="#231F20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.56006 4V17" stroke="#231F20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.73 6.62012V20.0001" stroke="#231F20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            }
                        </div>
                    </div>
                </div>
                <div className={`w-screen block lg:hidden ${isMapopen?"h-[350px]":"h-0"} transition-all duration-200`}>
                    <CustomGoogleMap
                        lat={selectedLocation?.lat || currentLocation?.city_latitude || ""} 
                        lng={selectedLocation?.lng || currentLocation?.city_longitude || ""}
                        jobLocations={jobLocations || []}
                        onMarkerClick={handleMarkerClick}
                        selectedJobId={selectedJobId}
                    />
                </div>
                {!isMapopen && <div className='mobile-container'>
                    <p className='lg:hidden text-sm mb-[10px]'>Radius (in Kms)</p>
                <div ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove} 
                    className="flex w-full select-none overflow-auto distance-radius-list gap-2 lg:gap-3 3xl:gap-[14px]">
                    {radiusList?.length>0 ? <></> : <div className={`distance-label invisible cursor-pointer w-[50px] lg:w-[100px] flex-shrink-0 text-[11px] leading-[100%] h-[30px] lg:h-[34px] border rounded-md grid place-items-center selected bg-[#231F20] border-black text-white`}>loading...</div>}
                    {
                        radiusList?.map((radius:radius)=>(
                            <div onClick={()=>handleRadius(radius)} className={`distance-label cursor-pointer w-[50px] lg:w-[100px] flex-shrink-0 text-[11px] leading-[100%] h-[30px] lg:h-[34px] border rounded-md grid place-items-center ${selectedradius?.id==radius.id?"selected bg-[#231F20] border-black text-white":"bg-white text-black hover:border-gray-400"}`}>{radius.name}</div>
                        ))
                    }
                </div>
                </div>}
                <div className={`mobile-container ${isMapopen ? "near-me-jobs-pannel border -translate-y-5 bg-[#F9F9F9]" : ""}`}>
                    {!jobs ? (
                        <div className="flex justify-center items-center h-[305px]">
                            <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
                        </div>
                    ) : (
                        <>
                            
                            {jobs.length > 0 ? (
                                <>
                                    <h3 className="font-medium text-base leading-7 xl:text-lg 3xl:text-2xl 3xl:leading-7 mb-1 xl:mb-5 3xl:mb-[22px] mt-2 lg:mt-6 xl:mt-6 3xl:mt-8">
                                        {jobs.length > 0 ? `${totalJobs} Jobs found!` : "No Jobs Found"}
                                    </h3>
                                    <div className="flex flex-col gap-4 lg:gap-3 3xl:gap-4">
                                        {jobs.map((job: any) => (
                                            <div className="flex w-[100%]" key={`job-${job?.id}`} id={`job-${job.id}`}>
                                                <NearestjobCard {...job} />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mobile-container my-12 lg:my-10 2xl:my-12">
                                        <Pagination
                                            currentPage={currentPage}
                                            handleActive={handleActive}
                                            totalPages={totalPages}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="container pt-5 bg-[#f9f9f9] mx-auto w-full px-4 pb-12">
                                    <Image 
                                        className="w-[160px] h-auto mx-auto 3xl:w-[323px] 3xl:h-[262px]" 
                                        width={650} 
                                        height={520} 
                                        src={'/new-assets/images/no-company.svg'} 
                                        alt="no-jobs-found"
                                        priority={false}
                                    />
                                    {selectedLocation ? (
                                        // When user searched a specific location
                                        <>
                                        <h3 className="text-xl 3xl:text-2xl font-medium text-center">
                                            No jobs found near {inputValue}
                                        </h3>
                                        <p className="text-sm 3xl:text-base font-normal text-center mt-2">
                                            Try expanding your search radius or checking nearby cities
                                        </p>
                                        </>
                                    ) : currentLocation?.city ? (
                                        // When using current location but no jobs
                                        <>
                                        <h3 className="text-xl 3xl:text-2xl font-medium text-center">
                                            No jobs found in your area
                                        </h3>
                                        <p className="text-sm 3xl:text-base font-normal text-center mt-2">
                                            Try searching a different location or expanding your search radius
                                        </p>
                                        </>
                                    ) : (
                                        // When location isn't available
                                        <>
                                        <h3 className="text-xl 3xl:text-2xl font-medium text-center">
                                            Let's find jobs near you
                                        </h3>
                                        <p className="text-sm 3xl:text-base font-normal text-center mt-2">
                                        Search for a city or enable location access to find jobs in your area
                                        </p>
                                        </>
                                    )}
                                    </div>
                            )}
                        </>
                    )}
                </div>
                <div className="w-full hidden lg:block fixed md:top-[0] xl:top-[56.6px] 2xl:top-[58px] 3xl:top-[90px] right-0 max-w-[calc(50vw_-_50px)] max-h-[80vh] h-[500px]">
                <CustomGoogleMap
                    lat={selectedLocation?.lat || currentLocation?.city_latitude || ""} 
                    lng={selectedLocation?.lng || currentLocation?.city_longitude || ""}
                    jobLocations={jobLocations || []}
                    onMarkerClick={handleMarkerClick}
                    selectedJobId={selectedJobId}
                />
                </div>
            </div>
        </div>
    </div>
  )
}
