import { UserLocation } from "@/Types/common";
import toast from 'react-hot-toast';

export function handleCommaForQuery(string: string) {
  if (string) {
    return string.replace(/,/g, "|");
  }
  return "";
}


export const showToast = (message: string, isError?: boolean, options?: any) => {
  // Dismiss any existing toast
  toast.dismiss();
  const updatedOptions = {
    position: 'bottom-right', // Default position
    ...options, // Spread provided options (if any)
  };

  // Show the new toast based on the type
  if (!isError) {
    toast.success(message, updatedOptions);
  } else {
    toast.error(message, updatedOptions);
  }
};


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

export function formatToK(number: number | string): string {
  // Convert string input to number
  const num = typeof number === "string" ? parseFloat(number) : number;

  // Check if the parsed number is valid
  if (isNaN(num)) {
    throw new Error("Invalid number input");
  }

  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "k"; // Format as thousands
  } else if (num >= 1000000 && num < 1000000000) {
    return (num / 1000000).toFixed(1).replace(".0", "") + "M"; // Format as millions
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(".0", "") + "B"; // Format as billions
  } else {
    return num.toString(); // Return the number as is for values less than 1000
  }
}
export const showSalary = (
  isIndustryStandard: string,
  salaryRangeUnit: string,
  minSalary: string | null,
  maxSalary: string | null,
  text?: string
): string => {
  // Check if salary is as per industry standards
  if (isIndustryStandard == "1") {
    return "As per Industry standards";
  }

  // Check if both min and max salary are null or empty
  if (
    (minSalary === null || minSalary === "" || minSalary === "0") &&
    (maxSalary === null || maxSalary === "" || maxSalary === "0")
  ) {
    return "As per Industry standards";
  }

  // Determine the salary unit
  const unit = salaryRangeUnit == "1" ? "Monthly" : "Yearly";

  // Check if min salary is null or empty or "0" and max salary is not null or empty or "0"
  if (
    (minSalary === null || minSalary === "" || minSalary === "0") &&
    maxSalary !== null &&
    maxSalary !== "" &&
    maxSalary !== "0"
  ) {
    return `${formatToK(maxSalary)} / `;
  }

  // Check if max salary is null or empty or "0" and min salary is not null or empty or "0"
  if (
    (maxSalary === null || maxSalary === "" || maxSalary === "0") &&
    minSalary !== null &&
    minSalary !== "" &&
    minSalary !== "0"
  ) {
    return `${formatToK(minSalary)} / `;
  }
  if (minSalary !== null && maxSalary !== null) {
    // Default case: show salary range
    return `${formatToK(minSalary)} - ${formatToK(maxSalary)} / `;
  }

  return "As per Industry standards";
};
export const showSalaryJobDetails = (
  isIndustryStandard: string,
  salaryRangeUnit: string,
  minSalary: string | null,
  maxSalary: string | null,
  text?: string
): string => {
  // Check if salary is as per industry standards
  if (isIndustryStandard == "1") {
    return "As per Industry standards";
  }

  // Check if both min and max salary are null or empty
  if (
    (minSalary === null || minSalary === "" || minSalary === "0") &&
    (maxSalary === null || maxSalary === "" || maxSalary === "0")
  ) {
    return "As per Industry standards";
  }

  // Determine the salary unit
  const unit = salaryRangeUnit == "1" ? "Monthly" : "Yearly";

  // Check if min salary is null or empty or "0" and max salary is not null or empty or "0"
  if (
    (minSalary === null || minSalary === "" || minSalary === "0") &&
    maxSalary !== null &&
    maxSalary !== "" &&
    maxSalary !== "0"
  ) {
    return `₹${maxSalary} / `;
  }

  // Check if max salary is null or empty or "0" and min salary is not null or empty or "0"
  if (
    (maxSalary === null || maxSalary === "" || maxSalary === "0") &&
    minSalary !== null &&
    minSalary !== "" &&
    minSalary !== "0"
  ) {
    return `₹${minSalary} / `;
  }
  if (minSalary !== null && maxSalary !== null) {
    // Default case: show salary range
    return `₹${minSalary} - ₹${maxSalary} / `;
  }

  return "As per Industry standards";
};
export const showSalarySimilarJob = (
  isIndustryStandard: string,
  salaryRangeUnit: string,
  minSalary: string | null,
  maxSalary: string | null,
  text?: string
): string => {
  // Check if salary is as per industry standards
  if (isIndustryStandard == "1") {
    return "As per Industry standards";
  }

  // Check if both min and max salary are null or empty
  if (
    (minSalary === null || minSalary === "" || minSalary === "0") &&
    (maxSalary === null || maxSalary === "" || maxSalary === "0")
  ) {
    return "As per Industry standards";
  }

  // Determine the salary unit
  const unit = salaryRangeUnit == "1" ? "Monthly" : "Yearly";

  // Check if min salary is null or empty or "0" and max salary is not null or empty or "0"
  if (
    (minSalary === null || minSalary === "" || minSalary === "0") &&
    maxSalary !== null &&
    maxSalary !== "" &&
    maxSalary !== "0"
  ) {
    return `${maxSalary} / `;
  }

  // Check if max salary is null or empty or "0" and min salary is not null or empty or "0"
  if (
    (maxSalary === null || maxSalary === "" || maxSalary === "0") &&
    minSalary !== null &&
    minSalary !== "" &&
    minSalary !== "0"
  ) {
    return `${minSalary} / `;
  }
  if (minSalary !== null && maxSalary !== null) {
    // Default case: show salary range
    return `${minSalary} - ${maxSalary} / `;
  }

  return "As per Industry standards";
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
    minExp !== null &&
    minExp !== "1" &&
    (maxExp === null || maxExp === "" || maxExp === "0")
  ) {
    return `Min ${minExp} ${text}`;
  }

  // Check if min experience is null or "0" and max experience is not null or empty or "0"
  if (
    (minExp === null || minExp === "" || minExp === "0") &&
    maxExp !== null &&
    maxExp !== "" &&
    maxExp !== "0"
  ) {
    return `Max ${maxExp} ${text}`;
  }

  // Default case: show experience range
  return `${minExp}-${maxExp} ${text ? text : `${text}`}`;
};

export function formatDate(date: any) {
  if (date) {
    return `${new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date))}`;
  }
  return "";
}

// Utility function to fetch user location and city name
export const fetchUserLocation = () => {
  return new Promise<UserLocation>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
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

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            data.address.state_district ||
            data.address.state ||
            data.address.country ||
            "Unknown";

          // Resolve with the user location object
          resolve({
            city,
            user_city: city,
            city_latitude: latitude,
            city_longitude: longitude,
          });
        } catch (error) {
          reject(new Error("Failed to fetch city name."));
        }
      },
      (error) => {
        reject(new Error("Unable to retrieve your location."));
      }
    );
  });
};

export function formatMonthYear(date: string | Date): string {
  let parsedDate: Date;

  if (typeof date === "string") {
    // Attempt to parse the date string
    parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      // If parsing fails, return an error message
      return "-";
    }
  } else if (date instanceof Date) {
    parsedDate = date;
  } else {
    return "-";
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  return `${month} ${year}`;
}

export function formatJobDuration(
  start: string | Date,
  end?: string | Date
): string {
  let startDate: Date;
  let endDate: Date | undefined;

  // Validate and parse start date
  if (typeof start === "string") {
    startDate = new Date(start);
    if (isNaN(startDate.getTime())) return "-";
  } else if (start instanceof Date) {
    startDate = start;
  } else {
    return "-";
  }

  // Validate and parse end date if provided
  if (end) {
    if (typeof end === "string") {
      endDate = new Date(end);
      if (isNaN(endDate.getTime())) {
        // If end date is invalid, use current date
        endDate = new Date();
      }
    } else if (end instanceof Date) {
      endDate = end;
    } else {
      // If end date is invalid, use current date
      endDate = new Date();
    }
  } else {
    // If end date is not provided, use current date
    endDate = new Date();
  }

  // Calculate duration in milliseconds
  const durationInMs = endDate.getTime() - startDate.getTime();

  // Handle invalid or future dates
  if (durationInMs < 0) return "-";

  // Convert to days (using average month/year lengths)
  const totalDays = durationInMs / (1000 * 60 * 60 * 24);
  const years = Math.floor(totalDays / 365.25);
  const months = Math.floor(totalDays / 30.44); // Average month length
  const weeks = Math.floor(totalDays / 7);
  const days = Math.floor(totalDays);

  // Determine best unit to display
  if (years > 0) {
    return `${years} yr${years !== 1 ? "s" : ""}`;
  }
  if (months > 0) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }
  if (weeks > 0) {
    return `${weeks} week${weeks !== 1 ? "s" : ""}`;
  }
  return `${days} day${days !== 1 ? "s" : ""}`;
}

export function timeAgo(dateString: string): string {
  // Parse the input date as UTC
  const past = new Date(dateString);
  if (isNaN(past.getTime())) return "Invalid date";

  // Get the current time in local timezone
  const now = new Date();

  // Adjust past time to local time zone
  const pastLocal = new Date(
    past.getUTCFullYear(),
    past.getUTCMonth(),
    past.getUTCDate(),
    past.getUTCHours(),
    past.getUTCMinutes(),
    past.getUTCSeconds()
  );

  // Get the time difference in milliseconds
  const diff = now.getTime() - pastLocal.getTime();

  console.log("Past Local Time:", pastLocal.toString());
  console.log("Now Local Time:", now.toString());
  console.log("Time Difference (ms):", diff);
  console.log("Time Difference (hours):", diff / (1000 * 60 * 60));

  // Define time intervals
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  // Determine the time ago string
  if (diff < minute) return "just now";
  if (diff < hour) return `${Math.floor(diff / minute)} min ago`;
  if (diff < day) return `${Math.floor(diff / hour)} hours ago`;
  if (diff < 2 * day) return "yesterday";
  if (diff < month) return `${Math.floor(diff / day)} days ago`;
  if (diff < year) return `${Math.floor(diff / month)} months ago`;

  return `${Math.floor(diff / year)} years ago`;
}

export const getCompanyInitials = (name?: string): string => {
  if (!name) return "?";

  const words = name.trim().split(" ");
  if (words.length > 1) {
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  }
  return words[0][0].toUpperCase();
};

export const ProfileTabs = ["About", "Education", "Experience", "Resume"];


// Experience Constant
export const experiences = [
  {
    title: "Lead UI/UX Designer",
    company: "HT Media Labs",
    type: "Fulltime",
    duration: "Jan 2022 - Present",
    icon: "/new-assets/icons/experience.svg",
  },
  {
    title: "Senior Product Designer",
    company: "XYZ Corp",
    type: "Fulltime",
    duration: "May 2019 - Dec 2021",
    icon: "/new-assets/icons/experience.svg",
  },
  {
    title: "UI Designer",
    company: "ABC Tech",
    type: "Contract",
    duration: "Feb 2017 - Apr 2019",
    icon: "/new-assets/icons/experience.svg",
  },
  {
    title: "Graphic Designer",
    company: "Design Studio",
    type: "Part-time",
    duration: "Jan 2015 - Jan 2017",
    icon: "/new-assets/icons/experience.svg",
  },
];