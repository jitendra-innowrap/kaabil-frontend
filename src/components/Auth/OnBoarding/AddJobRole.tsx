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
  const [isLoading, setIsLoading] = useState(true);

  const isOptionDisabled = (option: { value: string; label: string }) => {
    return (
        selectedRoles.length >= 2 &&
        !selectedRoles.some((role) => role.value === option.value)
    );
  };

  // Fetch roles and job types from API
  useEffect(() => {
    const fetchMaster = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchRoles(), fetchJobTypes()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaster();
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
      setRolesList(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
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
      setJobTypes(jobTypes);
    } catch (error) {
      console.error("Error fetching job types:", error);
      throw error;
    }
  };

  // Initialize form with user data after roles and job types are loaded
  useEffect(() => {
    if (!isLoading && rolesList.length > 0 && jobTypes.length > 0) {
      // Set initial selected roles if user has existing roles
      if (user.role_id && user.role_id.length > 0) {
        const preselectedRoles = rolesList.filter((role) =>
            user.role_id.includes(role.value)
        );
        setSelectedRoles(preselectedRoles);
        formik.setFieldValue(
            "role_id",
            preselectedRoles.map((role) => role.value)
        );
      }

      // Set initial job type selection if user has existing job types
      if (user.job_type_master_id && user.job_type_master_id.length > 0) {
        setSelectedJobType(user.job_type_master_id.map((id) => id.toString()));
        formik.setFieldValue(
            "job_type_master_id",
            user.job_type_master_id.map((id) => id.toString())
        );
      }
    }
  }, [isLoading, rolesList, jobTypes, user]);

  // Validation Schema
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

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      role_id: [] as string[],
      job_type_master_id: [] as string[],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value !== "string") {
            let valueAsString = JSON.stringify(value);
            formData.append(key, valueAsString);
          }
        });

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <Dialog
          open={progress === 5}
          size={size}
          className={`onboarding-dailog ${size === "md" ? "fixed -top-16 -translate-x-1/2  onboarding-scale" : ""}`}
          placeholder={undefined} onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined} handler={function (value: any): void {
        throw new Error("Function not implemented.");
      }}      >
        <div className="pb-6">
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

          <form
              onSubmit={formik.handleSubmit}
              className={`${size === "md" ? "block mt-6" : "mt-2"}`}
          >
            <DialogBody className="">
              <div
                  className={`pb-2 cursor-pointer ${
                      size === "md" ? "px-12" : "px-0"
                  }`}
              >
                <h4 className="text-[14px] sm:text-lg font-medium text-[#231F20]">
                  What job role are you looking for?
                </h4>
                <p className="text-[11px] sm:text-sm text-[#249D64]">
                  (You can select up to 2 job roles)
                </p>

                <div className="my-3">
                  <MultiSelect
                      options={rolesList.map((role) => ({
                        ...role,
                        disabled: isOptionDisabled(role),
                      }))}
                      placeholder="Select Role"
                      isMulti
                      onChange={(
                          selectedRoles: { value: string; label: string }[]
                      ) => {
                        const selectedValues = selectedRoles.map((role) => role.value);
                        formik.setFieldValue("role_id", selectedValues);
                        setSelectedRoles(selectedRoles);
                      }}
                      selectedValues={rolesList.filter((role) =>
                          formik.values.role_id.includes(role.value)
                      )}
                      maxSelections={2}
                      icon={
                        <FaMagnifyingGlass className="absolute left-[15px] top-[14px] sm:top-[20px] size-4 text-[#808080]" />
                      }
                  />
                </div>

                <SelectedChips
                    selectedValues={rolesList.filter((role) =>
                        formik.values.role_id.includes(role.value)
                    )}
                    onRemove={(value: string) => {
                      formik.setFieldValue(
                          "role_id",
                          formik.values.role_id.filter((id) => id !== value)
                      );
                      setSelectedRoles(selectedRoles.filter(role => role.value !== value));
                    }}
                    size={size}
                />

                {formik.errors.role_id && formik.touched.role_id && (
                    <p className="text-red text-sm mt-1">{formik.errors.role_id}</p>
                )}

                <h4 className="text-[14px] sm:text-lg font-medium my-4 text-[#231F20]">
                  What type of job required?
                </h4>

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
                            setSelectedJobType(newValues);
                          }}
                      >
                        {type.label}
                      </div>
                  ))}
                </div>

                {formik.errors.job_type_master_id &&
                    formik.touched.job_type_master_id && (
                        <p className="text-red text-sm mt-1">
                          {formik.errors.job_type_master_id}
                        </p>
                    )}
              </div>
            </DialogBody>

            <DialogFooter className="p-0 pb-6 px-6 sm:!px-12 mt-5 flex justify-center">
              <div className="flex w-full justify-end sm:justify-between items-end">
                <div className="whitespace-nowrap dialog-footer-paging">
                  <span className="text-red">{6 - 4}</span> - 6
                </div>
                <button
                    type="submit"
                    className={`dialog-action-btn max-w-[200px] sm:max-w-[250px] ${
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