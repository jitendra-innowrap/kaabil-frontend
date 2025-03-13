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

export default function AddJobRole() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [selectedRoles, setSelectedRoles] = useState<{ value: string; label: string }[]>([]);
  const [selectedJobType, setSelectedJobType] = useState<string[]>([]);
  const [rolesList, setRolesList] = useState<{ value: string; label: string }[]>([]);
  const [jobTypes, setJobTypes] = useState<{ value: string; label: string }[]>([]);

  // ✅ Fetch roles and job types from API
  useEffect(() => {
    fetchRoles();
    fetchJobTypes();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await api.get("/MasterData/getDesignation");
      const roles = response?.data?.result?.map((role: any) => ({
        value: role.id,
        label: role.name,
        ...role,
      })) || [];

      // Set initial selected roles if user has existing roles
      if (user.role_id) {
        const preselectedRoles = roles.filter((role: any) => user?.role_id?.includes(role.value));
        setSelectedRoles(preselectedRoles);
        formik.setFieldValue("role_id", preselectedRoles.map((role:any) => role.value));
      }

      setRolesList(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchJobTypes = async () => {
    try {
      const response = await api.get("/MasterData/getJobType");
      const jobTypes = response?.data?.result?.map((type: any) => ({
        value: type.id.toString(),
        label: type.name,
      })) || [];

      // Set initial job type selection if user has existing job types
      if (user.job_type_master_id) {
        setSelectedJobType(user.job_type_master_id.map((id) => id.toString()));
        formik.setFieldValue("job_type_master_id", user.job_type_master_id.map((id) => id.toString()));
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
          if(typeof value !== 'string'){
            let valueAsString = JSON.stringify(value);
            formData.append(key, valueAsString ); // Convert all values to strings
          }
        });
        // ✅ Submit selected roles & job type
        const response = await api.post("/Auth/addJobseekerProfile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response?.data?.code === 1) {
          dispatch(setProgress(6));
          dispatch(setUserRole(values));
          toast.success("Job role submitted successfully!", { position: "bottom-right" });
        } else {
          toast.error(response?.data?.message || "Submission failed!", { position: "bottom-right" });
        }
      } catch (error: any) {
        console.error("Error submitting job role:", error);
        toast.error(error?.message || "Something went wrong!", { position: "bottom-right" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="">
      <h2 className="text-center font-semibold text-lg md:text-xl xl:text-[28px] xl:leading-[36px]">
        <span className="text-red">Hi {user?.name}!</span> <br />
        Take the first step to find a job
      </h2>

      {/* ✅ Formik Form */}
      <form onSubmit={formik.handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
        <h4 className="text-lg font-medium">What job role are you looking for?</h4>
        <p className="text-sm text-[#249D64]">(You can select up to 2 job roles)</p>

        {/* ✅ MultiSelect for Job Roles */}
        <div className="my-4">
          <MultiSelect
            options={rolesList}
            placeholder="Select Role"
            isMulti
            onChange={(selectedRoles: { value: string; label: string }[]) =>
              formik.setFieldValue("role_id", selectedRoles.map((role) => role.value))
            }
            selectedValues={rolesList.filter((role) => formik.values.role_id.includes(role.value))}
            icon={<FaMagnifyingGlass className="absolute left-[15px] top-[20px] size-4 text-[#808080]" />}
          />
        </div>

        {/* ✅ Display Selected Job Roles */}
        <SelectedChips
          selectedValues={rolesList.filter((role) => formik.values.role_id.includes(role.value))}
          onRemove={(value: string) =>
            formik.setFieldValue(
              "role_id",
              formik.values.role_id.filter((id) => id !== value)
            )
          }
        />

        {/* ✅ Validation Error */}
        {formik.errors.role_id && formik.touched.role_id && (
          <p className="text-red text-sm mt-1">{formik.errors.role_id}</p>
        )}

        <h4 className="text-lg font-medium my-4">What type of job are you looking for?</h4>

        {/* ✅ Job Type Selection */}
        <div className="grid sm:grid-cols-3 gap-4">
          {jobTypes.map((type) => (
            <div
              key={type.value}
              className={`col-span-1 label-option cursor-pointer px-4 py-2 rounded ${
                formik.values.job_type_master_id.includes(type.value) ? "bg-red text-white" : ""
              }`}
              onClick={() => {
                const currentValues = formik.values.job_type_master_id;
                const newValues = currentValues.includes(type.value)
                  ? currentValues.filter((id) => id !== type.value) // Remove the ID if it's already selected
                  : [...currentValues, type.value]; // Add the ID if it's not selected

                formik.setFieldValue("job_type_master_id", newValues);
              }}
            >
              {type.label}
            </div>
          ))}
        </div>

        {/* ✅ Validation Error */}
        {formik.errors.job_type_master_id && formik.touched.job_type_master_id && (
          <p className="text-red text-sm mt-1">{formik.errors.job_type_master_id}</p>
        )}

        <div className="flex w-full justify-between items-end">
          <div className="whitespace-nowrap">
            <span className="text-red">{6 - 4}</span> - 6
          </div>
          <button
            type="submit"
            className={`max-w-[100px] sm:max-w-[250px] ${
              formik.isValid ? "bg-red text-white" : "!opacity-50 !cursor-default"
            }`}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}