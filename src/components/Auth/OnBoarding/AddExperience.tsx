import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import React, { useState, useRef } from "react";
import AddExperienceForm from "./AddExperienceForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { setIsFresher, setUserExperience } from "@/redux/userSlice";
import api from "@/Services/Apiservice";
import { Experience } from "@/Types/common";
import styles from "../SignIn/signIn.module.css"
import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function AddExperience({ size, closePopup, handleBack }: any) {
  const progress = useAppSelector((state) => state.progress.value);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const formikFormRef = useRef<any>(null); // Ref to access child formik methods

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    is_fresher: Yup.number().required("Please select your experience level"),
  });

  // ✅ Formik Hook
  const formik = useFormik({
    initialValues: {
      is_fresher: user?.is_fresher == 1 ? 1 : 2,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (values.is_fresher === 2) {
          const payload = {
            is_fresher: values.is_fresher,
            is_profile_verify: 1,
          };
          const formData = new FormData();
          // ✅ Automatically append all fields from the object
          Object.entries(payload).forEach(([key, value]) => {
            if (typeof value !== "string") {
              let valueAsString = JSON.stringify(value);
              formData.append(key, valueAsString); // Convert all values to strings
            }
          });
          // If Fresher, submit immediately
          const response = await api.post(
            "/Auth/addJobseekerProfile",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (response?.data?.code === 1) {
            dispatch(setProgress(11)); // Move to the next step
            dispatch(setIsFresher(values.is_fresher));
            toast.success("Experience level submitted successfully!", {
              position: "bottom-right",
            });
          } else {
            toast.error(response?.data?.message || "Submission failed!", {
              position: "bottom-right",
            });
          }
        } else {
          dispatch(setIsFresher(values.is_fresher));
          if (user.experience.length < 1) {
            handleSubmitExperience();
          } else {
            dispatch(setProgress(10));
          }
        }
      } catch (error: any) {
        console.error("Error submitting experience:", error);
        toast.error(error?.message || "Something went wrong!", {
          position: "bottom-right",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSubmitExperience = async () => {
    if (formikFormRef.current) {
      await formikFormRef.current.handleSubmit();
    }
  };
  const validationSchemaForm = Yup.object().shape({
    designation: Yup.string().required("Designation is required"),
    companyName: Yup.string().required("Company name is required"),
    salary: Yup.number()
      .required("Salary is required")
      .test(
        "max-digits",
        "Must not exceed 10 digits",
        (value) => !value || value.toString().length <= 10
      ),
    type: Yup.number().required("Job type is required"),
    isCurrentCompany: Yup.boolean(),
    jobStartDate: Yup.date()
      .required("Start date is required")
      .max(new Date(), "Cannot be a future date"),
    jobEndDate: Yup.string().test(
      "job-end-date",
      "Invalid end date",
      function (value) {
        const { isCurrentCompany, jobStartDate } = this.parent;
        if (!isCurrentCompany && value) {
          const endDate = new Date(value);
          return endDate >= new Date(jobStartDate) && endDate <= new Date();
        }
        return true;
      }
    ),
  });

  // ✅ Formik Hook for the form
  const formikForm = useFormik({
    initialValues: {
      designation: "",
      designation_master_id: "",
      companyName: "",
      company_master_id: "",
      salary: "",
      type: "",
      type_name: "",
      jobStartDate: "",
      jobEndDate: "",
      isCurrentCompany: false,
    },
    validationSchema: validationSchemaForm,
    onSubmit: (values) => {
      const experience = {
        company_master_id: "1578", // Replace with actual company ID from API
        company_name: values.companyName,
        designation_master_id: "2698", // Replace with actual designation ID from API
        designation_name: values.designation,
        job_type_id: values.type,
        job_type_name: values.type_name,
        job_start_date: values.jobStartDate,
        job_end_date: values.isCurrentCompany ? "" : values.jobEndDate,
        in_hand_salary: values.salary,
        is_current_company: values.isCurrentCompany ? 1 : 0,
        additional_info: "",
      };
      handleAddExperience(experience);
      dispatch(setProgress(10));
      toast.success("Experience added successfully!", {
        position: "bottom-right",
      });
      formikForm.resetForm();
    },
  });

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    formik.setFieldValue("is_fresher", value);
  };

  const handleAddExperience = (experience: any) => {
    setExperiences([...experiences, experience]);
    dispatch(setUserExperience([...experiences, experience]));
  };

  const setFormikFormRef = (instance: any) => {
    if (instance) {
      formikFormRef.current = instance;
    }
  };

  return (
      <div className="pb-6 sm:p-6">
          <div className="relative w-full">
            <div onClick={handleBack}>
              <FaArrowLeft className="absolute cursor-pointer top-2 z-30 left-2 size-6" />
            </div>
            <IoClose
              className="absolute top-2 right-2 cursor-pointer"
              size={size === "md" ? 32 : 28}
              onClick={closePopup}
            />
            <div
              className={`flex sm:justify-center items-center pt-[74px] sm:pt-[30px] mb-[27px] sm:mb-0`}
            >
              <h2
                className={`text-[#231F20] font-semibold  ${
                    size === "md"
                        ? "!text-[28px] text-center"
                        : "!text-[20px] text-start"
                }`}
              >
                <span className="text-[#231F20]">
                  You’re almost there! <br />
                  <span className="text-[#231F20]">Add your </span>
                  <span className="text-red">experience</span>
                </span>
              </h2>
            </div>
          </div>
        <form
          onSubmit={formik.handleSubmit}
          className={`${size === "md" ? "block mt-6" : "mt-2"}`}
        >
            <div
              className={`pb-2 cursor-pointer ${styles.selected_option_list} ${
                size === "md" ? "max-w-[548px] mx-auto px-3" : "px-0"
              }`}
            >
              <h4 className="text-[14px] mb-[8px] sm:text-[18px] font-medium sm:mb-1">
                What’s your level of experience?
              </h4>
              <div className="my-4 flex flex-row gap-4">
                <label
                  htmlFor="fresher"
                  className={`${styles.form_group} !flex flex-1 !mb-0 gap-4 rounded-lg px-3 sm:px-5  border cursor-pointer shadow-sm items-center ${
                    2 === formik.values.is_fresher
                      ? "border-red bg-[#FDF1F3]"
                      : "border-[#C8C9CB1A]"
                  }`}
                >
                  <input
                    type="radio"
                    id="fresher"
                    name="is_fresher"
                    className="cursor-pointer inline-block !m-0 !w-4 !h-4"
                    value={2}
                    onChange={handleExperienceChange}
                    checked={formik.values.is_fresher === 2}
                  />
                  <div className="!mb-0 gap-2 inline-block cursor-pointer text-[11px] sm:text-[14px]">
                    I'm a Fresher
                  </div>
                </label>
                <label
                  htmlFor="experienced"
                  className={`${styles.form_group} !flex flex-1 !mb-0 gap-4 rounded-lg  px-3 sm:px-5  border cursor-pointer shadow-sm items-center ${
                    1 === formik.values.is_fresher
                      ? "border-red bg-[#FDF1F3]"
                      : "border-[#C8C9CB1A]"
                  }`}
                >
                  <input
                    type="radio"
                    id="experienced"
                    name="is_fresher"
                    className="cursor-pointer inline-block !m-0 !w-4 !h-4"
                    value={1}
                    onChange={handleExperienceChange}
                    checked={formik.values.is_fresher === 1}
                  />
                  <div className="!mb-0 gap-2 inline-block cursor-pointer text-[11px] sm:text-[14px]">
                    I'm Experienced
                  </div>
                </label>
              </div>
              {formik.errors.is_fresher && formik.touched.is_fresher && (
                <p className="text-red text-[11px] sm:text-sm mt-1">
                  {formik.errors.is_fresher}
                </p>
              )}

              {formik.values.is_fresher === 1 && user.experience.length < 1 && (
                <div className="scroll-content-experience cursor-pointer">
                  <h4 className="text-[14px] sm:text-lg mb-4 font-medium">
                    Please add your latest experience
                  </h4>
                  <AddExperienceForm
                    ref={setFormikFormRef}
                    formik={formikForm}
                  />
                  <div
                    className="text-[14px] sm:text-lg flex text-red font-semibold mt-7 cursor-pointer"
                    onClick={() => handleSubmitExperience()}
                  >
                    + add more experience
                  </div>
                </div>
              )}
            </div>
          {/* @ts-ignore */}
          <div className="p-0 pb-6 mt-[44px] flex justify-center">
            <div className="flex w-full items-end">
              <div className={`whitespace-nowrap ${styles.page_show}`}>
                <span className="text-red">{progress - 4}</span> - 6
              </div>
              <div className="flex gap-2 sm:gap-4 items-end w-full justify-end footer-2btn">
                <span
                  onClick={() => dispatch(setProgress(11))}
                  className={`${styles.onboarding_dialog_btn} w-1/2 max-w-[130px] text-[#231F20] cursor-pointer border-[#9C9C9C] flex items-center text-center justify-center btn-border !py-3.5 !px-9 !rounded-xl`}
                >
                  <p className="w-full">Skip</p>
                </span>
                <button
                  className={`${styles.onboarding_dialog_btn} w-1/2 max-w-[100px] sm:max-w-[250px] flex-shrink-0 justify-start`}
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
}
