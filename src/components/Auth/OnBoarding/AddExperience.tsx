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

export default function AddExperience() {
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
    salary: Yup.number().required("Salary is required"),
    type: Yup.number().required("Job type is required"),
    isCurrentCompany: Yup.boolean(),
    jobStartDate: Yup.string().required("Start date is required"),
    jobEndDate: Yup.string().test(
      "job-end-date",
      "End date is required",
      function (value) {
        const { isCurrentCompany } = this.parent;
        return isCurrentCompany === false ? !!value : true; // Only check when current company is false
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
    <div className="">
      <h2 className="text-center font-semibold text-lg md:text-xl xl:text-[28px] 2xl:leading-[38px]">
        You’re almost there! Add
        <br /> your <span className="text-red">experience</span>
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16"
      >
        <h4 className="text-lg font-medium">
          What’s your level of experience?
        </h4>
        <div className="my-4 flex flex-col sm:flex-row gap-4">
          <label
            htmlFor="fresher"
            className={`form-group !flex flex-1 !mb-0 gap-4 rounded-lg px-5 py-4 border cursor-pointer shadow-sm items-center ${
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
            <div className="!mb-0 gap-2 inline-block cursor-pointer">
              I'm a Fresher
            </div>
          </label>
          <label
            htmlFor="experienced"
            className={`form-group !flex flex-1 !mb-0 gap-4 rounded-lg px-5 py-4 border cursor-pointer shadow-sm items-center ${
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
            <div className="!mb-0 gap-2 inline-block cursor-pointer">
              I'm Experienced
            </div>
          </label>
        </div>
        {formik.errors.is_fresher && formik.touched.is_fresher && (
          <p className="text-red text-sm mt-1">{formik.errors.is_fresher}</p>
        )}

        {formik.values.is_fresher === 1 && user.experience.length < 1 && (
          <>
            <h4 className="text-lg mb-4 font-medium">
              Please add your latest experience
            </h4>
            <AddExperienceForm ref={setFormikFormRef} formik={formikForm} />
            <div
              className="flex text-red font-semibold mt-7 cursor-pointer"
              onClick={() => handleSubmitExperience()}
            >
              + add more experience
            </div>
          </>
        )}
        <div className="flex w-full items-end">
          <div className="whitespace-nowrap">
            <span className="text-red">{progress - 4}</span> - 6
          </div>
          <div className="flex gap-4 items-end w-full justify-end">
            <span
              onClick={() => dispatch(setProgress(11))}
              className={`max-w-[130px] text-[#231F20] cursor-pointer border-[#9C9C9C] flex items-center btn-border !py-3.5 !px-9 !rounded-xl`}
            >
              Skip
            </span>
            <button
              className="max-w-[100px] sm:max-w-[250px] flex-shrink-0 justify-start"
              disabled={formik.isSubmitting}
              type="submit"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
