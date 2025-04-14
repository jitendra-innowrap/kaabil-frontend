"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import MultiSelect from "@/components/Inputs/MultiSelect";
import SelectedChips from "@/components/Inputs/SelectedChips";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/Services/Apiservice";
import toast from "react-hot-toast";
import { setUserRole } from "@/redux/userSlice";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import styles from "../SignIn/signIn.module.css"

export default function AddJobRole({ size, closePopup, handleBack }: any) {
  const dispatch = useAppDispatch();
  const progress: any = useAppSelector((state) => state.progress.value);

  const user = useAppSelector((state) => state.user);
  const [selectedRoles, setSelectedRoles] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedJobType, setSelectedJobType] = useState<string[]>([]);
  const [rolesList, setRolesList] = useState<
    { value: string; label: string }[]
  >([]);
  const [jobTypes, setJobTypes] = useState<{ value: string; label: string }[]>(
    []
  );

  const isOptionDisabled = (option: { value: string; label: string }) => {
    // Disable the option if more than 2 are selected and this option is not already selected
    return (
      selectedRoles.length >= 2 &&
      !selectedRoles.some((role) => role.value === option.value)
    );
  };

  // ✅ Fetch roles and job types from API
  useEffect(() => {
    const fetchMaster = async () => {
      await fetchRoles();
      await fetchJobTypes();
    };

    fetchMaster();
  }, [progress==5]);


  const fetchRoles = async () => {
    try {
      const response = await api.get("/MasterData/getDesignation");
      const roles =
        response?.data?.result?.map((role: any) => ({
          value: role.id,
          label: role.name,
          ...role,
        })) || [];

      // Set initial selected roles if user has existing roles
      if (user.role_id) {
        const preselectedRoles = roles.filter((role: {value:string, label:string}) =>
          user?.role_id?.includes(role.value)
        );
        const savePreselectedRoles = preselectedRoles.map((role: {value:string, label:string})=>{
          return role.value
        })
        const savePreselectedRolesNames = preselectedRoles.map((role: {value:string, label:string})=>{
          return role.label
        })
        setSelectedRoles(preselectedRoles);
        formik.setFieldValue('role_names', savePreselectedRolesNames)
        dispatch(setUserRole({role_id:savePreselectedRoles, role_names:savePreselectedRolesNames, job_type_master_id:[]}));
        formik.setFieldValue(
          "role_id",
          preselectedRoles.map((role: any) => role.value)
        );
      }

      setRolesList(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchJobTypes = async () => {
    try {
      const response = await api.get("/MasterData/getJobType");
      const jobTypes =
        response?.data?.result?.map((type: any) => ({
          value: type.id.toString(),
          label: type.name,
        })) || [];

      // Set initial job type selection if user has existing job types
      if (user.job_type_master_id) {
        setSelectedJobType(user.job_type_master_id.map((id) => id.toString()));
        formik.setFieldValue(
          "job_type_master_id",
          user.job_type_master_id.map((id) => id.toString())
        );
      }
      setJobTypes(jobTypes);
    } catch (error) {
      console.error("Error fetching job types:", error);
    }
  };

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    role_id: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one role")
      .max(2, "You can select up to 2 roles")
      .required("Job role is required"),
    job_type_master_id: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one job type")
      .required("Job type is required"),
  });

  // ✅ Formik Hook
  const formik = useFormik({
    initialValues: {
      role_id: [] as string[],
      role_names: [] as string[],
      job_type_master_id: [] as string[],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        // ✅ Automatically append all fields from the object
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value !== "string") {
            let valueAsString = JSON.stringify(value);
            formData.append(key, valueAsString); // Convert all values to strings
          }
        });
        // ✅ Submit selected roles & job type
        const response = await api.post("/Auth/addJobseekerProfile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response?.data?.code === 1) {
          dispatch(setProgress(6));
          dispatch(setUserRole(values));
          dispatch(setUserRole({role_id: values.role_id, role_names:values.role_names, job_type_master_id: values.job_type_master_id}));
          toast.success("Job role submitted successfully!", {
            position: "bottom-right",
          });
        } else {
          toast.error(response?.data?.message || "Submission failed!", {
            position: "bottom-right",
          });
        }
      } catch (error: any) {
        console.error("Error submitting job role:", error);
        toast.error(error?.message || "Something went wrong!", {
          position: "bottom-right",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

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
              className={`flex sm:justify-center items-center pt-[74px] sm:pt-[30px]`}
          >
            <h2
                className={`text-[#231F20] font-semibold  ${
                    size === "md"
                        ? "!text-[28px] text-center"
                        : "!text-[20px] text-start"
                }`}
            >
              <span className="text-red">Hi {user?.name}!</span>
              <br />
              <span className="text-[#231F20]">
                  Take the first step to find a job
                </span>
            </h2>
          </div>
            <pre>{JSON.stringify([user?.role_names])}</pre>
        </div>
        <form
            onSubmit={formik.handleSubmit}
            className={`${size === "md" ? "block mt-6" : "mt-2"}`}
        >
          {/* @ts-ignore */}
          <div className="sm:max-w-[528px] sm:mx-auto">
            <div
                className={`scroll-content pb-2 cursor-pointer ${
                    size === "md" ? "" : "px-0"
                }`}
            >
              <h4 className="text-[14px] sm:text-lg font-medium text-[#231F20]">
                What job role are you looking for?
              </h4>
              <p className="text-[11px] sm:text-sm text-[#249D64]">
                (You can select up to 2 job roles)
              </p>

              {/* ✅ MultiSelect for Job Roles */}
              <div className={`my-3 multi-select ${styles.multi_select}`}>
                <MultiSelect
                    options={rolesList.map((role) => ({
                      ...role,
                      disabled: isOptionDisabled(role), // Dynamically set disabled based on selection
                    }))}
                    placeholder="Select Role"
                    isMulti
                    onChange={(
                        selectedRoles: { value: string; label: string }[]
                    ) =>{
                      formik.setFieldValue("role_id",selectedRoles.map((role) => role.value))
                      formik.setFieldValue("role_names",selectedRoles.map((role) => role.label))
                    }
                    }
                    selectedValues={rolesList?.filter((role) =>
                        formik.values.role_id.includes(role.value)
                    )}
                    maxSelections={2}
                    // hasSelectAll={false}
                    icon={
                      <FaMagnifyingGlass className="absolute left-[15px] top-[14px] sm:top-[20px] size-4 text-[#808080]" />
                    }
                />
              </div>

              {/* ✅ Display Selected Job Roles */}
              <SelectedChips
                  selectedValues={rolesList.filter((role) =>
                      formik.values.role_id.includes(role.value)
                  )}
                  onRemove={(value: string) =>
                      formik.setFieldValue(
                          "role_id",
                          formik.values.role_id.filter((id) => id !== value)
                      )
                  }
                  size={size}
              />

              {/* ✅ Validation Error */}
              {formik.errors.role_id && formik.touched.role_id && (
                  <p className="text-red text-sm mt-1">{formik.errors.role_id}</p>
              )}

              <h4 className="text-[14px] sm:text-lg font-medium my-4 text-[#231F20]">
                What type of job required?
              </h4>

              {/* ✅ Job Type Selection */}
              <div className="flex sm:flex-wrap sm:gap-4 justify-between">
                {jobTypes.map((type) => (
                    <div
                        key={type.value}
                        className={`label-option ${styles.xl} cursor-pointer !px-5 py-2 rounded md:grow ${
                            formik.values.job_type_master_id.includes(type.value)
                                ? "bg-red text-white"
                                : ""
                        }`}
                        onClick={() => {
                          const currentValues = formik.values.job_type_master_id;
                          const newValues = currentValues.includes(type.value)
                              ? currentValues.filter((id) => id !== type.value)
                              : [...currentValues, type.value];
                          formik.setFieldValue("job_type_master_id", newValues);
                        }}
                    >
                      {type.label}
                    </div>
                ))}
              </div>

              {/* ✅ Validation Error */}
              {formik.errors.job_type_master_id &&
                  formik.touched.job_type_master_id && (
                      <p className="text-red text-sm mt-1">
                        {formik.errors.job_type_master_id}
                      </p>
                  )}
            </div>
          </div>

          {/* @ts-ignore */}
          <div className="p-0 pb-6 mt-5 flex justify-center">
            <div className="flex w-full justify-end sm:justify-between items-end">
              <div className="whitespace-nowrap dialog-footer-paging">
                <span className="text-red">{progress - 4}</span> - 6
              </div>
              <button
                  type="submit"
                  className={`${styles.onboarding_dialog_btn} w-1/2 max-w-[200px] sm:max-w-[250px] ${
                      size === "md" ? "text-lg" : "text-md"
                  } mt-1 no-margin px-6 !bg-red hover:bg-red text-white ${
                      !formik.isValid || formik.isSubmitting
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                  }`}
                  disabled={formik.isSubmitting}
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
  );
}
