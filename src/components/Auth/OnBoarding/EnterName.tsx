'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import api from '@/Services/Apiservice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import toast from 'react-hot-toast';
import { setUserName } from '@/redux/userSlice';

export default function EnterName() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  

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
    initialValues: { name: user.name || "", },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("first_name", values.name);

        // ✅ API Call
        const response:any = await api.post('/Auth/addJobseekerProfile', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log('repsonse:',response);
        if (response?.data?.code === 1) {
          // ✅ Redux Updates
          dispatch(setProgress(5));
          dispatch(setUserName(values.name));
          toast.success("Name submitted successfully!", { position: "bottom-right" });
        } else {
          toast.error(response?.message || "Something went wrong. Try again!", { position: "bottom-right" });
        }
      } catch (error: any) {
        console.error("Error submitting name:", error);
        toast.error(error?.message || "Something went wrong!", { position: "bottom-right" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <h2 className="text-center font-semibold text-lg md:text-xl 2xl:text-[28px] 2xl:leading-[36px]">
        Welcome to <span className="text-red font-kalam">Kaabil</span>
      </h2>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {/* ✅ Formik Form */}
      <form onSubmit={formik.handleSubmit} className="block mt-8 3xl:mt-16">
        <label htmlFor="name">Enter your full name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`border p-2 w-full ${formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-gray-300'}`}
        />

        {/* ✅ Display Validation Error */}
        {formik.errors.name && formik.touched.name && (
              <div className="text-red-500 text-sm text-red mt-1">{formik.errors.name}</div>
            )}

        <button
          type="submit"
          className={`mt-4 px-6 py-2 bg-red text-white rounded ${
            !formik.isValid || formik.isSubmitting ? "!opacity-50 !cursor-default" : ""
          }`}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {formik.isSubmitting ? "Submitting..." : "Next"}
        </button>
      </form>
    </div>
  );
}
