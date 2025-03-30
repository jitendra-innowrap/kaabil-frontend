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
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

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
    fetchRoles();
    fetchJobTypes();
  }, []);

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
        const preselectedRoles = roles.filter((role: any) =>
          user?.role_id?.includes(role.value)
        );
        setSelectedRoles(preselectedRoles);
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
    // @ts-ignore
    <Dialog
      open={progress === 5}
      size={size}
      className={`onboarding-dailog ${
        size === "md" ? "fixed -top-16 -translate-x-1/2  onboarding-scale" : ""
      }`}
    >
      <div className="pb-6">
        {/* @ts-ignore */}
        <DialogHeader>
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
              className={`${
                size === "md"
                  ? "flex justify-center items-center mt-6"
                  : "flex justify-start items-start mt-16"
              }`}
            >
              <h2
                className={`text-[#231F20] font-semibold  ${
                  size === "md"
                    ? "!text-[26px] text-center"
                    : "!text-[22px] text-start"
                }`}
              >
                <span className="text-red">Hi {user?.name}!</span>
                <br />
                <span className="text-[#231F20]">
                  Take the first step to find a job
                </span>
              </h2>
            </div>
          </div>
        </DialogHeader>

        {/* ✅ Formik Form */}
        <form
          onSubmit={formik.handleSubmit}
          className={`${size === "md" ? "block mt-6" : "mt-2"}`}
        >
          {/* @ts-ignore */}
          <DialogBody className="custom-dialog-body custom-scroll">
            <div
              className={`scroll-content pb-2 cursor-pointer ${
                size === "md" ? "px-12" : "px-0"
              }`}
            >
              <h4 className="text-lg font-medium text-[#231F20]">
                What job role are you looking for?
              </h4>
              <p className="text-sm text-[#249D64]">
                (You can select up to 2 job roles)
              </p>

              {/* ✅ MultiSelect for Job Roles */}
              <div className="my-3">
                <MultiSelect
                  options={rolesList.map((role) => ({
                    ...role,
                    disabled: isOptionDisabled(role), // Dynamically set disabled based on selection
                  }))}
                  placeholder="Select Role"
                  isMulti
                  onChange={(
                    selectedRoles: { value: string; label: string }[]
                  ) =>
                    formik.setFieldValue(
                      "role_id",
                      selectedRoles.map((role) => role.value)
                    )
                  }
                  selectedValues={rolesList?.filter((role) =>
                    formik.values.role_id.includes(role.value)
                  )}
                  maxSelections={2}
                  // hasSelectAll={false}
                  icon={
                    <FaMagnifyingGlass className="absolute left-[15px] top-[20px] size-4 text-[#808080]" />
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

              <h4 className="text-lg font-medium my-4 text-[#231F20]">
                What type of job required?
              </h4>

              {/* ✅ Job Type Selection */}
              <div className="flex flex-wrap gap-4">
                {jobTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`label-option cursor-pointer px-4 py-2 rounded md:grow ${
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
          </DialogBody>

          {/* @ts-ignore */}
          <DialogFooter className="p-0 pb-6 !px-12 mt-5 flex justify-center">
            <div className="flex w-full justify-between items-end">
              <div className="whitespace-nowrap">
                <span className="text-red">{6 - 4}</span> - 6
              </div>
              <button
                type="submit"
                className={`max-w-[200px] sm:max-w-[250px] ${
                  size === "md" ? "text-lg" : "text-md"
                } mt-1 no-margin px-6 py-2 !bg-red hover:bg-red text-white rounded-full ${
                  !formik.isValid || formik.isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={formik.isSubmitting}
              >
                Next
              </button>
            </div>
          </DialogFooter>
        </form>
      </div>
    </Dialog>
  );
}
