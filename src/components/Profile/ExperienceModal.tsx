"use client";
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setEducationModal,
  setExperienceModal,
  setResumeModal,
} from "@/redux/profileSlice";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { Experience } from "@/Types/common";
import AddExperienceModal from "./AddExperienceModal";

const ExperienceModal = () => {
  const { experienceModal } = useAppSelector((state) => state.profile);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(2);

  const closeModal = () => {
    dispatch(setExperienceModal(false));
  };

  const progress = useAppSelector((state) => state.progress.value);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const formikFormRef = useRef<any>(null); // Ref to access child formik methods

  const handleAddExperience = (experience: any) => {
    setExperiences([...experiences, experience]);
    //   dispatch(setUserExperience([...experiences, experience]));
  };

  const handleSubmitExperience = async () => {
    if (formikFormRef.current) {
      await formikFormRef.current.handleSubmit();
    }
  };

  const validationSchemaForm = Yup.object().shape({
    designation: Yup.string().required("Designation is required"),
    companyName: Yup.string().required("Company name is required"),
    salary: Yup.number()
      .required("Salary is required")
      .test(
        "max-digits",
        "Must not exceed 10 digits",
        (value) => !value || value.toString().length <= 10
      ),
    type: Yup.number().required("Job type is required"),
    isCurrentCompany: Yup.boolean(),
    jobStartDate: Yup.date()
      .required("Start date is required")
      .max(new Date(), "Cannot be a future date"),
    jobEndDate: Yup.string().test(
      "job-end-date",
      "Invalid end date",
      function (value) {
        const { isCurrentCompany, jobStartDate } = this.parent;
        if (!isCurrentCompany && value) {
          const endDate = new Date(value);
          return endDate >= new Date(jobStartDate) && endDate <= new Date();
        }
        return true;
      }
    ),
  });

  const setFormikFormRef = (instance: any) => {
    if (instance) {
      formikFormRef.current = instance;
    }
  };

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
    onSubmit: (values) => {
      const experience = {
        company_master_id: "1578",
        company_name: values.companyName,
        designation_master_id: "2698",
        designation_name: values.designation,
        job_type_id: values.type,
        job_type_name: values.type_name,
        job_start_date: values.jobStartDate,
        job_end_date: values.isCurrentCompany ? "" : values.jobEndDate,
        in_hand_salary: values.salary,
        is_current_company: values.isCurrentCompany ? 1 : 0,
        additional_info: "",
      };
      handleAddExperience(experience);
      //   dispatch(setProgress(10));
      toast.success("Experience added successfully!", {
        position: "bottom-right",
      });
      formikForm.resetForm();
    },
  });

  return (
    <Dialog
      open={experienceModal}
      handler={closeModal}
      size="md"
      className={`fixed -translate-x-1/2 custom-dialog ${
        value === 2 ? "top-10" : "-top-10"
      }`}
    >
      <div>
        <DialogHeader>
          <div className="relative w-full">
            <IoClose
              className="absolute top-0 right-0 cursor-pointer"
              size={38}
              onClick={closeModal}
            />
            <div className="flex justify-center items-center mt-6">
              <h2 className="text-center text-[#231F20] text-3xl font-semibold">
                Edit your <span className="text-red">experience</span>
              </h2>
            </div>
          </div>
        </DialogHeader>
        <Formik
          initialValues={{
            is_fresher: 2,
          }}
          validationSchema={Yup.object().shape({
            is_fresher: Yup.number().required(
              "Please select your experience level"
            ),
          })}
          onSubmit={(values) => {
            console.log("Submitted values:", values);
          }}
        >
          {({ setFieldValue, isSubmitting, values, dirty }) => (
            <Form>
              {console.log(values, "Verify Values")}
              <DialogBody className="p-0 mt-8 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto custom-scroll cursor-pointer">
                <div className="px-12">
                  <label
                    className="block font-semibold mb-1 !text-[#231F20] !text-lg"
                    htmlFor="fileInput"
                  >
                    What’s your level of experience?
                  </label>
                  <div className="my-2 flex flex-col sm:flex-row gap-4">
                    <label
                      htmlFor="fresher"
                      className={`form-group !flex flex-1 !mb-0 gap-4 rounded-lg px-5 !py-1 border cursor-pointer shadow-sm items-center ${
                        2 === values.is_fresher
                          ? "border-[#E31837] bg-[#FDF1F3] text-[#E31837]"
                          : "border-[#C8C9CB1A]"
                      }`}
                    >
                      <input
                        type="radio"
                        id="fresher"
                        name="is_fresher"
                        className="cursor-pointer inline-block !m-0 !w-5 !h-5"
                        value={2}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setValue(value);
                          setFieldValue("is_fresher", value);
                        }}
                        checked={values.is_fresher === 2}
                      />
                      <div className="!mb-0 gap-2 inline-block cursor-pointer text-lg">
                        I'm a Fresher
                      </div>
                    </label>
                    <label
                      htmlFor="experienced"
                      className={`form-group !flex flex-1 !mb-0 gap-4 rounded-lg px-5 py-4 border cursor-pointer shadow-sm items-center ${
                        1 === values.is_fresher
                          ? "border-[#E31837] bg-[#FDF1F3] text-[#E31837]"
                          : "border-[#C8C9CB1A]"
                      }`}
                    >
                      <input
                        type="radio"
                        id="experienced"
                        name="is_fresher"
                        className="cursor-pointer inline-block !m-0 !w-5 !h-5"
                        value={1}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setValue(value);

                          setFieldValue("is_fresher", value);
                        }}
                        checked={values.is_fresher === 1}
                      />
                      <div className="!mb-0 gap-2 inline-block cursor-pointer text-lg">
                        I'm Experienced
                      </div>
                    </label>
                  </div>
                  <div className="h-1">
                    <ErrorMessage
                      name="is_fresher"
                      component="div"
                      className="text-red text-sm mt-1"
                    />
                  </div>
                  <div>
                    {values.is_fresher === 1 && (
                      <div className="scroll-content-experience cursor-pointer">
                        <label
                          className="block font-semibold mb-2 !text-[#231F20] !text-lg"
                          htmlFor="fileInput"
                        >
                          Please add all your experience
                        </label>
                        <AddExperienceModal
                          ref={setFormikFormRef}
                          formik={formikForm}
                        />
                        <div
                          className="flex text-red font-semibold mt-7 cursor-pointer"
                          onClick={() => handleSubmitExperience()}
                        >
                          + add more experience
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </DialogBody>
              <DialogFooter className="flex justify-end p-0 pb-3 mt-3 px-12">
                <button
                  type="submit"
                  className={`px-24 py-4  bg-[#E31837] text-white rounded-xl ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default ExperienceModal;
