"use client";

import CompanyCard from "@/components/Cards/CompanyCard";
import { industryCard } from "@/components/Cards/IndustryCard";
import Pagination from "@/components/Pagination";
import { useAppSelector } from "@/redux/hooks";
import api from "@/Services/Apiservice";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";

import { RxTriangleDown } from "react-icons/rx";

export default function Companies() {
  const router = useRouter();
  const {isLoggedIn} = useAppSelector((state) => state.user);
  const currentLocation = useAppSelector((state) => state.user.current_location)
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "1"; // Default to '1' (Relevance)
  const search = searchParams.get("search") || ""; 
  const [searchKey, setSearchKey] = useState(search || "");
  const industry = searchParams.get("industry") || "0"; 
  // const page = searchParams.get("page") || "1"; 
  const tab = searchParams.get("tab") || "Trending"; 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCompnaies, setTotalCompnaies] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTab, setSelectedTab] = useState("Trending");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [industiesList, setIndustiesList] = useState<{id:string, name:string}[]>([]);
  const [companiesList, setCompaniesList] = useState<industryCard[] | null>(null);

  useEffect(() => {
    fetchIndustries();
    fetchJobDetails();
    setSearchKey(search);
  }, [searchParams.toString(), selectedTab, selectedIndustry, isLoggedIn]);



  async function fetchJobDetails() {
    try {
      type SearchPayload = {
        latitude: number;
        longitude: number;
        radius_id: number;
        radius_value: string;
        page: string;
        pageLength: number;
        filter_flag: string; // or whatever type 'sort' is
        search: string; // or whatever type 'search' is
        industry_id?: string; // or whatever type 'industry' is
      };
      let payload:SearchPayload = {
        latitude:currentLocation?.city_latitude || 0,
        longitude:currentLocation?.city_longitude || 0,
        radius_id:0,
        radius_value:"",
        page:currentPage.toString(),
        pageLength:10,
        filter_flag: sort,
        search:search,
      };
      if(selectedTab==="Industry"){
        payload.industry_id = industry;
      }

      const formData = new FormData();
      // ✅ Automatically append all fields from the object
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value as string); // Convert all values to strings
        });
        let endpoint = "";
        if (selectedTab === "Trending") {
          endpoint = "/Company/getTrendingCompanyJob";
        } else if (selectedTab === "Following") {
          endpoint = "/Company/getFollowingCompanyList";
        } else if (selectedTab === "Industry") {
          endpoint = "/Company/getIndustryWiseJob";
        }
      
        setIsLoading(true);
        setTotalPages(1);
        setTotalCompnaies(0);
      const response = await api.post(`${endpoint}?pageLength=10`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseData = response.data;
      if (responseData.code === 1) {
        if(responseData.result?.[0]?.id==null){
          toast.error("page not found", { position: "bottom-right" });
          router.push("/");
        }
        setCompaniesList(response?.data?.result?.map((comp: any, i: number) => ({
          icon: comp?.company_logo || "",
          title: comp?.company_name,
          companyId: `${comp?.company_master_id}`,
          jobUrl: `/`
        })));
        const totalCompany = response?.data?.total_company_job;
        const companyPerPage = 50;
        const totalPages = Math.ceil(totalCompany / companyPerPage);
        setTotalCompnaies(totalCompany || []);
        setTotalPages(totalPages);
        
      }else{
        notFound();
      }
    } catch (error: any) {
      if(error?.status==404){
        notFound();
      }
      console.log(error);
      setIsLoading(false);
      setCompaniesList([]);
    }
  };
  async function fetchIndustries() {
    try {

      let payload = {
        role_id:"",
        department_id:""
      };

      const formData = new FormData();
      // ✅ Automatically append all fields from the object
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value as string); // Convert all values to strings
        });
      const response = await api.post('/MasterData/getIndustry', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseData = response.data;
      if (responseData.code === 1) {
        if(responseData.result?.[0]?.id==null){
          toast.error("page not found", { position: "bottom-right" });
          router.push("/");
          return
        }
        setIndustiesList(responseData?.result)
      }else{
        notFound();
      }
    } catch (error: any) {
      if(error?.status==404){
        notFound();
      }
      console.log(error);
    }
    setIsLoading(false)
  };
  
  const handleSearch=(key?:any)=>{
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.set("search", searchKey); // Update the sort parameter in the URL
    console.log(key, params);
    router.replace(`?${params.toString()}`, { scroll: false }); // Update the URL without refreshing the page
  }
  const handleTab=(key?:any)=>{
    setCurrentPage(1);
    setCompaniesList(null)
    console.log(key)
    setSelectedTab(key);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.set("tab", key); // Update the sort parameter in the URL
    console.log(key, params);
    router.push(`/CompanyTrading?${params.toString()}`, { scroll: false }); // Update the URL without refreshing the page
  }
  const handleIndustry = (id: string)=>{
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Reset page to 1 when sort changes
    params.set("industry", id); // Update the sort parameter in the URL
    router.push(`?${params.toString()}`, { scroll: false }); // Update the URL without refreshing the page
  }
  
  // Handle pagination button click
  const handleActive = (page: number) => {
    setCurrentPage(page);

    // Create a new URLSearchParams object from the current search parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update the 'page' parameter
    // params.set("page", page.toString());

    // Push the updated query parameters to the URL
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Get appropriate empty state message based on selected tab
  const getEmptyStateMessage = () => {
    switch (selectedTab) {
      case "Trending":
        return {
          title: "No company found",
          description: "There are no companies to display",
          image: '/new-assets/images/no-company.svg'
        };
      case "Following":
        return {
          title: "No company found",
          description: "You haven't followed any company yet. Start following to stay updated!",
          image: '/new-assets/images/no-company.svg'
        };
      case "Industry":
        return {
          title: "No company found",
          description: "There are no companies to display",
          image: '/new-assets/images/no-company.svg'
        };
      default:
        return {
          title: "No company found",
          description: "There are no companies to display",
          image: '/new-assets/images/no-company.svg'
        };
    }
  };
  
  // Handle sort option selection
  const handleSortChange = (newSort: string) => {
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort); // Update the sort parameter in the URL
    params.delete("page"); // Reset page to 1 when sort changes
    router.replace(`?${params.toString()}`, { scroll: false }); // Update the URL without refreshing the page
  };
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); 

  // Handle sort option selection
  const handleOptionClick = (newSort: string) => {
    handleSortChange(newSort); // Update the sort value
    setIsOpen(false); // Close the dropdown
  };
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
  
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);
  

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="bg-[#f9f9f9] mt-6 container">
          <div className=" mx-auto  border-b border-[#D4D4D4]">
            <div className="flex  gap-16 justify-start text-start items-start">
              <Link
                className={`px-0 py-3 inline-flex items-center text-sm font-meduim ${
                  selectedTab === "Trending"
                    ? "border-b-4 border-red text-red-500 font-bold  -mb-[1px]"
                    : "text-black hover:text-red-500"
                }`}
                href="/companies?tab=Trending"
                onClick={() => handleTab("Trending")}
              >
                Trending
              </Link>
              <Link
                className={`px-0 py-3 inline-flex items-center text-sm  ${
                  selectedTab === "Following"
                    ? "border-b-4 border-red text-red-500 font-bold -mb-[1px]"
                    : "text-black hover:text-red-500"
                }`}
                href="/companies?tab=Following"
                onClick={() => handleTab("Following")}
              >
                Following
              </Link>
              <Link
                className={`px-0 py-3 inline-flex items-center text-sm   ${
                  selectedTab == "Industry"
                    ? "border-b-4 border-red text-red-500 font-bold -mb-[0px]"
                    : "text-black hover:text-red-500"
                }`}
                href="/companies?tab=Industry"
                onClick={() => handleTab("Industry")}
              >
                Industry
              </Link>
            </div>
          </div>
        </div>

        {/* Search Section */}
        {selectedTab == "Industry" && (
          <div className="mb-6 3xl:mb-10">
            <div className="container flex overscroll-auto w-full mt-3 3xl:mt-4  ml-40 gap-2">
              <div className="flex overflow-auto w-full gap-2">
                {[{id:"0", name:"All"}, ...industiesList]?.map((ind) => (
                  <span
                    key={ind?.id}
                    className={`px-4 py-2 3xl:px-6 3xl:py-3 text-xs 3xl:text-sm rounded-lg whitespace-nowrap  border-gray-0 cursor-pointer ${
                      industry == ind.id ? "bg-black text-white" : "bg-[#F1F1F1]"
                    }`}
                    onClick={() => handleIndustry(ind?.id)}
                  >
                    {ind?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={`w-full bg-[#f9f9f9] pb-6 ${selectedTab==="Industry"?"":"mt-5 3xl:mt-6"}`}>
          <div className="container mx-auto px-4">
            <form onSubmit={(e:any)=> {e.preventDefault(); handleSearch()}} className="flex shadow-sm">
              {/* Remove parent rounded, shape corners individually on input & button */}
              <input
                value={searchKey}
                onChange={(e:any)=> setSearchKey(e.target.value)}
                placeholder="Company Name"
                className="w-full h-[58px] border-0 px-6 text-base focus:outline-none flex-1 rounded-l-lg"
              />
              <button type="submit" onClick={handleSearch} className="h-[58px] bg-red-500 hover:bg-red-600 text-white px-6 flex items-center justify-center gap-3 min-w-[180px] shadow-md rounded-r-lg rounded-l-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <span className="text-lg font-medium">Search Jobs</span>
              </button>
            </form>
          </div>
        </div>

        {companiesList === null ?
        <div className="flex justify-center items-center h-[200px]">
          <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
        </div>
        :
        <div className="container bg-[#f9f9f9] mx-auto w-full px-4 pb-12">
          {
            companiesList.length>0?
            <>
              <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">{selectedTab === "Trending"?"Trending Companies":selectedTab === "Following"?"Following Compnaies":"Industries"}</h2>
                <p className="text-sm text-gray-500">{selectedTab === "Following"?`You follow ${totalCompnaies} companies`:`${totalCompnaies} Companies found!`}</p>
              </div>
              {selectedTab!="Following" && 
              <div className="relative h-fit sort-by-container mt-1 3xl:mt-0" ref={dropdownRef}>
                {/* Dropdown Button */}
                <button
                  type="button"
                  className="text-[#4D4D4F] px-3 !py-2 flex items-center !border-black btn-border"
                  id="menu-button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  {sort === "1" ? "Recently posted" : sort === "2" ? "Most Jobs" : sort === "3" ? "Nearest" : "Farthest"}
                  <IoMdArrowDropdown className={`flex-shrink-0 ml-1 xl:ml-2 3xl:ml-5 text-[#000000] size-3 3xl:size-4 ${isOpen?"rotate-180":""}`} />
                </button>
      
                {/* Dropdown Menu */}
                {isOpen && (
                  <div
                    className="sort-by-items-container absolute right-0 z-10 origin-top-right top-full focus:outline-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <div className="sort-items-wrapper rounded-md bg-white ring-1 shadow-lg ring-black/5 mt-1">
                      <div className="py-0 sort-items divide-y" role="none">
                        <div
                          onClick={() => handleOptionClick("1")}
                          className="sort-item block px-4 py-2 lg:px-[10px] lg:py-[7px] 3xl:px-4 3xl:py-2 text-xs lg:text-[10px] 3xl:text-sm whitespace-nowrap text-[#6b6b6b] hover:text-gray-900 outline-hidden cursor-pointer"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-2"
                        >
                          Recently posted
                        </div>
                        <div
                          onClick={() => handleOptionClick("2")}
                          className="sort-item block px-4 py-2 lg:px-[10px] lg:py-[7px] 3xl:px-4 3xl:py-2 text-xs lg:text-[10px] 3xl:text-sm whitespace-nowrap text-[#6b6b6b] hover:text-gray-900 outline-hidden cursor-pointer"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-2"
                        >
                            Most Jobs
                        </div>
                        <div
                          onClick={() => handleOptionClick("3")}
                          className="sort-item block px-4 py-2 lg:px-[10px] lg:py-[7px] 3xl:px-4 3xl:py-2 text-xs lg:text-[10px] 3xl:text-sm whitespace-nowrap text-[#6b6b6b] hover:text-gray-900 outline-hidden cursor-pointer"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-2"
                        >
                          Nearest
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>}
          </div>

          {/* Company Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {companiesList?.map((company, index) => (
              <CompanyCard key={index} icon={company.icon} title={company.title} jobUrl={company?.jobUrl} companyId={company?.companyId} />
            ))}
          </div>
          </>
          :
          <div className="container pt-10 xl:pt-20 3xl:pt-32 bg-[#f9f9f9] mx-auto w-full px-4 pb-12">
            <Image className="w-[280px] h-[190px] mx-auto 3xl:w-[323px] 3xl:h-[262px]" width={650} height={520} src={getEmptyStateMessage().image} alt="no-company-found"/>
            <h3 className="text-xl 3xl:text-2xl font-medium text-center">{getEmptyStateMessage().title}</h3>
            <p className="text-sm 3xl:text-base font-normal text-center">{getEmptyStateMessage().description}</p>
          </div>
          }
          

          {/* Pagination */}
          <div className="mt-10 md:mt-14 2xl:mt-16">
            <Pagination
              currentPage={currentPage}
              handleActive={handleActive}
              totalPages={totalPages}
            />
          </div>
        </div>
        }
    </div>
  );
}

