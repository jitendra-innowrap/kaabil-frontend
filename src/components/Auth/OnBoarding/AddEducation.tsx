import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setProgress} from "@/redux/progressSlice";
import React, {useEffect, useState} from "react";
import api from "@/Services/Apiservice";
import * as Yup from "yup";
import {useFormik} from "formik";
import {storeProgress} from "@/components/utils/deviceId";
import toast from "react-hot-toast";
import {setUserEducation} from "@/redux/userSlice";
import styles from "../SignIn/signIn.module.css"
import {FaArrowLeft} from "react-icons/fa";
import {IoClose} from "react-icons/io5";

export default function AddEducation({size, closePopup, handleBack}: any) {
    const progress = useAppSelector((state) => state.progress.value);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [qualificationList, setQualificationList] = useState<
        { id: string; name: string }[]
    >([]);

    useEffect(() => {
        fetchEducation();
    }, [progress == 8]);

    // Initialize formik values with user's existing education
    useEffect(() => {
        if (user.users_education && user.users_education.length > 0 && user.users_education[0] !=="0") {
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
        onSubmit: async (values, {setSubmitting}) => {
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
                    headers: {"Content-Type": "multipart/form-data"},
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

        <div className={`pb-6 sm:p-6`}>
            <div className="relative w-full">
                <div onClick={handleBack}>
                    <FaArrowLeft className="absolute cursor-pointer top-2 z-30 left-2 size-6"/>
                </div>
                <IoClose
                    className="absolute top-2 right-2 cursor-pointer"
                    size={size === "md" ? 32 : 28}
                    onClick={closePopup}
                />
                <div
                    className={`flex sm:justify-center items-center pt-[74px] sm:pt-[30px] mb-[27px] sm:mb-0`}
                >
                    <h2
                        className={`text-[#231F20] font-semibold  ${
                            size === "md"
                                ? "!text-[28px] text-center"
                                : "!text-[20px] text-start"
                        }`}
                    >
                <span className="text-[#231F20]">
                  Tell us about your {size === "md" && <br/>}
                    <span className="text-red">education </span>
                  <span>background</span>
                </span>
                    </h2>
                </div>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className={`${size === "md" ? "block mt-6" : "mt-2"}`}
            >
                <div
                    className={`cursor-pointer ${
                        size === "md" ? "max-w-[528px] mx-auto mb-[60px]" : "px-0"
                    }`}
                >
                    <h4 className="text-[14px] mb-[8px] sm:text-[18px] font-medium sm:mb-1">
                        What is your highest level of education?
                    </h4>
                    {/* ✅ Validation Error */}
                    {formik.errors.education_id && formik.touched.education_id && (
                            <p className="text-red text-sm mb-1">
                                {formik.errors.education_id}
                            </p>
                        )}
                    <div className={`flex flex-col gap-2 sm:gap-[10px] ${styles.selected_option_list}`}>
                        {qualificationList?.map((education) => (
                            <label
                                htmlFor={education.id}
                                key={education.id}
                                onClick={() =>
                                    formik.setFieldValue("education_id", education.id)
                                }
                                className={`${styles.form_group}  !mb-0 rounded-lg px-3 sm:px-5  border shadow-sm items-center block ${
                                    education.id === formik.values.education_id
                                        ? "border-red bg-[#FDF1F3]"
                                        : "border-[#C8C9CB1A]"
                                }`}
                            >
                                <div className="flex items-center  gap-3 sm:gap-4">
                                    <input
                                        type="radio"
                                        id={education.id}
                                        checked={education.id === formik.values.education_id}
                                        name="experience"
                                        className={`cursor-pointer edu-checkbox inline-block !m-0 sm:!w-4 sm:!h-4 ${
                                            education.id === formik.values.education_id
                                                ? "selected"
                                                : ""
                                        }`}
                                        value={education?.id}
                                    />
                                    <div
                                        className={`!mb-0 gap-2 radio inline-block cursor-pointer text-[12px] sm:text-[14px] ${
                                            education.id === formik.values.education_id
                                                ? "selected"
                                                : ""
                                        }`}
                                    >
                                        {education.name}
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* @ts-ignore */}
                <div className="p-0 pb-6 mt-[44px] flex justify-center">
                    <div className="flex w-full items-end">
                        <div className={`whitespace-nowrap ${styles.page_show}`}>
                            <span className="text-red">{progress - 4}</span> - 6
                        </div>
                        <div
                            className="flex gap-2 sm:gap-4 items-end w-full justify-between sm:justify-end footer-2btn">
                <span
                    onClick={() => dispatch(setProgress(11))}
                    className={`${styles.onboarding_dialog_btn} w-1/2 sm:w-[130px] text-[#231F20] cursor-pointer border-[#9C9C9C] flex items-center justify-center btn-border !py-3.5 !px-9 !rounded-xl`}
                >
                  Skip
                </span>
                            <button
                                className={`${styles.onboarding_dialog_btn} w-1/2 sm:w-[250px] flex-shrink-0 justify-start`}
                                disabled={formik.isSubmitting}
                                type="submit"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
