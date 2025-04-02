"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/authSlice";
import { setProgress } from "@/redux/progressSlice";
import { setAuthToken, setSaveMobileNumber, setUserId, setUserMobile, signOut } from "@/redux/userSlice";
import { clearSessionData } from "@/components/utils/deviceId";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import styles from "./signIn.module.css";

// Toast ID tracker outside the component
let toastId: string | null = null;

export default function MobileInputForm({ size, closePopup }: any) {
  const dispatch = useAppDispatch();
  const { savedMobileNumber } = useAppSelector((state) => state.user);
  const progress = useAppSelector((state) => state.progress.value);
  // ✅ Validation schema
  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
  });

  // ✅ Handle form submission
  const handleSubmit = async (
    values: { mobile: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const { mobile } = values;

      // console.log(mobile, "Verify Mobile Over Here");
      dispatch(setSaveMobileNumber(mobile));
      const response = await dispatch(
        login({ mobile, name: "", login_type: 1, role_id: 4 })
      ).unwrap();

      if (response?.code === 1) {
        dispatch(setProgress(2));
        dispatch(setUserMobile(mobile));
        if(response?.token) dispatch(setAuthToken(response?.token))
        if(response?.user_id) dispatch(setUserId(response?.user_id))
        if (!toastId) {
          toastId = toast.success("An OTP has been sent!", {
            position: "bottom-right",
            duration: 2000, // Optional: control toast duration
          });
        }
      } else {
        if (!toastId) {
          toastId = toast.error(response?.msg || "Login failed. Try again!", {
            position: "bottom-right",
            duration: 2000,
          });
        }
      }
      if (response.data?.msg === "Invalid Hash Request") {
        if (!toastId) {
          toastId = toast.error("Session Expired. Please login!", {
            position: "bottom-right",
            duration: 2000,
          });
        }
        dispatch(signOut());
        dispatch(setProgress(1));
        clearSessionData();
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      if (error.data?.msg === "Invalid Hash Request") {
        if (!toastId) {
          toastId = toast.error("Session Expired. Please login!", {
            position: "bottom-right",
            duration: 2000,
          });
        }
        dispatch(signOut());
        dispatch(setProgress(1));
        clearSessionData();
      } else {
        if (!toastId) {
          toastId = toast.error(error?.message || "Something went wrong!", {
            position: "bottom-right",
            duration: 2000,
          });
        }
      }
    } finally {
      setSubmitting(false);
      toastId = null; // Reset toast ID for next submission
    }
  };

  return (
      <div className="pb-6">
        {/* @ts-ignore */}
        <div className="relative w-full sm:mb-[50px]">
          <IoClose
              className="absolute top-2 right-2 cursor-pointer"
              size={size === "md" ? 32 : 28}
              onClick={closePopup}
          />
          <div
              className={`flex sm:justify-center items-center pt-[74px] sm:mt-5 sm:pt-[30px]`}
          >
            <h2
                className={`text-[#231F20] font-semibold ${
                    size === "md" ? "!text-[26px]" : "!text-[22px] mb-[18px]"
                }`}
            >
              Let's start with your mobile number
            </h2>
          </div>
        </div>
        <Formik
            initialValues={{ mobile: savedMobileNumber || "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
              <Form>
                <div className={`${size === "md" ? "max-w-[528px] mx-auto" : "px-0"}`}>
                  <label
                      htmlFor="mobile"
                      className="text-[#231F20] mb-[8px] sm:mb-[10px] text-[14px] sm:text-lg md:text-xl 2xl:text-[16px] block"
                  >
                    Mobile Number
                  </label>
                  <Field
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={values?.mobile}
                      placeholder="Enter your mobile number to receive OTP"
                      className={`${styles.onboarding_dialog_input} border px-3 py-2 w-full rounded-[8px] sm:rounded-[12px] text-[#231F20] ${
                          values?.mobile ? "font-semibold" : "font-normal"
                      } ${size === "xxl" ? "text-[14px] sm:text-sm" : "text-lg"}`}
                      maxLength={10} // Restricts input to 10 characters
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const numericValue = e.target.value.replace(/\D+/g, "");
                        if (numericValue.length <= 10) {
                          setFieldValue("mobile", numericValue);
                        } else {
                          setFieldValue("mobile", numericValue.slice(0, 10));
                        }
                      }}
                  />
                  <div className="h-6 text-[11px] sm:text-sm text-red mt-1">
                    <ErrorMessage name="mobile" />
                  </div>
                </div>
                <div
                    className={`p-0 pb-6 ${
                        size === "md" ? "max-w-[528px] mx-auto" : "px-0"
                    }`}
                >
                  <button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className={`${styles.onboarding_dialog_btn} w-full ${
                          size === "md" ? "text-lg" : "text-md"
                      } mt-1 no-margin !bg-red hover:bg-red text-white ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    Next
                  </button>
                  {/* @ts-ignore */}
                </div>
              </Form>
          )}
        </Formik>
      </div>
  );
}
