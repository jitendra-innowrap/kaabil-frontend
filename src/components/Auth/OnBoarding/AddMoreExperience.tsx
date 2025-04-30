import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setProgress} from "@/redux/progressSlice";
import React, {useEffect, useRef, useState} from "react";
import {GoDotFill} from "react-icons/go";
import AddExperienceForm from "./AddExperienceForm";
import Image from "next/image";
import {formatJobDuration, formatMonthYear} from "@/components/utils";
import {Experience} from "@/Types/common";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useFormik} from "formik";
import {setUserExperience} from "@/redux/userSlice";
import api from "@/Services/Apiservice";
import styles from "../SignIn/signIn.module.css"
import {FaArrowLeft} from "react-icons/fa";
import {IoClose} from "react-icons/io5";

export default function AddMoreExperience({
                                              size,
                                              closePopup,
                                              handleBack,
                                          }: any) {
    const progress = useAppSelector((state) => state.progress.value);
    const {experience, is_fresher} = useAppSelector((state) => state.user);
    const [experiences, setExperiences] = useState<Experience[]>(experience);
    const formikFormRef = useRef<any>(null); // Ref to access child formik methods
    const dispatch = useAppDispatch();
    const [newExperience, setNewExperience] = useState(false);
    const [isEditing, setIsEditing] = useState<number | null>(null); // Track which experience is being edited
    const [isSubmitting, setIsSubmitting] = useState(false); // Disable buttons during submission

    useEffect(() => {
        setExperiences(experience)
    }, [experience])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // If adding new experience, trigger Formik submission
        if (newExperience) {
            const formSubmissionSuccess = await formikForm.submitForm();
            if (!formSubmissionSuccess) {
                setIsSubmitting(false);
                return;
            }
        }
        try {
            console.log('click')
            setIsSubmitting(true);
                const payload = {
                    is_fresher: is_fresher,
                    total_experiences: experiences.length,
                    user_experiences: experiences,
                };
                const formData = new FormData();
                // ✅ Automatically append all fields from the object
                Object.entries(payload).forEach(([key, value]) => {
                    if (typeof value !== "string") {
                        let valueAsString = JSON.stringify(value);
                        formData.append(key, valueAsString); // Convert all values to strings
                    }
                });
                // If Experienced, submit with experiences
                const response = await api.post("/Auth/addJobseekerProfile", formData, {
                    headers: {"Content-Type": "multipart/form-data"},
                });

                if (response?.data?.code === 1) {
                    dispatch(setProgress(11)); // Move to the next step
                    toast.success("Experience submitted successfully!", {
                        position: "bottom-right",
                    });
                } else {
                    toast.error(response?.data?.message || "Submission failed!", {
                        position: "bottom-right",
                    });
                }
        } catch (error: any) {
            console.error("Error submitting experience:", error);
            toast.error(error?.message || "Something went wrong!", {
                position: "bottom-right",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddExperience = (experience: Experience) => {
        if (isEditing !== null) {
            // Update existing experience
            const updatedExperiences = [...experiences];
            updatedExperiences[isEditing] = experience;
            setExperiences(updatedExperiences);
            dispatch(setUserExperience(updatedExperiences));
            setIsEditing(null); // Exit edit mode
        } else {
            // Add new experience
            setExperiences([...experiences, experience]);
            dispatch(setUserExperience([...experiences, experience]));
        }
        setNewExperience(false); // Hide the form
        toast.success("Experience saved successfully!", {
            position: "bottom-right",
        });
        formikForm.resetForm();
        return true
    };

    const handleEditExperience = (index: number) => {
        const experienceToEdit = experiences[index];
        formikForm.setValues({
            designation: experienceToEdit.designation_name,
            designation_master_id: experienceToEdit.designation_master_id,
            companyName: experienceToEdit.company_name,
            company_master_id: experienceToEdit.company_master_id,
            salary: experienceToEdit.in_hand_salary,
            type: experienceToEdit.job_type_id,
            type_name: experienceToEdit.job_type_name,
            jobStartDate: experienceToEdit.job_start_date,
            jobEndDate: experienceToEdit.job_end_date,
            isCurrentCompany: experienceToEdit.is_current_company == "1",
        });
        setIsEditing(index); // Set the index of the experience being edited
        setNewExperience(false); // Show the form
    };

    const validationSchemaForm = Yup.object().shape({
        designation: Yup.string().required("Designation is required"),
        companyName: Yup.string().required("Company name is required"),
        salary: Yup.number().required("Salary is required"),
        type: Yup.number().required("Job type is required"),
        isCurrentCompany: Yup.boolean(),
        jobStartDate: Yup.string().required("Start date is required"),
        jobEndDate: Yup.string().test(
            "job-end-date",
            "End date is required",
            function (value) {
                const {isCurrentCompany} = this.parent;
                return isCurrentCompany === false ? !!value : true; // Only check when current company is false
            }
        ),
    });

    // ✅ Formik Hook for the form
    const formikForm = useFormik({
        initialValues: {
            designation: "",
            designation_master_id: "",
            companyName: "",
            company_master_id: "",
            salary: "",
            type: "",
            type_name: "",
            jobStartDate: "",
            jobEndDate: "",
            isCurrentCompany: false,
        },
        validationSchema: validationSchemaForm,
        onSubmit: async (values, { setSubmitting, validateForm }) => {
            // Manually trigger validation
            const errors = await validateForm();
            
            // If errors exist, stop here (Formik will automatically show errors)
            if (Object.keys(errors).length > 0) {
            setSubmitting(false);
            return false;
            }
            const experience = {
                company_master_id: values.company_master_id, // Replace with actual company ID from API
                company_name: values.companyName,
                designation_master_id: values.designation_master_id, // Replace with actual designation ID from API
                designation_name: values.designation,
                job_type_id: values.type,
                job_type_name: values.type_name,
                job_start_date: values.jobStartDate,
                job_end_date: values.isCurrentCompany ? "" : values.jobEndDate,
                in_hand_salary: values.salary,
                is_current_company: values.isCurrentCompany ? "1" : "0",
                additional_info: "",
            };
            const success = handleAddExperience(experience);
            return success
        },
    });

    const setFormikFormRef = (instance: any) => {
        if (instance) {
            formikFormRef.current = instance;
        }
    };

    return (
        <div className="pb-6 sm:p-6">
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
                                ? "!text-[26px] text-center"
                                : "!text-[22px] text-start"
                        }`}
                    >
                <span className="text-[#231F20]">
                  Your
                  <span className="text-red"> experience </span>
                </span>
                    </h2>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className={`${size === "md" ? "block mt-6" : "mt-2"}`}
            >
                <div className={`${styles.selected_option_list}`}>
                    <div
                        className={`pb-2 cursor-pointer ${
                            size === "md" ? "max-w-[528px] mx-auto" : "px-0"
                        }`}
                    >
                        <h4 className="text-[14px] mb-[8px] sm:text-[18px] font-medium sm:mb-1">
                            Please add all your experience
                        </h4>
                        {/* <pre>{JSON.stringify(experiences)}</pre> */}
                        {/* Dynamic list of all experience added by the user */}
                        {experiences.map((exp, i) => (
                            <>
                                {isEditing == i ? (
                                    <div className="mt-3 relative">
                                        <AddExperienceForm
                                            ref={setFormikFormRef}
                                            formik={formikForm}
                                            isEditing
                                        />
                                        {isEditing == i && (
                                            <div className="flex justify-end absolute bottom-11 right-0 translate-y-4 w-fit">
                                                <button
                                                    type="button"
                                                    className={`${styles.onboarding_dialog_btn} w-20 mr-3 sm:mr-6 sm:text-[12px] text-[14px]`}
                                                    onClick={() => {
                                                        formikForm.handleSubmit();
                                                    }}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        key={i}
                                        className="my-4 p-4 rounded-lg shadow-sm 3xl:shadow-default justify-between flex gap-4"
                                    >
                                        <div className="">
                                            <h5 className="text-[16px] font-medium text-black mb-2">
                                                {exp?.designation_name}
                                            </h5>
                                            <h6 className="text-[#7E7E7E] text-[14px] sm:text-sm mb-2">
                                                {exp?.company_name}{" "}
                                                <GoDotFill className="inline-block size-2"/>{" "}
                                                {exp?.job_type_name}
                                            </h6>
                                            <h6 className="text-[#7E7E7E] text-[14px] sm:text-sm mb-2">
                                                {formatMonthYear(exp?.job_start_date)} -{" "}
                                                {exp?.is_current_company == "1"
                                                    ? "Present"
                                                    : formatMonthYear(exp?.job_end_date)}{" "}
                                                <GoDotFill className="inline-block size-2"/>{" "}
                                                {formatJobDuration(
                                                    exp?.job_start_date,
                                                    exp?.job_end_date
                                                )}
                                            </h6>
                                        </div>
                                        <div
                                            className="flex items-center h-fit cursor-pointer"
                                            onClick={() => handleEditExperience(i)}
                                        >
                                            <Image
                                                src={"/new-assets/icons/pencil.png"}
                                                alt="edit-pencil"
                                                aria-label="edit icon"
                                                className="w-3 h-3 mr-1"
                                                width={90}
                                                height={90}
                                            />
                                            <span className="text-red text-sm font-semibold">
                            Edit
                            </span>
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}

                        {newExperience && (
                            <>
                            <div
                                className="flex font-semibold my-3 justify-between">
                                    <p>Please add experience</p> 
                                    <p className="text-red cursor-pointer" onClick={()=>setNewExperience(false)}>cancel</p>
                                </div>
                            <AddExperienceForm ref={setFormikFormRef} formik={formikForm}/>
                            </>
                        )}
                        {
                            <div
                                className="flex text-red font-semibold mt-7 cursor-pointer"
                                onClick={() => {
                                    if (!newExperience) {
                                        formikForm.resetForm();
                                        setNewExperience(true);
                                        setIsEditing(null); // Reset edit mode
                                    } else {
                                        formikForm.handleSubmit();
                                    }
                                }}
                            >
                                + add more experience
                            </div>
                        }
                    </div>
                </div>

                {/* @ts-ignore */}
                <div className="p-0 pb-6 mt-[44px] flex justify-center">
                    <div className="flex w-full items-end">
                        <div className={`whitespace-nowrap ${styles.page_show}`}>
                            <span className="text-red">{progress - 4}</span> - 6
                        </div>
                        <div className="flex gap-2 sm:gap-4 items-end w-full justify-end footer-2btn">
                            <div
                                onClick={() => dispatch(setProgress(11))}
                                className={`${styles.onboarding_dialog_btn} w-1/2 max-w-[130px] text-[#231F20] text-center cursor-pointer border-[#9C9C9C] flex items-center btn-border !py-3.5 !px-9 !rounded-xl`}
                            >
                              <p className="w-full">Skip</p>
                            </div>
                            <button
                                className={`${styles.onboarding_dialog_btn} w-1/2 max-w-[100px] sm:max-w-[250px] flex-shrink-0 justify-start`}
                                disabled={isSubmitting}
                                type="submit"
                            >
                                {isSubmitting ? "Submitting..." : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
