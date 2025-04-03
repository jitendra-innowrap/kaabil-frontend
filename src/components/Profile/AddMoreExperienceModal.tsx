import { useAppSelector } from "@/redux/hooks";
import { fetchProfile, setExperienceModal } from "@/redux/profileSlice";
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

const AddMoreExperienceModal = () => {
  const { experienceModal, profileData } = useAppSelector(
    (state) => state.profile
  );

  const [editField, setEditField] = useState(false);

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
  const [jobTypes, setJobTypes] = useState<any[]>([]);
  const closeModal = () => {
    dispatch(setExperienceModal(false));
  };

  const validationSchema = Yup.object().shape({
    designation_name: Yup.string().when("editExperience", {
      is: (editExperience: any) => editExperience === true,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.nullable(),
    }),
    company_name: Yup.string().when("editExperience", {
      is: (editExperience: any) => editExperience === true,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.nullable(),
    }),
    in_hand_salary: Yup.number()
      .test(
        "max-digits",
        "Must not exceed 10 digits",
        (value) => !value || value.toString().length <= 10
      )
      .when("editExperience", {
        is: (editExperience: any) => editExperience === true,
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.nullable(),
      }),
    job_type_id: Yup.string().when("editExperience", {
      is: (editExperience: any) => editExperience === true,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.nullable(),
    }),
    job_start_date: Yup.date()
      .max(new Date(), "Cannot be a future date")
      .when("editExperience", {
        is: (editExperience: any) => editExperience === true,
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.nullable(),
      }),
    job_end_date: Yup.string().when("editExperience", {
      is: (editExperience: any) => editExperience === true,
      then: (schema) =>
        schema.test("job-end-date", "Invalid end date", function (value) {
          const { is_current_company, job_start_date } = this.parent;
          if (!is_current_company && value) {
            const endDate = new Date(value);
            return endDate >= new Date(job_start_date) && endDate <= new Date();
          }
          return true;
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

  return (
    // @ts-ignore
    <Dialog
      open={false}
      // handler={closeModal}
      size="md"
      className="fixed -top-10 -translate-x-1/2 custom-dialog"
    >
      {/* @ts-ignore  */}
      <DialogHeader>
        <div className="relative w-full">
          <IoClose
            className="absolute top-0 right-0 cursor-pointer"
            size={38}
            onClick={closeModal}
          />
          <div className="flex justify-center items-center mt-6">
            <h2 className="text-center text-[#231F20] text-3xl font-semibold">
              Edit your <span className="text-red">experience</span>
            </h2>
          </div>
        </div>
      </DialogHeader>
      {/* @ts-ignore  */}

      <Formik
        initialValues={{
          is_fresher: Number(profileData?.is_fresher) || 2,
          designation_name: editField
            ? profileData?.user_experiences[0]?.designation
            : "",
          designation_master_id: editField
            ? profileData.user_experiences[0].designation_master_id
            : "",
          company_master_id: editField
            ? profileData.user_experiences[0].company_master_id
            : "",
          company_name: editField
            ? profileData.user_experiences[0].company_name
            : "",
          in_hand_salary: editField
            ? profileData.user_experiences[0].in_hand_salary
            : "",
          job_type_id: editField
            ? profileData.user_experiences[0].job_type_id
            : "",
          is_current_company: editField
            ? profileData.user_experiences[0].is_current_company
            : "0",
          job_start_date: editField
            ? profileData.user_experiences[0].job_start_date
            : formatDateExperience(new Date()),
          job_end_date: editField
            ? profileData.user_experiences[0].job_end_date
            : formatDateExperience(new Date()),
          additional_info: editField
            ? profileData.user_experiences[0].additional_info
            : "",
          company_logo: editField
            ? profileData.user_experiences[0].company_logo
            : "",
          editExperience: editField,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const { is_fresher, editExperience, ...payload } = values;
          const formData = new FormData();
          if (is_fresher === 1) {
            formData.append("is_fresher", is_fresher.toString());
            formData.append("user_experiences", JSON.stringify([payload]));
          } else {
            formData.append("is_fresher", is_fresher.toString());
          }
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
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            {/* @ts-ignore */}
            <DialogBody className="p-0 mt-8  max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll">
              <div className="px-12">
                <label
                  className="block font-semibold mb-1 !text-[#231F20] !text-lg"
                  htmlFor="fileInput"
                >
                  your experience
                </label>
                <div className="my-4 p-4 rounded-lg shadow-default justify-between flex gap-4">
                  <div className="">
                    <h5 className="font-medium text-black mb-2">
                      {profileData?.user_experiences?.length > 0
                        ? profileData?.user_experiences[0]?.designation
                        : ""}
                    </h5>
                    <h6 className="text-sm mb-2">
                      {profileData?.user_experiences?.length > 0
                        ? profileData.user_experiences[0].company_name
                        : ""}
                      <GoDotFill className="inline-block size-2" />
                    </h6>
                    <h6 className="text-sm mb-2">
                      {formatMonthYear(values?.job_start_date)} -
                      {profileData?.user_experiences[0]?.is_current_company ==
                      "1"
                        ? "Present"
                        : formatMonthYear(values?.job_end_date)}
                      <GoDotFill className="inline-block size-2" />
                      {formatJobDuration(
                        values?.job_start_date,
                        values?.job_end_date
                      )}
                    </h6>
                  </div>
                  <div
                    className="flex items-center h-fit cursor-pointer"
                    // onClick={() => handleEditExperience(i)}
                  >
                    <Image
                      src={"/new-assets/icons/pencil.png"}
                      alt="edit-pencil"
                      aria-label="edit icon"
                      className="w-3 h-3 mr-1"
                      width={90}
                      height={90}
                    />
                    <span className="text-red text-sm font-semibold">Edit</span>
                  </div>
                </div>
                {/* Fields */}
                {values?.is_fresher === 1 && (
                  <div className="mt-8">
                    <label
                      className="block font-semibold mb-1 !text-[#231F20] !text-lg"
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
                          className="w-full p-3 border bg-[#C8C9CB3B] rounded-lg"
                        />
                        {designationSuggestions?.length > 0 && (
                          <div className="absolute z-10 w-full max-h-[250px] min-h-[50px] overflow-auto p-0 bg-white border rounded-xl shadow-lg mt-1">
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
                          className="w-full p-3 border bg-[#C8C9CB3B] rounded-lg"
                        />
                        {companySuggestions?.length > 0 && (
                          <div className="absolute z-10 w-full max-h-[250px] min-h-[50px] overflow-auto p-0 bg-white border rounded-xl shadow-lg mt-1">
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
                          placeholder="Monthly in_hand_salary eg: 15000"
                          className="w-full p-3 border bg-[#C8C9CB3B] rounded-lg"
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
                      <div className="grid sm:grid-cols-3 gap-3 3xl:gap-4 mt-6">
                        {jobTypes.map((jobType) => (
                          <div
                            key={jobType.id}
                            className={`col-span-1 label-option cursor-pointer ${
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
                          }}
                          className="!mb-0 inline-block !w-5 !h-5 cursor-pointer"
                        />
                        <label
                          htmlFor="is_current_company"
                          className="!mb-0 inline-block text-lg"
                        >
                          Currently working here
                        </label>
                      </div>
                      <div className="flex gap-4 ">
                        <div>
                          <label className="text-lg">Working From</label>
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
                              className="text-red text-md mt-1"
                            />
                          </div>
                        </div>

                        {/* Field 7 */}
                        {values?.is_current_company === "0" && (
                          <div>
                            <label className="text-lg">Working Till</label>
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
                              max={(() => {
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                return tomorrow.toISOString().split("T")[0];
                              })()}
                            />
                            <div className="h-1">
                              <ErrorMessage
                                name="job_end_date"
                                component="div"
                                className="text-red text-md mt-1"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex text-red font-semibold mt-7 text-lg cursor-pointer"
                  // onClick={() => {
                  //   if (!newExperience) {
                  //     formikForm.resetForm();
                  //     setNewExperience(true);
                  //     setIsEditing(null); // Reset edit mode
                  //   } else {
                  //     formikForm.handleSubmit();
                  //   }
                  // }}
                >
                  + add more experience
                </div>
              </div>
            </DialogBody>
            {/* @ts-ignore */}
            <DialogFooter className="flex justify-end p-0 pb-3 mt-3 px-12">
              <button
                type="submit"
                className={`px-24 py-4  bg-[#E31837] text-white rounded-xl ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
