'use client'
import { login } from '@/redux/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProgress } from '@/redux/progressSlice';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useFormik } from "formik";
import * as Yup from "yup";
import { setUserMobile, signOut } from '@/redux/userSlice';
import { clearSessionData } from '@/components/utils/deviceId';
export default function MobileInputForm() {
  const dispatch = useAppDispatch();
  // ✅ Validation schema
  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
  });

  // ✅ Formik hook
  const formik = useFormik({
    initialValues: { mobile: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { mobile } = values;
  
        // ✅ Use `unwrap()` to get the resolved payload or catch errors
        const response = await dispatch(login({ mobile, name: "", login_type: 1, role_id: 4 })).unwrap();  
        if (response?.code === 1) {
          dispatch(setProgress(2));
          dispatch(setUserMobile(mobile));
          toast.success("An OTP has been sent!", { position: "bottom-right" });
        } else {
          toast.error(response?.msg || "Login failed. Try again!", { position: "bottom-right" });
        }
        if(response.data?.msg=="Invalid Hash Request"){
          toast.error("Session Expired Please login !", { position: 'bottom-right' });
          dispatch(signOut());
          dispatch(setProgress(1));
          clearSessionData();
        }
      } catch (error: any) {
        console.error("Login Error:", error);
        if(error.data?.msg=="Invalid Hash Request"){
          toast.error("Session Expired Please login !", { position: 'bottom-right' });
          dispatch(signOut());
          dispatch(setProgress(1));
          clearSessionData();
        }else{
          toast.error(error?.message || "Something went wrong!", { position: "bottom-right" });
        }
      }
  
    },
  });
  const handleInput = (e:any) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D+/g, ''); // Remove non-numeric characters
    if (numericValue.length <= 10) {
      formik.setFieldValue('mobile', numericValue);
    } else {
      formik.setFieldValue('mobile', numericValue.slice(0, 10));
    }
  };
  return (
    <div>
        <h2 className='text-center font-semibold text-lg md:text-xl 2xl:text-[28px] 2xl:leading-[36px]'>Lets start with your mobile number</h2>
        <form onSubmit={formik.handleSubmit} className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number to receive OTP"
              className="border p-2 w-full rounded"
              value={formik.values.mobile}
              onChange={handleInput}
              onBlur={formik.handleBlur}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div className="text-red-500 text-sm text-red mt-1">{formik.errors.mobile}</div>
            )}
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              className={`mt-4 px-6 py-2 bg-red text-white rounded ${
                !formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {formik.isSubmitting ? "Submitting..." : "Next"}
            </button>
        </form>
    </div>
  )
}
