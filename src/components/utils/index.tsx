import { UserLocation } from "@/Types/common";
import toast from "react-hot-toast";
import crypto from "crypto";

export function handleCommaForQuery(string: string) {
  if (string) {
    return string.replace(/,/g, "|");
  }
  return "";
}

export const showToast = (
  message: string,
  isError?: boolean,
  options?: any
) => {
  // Dismiss any existing toast
  toast.dismiss();
  const updatedOptions = {
    position: "bottom-right", // Default position
    ...options, // Spread provided options (if any)
  };

  // Show the new toast based on the type
  if (!isError) {
    toast.success(message, updatedOptions);
  } else {
    toast.error(message, updatedOptions);
  }
};

export const formatArticleDate = (inputDate: string): string => {
  // Validate input format
  if (!/^(\d{2}|\d{4})-\d{2}-\d{2}$/.test(inputDate)) {
    throw new Error('Invalid date format. Expected YY-MM-DD or YYYY-MM-DD');
  }

  const parts = inputDate.split('-');
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Expected YY-MM-DD or YYYY-MM-DD');
  }

  // Parse components with type safety
  const yearPart = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Validate date components
  if (isNaN(yearPart) || isNaN(month) || isNaN(day)) {
    throw new Error('Invalid date components');
  }

  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12');
  }

  if (day < 1 || day > 31) {
    throw new Error('Day must be between 1 and 31');
  }

  // Handle year (support both 2-digit and 4-digit years)
  const fullYear = yearPart < 100 ? 2000 + yearPart : yearPart;

  // Month names
  const monthNames: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Get ordinal suffix for day
  const getOrdinalSuffix = (d: number): string => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${monthNames[month - 1]} ${day}${getOrdinalSuffix(day)} ${fullYear}`;
};
export const formatArticleDate2 = (inputDate: string): string => {
  // Validate input format
  if (!/^(\d{2}|\d{4})-\d{2}-\d{2}$/.test(inputDate)) {
    throw new Error('Invalid date format. Expected YY-MM-DD or YYYY-MM-DD');
  }

  const parts = inputDate.split('-');
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Expected YY-MM-DD or YYYY-MM-DD');
  }

  // Parse components with type safety
  const yearPart = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Validate date components
  if (isNaN(yearPart) || isNaN(month) || isNaN(day)) {
    throw new Error('Invalid date components');
  }

  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12');
  }

  if (day < 1 || day > 31) {
    throw new Error('Day must be between 1 and 31');
  }

  // Handle year (support both 2-digit and 4-digit years)
  const fullYear = yearPart < 100 ? 2000 + yearPart : yearPart;

  // Month names
  const monthNames: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Get ordinal suffix for day
  const getOrdinalSuffix = (d: number): string => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day} ${monthNames[month - 1]} ${fullYear}`;
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

  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "k"; // Format as thousands
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
export const fetchUserLocation = async (): Promise<UserLocation> => {
  // First check if permission was previously denied
  const permissionStatus = await navigator.permissions?.query({ name: 'geolocation' });
  
  if (permissionStatus?.state === 'denied') {
    throw new Error('Location permission was previously denied. Please enable it in browser settings.');
  }

  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by your browser.");
  }

  return new Promise<UserLocation>((resolve, reject) => {
    const handlePosition = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        
        if (!response.ok) throw new Error('Geocoding API error');
        
        const data = await response.json();
        const city = getCityFromGeocode(data);
        
        resolve({
          city,
          user_city: city,
          city_latitude: latitude,
          city_longitude: longitude,
        });
      } catch (error) {
        reject(new Error("Failed to fetch city name."));
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          reject(new Error("Location permission denied. Please enable it to continue."));
          break;
        case error.POSITION_UNAVAILABLE:
          reject(new Error("Location information unavailable."));
          break;
        case error.TIMEOUT:
          reject(new Error("Location request timed out."));
          break;
        default:
          reject(new Error("Unable to retrieve your location."));
      }
    };

    navigator.geolocation.getCurrentPosition(handlePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 0 // Force fresh location
    });
  });
};

// Helper function to extract city from geocode response
const getCityFromGeocode = (data: any): string => {
  const address = data.address || {};
  return (
    address.city ||
    address.town ||
    address.village ||
    address.county ||
    address.state_district ||
    address.state ||
    address.country ||
    "Unknown"
  );
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
  // Define time intervals
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * hour;
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

export const ProfileTabs = [
  "About",
  "Education",
  "Experience",
  "Resume",
  // "About Me", // Added About Me
];

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

export const formatJobDates = (startDate: any, endDate: any) => {
  const formatDate = (date: any) => {
    if (!date || date === "0000-00-00") return "Present";

    const jsDate: any = new Date(date);
    if (isNaN(jsDate)) return null; // Invalid date check

    return jsDate.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  // If both are missing or invalid, return "-"
  if (!formattedStartDate && !formattedEndDate) return "-";

  return `${formattedStartDate || "-"} - ${formattedEndDate || "Present"}`;
};

export const customStyles = {
  control: (base: any) => ({
    ...base,
    minHeight: "50px", // Adjust the height as needed
    height: "50px", // Explicit height for consistent appearance
    boxShadow: "none", // Remove focus border shadow
    borderRadius: "10px", // Set border radius to 10px
    borderColor: "#ccc", // Optional: Set default border color
    "&:hover": {
      borderColor: "#ccc", // Prevent hover border color change
    },
    color: "#000", // Set text color to black
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#000", // Ensure selected value text is black
  }),
  valueContainer: (base: any) => ({
    ...base,
    height: "50px", // Match the control height for proper alignment
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    color: "#000", // Text inside the value container will be black
  }),
  input: (base: any) => ({
    ...base,
    margin: "0", // Remove extra margin for better alignment
    color: "#000", // Set input text color to black
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: "50px", // Match the control height for proper alignment
    color: "#000", // Set dropdown icon color to black
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#000", // Ensure dropdown icon is black
    "&:hover": {
      color: "#000", // Prevent hover color change
    },
  }),
};

export const yearOfPassingOptions = Array.from(
  { length: new Date().getFullYear() - 1970 + 1 },
  (_, i) => {
    const year = 1970 + i;
    return { label: year, value: year };
  }
);

export const formatDateExperience = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
  return `${year}-${month}-${day}`;
};

export const lightBoxStyle = {
  container: {
    background: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    maxWidth: "60%", // Restrict the width of the image
    borderRadius: "12px", // Rounded corners
    overflow: "hidden",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.5)", // Add a shadow
  },
  image: {
    objectFit: "contain", // Ensure the image fits well inside the container
  },
  captions: {
    maxWidth: "80%",
    textAlign: "center",
    color: "#ffffff", // White caption text
    marginTop: "10px",
    fontSize: "14px",
  },
  button: {
    color: "#ffffff", // White buttons
    background: "transparent", // Ensure a transparent background
    border: "none", // Remove any borders
    outline: "none", // Remove focus outline
    boxShadow: "none", // Remove shadow
    cursor: "pointer", // Keep the pointer cursor
    transition: "none", // Disable hover effects
  },
  buttonHover: {
    background: "none", // No change on hover
    color: "#ffffff", // Keep the color consistent
    transform: "none", // Prevent scaling or other transformations
  },
};

export function convertToNumber(value: any) {
  if (typeof value === "string") {
    value = value.toLowerCase().trim(); // Normalize input
    if (value.endsWith("k")) {
      return parseFloat(value) * 1000;
    } else if (value.endsWith("m")) {
      return parseFloat(value) * 1000000;
    } else if (value.endsWith("b")) {
      return parseFloat(value) * 1000000000;
    }
  }
  return parseFloat(value) || 0; // Handle numeric values or invalid input
}

export const encryptJobId = (
  data: string,
  secret: string,
  salt: string
): string => {
  const iv = Buffer.from(salt, "utf8"); // Ensure salt is hex and converts to a 16-byte buffer
  // Check if IV is of the correct length (16 bytes for AES-128)
  if (iv.length !== 16) {
    throw new Error("Initialization vector must be 16 bytes long");
  }
  const key = Buffer.from(secret, "utf8"); // Secret key should be 16 bytes for AES-128
  if (key.length !== 16) {
    throw new Error("Secret key must be 16 bytes long");
  }
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "binary");
  encrypted += cipher.final("binary");
  // Convert the encrypted data to base64
  const encryptedBase64 = Buffer.from(encrypted, "binary").toString("base64");
  return encryptedBase64;
};

export const formatNotificationDate = (dateString: string): string => {
  const now = new Date();
  const notificationDate = new Date(dateString);
  const timeDiffInHours =
    (now.getTime() - notificationDate.getTime()) / (1000 * 60 * 60);
  const timeDiffInDays = timeDiffInHours / 24;

  // Within the same day
  if (timeDiffInHours < 24 && now.getDate() === notificationDate.getDate()) {
    return notificationDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Yesterday
  if (timeDiffInDays < 2 && now.getDate() - notificationDate.getDate() === 1) {
    return (
      "Yesterday " +
      notificationDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  // Within the same week
  if (timeDiffInDays < 7) {
    return notificationDate.toLocaleDateString([], {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Within the same year
  if (now.getFullYear() === notificationDate.getFullYear()) {
    return notificationDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }

  // Older than a year
  return notificationDate.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
