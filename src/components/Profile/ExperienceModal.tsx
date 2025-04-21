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
import { convertToNumber, formatDateExperience } from "../utils";
import toast from "react-hot-toast";

const ExperienceModal = ({ size }: any) => {
  const { experienceModal, profileData } = useAppSelector(
    (state) => state.profile
  );
  const { token } = useAppSelector((state) => state.auth);
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
  const [experienceList, setExperienceList] = useState<any[]>([]);
  const [jobTypes, setJobTypes] = useState<any[]>([]);

  const closeModal = async () => {
    await dispatch(setExperienceModal(false));
  };

  const validationSchema = Yup.object().shape({
    is_fresher: Yup.number().required("Required"),
    designation_name: Yup.string().when("is_fresher", {
      is: (isFresher: any) => isFresher === 1,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.nullable(),
    }),
    company_name: Yup.string().when("is_fresher", {
      is: (isFresher: any) => isFresher === 1,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.nullable(),
    }),
    in_hand_salary: Yup.number()
      .test(
        "max-digits",
        "Must not exceed 10 digits",
        (value) => !value || value.toString().length <= 10
      )
      .when("is_fresher", {
        is: (isFresher: any) => isFresher === 1,
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.nullable(),
      }),
    job_type_id: Yup.string().when("is_fresher", {
      is: (isFresher: any) => isFresher === 1,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.nullable(),
    }),
    job_start_date: Yup.date()
      .max(new Date(), "Cannot be a future date")
      .when("is_fresher", {
        is: (isFresher: any) => isFresher === 1,
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.nullable(),
      }),
    job_end_date: Yup.string().when("is_fresher", {
      is: (isFresher: any) => isFresher === 1,
      then: (schema) =>
        schema.test("job-end-date", "Invalid Date", function (value) {
          const { is_current_company, job_start_date } = this.parent;
          // Skip check if user is still at the company
          if (is_current_company === "1") return true;
          if (value && job_start_date) {
            const endDate = new Date(value);
            const startDate = new Date(job_start_date);
            const now = new Date();
            return endDate >= startDate && endDate <= now;
          }
          return true; // Allow empty end date for other cases
        }),
      otherwise: (schema) => schema.nullable(),
    }),
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
  const [dialogHeight, setDialogHeight] = useState('calc(100dvh - 225px)');

  useEffect(() => {
    const calculateHeight = () => {
      const vh = window.innerHeight;
      let height;
      
      if (window.innerWidth < 768) {
        height = vh - 225; // Mobile calculation
      } else if (window.innerWidth < 1024) {
        height = vh * 0.7; // 70vh equivalent
      } else {
        height = vh * 0.8; // 80vh equivalent
      }
      
      setDialogHeight(`${height}px`);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);
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

  useEffect(() => {
    console.log(profileData, "Step 3");
    if (profileData?.user_experiences) {
      console.log(profileData?.user_experiences, "Verify Experience List");
      const filteredExperiences = profileData.user_experiences.slice(1);
      const transformedExperiences = filteredExperiences.map(
        (experience: any) => ({
          designation_name: experience.designation,
          designation_master_id: experience.designation_master_id,
          company_master_id: experience.company_master_id,
          company_name: experience.company_name,
          in_hand_salary: experience.in_hand_salary,
          job_type_id: parseInt(experience.job_type_id, 10), // Ensuring it's a number
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

  return (
    <>
        {experienceModal && size ==="xxl" && <div className="overlay h-screen w-screen fixed z-[1000] bg-[#000000E5] opacity-70 inset-0"></div>}

     {/* @ts-ignore */}
    <Dialog
      size={size}
      open={experienceModal}
      handler={closeModal}
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
            <h2 className="text-center text-[#231F20]  font-semibold">
              Edit your <span className="text-red">experience</span>
            </h2>
          </div>
        </div>
      </DialogHeader>
      {/* @ts-ignore  */}
      <Formik
        initialValues={{
          is_fresher: Number(profileData?.is_fresher) || 2,
          designation_name: profileData?.user_experiences?.length
            ? profileData.user_experiences[0]?.designation
            : "",
          designation_master_id: profileData?.user_experiences?.length
            ? profileData.user_experiences[0].designation_master_id
            : "",
          company_master_id: profileData?.user_experiences?.length
            ? profileData.user_experiences[0].company_master_id
            : "",
          company_name: profileData?.user_experiences?.length
            ? profileData.user_experiences[0].company_name
            : "",
          in_hand_salary: profileData?.user_experiences?.length
            ? profileData.user_experiences[0].in_hand_salary
            : "",
          job_type_id: profileData?.user_experiences?.length
            ? profileData.user_experiences[0].job_type_id
            : "",
          is_current_company: profileData?.user_experiences?.length
            ? profileData.user_experiences[0].is_current_company
            : "0",
          job_start_date: profileData?.user_experiences?.length
            ? profileData.user_experiences[0].job_start_date
            : "",
          job_end_date: profileData?.user_experiences?.length
            ? profileData.user_experiences[0].job_end_date
            : "",
          additional_info: profileData?.user_experiences?.length
            ? profileData.user_experiences[0].additional_info
            : "",
          company_logo: profileData?.user_experiences?.length
            ? profileData.user_experiences[0].company_logo
            : "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const { is_fresher, ...payload } = values;
          const updatedExperienceList =
            experienceList.length > 0
              ? [payload, ...experienceList]
              : [payload];
          const formData = new FormData();
          if (is_fresher === 1) {
            formData.append("is_fresher", is_fresher.toString());
            formData.append(
              "user_experiences",
              JSON.stringify(updatedExperienceList)
            );
          } else {
            formData.append("is_fresher", is_fresher.toString());
            formData.append("user_experiences", JSON.stringify([]));
          }
          try {
            await api.post("/Auth/editJobSeekerPrpfile", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            await closeModal();
          } catch (error: any) {
            toast.error(error?.message || "Something went wrong!", {
              position: "bottom-right",
            });
          } finally {
            await dispatch(
              // @ts-ignore
              fetchProfile({
                token: token,
                data: { latitude: 0, longitude: 0 },
              })
            );
            await dispatch(setAddMoreExperience(true));
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting, handleSubmit, dirty }) => (
          <Form>
            {/* @ts-ignore */}
            <DialogBody
              className={`p-0 h-[calc(100vh_-_225px)] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll ${
                size === "xxl" ? "mt-4" : "mt-8"
              }`}
              style={{ height: dialogHeight }}
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
                  What’s your level of experience?
                </label>
                <div className="my-2 flex  gap-4">
                  <label
                    htmlFor="fresher"
                    className={`form-group !flex flex-1 !mb-0 gap-4 rounded-lg px-5 border cursor-pointer shadow-sm items-center ${
                      2 === values.is_fresher
                        ? "border-[#E31837] bg-[#FDF1F3] text-[#E31837]"
                        : "border-[#C8C9CB1A]"
                    } ${size === "xxl" ? "py-3" : "py-4"} ${
                      values?.is_fresher == 1
                        ? "!pointer-events-none opacity-50"
                        : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      id="fresher"
                      name="is_fresher"
                      className={`cursor-pointer inline-block !m-0 ${
                        size === "xxl" ? "!w-4 !h-4" : "!w-5 !h-5"
                      }`}
                      value={2}
                      onChange={(e: any) => {
                        const value = parseInt(e.target.value);
                        setFieldValue("is_fresher", value);
                      }}
                      checked={values.is_fresher === 2}
                      disabled={profileData?.is_fresher === 1} // Disable if profileData.is_fresher is 1
                    />
                    <div
                      className={`!mb-0 gap-2 inline-block cursor-pointer ${
                        size === "xxl" ? "text-[10px]" : "text-lg"
                      }`}
                    >
                      I'm a Fresher
                    </div>
                  </label>

                  <label
                    htmlFor="experienced"
                    className={`form-group !flex flex-1 !mb-1 gap-4 rounded-lg px-5  border cursor-pointer shadow-sm items-center ${
                      1 === values.is_fresher
                        ? "border-[#E31837] bg-[#FDF1F3] text-[#E31837]"
                        : "border-[#C8C9CB1A]"
                    } ${size === "xxl" ? "py-3" : "py-4"}`}
                  >
                    <Field
                      type="radio"
                      id="experienced"
                      name="is_fresher"
                      className={`cursor-pointer inline-block !m-0 ${
                        size === "xxl" ? "!w-4 !h-4" : "!w-5 !h-5"
                      }`}
                      value={1}
                      onChange={(e: any) => {
                        const value = parseInt(e.target.value);
                        setFieldValue("is_fresher", value);
                      }}
                      checked={values.is_fresher === 1}
                    />
                    <div
                      className={`!mb-0 gap-2 inline-block cursor-pointer ${
                        size === "xxl" ? "text-[10px]" : "text-lg"
                      }`}
                    >
                      I'm Experienced
                    </div>
                  </label>
                </div>
                {/* Fields */}
                {values?.is_fresher === 1 && (
                  <div>
                    <label
                      className={`block font-semibold mb-1 mt-8 !text-[#231F20] ${
                        size === "xxl" ? "!text-[16px]" : "!text-xl"
                      }`}
                      htmlFor="fileInput"
                    >
                      Please add your latest experience
                    </label>
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
                            fetchDesignationSuggestions(
                              values.designation_name
                            );
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
                                  setFieldValue(
                                    "company_name",
                                    suggestion?.name
                                  );
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
                              setFieldValue(
                                "job_type_id",
                                parseInt(jobType.id)
                              );
                              // setFieldValue("job_type_name", jobType.name);
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
                  </div>
                )}
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
                Next
              </button>
            </DialogFooter>
          </Form>
        )}
      </Formik>
    </Dialog>
    </>
  );
};

export default ExperienceModal;
