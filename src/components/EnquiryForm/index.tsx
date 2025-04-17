import { useAppSelector } from '@/redux/hooks';
import { closeEnquiryForm } from '@/redux/userSlice';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup'
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from '@/Services/Apiservice';
import axios from 'axios';

export default function EnquiryForm() {
    const { isEnquiryOpen } = useAppSelector((state) => state.user);
    const enquiryPopUpRef = useRef<any>(null);
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
        dispatch(closeEnquiryForm());
    }

    const validationSchemaForm = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        number: Yup.string()
              .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
              .required("Mobile number is required"),
        type: Yup.number().required("Please select an option"),
        feedback: Yup.string().required("Feedback is required"),
        company_name: Yup.string().required("Company name is required"),
    });

    const formikForm = useFormik({
        initialValues: {
            type: 0,
            email: "",
            number: "",
            feedback: "",
            name: "",
            company_name: "",
            csrf_kaampe_token: "b3821c0d386ffd4b4ce2efdeebdf856b",
            form_type: "Contact Us",
            recaptcha_response: "",
        },
        validationSchema: validationSchemaForm,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                
                const formData = new FormData();
                formData.append('name', values.name.toString());
                formData.append('email', values.email.toString());
                formData.append('phone', values.number.toString());
                formData.append('company_name', values.company_name.toString());
                formData.append('comment', values.feedback.toString());
                formData.append('form_type', 'Contact Us');
                formData.append('csrf_kaampe_token', 'b3821c0d386ffd4b4ce2efdeebdf856b');
                formData.append('recaptcha_response', '');
                formData.append('enquiry_type', values.type.toString());

                const response = await axios.post("https://meuat.kaam.com/Web/store", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.data?.code === 1) {
                    toast.success("Enquiry submitted successfully!", {
                        position: "bottom-right",
                    });
                    formikForm.resetForm();
                    handleClose();
                } else {
                    toast.error(response.data?.message || "Submission failed", {
                        position: "bottom-right",
                    });
                }
            } catch (error: any) {
                console.error("Error submitting enquiry:", error);
                toast.error(error?.message || "Something went wrong", {
                    position: "bottom-right",
                });
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <Popup
            ref={enquiryPopUpRef}
            open={isEnquiryOpen}
            onClose={handleClose}
            modal
            lockScroll
            className="relative enquiry"
            overlayStyle={{
                background: "#4D4D4DC2",
                padding: "20px",
                overflow: "hidden",
            }}
        >
            <div className="p-4 md:p-6">
                <div className="relative w-full">
                    <IoClose
                        className="absolute close-btn -top-1 right-0 cursor-pointer size-6 3xl:size-8"
                        onClick={handleClose}
                    />
                    <div className={`flex justify-center items-center mb-[27px] sm:mb-0`}>
                        <h2 className={`text-[#231F20] font-semibold text-lg 3xl:text-[29px] 3xl:leading-[33px] text-center`}>
                            Enquire now!
                        </h2>
                    </div>
                </div>
                <form onSubmit={formikForm.handleSubmit}>
                    <label
                        htmlFor="type"
                        className={`text-[#231F20] mb-[8px]  3xl:mb-4 sm:text-lg md:text-xl 2xl:text-[16px] block input-label`}
                    >
                        Are you a
                    </label>
                    <div className=" mt-2 mb-4 flex flex-row gap-4">
                        <label
                            htmlFor="jobseeker"
                            className={`!flex flex-1 py-2 xl:py-0 3xl:py-4 !mb-0 gap-4 rounded-lg px-3 sm:px-5 border cursor-pointer shadow-sm items-center ${
                                formikForm.values.type == 0
                                    ? "border-red bg-[#FDF1F3] text-red"
                                    : "border-[#C8C9CB1A]"
                            }`}
                        >
                            <input
                                type="radio"
                                id="jobseeker"
                                name="type"
                                className="cursor-pointer inline-block !m-0 !w-4 !h-4"
                                value={0}
                                onChange={formikForm.handleChange}
                                checked={formikForm.values.type == 0}
                            />
                            <div className="!mb-0 radio-label gap-2 inline-block cursor-pointer text-[11px] sm:text-[14px]">
                                Jobseeker
                            </div>
                        </label>
                        <label
                            htmlFor="recruiter"
                            className={`!flex flex-1 py-2 xl:py-0 3xl:py-4 !mb-0 gap-4 rounded-lg px-3 sm:px-5 border cursor-pointer shadow-sm items-center ${
                                formikForm.values.type == 1
                                    ? "border-red text-red bg-[#FDF1F3]"
                                    : "border-[#C8C9CB1A]"
                            }`}
                        >
                            <input
                                type="radio"
                                id="recruiter"
                                name="type"
                                className="cursor-pointer inline-block !m-0 !w-4 !h-4"
                                value={1}
                                onChange={formikForm.handleChange}
                                checked={formikForm.values.type == 1}
                            />
                            <div className="!mb-0 radio-label gap-2 inline-block cursor-pointer text-[11px] sm:text-[14px]">
                                Recruiter
                            </div>
                        </label>
                    </div>
                    {formikForm.errors.type && formikForm.touched.type && (
                        <p className="text-red text-[11px] form-error sm:text-sm mt-1">
                            {formikForm.errors.type}
                        </p>
                    )}

                    <div className="mt-4">
                        <label 
                            htmlFor="name"
                            className={`input-label text-[#231F20] mb-[8px] sm:mb-[10px] text-[14px] sm:text-lg md:text-xl 2xl:text-[16px] block`}
                        >
                            Your name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formikForm.values.name}
                            onChange={formikForm.handleChange}
                            onBlur={formikForm.handleBlur}
                            className={`border p-2 w-full rounded-lg ${
                                formikForm.errors.name && formikForm.touched.name
                                    ? "border-red"
                                    : "border-[#C8C9CB1A]"
                            } ${formikForm.values.name ? "font-semibold" : "font-normal"}`}
                        />
                        {formikForm.errors.name && formikForm.touched.name && (
                            <p className="text-red text-[11px] form-error sm:text-sm mt-1">
                                {formikForm.errors.name}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label 
                            htmlFor="email"
                            className={`input-label text-[#231F20] mb-[8px] sm:mb-[10px] text-[14px] sm:text-lg md:text-xl 2xl:text-[16px] block`}
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formikForm.values.email}
                            onChange={formikForm.handleChange}
                            onBlur={formikForm.handleBlur}
                            className={`border p-2 w-full rounded-lg ${
                                formikForm.errors.email && formikForm.touched.email
                                    ? "border-red"
                                    : "border-[#C8C9CB1A]"
                            } ${formikForm.values.email ? "font-semibold" : "font-normal"}`}
                        />
                        {formikForm.errors.email && formikForm.touched.email && (
                            <p className="text-red text-[11px] form-error sm:text-sm mt-1">
                                {formikForm.errors.email}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label 
                            htmlFor="number"
                            className={`input-label text-[#231F20] mb-[8px] sm:mb-[10px] text-[14px] sm:text-lg md:text-xl 2xl:text-[16px] block`}
                        >
                            Your phone number
                        </label>
                        <input
                            type="tel"
                            id="number"
                            name="number"
                            placeholder="Enter your phone number"
                            value={formikForm.values.number}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const numericValue = e.target.value.replace(/\D+/g, "");
                            if (numericValue.length <= 10) {
                                formikForm.setFieldValue("number", numericValue);
                            } else {
                                formikForm.setFieldValue("number", numericValue.slice(0, 10));
                            }
                            }}
                            onBlur={formikForm.handleBlur}
                            className={`border p-2 w-full rounded-lg ${
                                formikForm.errors.number && formikForm.touched.number
                                    ? "border-red"
                                    : "border-[#C8C9CB1A]"
                            } ${formikForm.values.number ? "font-semibold" : "font-normal"}`}
                        />
                        {formikForm.errors.number && formikForm.touched.number && (
                            <p className="text-red text-[11px] form-error sm:text-sm mt-1">
                                {formikForm.errors.number}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label 
                            htmlFor="company_name"
                            className={`input-label text-[#231F20] mb-[8px] sm:mb-[10px] text-[14px] sm:text-lg md:text-xl 2xl:text-[16px] block`}
                        >
                            Company name
                        </label>
                        <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            placeholder="Enter your company name"
                            value={formikForm.values.company_name}
                            onChange={formikForm.handleChange}
                            onBlur={formikForm.handleBlur}
                            className={`border p-2 w-full rounded-lg ${
                                formikForm.errors.company_name && formikForm.touched.company_name
                                    ? "border-red"
                                    : "border-[#C8C9CB1A]"
                            } ${formikForm.values.company_name ? "font-semibold" : "font-normal"}`}
                        />
                        {formikForm.errors.company_name && formikForm.touched.company_name && (
                            <p className="text-red text-[11px] form-error sm:text-sm mt-1">
                                {formikForm.errors.company_name}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label 
                            htmlFor="feedback"
                            className={`input-label text-[#231F20] mb-[8px] sm:mb-[10px] text-[14px] sm:text-lg md:text-xl 2xl:text-[16px] block`}
                        >
                            Your feedback
                        </label>
                        <textarea
                            id="feedback"
                            name="feedback"
                            placeholder="Enter your feedback"
                            value={formikForm.values.feedback}
                            onChange={formikForm.handleChange}
                            onBlur={formikForm.handleBlur}
                            rows={4}
                            className={`border p-2 w-full rounded-lg outline-none ${
                                formikForm.errors.feedback && formikForm.touched.feedback
                                    ? "border-red"
                                    : "border-[#C8C9CB1A]"
                            } ${formikForm.values.feedback ? "font-semibold" : "font-normal"}`}
                        />
                        {formikForm.errors.feedback && formikForm.touched.feedback && (
                            <p className="text-red text-[11px] form-error sm:text-sm -mt-1">
                                {formikForm.errors.feedback}
                            </p>
                        )}
                    </div>

                    <div className="flex w-full justify-end mt-2">
                        <button 
                            type="submit" 
                            className={`px-6 py-2 !mt-0 bg-red text-white rounded-lg hover:bg-red-600 transition-colors ${
                                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </Popup>
    );
}