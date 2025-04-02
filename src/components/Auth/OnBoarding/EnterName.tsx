"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import api from "@/Services/Apiservice";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import toast from "react-hot-toast";
import {
  setIsFresher,
  setUserEducation,
  setUserExperience,
  setUserLocation,
  setUserName,
  setUserRole,
  setUserSkills,
  setUserWAConsent,
} from "@/redux/userSlice";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

export default function EnterName({ size, closePopup }: any) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const progress: any = useAppSelector((state) => state.progress.value);

  // ✅ Yup Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets and spaces are allowed")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .required("Full name is required"),
  });

  // ✅ Formik hook
  const formik = useFormik({
    initialValues: { name: user.name || "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("first_name", values.name);

        // ✅ API Call
        const response: any = await api.post(
          "/Auth/addJobseekerProfile",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("repsonse:", response);
        if (response?.data?.code === 1) {
          // ✅ Redux Updates
          dispatch(setProgress(5));
          dispatch(setUserName(values.name));
          dispatch(
            setUserRole({
              job_type_master_id: response?.data?.result?.[0]?.jobs_types?.map(
                (type: any, i: number) => {
                  return type?.id;
                }
              ),
              role_id: response?.data?.result?.[0]?.user_job_roles?.map(
                (role: any, i: number) => {
                  return role?.id;
                }
              ),
            })
          );
          dispatch(setUserSkills(response?.data?.result?.[0]?.skills));
          dispatch(
            setUserLocation(
              response?.data?.result?.[0]?.user_willing_to_relocate?.map(
                (loc: any, i: number) => {
                  return loc?.id;
                }
              )
            )
          );
          dispatch(
            setUserEducation([response?.data?.result?.[0]?.education_master_id])
          );
          dispatch(setIsFresher(response?.data?.result?.[0]?.is_fresher));
          dispatch(setIsFresher(response?.data?.result?.[0]?.is_fresher));
          dispatch(
            setUserWAConsent(
              response?.data?.result?.[0]?.is_whatsapp_show == "1"
                ? true
                : false
            )
          );
          dispatch(
            setUserExperience(
              response?.data?.result?.[0]?.user_experiences?.map(
                (exp: any, i: number) => {
                  return {
                    ...exp,
                    designation_name: exp?.designation,
                    job_type_name: exp?.job_type,
                  };
                }
              )
            )
          );
          toast.success("Name submitted successfully!", {
            position: "bottom-right",
          });
        } else {
          toast.error(response?.message || "Something went wrong. Try again!", {
            position: "bottom-right",
          });
        }
      } catch (error: any) {
        console.error("Error submitting name:", error);
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
      open={progress === 4}
      size={size}
      className={`onboarding-dailog ${
        size === "md" ? "fixed top-10 -translate-x-1/2  onboarding-scale" : ""
      }`}
    >
      <div className="pb-6">
        {/* @ts-ignore */}
        <DialogHeader>
          <div className="relative w-full">
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
                className={`text-[#231F20] font-semibold ${
                  size === "md" ? "!text-[26px]" : "!text-[22px]"
                }`}
              >
                Welcome to <span className="text-red">Kaabil</span>
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
          <DialogBody className="mt-2 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll p-0 px-5">
            <div className={`${size === "md" ? "px-12" : "px-0"}`}>
              {/* @ts-ignore */}
              <label
                htmlFor="name"
                className={`!text-[14px] sm:text-[18px] text-[#231F20] ${
                  size === "md" ? "font-semibold" : "font-normal"
                }`}
              >
                Enter your full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border p-2 w-full ${
                  formik.errors.name && formik.touched.name
                    ? "border-red-500"
                    : "border-gray-300"
                } ${formik.values.name ? "font-semibold" : "font-normal"}`}
              />
              <div>
                {formik.errors.name && formik.touched.name && (
                  <p className="text-red validation-error text-[11px] sm:text-sm">{formik.errors.name}</p>
                )}
              </div>
            </div>
          </DialogBody>
          {/* @ts-ignore */}
          <DialogFooter
            className={`p-0 pb-6 mt-5 flex justify-center ${
              size === "md" ? "!px-[66px]" : "px-[20px]"
            }`}
          >
            <button
              type="submit"
              className={`sign-btn ${
                size === "md" ? "text-lg" : "text-md"
              } mt-1 no-margin px-6 py-2 !bg-red hover:bg-red text-white rounded-full ${
                !formik.isValid || formik.isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {/* {formik.isSubmitting ? "Submitting..." : "Next"} */}
              Next
            </button>
          </DialogFooter>
        </form>
      </div>
    </Dialog>
  );
}
