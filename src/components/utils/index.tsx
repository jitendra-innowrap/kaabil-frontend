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
  