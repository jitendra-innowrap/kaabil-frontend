"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/authSlice";
import { setProgress } from "@/redux/progressSlice";
import { setUserMobile, signOut } from "@/redux/userSlice";
import { clearSessionData } from "@/components/utils/deviceId";
import toast from "react-hot-toast";

// Toast ID tracker outside the component
let toastId: string | null = null;

export default function MobileInputForm() {
  const dispatch = useAppDispatch();

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
    <div>
      <h2 className="text-center text-[#231F20] font-semibold text-lg md:text-xl 2xl:text-[28px] 2xl:leading-[36px]">
        Let's start with your mobile number
      </h2>
      <Formik
        initialValues={{ mobile: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
          <Form className="block mt-8 md:mt-10 xl:mt-14 2xl:mt-16">
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
              className={`border p-2 w-full rounded-[12px] text-[#231F20] ${
                values?.mobile ? "font-semibold" : "font-normal"
              }`}
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
            <div className="min-h-[11px] text-sm text-red mt-1">
              <ErrorMessage name="mobile" />
            </div>  
            <button
              type="submit"
              disabled={!isValid || !dirty || isSubmitting}
              className={`mt-1 no-margin px-6 py-2 bg-red text-white rounded-full ${
                !isValid || !dirty ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Next"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
