import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/Services/Apiservice";
import { IoMdArrowDropdown } from "react-icons/io";
import styles from "../SignIn/signIn.module.css"

interface AddExperienceFormProps {
  formik: any; // formik object
}

const AddExperienceForm = forwardRef(
  ({ formik }: AddExperienceFormProps, ref) => {
    const [type, setType] = useState(1);
    const [isCurrentCompany, setIsCurrentCompany] = useState(false);
    const [designationSuggestions, setDesignationSuggestions] = useState<any[]>(
      []
    );
    const [designationSuggestionsSearch, setDesignationSuggestionsSearch] =
      useState<any[]>();
    const [companySuggestions, setCompanySuggestions] = useState<any[]>([]);
    const [companySuggestionsSearch, setCompanySuggestionsSearch] = useState<
      any[]
    >([]);
    const [jobTypes, setJobTypes] = useState<any[]>([]);
    const [editDateFrom, setEditDateFrom] = useState(false);
    const [editDateTill, setEditDateTill] = useState(false);

    // Fetch job types from API
    useEffect(() => {
      const fetchJobTypes = async () => {
        try {
          const response = await api.get("/MasterData/getJobType");
          setJobTypes(response.data.result);
        } catch (error) {
          console.error("Error fetching job types:", error);
        }
      };

      fetchJobTypes();
    }, []);

    useEffect(() => {
      setIsCurrentCompany(formik.values.isCurrentCompany);
    }, [formik.values]);

    // Fetch designation suggestions
    const fetchDesignationSuggestions = async (query: string) => {
      if (query.length > 1) {
        console.log(query, "insider query");
        // Filter from existing suggestions if query length is greater than 1
        const filteredSuggestions: any = designationSuggestionsSearch?.filter(
          (item) => item?.name?.toLowerCase()?.includes(query.toLowerCase())
        );
        console.log(filteredSuggestions, "Verify Filter Suggestion");
        setDesignationSuggestions(filteredSuggestions);
      } else if (query === "") {
        // Call API when query is empty
        try {
          const response = await api.get("/MasterData/getDesignation", {
            params: { search: query },
          });
          console.log(response, " ");
          setDesignationSuggestionsSearch(response?.data?.result);
          setDesignationSuggestions(response.data.result);
        } catch (error) {
          console.error("Error fetching designations:", error);
        }
      }
    };

    // Fetch company suggestions
    const fetchCompanySuggestions = async (query: string) => {
      if (query.length > 1) {
        // Filter from existing suggestions if query length is greater than 1
        const filteredSuggestions = companySuggestionsSearch?.filter((item) =>
          item?.name?.toLowerCase().includes(query.toLowerCase())
        );
        setCompanySuggestions(filteredSuggestions);
      } else if (query === "") {
        try {
          const response = await api.get("/MasterData/getCompany", {
            params: { search: query },
          });
          setCompanySuggestionsSearch(response?.data?.result);
          setCompanySuggestions(response?.data?.result);
        } catch (error) {
          console.error("Error fetching companies:", error);
        }
      }
    };

    // Expose formik methods to parent via ref
    useImperativeHandle(ref, () => ({
      handleSubmit: () => formik.handleSubmit(),
      formik, // Expose the entire formik object if needed
    }));

    return (
      <div className="p-3 md:p-7 rounded-lg shadow-sm 3xl:shadow-default">
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-2">
            <input
              type="text"
              id="designation"
              name="designation"
              value={formik.values.designation}
              onChange={(e) => {
                formik.handleChange(e);
                fetchDesignationSuggestions(e.target.value);
              }}
              onFocus={() =>{
                fetchDesignationSuggestions(formik.values.designation);
                setCompanySuggestions([])
              }}
              placeholder="Enter your designation"
              className={`${styles.onboarding_dialog_input} w-full p-2 border`}
            />
            {designationSuggestions?.length > 0 && (
              <div className="absolute z-10 w-full max-h-[250px] min-h-[38px] sm:min-h-[50px] overflow-auto p-0 bg-white border rounded-xl shadow-lg mt-1">
                {designationSuggestions?.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-[12px] sm:text-[14px]"
                    onClick={() => {
                      formik.setFieldValue("designation", suggestion.name);
                      formik.setFieldValue(
                        "designation_master_id",
                        suggestion.id
                      );
                      setDesignationSuggestions([]);
                    }}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {formik.errors.designation && formik.touched.designation && (
            <p className="text-red text-[11px] sm:text-sm mb-1 mt-1">{formik.errors.designation}</p>
          )}

          <div className="relative mb-2">
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formik.values.companyName}
              onChange={(e) => {
                formik.handleChange(e);
                fetchCompanySuggestions(e.target.value);
              }}
              onFocus={() => {fetchCompanySuggestions(formik.values.companyName); setDesignationSuggestions([])}}
              placeholder="Enter your company name"
              className={`${styles.onboarding_dialog_input} w-full p-2 border`}
            />
            {companySuggestions?.length > 0 && (
              <div className="absolute z-10 w-full max-h-[250px] min-h-[38px] sm:min-h-[50px] overflow-auto p-0 bg-white border rounded-xl shadow-lg mt-1">
                {companySuggestions?.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-[12px] sm:text-[14px]"
                    onClick={() => {
                      formik.setFieldValue("companyName", suggestion?.name);
                      formik.setFieldValue("company_master_id", suggestion?.id);
                      setCompanySuggestions([]);
                    }}
                  >
                    {suggestion?.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {formik.errors.companyName && formik.touched.companyName && (
            <p className="text-red text-[11px] sm:text-sm  mb-1 mt-1">{formik.errors.companyName}</p>
          )}

          <input
            type="number"
            id="salary"
            name="salary"
            value={formik?.values.salary}
            onChange={formik.handleChange}
            placeholder="Monthly salary eg: 15000"
            className={`${styles.onboarding_dialog_input} mb-2 w-full p-2 border`}
          />
          {formik.errors.salary && formik.touched.salary && (
            <p className="text-red text-[11px] sm:text-sm  mb-1 mt-1">{formik?.errors.salary}</p>
          )}

          <div className="flex flex-wrap gap-4">
            {jobTypes.map((jobType) => (
              <div
                key={jobType.id}
                className={`col-span-1 label-option cursor-pointer md:grow  text-[12px] sm:text-[14px] ${
                  formik.values.type == parseInt(jobType.id)
                    ? "bg-red text-white"
                    : ""
                }`}
                onClick={() => {
                  setType(parseInt(jobType.id));
                  formik.setFieldValue("type", jobType.id);
                  formik.setFieldValue("type_name", jobType.name);
                }}
              >
                {jobType.name}
              </div>
            ))}
          </div>

          {formik.errors.type && formik.touched.type && (
            <p className="text-red text-[11px] sm:text-sm  mb-1 mt-1">{formik.errors.type}</p>
          )}

          <div className="flex items-center gap-2 my-4">
            <input
              type="checkbox"
              id="isCurrentCompany"
              name="isCurrentCompany"
              checked={formik.values.isCurrentCompany}
              onChange={(e) => {
                formik.setFieldValue("isCurrentCompany", e.target.checked);
                setIsCurrentCompany(e.target.checked);
              }}
              className={`!mb-0 inline-block !w-4 !h-4 cursor-pointer`}
            />
            <label htmlFor="isCurrentCompany" className="!mb-0 inline-block text-[12px] sm:text-[14px]">
              Currently working here
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div>
                <label className="custom-form-label  text-[12px] sm:text-[14px] mb-[8px] block">Working From</label>
                <input
                  type="date"
                  id="jobStartDate"
                  name="jobStartDate"
                  value={formik.values.jobStartDate}
                  onChange={formik.handleChange}
                  placeholder="Start Date"
                  className={`${styles.onboarding_dialog_input} w-full p-2 border !bg-white `}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              {formik.errors.jobStartDate && formik.touched.jobStartDate && (
                <p className="text-red text-[11px] sm:text-sm  mb-1 mt-1">
                  {formik.errors.jobStartDate}
                </p>
              )}
            </div>
            {!isCurrentCompany ? (
              <div className="flex-1">
                <label className={' text-[12px] sm:text-[14px] mb-[8px] block'}>Worked Till</label>
                <input
                  type="date"
                  id="jobEndDate"
                  name="jobEndDate"
                  value={formik.values.jobEndDate}
                  onChange={formik.handleChange}
                  placeholder="End Date"
                  className={`${styles.onboarding_dialog_input} w-full p-2 border !bg-white`}
                  max={new Date().toISOString().split("T")[0]}
                />
                {formik.errors.jobEndDate && formik.touched.jobEndDate && (
                  <p className="text-red text-[11px] sm:text-sm  mb-1 mt-1">
                    {formik.errors.jobEndDate}
                  </p>
                )}
              </div>
            )
            :
            <div className="flex-1"></div>
          }
          </div>
        </form>
      </div>
    );
  }
);

export default AddExperienceForm;
