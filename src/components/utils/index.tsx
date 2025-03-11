import { UserLocation } from "@/Types/common";

export function handleCommaForQuery(string: string){
    if(string){
      return string.replace(/,/g, '|');
    }
    return ""
  }

  export const formatSalary = (salary: number) => {
    const numStr = salary.toString();
  
    // Check if the salary ends with exactly 5 zeros (e.g., 100000, 200000)
    if (/^\d+00000$/.test(numStr)) {
      return `${(salary / 100000).toFixed(0)}L`; // For lakhs
    }
  
    // Check if the salary ends with exactly 3 zeros (e.g., 1000, 2000)
    if (/^\d+000$/.test(numStr)) {
      return `${(salary / 1000).toFixed(0)}k`; // For thousands
    }
  
    // Return the original salary if no trailing zeros
    return salary;
  };
  
  export const showSalary = (
    isIndustryStandard: string,
    salaryRangeUnit: string,
    minSalary: string | null,
    maxSalary: string | null,
    text?: string
  ): string => {
    // Check if salary is as per industry standards
    if (isIndustryStandard === "1") {
      return "As per Industry standards";
    }
  
    // Check if both min and max salary are null or empty
    if (((minSalary === null || minSalary === "" || minSalary === "0")) && ((maxSalary === null || maxSalary === "" || maxSalary === "0"))) {
      return "-";
    }
  
    // Determine the salary unit
    const unit = salaryRangeUnit === "1" ? "Monthly" : "Yearly";
  
    // Check if min salary is null or empty or "0" and max salary is not null or empty or "0"
    if ((minSalary === null || minSalary === "" || minSalary === "0") && (maxSalary !== null && maxSalary !== "" && maxSalary !== "0")) {
      return `₹${maxSalary} Max / ${unit}`;
    }
  
    // Check if max salary is null or empty or "0" and min salary is not null or empty or "0"
    if ((maxSalary === null || maxSalary === "" || maxSalary === "0") && (minSalary !== null && minSalary !== "" && minSalary !== "0")) {
      return `₹${minSalary} Max / ${unit}`;
    }
  
    // Default case: show salary range
    return `₹${minSalary} - ₹${maxSalary} Max / ${unit}`;
  };
  

  export const showExperience = (
    minExp: string | null,
    maxExp: string | null,
    text?: string
  ): string => {
    // Check if both min and max experience are null or empty
    if (!minExp && !maxExp) {
      return "-";
    }
  
    // Check if either min or max experience suggests freshers can apply
    if (
      (minExp === null || minExp === "" || minExp === "0") &&
      (maxExp === null || maxExp === "" || maxExp === "0" || maxExp === "1")
    ) {
      return "Freshers can apply";
    }
  
    // Check if min experience is not "1" and max experience is null or empty or "0"
    if (
      (minExp !== null && minExp !== "1") &&
      (maxExp === null || maxExp === "" || maxExp === "0")
    ) {
      return `Min ${minExp} years`;
    }
  
    // Check if min experience is null or "0" and max experience is not null or empty or "0"
    if (
      (minExp === null || minExp === "" || minExp === "0") &&
      (maxExp !== null && maxExp !== "" && maxExp !== "0")
    ) {
      return `Max ${maxExp} years`;
    }
  
    // Default case: show experience range
    return `${minExp}-${maxExp} ${text ? text : "yrs experience"}`;
  };
  
  

export function formatDate(date:any){
  if(date){
    return `${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))}`
  }
  return ""
}

// Utility function to fetch user location and city name
export const fetchUserLocation = () => {
  return new Promise<UserLocation>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    // Ask for location permission
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Use a reverse geocoding API to get the city name
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const city = data.address.city || data.address.town || data.address.village ||data.address.county || data.address.state_district ||data.address.state || data.address.country || 'Unknown';

          // Resolve with the user location object
          resolve({
            city,
            user_city: city,
            city_latitude: latitude,
            city_longitude: longitude,
          });
        } catch (error) {
          reject(new Error('Failed to fetch city name.'));
        }
      },
      (error) => {
        reject(new Error('Unable to retrieve your location.'));
      }
    );
  });
};