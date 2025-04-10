import { useAppSelector } from "@/redux/hooks";
import {
  fetchProfile,
  setAddMoreExperience,
  setExperienceModal,
} from "@/redux/profileSlice";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "@/Services/Apiservice";
import * as Yup from "yup";
import {
  convertToNumber,
  formatDateExperience,
  formatJobDuration,
  formatMonthYear,
} from "../utils";
import toast from "react-hot-toast";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";

const AddMoreExperienceModal = ({ size }: any) => {
  const { addMoreExperience, profileData } = useAppSelector(
    (state) => state.profile
  );
  const { token } = useAppSelector((state) => state.auth);
  const [updateForm, setUpdateForm] = useState(false);
  const [addMore, setAddMore] = useState(false);
  const [experienceList, setExperienceList] = useState<any[]>([]);
  const [currentEditState, setCurrentEditState] = useState<any>(null);

  useEffect(() => {
    console.log(profileData, "Step 3");
    if (profileData?.user_experiences) {
      console.log(profileData?.user_experiences, "Verify Experience List");
      const transformedExperiences = profileData.user_experiences.map(
        (experience: any) => ({
          designation_name: experience.designation,
          designation_master_id: experience.designation_master_id,
          company_master_id: experience.company_master_id,
          company_name: experience.company_name,
          in_hand_salary: experience.in_hand_salary,
          job_type_id: parseInt(experience.job_type_id), // Ensuring it's a number
          is_current_company: experience.is_current_company,
          job_start_date: experience.job_start_date,
          job_type: experience?.job_type,
          job_end_date:
            experience.is_current_company === "1"
              ? ""
              : experience.job_end_date, // Clearing end date for current company
          additional_info: experience.additional_info || "", // Providing fallback for empty values
          company_logo: experience.company_logo || "", // Providing fallback for empty values
        })
      );

      setExperienceList(transformedExperiences);
    }
  }, [profileData]);

  const dispatch = useDispatch();
  const [designationSuggestionsSearch, setDesignationSuggestionsSearch] =
    useState<any[]>();
  const [designationSuggestions, setDesignationSuggestions] = useState<any[]>(
    []
  );
  const [companySuggestionsSearch, setCompanySuggestionsSearch] = useState<
    any[]
  >([]);
  const [companySuggestions, setCompanySuggestions] = useState<any[]>([]);
  const [jobTypes, setJobTypes] = useState<any[]>([]);

  const getValidationSchema = (addMore: boolean) =>
    Yup.object().shape({
      designation_name: addMore
        ? Yup.string().required("Required")
        : Yup.string(),
      company_name: addMore ? Yup.string().required("Required") : Yup.string(),
      in_hand_salary: addMore
        ? Yup.number()
            .test(
              "max-digits",
              "Must not exceed 10 digits",
              (value) => !value || value.toString().length <= 10
            )
            .required("Required")
        : Yup.number(),
      job_type_id: addMore ? Yup.string().required("Required") : Yup.string(),
      job_start_date: addMore
        ? Yup.date()
            .max(new Date(), "Cannot be a future date")
            .required("Required")
        : Yup.date(),
      job_end_date: addMore
        ? Yup.string().test(
            "job-end-date",
            "Invalid end date",
            function (value) {
              const { is_current_company, job_start_date } = this.parent;
              if (!is_current_company && value) {
                const endDate = new Date(value);
                return (
                  endDate >= new Date(job_start_date) && endDate <= new Date()
                );
              }
              return true;
            }
          )
        : Yup.string(),
    });

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

  // Company
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

  // Job Types
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

  const closeModal = () => {
    dispatch(setAddMoreExperience(false));
    setAddMore(false);
    setCurrentEditState(null);
  };

  const handleAddMore = (values: any, errors: any, currentEditState: any) => {
    if (addMore) {
      const requiredFields = Object.keys(values).filter(
        (key) =>
          key !== "company_logo" &&
          key !== "additional_info" &&
          key !== "job_end_date"
      );
      const hasEmptyFields = requiredFields.some((key) => values[key] === "");
      if (Object.keys(errors).length === 0) {
        if (currentEditState && currentEditState.index !== undefined) {
          // if (hasEmptyFields) return;
          setExperienceList((prev) =>
            prev.map((item, idx) =>
              idx === currentEditState.index ? { ...values } : item
            )
          );
          setCurrentEditState(null);
          setAddMore(false);
        } else {
          if (hasEmptyFields) return;
          setExperienceList((prev) => [...prev, { ...values }]);
          setAddMore(false);
          setCurrentEditState(null);
        }
      } else {
        console.log("Validation errors:", errors);
      }
    } else {
      setAddMore(true);
    }
  };

  const handleEditClick = async (experience: any, index: any) => {
    await setCurrentEditState({ index, experience });
    await setAddMore(true);
  };

  // This useEffect is just for the state update and with this we will rerender
  useEffect(() => {
    setUpdateForm(!updateForm);
  }, [currentEditState, addMore]);

  return (
    // @ts-ignore
    <Dialog
      open={addMoreExperience}
      // handler={closeModal}
      size={size}
      className={`${
        size === "xxl"
          ? "top-14 mx-auto fixed bottom-0 rounded-2xl sm-dailog"
          : "fixed -top-10 -translate-x-1/2 custom-dialog"
      }`}
    >
      {/* @ts-ignore  */}
      <DialogHeader>
        <div className="relative w-full">
          <IoClose
            className="absolute top-0 right-0 cursor-pointer"
            size={size === "md" ? 36 : 28}
            onClick={closeModal}
          />
          <div
            className={`flex items-center mt-6 ${
              size === "xxl"
                ? "justify-start text-md"
                : "justify-center text-3xl"
            }`}
          >
            <h2 className="text-center text-[#231F20] font-semibold">
              Edit your <span className="text-red">experience</span>
            </h2>
          </div>
        </div>
      </DialogHeader>
      {/* @ts-ignore  */}
      <Formik
      // @ts-ignore
        key={updateForm}
        // @ts-ignore
        initialValues={{
          designation_name:
            currentEditState?.experience?.designation_name || "",
          designation_master_id:
            currentEditState?.experience?.designation_master_id || "",
          company_master_id:
            currentEditState?.experience?.company_master_id || "",
          company_name: currentEditState?.experience?.company_name || "",
          in_hand_salary: currentEditState?.experience?.in_hand_salary || "",
          job_type_id: currentEditState?.experience?.job_type_id || "",
          is_current_company:
            currentEditState?.experience?.is_current_company || "0",
          job_start_date: currentEditState?.experience?.job_start_date || "",
          job_end_date: currentEditState?.experience?.job_end_date || "",
          additional_info: currentEditState?.experience?.additional_info || "",
          company_logo: currentEditState?.experience?.company_logo || "",
          job_type: currentEditState?.experience?.job_type || "",
        }}
        validationSchema={getValidationSchema(addMore)}
        onSubmit={async (values) => {
          let updatedExperienceList = [];
          if (currentEditState) {
            updatedExperienceList = experienceList.map((item, index) =>
              index === currentEditState.index ? values : item
            );
          } else if (addMore) {
            updatedExperienceList = [values, ...experienceList];
          } else {
            updatedExperienceList = [...experienceList];
            console.log(updatedExperienceList, "Default Experience List");
          }
          const formData = new FormData();
          formData.append("is_fresher", "1");
          formData.append(
            "user_experiences",
            JSON.stringify(updatedExperienceList)
          );
          try {
            const response: any = await api.post(
              "/Auth/editJobSeekerPrpfile",
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );
            response.data.code === 1
              ? toast.success(response.data.msg, {
                  position: "bottom-right",
                })
              : toast.error(response.data.msg || "Failed To Update Profile", {
                  position: "bottom-right",
                });
          } catch (error: any) {
            toast.error(error?.message || "Something went wrong!", {
              position: "bottom-right",
            });
          } finally {
            dispatch(
              // @ts-ignore
              fetchProfile({
                token: token,
                data: { latitude: 0, longitude: 0 },
              })
            );
            closeModal();
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting, resetForm, errors }) => (
          <Form>
            {/* @ts-ignore */}
            <DialogBody
              className={`p-0 max-h-[60vh] sm:max-h-[68vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll ${
                size === "xxl" ? "mt-4" : "mt-8"
              }`}
            >
              <div
                className={`${
                  size === "xxl" ? "px-4" : "px-12"
                } space-y-2 pb-8`}
              >
                <label
                  className={`block font-semibold mb-1 !text-[#231F20] ${
                    size === "xxl" ? "!text-[16px]" : "!text-xl"
                  }`}
                  htmlFor="fileInput"
                >
                  Please add your latest experience
                </label>
                <>
                  {experienceList.length > 0 &&
                    experienceList.map((experience, index) => (
                      <div
                        key={index}
                        className="my-4 p-4 rounded-lg shadow-default justify-between flex gap-4"
                      >
                        <div
                          className={`${
                            size === "xxl" ? "text-xs" : "text-lg"
                          }`}
                        >
                          <h5
                            className={`font-medium text-black mb-2 ${
                              size === "xxl" ? "text-xs" : "text-lg"
                            }`}
                          >
                            {experience.designation_name || ""}
                          </h5>
                          <h6
                            className={` mb-2 ${
                              size === "xxl" ? "text-xs" : "text-lg"
                            }`}
                          >
                            {experience.company_name || ""}
                            <GoDotFill className="inline-block size-2 mx-2" />
                            {experience.job_type || ""}
                          </h6>
                          <h6
                            className={` mb-2 ${
                              size === "xxl" ? "text-xs" : "text-lg"
                            }`}
                          >
                            {formatMonthYear(
                              experience.job_start_date || "0000-00-00"
                            )}{" "}
                            -{" "}
                            {experience.is_current_company === "1"
                              ? "Present"
                              : formatMonthYear(
                                  experience.job_end_date || "0000-00-00"
                                )}
                            <GoDotFill className="inline-block size-2 mx-2" />
                            {formatJobDuration(
                              experience.job_start_date || "0000-00-00",
                              experience.job_end_date || "0000-00-00"
                            )}
                          </h6>
                        </div>
                        <div
                          className="flex items-center h-fit cursor-pointer"
                          onClick={() => handleEditClick(experience, index)}
                        >
                          <Image
                            src={"/new-assets/icons/pencil.png"}
                            alt="edit-pencil"
                            aria-label="edit icon"
                            className="w-4 h-4 mr-1"
                            width={90}
                            height={90}
                          />
                          <span
                            className={`text-red font-semibold ${
                              size === "xxl" ? "text-[12px]" : "text-[18px]"
                            }`}
                          >
                            Edit
                          </span>
                        </div>
                      </div>
                    ))}
                </>
                {/* Fields */}
                {addMore && (
                  <div className="p-4 md:p-7 rounded-lg shadow-default">
                    {/* Input File 1 */}
                    <div className="relative mb-2">
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={values.designation_name}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue("designation_name", value);
                          fetchDesignationSuggestions(value);
                        }}
                        onFocus={() => {
                          setCompanySuggestions([]);
                          fetchDesignationSuggestions(values.designation_name);
                        }}
                        placeholder="Enter your designation"
                        className={`w-full border bg-[#C8C9CB3B] rounded-lg ${
                          size === "xxl" ? "p-2" : "p-3"
                        }`}
                      />
                      {designationSuggestions?.length > 0 && (
                        <div className="absolute z-10 w-full max-h-[250px] min-h-[40px] overflow-auto p-0 bg-white border rounded-xl shadow-lg mt-1">
                          {designationSuggestions?.map((suggestion) => (
                            <div
                              key={suggestion.id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setFieldValue(
                                  "designation_name",
                                  suggestion.name
                                );
                                setFieldValue(
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
                      <div className="h-1">
                        <ErrorMessage
                          name="designation_name"
                          component="div"
                          className="text-red text-md mt-1"
                        />
                      </div>
                    </div>
                    {/* Input Field 2 */}
                    {/* @ts-ignore */}
                    <div className="relative mb-2 mt-6">
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={values.company_name}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue("company_name", value);
                          fetchCompanySuggestions(value);
                        }}
                        onFocus={() => {
                          setDesignationSuggestions([]);
                          fetchCompanySuggestions(values.company_name);
                        }}
                        placeholder="Enter your company name"
                        className={`w-full border bg-[#C8C9CB3B] rounded-lg ${
                          size === "xxl" ? "p-2" : "p-3"
                        }`}
                      />
                      {companySuggestions?.length > 0 && (
                        <div className="absolute z-10 w-full max-h-[250px] min-h-[40px] overflow-auto p-0 bg-white border rounded-xl shadow-lg mt-1">
                          {companySuggestions?.map((suggestion) => (
                            <div
                              key={suggestion.id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setFieldValue("company_name", suggestion?.name);
                                setFieldValue(
                                  "company_master_id",
                                  suggestion?.id
                                );
                                setCompanySuggestions([]);
                              }}
                            >
                              {suggestion?.name}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="h-1">
                        <ErrorMessage
                          name="company_name"
                          component="div"
                          className="text-red text-md mt-1"
                        />
                      </div>
                    </div>
                    {/* Input Field 3 */}
                    <div className="mt-6">
                      <input
                        type="number"
                        id="in_hand_salary"
                        name="in_hand_salary"
                        onChange={(e) =>
                          setFieldValue("in_hand_salary", e.target.value)
                        }
                        value={values.in_hand_salary}
                        placeholder="Monthly Salary"
                        className={`w-full border bg-[#C8C9CB3B] rounded-lg ${
                          size === "xxl" ? "p-2" : "p-3"
                        }`}
                      />
                      <div className="h-1">
                        <ErrorMessage
                          name="in_hand_salary"
                          component="div"
                          className="text-red text-md mt-1"
                        />
                      </div>
                    </div>

                    {/* Field 4 */}
                    <div className="flex flex-wrap gap-3 3xl:gap-4 mt-6">
                      {jobTypes.map((jobType) => (
                        <div
                          key={jobType.id}
                          className={`col-span-1 label-option cursor-pointer flex-grow ${
                            values.job_type_id == jobType.id
                              ? "bg-red text-white"
                              : ""
                          }`}
                          onClick={() => {
                            setFieldValue("job_type_id", parseInt(jobType.id));
                            setFieldValue("job_type", jobType.name);
                          }}
                        >
                          {jobType.name}
                        </div>
                      ))}
                    </div>

                    <div className="h-1">
                      <ErrorMessage
                        name="job_type_id"
                        component="div"
                        className="text-red text-md mt-1"
                      />
                    </div>

                    {/* Field 5 */}
                    <div className="flex items-center gap-2 my-6">
                      <input
                        type="checkbox"
                        id="is_current_company"
                        name="is_current_company"
                        checked={values.is_current_company === "1"} // Compare with "1" to determine checked state
                        onChange={(e) => {
                          const isChecked = e.target.checked ? "1" : "0"; // Set "1" for true and "0" for false
                          setFieldValue("is_current_company", isChecked);
                          if (isChecked == "0") {
                            setFieldValue("job_end_date", "");
                          }
                        }}
                        className={`!mb-0 inline-block cursor-pointer ${
                          size === "xxl" ? "!w-4 !h-4" : "!w-5 !h-5"
                        }`}
                      />
                      <label
                        htmlFor="is_current_company"
                        className={`!mb-0 inline-block ${
                          size === "xxl" ? "!text-[16px]" : "!text-xl"
                        }`}
                      >
                        Currently working here
                      </label>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <div>
                        <label
                          className={`${
                            size === "xxl" ? "!text-[16px]" : "!text-xl"
                          }`}
                        >
                          Working From
                        </label>
                        <input
                          type="date"
                          id="job_start_date"
                          name="job_start_date"
                          value={values.job_start_date}
                          onChange={(e) => {
                            console.log(e.target.value, "Check Value");
                            setFieldValue("job_start_date", e.target.value);
                          }}
                          placeholder="Start Date"
                          className="mb-2 w-full p-2 border rounded !bg-white shadow-md"
                          max={(() => {
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            return tomorrow.toISOString().split("T")[0];
                          })()}
                        />
                        <div className="h-1">
                          <ErrorMessage
                            name="job_start_date"
                            component="div"
                            className="text-red text-md"
                          />
                        </div>
                      </div>

                      {/* Field 7 */}
                      {values?.is_current_company === "0" && (
                        <div>
                          <label
                            className={`${
                              size === "xxl" ? "!text-[16px]" : "!text-xl"
                            }`}
                          >
                            Worked Till
                          </label>
                          <input
                            type="date"
                            id="job_end_date"
                            name="job_end_date"
                            value={values.job_end_date}
                            onChange={(e) => {
                              console.log(e.target.value, "Check Value");
                              setFieldValue("job_end_date", e.target.value);
                            }}
                            placeholder="Start Date"
                            className="mb-2 w-full p-2 border rounded !bg-white shadow-md"
                            min={values?.job_start_date || ""}
                            max={(() => {
                              const tomorrow = new Date();
                              tomorrow.setDate(tomorrow.getDate() + 1);
                              return tomorrow.toISOString().split("T")[0];
                            })()}
                            disabled={!values?.job_start_date}
                          />
                          <div className="h-1">
                            <ErrorMessage
                              name="job_end_date"
                              component="div"
                              className="text-red text-md"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div
                  className={`inline-flex text-red cursor-pointer ${
                    size === "xxl" ? "text-sm" : "text-lg"
                  } mt-4 font-semibold`}
                  onClick={() =>
                    handleAddMore(values, errors, currentEditState)
                  }
                >
                  + add more experience
                </div>
              </div>
            </DialogBody>

            {/* @ts-ignore */}
            <DialogFooter
              className={`flex justify-end p-0 pb-3 ${
                size === "xxl" ? "px-6 mt-2" : "px-12 mt-4"
              }`}
            >
              <button
                type="submit"
                className={`px-24 bg-[#E31837] text-white rounded-xl ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                } ${size === "xxl" ? "py-3" : "py-4"}`}
                disabled={isSubmitting}
              >
                Save
              </button>
            </DialogFooter>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddMoreExperienceModal;
