"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/authSlice";
import { setProgress } from "@/redux/progressSlice";
import { setSaveMobileNumber, setUserMobile, signOut } from "@/redux/userSlice";
import { clearSessionData } from "@/components/utils/deviceId";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

// Toast ID tracker outside the component
let toastId: string | null = null;

export default function MobileInputForm({ size, closePopup }: any) {
  const dispatch = useAppDispatch();
  const { savedMobileNumber } = useAppSelector((state) => state.user);
  const progress = useAppSelector((state) => state.progress.value);

  console.log(size, "Verify Modal Style Over Here Please Check");
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

      console.log(mobile, "Verify Mobile Over Here");
      await dispatch(setSaveMobileNumber(mobile));
      const response = await dispatch(
        login({ mobile, name: "", login_type: 1, role_id: 4 })
      ).unwrap();

      if (response?.code === 1) {
        dispatch(setProgress(2));
        dispatch(setUserMobile(mobile));
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
    // @ts-ignore
    <Dialog
      open={progress === 1}
      size={size}
      className={`onboarding-dailog ${
        size === "md" ? "fixed top-12 -translate-x-1/2  onboarding-scale" : ""
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
                  ? "flex justify-center items-center"
                  : "flex justify-start items-start"
              } mt-16`}
            >
              <h2
                className={`text-[#231F20] font-semibold ${
                  size === "md" ? "!text-[26px]" : "!text-[22px]"
                }`}
              >
                Let's start with your mobile number
              </h2>
            </div>
          </div>
        </DialogHeader>
        <Formik
          initialValues={{ mobile: savedMobileNumber || "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
            <Form>
              {/* @ts-ignore */}
              <DialogBody
                className={`${
                  size === "md" ? "mt-2" : "mt-0"
                } custom-dialog-body custom-scroll p-0 px-5`}
              >
                <div className={`${size === "md" ? "px-12" : "px-0"}`}>
                  <label
                    htmlFor="mobile"
                    className="text-[#231F20] mobile-text text-lg md:text-xl 2xl:text-[16px]"
                  >
                    Mobile Number
                  </label>
                  <Field
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={values?.mobile}
                    placeholder="Enter your mobile number to receive OTP"
                    className={`otp-number border p-2 w-full rounded-[12px] text-[#231F20] ${
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
              </DialogBody>
              {/* @ts-ignore */}
              <DialogFooter
                className={`p-0 pb-6 ${
                  size === "md" ? "!px-[66px]" : "px-[20px]"
                }`}
              >
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`sign-btn ${
                    size === "md" ? "text-lg" : "text-md"
                  } mt-1 no-margin px-6 py-2 !bg-red hover:bg-red text-white rounded-full ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Next
                </button>
                {/* @ts-ignore */}
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
