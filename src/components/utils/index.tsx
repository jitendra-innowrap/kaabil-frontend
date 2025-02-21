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
    is_industry_standard: string,
    salaryRangeUnit: string,
    minSalary: string,
    maxSalary: string,
  ): JSX.Element => {
    // Convert salary values to numbers
    const min = parseInt(minSalary, 10);
    const max = parseInt(maxSalary, 10);
    if(is_industry_standard === "1"){
      return <span className="">Industry Standard</span>
    }
    // Determine the unit (monthly or yearly)
    const unit = salaryRangeUnit === "1" ? "month" : "year";
  
    // Format the salary range
    const salaryRange = `₹ ${min}k - ${max}k / `;
  
    return (
      <>
        {salaryRange}
        <small className="text-[#B1B4B7]">{unit}</small>
      </>
    );
  };

export const showExperience = (
  freshersCanApply: string,
  minExp: string,
  maxExp: string,
  text?: string
): string => {
  if (freshersCanApply === "1") {
    return "Freshers";
  } else {
    // Convert experience values to numbers
    const min = parseInt(minExp, 10);
    const max = parseInt(maxExp, 10);

    // Format the experience range
    return `${min} - ${max} ${text?text:"yrs experience"}`;
  }
};

export function formatDate(date:any){
  if(date){
    return `${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))}`
  }
  return ""
}