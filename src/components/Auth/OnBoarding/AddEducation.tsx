import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProgress } from "@/redux/progressSlice";
import React, { useEffect, useState } from "react";
import api from "@/Services/Apiservice";
import * as Yup from "yup";
import { useFormik } from "formik";
import { storeProgress } from "@/components/utils/deviceId";
import toast from "react-hot-toast";
import { setUserEducation } from "@/redux/userSlice";

export default function AddEducation() {
  const progress = useAppSelector((state) => state.progress.value);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [qualificationList, setQualificationList] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    fetchEducation();
  }, []);

  // Initialize formik values with user's existing education
  useEffect(() => {
    if (user.users_education && user.users_education.length > 0) {
      formik.setFieldValue("education_id", user.users_education[0]);
    }
  }, [user.users_education]);

  const fetchEducation = async () => {
    try {
      const response = await api.get("/MasterData/getEducation");
      const roles =
        response?.data?.result?.map((role: any) => ({
          id: role.id,
          name: role.name,
        })) || [];
      setQualificationList(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    education_id: Yup.string().required("Education is required"),
  });

  // ✅ Formik Hook
  const formik = useFormik({
    initialValues: {
      education_id: "" as string,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          users_education: [
            {
              id: values.education_id,
              institute_name: "",
              institute_master_id: "",
              field_of_study_master_id: "0",
              year_of_graduation: "",
            },
          ],
        };
        const formData = new FormData();
        // ✅ Automatically append all fields from the object
        Object.entries(payload).forEach(([key, value]) => {
          if (typeof value !== "string") {
            let valueAsString = JSON.stringify(value);
            formData.append(key, valueAsString); // Convert all values to strings
          }
        });
        // ✅ Submit selected education
        const response = await api.post("/Auth/addJobseekerProfile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response?.data?.code === 1) {
          dispatch(setProgress(9));
          dispatch(setUserEducation([values.education_id]));
          toast.success("Education submitted successfully!", {
            position: "bottom-right",
          });
        } else {
          toast.error(response?.data?.message || "Submission failed!", {
            position: "bottom-right",
          });
        }
      } catch (error: any) {
        console.error("Error submitting education:", error);
        toast.error(error?.message || "Something went wrong!", {
          position: "bottom-right",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="">
      <h2 className="text-center text-[#231F20] font-semibold text-lg md:text-xl xl:text-[28px] 2xl:leading-[38px]">
        Tell us about your <br />
        <span className="text-red">education</span> background
      </h2>
      <form onSubmit={formik.handleSubmit} className="block mt-10">
        <div className="scroll-content cursor-pointer">
          <h4 className="text-lg font-medium mb-1">
            What is your highest level of education?
          </h4>
          <div className="my-2 flex flex-col gap-4">
            {qualificationList?.map((education) => (
              <label
                htmlFor={education.id}
                key={education.id}
                onClick={() =>
                  formik.setFieldValue("education_id", education.id)
                }
                className={`form-group !flex !mb-0 gap-4 rounded-lg px-5 py-3 border shadow-sm items-center ${
                  education.id === formik.values.education_id
                    ? "border-red bg-[#FDF1F3]"
                    : "border-[#C8C9CB1A]"
                }`}
              >
                <input
                  type="radio"
                  id={education.id}
                  checked={education.id === formik.values.education_id}
                  name="experience"
                  className={`cursor-pointer inline-block !m-0 !w-4 !h-4 ${
                    education.id === formik.values.education_id
                      ? "selected"
                      : ""
                  }`}
                  value={education?.id}
                />
                <div
                  className={`!mb-0 gap-2 radio inline-block cursor-pointer ${
                    education.id === formik.values.education_id
                      ? "selected"
                      : ""
                  }`}
                >
                  {education.name}
                </div>
              </label>
            ))}
            {/* ✅ Validation Error */}
            {formik.errors.education_id && formik.touched.education_id && (
              <p className="text-red text-sm mt-1">
                {formik.errors.education_id}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full items-end">
          <div className="whitespace-nowrap">
            <span className="text-red">{progress - 4}</span> - 6
          </div>
          <div className="flex gap-4 items-end w-full justify-end">
            <span
              onClick={() => dispatch(setProgress(11))}
              className={`max-w-[130px] text-[#231F20] cursor-pointer border-[#9C9C9C] flex items-center btn-border !py-3.5 !px-9 !rounded-xl`}
            >
              Skip
            </span>
            <button
              className={`max-w-[100px] sm:max-w-[250px] flex-shrink-0 justify-start`}
              disabled={formik.isSubmitting}
              type="submit"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
